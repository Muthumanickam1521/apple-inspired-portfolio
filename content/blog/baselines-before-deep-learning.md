---
title: Baselines before deep learning
date: 2026-10-12
summary: Why the first model I build is almost always the simplest one, and how it keeps every later improvement honest.
---

Before I reach for anything complex, I build the simplest model that could possibly work.

## Why start simple

1. **It sets the bar.** If a fancy model beats a seasonal average by 1%, it probably isn't worth the cost.
2. **It finds data problems early.** Leaks, gaps and label noise show up fast with a model you can inspect.
3. **It ships sooner.** A baseline in production teaches you more than a better model on a laptop.

## My default order

Start with a rule or average, then a linear model, then gradient boosting, and only then a neural network if the problem and data justify it.

A good baseline is not a shortcut. It is the measuring stick for everything that follows.
