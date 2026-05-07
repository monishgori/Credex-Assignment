# Reflection

## 1. Hardest Bug
The hardest issue was managing the dynamic state of the AI tools form and passing it cleanly into the math engine. Initially, calculating team-size rules against minimum-seat requirements caused false positives because the form allowed non-integer inputs. I debugged it by tracking the state payload in `console.log` and realizing the types were slipping. I fixed it by strictly typing the `PlanType` and `ToolName` enums and parsing the numeric inputs with fallbacks `parseInt(val) || 1`.

## 2. Decision Reversed
Initially, I planned to use Supabase for the database and authentication. However, I reversed this decision mid-week and switched to local SQLite with Prisma. The reason: evaluating this take-home project should be zero-friction. Asking reviewers to set up Supabase environment variables is annoying, whereas SQLite runs out of the box with `npm run dev`.

## 3. Week 2 Features
In Week 2, I would build the "Benchmark Mode" to let users see how their per-developer spend compares to companies of similar size. I would also integrate actual Resend API calls to deliver the PDF export via email.

## 4. AI Tools Used
- **Claude / Cursor**: Used extensively for scaffolding the Tailwind UI components rapidly. I didn't trust them with the exact math engine logic; I hand-wrote the Jest tests first and ensured the logic passed my manual rules.
- **Specific error caught**: The AI tried to use `prisma.config.ts` for Prisma version 7, which caused schema validation errors. I had to manually intervene and downgrade the Prisma version to ensure the build succeeded reliably.

## 5. Self-Rating
- **Discipline**: 9/10 — I kept steady, daily progress tracked in the DevLog.
- **Code Quality**: 8/10 — Clean abstractions in `lib/engine.ts`, but the form component is slightly large and could be broken down.
- **Design Sense**: 9/10 — The dark-mode, glassmorphism UI feels very premium.
- **Problem-solving**: 8/10 — Made pragmatic choices (like SQLite) to ensure the app actually ships.
- **Entrepreneurial thinking**: 9/10 — Focused heavily on the GTM and the viral loop of the shareable link.
