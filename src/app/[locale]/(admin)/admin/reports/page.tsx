import { AdminShell } from "@/components/layout/admin-shell";

type AdminReportsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminReportsPage({ params }: AdminReportsPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "रिपोर्ट्स" : "Reports"}
      subtitle={
        locale === "hi"
          ? "एरिया, डिलीवरी और बिलिंग insights के लिए summary cards."
          : "Summary cards for area, delivery, and billing insights."
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Area performance", "Top route: Shivaji Nagar"],
          ["Delivery trends", "92% completion this week"],
          ["Recovery status", "₹12,400 due across 11 accounts"],
        ].map(([title, value]) => (
          <article key={title} className="panel rounded-[30px] p-5">
            <p className="text-sm text-muted">{title}</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
