"use client";

import dynamic from "next/dynamic";

const ChartLoading = () => <div className="skeleton h-full w-full rounded-lg" />;

const MonitoringChartClient = dynamic(
  () => import("./charts-inner").then((module) => module.MonitoringChartInner),
  { ssr: false, loading: ChartLoading },
);

const StateRankingChartClient = dynamic(
  () => import("./charts-inner").then((module) => module.StateRankingChartInner),
  { ssr: false, loading: ChartLoading },
);

const RiskPieChartClient = dynamic(
  () => import("./charts-inner").then((module) => module.RiskPieChartInner),
  { ssr: false, loading: ChartLoading },
);

const CenterTrustChartClient = dynamic(
  () => import("./charts-inner").then((module) => module.CenterTrustChartInner),
  { ssr: false, loading: ChartLoading },
);

export function MonitoringChart() {
  return (
    <div className="h-72 w-full">
      <MonitoringChartClient />
    </div>
  );
}

export function StateRankingChart() {
  return (
    <div className="h-80 w-full">
      <StateRankingChartClient />
    </div>
  );
}

export function RiskPieChart() {
  return (
    <div className="h-72 w-full">
      <RiskPieChartClient />
    </div>
  );
}

export function CenterTrustChart() {
  return (
    <div className="h-80 w-full">
      <CenterTrustChartClient />
    </div>
  );
}




