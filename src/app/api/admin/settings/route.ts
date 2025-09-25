import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from 'fs';
import { join } from 'path';

const schema = z.object({
  agencyName: z.string().min(1),
  defaultLocale: z.string().min(2).max(5),
  supportEmail: z.string().email(),
  supportPhone: z.string().optional(),
  facebookUrl: z.string().url().optional(),
  consultationUrl: z.string().url().optional(),
});

// Path to the settings file
const SETTINGS_FILE = join(process.cwd(), 'data', 'settings.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Auth check function - check for admin cookie
function isAdminAuthenticated(request: NextRequest): boolean {
  const adminAuthCookie = request.cookies.get("adminAuth")?.value;
  return adminAuthCookie === "true";
}

export async function GET(request: NextRequest) {
  // Auth check
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure data directory exists
    await ensureDataDirectory();
    
    // Try to read settings file
    let settings = {
      agencyName: "",
      defaultLocale: "en",
      supportEmail: "",
      supportPhone: "",
      facebookUrl: "",
      consultationUrl: ""
    };
    
    try {
      const fileContent = await fs.readFile(SETTINGS_FILE, 'utf8');
      settings = { ...settings, ...JSON.parse(fileContent) };
    } catch {
      // If file doesn't exist or is invalid, use defaults
    }

    return NextResponse.json({ ok: true, settings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  // Auth check
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parse = schema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }

  const { agencyName, defaultLocale, supportEmail, supportPhone, facebookUrl, consultationUrl } = parse.data;

  try {
    // Ensure data directory exists
    await ensureDataDirectory();
    
    // Read existing settings
    let settings = {
      agencyName: "",
      defaultLocale: "en",
      supportEmail: "",
      supportPhone: "",
      facebookUrl: "",
      consultationUrl: ""
    };
    
    try {
      const fileContent = await fs.readFile(SETTINGS_FILE, 'utf8');
      settings = { ...settings, ...JSON.parse(fileContent) };
    } catch {
      // If file doesn't exist or is invalid, use defaults
    }
    
    // Update settings
    const updatedSettings = {
      ...settings,
      agencyName,
      defaultLocale,
      supportEmail,
      supportPhone,
      facebookUrl,
      consultationUrl
    };
    
    // Write updated settings to file
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    
    return NextResponse.json({ ok: true, settings: updatedSettings }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}