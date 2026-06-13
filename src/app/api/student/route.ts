import { NextResponse } from "next/server";
import { getStudentPortalData } from "@/lib/student-portal-store";

export async function GET() {
  return NextResponse.json(getStudentPortalData());
}
