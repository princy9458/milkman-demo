"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

type LogoutButtonProps = {
  locale: string;
};

export function LogoutButton({ locale }: LogoutButtonProps) {
  const router = useRouter();

  const isLoggedIn = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    () => (typeof window === "undefined" ? false : localStorage.getItem("isLoggedIn") === "true"),
    () => false,
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace(`/login?locale=${encodeURIComponent(locale)}`);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
