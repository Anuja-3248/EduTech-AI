import type {
  CreateComplaintInput,
  StudentAccount,
  StudentComplaint,
  StudentLoginInput,
  StudentPortalData,
  StudentSignupInput,
} from "@/lib/student-portal-types";

export const STUDENT_CAPTCHA_ANSWER = "12";

let studentAccounts: StudentAccount[] = [
  {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    mobile: "+91 98XXXXXX32",
    dob: "2008-08-12",
    registrationNumber: "EDU12345",
    password: "student123",
    institution: "ABC Junior College, Pune",
    examName: "NEET 2025",
    createdAt: new Date("2026-02-01").toISOString(),
  },
];

let portalData: StudentPortalData = {
  profile: {
    name: "Aarav Sharma",
    initials: "AS",
    verificationId: "EDU12345",
    dob: "12 Aug 2008",
    governmentId: "XXXX-XXXX-4832",
    email: "aarav.sharma@example.com",
    phone: "+91 98XXXXXX32",
    photoStatus: "Uploaded",
    profileStatus: "Complete",
  },
  nextExam: {
    name: "NEET 2025",
    daysRemaining: 18,
    hoursRemaining: 4,
  },
  readiness: {
    score: 92,
    items: [
      { label: "Identity Verified", complete: true },
      { label: "Admit Card Downloaded", complete: true },
      { label: "Face Scan Completed", complete: true },
      { label: "Mock System Check Pending", complete: false },
    ],
  },
  verification: {
    identityStatus: "Verified",
    examEligibility: "Approved",
    uploadedPhoto: "Matched with live selfie",
    idProof: "Government ID verified",
    duplicateCheck: "No duplicate found",
  },
  exams: [
    {
      id: "mht-cet-2027",
      name: "MHT-CET 2027",
      status: "Registered",
      date: "15 May 2027",
      reporting: "8:00 AM",
      center: "ABC College, Shivajinagar, Pune",
      eligibility: "Approved",
    },
    {
      id: "neet-ug-2027",
      name: "NEET UG 2027",
      status: "Registered",
      date: "4 June 2027",
      reporting: "7:30 AM",
      center: "National Public School, Pune",
      eligibility: "Approved",
    },
    {
      id: "upsc-prelims-2027",
      name: "UPSC Prelims 2027",
      status: "Not Registered",
      date: "-",
      reporting: "-",
      center: "Register on official UPSC portal",
      eligibility: "-",
    },
  ],
  notifications: [
    { id: "not-101", title: "Identity verification approved", time: "Today, 9:15 AM", tone: "Cleared" },
    { id: "not-102", title: "MHT-CET center details released", time: "Yesterday, 6:20 PM", tone: "Monitoring" },
    { id: "not-103", title: "Carry original government ID on exam day", time: "12 Feb, 11:00 AM", tone: "Medium" },
  ],
  complaints: [
    {
      id: "CMP101",
      issue: "Center seating issue",
      exam: "MHT-CET 2027",
      description: "Desk allocation was not visible on the notice board.",
      status: "Under Review",
    },
    {
      id: "CMP102",
      issue: "Name spelling correction",
      exam: "NEET UG 2027",
      description: "Requested minor spelling correction before admit card release.",
      status: "Resolved",
    },
  ],
  settings: {
    smsAlerts: "Enabled",
    emailNotifications: "Enabled",
    language: "English",
    dataSharing: "Exam authorities only",
  },
};

export function getStudentPortalData() {
  return portalData;
}

export function createStudentComplaint(input: CreateComplaintInput): StudentComplaint {
  const nextNumber = portalData.complaints.length + 101;
  const complaint: StudentComplaint = {
    id: `CMP${nextNumber}`,
    issue: input.issue.trim(),
    exam: input.exam.trim(),
    description: input.description.trim(),
    status: "Under Review",
  };

  portalData = {
    ...portalData,
    complaints: [complaint, ...portalData.complaints],
    notifications: [
      {
        id: `not-${Date.now()}`,
        title: `Complaint ${complaint.id} submitted`,
        time: "Just now",
        tone: "Review",
      },
      ...portalData.notifications,
    ],
  };

  return complaint;
}

export function createStudentAccount(input: StudentSignupInput): Omit<StudentAccount, "password"> {
  if (input.captcha.trim() !== STUDENT_CAPTCHA_ANSWER) {
    throw new Error("Captcha answer is incorrect.");
  }

  if (input.password !== input.confirmPassword) {
    throw new Error("Password and confirm password do not match.");
  }

  const normalizedRegistrationNumber = input.registrationNumber.trim().toUpperCase();
  const normalizedEmail = input.email.trim().toLowerCase();
  const exists = studentAccounts.some(
    (account) => account.registrationNumber === normalizedRegistrationNumber || account.email.toLowerCase() === normalizedEmail,
  );

  if (exists) {
    throw new Error("An account already exists for this email or student ID.");
  }

  const account: StudentAccount = {
    fullName: input.fullName.trim(),
    email: normalizedEmail,
    mobile: input.mobile.trim(),
    dob: input.dob,
    registrationNumber: normalizedRegistrationNumber,
    password: input.password,
    institution: input.institution?.trim(),
    examName: input.examName?.trim(),
    createdAt: new Date().toISOString(),
  };

  studentAccounts = [account, ...studentAccounts];

  return sanitizeAccount(account);
}

export function loginStudentAccount(input: StudentLoginInput): Omit<StudentAccount, "password"> {
  const account = studentAccounts.find(
    (student) => student.registrationNumber === input.registrationNumber.trim().toUpperCase() && student.password === input.password,
  );

  if (!account) {
    throw new Error("Invalid registration number or password.");
  }

  return sanitizeAccount(account);
}

function sanitizeAccount(account: StudentAccount): Omit<StudentAccount, "password"> {
  return {
    fullName: account.fullName,
    email: account.email,
    mobile: account.mobile,
    dob: account.dob,
    registrationNumber: account.registrationNumber,
    institution: account.institution,
    examName: account.examName,
    createdAt: account.createdAt,
  };
}
