import {
  AlertTriangle,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  SearchCheck,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { CenterTrustChart, MonitoringChart, RiskPieChart } from "@/components/charts";
import { AppShell } from "@/components/ui";

const stats = [
  { label: "Total Registered Students", value: "31.8M", trend: "+4.8% this cycle", icon: UsersRound },
  { label: "Verified Students", value: "29.6M", trend: "93.1% verified", icon: CheckCircle2 },
  { label: "Fraud Alerts Detected", value: "1,284", trend: "-18% vs last exam", icon: ShieldAlert },
  { label: "Active Exam Centers", value: "12,840", trend: "99.7% online", icon: Building2 },
  { label: "Complaints Received", value: "4,912", trend: "+312 today", icon: ClipboardList },
  { label: "High-Risk Centers", value: "143", trend: "32 need inspection", icon: AlertTriangle },
];

const fraudAlerts = [
  { student: "Aarav Sharma", exam: "NEET UG", alert: "Face Mismatch", risk: "High", status: "Escalated" },
  { student: "Meera Iyer", exam: "CET 2026", alert: "Duplicate Identity", risk: "High", status: "Under Review" },
  { student: "Kabir Khan", exam: "SSC CGL", alert: "Multiple Complaints Linked", risk: "Medium", status: "Investigating" },
  { student: "Riya Sen", exam: "UPSC Prelims", alert: "Face Mismatch", risk: "Medium", status: "Queued" },
];

const riskCenters = [
  { center: "Jaipur North-18", score: 76, risk: "High Risk", complaints: 42 },
  { center: "Patna Central-15", score: 82, risk: "Medium Risk", complaints: 27 },
  { center: "Bhopal City-09", score: 89, risk: "Medium Risk", complaints: 18 },
  { center: "Delhi NCR-22", score: 98, risk: "Safe", complaints: 4 },
];

const complaints = [
  { id: "CMP-20491", category: "Impersonation", center: "Jaipur North-18", status: "Open" },
  { id: "CMP-20488", category: "Paper Handling", center: "Patna Central-15", status: "Assigned" },
  { id: "CMP-20471", category: "Center Conduct", center: "Bhopal City-09", status: "Review" },
  { id: "CMP-20442", category: "Biometric Issue", center: "Delhi NCR-22", status: "Resolved" },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/authority-dashboard" },
  { label: "Fraud Alerts", icon: Siren, href: "/fraud-alerts" },
  { label: "Trust Scores", icon: Gauge, href: "/trust" },
  { label: "Complaints", icon: ClipboardList, href: "/authority-dashboard" },
  { label: "Analytics", icon: BarChart3, href: "/authority-dashboard" },
  { label: "Settings", icon: Settings, href: "/authority-dashboard" },
];

const quickActions = [
  { label: "Review Fraud Alerts", icon: ShieldAlert, href: "/fraud-alerts" },
  { label: "Manage Complaints", icon: ClipboardList, href: "/authority-dashboard" },
  { label: "View Trust Scores", icon: Gauge, href: "/trust" },
  { label: "Generate Reports", icon: FileBarChart, href: "/authority-dashboard" },
];

function RiskPill({ value }: { value: string }) {
  const tone =
    value === "Safe"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : value === "Medium" || value === "Medium Risk"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-red-200 bg-red-50 text-red-700";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

function StatusPill({ value }: { value: string }) {
  const tone = value === "Resolved" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-sky-200 bg-sky-50 text-sky-800";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function AuthorityDashboard() {
  return (
    <AppShell>
      <main className="min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#f7fbff_0%,#eef6ff_44%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-[1480px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          <aside className="rounded-lg border border-sky-100 bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] lg:sticky lg:top-24 lg:h-[calc(100vh-118px)]">
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-[#07142f] via-[#0B2A5F] to-[#123A7A] p-4 text-white">
              <span className="flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <ShieldCheck size={23} />
              </span>
              <div>
                <p className="text-sm font-semibold">EduTrust AI</p>
                <p className="text-xs text-sky-100/75">Authority Console</p>
              </div>
            </div>
            <nav className="mt-5 grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.label === "Dashboard";

                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-sky-900 text-white shadow-[0_12px_28px_rgba(7,20,47,0.18)]"
                        : "text-slate-600 hover:bg-sky-50 hover:text-sky-900"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <LockKeyhole size={19} className="mt-0.5 shrink-0 text-amber-700" />
                <p className="text-xs font-medium leading-5 text-amber-900">
                  Restricted national monitoring workspace. All dashboard actions are logged for audit.
                </p>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-sky-800">Government authority command center</p>
                  <h1 className="mt-2 text-4xl font-medium tracking-normal text-slate-950 sm:text-5xl">Authority Dashboard</h1>
                  <p className="mt-3 text-base font-medium text-slate-600">
                    National Examination Monitoring & Integrity Center
                  </p>
                </div>
                <div className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
                  {["NTA", "CET Cell", "UPSC", "SSC", "State Boards"].map((authority) => (
                    <span key={authority} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-2 text-center text-sky-900">
                      {authority}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <article
                    key={stat.label}
                    className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_22px_54px_rgba(14,116,144,0.14)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-sky-50 text-sky-900">
                        <Icon size={22} />
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {stat.trend}
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-semibold text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-medium text-slate-950">{stat.value}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
              <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium text-slate-950">Integrity Alert Trend</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">Live AI fraud signal volume across active centers.</p>
                  </div>
                  <LineChart size={22} className="text-sky-900" />
                </div>
                <MonitoringChart />
              </section>

              <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium text-slate-950">Risk Distribution</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">Safe, medium, and high-risk center mix.</p>
                  </div>
                  <SearchCheck size={22} className="text-sky-900" />
                </div>
                <RiskPieChart />
              </section>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="overflow-hidden rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-medium text-slate-950">Recent AI Fraud Alerts</h2>
                  <BellRing size={22} className="text-sky-900" />
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table min-w-[760px]">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Exam Name</th>
                        <th>Alert Type</th>
                        <th>Risk Level</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fraudAlerts.map((alert) => (
                        <tr key={`${alert.student}-${alert.alert}`}>
                          <td className="font-medium text-slate-950">{alert.student}</td>
                          <td className="text-slate-600">{alert.exam}</td>
                          <td className="font-medium text-slate-700">{alert.alert}</td>
                          <td><RiskPill value={alert.risk} /></td>
                          <td><StatusPill value={alert.status} /></td>
                          <td>
                            <button className="rounded-full bg-sky-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-800">
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-medium text-slate-950">Quick Actions</h2>
                  <LayoutDashboard size={22} className="text-sky-900" />
                </div>
                <div className="grid gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <Link
                        href={action.href}
                        key={action.label}
                        className="flex items-center justify-between rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-left text-sm font-semibold text-sky-950 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white hover:shadow-[0_14px_34px_rgba(14,116,144,0.12)]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={18} />
                          {action.label}
                        </span>
                        <span className="text-sky-700">Open</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <section className="overflow-hidden rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-medium text-slate-950">High Risk Exam Centers</h2>
                  <AlertTriangle size={22} className="text-red-600" />
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table min-w-[620px]">
                    <thead>
                      <tr>
                        <th>Center Name</th>
                        <th>Trust Score</th>
                        <th>Risk Level</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskCenters.map((center) => (
                        <tr key={center.center}>
                          <td className="font-medium text-slate-950">{center.center}</td>
                          <td className="font-semibold text-slate-950">{center.score}</td>
                          <td><RiskPill value={center.risk} /></td>
                          <td className="font-semibold text-slate-700">{center.complaints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="overflow-hidden rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-medium text-slate-950">Recent Complaints</h2>
                  <ClipboardList size={22} className="text-sky-900" />
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table min-w-[580px]">
                    <thead>
                      <tr>
                        <th>Complaint ID</th>
                        <th>Category</th>
                        <th>Center Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td className="font-semibold text-sky-900">{complaint.id}</td>
                          <td className="text-slate-600">{complaint.category}</td>
                          <td className="font-medium text-slate-950">{complaint.center}</td>
                          <td><StatusPill value={complaint.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <section className="mt-5 rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium text-slate-950">Center Performance Analytics</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">Trust score and risk index comparison by region.</p>
                </div>
                <BarChart3 size={22} className="text-sky-900" />
              </div>
              <CenterTrustChart />
            </section>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
