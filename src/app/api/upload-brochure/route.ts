export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const slug = String(form.get("slug") || "brochure"); // optional institute id

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file uploaded." }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ ok: false, error: "Only PDF is allowed." }, { status: 400 });
    }
    const max = 15 * 1024 * 1024;
    if (file.size > max) {
      return NextResponse.json({ ok: false, error: "File too large (max 15MB)." }, { status: 400 });
    }

    const baseDir = path.join(process.cwd(), "public", "uploads", "brochures");
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true });
    }

    const stamp = Date.now();
    // sanitize slug (letters, numbers, dash)
    const safe = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    const filename = `${safe || "brochure"}-${stamp}.pdf`;
    const outPath = path.join(baseDir, filename);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(outPath, buf);

    const url = `/uploads/brochures/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    console.error("upload-brochure error:", err);
    return NextResponse.json({ ok: false, error: "Upload failed." }, { status: 500 });
  }
}

