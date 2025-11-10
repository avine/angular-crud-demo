# Angular CRUD Demo

This repository contains two Angular applications, each implementing the use case of managing a list of users.

1. The first implementation relies on a shared `upsert` component for the `add` and `update` users.
2. The second implementation relies on separate components for the `add` and `update` users.

## Goal

The goal is to demonstrate that, in this specific use case, applying the _"Single Responsibility"_ principle (SOLID) at an inappropriate level leads to a fragile implementation.

❌ Indeed, the `add` and `update` components behave very similarly:

- [add-user.ts](./projects/solid/src/app/users/add-user/add-user.ts)
- [update-user.ts](./projects/solid/src/app/users/update-user/update-user.ts)

✅ Therefore, it is preferable to combine them into a single `upsert` component:

- [upsert-user.ts](./src/app/users/upsert-user/upsert-user.ts)

## Explanation

The `add-user.ts` and `update-user.ts` components (and their templates) are likely to change for the same reasons:

- Error handling
- URL redirection after form submission
- ...

And that's why applying the _"Single Responsibility"_ principle at this level is a bad idea.

## Usage

- Run `npm install` to install the workspace dependencies.
- Run the first implementation: `npm run start`.
- Run the second implementation: `npm run start:solid`.
