import Link from "next/link";

const navItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Review revenue, tips collected, and current staff balances.",
  },
  {
    href: "/staff",
    title: "Staff",
    description: "Add employees and monitor each person’s tip balance.",
  },
  {
    href: "/transactions",
    title: "Transactions",
    description: "Log services and tips while calculating processing fees.",
  },
  {
    href: "/test-connection",
    title: "Connection Test",
    description: "Confirm the app can reach the Supabase tables.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
            SalonTip CRM
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            Track staff tips, card fees, and balances from one local dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Choose a workspace below to manage employees, log transactions, or
            verify the Supabase connection.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
