import { StudentPortal } from "@/components/student-portal";
import { getStudentPortalData } from "@/lib/student-portal-store";

export default function StudentDashboard() {
  return <StudentPortal initialData={getStudentPortalData()} />;
}
