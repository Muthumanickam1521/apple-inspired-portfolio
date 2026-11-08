---
# Draft case study. Replace figures and details with the real story.
role: Data scientist
timeline: 4 months
team: 1 data scientist, 1 analyst, 1 customer success lead
# Optional: a wide cover image (about 2400 x 1350) saved in public/.
# image: /images/work/churn-prediction.jpg
---

## The problem

The customer success team reacted to cancellations after they happened. They needed an early signal of which accounts were at risk, and a reason they could act on.

## My role

I framed the problem, built the feature set from product usage and billing data, trained and validated the model, and presented the results to the customer success team.

## Key decisions

- **Predict a useful window.** The model flags risk 60 days ahead, early enough for outreach to matter.
- **Explainability first.** SHAP drivers were shown next to every score so the team knew what to say to each customer.
- **Measure the action, not just the AUC.** We ran a controlled outreach test to confirm the model changed outcomes.

## Outcome

Retention improved by 18% in the targeted group compared with the control group. The model is retrained monthly and monitored for drift. I would add uplift modelling next to target the customers most likely to respond.
