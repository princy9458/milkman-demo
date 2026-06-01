"use client";

import type { ReactNode } from "react";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthGuardProps = {
  locale: string;
  children: ReactNode;
};

export function AuthGuard({ locale, children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isProtectedRoute =
    pathname === `/${locale}/dashboard` ||
    pathname.startsWith(`/${locale}/admin`) ||
    pathname.startsWith(`/${locale}/customer`);

  const isLoggedIn = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => (typeof window === "undefined" ? false : localStorage.getItem("isLoggedIn") === "true"),
    () => false,
  );

  useEffect(() => {
    if (isProtectedRoute && !isLoggedIn) {
      router.replace(`/login?locale=${encodeURIComponent(locale)}`);
    }
  }, [isLoggedIn, isProtectedRoute, locale, router]);

  if (!isProtectedRoute) {
    return children;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-500" />
      </div>
    );
  }

  return children;
}
