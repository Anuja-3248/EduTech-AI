"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

export function GlowPulse({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`pointer-events-none absolute rounded-full bg-[#2E7D5B]/20 blur-2xl ${className}`}
      animate={{ opacity: [0.18, 0.42, 0.18], scale: [0.96, 1.08, 0.96] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}




