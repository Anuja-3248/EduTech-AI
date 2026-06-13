"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
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
      const { auth, db } = await import("@/lib/firebase");
      const normalizedRegistration = registrationNumber.trim().toUpperCase();
      const normalizedEmail = email.trim().toLowerCase();

      if (!fullName.trim() || !normalizedRegistration || !normalizedEmail || !mobile.trim() || !dob || !password || !confirmPassword || !captcha.trim()) {
        throw new Error("Please fill all required signup fields.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      if (password !== confirmPassword) {
        throw new Error("Password and confirm password do not match.");
      }

      if (captcha.trim() !== "12") {
        throw new Error("Captcha answer is incorrect.");
      }

      const registrationRef = doc(db, "registrationNumbers", normalizedRegistration);
      const registrationSnapshot = await getDoc(registrationRef);

      if (registrationSnapshot.exists()) {
        throw new Error("An account already exists for this registration number.");
      }

      const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const uid = credential.user.uid;

      await setDoc(doc(db, "students", uid), {
        uid,
        fullName: fullName.trim(),
        registrationNumber: normalizedRegistration,
        email: normalizedEmail,
        mobile: mobile.trim(),
        dob,
        institution: institution.trim(),
        examName: examName.trim(),
        faceRegistered: false,
        verificationStatus: "Face Pending",
        createdAt: serverTimestamp(),
      });

      await setDoc(registrationRef, {
        uid,
        email: normalizedEmail,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setMessage("Account created. Redirecting to face registration...");
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
      const { auth, db } = await import("@/lib/firebase");
      const normalizedRegistration = registrationNumber.trim().toUpperCase();

      if (!normalizedRegistration || !password) {
        throw new Error("Registration number and password are required.");
      }

      const registrationSnapshot = await getDoc(doc(db, "registrationNumbers", normalizedRegistration));

      if (!registrationSnapshot.exists()) {
        throw new Error("No account found for this registration number.");
      }

      const registrationData = registrationSnapshot.data() as { email?: string; uid?: string };
      if (!registrationData.email || !registrationData.uid) {
        throw new Error("Student account record is incomplete.");
      }

      const credential = await signInWithEmailAndPassword(auth, registrationData.email, password);
      const studentSnapshot = await getDoc(doc(db, "students", credential.user.uid));
      const student = studentSnapshot.data() as { fullName?: string; registrationNumber?: string } | undefined;

      localStorage.setItem(
        "edutrust-student-session",
        JSON.stringify({
          uid: credential.user.uid,
          fullName: student?.fullName ?? "Student",
          registrationNumber: student?.registrationNumber ?? normalizedRegistration,
        }),
      );

      setStatus("success");
      setMessage("Login successful. Opening student dashboard...");
      router.push("/student");
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
                New students create an EduTrust account and register their face once. Daily login only needs registration number and password.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <FlowStep complete label="Create account with basic details" />
              <FlowStep complete={mode === "signup"} label="Register face once after signup" />
              <FlowStep complete={mode === "login"} label="Login with registration number and password" />
              <FlowStep label="Face verification is required on exam day" />
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
                    {mode === "login" ? "Use registration number and password." : "Fill details and complete face registration after account creation."}
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
                  {mode === "login" ? "Login" : "Create Account and Register Face"}
                </button>

                {message && <ResultMessage message={message} status={status} />}

                {mode === "login" && (
                  <p className="text-center text-sm text-slate-500">
                    Use the registration number and password you created during signup.
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
