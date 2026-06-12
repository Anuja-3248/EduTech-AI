import { AlertTriangle, Building2, Fingerprint, Gauge, ShieldAlert, Sparkles, UsersRound } from "lucide-react";
import { GlassCard, MetricCard, PageFrame, PremiumWidget, SectionTitle, StatusPill } from "@/components/ui";
import { alerts, trustRows } from "@/lib/data";

export default function AuthorityDashboard() {
  return (
    <PageFrame
      eyebrow="Exam Authority Dashboard"
      title="National command center"
      description="Operational intelligence for student verification, center risk, live violations, and trust score governance."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Students" value="28.4M" change="+412K verified today" icon={UsersRound} />
        <MetricCard label="Exam Centers" value="12,840" change="99.7% online" icon={Building2} />
        <MetricCard label="Violations" value="1,284" change="-18% vs last cycle" icon={ShieldAlert} />
        <MetricCard label="High-Risk Centers" value="143" change="32 need inspection" icon={AlertTriangle} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <PremiumWidget label="Biometric Coverage" value="99.1%" detail="Face, liveness, and document verification coverage across active centers." icon={Fingerprint} score={99} />
        <PremiumWidget label="AI Review Queue" value="286" detail="Prioritized incidents awaiting human authority review." icon={Sparkles} score={82} />
        <PremiumWidget label="Command Health" value="Excellent" detail="Data pipelines, regional nodes, and alert routing are operating normally." icon={Gauge} score={96} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="overflow-x-auto">
          <SectionTitle title="Recent AI Alerts Table" />
          <table className="data-table min-w-[680px]">
            <thead>
              <tr>
                <th>Time</th>
                <th>Center</th>
                <th>Alert Type</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={`${alert.center}-${alert.time}`}>
                  <td className="font-semibold text-emerald-700">{alert.time}</td>
                  <td className="font-medium text-slate-950">{alert.center}</td>
                  <td className="text-slate-600">{alert.type}</td>
                  <td className="font-medium text-slate-950">{alert.confidence}%</td>
                  <td><StatusPill value={alert.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        <GlassCard className="overflow-x-auto">
          <SectionTitle title="Trust Score Table" />
          <table className="data-table min-w-[520px]">
            <thead>
              <tr>
                <th>Center</th>
                <th>State</th>
                <th>Trust</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {trustRows.map((row) => (
                <tr key={row.center}>
                  <td className="font-medium text-slate-950">{row.center}</td>
                  <td className="text-slate-600">{row.state}</td>
                  <td className="font-semibold text-emerald-700">{row.trust}</td>
                  <td><StatusPill value={row.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </PageFrame>
  );
}




