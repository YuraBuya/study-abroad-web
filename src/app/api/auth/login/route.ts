import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set({
    name: "adminAuth",
    value: "true",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",       // ensure visible to /api/*
    maxAge: 60 * 60 * 8, // 8h
  });
  return res;
}