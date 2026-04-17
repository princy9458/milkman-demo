import { AdminShell } from "@/components/layout/admin-shell";
import { formatCurrencyINR } from "@/lib/utils";

type AdminBillingPageProps = {
  params: Promise<{ locale: string }>;
};

const accounts = [
  { name: "Amit Verma", billed: 3840, paid: 3020, due: 820 },
  { name: "Neha Sharma", billed: 2880, paid: 2880, due: 0 },
  { name: "Rakesh Kumar", billed: 4650, paid: 3200, due: 1450 },
];

export default async function AdminBillingPage({ params }: AdminBillingPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "बिलिंग और पेमेंट्स" : "Billing & Payments"}
      subtitle={
        locale === "hi"
          ? "हर कस्टमर का billed amount, paid amount और due amount."
          : "Track billed amount, paid amount, and due amount for every customer."
      }
    >
      <section className="panel rounded-[30px] p-5">
        <h2 className="text-lg font-semibold">Accounts overview</h2>
        <div className="mt-5 grid gap-3">
          {accounts.map((account) => (
            <article
              key={account.name}
              className="rounded-[26px] border border-border bg-white p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{account.name}</h3>
                  <p className="text-sm text-muted">Current monthly ledger</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm sm:min-w-[360px]">
                  <div>
                    <p className="text-muted">Billed</p>
                    <p className="font-medium">{formatCurrencyINR(account.billed)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Paid</p>
                    <p className="font-medium">{formatCurrencyINR(account.paid)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Due</p>
                    <p className="font-medium">{formatCurrencyINR(account.due)}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
