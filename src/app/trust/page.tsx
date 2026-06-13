import { BarChart3, Globe2, MapPinned, ShieldCheck, TrendingUp } from "lucide-react";
import { CenterTrustChart, RiskPieChart, StateRankingChart } from "@/components/charts";
import { GlassCard, MetricCard, PageFrame, PremiumWidget, SectionTitle, StatusPill } from "@/components/ui";
import { trustRows } from "@/lib/data";

export default function TrustDashboard() {
  return (
    <PageFrame
      eyebrow="Trust Score Dashboard"
      title="Transparent integrity analytics"
      description="A national trust layer ranking states, centers, and risk clusters with explainable AI scoring."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="National Trust Index" value="94.8" change="+6.1 pts" icon={Globe2} />
        <MetricCard label="Top State" value="Kerala" change="97 trust score" icon={MapPinned} />
        <MetricCard label="Verified Centers" value="12,697" change="98.9% cleared" icon={ShieldCheck} />
        <MetricCard label="Risk Trend" value="-18%" change="Improving" icon={TrendingUp} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <PremiumWidget label="Explainability Coverage" value="93%" detail="Trust scores backed by biometric, vault, and proctoring evidence trails." icon={BarChart3} score={93} />
        <PremiumWidget label="Public Verification" value="Live" detail="Student result hashes and official audit receipts available for verification." icon={ShieldCheck} score={97} />
        <PremiumWidget label="Regional Equity" value="91.2" detail="Score normalization reduces infrastructure bias across states and zones." icon={Globe2} score={91} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <SectionTitle title="State Rankings" />
          <StateRankingChart />
        </GlassCard>
        <GlassCard>
          <SectionTitle title="Center Trust Scores" />
          <CenterTrustChart />
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassCard>
          <SectionTitle title="Risk Analytics Charts" />
          <RiskPieChart />
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-emerald-300/20 bg-[#2E7D5B]/10 p-3 text-sm font-semibold text-emerald-700">64% Low</div>
            <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm font-semibold text-amber-200">24% Medium</div>
            <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3 text-sm font-semibold text-rose-200">12% High</div>
          </div>
        </GlassCard>
        <GlassCard className="overflow-x-auto">
          <SectionTitle title="Center Audit Ranking" />
          <table className="data-table min-w-[640px]">
            <thead>
              <tr>
                <th>Center</th>
                <th>State</th>
                <th>Trust Score</th>
                <th>Risk Level</th>
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {trustRows.map((row) => (
                <tr key={row.center}>
                  <td className="font-medium text-slate-950">{row.center}</td>
                  <td className="text-slate-600">{row.state}</td>
                  <td className="font-semibold text-emerald-700">{row.trust}</td>
                  <td><StatusPill value={row.risk} /></td>
                  <td className="text-slate-600">{row.trust > 90 ? "Auto-clear" : row.trust > 82 ? "Human review" : "Deploy inspection team"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </PageFrame>
  );
}




