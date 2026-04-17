import { AdminShell } from "@/components/layout/admin-shell";
import { formatCurrencyINR } from "@/lib/utils";

type AdminCustomersPageProps = {
  params: Promise<{ locale: string }>;
};

const customers = [
  { name: "Amit Verma", area: "Green Park", quantity: "2.0 L", rate: 62, due: 820 },
  { name: "Neha Sharma", area: "Station Road", quantity: "1.5 L", rate: 64, due: 0 },
  { name: "Rakesh Kumar", area: "Shivaji Nagar", quantity: "2.5 L", rate: 60, due: 1450 },
];

export default async function AdminCustomersPage({
  params,
}: AdminCustomersPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "कस्टमर मैनेजमेंट" : "Customer Management"}
      subtitle={
        locale === "hi"
          ? "कस्टमर प्रोफाइल, दूध की मात्रा और बकाया रिकॉर्ड एक जगह."
          : "Manage customer profiles, milk quantities, and outstanding balances in one place."
      }
    >
      <section className="panel rounded-[30px] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Customer list</h2>
          <button
            type="button"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Add customer
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          {customers.map((customer) => (
            <article
              key={customer.name}
              className="rounded-[26px] border border-border bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted">{customer.area}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm sm:min-w-[320px]">
                  <div>
                    <p className="text-muted">Plan</p>
                    <p className="font-medium">{customer.quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted">Rate</p>
                    <p className="font-medium">{formatCurrencyINR(customer.rate)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Due</p>
                    <p className="font-medium">{formatCurrencyINR(customer.due)}</p>
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
