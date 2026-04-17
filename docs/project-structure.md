# Milkman Project Structure

## Proposed Structure

```text
milkman/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   └── login/
│   │   │   │       └── page.tsx
│   │   │   ├── (admin)/
│   │   │   │   ├── admin/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── customers/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── new/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── [customerId]/
│   │   │   │   │   │       ├── page.tsx
│   │   │   │   │   │       └── edit/
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   ├── deliveries/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── billing/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── reports/
│   │   │   │   │       └── page.tsx
│   │   │   ├── (customer)/
│   │   │   │   ├── customer/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── history/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── billing/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── profile/
│   │   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── customers/
│   │   │   ├── deliveries/
│   │   │   ├── payments/
│   │   │   └── reports/
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── dashboard/
│   │   ├── customers/
│   │   ├── deliveries/
│   │   ├── billing/
│   │   ├── forms/
│   │   ├── shared/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── services/
│   │   ├── validations/
│   │   ├── utils/
│   │   ├── i18n/
│   │   └── constants/
│   ├── models/
│   │   ├── user.ts
│   │   ├── customer-profile.ts
│   │   ├── milk-plan.ts
│   │   ├── delivery.ts
│   │   ├── payment.ts
│   │   └── bill-summary.ts
│   ├── messages/
│   │   ├── en.json
│   │   └── hi.json
│   ├── types/
│   │   ├── auth.ts
│   │   ├── customer.ts
│   │   ├── delivery.ts
│   │   ├── billing.ts
│   │   └── common.ts
│   └── middleware.ts
├── public/
│   └── icons/
├── docs/
│   ├── planning.md
│   └── project-structure.md
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Folder Responsibilities

### `src/app`

- route structure using App Router
- locale-aware pages
- admin and customer route groups
- minimal API handlers if needed

### `src/components`

- reusable UI blocks
- form components
- dashboards and feature-specific presentation

### `src/lib`

- database setup
- auth helpers
- service logic
- validation schemas
- utility helpers
- i18n config

### `src/models`

- Mongoose models

### `src/messages`

- translation messages for English and Hindi

### `src/types`

- app-wide TypeScript types

## Suggested Initial File Creation Order

1. `package.json`
2. `src/app/globals.css`
3. `src/app/[locale]/layout.tsx`
4. `src/app/[locale]/(auth)/login/page.tsx`
5. `src/lib/db/connect.ts`
6. `src/lib/auth/config.ts`
7. `src/models/*.ts`
8. `src/messages/en.json`
9. `src/messages/hi.json`
10. admin shell components
11. customer pages

## Lightweight Architecture Notes

- keep business logic in `lib/services`
- keep models focused and small
- avoid excessive abstraction early
- prefer a single source of truth for permissions and validation
- start with server-rendered pages and add client interactivity only where needed

## Recommended UI Shell

### Admin

- top header
- collapsible sidebar on desktop
- bottom navigation or compact nav on mobile
- sticky quick action button for daily delivery flow

### Customer

- simpler card layout
- summary-first dashboard
- clear billing and due widgets

