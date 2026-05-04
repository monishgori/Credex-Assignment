import { PRICING_DATA, ToolName, PlanType, UseCase } from "./pricing";

export interface UserTool {
  name: ToolName;
  plan: PlanType;
  seats: number;
  currentMonthlySpend: number;
}

export interface AuditInput {
  tools: UserTool[];
  teamSize: number;
  primaryUseCase: UseCase;
}

export interface Recommendation {
  tool: ToolName;
  action: "KEEP" | "DOWNGRADE" | "SWITCH" | "CREDITS";
  recommendedPlan?: PlanType;
  alternativeTool?: ToolName;
  savingsMonthly: number;
  reason: string;
}

export interface AuditResult {
  totalCurrentMonthlySpend: number;
  totalNewMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
}

export function runAudit(input: AuditInput): AuditResult {
  let totalCurrent = 0;
  let totalNew = 0;
  const recommendations: Recommendation[] = [];

  for (const tool of input.tools) {
    totalCurrent += tool.currentMonthlySpend;
    
    // Find tool pricing
    const pricing = PRICING_DATA.find(p => p.name === tool.name);
    if (!pricing) {
      totalNew += tool.currentMonthlySpend;
      recommendations.push({
        tool: tool.name,
        action: "KEEP",
        savingsMonthly: 0,
        reason: "Tool pricing not found in our database."
      });
      continue;
    }

    const currentPlanIndex = pricing.plans.findIndex(p => p.id === tool.plan);
    const currentPlanDef = currentPlanIndex !== -1 ? pricing.plans[currentPlanIndex] : null;

    let savings = 0;
    let rec: Recommendation = {
      tool: tool.name,
      action: "KEEP",
      savingsMonthly: 0,
      reason: "Your current plan is optimal for your usage."
    };

    // Rule 1: Too many seats on a Team plan when team size is small
    if (currentPlanDef && currentPlanDef.minSeats && input.teamSize < currentPlanDef.minSeats) {
        const individualPlan = pricing.plans.find(p => p.pricePerUser < currentPlanDef.pricePerUser && (!p.minSeats || p.minSeats <= input.teamSize) && p.pricePerUser > 0);
        if (individualPlan) {
            const currentCost = tool.currentMonthlySpend;
            const newCost = individualPlan.pricePerUser * input.teamSize;
            if (newCost < currentCost) {
                rec = {
                    tool: tool.name,
                    action: "DOWNGRADE",
                    recommendedPlan: individualPlan.id,
                    savingsMonthly: currentCost - newCost,
                    reason: `You are paying for a team plan but your team size is ${input.teamSize}. Switching to ${individualPlan.id} saves money.`
                };
            }
        }
    } 
    // Rule 2: Cheaper alternative for coding
    else if (input.primaryUseCase === "coding" && (tool.name === "ChatGPT" || tool.name === "Claude") && tool.plan !== "Free") {
       const currentCost = tool.currentMonthlySpend;
       const windsurfCost = 15 * tool.seats;
       if (windsurfCost < currentCost) {
           rec = {
               tool: tool.name,
               action: "SWITCH",
               alternativeTool: "Windsurf",
               savingsMonthly: currentCost - windsurfCost,
               reason: `For coding, Windsurf Pro ($15/mo) is a specialized cheaper alternative to ${tool.name}.`
           }
       }
    }
    // Rule 3: Retail vs Credits (For large teams > 10)
    else if (tool.seats >= 10 && currentPlanDef && currentPlanDef.pricePerUser >= 20) {
        const currentCost = tool.currentMonthlySpend;
        const discountedCost = currentCost * 0.8;
        rec = {
            tool: tool.name,
            action: "CREDITS",
            savingsMonthly: currentCost - discountedCost,
            reason: `With ${tool.seats} seats, you are paying retail. Credex can provide infrastructure credits for ~20% off.`
        }
    }

    if (rec.action === "KEEP") {
        totalNew += tool.currentMonthlySpend;
    } else {
        totalNew += (tool.currentMonthlySpend - rec.savingsMonthly);
    }
    
    recommendations.push(rec);
  }

  const totalMonthlySavings = totalCurrent - totalNew;

  return {
    totalCurrentMonthlySpend: totalCurrent,
    totalNewMonthlySpend: totalNew,
    totalMonthlySavings: totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    recommendations
  };
}
