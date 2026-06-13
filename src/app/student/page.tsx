import { BadgeCheck, CalendarCheck, Download, FileCheck2, IdCard, ShieldCheck, UserRoundCheck } from "lucide-react";
import { GlassCard, PageFrame, PremiumWidget, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";

export default function StudentDashboard() {
  return (
    <PageFrame
      eyebrow="Student Dashboard"
      title="Candidate integrity passport"
      description="A transparent view of verification, admit card readiness, exam participation, and result authenticity."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <SectionTitle title="Profile Card" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-24 items-center justify-center rounded-lg bg-[#2E7D5B]/10 text-3xl font-medium text-emerald-800 accent-glow">
              AS
            </div>
            <div>
              <h2 className="text-2xl font-medium text-slate-950">Aarav Sharma</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">NEET-UG 2026 - Application ID: EDU-26-842901</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill value="Cleared" />
                <span className="rounded-full border border-emerald-300/25 bg-[#2E7D5B]/10 px-3 py-1 text-xs font-semibold text-emerald-700">Delhi NCR-22</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Verification Status" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Face Match", "99.2%", UserRoundCheck],
              ["Document AI", "Verified", IdCard],
              ["Liveness", "Passed", ShieldCheck],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-4">
                <Icon className="text-emerald-700" size={24} />
                <p className="mt-4 text-sm font-medium text-slate-500">{label as string}</p>
                <p className="mt-2 text-xl font-medium text-slate-950">{value as string}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <PremiumWidget label="Identity Confidence" value="99.2%" detail="Face match, liveness, and official document signals are aligned." icon={UserRoundCheck} score={99} />
        <PremiumWidget label="Exam Readiness" value="96%" detail="Admit card, center allocation, and biometric lane status are complete." icon={CalendarCheck} score={96} />
        <PremiumWidget label="Result Integrity" value="98.6" detail="Answer sheet hash and evaluation ledger are verified." icon={BadgeCheck} score={98} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <SectionTitle
            title="Admit Card Section"
            action={<button className="inline-flex items-center gap-2 rounded-full bg-[#2E7D5B] px-4 py-2 text-sm font-semibold text-white"><Download size={16} /> Download</button>}
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
              <span className="font-medium text-slate-600">Exam Slot</span>
              <span className="font-medium text-slate-950">12 Jul 2026, 10:00 AM</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
              <span className="font-medium text-slate-600">Center Gate</span>
              <span className="font-medium text-slate-950">Gate 3 - Biometric Lane B</span>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
                <span>Readiness Score</span>
                <span>96%</span>
              </div>
              <ProgressBar value={96} />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Result Verification Section" />
          <div className="rounded-lg border border-emerald-300/20 bg-[#2E7D5B]/10 p-5">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 text-emerald-700" />
              <div>
                <h3 className="font-medium text-slate-950">Result authenticity confirmed</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Attendance, biometric verification, answer sheet hash, and evaluation ledger match the national audit trail.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <FileCheck2 className="text-emerald-700" />
              <p className="mt-3 text-sm font-medium text-slate-500">Answer Sheet Hash</p>
              <p className="mt-1 break-all text-sm font-medium text-slate-950">0x7F9A...C26E</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <ShieldCheck className="text-emerald-700" />
              <p className="mt-3 text-sm font-medium text-slate-500">Integrity Trust</p>
              <p className="mt-1 text-2xl font-medium text-slate-950">98.6</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageFrame>
  );
}




