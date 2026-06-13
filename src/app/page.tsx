import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CircleCheck,
  ClipboardList,
  Eye,
  Fingerprint,
  Gauge,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Siren,
  UsersRound,
  UserCheck,
} from "lucide-react";
import { AppShell, FeatureIcon, GlassCard, featureCards } from "@/components/ui";
import { Reveal } from "@/components/motion";

const problems = [
  { title: "Paper Leaks", icon: LockKeyhole, body: "Fragmented custody chains make sensitive papers vulnerable before exam day.", signal: "Pre-exam risk" },
  { title: "Impersonation", icon: Fingerprint, body: "Manual verification cannot scale across millions of candidates and centers.", signal: "Identity gap" },
  { title: "Malpractice", icon: Siren, body: "Suspicious behavior often reaches authorities after damage is already done.", signal: "Delayed action" },
  { title: "Transparency Issues", icon: Eye, body: "Students and departments need traceable evidence behind every outcome.", signal: "Audit blind spot" },
];

const timelineSteps = [
  {
    title: "Face Verification",
    description: "Student identity is verified through AI face matching and document checks before access is granted.",
    icon: UserCheck,
  },
  {
    title: "Secure Vault",
    description: "Question papers are encrypted, sealed, and time-locked in a protected national vault.",
    icon: ShieldCheck,
  },
  {
    title: "AI Monitoring",
    description: "Live monitoring tracks every center, stream, and incident with real-time integrity signals.",
    icon: Activity,
  },
  {
    title: "Result Verification",
    description: "Results are verified against audit trails before public release, closing the trust loop.",
    icon: CircleCheck,
  },
];

const authorityFeatures = [
  { label: "AI Fraud Alerts", icon: BellRing },
  { label: "Student Verification Monitoring", icon: UsersRound },
  { label: "Complaint Management", icon: ClipboardList },
  { label: "Exam Center Trust Scores", icon: Gauge },
  { label: "National Analytics Dashboard", icon: Activity },
];

export default function Home() {
  return (
    <AppShell>
      <main>
        <section className="relative grid min-h-[calc(100vh-74px)] items-center lg:grid-cols-2">
          <div className="pointer-events-none absolute right-4 top-5 z-20 hidden w-[24rem] max-w-[calc(50vw-2rem)] lg:block xl:right-8">
            <Link
              href="/authority-login"
              title="Secure access for authorized examination authorities"
              aria-label="Government Authority Portal. Secure access for authorized examination authorities."
              className="group pointer-events-auto block overflow-hidden rounded-lg border border-sky-300/25 bg-gradient-to-br from-[#07142f] via-[#0B2A5F] to-[#041127] p-5 text-white shadow-[0_26px_70px_rgba(7,20,47,0.34)] transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-sky-200/55 hover:shadow-[0_34px_88px_rgba(7,20,47,0.45)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-13 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-sky-100 shadow-[inset_0_1px_rgba(255,255,255,0.22)]">
                  <ShieldCheck size={27} />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/20 bg-sky-100/10 px-3 py-1 text-xs font-semibold uppercase text-sky-100">
                  <Landmark size={13} />
                  Official Access
                </span>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase text-sky-200/85">Central Monitoring System</p>
                <h2 className="mt-2 text-2xl font-medium leading-tight text-white">Government Authority Portal</h2>
                <p className="mt-3 text-sm leading-6 text-sky-50/78">
                  For NTA, CET Cell, UPSC, SSC, and Education Board Officials
                </p>
              </div>
              <div className="mt-5 grid gap-2">
                {authorityFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <span key={feature.label} className="flex items-center gap-2 text-xs font-semibold text-sky-50/86">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10 text-sky-200">
                        <Icon size={14} />
                      </span>
                      {feature.label}
                    </span>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-sky-100">
                <span className="inline-flex items-center gap-2">
                  <Building2 size={16} />
                  Authorized officials only
                </span>
                <ArrowRight size={18} className="transition duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <div className="float-in mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-74px)] lg:px-8 lg:py-14">
            <Link
              href="/authority-login"
              title="Secure access for authorized examination authorities"
              className="group mb-8 block overflow-hidden rounded-lg border border-sky-300/25 bg-gradient-to-br from-[#07142f] via-[#0B2A5F] to-[#041127] p-5 text-white shadow-[0_24px_60px_rgba(7,20,47,0.28)] transition duration-300 hover:-translate-y-1 hover:border-sky-200/55 lg:hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-sky-100">
                  <ShieldCheck size={24} />
                </span>
                <span className="rounded-full border border-sky-200/20 bg-sky-100/10 px-3 py-1 text-xs font-semibold uppercase text-sky-100">
                  Official Access
                </span>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase text-sky-200/85">Central Monitoring System</p>
              <h2 className="mt-2 text-2xl font-medium leading-tight text-white">Government Authority Portal</h2>
              <p className="mt-3 text-sm leading-6 text-sky-50/78">
                For NTA, CET Cell, UPSC, SSC, and Education Board Officials
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-sky-100">
                <span>Authorized officials only</span>
                <ArrowRight size={18} className="transition duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
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
          <div className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[560px] lg:h-[calc(100vh-74px)] lg:min-h-[620px]">
            <Image
              src="/hero-students.jpg"
              alt="College students studying together outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="flex flex-col justify-between rounded-lg border border-emerald-900/10 bg-[#10231A] p-6 text-white shadow-[0_24px_70px_rgba(16,35,26,0.16)] sm:p-8">
              <div>
                <p className="text-sm font-medium uppercase text-emerald-200">The problem</p>
                <h2 className="text-balance mt-4 text-3xl font-medium leading-tight sm:text-4xl">
                  Exam integrity breaks when trust is manual.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-emerald-50/78">
                  Every weak handoff creates room for doubt. EduTrust AI focuses on the four points where exam confidence usually starts to fail.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                  <p className="text-2xl font-medium">4</p>
                  <p className="mt-1 text-emerald-50/70">Critical trust gaps</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                  <p className="text-2xl font-medium">24/7</p>
                  <p className="mt-1 text-emerald-50/70">Integrity visibility</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {problems.map((problem, index) => {
                const Icon = problem.icon;

                return (
                  <article
                    key={problem.title}
                    className="group relative min-h-56 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(30,41,59,0.08)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300/70 hover:shadow-[0_24px_60px_rgba(46,125,91,0.14)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[#2E7D5B]" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 transition duration-300 group-hover:bg-[#2E7D5B] group-hover:text-white">
                        <Icon size={23} />
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase text-emerald-700">{problem.signal}</p>
                    <h3 className="mt-2 text-xl font-medium text-slate-950">{problem.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-500">{problem.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 top-20 mx-auto h-72 max-w-5xl rounded-full bg-[#2E7D5B]/8 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase text-emerald-700">Solution workflow</p>
              <h2 className="text-balance mt-3 text-3xl font-medium text-slate-950 sm:text-4xl">
                One Secure Chain From Identity To Result
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                A connected verification path keeps every handoff visible, protected, and ready for audit.
              </p>
            </Reveal>

            <div className="relative mt-16">
              <div className="absolute bottom-0 left-8 top-0 w-1 rounded-full bg-gradient-to-b from-emerald-200 via-[#2E7D5B] to-emerald-100 shadow-[0_0_34px_rgba(46,125,91,0.28)] lg:left-1/2 lg:-translate-x-1/2" />

              <div className="space-y-10 lg:space-y-14">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <Reveal key={step.title} delay={index * 0.08}>
                      <article className={`relative grid items-center gap-6 pl-20 lg:grid-cols-[1fr_96px_1fr] lg:pl-0 ${isEven ? "" : "lg:[&>div:first-child]:col-start-3"}`}>
                        <div className={`${isEven ? "lg:pr-4" : "lg:pl-4"} ${isEven ? "" : "lg:text-left"}`}>
                          <div className="group relative overflow-hidden rounded-lg border border-white/70 bg-white/78 p-6 shadow-[0_18px_55px_rgba(30,41,59,0.09)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-emerald-300/80 hover:shadow-[0_26px_70px_rgba(46,125,91,0.18)]">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-200 via-[#2E7D5B] to-emerald-100 opacity-90" />
                            <div className="absolute -right-10 -top-10 size-28 rounded-full bg-[#2E7D5B]/10 blur-2xl transition duration-300 group-hover:bg-[#2E7D5B]/18" />
                            <div className="relative flex items-start gap-5">
                              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2E7D5B] to-emerald-500 text-white shadow-[0_14px_36px_rgba(46,125,91,0.28)] transition duration-300 group-hover:scale-110 group-hover:shadow-[0_18px_42px_rgba(46,125,91,0.36)]">
                                <Icon size={30} />
                              </span>
                              <div>
                                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-800">
                                  Step {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="mt-4 text-2xl font-medium text-slate-950">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-500">{step.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute left-0 top-6 flex size-16 items-center justify-center rounded-full border-4 border-white bg-[#2E7D5B] text-sm font-semibold text-white shadow-[0_0_0_8px_rgba(46,125,91,0.1),0_16px_40px_rgba(46,125,91,0.22)] lg:static lg:col-start-2 lg:mx-auto">
                          {index + 1}
                        </div>

                        <div className="hidden lg:block" />
                      </article>
                    </Reveal>
                  );
                })}
              </div>
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
      </main>
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm font-semibold text-slate-500">
        EduTrust AI - Secure exams, transparent outcomes, trusted futures.
      </footer>
    </AppShell>
  );
}




