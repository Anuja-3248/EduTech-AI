"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, LockKeyhole, ShieldCheck, UserPlus, UserRound } from "lucide-react";
import { AppShell } from "@/components/ui";

type Mode = "login" | "signup";

export default function StudentLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [institution, setInstitution] = useState("");
  const [examName, setExamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "info">("info");

  async function submitSignup() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/student/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          registrationNumber,
          email,
          mobile,
          dob,
          password,
          confirmPassword,
          captcha,
          institution,
          examName,
        }),
      });
      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Could not create account.");
      }

      setStatus("success");
      setMessage(result.message ?? "Account created. Redirecting to face registration...");
      setCaptcha("");
      setConfirmPassword("");
      router.push("/face-verification?next=/student-login");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  async function submitLogin() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/student/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber, password }),
      });
      const result = (await response.json()) as { error?: string; next?: string; account?: { registrationNumber: string; fullName: string } };

      if (!response.ok) {
        throw new Error(result.error ?? "Login failed.");
      }

      if (result.account) {
        localStorage.setItem("edutrust-student-session", JSON.stringify(result.account));
      }

      setStatus("success");
      setMessage("Login successful. Redirecting to face verification...");
      router.push(result.next ?? "/face-verification?next=/student");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <main className="min-h-[calc(100vh-74px)] bg-[#f6f8f5] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700">
              <ArrowLeft size={16} />
              Back to portal selection
            </Link>

            <div className="mt-12">
              <span className="flex size-14 items-center justify-center rounded-lg bg-[#2E7D5B]/10 text-emerald-700">
                <ShieldCheck size={30} />
              </span>
              <h1 className="mt-5 text-4xl font-medium tracking-normal text-slate-950">Student Access</h1>
              <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
                New students create an EduTrust account, register their face template, then login with password plus face verification.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <FlowStep complete label="Create account with basic details" />
              <FlowStep complete={mode === "login"} label="Login with registration number and password" />
              <FlowStep label="Verify face with blink/smile liveness" />
              <FlowStep label="Login success and open dashboard" />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "signup" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-[#2E7D5B]/10 text-emerald-700">
                  {mode === "login" ? <UserRound size={22} /> : <UserPlus size={22} />}
                </span>
                <div>
                  <h2 className="text-2xl font-medium text-slate-950">{mode === "login" ? "Login to your account" : "Create student account"}</h2>
                  <p className="text-sm text-slate-500">
                    {mode === "login" ? "Use registration number, password, then verify face." : "Fill details and complete face registration after account creation."}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {mode === "signup" && (
                  <>
                    <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Aarav Sharma" />
                    <Field label="Registration/Roll Number" value={registrationNumber} onChange={setRegistrationNumber} placeholder="EDU12345" />
                    <Field label="Email Address" value={email} onChange={setEmail} placeholder="student@example.com" type="email" />
                    <Field label="Mobile Number" value={mobile} onChange={setMobile} placeholder="+91 9876543210" type="tel" />
                    <Field label="Date of Birth" value={dob} onChange={setDob} placeholder="Select date" type="date" />
                  </>
                )}

                {mode === "login" && (
                  <Field label="Registration Number" value={registrationNumber} onChange={setRegistrationNumber} placeholder="EDU12345" />
                )}
                <Field label="Password" value={password} onChange={setPassword} placeholder="Enter password" type="password" />

                {mode === "signup" && (
                  <>
                    <Field label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter password" type="password" />
                    <Field label="Institution/College Name (Optional)" value={institution} onChange={setInstitution} placeholder="ABC College, Pune" />
                    <Field label="Exam Name (Optional)" value={examName} onChange={setExamName} placeholder="NEET 2025" />
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-600">Captcha: What is 7 + 5?</span>
                        <input
                          value={captcha}
                          onChange={(event) => setCaptcha(event.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-500"
                          placeholder="Enter answer"
                        />
                      </label>
                    </div>
                  </>
                )}

                <button
                  onClick={mode === "login" ? submitLogin : submitSignup}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256A4E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <Loader2 className="animate-spin" size={17} /> : <LockKeyhole size={17} />}
                  {mode === "login" ? "Verify Face and Login" : "Create Account and Register Face"}
                </button>

                {message && <ResultMessage message={message} status={status} />}

                {mode === "login" && (
                  <p className="text-center text-sm text-slate-500">
                    Demo login: <span className="font-semibold text-slate-700">EDU12345</span> /{" "}
                    <span className="font-semibold text-slate-700">student123</span>
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
        placeholder={placeholder}
      />
    </label>
  );
}

function FlowStep({ label, complete = false }: { label: string; complete?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
      <span className={`flex size-7 items-center justify-center rounded-full ${complete ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
        <CheckCircle2 size={16} />
      </span>
      {label}
    </div>
  );
}

function ResultMessage({ message, status }: { message: string; status: "success" | "error" | "info" }) {
  const style =
    status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : status === "error"
        ? "border-rose-200 bg-rose-50 text-rose-800"
        : "border-amber-200 bg-amber-50 text-amber-800";

  return <div className={`rounded-lg border p-4 text-sm font-medium ${style}`}>{message}</div>;
}
