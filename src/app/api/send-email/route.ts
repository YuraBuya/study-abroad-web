import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Json = Record<string, unknown>;

function readString(obj: Json, key: string): string {
  const v = obj[key];
  return typeof v === "string" ? v : "";
}

export async function POST(req: NextRequest) {
  try {
    const isJson = (req.headers.get("content-type") ?? "").includes("application/json");
    const body = isJson ? ((await req.json().catch(() => ({}))) as Json) : ({} as Json);

    const name = readString(body, "name").trim();
    const email = readString(body, "email").trim();
    const phone = readString(body, "phone").trim();
    const message = readString(body, "message").trim();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ ok:false, error:"Missing required fields." }, { status:400 });
    }

    // SMTP 트랜스포터
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true", // 465:true, 587:false
      auth: { user: process.env.SMTP_USER, pass: process.env.SES_SMTP_PASS || process.env.SMTP_PASS },
    });

    // 연결 테스트(문제 있으면 바로 throw)
    await transporter.verify();

    const site = process.env.SITE_NAME || "CCAgency";
    const to = process.env.TO_EMAIL || "ccagency.mn@gmail.com";

    await transporter.sendMail({
      // Gmail 사용 시 from 은 SMTP_USER 와 동일 도메인/주소 권장
      from: `"${site} Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `📩 ${site} Inquiry from ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Message</b></p>
        <pre style="white-space:pre-wrap;">${message}</pre>
      `
    });

    return NextResponse.json({ ok:true });
  } catch (err: unknown) {
    console.error("send-email error:", err); // 서버 콘솔에서 실제 오류 원인 확인
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok:false, error: errorMessage }, { status:500 });
  }
}