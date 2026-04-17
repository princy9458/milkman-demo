# Milkman Planning

## Product Summary

Milkman is a lightweight bilingual milk delivery management web app for Indian sellers. The product is admin-first, with a companion customer portal for self-service visibility.

## Primary Users

### Super Admin

- manages customers
- tracks milk quantities
- records deliveries
- updates payments and balances
- monitors dues

### Customer

- views current milk plan
- checks delivery status/history
- sees account dues and payment records
- updates limited profile details if allowed

## MVP Scope

### Must Have

- authentication
- role-based routing
- customer CRUD
- daily delivery marking
- milk plan management
- payment recording
- due calculation
- customer self dashboard
- bilingual support
- INR formatting

### Should Have

- dashboard KPIs
- search and filters
- monthly summaries
- mobile quick actions

### Later

- reports export
- pause/holiday rules
- notifications
- PWA installability

## Execution Plan

### Stage 1: App Foundation

- initialize Next.js app with App Router and TypeScript
- configure Tailwind CSS
- create theme tokens and responsive admin shell
- set up environment variables
- connect MongoDB
- add auth and protected routes

### Stage 2: Domain Layer

- define Mongoose schemas
- add validation with Zod
- create service helpers for customers, plans, deliveries, payments
- define role guards and shared types

### Stage 3: Admin UX

- dashboard overview
- customer listing page
- customer create/edit form
- customer detail page
- daily delivery page with one-tap marking
- billing/payments page

### Stage 4: Customer UX

- customer dashboard
- plan summary
- delivery history
- billing page
- profile page

### Stage 5: Quality

- seed data
- form validation states
- empty states
- loading and error states
- mobile polish

## Recommended MVP Screens

### Public

- login

### Admin

- dashboard
- customers list
- add/edit customer
- customer detail
- deliveries today
- payments/accounts

### Customer

- dashboard
- my deliveries
- my billing
- profile

## Key Business Rules

- one customer can have one active milk plan at a time for MVP
- quantity can be decimal, e.g. `2.5`
- delivery status is recorded daily
- due amount = total bill - payments received
- only super admin can manage all customers and all financial entries
- customer sees only their own records

## Mobile UX Notes

- bottom-safe spacing for phones
- large CTA buttons for delivery actions
- compact cards with essential data only
- minimal typing during delivery workflow
- searchable customer list

## Localization Notes

- store UI messages separately
- support English and Hindi labels
- use INR and Indian date conventions

## Risks To Control

- auth complexity should stay minimal
- billing logic must remain transparent
- avoid overcomplicated subscription rules in MVP
- keep schemas extendable without premature abstraction

## First Development Order

1. project setup
2. auth and route protection
3. customer management
4. milk plans
5. delivery tracking
6. billing and payments
7. customer portal

