export const APP_NAME = "Milkman";

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export const DELIVERY_STATUS = {
  DELIVERED: "DELIVERED",
  SKIPPED: "SKIPPED",
  PAUSED: "PAUSED",
} as const;

export const PAYMENT_MODE = {
  CASH: "CASH",
  UPI: "UPI",
  BANK: "BANK",
} as const;
