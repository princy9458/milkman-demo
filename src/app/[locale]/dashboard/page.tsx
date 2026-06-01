"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const locale = window.location.pathname.split("/")[1] || "en";

    if (isLoggedIn) {
      router.replace(`/${locale}/admin/dashboard`);
    } else {
      router.replace("/login?locale=" + encodeURIComponent(locale));
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
    </div>
  );
}
