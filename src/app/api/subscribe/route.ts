import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

// Simple in-memory rate limit: max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]");
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email, corridor } = await request.json();

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Basic bot check: reject if email has suspicious patterns
    if (/\+.*\+|\.\./.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const subscribers = JSON.parse(raw);

    // Dedup
    if (subscribers.some((s: { email: string }) => s.email === cleanEmail)) {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }

    subscribers.push({
      email: cleanEmail,
      corridor: corridor || "all",
      timestamp: new Date().toISOString(),
      ip: ip.split(",")[0].trim(),
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
