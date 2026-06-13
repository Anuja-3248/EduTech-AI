import { NextResponse } from "next/server";
import { createStudentComplaint } from "@/lib/student-portal-store";
import type { CreateComplaintInput } from "@/lib/student-portal-types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CreateComplaintInput>;

  if (!body.issue?.trim() || !body.exam?.trim() || !body.description?.trim()) {
    return NextResponse.json({ error: "Issue, exam, and description are required." }, { status: 400 });
  }

  const complaint = createStudentComplaint({
    issue: body.issue,
    exam: body.exam,
    description: body.description,
  });

  return NextResponse.json(complaint, { status: 201 });
}
