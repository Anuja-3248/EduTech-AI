"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  FileSearch,
  Filter,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/ui";

type RiskLevel = "Low" | "Medium" | "High";
type AlertStatus = "New" | "Under Investigation" | "Re-verification Requested" | "Resolved" | "Rejected";

type FraudAlert = {
  id: string;
  student: string;
  application: string;
  exam: string;
  type: string;
  risk: RiskLevel;
  status: AlertStatus;
  detectionTime: string;
  score: number;
  explanation: string;
};

const alerts: FraudAlert[] = [
  {
    id: "AI-FA-20491",
    student: "Aarav Sharma",
    application: "NEET-26-884201",
    exam: "NEET UG",
    type: "Face Mismatch",
    risk: "High",
    status: "New",
    detectionTime: "10:42 AM",
    score: 94,
    explanation: "Face similarity score below accepted threshold.",
  },
  {
    id: "AI-FA-20488",
    student: "Meera Iyer",
    application: "CET-26-118430",
    exam: "CET 2026",
    type: "Duplicate Identity",
    risk: "High",
    status: "Under Investigation",
    detectionTime: "10:36 AM",
    score: 91,
    explanation: "Identity document and facial vectors match another active application record.",
  },
  {
    id: "AI-FA-20472",
    student: "Kabir Khan",
    application: "SSC-26-441092",
    exam: "SSC CGL",
    type: "Multiple Registrations",
    risk: "Medium",
    status: "Re-verification Requested",
    detectionTime: "10:19 AM",
    score: 76,
    explanation: "Multiple applications detected using related contact and document attributes.",
  },
  {
    id: "AI-FA-20451",
    student: "Riya Sen",
    application: "UPSC-26-763102",
    exam: "UPSC Prelims",
    type: "Suspicious Verification Activity",
    risk: "Medium",
    status: "New",
    detectionTime: "09:58 AM",
    score: 72,
    explanation: "Repeated verification attempts from unusual device and location patterns.",
  },
  {
    id: "AI-FA-20438",
    student: "Dev Patel",
    application: "BOARD-26-390174",
    exam: "State Board XII",
    type: "High Complaint Association",
    risk: "Low",
    status: "Resolved",
    detectionTime: "09:31 AM",
    score: 41,
    explanation: "Complaint cluster linked to the same center, but student identity signals remain stable.",
  },
];

const exams = ["All Exams", "NEET UG", "CET 2026", "SSC CGL", "UPSC Prelims", "State Board XII"];
const riskLevels = ["All Risk Levels", "Low", "Medium", "High"];
const statuses = ["All Statuses", "New", "Under Investigation", "Re-verification Requested", "Resolved", "Rejected"];
const alertTypes = [
  "All Alert Types",
  "Face Mismatch",
  "Duplicate Identity",
  "Multiple Registrations",
  "Suspicious Verification Activity",
  "High Complaint Association",
];

const actions = ["Mark Under Investigation", "Request Re-verification", "Approve", "Reject", "Close Alert"];

function RiskPill({ value }: { value: RiskLevel }) {
  const tone = {
    Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Medium: "border-amber-200 bg-amber-50 text-amber-800",
    High: "border-red-200 bg-red-50 text-red-700",
  }[value];

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

function StatusPill({ value }: { value: AlertStatus }) {
  const tone =
    value === "Resolved"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : value === "Rejected"
        ? "border-red-200 bg-red-50 text-red-700"
        : "border-sky-200 bg-sky-50 text-sky-800";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function FraudAlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert>(alerts[0]);
  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("All Exams");
  const [risk, setRisk] = useState("All Risk Levels");
  const [status, setStatus] = useState("All Statuses");
  const [alertType, setAlertType] = useState("All Alert Types");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch = `${alert.id} ${alert.student} ${alert.application}`.toLowerCase().includes(search.toLowerCase());
      const matchesExam = exam === "All Exams" || alert.exam === exam;
      const matchesRisk = risk === "All Risk Levels" || alert.risk === risk;
      const matchesStatus = status === "All Statuses" || alert.status === status;
      const matchesType = alertType === "All Alert Types" || alert.type === alertType;

      return matchesSearch && matchesExam && matchesRisk && matchesStatus && matchesType;
    });
  }, [alertType, exam, risk, search, status]);

  const summaryCards = [
    { label: "Total Alerts", value: alerts.length.toString().padStart(2, "0"), trend: "Live queue", icon: BellRing },
    { label: "High Risk Alerts", value: alerts.filter((alert) => alert.risk === "High").length.toString(), trend: "Priority review", icon: AlertTriangle },
    { label: "Under Investigation", value: alerts.filter((alert) => alert.status === "Under Investigation").length.toString(), trend: "Active cases", icon: FileSearch },
    { label: "Resolved Alerts", value: alerts.filter((alert) => alert.status === "Resolved").length.toString(), trend: "Closed today", icon: CheckCircle2 },
  ];

  return (
    <AppShell>
      <main className="min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#f7fbff_0%,#edf6ff_44%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
          <aside className="rounded-lg border border-sky-100 bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] lg:sticky lg:top-24 lg:h-[calc(100vh-118px)]">
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-[#07142f] via-[#0B2A5F] to-[#123A7A] p-4 text-white">
              <span className="flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <ShieldCheck size={23} />
              </span>
              <div>
                <p className="text-sm font-semibold">EduTrust AI</p>
                <p className="text-xs text-sky-100/75">Fraud Command</p>
              </div>
            </div>
            <nav className="mt-5 grid gap-1">
              <Link href="/authority-dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-900">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link href="/fraud-alerts" className="flex items-center gap-3 rounded-lg bg-sky-900 px-3 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(7,20,47,0.18)]">
                <Siren size={18} />
                Fraud Alerts
              </Link>
              {["Trust Scores", "Complaints", "Analytics", "Settings"].map((item) => (
                <button key={item} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-900">
                  <Gauge size={18} />
                  {item}
                </button>
              ))}
            </nav>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <LockKeyhole size={19} className="mt-0.5 shrink-0 text-amber-700" />
                <p className="text-xs font-medium leading-5 text-amber-900">
                  Real-time fraud review workspace. Every decision is stored in the authority audit trail.
                </p>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-sky-800">National fraud detection workspace</p>
                  <h1 className="mt-2 text-4xl font-medium tracking-normal text-slate-950 sm:text-5xl">AI Fraud Alerts</h1>
                  <p className="mt-3 text-base font-medium text-slate-600">
                    Real-time detection of suspicious examination activities
                  </p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full bg-red-500 shadow-[0_0_0_5px_rgba(239,68,68,0.14)]" />
                    Live AI monitoring active
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.label} className="rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-sky-50 text-sky-900">
                        <Icon size={22} />
                      </span>
                      <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
                        {card.trend}
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-semibold text-slate-500">{card.label}</p>
                    <p className="mt-2 text-3xl font-medium text-slate-950">{card.value}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-sky-100 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end">
                <label className="block flex-1">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Search size={16} />
                    Search
                  </span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    placeholder="Search alert ID, student, application"
                  />
                </label>
                {[
                  ["Exam", exam, setExam, exams],
                  ["Risk Level", risk, setRisk, riskLevels],
                  ["Status", status, setStatus, statuses],
                  ["Alert Type", alertType, setAlertType, alertTypes],
                ].map(([label, value, setValue, options]) => (
                  <label key={label as string} className="block min-w-44">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Filter size={16} />
                      {label as string}
                    </span>
                    <select
                      value={value as string}
                      onChange={(event) => (setValue as (next: string) => void)(event.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    >
                      {(options as string[]).map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
                <div className="overflow-x-auto">
                  <table className="data-table min-w-[900px]">
                    <thead>
                      <tr>
                        <th>Alert ID</th>
                        <th>Student Name</th>
                        <th>Exam Name</th>
                        <th>Alert Type</th>
                        <th>Risk Level</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlerts.map((alert) => (
                        <tr key={alert.id}>
                          <td className="font-semibold text-sky-900">{alert.id}</td>
                          <td className="font-medium text-slate-950">{alert.student}</td>
                          <td className="text-slate-600">{alert.exam}</td>
                          <td className="font-medium text-slate-700">{alert.type}</td>
                          <td><RiskPill value={alert.risk} /></td>
                          <td><StatusPill value={alert.status} /></td>
                          <td>
                            <button
                              onClick={() => setSelectedAlert(alert)}
                              className="inline-flex items-center gap-2 rounded-full bg-sky-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-800"
                            >
                              <Eye size={14} />
                              Investigate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredAlerts.length === 0 && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
                      No alerts match the selected filters.
                    </div>
                  )}
                </div>

                <aside className="rounded-lg border border-sky-100 bg-slate-950 p-5 text-white shadow-[0_20px_54px_rgba(15,23,42,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-sky-200">Alert detail panel</p>
                      <h2 className="mt-2 text-2xl font-medium">{selectedAlert.id}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedAlert(alerts[0])}
                      className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-sky-100 transition hover:bg-white/15"
                      aria-label="Reset selected alert"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-lg border border-white/10 bg-white/8 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                      <UserCheck size={17} />
                      Student Information
                    </h3>
                    <dl className="grid gap-3 text-sm">
                      <div>
                        <dt className="text-slate-400">Name</dt>
                        <dd className="mt-1 font-semibold">{selectedAlert.student}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400">Application Number</dt>
                        <dd className="mt-1 font-semibold">{selectedAlert.application}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400">Exam</dt>
                        <dd className="mt-1 font-semibold">{selectedAlert.exam}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-lg border border-white/10 bg-white/8 p-4">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                      <ShieldAlert size={17} />
                      Alert Information
                    </h3>
                    <dl className="grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-slate-400">Alert Type</dt>
                        <dd className="font-semibold">{selectedAlert.type}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-slate-400">Detection Time</dt>
                        <dd className="inline-flex items-center gap-1 font-semibold"><Clock3 size={14} />{selectedAlert.detectionTime}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-slate-400">Risk Score</dt>
                        <dd className="font-semibold">{selectedAlert.score}/100</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400">AI Explanation</dt>
                        <dd className="mt-2 rounded-lg border border-sky-300/15 bg-sky-100/10 p-3 text-sm leading-6 text-sky-50">
                          {selectedAlert.explanation}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-sky-100">
                      <ClipboardCheck size={17} />
                      Actions Available
                    </h3>
                    <div className="grid gap-2">
                      {actions.map((action) => (
                        <button
                          key={action}
                          className="rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-left text-sm font-semibold text-sky-50 transition hover:-translate-y-0.5 hover:bg-white/15"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
