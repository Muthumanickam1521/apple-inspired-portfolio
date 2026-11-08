---
# Draft case study. Replace figures and details with the real story.
role: ML engineer
timeline: 6 months
team: 2 ML engineers, 2 backend engineers, 1 risk analyst
# Optional: a wide cover image (about 2400 x 1350) saved in public/.
# image: /images/work/fraud-scoring.jpg
---

## The problem

Rule-based fraud checks missed new attack patterns and blocked too many genuine customers. The business needed a model that could score every transaction in real time.

## My role

I designed the model and the serving architecture, built the scoring API, and set up monitoring and a safe rollout with the backend team.

## Key decisions

- **Latency as a requirement.** A compact model and a feature cache kept scoring under 15 ms at the 99th percentile.
- **Shadow mode before launch.** The model scored live traffic silently for weeks so we could compare it to the rules before it made decisions.
- **Monitor the data, not just the model.** Input drift and score distribution alerts caught problems before they became incidents.

## Outcome

Fraud caught increased while false declines dropped, and the API has met its latency target since launch. Next time I would invest in automated retraining sooner.
