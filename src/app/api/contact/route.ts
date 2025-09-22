import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// type Payload = {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// };
// Payload type is no longer used directly since we're using readString helper

// simple in-memory rate limit (per server instance)
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  if (rec.count > MAX_HITS) return true;
  return false;
}

// Helper function to get client IP
function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    if (rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again soon." },
        { status: 429 }
      );
    }

    type Json = Record<string, unknown>;

function readString(obj: Json, key: string): string {
  const v = obj[key];
  return typeof v === "string" ? v : "";
}

const body = (await req.json().catch(() => ({}))) as Json;
    const name = readString(body, "name").trim();
    const email = readString(body, "email").trim();
    const phone = readString(body, "phone").trim();
    const message = readString(body, "message").trim();

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.TO_EMAIL!;
    const site = process.env.SITE_NAME || "Website";

    const html = `
      <h2>New Inquiry from ${site}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;">${message}</pre>
    `;

    await transporter.sendMail({
      from: `"${site} Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `📩 ${site} Inquiry from ${name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("contact error:", err);
    const errorMessage = err instanceof Error ? err.message : "Email sending failed.";
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}