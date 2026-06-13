"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  FileCheck2,
  FileKey2,
  FileText,
  Fingerprint,
  KeyRound,
  Lock,
  RotateCcw,
  ServerCog,
  ShieldCheck,
  UploadCloud,
  Users,
} from "lucide-react";
import { GlassCard, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";

type VaultStage = "empty" | "uploaded" | "encrypting" | "sealed" | "unlocking" | "unlocked";

type AccessOfficer = {
  role: string;
  name: string;
  approved: boolean;
  icon: typeof ShieldCheck;
};

const initialOfficers: AccessOfficer[] = [
  { role: "National Controller", name: "Dr. Meera Iyer", approved: true, icon: ShieldCheck },
  { role: "State Nodal Officer", name: "Rajiv Menon", approved: true, icon: Users },
  { role: "Center Superintendent", name: "Pending biometric", approved: false, icon: Fingerprint },
];

function formatBytes(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function createHash(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function QuestionVault() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<VaultStage>("empty");
  const [paperName, setPaperName] = useState("No paper selected");
  const [paperSize, setPaperSize] = useState("");
  const [hash, setHash] = useState("");
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(18 * 60 * 60 + 42 * 60 + 16);
  const [officers, setOfficers] = useState(initialOfficers);
  const [auditLog, setAuditLog] = useState<string[]>([
    "Vault session initialized",
    "Access policy loaded: 3-authority unlock",
  ]);

  const allApproved = officers.every((officer) => officer.approved);
  const canSeal = stage === "uploaded";
  const canUnlock = stage === "sealed" && allApproved;

  const countdown = useMemo(() => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return [
      [String(hours).padStart(2, "0"), "Hours"],
      [String(minutes).padStart(2, "0"), "Minutes"],
      [String(seconds).padStart(2, "0"), "Seconds"],
      ["07", "Zones"],
    ];
  }, [secondsLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage !== "encrypting") {
      return;
    }

    const timer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 12);
        if (next === 100) {
          clearInterval(timer);
          setStage("sealed");
          setAuditLog((currentLog) => [
            "AES-256 seal complete",
            "Ledger hash anchored",
            "Question paper locked for timed release",
            ...currentLog,
          ]);
        }
        return next;
      });
    }, 240);

    return () => clearInterval(timer);
  }, [stage]);

  async function handleFile(file: File) {
    setPaperName(file.name);
    setPaperSize(formatBytes(file.size));
    setStage("uploaded");
    setProgress(0);
    setAuditLog((currentLog) => [`Paper uploaded: ${file.name}`, ...currentLog]);

    try {
      const fileHash = await createHash(file);
      setHash(fileHash);
      setAuditLog((currentLog) => [`SHA-256 generated: ${fileHash.slice(0, 14)}...`, ...currentLog]);
    } catch {
      setHash("HASH_UNAVAILABLE");
      setAuditLog((currentLog) => ["Hash generation failed in this browser session", ...currentLog]);
    }
  }

  function onFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  }

  function toggleOfficer(index: number) {
    setOfficers((current) =>
      current.map((officer, officerIndex) =>
        officerIndex === index
          ? {
              ...officer,
              approved: !officer.approved,
              name:
                officer.role === "Center Superintendent" && !officer.approved
                  ? "Anita Rao"
                  : officer.role === "Center Superintendent"
                    ? "Pending biometric"
                    : officer.name,
            }
          : officer,
      ),
    );
    setAuditLog((currentLog) => [`Access approval updated: ${officers[index].role}`, ...currentLog]);
  }

  function sealPaper() {
    if (!canSeal) {
      return;
    }

    setStage("encrypting");
    setProgress(0);
    setAuditLog((currentLog) => ["Encryption workflow started", ...currentLog]);
  }

  function unlockVault() {
    if (!canUnlock) {
      return;
    }

    setStage("unlocking");
    setProgress(0);
    setAuditLog((currentLog) => ["Unlock request approved by all authorities", ...currentLog]);

    const timer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 20);
        if (next === 100) {
          clearInterval(timer);
          setStage("unlocked");
          setAuditLog((currentLog) => ["Paper unlocked for authorized release window", ...currentLog]);
        }
        return next;
      });
    }, 220);
  }

  function resetVault() {
    setStage("empty");
    setPaperName("No paper selected");
    setPaperSize("");
    setHash("");
    setProgress(0);
    setOfficers(initialOfficers);
    setAuditLog(["Vault reset", "Access policy loaded: 3-authority unlock"]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard>
          <SectionTitle
            title="Upload Paper"
            action={
              stage !== "empty" ? (
                <button
                  onClick={resetVault}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              ) : undefined
            }
          />
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.zip" className="hidden" onChange={onFileInput} />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex min-h-72 w-full flex-col items-center justify-center rounded-lg border border-dashed border-emerald-300/50 bg-[#2E7D5B]/5 p-6 text-center transition hover:border-emerald-500 hover:bg-[#2E7D5B]/10"
          >
            <UploadCloud className="text-emerald-700" size={44} />
            <span className="mt-5 block text-2xl font-medium text-slate-950">{paperName}</span>
            <span className="mt-3 block max-w-md text-sm leading-7 text-slate-500">
              Select a digitally signed question paper. The vault will generate a SHA-256 hash, simulate encryption, and prepare timed access control.
            </span>
            {paperSize && <span className="mt-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{paperSize}</span>}
          </button>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Encryption Status" action={<StatusPill value={stage === "sealed" || stage === "unlocked" ? "Cleared" : "Monitoring"} />} />
          <div className="grid gap-4 sm:grid-cols-3">
            <StatusTile icon={Lock} label="AES-256 Seal" value={stage === "sealed" || stage === "unlocked" ? "Complete" : stage === "encrypting" ? "Encrypting" : "Waiting"} />
            <StatusTile icon={ServerCog} label="Ledger Hash" value={hash ? "Generated" : "Pending"} />
            <StatusTile icon={KeyRound} label="Key Split" value={`${officers.filter((officer) => officer.approved).length} of 3`} />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
                <span>{stage === "unlocking" ? "Unlock progress" : "Encryption progress"}</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} tone={stage === "unlocked" ? "green" : "emerald"} />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-500">SHA-256 Fingerprint</p>
              <p className="mt-2 break-all font-mono text-sm text-slate-800">{hash || "Upload a paper to generate hash"}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={sealPaper}
                disabled={!canSeal}
                className="inline-flex items-center gap-2 rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256A4E] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileKey2 size={17} />
                Seal Paper
              </button>
              <button
                onClick={unlockVault}
                disabled={!canUnlock}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileCheck2 size={17} />
                Unlock Vault
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="scanlines">
          <SectionTitle title="Unlock Countdown Timer" />
          <div className="grid grid-cols-4 gap-3">
            {countdown.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-emerald-200 bg-white p-4 text-center transition hover:border-emerald-300 hover:bg-[#2E7D5B]/5">
                <p className="text-3xl font-medium text-emerald-800">{value}</p>
                <p className="mt-2 text-xs font-medium uppercase text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Unlock requires biometric confirmation from every assigned authority. The final button activates only when the paper is sealed and all approvals are complete.
          </p>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Access Control" action={<StatusPill value={allApproved ? "Cleared" : "Review"} />} />
          <div className="space-y-3">
            {officers.map((officer, index) => (
              <button
                key={officer.role}
                onClick={() => toggleOfficer(index)}
                className="flex w-full items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <div className="flex items-center gap-3">
                  <officer.icon className="text-emerald-700" />
                  <div>
                    <span className="block font-medium text-slate-950">{officer.role}</span>
                    <span className="mt-1 block text-sm text-slate-500">{officer.name}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${officer.approved ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                  {officer.approved ? "Approved" : "Pending"}
                </span>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <SectionTitle title="Audit Trail" />
        <div className="grid gap-3 md:grid-cols-2">
          {auditLog.slice(0, 8).map((entry, index) => (
            <div key={`${entry}-${index}`} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#2E7D5B]/10 text-emerald-700">
                {index === 0 ? <CheckCircle2 size={16} /> : <FileText size={16} />}
              </span>
              <span className="text-sm font-medium text-slate-600">{entry}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function StatusTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Lock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <Icon className="text-emerald-700" />
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-medium text-slate-950">{value}</p>
    </div>
  );
}
