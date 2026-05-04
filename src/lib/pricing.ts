export type ToolName = "Cursor" | "GitHub Copilot" | "Claude" | "ChatGPT" | "Gemini" | "Windsurf";
export type PlanType = "Free" | "Hobby" | "Pro" | "Business" | "Enterprise" | "Individual" | "Team" | "Plus" | "Advanced" | "Starter";
export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export interface ToolPricing {
  name: ToolName;
  plans: {
    id: PlanType;
    pricePerUser: number;
    recommendedFor?: UseCase[];
    minSeats?: number;
  }[];
}

export const PRICING_DATA: ToolPricing[] = [
  {
    name: "Cursor",
    plans: [
      { id: "Hobby", pricePerUser: 0, recommendedFor: ["coding"] },
      { id: "Pro", pricePerUser: 20, recommendedFor: ["coding"] },
      { id: "Business", pricePerUser: 40, recommendedFor: ["coding"], minSeats: 1 },
    ]
  },
  {
    name: "GitHub Copilot",
    plans: [
      { id: "Individual", pricePerUser: 10, recommendedFor: ["coding"] },
      { id: "Business", pricePerUser: 19, recommendedFor: ["coding"] },
      { id: "Enterprise", pricePerUser: 39, recommendedFor: ["coding"] },
    ]
  },
  {
    name: "Claude",
    plans: [
      { id: "Free", pricePerUser: 0, recommendedFor: ["writing", "mixed", "coding"] },
      { id: "Pro", pricePerUser: 20, recommendedFor: ["writing", "mixed", "coding"] },
      { id: "Team", pricePerUser: 30, minSeats: 5, recommendedFor: ["writing", "mixed", "coding"] },
    ]
  },
  {
    name: "ChatGPT",
    plans: [
      { id: "Free", pricePerUser: 0, recommendedFor: ["writing", "mixed", "data"] },
      { id: "Plus", pricePerUser: 20, recommendedFor: ["writing", "mixed", "data"] },
      { id: "Team", pricePerUser: 30, minSeats: 2, recommendedFor: ["writing", "mixed", "data"] },
    ]
  },
  {
    name: "Gemini",
    plans: [
      { id: "Free", pricePerUser: 0, recommendedFor: ["mixed", "research"] },
      { id: "Advanced", pricePerUser: 20, recommendedFor: ["mixed", "research"] },
    ]
  },
  {
    name: "Windsurf",
    plans: [
      { id: "Starter", pricePerUser: 0, recommendedFor: ["coding"] },
      { id: "Pro", pricePerUser: 15, recommendedFor: ["coding"] },
    ]
  }
];
