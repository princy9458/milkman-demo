import Link from "next/link";
import { BellDot, ChartColumn, Droplets, Home, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  locale: string;
  title: string;
  subtitle: string;
};

const navItems = [
  { href: "dashboard", label: "Dashboard", icon: Home },
  { href: "customers", label: "Customers", icon: Users },
  { href: "deliveries", label: "Deliveries", icon: Droplets },
  { href: "billing", label: "Billing", icon: BellDot },
  { href: "reports", label: "Reports", icon: ChartColumn },
];

export function AdminShell({ children, locale, title, subtitle }: AdminShellProps) {
  return (
    <div className="app-shell min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-4 px-3 py-4 sm:px-6 lg:px-8">
        <aside className="panel hidden w-72 shrink-0 rounded-[30px] p-5 lg:flex lg:flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Milkman Admin
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Fast daily delivery operations for milk sellers.
          </p>
          <nav className="mt-8 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={`/${locale}/admin/${href}`}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="panel rounded-[30px] px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Seller Workspace
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="mt-1 text-sm text-muted">{subtitle}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-surface-muted px-3 py-2 text-sm font-medium text-muted">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                Super admin preview
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1">{children}</main>

          <nav className="panel sticky bottom-3 grid grid-cols-5 gap-2 rounded-[28px] p-2 lg:hidden">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={`/${locale}/admin/${href}`}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-[22px] px-2 py-2 text-[11px] font-medium text-muted transition hover:bg-surface-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
