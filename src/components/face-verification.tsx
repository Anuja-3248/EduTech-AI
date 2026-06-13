"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Smile,
} from "lucide-react";
import { GlassCard, ProgressBar, SectionTitle, StatusPill } from "@/components/ui";

type FaceMode = "home" | "register" | "verify";
type VerificationStatus = "waiting" | "success" | "error" | null;

type LivenessChecks = {
  blink: boolean;
  smile: boolean;
  headTurn: boolean;
};

type StoredStudentRecord = {
  studentID: string;
  studentName: string;
  faceDescriptor: number[];
  timestamp: string;
};

type StudentRecord = Omit<StoredStudentRecord, "faceDescriptor"> & {
  faceDescriptor: Float32Array;
};

type Point = {
  x: number;
  y: number;
};

const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
const STORAGE_KEY = "edutrust-face-students";

const LIVENESS_TIMEOUT_MS = 14000;
const BLINK_THRESHOLD = 0.31;
const SMILE_THRESHOLD = 0.45;
const HEAD_TURN_THRESHOLD = 10;

function createEmptyChecks(): LivenessChecks {
  return {
    blink: false,
    smile: false,
    headTurn: false,
  };
}

function readStudents(): StudentRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const students = JSON.parse(stored) as StoredStudentRecord[];
    return students.map((student) => ({
      ...student,
      faceDescriptor: new Float32Array(student.faceDescriptor),
    }));
  } catch {
    return [];
  }
}

function writeStudents(students: StudentRecord[]) {
  const stored: StoredStudentRecord[] = students.map((student) => ({
    ...student,
    faceDescriptor: Array.from(student.faceDescriptor),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

function distance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function eyeAspectRatio(leftEye: Point[], rightEye: Point[]) {
  const left =
    (distance(leftEye[1], leftEye[5]) + distance(leftEye[2], leftEye[4])) /
    (2 * distance(leftEye[0], leftEye[3]));
  const right =
    (distance(rightEye[1], rightEye[5]) + distance(rightEye[2], rightEye[4])) /
    (2 * distance(rightEye[0], rightEye[3]));

  return (left + right) / 2;
}

export function FaceVerification() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [mode, setMode] = useState<FaceMode>("home");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [modelError, setModelError] = useState("");

  const [regStudentID, setRegStudentID] = useState("");
  const [regStudentName, setRegStudentName] = useState("");
  const [regResult, setRegResult] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regAttemptStarted, setRegAttemptStarted] = useState(false);
  const [regLivenessChecks, setRegLivenessChecks] = useState<LivenessChecks>(createEmptyChecks);

  const [verifyStudentID, setVerifyStudentID] = useState("");
  const [verifyResult, setVerifyResult] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<VerificationStatus>(null);
  const [verifyLivenessChecks, setVerifyLivenessChecks] = useState<LivenessChecks>(createEmptyChecks);
  const [foundStudent, setFoundStudent] = useState<StudentRecord | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadModels() {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);

        if (!cancelled) {
          setModelsLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setModelError("Face AI models could not load. Check internet connection and try again.");
        }
      }
    }

    loadModels();

    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function resetToHome() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setMode("home");
    setRegResult("");
    setVerifyResult("");
    setVerifyStatus(null);
    setVerifyLoading(false);
    setRegLoading(false);
    setFoundStudent(null);
    setRegAttemptStarted(false);
    setRegLivenessChecks(createEmptyChecks());
    setVerifyLivenessChecks(createEmptyChecks());
  }

  function detectLivenessAndFace(
    onComplete: (faceDescriptor: Float32Array | null) => void,
    setLivenessChecks: React.Dispatch<React.SetStateAction<LivenessChecks>>,
    setStatusMessage: React.Dispatch<React.SetStateAction<string>>,
    maxDuration = LIVENESS_TIMEOUT_MS,
  ) {
    let blinkCount = 0;
    let smileDetected = false;
    let eyesClosedFrames = 0;
    let headTurnDetected = false;
    let faceDescriptor: Float32Array | null = null;
    let maxHeadTurn = 0;
    let initialNoseX: number | null = null;
    const startTime = Date.now();

    let completed = false;

    function finishIfReady() {
      if (completed || blinkCount < 1 || !smileDetected || !headTurnDetected || !faceDescriptor) {
        return;
      }

      completed = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setLivenessChecks({ blink: true, smile: true, headTurn: true });
      setStatusMessage("All liveness checks completed. Face captured successfully.");
      setTimeout(() => onComplete(faceDescriptor), 650);
    }

    setStatusMessage("Keep your face inside the frame. Blink once, smile, then turn your head slightly.");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      if (Date.now() - startTime > maxDuration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        if (blinkCount >= 1 && smileDetected && headTurnDetected) {
          setLivenessChecks({ blink: true, smile: true, headTurn: true });
          setStatusMessage("All liveness checks completed. Face captured successfully.");
          onComplete(faceDescriptor);
        } else {
          setStatusMessage("Time is up. Please complete blink, smile, and head turn, then try again.");
          onComplete(null);
        }
        return;
      }

      const video = webcamRef.current?.video;
      if (!video || video.readyState < 2) {
        return;
      }

      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor();

        if (!detection) {
          return;
        }

        faceDescriptor = detection.descriptor;
        const landmarks = detection.landmarks;
        const expressions = detection.expressions;
        const ratio = eyeAspectRatio(landmarks.getLeftEye(), landmarks.getRightEye());

        if (ratio < BLINK_THRESHOLD) {
          eyesClosedFrames += 1;
        } else {
          if (eyesClosedFrames >= 1 && blinkCount === 0) {
            blinkCount += 1;
            setLivenessChecks((current) => ({ ...current, blink: true }));
            setStatusMessage("Blink detected. Now smile and turn your head.");
          }
          eyesClosedFrames = 0;
        }

        if (!smileDetected && expressions.happy > SMILE_THRESHOLD) {
          smileDetected = true;
          setLivenessChecks((current) => ({ ...current, smile: true }));
          setStatusMessage("Smile detected. Turn your head slightly left or right.");
        }

        const nose = landmarks.getNose();
        if (nose.length > 0) {
          const noseX = nose[3].x;
          initialNoseX ??= noseX;
          maxHeadTurn = Math.max(maxHeadTurn, Math.abs(noseX - initialNoseX));

          if (!headTurnDetected && maxHeadTurn > HEAD_TURN_THRESHOLD) {
            headTurnDetected = true;
            setLivenessChecks((current) => ({ ...current, headTurn: true }));
            setStatusMessage("Head turn detected. Finishing verification.");
          }
        }

        finishIfReady();
      } catch {
        setStatusMessage("Detection paused. Keep your camera steady and face visible.");
      }
    }, 220);
  }

  function startRegistration() {
    if (!regStudentID.trim() || !regStudentName.trim()) {
      setRegResult("Please enter Student ID and full name.");
      return;
    }

    setRegLoading(true);
    setRegAttemptStarted(true);
    setRegResult("Starting liveness detection...");
    setRegLivenessChecks(createEmptyChecks());

    detectLivenessAndFace(
      (descriptor) => {
        if (!descriptor) {
          setRegLoading(false);
          return;
        }

        const students = readStudents();
        const existingIndex = students.findIndex((student) => student.studentID === regStudentID.trim());
        const newRecord: StudentRecord = {
          studentID: regStudentID.trim(),
          studentName: regStudentName.trim(),
          faceDescriptor: descriptor,
          timestamp: new Date().toISOString(),
        };

        if (existingIndex >= 0) {
          students[existingIndex] = newRecord;
          setRegResult(`Face profile updated for ${newRecord.studentName}.`);
        } else {
          students.push(newRecord);
          setRegResult(`Registration complete for ${newRecord.studentName}.`);
        }

        writeStudents(students);
        setRegLoading(false);
      },
      setRegLivenessChecks,
      setRegResult,
    );
  }

  function checkStudentExists() {
    if (!verifyStudentID.trim()) {
      setVerifyResult("Please enter Student ID.");
      setVerifyStatus("error");
      return;
    }

    const student = readStudents().find((record) => record.studentID === verifyStudentID.trim());
    if (!student) {
      setVerifyResult(`Student ID ${verifyStudentID} is not registered yet.`);
      setVerifyStatus("error");
      return;
    }

    setFoundStudent(student);
    setVerifyStatus("waiting");
    setVerifyResult(`Found ${student.studentName}. Starting liveness verification...`);
    startVerification(student);
  }

  function startVerification(student: StudentRecord) {
    setVerifyLoading(true);
    setVerifyLivenessChecks(createEmptyChecks());

    detectLivenessAndFace(
      (liveDescriptor) => {
        if (!liveDescriptor) {
          setVerifyLoading(false);
          setVerifyStatus("error");
          return;
        }

        const distanceScore = faceapi.euclideanDistance(student.faceDescriptor, liveDescriptor);
        const threshold = 0.45;
        const match = distanceScore < threshold;

        if (match) {
          setVerifyResult(
            `Face verified for ${student.studentName}. Confidence ${(100 - distanceScore * 100).toFixed(1)}%.`,
          );
          setVerifyStatus("success");
        } else {
          setVerifyResult(
            `Face mismatch. Distance ${distanceScore.toFixed(2)}. Please try again or contact the exam authority.`,
          );
          setVerifyStatus("error");
        }
        setVerifyLoading(false);
      },
      setVerifyLivenessChecks,
      setVerifyResult,
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="min-h-[560px]">
        <SectionTitle
          title={mode === "home" ? "Face Verification" : mode === "register" ? "Register Student Face" : "Verify Student Face"}
          action={
            mode !== "home" ? (
              <button
                onClick={resetToHome}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : undefined
          }
        />

        {mode === "home" ? (
          <div className="grid gap-4">
            <div className="rounded-lg border border-emerald-200 bg-[#2E7D5B]/10 p-5">
              <ScanFace className="text-emerald-700" size={34} />
              <h2 className="mt-4 text-2xl font-medium text-slate-950">Register or verify a student using live camera checks.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The flow checks blink, smile, and head movement before comparing the live face with the registered face profile.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setMode("register");
                  setRegAttemptStarted(false);
                  setRegResult("");
                  setRegLivenessChecks(createEmptyChecks());
                }}
                disabled={!modelsLoaded}
                className="rounded-lg border border-slate-200 bg-white p-5 text-left transition hover:border-emerald-300 hover:bg-[#2E7D5B]/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <BadgeCheck className="text-emerald-700" />
                <span className="mt-4 block text-lg font-medium text-slate-950">Register Face</span>
                <span className="mt-2 block text-sm leading-6 text-slate-500">Create or update a student face profile.</span>
              </button>
              <button
                onClick={() => {
                  setMode("verify");
                  setVerifyResult("");
                  setVerifyStatus(null);
                  setVerifyLivenessChecks(createEmptyChecks());
                }}
                disabled={!modelsLoaded}
                className="rounded-lg border border-slate-200 bg-white p-5 text-left transition hover:border-emerald-300 hover:bg-[#2E7D5B]/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShieldCheck className="text-emerald-700" />
                <span className="mt-4 block text-lg font-medium text-slate-950">Verify Face</span>
                <span className="mt-2 block text-sm leading-6 text-slate-500">Confirm identity before exam access.</span>
              </button>
            </div>

            {!modelsLoaded && (
              <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
                <Loader2 className="animate-spin" size={18} />
                {modelError || "Loading face AI models..."}
              </div>
            )}
          </div>
        ) : mode === "register" ? (
          <div className="space-y-4">
            {!regLoading ? (
              <>
                <InputField label="Student ID" value={regStudentID} onChange={setRegStudentID} placeholder="e.g., CSE001" />
                <InputField label="Full Name" value={regStudentName} onChange={setRegStudentName} placeholder="e.g., Aarav Sharma" />
                <button
                  onClick={startRegistration}
                  className="w-full rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256A4E]"
                >
                  Start Camera Registration
                </button>
              </>
            ) : (
              <CameraPanel webcamRef={webcamRef} />
            )}
            <ResultPanel message={regResult} />
            {regAttemptStarted && <LivenessGrid checks={regLivenessChecks} />}
          </div>
        ) : (
          <div className="space-y-4">
            {!foundStudent ? (
              <>
                <InputField label="Student ID" value={verifyStudentID} onChange={setVerifyStudentID} placeholder="e.g., CSE001" />
                <button
                  onClick={checkStudentExists}
                  disabled={!modelsLoaded}
                  className="w-full rounded-full bg-[#2E7D5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#256A4E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Start Verification
                </button>
              </>
            ) : (
              <>
                <CameraPanel webcamRef={webcamRef} />
                <LivenessGrid checks={verifyLivenessChecks} />
                {!verifyLoading && (
                  <button
                    onClick={() => {
                      setFoundStudent(null);
                      setVerifyResult("");
                      setVerifyStatus(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Verify another student
                  </button>
                )}
              </>
            )}
            <ResultPanel message={verifyResult} status={verifyStatus} />
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <SectionTitle title="Verification Guide" action={<StatusPill value={modelsLoaded ? "Cleared" : "Monitoring"} />} />
        <div className="space-y-4">
          <GuideItem icon={Camera} title="Camera access" text="Allow camera permission in the browser when prompted." />
          <GuideItem icon={CheckCircle2} title="Liveness actions" text="Blink once, smile, and turn your head slightly to complete the anti-spoofing check." />
          <GuideItem icon={ShieldCheck} title="Local demo storage" text="Student face profiles are stored in this browser's localStorage for the hackathon demo." />
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
              <span>Model readiness</span>
              <span>{modelsLoaded ? "100%" : "Loading"}</span>
            </div>
            <ProgressBar value={modelsLoaded ? 100 : 45} tone={modelsLoaded ? "green" : "amber"} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
      />
    </label>
  );
}

function CameraPanel({ webcamRef }: { webcamRef: React.RefObject<Webcam | null> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" mirrored className="aspect-video w-full object-cover" />
    </div>
  );
}

function ResultPanel({ message, status }: { message: string; status?: VerificationStatus }) {
  if (!message) {
    return null;
  }

  const statusClass =
    status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : status === "error"
        ? "border-rose-200 bg-rose-50 text-rose-800"
        : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <div className={`whitespace-pre-wrap rounded-lg border p-4 text-sm font-medium leading-7 ${statusClass}`}>
      {message}
    </div>
  );
}

function LivenessGrid({ checks }: { checks: LivenessChecks }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <LivenessItem label="Blink" complete={checks.blink} />
      <LivenessItem label="Smile" complete={checks.smile} icon={Smile} />
      <LivenessItem label="Turn Head" complete={checks.headTurn} />
    </div>
  );
}

function LivenessItem({
  label,
  complete,
  icon: Icon = CheckCircle2,
}: {
  label: string;
  complete: boolean;
  icon?: typeof CheckCircle2;
}) {
  return (
    <div
      className={`rounded-lg border p-3 text-center text-sm font-semibold ${
        complete ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      <Icon className="mx-auto mb-2" size={18} />
      {label}
    </div>
  );
}

function GuideItem({ icon: Icon, title, text }: { icon: typeof Camera; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <Icon className="text-emerald-700" />
      <h3 className="mt-3 text-lg font-medium text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
