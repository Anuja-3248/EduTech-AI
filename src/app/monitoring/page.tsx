import { Activity, Camera, Eye, ShieldAlert, Video } from "lucide-react";
import { MonitoringChart } from "@/components/charts";
import { GlassCard, PageFrame, PremiumWidget, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";
import { alerts } from "@/lib/data";

export default function MonitoringPage() {
  return (
    <PageFrame
      eyebrow="AI Monitoring Page"
      title="Live proctoring intelligence"
      description="Computer vision, audio events, biometric drift, and anomaly detection fused into a real-time monitoring console."
    >
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <GlassCard className="overflow-hidden p-0">
          <div className="relative min-h-[430px] bg-[#173528]">
            <div className="scanlines absolute inset-0 opacity-70" />
            <div className="absolute inset-6 rounded-lg border border-white/20 bg-white/5" />
            <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-50">
              <span className="size-2 rounded-full bg-emerald-200" />
              LIVE CAMERA - DELHI NCR-22
            </div>
            <div className="relative flex min-h-[430px] flex-col items-center justify-center text-center">
              <Camera className="text-emerald-100" size={58} />
              <h2 className="mt-5 text-3xl font-medium text-white">AI camera feed placeholder</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-emerald-50/80">
                Face visibility, gaze movement, seating geometry, and object detection overlays would render here.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Confidence Scores" />
          <div className="space-y-5">
            {[
              ["Face Continuity", 96, "green"],
              ["Gaze Integrity", 88, "emerald"],
              ["Object Risk", 21, "amber"],
              ["Audio Anomaly", 12, "rose"],
            ].map(([label, value, tone]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
                  <span>{label as string}</span>
                  <span>{value as number}%</span>
                </div>
                <ProgressBar value={value as number} tone={tone as "emerald" | "green" | "amber" | "rose"} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <PremiumWidget label="Attention Integrity" value="91.4" detail="Aggregated gaze, posture, and continuity score for live candidates." icon={Eye} score={91} />
        <PremiumWidget label="Feed Stability" value="99.6%" detail="Camera, audio, and network continuity across synchronized centers." icon={Video} score={99} />
        <PremiumWidget label="Incident Precision" value="88.7%" detail="Confidence-weighted alert quality after false-positive suppression." icon={Activity} score={89} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <SectionTitle title="Suspicious Activity Alerts" />
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.center} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{alert.type}</p>
                    <p className="mt-1 text-sm text-slate-500">{alert.center} - {alert.time}</p>
                  </div>
                  <StatusPill value={alert.status} />
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm font-medium text-emerald-700">
                  <ShieldAlert size={16} />
                  {alert.confidence}% AI confidence
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Monitoring Analytics" action={<span className="text-sm font-semibold text-emerald-700">6 live intervals</span>} />
          <MonitoringChart />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Active Feeds", "12,610", Video],
              ["AI Events", "1,284", Activity],
              ["Manual Reviews", "86", Eye],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-4">
                <Icon className="text-emerald-700" />
                <p className="mt-3 text-sm font-medium text-slate-500">{label as string}</p>
                <p className="mt-1 text-xl font-medium text-slate-950">{value as string}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageFrame>
  );
}




