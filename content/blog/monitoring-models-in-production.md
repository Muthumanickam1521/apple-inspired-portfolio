---
title: Monitoring models in production
date: 2026-09-20
summary: A model is only finished when you can tell it is still working. The few checks I set up before every launch.
---

Training accuracy tells you very little about how a model behaves next month.

## Four checks I add before launch

1. **Input drift.** Compare live feature distributions with the training data.
2. **Score distribution.** A sudden shift in predictions is often the first warning sign.
3. **Latency and errors.** Treat the model like any other service.
4. **Business outcome.** Track the metric the model exists to improve, not only a proxy.

## Keep alerts few and meaningful

An alert that fires every day gets ignored. Start with a small set, tune the thresholds, and review them after each incident.
