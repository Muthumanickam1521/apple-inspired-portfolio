---
# Draft case study. Replace figures and details with the real story.
role: Lead data scientist
timeline: 5 months
team: 2 data scientists, 1 data engineer, 1 product manager
# Optional: a wide cover image (about 2400 x 1350) saved in public/.
# image: /images/work/demand-forecasting.jpg
---

## The problem

Planners relied on spreadsheets and moving averages to forecast demand. Errors were high on promotions and slow-moving items, which led to stock-outs on some products and overstock on others.

## My role

I owned the modelling approach, the evaluation framework and the production pipeline. I worked with a data engineer on features and with the product manager to agree on the metrics that mattered to planners.

## Key decisions

- **Start with a strong baseline.** A seasonal naive model gave us a fair benchmark and kept every later gain honest.
- **Gradient boosting over deep models.** LightGBM with lag, calendar and promotion features was accurate, fast to train and easy to explain.
- **Backtest like production.** Rolling-origin evaluation by SKU group replaced a single train/test split.

## Outcome

Forecast error fell by 21% against the previous process, and the weekly pipeline now runs unattended on Airflow with drift alerts. Next time I would involve planners earlier in feature design.
