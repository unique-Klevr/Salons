"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const features = [
  {
    title: "Know what tips are owed",
    text: "Track staff balances after every service, tip, and processing fee.",
  },
  {
    title: "Book without the back-and-forth",
    text: "Capture demo requests and salon booking details in one clean flow.",
  },
  {
    title: "Spot fee leakage fast",
    text: "See the card fees that quietly eat into staff tips and margins.",
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

export default function Home() {
  const [isBooked, setIsBooked] = useState(false);

  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBooked(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17112a]">
      <section className="relative bg-[linear-gradient(135deg,#6f45ff_0%,#b14cff_38%,#ff6f87_72%,#ffb46a_100%)] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:86px_86px]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:min-h-[760px] lg:px-10">
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
              <a href="#booking" className="transition hover:text-white">
                Booking
              </a>
              <Link href="/dashboard" className="transition hover:text-white">
                Dashboard
              </Link>
              <a href="#pricing" className="transition hover:text-white">
                Pricing
              </a>
            </nav>

            <a
              href="#booking"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#6f45ff] shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5"
            >
              Book a demo
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-6xl xl:text-7xl">
                CRM + Booking + Tip Tracking
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/86">
                Run a cleaner salon with appointment booking, staff tip
                balances, and fee leakage tracking in one simple workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#booking"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-[#10212b] px-7 text-sm font-bold text-white shadow-xl shadow-purple-950/25 transition hover:-translate-y-0.5"
                >
                  Book a demo
                </a>
                <Link
                  href="/dashboard"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18"
                >
                  View dashboard
                </Link>
              </div>

              <form
                onSubmit={handleBooking}
                className="mt-8 flex max-w-xl flex-col gap-3 rounded-[28px] bg-white/15 p-2 backdrop-blur-md sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="owner@salon.com"
                  className="min-h-13 flex-1 rounded-full border border-white/20 bg-white px-5 text-sm font-medium text-[#17112a] outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="min-h-13 rounded-full bg-[#b7f3df] px-6 text-sm font-black text-[#10212b] transition hover:bg-white"
                >
                  Request booking
                </button>
              </form>
              {isBooked && (
                <p className="mt-4 text-sm font-semibold text-white">
                  Demo request received. We will follow up with available times.
                </p>
              )}
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
                          <h3 className="text-sm font-bold">
                            Tip balances
                          </h3>
                          <span className="text-xs text-white/60">
                            Fee-aware
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
              A calmer command center for busy salon days.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              SalonTip CRM keeps the appointment desk, staff payout view, and
              fee story connected so owners can make decisions without
              spreadsheet cleanup.
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
        id="booking"
        className="bg-[#f7f2ff] px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="self-center">
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-normal text-[#17112a]">
              Book a demo that fits your salon day
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Pick the kind of workflow you want to improve and send your
              preferred time. The confirmation stays on-page so your client or
              owner never hits a dead end.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 text-sm font-bold">
              <div className="rounded-2xl bg-white p-4 text-[#6f45ff] shadow-sm">
                15-minute fit check
              </div>
              <div className="rounded-2xl bg-white p-4 text-[#ff6f87] shadow-sm">
                Salon-specific setup
              </div>
            </div>
          </div>

          <form
            onSubmit={handleBooking}
            className="rounded-[34px] bg-white p-5 shadow-2xl shadow-purple-950/10 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-bold text-[#17112a]">
                Date
                <input
                  type="date"
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#6f45ff]"
                />
              </label>
              <label className="space-y-2 text-sm font-bold text-[#17112a]">
                Service
                <select
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#6f45ff]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose focus
                  </option>
                  <option>Booking setup</option>
                  <option>Tip tracking</option>
                  <option>Full CRM tour</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-bold text-[#17112a]">
                Staff
                <select
                  required
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#6f45ff]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Team size
                  </option>
                  <option>1-5 staff</option>
                  <option>6-15 staff</option>
                  <option>16+ staff</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-bold text-[#17112a]">
                Name
                <input
                  type="text"
                  required
                  placeholder="Salon owner"
                  className="h-13 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-[#6f45ff]"
                />
              </label>
              <label className="space-y-2 text-sm font-bold text-[#17112a] sm:col-span-2">
                Phone or email
                <input
                  type="text"
                  required
                  placeholder="(555) 123-4567 or owner@salon.com"
                  className="h-13 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-[#6f45ff]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 h-14 w-full rounded-2xl bg-[#17112a] text-sm font-black text-white transition hover:bg-[#6f45ff]"
            >
              Request booking
            </button>

            {isBooked && (
              <div className="mt-5 rounded-2xl bg-[#e7fbf2] p-4 text-sm font-bold text-[#14734e]">
                Booking request received. We will send your demo options next.
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[34px] bg-[#17112a] p-5 text-white shadow-2xl shadow-purple-950/15 sm:p-7">
            <div className="rounded-[24px] bg-white p-4 text-[#17112a]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black">Owner dashboard</h2>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-[#efe9ff] px-4 py-2 text-xs font-black text-[#6f45ff]"
                >
                  Open app
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Revenue", "$8,420"],
                  ["Tips", "$1,186"],
                  ["Fees", "-$35.58"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#fbfbff] p-4">
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-black">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-slate-100">
                {balances.map(([name, amount]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
                  >
                    <span className="text-sm font-bold">{name}</span>
                    <span className="text-sm font-black text-[#6f45ff]">
                      {amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="self-center">
            <h2 className="max-w-lg text-4xl font-black leading-tight tracking-normal">
              Sell the service, then let the dashboard prove the value.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              The landing page gets owners into a booking flow. The CRM gives
              them the operational clarity that makes the demo easy to sell.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#booking"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#6f45ff] px-7 text-sm font-black text-white transition hover:bg-[#17112a]"
              >
                Book a demo
              </a>
              <Link
                href="/transactions"
                className="inline-flex h-13 items-center justify-center rounded-full border border-slate-200 px-7 text-sm font-black text-[#17112a] transition hover:border-[#6f45ff] hover:text-[#6f45ff]"
              >
                View transactions
              </Link>
            </div>
          </div>
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
              Booking, staff tip tracking, and fee visibility for salons that
              want cleaner operations.
            </p>
          </div>
          <a
            href="#booking"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#b7f3df] px-6 text-sm font-black text-[#17112a]"
          >
            Request booking
          </a>
        </div>
      </footer>
    </main>
  );
}
