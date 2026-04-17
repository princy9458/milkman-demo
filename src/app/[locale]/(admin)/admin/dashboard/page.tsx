import { MetricCard } from "@/components/layout/metric-card";
import { AdminShell } from "@/components/layout/admin-shell";

type AdminDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "एडमिन डैशबोर्ड" : "Admin Dashboard"}
      subtitle={
        locale === "hi"
          ? "आज की डिलीवरी, कस्टमर स्टेटस और पेमेंट्स पर त्वरित नज़र."
          : "A quick view of today's deliveries, customer status, and payments."
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active customers" value="128" hint="7 customers paused this week" />
        <MetricCard label="Today's deliveries" value="94" hint="34 still pending" />
        <MetricCard label="Monthly sales" value="₹48,650" hint="Projected from delivery logs" />
        <MetricCard label="Outstanding dues" value="₹12,400" hint="11 accounts need follow-up" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="panel rounded-[30px] p-5">
          <h2 className="text-lg font-semibold">Today&apos;s route snapshot</h2>
          <div className="mt-4 space-y-3">
            {[
              ["Green Park", "18 customers", "12 delivered"],
              ["Shivaji Nagar", "26 customers", "21 delivered"],
              ["Station Road", "15 customers", "8 delivered"],
            ].map(([area, customers, delivered]) => (
              <div
                key={area}
                className="flex items-center justify-between rounded-2xl border border-border bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium">{area}</p>
                  <p className="text-sm text-muted">{customers}</p>
                </div>
                <p className="text-sm font-medium text-primary">{delivered}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel rounded-[30px] p-5">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            {["Add customer", "Mark deliveries", "Record payment", "View dues"].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-2xl border border-border bg-white px-4 py-3 text-left text-sm font-medium transition hover:border-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
