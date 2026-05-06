# Architecture

## System Diagram
```mermaid
graph TD
    Client[Browser / Client] -->|Submit Form| API[Next.js API Route /api/audit]
    API --> Engine[Audit Math Engine]
    API --> DB[(SQLite Database / Prisma)]
    API --> Email[Resend API]
    DB --> Page[Next.js App Router /audit/[id]]
    Page --> Client
```

## Data Flow
1. User lands on `/`, inputs tools (Cursor, Copilot, etc.), and sets usage parameters.
2. Client sends JSON payload to `/api/audit`.
3. The Audit Engine evaluates each tool against `PRICING_DATA` logic to find savings.
4. The result, including the AI-generated summary, is saved to the SQLite database via Prisma.
5. The API returns the unique UUID for the audit.
6. The client redirects to `/audit/[uuid]`.
7. The server-rendered results page fetches the audit from the database and displays the interactive breakdown.

## Stack Choice
- **Next.js (App Router)**: The default standard for fast, server-rendered React applications.
- **Tailwind CSS + shadcn/ui**: For a highly polished, premium SaaS look without the overhead of heavy component libraries.
- **SQLite + Prisma**: Fulfills the requirement for a real backend relational database while remaining completely portable for this take-home assignment.
- **Jest**: Used for robust, isolated testing of the core mathematical audit engine without needing the Next.js runtime.

## Scaling to 10k Audits/Day
If this tool scaled to 10,000 audits per day, I would make the following changes:
1. **Migrate to PostgreSQL**: Move off SQLite to a managed Postgres instance (e.g., Supabase or RDS) to handle high concurrent writes.
2. **Caching**: Use Redis to cache the `PRICING_DATA` and frequently accessed pricing rules if they become dynamic.
3. **Queueing**: Move the transactional email and AI summary generation into a background worker queue (e.g., Inngest or Trigger.dev) so the API response isn't blocked by slow external APIs.
