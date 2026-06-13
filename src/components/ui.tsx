import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BrainCircuit,
  FileLock2,
  Gauge,
  LayoutDashboard,
  Radar,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { GlowPulse, MotionCard, Reveal } from "@/components/motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/student", label: "Student" },
  { href: "/authority", label: "Authority" },
  { href: "/vault", label: "Vault" },
  { href: "/monitoring", label: "Monitoring" },
  { href: "/trust", label: "Trust" },
];

export const featureCards = [
  {
    title: "AI Face Verification",
    body: "Multimodal identity matching with liveness signals and impersonation risk scoring.",
    icon: UserCheck,
    accent: "text-emerald-700",
  },
  {
    title: "Secure Question Vault",
    body: "Encrypted, time-locked paper custody with role-based access and immutable audit trails.",
    icon: FileLock2,
    accent: "text-emerald-700",
  },
  {
    title: "AI Cheating Detection",
    body: "Computer vision and behavior analytics surface suspicious activity before it spreads.",
    icon: BrainCircuit,
    accent: "text-violet-300",
  },
  {
    title: "Trust Score Engine",
    body: "Every center, student, and workflow receives a transparent integrity score.",
    icon: Gauge,
    accent: "text-amber-300",
  },
  {
    title: "Anomaly Detection",
    body: "Detects paper movement, device signals, biometric drift, and abnormal center patterns.",
    icon: Radar,
    accent: "text-rose-300",
  },
  {
    title: "Result Verification",
    body: "Cross-checks result release with identity, attendance, proctoring, and audit evidence.",
    icon: BadgeCheck,
    accent: "text-emerald-700",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-fit items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg border border-emerald-300/25 bg-[#2E7D5B]/10 text-emerald-700 accent-glow">
              <ShieldCheck size={21} />
            </span>
            <span>
              <span className="block text-base font-medium text-slate-950">EduTrust AI</span>
              <span className="hidden text-xs font-semibold text-slate-500 sm:block">
                National Exam Integrity Platform
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#2E7D5B]/10 hover:text-emerald-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/login"
            className="premium-button rounded-full border border-emerald-300/30 bg-[#2E7D5B] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#256A4E]"
          >
            Secure Login
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

export function PageFrame({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="relative mb-8 max-w-3xl">
          <GlowPulse className="-left-14 top-0 size-36" />
          <p className="mb-3 text-sm font-medium uppercase text-emerald-700">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-medium tracking-normal text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        </Reveal>
        {children}
      </main>
    </AppShell>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <MotionCard>
      <section className={`glass rounded-lg p-5 ${className}`}>
        <div className="relative z-10">{children}</div>
      </section>
    </MotionCard>
  );
}

export function MetricCard({
  label,
  value,
  change,
  icon: Icon = LayoutDashboard,
}: {
  label: string;
  value: string;
  change: string;
  icon?: LucideIcon;
}) {
  return (
    <GlassCard className="min-h-36 transition duration-300 hover:border-emerald-300/35">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-4 text-3xl font-medium tracking-normal text-slate-950">{value}</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-lg bg-[#2E7D5B]/10 text-emerald-700">
          <Icon size={21} />
        </span>
      </div>
      <p className="mt-5 text-sm font-semibold text-emerald-700">{change}</p>
    </GlassCard>
  );
}

export function PremiumWidget({
  label,
  value,
  detail,
  icon: Icon,
  score,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  score: number;
}) {
  return (
    <GlassCard className="min-h-44">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-lg border border-emerald-300/20 bg-[#2E7D5B]/10 text-emerald-700">
          <Icon size={20} />
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {score}%
        </span>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-medium text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
      <div className="mt-5">
        <ProgressBar value={score} tone={score > 90 ? "green" : score > 75 ? "emerald" : "amber"} />
      </div>
    </GlassCard>
  );
}

export function SkeletonPanel() {
  return (
    <div className="glass rounded-lg p-5">
      <div className="relative z-10 space-y-4">
        <div className="skeleton h-4 w-28 rounded-full" />
        <div className="skeleton h-8 w-3/4 rounded-full" />
        <div className="grid grid-cols-3 gap-3">
          <div className="skeleton h-20 rounded-lg" />
          <div className="skeleton h-20 rounded-lg" />
          <div className="skeleton h-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function StatusPill({ value }: { value: string }) {
  const tones: Record<string, string> = {
    Low: "bg-emerald-400/10 text-emerald-700 border-emerald-300/25",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    Elevated: "bg-orange-100 text-orange-800 border-orange-200",
    High: "bg-rose-100 text-rose-800 border-rose-200",
    Escalated: "bg-rose-100 text-rose-800 border-rose-200",
    Review: "bg-amber-100 text-amber-800 border-amber-200",
    Monitoring: "bg-emerald-400/10 text-emerald-700 border-emerald-300/25",
    Cleared: "bg-emerald-400/10 text-emerald-700 border-emerald-300/25",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[value] ?? tones.Monitoring}`}>
      {value}
    </span>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="text-xl font-medium text-slate-950">{title}</h2>
      {action}
    </div>
  );
}

export function FeatureIcon({ Icon, accent }: { Icon: LucideIcon; accent: string }) {
  return (
    <span className={`mb-5 flex size-12 items-center justify-center rounded-lg bg-emerald-50 ${accent}`}>
      <Icon size={23} />
    </span>
  );
}

export function ProgressBar({ value, tone = "emerald" }: { value: number; tone?: "emerald" | "green" | "amber" | "rose" }) {
  const colors = {
    emerald: "bg-[#2E7D5B]",
    green: "bg-[#2E7D5B]",
    amber: "bg-amber-300",
    rose: "bg-rose-300",
  };

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full rounded-full ${colors[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}




