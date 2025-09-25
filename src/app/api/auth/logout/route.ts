import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("adminAuth", "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}