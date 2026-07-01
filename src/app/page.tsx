"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    title: "Book appointments",
    text: "Give clients a simple way to request services while your salon keeps the calendar organized.",
  },
  {
    title: "Manage clients",
    text: "Track client names, visit history, and high-value regulars from one owner dashboard.",
  },
  {
    title: "Track staff tips",
    text: "Separate staff tip money from salon revenue so records are cleaner for reporting and payouts.",
  },
];

const schedule = [
  ["9:30", "Color consult", "Maya"],
  ["11:00", "Cut + blowout", "Lena"],
  ["1:30", "Balayage", "Nora"],
];

const balances = [
  ["Maya Reed", "$186.40"],
  ["Lena Cole", "$142.25"],
  ["Nora James", "$96.80"],
];

const packages = [
  {
    name: "Booking",
    price: "$7.99",
    description: "A clean appointment request flow for salons that need the basics covered.",
    items: ["Online booking", "Owner notifications", "Simple service requests"],
  },
  {
    name: "Booking + Website",
    price: "$14.99",
    description: "Booking plus a custom salon website that gives your business a polished front door.",
    items: ["Custom website", "Online booking", "Mobile-ready salon page"],
    featured: true,
  },
  {
    name: "Growth Suite",
    price: "$29.99",
    description: "Website, client portal, booking, and an AI assistant built to help advertise your salon.",
    items: [
      "Custom website",
      "Customer portal",
      "Booking system",
      "AI social advertising assistant",
    ],
  },
];

export default function Home() {
  const [isBooked, setIsBooked] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17112a]">
      <section className="relative bg-[linear-gradient(135deg,#6f45ff_0%,#b14cff_38%,#ff6f87_72%,#ffb46a_100%)] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:86px_86px]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg font-black text-[#6f45ff] shadow-lg shadow-purple-950/20">
                S
              </span>
              <span className="text-lg font-bold tracking-normal">
                SalonTip CRM
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-white/82 md:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#packages" className="transition hover:text-white">
                Packages
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
              <Link href="/dashboard" className="transition hover:text-white">
                Dashboard
              </Link>
            </nav>

            <a
              href="#packages"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#6f45ff] shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5"
            >
              View packages
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-6xl xl:text-7xl">
                Booking, clients, and tip tracking for salons
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/86">
                Help salon owners book appointments, manage client relationships,
                track staff tips, and keep tip records separate from shop income.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#packages"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#10212b] px-7 text-sm font-bold text-white shadow-xl shadow-purple-950/25 transition hover:-translate-y-0.5"
                >
                  Choose a package
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18"
                >
                  Book a setup call
                </a>
              </div>

              <div className="mt-8 grid max-w-xl gap-3 rounded-[28px] bg-white/15 p-4 backdrop-blur-md sm:grid-cols-3">
                {["Appointments", "Clients", "Tip records"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/12 p-4">
                    <p className="text-sm font-black">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-white/72">
                      Built into one salon workspace.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-2xl lg:block">
              <div className="absolute -left-6 top-12 hidden h-72 w-36 rounded-[42px] bg-[#b7f3df]/70 blur-2xl lg:block" />
              <div className="relative rounded-[36px] bg-white p-4 text-[#17112a] shadow-2xl shadow-purple-950/30">
                <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-[#fbfbff]">
                  <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
                    <div className="relative min-h-[360px] lg:min-h-[400px]">
                      <Image
                        src="/landing/salon-hero.png"
                        alt="Stylist working with a salon client"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a79a8]">
                            Today
                          </p>
                          <h2 className="mt-1 text-2xl font-black">
                            Salon desk
                          </h2>
                        </div>
                        <span className="rounded-full bg-[#efe9ff] px-4 py-2 text-xs font-bold text-[#6f45ff]">
                          Live
                        </span>
                      </div>

                      <div className="space-y-3">
                        {schedule.map(([time, service, staff]) => (
                          <div
                            key={time}
                            className="grid grid-cols-[58px_1fr_auto] items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                          >
                            <span className="text-sm font-black text-[#6f45ff]">
                              {time}
                            </span>
                            <span className="text-sm font-bold">{service}</span>
                            <span className="text-xs font-semibold text-slate-500">
                              {staff}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-3xl bg-[#17112a] p-5 text-white">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-sm font-bold">Tip balances</h3>
                          <span className="text-xs text-white/60">
                            Payout-ready
                          </span>
                        </div>
                        <div className="space-y-3">
                          {balances.map(([name, amount]) => (
                            <div
                              key={name}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-white/72">{name}</span>
                              <span className="font-black text-[#b7f3df]">
                                {amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="max-w-lg text-4xl font-black leading-tight tracking-normal text-[#17112a]">
              Give owners the front desk, client list, and tip ledger in one
              place.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              SalonTip CRM is built for small salons that want cleaner booking,
              better client follow-up, and clearer records around staff tips and
              payouts.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="rounded-[28px] border border-slate-100 bg-[#fbfbff] p-6 shadow-sm"
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6f45ff,#ff7288)] text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg font-black text-[#17112a]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="bg-[#f7f2ff] px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight tracking-normal text-[#17112a]">
              Packages for every stage of the salon
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Start with booking, add a custom website, or move into a complete
              growth system with a customer portal and AI advertising support.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[30px] p-6 shadow-sm ${
                  plan.featured
                    ? "bg-[#17112a] text-white shadow-2xl shadow-purple-950/15"
                    : "border border-slate-100 bg-white text-[#17112a]"
                }`}
              >
                <div className="flex min-h-[220px] flex-col">
                  <h3 className="text-2xl font-black">{plan.name}</h3>
                  <p
                    className={`mt-4 text-sm leading-6 ${
                      plan.featured ? "text-white/72" : "text-slate-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span
                      className={`pb-2 text-sm font-bold ${
                        plan.featured ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      /month
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm font-bold">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${
                          plan.featured
                            ? "bg-[#b7f3df] text-[#17112a]"
                            : "bg-[#efe9ff] text-[#6f45ff]"
                        }`}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-black transition ${
                    plan.featured
                      ? "bg-[#b7f3df] text-[#17112a] hover:bg-white"
                      : "bg-[#17112a] text-white hover:bg-[#6f45ff]"
                  }`}
                >
                  Choose {plan.name}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="self-center">
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-normal text-[#17112a]">
              Book a setup call for your salon package
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Tell us which package fits your salon. We will help you set up the
              booking flow, client workspace, tip tracking, website, or AI
              assistant features you want.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 text-sm font-bold">
              <div className="rounded-2xl bg-[#f7f2ff] p-4 text-[#6f45ff]">
                Appointment setup
              </div>
              <div className="rounded-2xl bg-[#fff3f5] p-4 text-[#ff6f87]">
                Client growth tools
              </div>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsBooked(true);
            }}
            className="rounded-[34px] bg-[#fbfbff] p-5 shadow-2xl shadow-purple-950/10 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label
                htmlFor="owner-email"
                className="space-y-2 text-sm font-bold text-[#17112a]"
              >
                Email
                <input
                  id="owner-email"
                  type="email"
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-[#6f45ff]"
                  placeholder="owner@salon.com"
                />
              </label>
              <label
                htmlFor="owner-name"
                className="space-y-2 text-sm font-bold text-[#17112a]"
              >
                Name
                <input
                  id="owner-name"
                  type="text"
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-[#6f45ff]"
                  placeholder="Salon owner"
                />
              </label>
              <label
                htmlFor="owner-package"
                className="space-y-2 text-sm font-bold text-[#17112a] sm:col-span-2"
              >
                Package
                <select
                  id="owner-package"
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#6f45ff]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a package
                  </option>
                  {packages.map((plan) => (
                    <option key={plan.name}>{plan.name}</option>
                  ))}
                </select>
              </label>
              <label
                htmlFor="owner-message"
                className="space-y-2 text-sm font-bold text-[#17112a] sm:col-span-2"
              >
                Message
                <textarea
                  id="owner-message"
                  className="h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-[#6f45ff]"
                  placeholder="Tell us about your salon..."
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 h-14 w-full rounded-2xl bg-[#17112a] text-sm font-black text-white transition hover:bg-[#6f45ff]"
            >
              Request setup call
            </button>

            {isBooked && (
              <div className="mt-5 rounded-2xl bg-[#e7fbf2] p-4 text-sm font-bold text-[#14734e]">
                Request received. We will send package setup details to
                admin@thatsklevr.com.
              </div>
            )}
          </form>
        </div>
      </section>

      <footer
        id="pricing"
        className="bg-[#17112a] px-5 py-12 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">SalonTip CRM</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/62">
              Booking, client management, tip tracking, websites, portals, and
              AI advertising tools for growing salons.
            </p>
          </div>
          <a
            href="#packages"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#b7f3df] px-6 text-sm font-black text-[#17112a]"
          >
            Compare packages
          </a>
        </div>
      </footer>
    </main>
  );
}
