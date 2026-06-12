import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Fingerprint,
  LockKeyhole,
  Network,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { AppShell, FeatureIcon, GlassCard, MetricCard, featureCards } from "@/components/ui";
import { nationalStats, workflow } from "@/lib/data";

const problems = [
  { title: "Paper Leaks", icon: LockKeyhole, body: "Fragmented custody chains make sensitive papers vulnerable before exam day." },
  { title: "Impersonation", icon: Fingerprint, body: "Manual verification cannot scale across millions of candidates and centers." },
  { title: "Malpractice", icon: Siren, body: "Suspicious behavior often reaches authorities after damage is already done." },
  { title: "Transparency Issues", icon: Eye, body: "Students and departments need traceable evidence behind every outcome." },
];

export default function Home() {
  return (
    <AppShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="float-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-[#2E7D5B]/10 px-4 py-2 text-sm font-semibold text-emerald-800">
              <ShieldCheck size={16} />
              National Exam Integrity & Transparency Platform
            </div>
            <h1 className="text-balance max-w-4xl text-5xl font-medium leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              Making Every Exam Fair, Secure and Transparent
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              EduTrust AI combines biometric verification, encrypted question paper custody, live AI monitoring, and auditable trust scores into one national command layer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/authority" className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-[#2E7D5B] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#256A4E]">
                Launch Command Center <ArrowRight size={17} />
              </Link>
              <Link href="/student" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300/40 hover:bg-emerald-50">
                View Student Flow
              </Link>
            </div>
          </div>
          <GlassCard className="relative overflow-hidden p-0">
            <div className="scanlines absolute inset-0 opacity-60" />
            <div className="relative p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">National Integrity Grid</p>
                  <p className="mt-2 text-3xl font-medium text-slate-950">Live exam pulse</p>
                </div>
                <span className="rounded-full bg-[#2E7D5B]/10 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {nationalStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-medium text-slate-950">{stat.value}</p>
                    <p className="mt-2 text-xs font-semibold text-emerald-700">{stat.change}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-emerald-300/20 bg-[#2E7D5B]/10 p-4">
                <div className="flex items-center gap-3">
                  <Network className="text-emerald-700" />
                  <p className="text-sm font-medium text-slate-700">12,840 centers synced with encrypted audit trails.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-medium uppercase text-emerald-700">The problem</p>
              <h2 className="text-balance mt-3 text-3xl font-medium text-slate-950 sm:text-4xl">Exam integrity breaks when trust is manual.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <GlassCard key={problem.title} className="min-h-60">
                <FeatureIcon Icon={problem.icon} accent="text-rose-200" />
                <h3 className="text-lg font-medium text-slate-950">{problem.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{problem.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase text-emerald-700">Solution workflow</p>
              <h2 className="text-balance mt-3 text-3xl font-medium text-slate-950 sm:text-4xl">One secure chain from identity to result.</h2>
            </div>
            <div className="grid gap-4">
              {workflow.map((item, index) => (
                <GlassCard key={item} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#2E7D5B] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-slate-600">{item}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase text-emerald-700">Capabilities</p>
              <h2 className="text-balance mt-3 text-3xl font-medium text-slate-950 sm:text-4xl">AI controls built for national scale.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <GlassCard key={feature.title} className="min-h-64 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35">
                <FeatureIcon Icon={feature.icon} accent={feature.accent} />
                <h3 className="text-xl font-medium text-slate-950">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{feature.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nationalStats.map((stat) => (
              <MetricCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} icon={ShieldAlert} />
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm font-semibold text-slate-500">
        EduTrust AI - Secure exams, transparent outcomes, trusted futures.
      </footer>
    </AppShell>
  );
}




