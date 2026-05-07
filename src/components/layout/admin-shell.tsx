"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Bell,
  CalendarDays,
  ChartColumn,
  ChevronRight,
  CreditCard,
  Droplets,
  Home,
  Menu,
  NotebookText,
  Package2,
  ShoppingCart,
  Store,
  Users,
  X,
  LogOut,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  locale: string;
  title: string;
  subtitle: string;
  hideHero?: boolean;
  search?: React.ReactNode;
};

type NavKey =
  | "dashboard"
  | "vendors"
  | "customers"
  | "deliveries"
  | "calendar"
  | "billing"
  | "reports"
  | "area-insights"
  | "purchases"
  | "areas"
  | "products";

type NavItem = {
  href: NavKey | "reports/area-insights";
  icon: typeof Home;
  labelKey?: string;
  isLive?: boolean;
};

const navItems: NavItem[] = [
  { href: "dashboard", icon: Home, isLive: true },
  { href: "vendors", icon: Store },
  { href: "customers", icon: Users },
  { href: "deliveries", icon: Droplets },
  { href: "calendar", icon: CalendarDays },
  { href: "billing", icon: CreditCard },
  { href: "reports", icon: ChartColumn },
  { href: "reports/area-insights" as const, icon: NotebookText, labelKey: "areaInsights" },
  { href: "purchases", icon: ShoppingCart },
  { href: "areas", icon: Building2 },
  { href: "products", icon: Package2 },
];

export function AdminShell({
  children,
  locale,
  title,
  subtitle,
  hideHero,
  search,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const tShell = useTranslations("admin.shell");
  const tNav = useTranslations("admin.nav");

  const isDashboard = pathname === `/${locale}/admin/dashboard`;

  const renderNavItem = ({ href, icon: Icon, labelKey, isLive }: NavItem) => {
    const target = `/${locale}/admin/${href}`;
    const isActive = pathname === target || pathname.startsWith(`${target}/`);
    const label = labelKey ? tNav(labelKey) : tNav(href);

    return (
      <Link
        key={href}
        href={target}
        onClick={() => setIsDrawerOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-[18px] px-4 py-3 transition-all duration-200",
          isActive
            ? "bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)] shadow-sm"
            : "text-[var(--admin-muted)] hover:bg-[var(--admin-primary-soft)]/40 hover:text-[var(--admin-text)]",
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-[var(--admin-primary-strong)]")} />
        <span className="flex-1 text-sm font-semibold">{label}</span>
        {isLive && (
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase text-emerald-600">
            LIVE
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
      </Link>
    );
  };

  return (
    <div className="admin-theme">
      <div className="mx-auto flex min-h-screen max-w-[1440px] gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <aside className="admin-panel sticky top-[76px] hidden h-[calc(100vh-1.5rem-64px)] w-[296px] shrink-0 flex-col overflow-y-auto rounded-[32px] p-5 lg:flex">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">
                {tShell("brand")}
              </p>
              <p className="mt-1 text-xl font-semibold text-[var(--admin-text)]">
                {tShell("panelTitle")}
              </p>
            </div>
          </div>

          <div className="admin-panel-muted mt-6 rounded-[24px] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
              {tShell("workspace")}
            </p>
            <p className="mt-2 text-base font-semibold">{tShell("workspaceTitle")}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--admin-muted)]">
              {tShell("workspaceDescription")}
            </p>
          </div>

          <nav className="mt-6 space-y-2">{navItems.map(renderNavItem)}</nav>

          <div className="admin-divider my-6" />

          <div className="admin-panel-muted rounded-[24px] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
                <NotebookText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                  {tShell("helpLabel")}
                </p>
                <p className="text-sm font-semibold">{tShell("helpTitle")}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--admin-muted)]">
              {tShell("helpDescription")}
            </p>
          </div>
        </aside>

        <div
          className={cn(
            "fixed inset-0 z-40 bg-[#12213c]/28 transition duration-200 lg:hidden",
            isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setIsDrawerOpen(false)}
        />

        <aside
          className={cn(
            "fixed left-0 top-[64px] z-50 h-[calc(100vh-64px)] w-[308px] max-w-[86vw] p-4 transition-transform duration-200 lg:hidden",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="admin-panel flex h-full flex-col rounded-[32px] p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
                    {tShell("brand")}
                  </p>
                  <p className="text-lg font-bold text-[var(--admin-text)]">{tShell("mobileTitle")}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="admin-icon-button h-11 w-11"
                aria-label={tShell("closeMenu")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="admin-panel-muted mt-6 rounded-[24px] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)]">
                {tShell("activeRoute")}
              </p>
              <p className="mt-1 text-base font-bold text-[var(--admin-text)]">
                {tShell("customersThisCycle", { count: 128 })}
              </p>
            </div>

            <nav className="mt-6 space-y-2">{navItems.map(renderNavItem)}</nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-16 z-30 mb-8 sm:top-[76px] sm:mb-6">
            <div className="admin-panel rounded-[30px] px-4 py-3 shadow-lg shadow-blue-900/5 sm:px-5 sm:shadow-none">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="admin-icon-button h-11 w-11 lg:hidden"
                    aria-label={tShell("openMenu")}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  {!isDashboard && (
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="admin-icon-button hidden h-11 w-11 md:flex"
                      title="Go Back"
                      aria-label="Go Back"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--admin-muted)] sm:text-[13px]">
                      {tShell("workspaceEyebrow")}
                    </p>
                    <p className="truncate text-base font-bold text-[var(--admin-text)] sm:text-xl">
                      {title}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-white px-3 py-2">
                    <Search className="h-4 w-4 text-[var(--admin-muted)]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-52 bg-transparent text-sm outline-none"
                      aria-label="Search"
                    />
                  </div>

                  <button
                    type="button"
                    className="admin-icon-button h-11 w-11"
                    aria-label={tShell("notifications")}
                  >
                    <Bell className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-3 border-l border-[var(--admin-border)] pl-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-[var(--admin-text)]">Admin Panel</p>
                      <p className="text-[10px] font-medium text-[var(--admin-muted)]">admin@dairly.in</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--admin-primary-soft)] bg-[var(--admin-primary-soft)] font-bold text-[var(--admin-primary-strong)] text-xs">
                      AD
                    </div>
                    <button
                      type="button"
                      title="Logout"
                      onClick={() => router.push(`/${locale}/login`)}
                      className="admin-icon-button h-11 w-11"
                      aria-label="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mt-4 space-y-8 pb-24 sm:mt-0 sm:space-y-4">
            {!hideHero && (
              <section className="admin-panel rounded-[32px] px-5 py-5 sm:px-6 hidden md:block">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                      {tShell("heroEyebrow")}
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--admin-text)] sm:text-3xl">
                      {title}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--admin-muted)] sm:text-[15px]">
                      {subtitle}
                    </p>
                    {search && (
                      <div className="mt-4 w-full sm:mt-0 sm:max-w-md">
                        {search}
                      </div>
                    )}
                  </div>
                  {tShell("liveMode") && (
                    <div className="admin-panel-muted rounded-[22px] px-4 py-3 text-sm text-[var(--admin-muted)]">
                      <span className="font-semibold text-[var(--admin-text)]">
                        {tShell("liveMode")}
                      </span>
                      {tShell("superAdminPreview") && (
                        <>
                          <span className="mx-2 text-[var(--admin-border)]">•</span>
                          <span>{tShell("superAdminPreview")}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {children}
          </main>

          <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white/80 px-2 backdrop-blur-lg lg:hidden">
            {[
              { href: "dashboard", icon: Home },
              { href: "deliveries", icon: Droplets },
              { href: "customers", icon: Users },
              { href: "billing", icon: CreditCard },
            ].map(({ href, icon: Icon }) => {
              const target = `/${locale}/admin/${href}`;
              const isActive = pathname === target || pathname.startsWith(`${target}/`);
              return (
                <Link
                  key={href}
                  href={target}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 transition-all active:scale-90",
                    isActive ? "text-blue-600" : "text-slate-400",
                  )}
                >
                  <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                  <span className={cn("text-[10px] font-bold", isActive ? "text-blue-600" : "text-slate-400")}>
                    {tNav(href)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
