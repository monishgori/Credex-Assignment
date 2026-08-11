# AI Subscription Tally

A free web application that acts as a "Mint for AI tool spend." It allows users to input their current AI subscriptions and usage, instantly calculates potential savings, and generates personalized recommendations to cut costs by downgrading plans, switching tools, or utilizing Credex infrastructure credits.

## Screenshots

*(Place screenshots here)*

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialize the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm run test
   ```

## Decisions & Trade-offs
1. **SQLite over Postgres**: Chose SQLite for the MVP to ensure the project runs locally immediately without requiring external database provisioning.
2. **Hardcoded Math Engine**: Intentionally avoided using an LLM for the core savings calculation because deterministic math is faster, cheaper, and less error-prone for financial audits.
3. **Next.js App Router**: Selected for its built-in API routes and server components, allowing the entire application (frontend + API + database client) to live in a single repository.
4. **Mocked AI Summary initially**: While the prompt for Anthropic is ready, I mocked the immediate return in the API to prevent API key issues from blocking the local test flow. 
5. **No Auth/Login**: Kept the tool completely unauthenticated to minimize friction and maximize the virality of the Open Graph link sharing.
