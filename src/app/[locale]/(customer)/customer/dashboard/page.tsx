import { MetricCard } from "@/components/layout/metric-card";
import { CustomerShell } from "@/components/layout/customer-shell";

type CustomerDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerDashboardPage({
  params,
}: CustomerDashboardPageProps) {
  const { locale } = await params;

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
      subtitle={
        locale === "hi"
          ? "आपकी दूध योजना, हाल की डिलीवरी और भुगतान की स्थिति."
          : "Your milk plan, recent deliveries, and payment status."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Daily plan" value="2.0 L" hint="Cow milk • Active" />
        <MetricCard label="This month" value="₹3,840" hint="Current bill estimate" />
        <MetricCard label="Pending due" value="₹820" hint="Last payment on 10 Apr" />
      </div>
    </CustomerShell>
  );
}
