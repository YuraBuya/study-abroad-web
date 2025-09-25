import { cookies } from "next/headers";
export async function GET() {
  const authed = (await cookies()).get("adminAuth")?.value === "true";
  return new Response(JSON.stringify({ authed }), { status: 200 });
}