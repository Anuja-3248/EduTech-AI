"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { centerScores, monitoringSeries, riskDistribution, stateRankings } from "@/lib/data";

const tooltipStyle = {
  background: "#0f172a",
  border: "1px solid rgba(148, 163, 184, 0.24)",
  borderRadius: 8,
  color: "#e2e8f0",
};

export function MonitoringChartInner() {
  return (
    <ResponsiveContainer>
      <AreaChart data={monitoringSeries} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="alerts" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#2E7D5B" stopOpacity={0.34} />
            <stop offset="95%" stopColor="#2E7D5B" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="alerts" stroke="#2E7D5B" strokeWidth={3} fill="url(#alerts)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function StateRankingChartInner() {
  return (
    <ResponsiveContainer>
      <BarChart data={stateRankings} layout="vertical" margin={{ left: 5, right: 20, top: 5, bottom: 5 }}>
        <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" horizontal={false} />
        <XAxis type="number" domain={[70, 100]} hide />
        <YAxis dataKey="state" type="category" stroke="#94a3b8" width={86} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="score" radius={[0, 8, 8, 0]} fill="#2E7D5B" barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RiskPieChartInner() {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={5}>
          {riskDistribution.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CenterTrustChartInner() {
  return (
    <ResponsiveContainer>
      <BarChart data={centerScores} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="trust" fill="#2E7D5B" radius={[8, 8, 0, 0]} />
        <Bar dataKey="risk" fill="#fb7185" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}




