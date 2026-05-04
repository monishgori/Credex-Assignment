import { runAudit, AuditInput } from "./engine";

describe("Audit Engine", () => {
  it("should recommend KEEP when the plan is already optimal", () => {
    const input: AuditInput = {
      tools: [{ name: "Cursor", plan: "Pro", seats: 1, currentMonthlySpend: 20 }],
      teamSize: 1,
      primaryUseCase: "coding"
    };
    const result = runAudit(input);
    expect(result.recommendations[0].action).toBe("KEEP");
    expect(result.totalMonthlySavings).toBe(0);
  });

  it("should recommend DOWNGRADE when team size doesn't justify a team plan", () => {
    const input: AuditInput = {
      tools: [{ name: "Claude", plan: "Team", seats: 5, currentMonthlySpend: 150 }],
      teamSize: 1,
      primaryUseCase: "mixed"
    };
    const result = runAudit(input);
    expect(result.recommendations[0].action).toBe("DOWNGRADE");
    expect(result.recommendations[0].recommendedPlan).toBe("Pro");
    expect(result.totalMonthlySavings).toBe(150 - 20);
  });

  it("should recommend SWITCH when a cheaper coding alternative exists", () => {
    const input: AuditInput = {
      tools: [{ name: "ChatGPT", plan: "Plus", seats: 1, currentMonthlySpend: 20 }],
      teamSize: 1,
      primaryUseCase: "coding"
    };
    const result = runAudit(input);
    expect(result.recommendations[0].action).toBe("SWITCH");
    expect(result.recommendations[0].alternativeTool).toBe("Windsurf");
    expect(result.totalMonthlySavings).toBe(5);
  });

  it("should recommend CREDITS for large teams paying retail", () => {
    const input: AuditInput = {
      tools: [{ name: "Cursor", plan: "Pro", seats: 20, currentMonthlySpend: 400 }],
      teamSize: 20,
      primaryUseCase: "coding"
    };
    const result = runAudit(input);
    expect(result.recommendations[0].action).toBe("CREDITS");
    expect(result.totalMonthlySavings).toBe(400 * 0.2);
  });

  it("should aggregate total savings correctly across multiple tools", () => {
    const input: AuditInput = {
      tools: [
        { name: "Cursor", plan: "Pro", seats: 20, currentMonthlySpend: 400 },
        { name: "ChatGPT", plan: "Plus", seats: 1, currentMonthlySpend: 20 }
      ],
      teamSize: 20,
      primaryUseCase: "coding"
    };
    const result = runAudit(input);
    expect(result.totalMonthlySavings).toBe(85);
    expect(result.totalAnnualSavings).toBe(85 * 12);
  });
});
