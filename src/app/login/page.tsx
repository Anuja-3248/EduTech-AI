import Link from "next/link";
import { Fingerprint, KeyRound, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { AppShell, GlassCard } from "@/components/ui";

export default function LoginPage() {
  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase text-emerald-700">Login / Register</p>
          <h1 className="text-balance mt-3 text-5xl font-medium leading-tight text-slate-950">Secure access for every exam role.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Students, proctors, center heads, and national authorities enter through role-aware authentication with biometric-ready security.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Student", Fingerprint],
              ["Authority", ShieldCheck],
              ["New Center", UserPlus],
            ].map(([label, Icon]) => (
              <button key={label as string} className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300/35 hover:bg-[#2E7D5B]/10">
                <Icon size={17} />
                {label as string}
              </button>
            ))}
          </div>
        </div>

        <GlassCard className="mx-auto w-full max-w-xl">
          <div className="mb-7">
            <h2 className="text-3xl font-medium text-slate-950">Welcome to EduTrust AI</h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">Use official credentials to open your secure dashboard.</p>
          </div>
          <form className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600">Official Email or Application ID</span>
              <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <Mail size={18} className="text-emerald-700" />
                <input className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-600" placeholder="aarav@edutrust.gov.in" />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600">Password / Secure PIN</span>
              <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <KeyRound size={18} className="text-emerald-700" />
                <input type="password" className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-600" placeholder="Enter secure PIN" />
              </span>
            </label>
            <button className="premium-button w-full rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#256A4E]">
              Continue Securely
            </button>
          </form>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-slate-500">
            <Link href="/student" className="text-emerald-700">Try student demo</Link>
            <Link href="/authority" className="text-emerald-700">Open authority demo</Link>
          </div>
        </GlassCard>
      </main>
    </AppShell>
  );
}




