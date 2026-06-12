import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduTrust AI | National Exam Integrity Platform",
  description:
    "A premium AI platform for secure, transparent, and trustworthy national examinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}




