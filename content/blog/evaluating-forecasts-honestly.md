---
title: Evaluating forecasts honestly
date: 2026-08-02
summary: A single train/test split flatters time-series models. Rolling backtests give a number you can trust.
---

A random split leaks the future into the past, and the score looks better than reality.

## What I do instead

- **Split by time.** Always train on the past and test on the future.
- **Roll the origin.** Repeat the test over several periods to see how stable the error is.
- **Segment the results.** An average hides the products or regions where the model fails.

## Report the error in plain terms

Planners do not think in RMSE. Translate the result into units and money they recognise, and say clearly where the model should not be trusted.
