import { AdminShell } from "@/components/layout/admin-shell";

type AdminDeliveriesPageProps = {
  params: Promise<{ locale: string }>;
};

const tasks = [
  { name: "Amit Verma", quantity: "2.0 L", status: "Delivered" },
  { name: "Neha Sharma", quantity: "1.5 L", status: "Pending" },
  { name: "Rakesh Kumar", quantity: "2.5 L", status: "Pending" },
];

export default async function AdminDeliveriesPage({
  params,
}: AdminDeliveriesPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "आज की डिलीवरी" : "Today's Deliveries"}
      subtitle={
        locale === "hi"
          ? "मोबाइल पर जल्दी mark करने के लिए one-tap actions."
          : "One-tap actions for fast delivery marking on mobile."
      }
    >
      <section className="grid gap-3">
        {tasks.map((task) => (
          <article key={task.name} className="panel rounded-[30px] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">{task.name}</h2>
                <p className="text-sm text-muted">
                  {task.quantity} planned for today • {task.status}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:w-[320px]">
                <button
                  type="button"
                  className="rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-white"
                >
                  Delivered
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-border bg-white px-3 py-3 text-sm font-semibold"
                >
                  Skip
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-border bg-white px-3 py-3 text-sm font-semibold"
                >
                  Pause
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
