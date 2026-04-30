"use client";

import { useState } from "react";
import { CalendarDays, Minus, Plus, UserRound } from "lucide-react";
import { AdminBadge, AdminDivider } from "@/components/layout/admin-ui";
import { cn, formatCurrencyINR } from "@/lib/utils";
import { CustomerCardActions } from "./customer-card-actions";
import { CustomerDetailModal } from "./customer-detail-modal";
import { CustomerSchedulePopover } from "./customer-schedule-popover";

type CustomerListItemProps = {
  customer: {
    id: string;
    customerCode: string;
    name: string;
    phone: string;
    quantity: number;
    quantityLabel: string;
    due: number;
    rate: number;
    address: string;
    areaName: string;
    areaCode: string;
    status: "ACTIVE" | "PAUSED" | "INACTIVE";
    lastPaymentDate?: Date | string | null;
    deliveryInstruction?: string;
    notes?: string;
  };
  locale: string;
  tDue: string;
  onView?: (mode: "view" | "details" | "schedule") => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

export function CustomerListItem({ 
  customer, 
  locale, 
  tDue, 
  onView,
  isMenuOpen,
  setMenuOpen
}: CustomerListItemProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const formatDateShort = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
    }).format(new Date(date));
  };

  return (
    <article 
      className={cn(
        "admin-panel rounded-[22px] px-4 py-4 transition relative group",
        (isMenuOpen || isPopoverOpen) ? "z-[60]" : "z-10",
        "hover:bg-white active:scale-[0.995]"
      )}
    >
      {/* Clickable Overlay for Details (Default to 'view') */}
      <div
        onClick={() => onView?.("view")}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer"
        aria-label="View details"
      />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pointer-events-none">
        {/* 1. Customer Info */}
        <div className="flex items-center gap-3 sm:min-w-[250px]">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)] sm:flex">
            <UserRound className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-bold text-[var(--admin-text)] text-[15px]">{customer.name}</h3>
              <AdminBadge tone={customer.status === "ACTIVE" ? "success" : "blue"} className="text-[9px] uppercase h-4 px-1.5 leading-none font-bold">
                {customer.status}
              </AdminBadge>
            </div>
            <p className="text-[12px] text-gray-500 font-medium truncate mt-0.5">
              {customer.areaName} • <span className="text-[var(--admin-primary-strong)] font-bold">{customer.quantity.toFixed(1)}L</span>
            </p>
          </div>
        </div>

        {/* 2. Middle Space (Empty) */}
        <div className="flex-1 hidden sm:block" />

        {/* 3. Due & Actions Section (Right) */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pointer-events-auto sm:min-w-[200px]">
          <div className="text-right mr-3">
            <p
              className={cn(
                "text-[15px] font-black tracking-tight",
                customer.due > 500 ? "text-[#e11d48]" : "text-[var(--admin-text)]"
              )}
            >
              {formatCurrencyINR(customer.due)}
            </p>
            <p className="text-[10px] font-bold uppercase text-gray-400 mt-0.5">
              Due <span className="mx-1 text-gray-300">•</span> 
              <span className="text-gray-500 lowercase first-letter:uppercase">paid: {formatDateShort(customer.lastPaymentDate)}</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-90",
                  isPopoverOpen ? "bg-blue-100 text-blue-600 shadow-inner" : "bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500"
                )}
                title="Delivery Schedule"
              >
                <CalendarDays className="h-5 w-5" />
              </button>

              <CustomerSchedulePopover 
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                customerCode={customer.customerCode}
                onViewFull={() => setIsScheduleOpen(true)}
              />
            </div>

            <CustomerCardActions 
              id={customer.id}
              customerCode={customer.customerCode}
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
              locale={locale}
              onView={onView}
            />
          </div>
        </div>
      </div>

      <CustomerDetailModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        customer={customer}
        locale={locale}
        mode="schedule"
      />
    </article>
  );
}
