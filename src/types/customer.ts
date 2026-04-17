import type { StatusOption } from "@/types/common";

export type MilkQuantityUnit = "LITER";

export interface CustomerSummary {
  id: string;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  ratePerLiter: number;
  status: StatusOption;
}
