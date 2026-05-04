# Tests

The automated tests are written using **Jest** and focus purely on the core mathematical logic of the audit engine. 

## How to Run
```bash
npm run test
```

## Coverage
File: `src/lib/engine.test.ts`

The following 5 scenarios are explicitly tested:
1. **Optimal Plan**: Ensures the engine recommends `KEEP` and calculates $0 savings when the user's current plan is perfectly optimal.
2. **Team Plan Downgrade**: Tests that the engine recommends `DOWNGRADE` when a user is paying for a minimum-seat Team plan (e.g., Claude Team, min 5 seats) but has a team size of 1.
3. **Cheaper Coding Alternative**: Verifies the engine recommends `SWITCH` to a specialized coding tool (like Windsurf) if the user is using a general-purpose expensive tool primarily for coding.
4. **Retail to Credits**: Tests that the engine suggests `CREDITS` and applies a 20% discount calculation when large teams (10+ seats) are paying retail rates.
5. **Aggregate Savings**: Ensures that the `totalMonthlySavings` and `totalAnnualSavings` correctly sum the savings across an array of multiple tools.
