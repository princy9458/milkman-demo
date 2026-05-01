"use client";

import { UserRound } from "lucide-react";
import { AdminBadge } from "@/components/layout/admin-ui";
import { cn, formatCurrencyINR } from "@/lib/utils";
import { CustomerCardActions } from "./customer-card-actions";

type CalendarDay = {
  dateKey: string;
  dateLabel: string;
  dayOfMonth: number;
  weekdayLabel: string;
  liters: number;
  status: "DELIVERED" | "SKIPPED" | "PAUSED" | "PENDING";
  isFuture: boolean;
};

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
    calendarData?: {
      monthLabel: string;
      leadingBlankSlots: number;
      days: CalendarDay[];
    };
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
  onView,
  isMenuOpen,
  setMenuOpen
}: CustomerListItemProps) {

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
        isMenuOpen ? "z-[60]" : "z-10",
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
          <div className="flex flex-col items-start mr-3">
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

          <div className="flex items-center gap-4 flex-nowrap">
            {/* Improved Mini Calendar Preview */}
            {customer.calendarData && (
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-tighter mr-1">
                  {customer.calendarData.monthLabel.split(" ")[0]}
                </span>
                <div
                  className="grid grid-cols-7 gap-[2px] p-1 bg-gray-50 rounded-lg border border-gray-100 shadow-inner"
                  style={{ width: '74px' }}
                >
                  {Array.from({ length: customer.calendarData.leadingBlankSlots }).map((_, i) => (
                    <div key={`blank-${i}`} className="w-2 h-2" />
                  ))}
                  {customer.calendarData.days.map((day) => {
                    const isToday = day.dateKey === new Date().toISOString().slice(0, 10);
                    return (
                      <div
                        key={day.dateKey}
                        title={`${day.dateLabel}: ${day.status}`}
                        className={cn(
                          "w-2 h-2 rounded-[2px] border-[0.5px] flex items-center justify-center text-[5px] font-bold transition-all",
                          day.isFuture ? "bg-white border-gray-50 text-gray-300" :
                            day.status === "PAUSED" ? "bg-amber-400 border-amber-500 text-amber-900" :
                              day.status === "SKIPPED" ? "bg-rose-400 border-rose-500 text-rose-900" :
                                day.status === "DELIVERED" ? "bg-emerald-400 border-emerald-500 text-emerald-900" :
                                  "bg-white border-gray-100",
                          isToday && "ring-[1px] ring-blue-500 ring-offset-[0.5px] z-10 scale-110"
                        )}
                      >
                        {/* Optional: show day number if it fits nicely, or keep it as dots but with title */}
                      </div>
                    );
                  })}
                </div>
                {/* Tiny Legend */}
                <div className="flex gap-2 pr-1">
                  <div className="flex items-center gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[7px] font-black text-gray-400 uppercase">D</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[7px] font-black text-gray-400 uppercase">S</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[7px] font-black text-gray-400 uppercase">P</span>
                  </div>
                </div>
              </div>
            )}

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

    </article>
  );
}
