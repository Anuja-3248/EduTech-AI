export const nationalStats = [
  { label: "Verified Students", value: "28.4M", change: "+14.2%" },
  { label: "Exam Centers", value: "12,840", change: "Live" },
  { label: "Papers Secured", value: "96,210", change: "Zero breach" },
  { label: "Trust Index", value: "94.8", change: "+6.1 pts" },
];

export const alerts = [
  {
    center: "Lucknow Central Hub",
    type: "Face mismatch cluster",
    confidence: 91,
    status: "Escalated",
    time: "09:42",
  },
  {
    center: "Jaipur North-18",
    type: "Device signal anomaly",
    confidence: 84,
    status: "Review",
    time: "09:36",
  },
  {
    center: "Pune West-04",
    type: "Gaze pattern deviation",
    confidence: 78,
    status: "Monitoring",
    time: "09:31",
  },
  {
    center: "Guwahati Zone-07",
    type: "Audio spike detected",
    confidence: 73,
    status: "Cleared",
    time: "09:18",
  },
];

export const trustRows = [
  { center: "Delhi NCR-22", state: "Delhi", trust: 98, risk: "Low" },
  { center: "Bengaluru East-12", state: "Karnataka", trust: 96, risk: "Low" },
  { center: "Bhopal City-09", state: "Madhya Pradesh", trust: 89, risk: "Medium" },
  { center: "Patna Central-15", state: "Bihar", trust: 82, risk: "Elevated" },
  { center: "Jaipur North-18", state: "Rajasthan", trust: 76, risk: "High" },
];

export const stateRankings = [
  { state: "Kerala", score: 97 },
  { state: "Karnataka", score: 95 },
  { state: "Maharashtra", score: 94 },
  { state: "Delhi", score: 92 },
  { state: "Gujarat", score: 90 },
  { state: "Rajasthan", score: 84 },
];

export const monitoringSeries = [
  { time: "09:00", alerts: 12, confidence: 92 },
  { time: "09:15", alerts: 16, confidence: 89 },
  { time: "09:30", alerts: 21, confidence: 86 },
  { time: "09:45", alerts: 14, confidence: 91 },
  { time: "10:00", alerts: 9, confidence: 95 },
  { time: "10:15", alerts: 18, confidence: 88 },
];

export const riskDistribution = [
  { name: "Low", value: 64, color: "#2E7D5B" },
  { name: "Medium", value: 24, color: "#fbbf24" },
  { name: "High", value: 12, color: "#fb7185" },
];

export const centerScores = [
  { name: "North", trust: 93, risk: 18 },
  { name: "South", trust: 96, risk: 10 },
  { name: "East", trust: 88, risk: 26 },
  { name: "West", trust: 91, risk: 20 },
  { name: "Central", trust: 86, risk: 31 },
];

export const workflow = [
  "Student identity is verified through AI face matching and document checks.",
  "Question papers are encrypted, sealed, and time-locked in the national vault.",
  "Live AI monitoring scores every center, stream, and incident in real time.",
  "Results are verified against audit trails before public release.",
];
