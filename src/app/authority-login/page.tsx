"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  AlertTriangle,
  Building2,
  KeyRound,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/ui";

const authorities = ["NTA", "CET Cell", "UPSC", "SSC", "State Education Boards"];

export default function AuthorityLoginPage() {
  const router = useRouter();

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/authority-dashboard");
  }

  return (
    <AppShell>
      <main className="min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_46%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100vh-154px)] max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold uppercase text-sky-900 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
              <Landmark size={15} />
              National Examination Monitoring Access
            </div>
            <div className="mt-7 flex items-center gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#07142f] via-[#0B2A5F] to-[#123A7A] text-white shadow-[0_18px_40px_rgba(7,20,47,0.25)]">
                <ShieldCheck size={33} />
              </span>
              <div>
                <h1 className="text-balance text-5xl font-medium leading-tight text-slate-950 sm:text-6xl">
                  Government Authority Portal
                </h1>
                <p className="mt-3 text-lg font-medium text-sky-900">
                  Secure access for authorized examination officials
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              A dedicated government-tech gateway for officials supervising identity verification, AI fraud alerts,
              complaint workflows, center trust scores, and national examination analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {authorities.map((authority) => (
                <span
                  key={authority}
                  className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  {authority}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Verified officials", Building2],
                ["Encrypted access", LockKeyhole],
                ["Activity logging", ShieldCheck],
              ].map(([label, Icon]) => (
                <div
                  key={label as string}
                  className="rounded-lg border border-sky-100 bg-white/82 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.07)]"
                >
                  <Icon size={21} className="text-sky-900" />
                  <p className="mt-3 text-sm font-semibold text-slate-700">{label as string}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-xl rounded-lg border border-sky-100 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.13)] sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase text-sky-800">Official login</p>
                <h2 className="mt-2 text-3xl font-medium text-slate-950">Enter secure credentials</h2>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-900">
                <ShieldCheck size={24} />
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Official Email</span>
                <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
                  <Mail size={18} className="text-sky-900" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
                    placeholder="official@nta.gov.in"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
                  <KeyRound size={18} className="text-sky-900" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
                    placeholder="Enter password"
                  />
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-gradient-to-r from-[#07142f] via-[#0B2A5F] to-[#123A7A] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(7,20,47,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(7,20,47,0.34)]"
                >
                  Login
                </button>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-sky-200 px-5 py-3 text-sm font-semibold text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  Forgot Password
                </Link>
              </div>
            </form>

            <div className="mt-7 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-700" />
                <p className="text-sm font-medium leading-6 text-amber-900">
                  Only authorized examination authorities can access this portal. All activities are monitored and logged.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
