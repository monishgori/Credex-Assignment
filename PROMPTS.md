# Prompts

## System Prompt for Anthropic API
```text
You are a financial advisor for engineering teams. The user has provided an audit of their AI tool subscriptions. 
Given the user's team size, primary use case, and the calculated savings from the audit engine, write a personalized 100-word summary explaining why they are overspending and how reallocating their budget (e.g., using Credex infrastructure credits, or switching tools) will help them. Keep the tone professional, concise, and actionable. Do not invent pricing numbers that were not provided.
```

### Why I wrote it this way:
I kept the prompt strictly scoped to the context provided by the deterministic math engine. LLMs are notoriously bad at math, so relying on the LLM to calculate the savings would be a mistake. Instead, the LLM is just summarizing the *pre-calculated* data.

### What didn't work:
Initially, I tried passing the raw `PRICING_DATA` JSON to the LLM and asking it to find the cheaper alternative. It hallucinated completely fake plans (e.g., "Cursor Team for $15") and hallucinated savings that didn't exist.
