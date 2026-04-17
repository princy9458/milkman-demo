import Link from "next/link";
import { History, Home, IndianRupee, User } from "lucide-react";

type CustomerShellProps = {
  children: React.ReactNode;
  locale: string;
  title: string;
  subtitle: string;
};

const navItems = [
  { href: "dashboard", label: "Home", icon: Home },
  { href: "history", label: "History", icon: History },
  { href: "billing", label: "Billing", icon: IndianRupee },
  { href: "profile", label: "Profile", icon: User },
];

export function CustomerShell({
  children,
  locale,
  title,
  subtitle,
}: CustomerShellProps) {
  return (
    <div className="app-shell min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-3 py-4 sm:px-6 lg:px-8">
        <header className="panel rounded-[30px] px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Milkman Customer
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </header>
        <main className="flex-1">{children}</main>
        <nav className="panel sticky bottom-3 grid grid-cols-4 gap-2 rounded-[28px] p-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/${locale}/customer/${href}`}
              className="flex flex-col items-center gap-1 rounded-[22px] px-2 py-2 text-[11px] font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
