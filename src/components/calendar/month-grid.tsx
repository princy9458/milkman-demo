import { cn } from "@/lib/utils";
import type { CalendarDayRecord } from "@/lib/calendar";

type MonthGridProps = {
  monthLabel: string;
  leadingBlankSlots: number;
  days: CalendarDayRecord[];
  variant: "admin" | "customer";
  renderFooter?: (day: CalendarDayRecord) => React.ReactNode;
  /**
   * When true (default for admin), the component renders its built-in English
   * legend. Customer calendar renders its own translated legend, so it passes
   * `showLegend={false}`.
   */
  showLegend?: boolean;
  /** Optional translated labels for the built-in legend. */
  legendLabels?: { delivered: string; paused: string; skipped: string };
  onDateClick?: (dateKey: string) => void;
};

const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getToneClass(day: CalendarDayRecord) {
  const { status, skippedCount, pausedCount } = day;
  if (status === "PENDING") return "";
  if (skippedCount && skippedCount > 0) return "skipped";
  if (pausedCount && pausedCount > 0) return "paused";
  return "delivered";
}

export function MonthGrid({
  monthLabel,
  leadingBlankSlots,
  days,
  variant,
  renderFooter,
  showLegend = true,
  legendLabels,
  onDateClick,
}: MonthGridProps) {
  const labels = legendLabels ?? {
    delivered: "Delivered",
    paused: "Paused",
    skipped: "Skipped",
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            "text-base font-semibold sm:text-lg",
            variant === "admin" ? "text-[var(--admin-text)]" : "text-[var(--ink-900)]",
          )}
        >
          {monthLabel}
        </h2>
        {showLegend ? (
          <div className="hidden flex-wrap gap-2 sm:flex">
            <span className="chip mint"><span className="status-dot mint" />{labels.delivered}</span>
            <span className="chip sun"><span className="status-dot sun" />{labels.paused}</span>
            <span className="chip rose"><span className="status-dot rose" />{labels.skipped}</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink-300)] sm:gap-2 sm:text-[11px]">
        {weekLabels.map((label) => (
          <div key={label} className="py-1">{label.slice(0, variant === "admin" ? 3 : 1)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {Array.from({ length: leadingBlankSlots }).map((_, index) => (
          <div key={`blank-${index}`} aria-hidden="true" />
        ))}

        {days.map((day) => {
          const isFuture = day.isFuture;
          const isToday = day.dateKey === today;
          const tone = getToneClass(day);

          return (
            <article
              key={day.dateKey}
              onClick={() => !isFuture && onDateClick?.(day.dateKey)}
              className={cn(
                "month-grid-cell",
                tone,
                isFuture && "is-future",
                isToday && "is-today",
                !isFuture && onDateClick && "is-clickable",
              )}
            >
              <div className="flex items-start justify-between">
                <span className="day-number">{day.dayOfMonth}</span>
                {isToday ? (
                  <span className="day-meta">Today</span>
                ) : null}
              </div>

              {!isFuture ? (
                <>
                  <div className="day-liters">
                    {day.liters.toFixed(1)}
                    <span className="ml-0.5 text-[10px] font-bold opacity-60">L</span>
                  </div>
                  {variant === "admin" && (
                    <div className="pill-row">
                      {(day.deliveredCount ?? 0) > 0 && (
                        <span className="mini-pill" style={{ color: "#065F46" }}>
                          ✓ {day.deliveredCount}
                        </span>
                      )}
                      {(day.pausedCount ?? 0) > 0 && (
                        <span className="mini-pill" style={{ color: "#92400E" }}>
                          ⏸ {day.pausedCount}
                        </span>
                      )}
                      {(day.skippedCount ?? 0) > 0 && (
                        <span className="mini-pill" style={{ color: "#9F1239" }}>
                          ✕ {day.skippedCount}
                        </span>
                      )}
                    </div>
                  )}
                  {renderFooter ? (
                    <div className="mt-1 hidden text-[10px] leading-tight opacity-70 sm:block">
                      {renderFooter(day)}
                    </div>
                  ) : null}
                </>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
