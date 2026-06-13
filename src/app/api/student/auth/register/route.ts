import { NextResponse } from "next/server";
import { createStudentAccount } from "@/lib/student-portal-store";
import type { StudentSignupInput } from "@/lib/student-portal-types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<StudentSignupInput>;

  if (
    !body.fullName?.trim() ||
    !body.registrationNumber?.trim() ||
    !body.email?.trim() ||
    !body.mobile?.trim() ||
    !body.dob?.trim() ||
    !body.password?.trim() ||
    !body.confirmPassword?.trim() ||
    !body.captcha?.trim()
  ) {
    return NextResponse.json({ error: "All signup fields are required." }, { status: 400 });
  }

  if (body.password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  try {
    const account = createStudentAccount({
      fullName: body.fullName,
      registrationNumber: body.registrationNumber,
      email: body.email,
      mobile: body.mobile,
      dob: body.dob,
      password: body.password,
      confirmPassword: body.confirmPassword,
      captcha: body.captcha,
      institution: body.institution,
      examName: body.examName,
    });

    return NextResponse.json({ account, message: "Account created. Please login to continue." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Signup failed." }, { status: 400 });
  }
}
