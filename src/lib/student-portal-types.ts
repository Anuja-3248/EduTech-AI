export type ExamStatus = "Registered" | "Not Registered";
export type ComplaintStatus = "Under Review" | "Resolved";

export type StudentProfile = {
  name: string;
  initials: string;
  verificationId: string;
  dob: string;
  governmentId: string;
  email: string;
  phone: string;
  photoStatus: string;
  profileStatus: string;
};

export type StudentExam = {
  id: string;
  name: string;
  status: ExamStatus;
  date: string;
  reporting: string;
  center: string;
  eligibility: string;
};

export type StudentNotification = {
  id: string;
  title: string;
  time: string;
  tone: string;
};

export type StudentComplaint = {
  id: string;
  issue: string;
  exam: string;
  description: string;
  status: ComplaintStatus;
};

export type ReadinessItem = {
  label: string;
  complete: boolean;
};

export type StudentPortalData = {
  profile: StudentProfile;
  nextExam: {
    name: string;
    daysRemaining: number;
    hoursRemaining: number;
  };
  readiness: {
    score: number;
    items: ReadinessItem[];
  };
  verification: {
    identityStatus: string;
    examEligibility: string;
    uploadedPhoto: string;
    idProof: string;
    duplicateCheck: string;
  };
  exams: StudentExam[];
  notifications: StudentNotification[];
  complaints: StudentComplaint[];
  settings: {
    smsAlerts: string;
    emailNotifications: string;
    language: string;
    dataSharing: string;
  };
};

export type CreateComplaintInput = {
  issue: string;
  exam: string;
  description: string;
};

export type StudentAccount = {
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  registrationNumber: string;
  password: string;
  institution?: string;
  examName?: string;
  createdAt: string;
};

export type StudentSignupInput = {
  fullName: string;
  registrationNumber: string;
  email: string;
  mobile: string;
  dob: string;
  password: string;
  confirmPassword: string;
  captcha: string;
  institution?: string;
  examName?: string;
};

export type StudentLoginInput = {
  registrationNumber: string;
  password: string;
};
