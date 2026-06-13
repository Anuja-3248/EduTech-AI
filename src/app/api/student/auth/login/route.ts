import { NextResponse } from "next/server";
import { loginStudentAccount } from "@/lib/student-portal-store";
import type { StudentLoginInput } from "@/lib/student-portal-types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<StudentLoginInput>;

  if (!body.registrationNumber?.trim() || !body.password?.trim()) {
    return NextResponse.json({ error: "Registration number and password are required." }, { status: 400 });
  }

  try {
    const account = loginStudentAccount({
      registrationNumber: body.registrationNumber,
      password: body.password,
    });

    return NextResponse.json({ account, next: "/face-verification?next=/student" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed." }, { status: 401 });
  }
}
