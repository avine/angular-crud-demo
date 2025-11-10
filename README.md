# Angular CRUD Demo

This repository contains two Angular applications:

1. Based on a shared `upsert` component for both `add` and `update` users
2. Based on separate components for `add` and `update` users (following SOLID principles).

## Goal

The goal is to demonstrate that, in this specific use-case, applying the single responsibility principle is a bad idea.

❌ Indeed, the `add` and `update` components behave very similarly.

✅ Therefore, it is preferable to combine them into a single `upsert` component.
