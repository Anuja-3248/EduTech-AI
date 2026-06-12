import { Clock3, FileUp, KeyRound, Lock, ServerCog, ShieldCheck, Users } from "lucide-react";
import { GlassCard, PageFrame, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";

export default function VaultPage() {
  return (
    <PageFrame
      eyebrow="Secure Question Paper Vault"
      title="Encrypted custody with timed release"
      description="Upload, seal, monitor, and unlock national question papers through role-controlled cryptographic workflows."
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard>
          <SectionTitle title="Upload Paper" />
          <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-emerald-300/35 bg-[#2E7D5B]/5 p-6 text-center">
            <FileUp className="text-emerald-700" size={42} />
            <h2 className="mt-5 text-2xl font-medium text-slate-950">NEET Physics Set-A.pdf</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
              Drag a digitally signed paper here or select from the authority archive. SHA-256 hash and custody ledger are generated automatically.
            </p>
            <button className="premium-button mt-6 rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#256A4E]">Select Secure File</button>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Encryption Status" action={<StatusPill value="Cleared" />} />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["AES-256 Seal", "Complete", Lock],
              ["Ledger Hash", "Anchored", ServerCog],
              ["Key Split", "5 of 7", KeyRound],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-4">
                <Icon className="text-emerald-700" />
                <p className="mt-4 text-sm font-medium text-slate-500">{label as string}</p>
                <p className="mt-2 text-xl font-medium text-slate-950">{value as string}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
              <span>National replication health</span>
              <span>99%</span>
            </div>
            <ProgressBar value={99} tone="green" />
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassCard className="scanlines">
          <SectionTitle title="Unlock Countdown Timer" />
          <div className="grid grid-cols-4 gap-3">
            {[
              ["18", "Hours"],
              ["42", "Minutes"],
              ["16", "Seconds"],
              ["07", "Zones"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-emerald-200 bg-white p-4 text-center transition hover:border-emerald-300 hover:bg-[#2E7D5B]/5">
                <p className="text-3xl font-medium text-emerald-800">{value}</p>
                <p className="mt-2 text-xs font-medium uppercase text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Unlock requires biometric confirmation from central authority, state nodal officer, and center superintendent.
          </p>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Access Control UI" />
          <div className="space-y-3">
            {[
              ["National Controller", "Approved", ShieldCheck],
              ["State Nodal Officer", "Approved", Users],
              ["Center Superintendent", "Pending biometric", Clock3],
            ].map(([role, status, Icon]) => (
              <div key={role as string} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <Icon className="text-emerald-700" />
                  <span className="font-medium text-slate-950">{role as string}</span>
                </div>
                <span className="text-sm font-semibold text-slate-600">{status as string}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageFrame>
  );
}




