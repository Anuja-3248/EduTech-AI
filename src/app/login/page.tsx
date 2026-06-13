import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, UserRound } from "lucide-react";
import { AppShell } from "@/components/ui";

export default function LoginPage() {
  return (
    <AppShell>
      <main className="min-h-[calc(100vh-74px)] bg-[#f4f2ff]">
        <section className="grid min-h-[calc(100vh-74px)] overflow-hidden lg:grid-cols-2">
          <div className="relative min-h-[42vh] overflow-hidden border-b border-white/70 bg-white lg:min-h-[calc(100vh-74px)] lg:border-b-0 lg:border-r">
            <Image
              src="/login-student-study-cropped.jpeg"
              alt="Student studying with laptop and notebook"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-[#f4f2ff]/30" />
            <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-[#d7d1ff] to-transparent lg:block" />
            <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent to-[#f4f2ff]/55 lg:block" />
          </div>

          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-[390px] text-center">
              <Link
                href="/"
                aria-label="EduTrust AI home"
                className="mx-auto flex size-16 items-center justify-center rounded-full text-[#4f35e8] transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5a3ff2]"
              >
                <ShieldCheck size={54} strokeWidth={1.8} />
              </Link>

              <h1 className="mt-4 text-3xl font-semibold tracking-normal text-[#0c1230]">
                EduTrust AI
              </h1>
              <p className="mt-2 text-base font-medium text-slate-500">
                Secure Exam Integrity Platform
              </p>

              <div className="mt-10">
                <h2 className="text-3xl font-semibold tracking-normal text-[#0c1230]">
                  Secure Login
                </h2>
                <p className="mt-3 text-base font-medium text-slate-500">
                  Choose your portal to continue
                </p>
              </div>

              <div className="mt-10 space-y-5">
                <Link
                  href="/student-login"
                  className="group flex min-h-[78px] w-full items-center justify-center gap-5 rounded-lg bg-gradient-to-r from-[#7357ff] to-[#2f10e7] px-6 text-lg font-semibold text-white shadow-[0_14px_28px_rgba(77,54,224,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(77,54,224,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f35e8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f2ff]"
                >
                  <UserRound size={26} strokeWidth={2.2} />
                  <span>Student Login</span>
                </Link>

                <Link
                  href="/authority-login"
                  className="group flex min-h-[78px] w-full items-center justify-center gap-5 rounded-lg bg-white px-6 text-lg font-semibold text-[#0c1230] shadow-[0_14px_30px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(15,23,42,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f35e8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f2ff]"
                >
                  <ShieldCheck size={28} strokeWidth={2.1} className="text-[#35216f]" />
                  <span>Authority Login</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
