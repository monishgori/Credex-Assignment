# Metrics

## North Star Metric
**Number of High-Savings Audits Completed (>$500/mo savings)**
*Why*: A simple DAU metric is useless for a tool people use once. We only care about audits that generate enough potential savings to justify a Credex consultation. 

## 3 Input Metrics
1. **Landing Page Conversion Rate**: % of visitors who complete the form.
2. **Email Capture Rate**: % of users who enter their email to capture the report on the results page.
3. **Consultation Click-Through Rate**: % of high-savings users who click the "Book Consultation" CTA.

## What I'd instrument first
I would use PostHog to instrument the funnel: Page View -> Form Submitted -> Results Page Loaded -> Email Captured -> CTA Clicked.

## Pivot Trigger
If the **Email Capture Rate is < 5%** after 1,000 visitors, I would pivot the UX to gate the *results* behind the email (instead of showing value first), or I would assume the core value prop isn't resonating with the traffic source.
