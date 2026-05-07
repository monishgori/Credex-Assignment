# User Interviews

## Interview 1
**Name**: S.T.
**Role**: CTO, Series A SaaS
**Direct Quotes**:
1. "We literally just let engineers expense whatever they want right now."
2. "I know we are wasting money on inactive Copilot seats, but tracking them down is a hassle."
3. "I wouldn't use this if it required me to connect my company's AWS account."
**Most Surprising**: He didn't care about the absolute dollar amount of savings; he cared about the *administrative overhead* of managing the licenses.
**Change to Design**: Highlighted "Consolidated Billing via Credex" as a primary value prop alongside the dollar savings.

## Interview 2
**Name**: J.M.
**Role**: VPE, Seed-stage Fintech
**Direct Quotes**:
1. "Are people really using Cursor? We just bought Copilot for everyone."
2. "If you can get me ChatGPT Enterprise features without the massive seat minimums, I'd buy today."
3. "I don't trust automated audits, they always try to upsell me."
**Most Surprising**: The deep skepticism towards "free audits."
**Change to Design**: Added the "Honest Audit" rule in the engine. If savings are <$100, the tool explicitly says "You're spending well" to build trust.

## Interview 3
**Name**: A.R.
**Role**: Founder, Bootstrapped AI App
**Direct Quotes**:
1. "We spend $2k/mo on Anthropic API, it's our biggest cost."
2. "Wait, you can get discounted API credits? How?"
3. "I check my Stripe billing dashboard every morning."
**Most Surprising**: Founders of AI apps care more about API costs than seat-based SaaS costs.
**Change to Design**: Ensured the tool supports inputs for API spend alongside standard SaaS subscriptions.
