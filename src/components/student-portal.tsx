"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  FileText,
  Fingerprint,
  IdCard,
  LayoutDashboard,
  Loader2,
  MessageSquareWarning,
  QrCode,
  Settings,
  ShieldCheck,
  Upload,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { AppShell, GlassCard, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";
import { db } from "@/lib/firebase";
import type { StudentExam, StudentPortalData } from "@/lib/student-portal-types";

type StudentSection = "dashboard" | "profile" | "verification" | "exams" | "notifications" | "complaints" | "settings";

const studentNav: { id: StudentSection; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: UserRound },
  { id: "verification", label: "Verification Center", icon: ShieldCheck },
  { id: "exams", label: "My Exams", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "complaints", label: "Complaints", icon: MessageSquareWarning },
  { id: "settings", label: "Settings", icon: Settings },
];

const sectionTitles: Record<StudentSection, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Student Dashboard",
    subtitle: "A simple overview of your verification, linked exams, and latest alerts.",
  },
  profile: {
    title: "My Profile",
    subtitle: "Basic student details used for exam identity verification.",
  },
  verification: {
    title: "Verification Center",
    subtitle: "Upload documents, complete live selfie verification, and view your verification pass.",
  },
  exams: {
    title: "My Exams",
    subtitle: "EduTrust only shows registration status synced from official exam portals.",
  },
  notifications: {
    title: "Notifications",
    subtitle: "Important updates about verification, center changes, schedules, and announcements.",
  },
  complaints: {
    title: "Complaints",
    subtitle: "Raise an issue and track complaint status.",
  },
  settings: {
    title: "Settings",
    subtitle: "Manage portal preferences and notification settings.",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function StudentPortal({ initialData }: { initialData: StudentPortalData }) {
  const [activeSection, setActiveSection] = useState<StudentSection>("dashboard");
  const [portalData, setPortalData] = useState<StudentPortalData>(initialData);
  const [profileSource, setProfileSource] = useState("Demo data");
  const activeCopy = sectionTitles[activeSection];

  useEffect(() => {
    async function loadLoggedInStudent() {
      const rawSession = localStorage.getItem("edutrust-student-session");
      if (!rawSession) {
        return;
      }

      try {
        const session = JSON.parse(rawSession) as { uid?: string; fullName?: string; registrationNumber?: string };
        if (!session.uid) {
          return;
        }

        const snapshot = await getDoc(doc(db, "students", session.uid));
        if (!snapshot.exists()) {
          return;
        }

        const student = snapshot.data() as {
          fullName?: string;
          registrationNumber?: string;
          email?: string;
          mobile?: string;
          dob?: string;
          institution?: string;
          examName?: string;
          faceRegistered?: boolean;
          verificationStatus?: string;
        };

        const fullName = student.fullName ?? session.fullName ?? "Student";
        const registrationNumber = student.registrationNumber ?? session.registrationNumber ?? "Pending";

        setPortalData((current) => ({
          ...current,
          profile: {
            ...current.profile,
            name: fullName,
            initials: getInitials(fullName),
            verificationId: registrationNumber,
            dob: student.dob ?? current.profile.dob,
            governmentId: registrationNumber,
            email: student.email ?? current.profile.email,
            phone: student.mobile ?? current.profile.phone,
            photoStatus: student.faceRegistered ? "Face Registered" : "Face Pending",
            profileStatus: student.verificationStatus ?? current.profile.profileStatus,
          },
          nextExam: {
            ...current.nextExam,
            name: student.examName || current.nextExam.name,
          },
        }));
        setProfileSource("Firebase profile");
      } catch {
        setProfileSource("Demo data");
      }
    }

    void loadLoggedInStudent();
  }, []);

  async function loadPortalData() {
    const response = await fetch("/api/student", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Student portal backend did not respond.");
    }
    setPortalData((await response.json()) as StudentPortalData);
  }

  return (
    <AppShell>
      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <GlassCard className="p-4">
            <div className="flex items-center gap-3 rounded-lg bg-[#2E7D5B]/10 p-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-white text-lg font-semibold text-emerald-800">
                {portalData.profile.initials}
              </div>
              <div>
                <p className="font-medium text-slate-950">{portalData.profile.name}</p>
                <p className="text-xs font-semibold text-slate-500">{portalData.profile.verificationId}</p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-700">{profileSource}</p>
              </div>
            </div>

            <nav className="mt-4 space-y-1">
              {studentNav.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      active ? "bg-[#2E7D5B] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </GlassCard>
        </aside>

        <section>
          <div className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium uppercase text-emerald-700">Student Portal</p>
            <h1 className="mt-2 text-3xl font-medium tracking-normal text-slate-950 sm:text-4xl">{activeCopy.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{activeCopy.subtitle}</p>
          </div>

          {activeSection === "dashboard" && <DashboardPanel data={portalData} onNavigate={setActiveSection} />}
          {activeSection === "profile" && <ProfilePanel data={portalData} />}
          {activeSection === "verification" && <VerificationPanel data={portalData} />}
          {activeSection === "exams" && <ExamsPanel data={portalData} />}
          {activeSection === "notifications" && <NotificationsPanel data={portalData} />}
          {activeSection === "complaints" && <ComplaintsPanel data={portalData} onRefresh={loadPortalData} />}
          {activeSection === "settings" && <SettingsPanel data={portalData} />}
        </section>
      </main>
    </AppShell>
  );
}

function DashboardPanel({ data, onNavigate }: { data: StudentPortalData; onNavigate: (section: StudentSection) => void }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium uppercase text-emerald-700">Next Exam</p>
              <h2 className="mt-2 text-3xl font-medium leading-tight text-slate-950">{data.nextExam.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Your identity pass and exam eligibility are ready.</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto">
              <CountdownBox value={String(data.nextExam.daysRemaining).padStart(2, "0")} label="Days" />
              <CountdownBox value={String(data.nextExam.hoursRemaining).padStart(2, "0")} label="Hours" />
              <CountdownBox value="Remaining" label="Status" compact />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase text-emerald-700">Exam Readiness Score</p>
              <h2 className="mt-2 text-4xl font-medium text-slate-950">{data.readiness.score}/100</h2>
            </div>
            <StatusPill value={data.readiness.score > 95 ? "Cleared" : "Review"} />
          </div>
          <div className="mt-4">
            <ProgressBar value={data.readiness.score} />
          </div>
          <div className="mt-5 space-y-2">
            {data.readiness.items.map((item) => (
              <ReadinessItem key={item.label} complete={item.complete} label={item.label} />
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatusBlock icon={ShieldCheck} label="Identity Status" value={data.verification.identityStatus} detail="Face and ID proof matched." />
        <StatusBlock icon={CalendarClock} label="Upcoming Exams" value={String(data.exams.filter((exam) => exam.status === "Registered").length)} detail="Official registrations are linked." />
        <StatusBlock icon={QrCode} label="Verification Pass" value="Ready" detail={`${data.profile.verificationId} is exam-day ready.`} />
      </div>

      <GlassCard>
        <SectionTitle title="Next Step" />
        <div className="grid gap-3 sm:grid-cols-3">
          <ActionButton label="Check Profile" icon={UserRound} onClick={() => onNavigate("profile")} />
          <ActionButton label="View Exams" icon={FileText} onClick={() => onNavigate("exams")} />
          <ActionButton label="Track Complaint" icon={MessageSquareWarning} onClick={() => onNavigate("complaints")} />
        </div>
      </GlassCard>
    </div>
  );
}

function ProfilePanel({ data }: { data: StudentPortalData }) {
  return (
    <GlassCard>
      <SectionTitle title="Profile Details" action={<StatusPill value="Cleared" />} />
      <div className="grid gap-4 md:grid-cols-2">
        <InfoRow label="Name" value={data.profile.name} />
        <InfoRow label="Date of Birth" value={data.profile.dob} />
        <InfoRow label="Government ID" value={data.profile.governmentId} />
        <InfoRow label="Email / Phone" value={`${data.profile.email} / ${data.profile.phone}`} />
        <InfoRow label="Photo" value={data.profile.photoStatus} />
        <InfoRow label="Profile Status" value={data.profile.profileStatus} />
      </div>
    </GlassCard>
  );
}

function VerificationPanel({ data }: { data: StudentPortalData }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <GlassCard>
        <SectionTitle
          title="Identity Verification"
          action={
            <Link href="/face-verification" className="rounded-full bg-[#2E7D5B] px-4 py-2 text-sm font-semibold text-white">
              Open Face Check
            </Link>
          }
        />
        <div className="space-y-3">
          <StepRow icon={Upload} label="Uploaded Photo" value={data.verification.uploadedPhoto} complete />
          <StepRow icon={IdCard} label="ID Proof" value={data.verification.idProof} complete />
          <StepRow icon={Fingerprint} label="Duplicate Identity Check" value={data.verification.duplicateCheck} complete />
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle title="Verification Pass" action={<StatusPill value="Cleared" />} />
        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Verification ID</p>
            <p className="mt-1 text-3xl font-medium text-slate-950">{data.profile.verificationId}</p>
          </div>
          <QrCode className="text-emerald-700" size={54} />
        </div>
        <div className="mt-4 space-y-3">
          <InfoRow label="Identity Status" value={data.verification.identityStatus} />
          <InfoRow label="Exam Eligibility" value={data.verification.examEligibility} />
        </div>
      </GlassCard>
    </div>
  );
}

function ExamsPanel({ data }: { data: StudentPortalData }) {
  const [selectedExamId, setSelectedExamId] = useState(data.exams[0]?.id);
  const selectedExam = data.exams.find((exam) => exam.id === selectedExamId) ?? data.exams[0];

  if (!selectedExam) {
    return <ErrorPanel message="No linked exams found." />;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <GlassCard>
        <SectionTitle title="Linked Exams" action={<span className="text-sm font-medium text-slate-500">Read-only sync</span>} />
        <div className="space-y-3">
          {data.exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`w-full rounded-lg border p-4 text-left transition ${
                selectedExam.id === exam.id ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-950">{exam.name}</span>
                <StatusPill value={exam.status === "Registered" ? "Cleared" : "Review"} />
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      <ExamDetails exam={selectedExam} />
    </div>
  );
}

function ExamDetails({ exam }: { exam: StudentExam }) {
  return (
    <GlassCard>
      <SectionTitle title="Exam Information" />
      <div className="space-y-3">
        <InfoRow label="Exam" value={exam.name} />
        <InfoRow label="Status" value={exam.status} />
        <InfoRow label="Exam Date" value={exam.date} />
        <InfoRow label="Reporting Time" value={exam.reporting} />
        <InfoRow label="Center" value={exam.center} />
        <InfoRow label="Eligibility" value={exam.eligibility} />
      </div>
      {exam.status === "Registered" ? (
        <Link
          href={`/face-verification?next=/student`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256A4E]"
        >
          Verify Face for Exam
        </Link>
      ) : (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          Face verification is available only for registered exams.
        </div>
      )}
    </GlassCard>
  );
}

function NotificationsPanel({ data }: { data: StudentPortalData }) {
  return (
    <GlassCard>
      <SectionTitle title="Recent Notifications" />
      <div className="space-y-3">
        {data.notifications.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <Bell className="mt-1 text-emerald-700" size={18} />
              <div>
                <p className="font-medium text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.time}</p>
              </div>
            </div>
            <StatusPill value={item.tone} />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function ComplaintsPanel({ data, onRefresh }: { data: StudentPortalData; onRefresh: () => Promise<void> }) {
  const [issue, setIssue] = useState("Center issue");
  const [exam, setExam] = useState(data.exams[0]?.name ?? "");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function submitComplaint() {
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/student/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue, exam, description }),
      });

      if (!response.ok) {
        const error = (await response.json()) as { error?: string };
        throw new Error(error.error ?? "Complaint could not be submitted.");
      }

      setDescription("");
      setMessage("Complaint submitted successfully.");
      await onRefresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Complaint could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <GlassCard>
        <SectionTitle title="Raise Complaint" />
        <div className="space-y-3">
          <Field label="Issue Type" value={issue} onChange={setIssue} />
          <Field label="Exam" value={exam} onChange={setExam} />
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-500">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
              placeholder="Write the issue clearly for the authority team."
            />
          </label>
        </div>
        <button
          onClick={submitComplaint}
          disabled={submitting}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="animate-spin" size={16} />}
          Submit Complaint
        </button>
        {message && <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>}
      </GlassCard>

      <GlassCard>
        <SectionTitle title="Track Complaints" />
        <div className="space-y-3">
          {data.complaints.map((complaint) => (
            <div key={complaint.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-950">{complaint.id}</p>
                  <p className="mt-1 text-sm text-slate-500">{complaint.issue} - {complaint.exam}</p>
                </div>
                <StatusPill value={complaint.status === "Resolved" ? "Cleared" : "Review"} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">{complaint.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function SettingsPanel({ data }: { data: StudentPortalData }) {
  return (
    <GlassCard>
      <SectionTitle title="Preferences" />
      <div className="space-y-3">
        <InfoRow label="SMS Alerts" value={data.settings.smsAlerts} />
        <InfoRow label="Email Notifications" value={data.settings.emailNotifications} />
        <InfoRow label="Language" value={data.settings.language} />
        <InfoRow label="Data Sharing" value={data.settings.dataSharing} />
      </div>
    </GlassCard>
  );
}

function ErrorPanel({ message }: { message: string }) {
  return <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-800">{message}</div>;
}

function CountdownBox({ value, label, compact = false }: { value: string; label: string; compact?: boolean }) {
  return (
    <div className="min-w-0 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-center sm:min-w-24">
      <p className={`${compact ? "text-base" : "text-3xl"} break-words font-medium leading-tight text-emerald-800`}>{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-emerald-700">{label}</p>
    </div>
  );
}

function ReadinessItem({ label, complete = false }: { label: string; complete?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {complete ? <CheckCircle2 className="text-emerald-700" size={17} /> : <span className="text-amber-600">!</span>}
      <span className={complete ? "text-slate-700" : "text-amber-700"}>{label}</span>
    </div>
  );
}

function StatusBlock({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <GlassCard className="min-h-40">
      <Icon className="text-emerald-700" size={24} />
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-medium text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
      <div className="mt-4">
        <ProgressBar value={value === "2" ? 70 : 100} />
      </div>
    </GlassCard>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left font-medium text-slate-950 transition hover:border-emerald-300 hover:bg-emerald-50"
    >
      <Icon className="text-emerald-700" size={20} />
      {label}
    </button>
  );
}

function StepRow({ icon: Icon, label, value, complete }: { icon: LucideIcon; label: string; value: string; complete: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Icon className="text-emerald-700" size={20} />
        <div>
          <p className="font-medium text-slate-950">{label}</p>
          <p className="text-sm text-slate-500">{value}</p>
        </div>
      </div>
      {complete && <CheckCircle2 className="text-emerald-700" size={20} />}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-950">{value}</span>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-500">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
      />
    </label>
  );
}
