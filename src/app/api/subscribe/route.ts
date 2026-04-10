import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

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
    const { email, corridor } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const subscribers = JSON.parse(raw);

    // Dedup
    if (subscribers.some((s: { email: string }) => s.email === email)) {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }

    subscribers.push({
      email,
      corridor: corridor || "all",
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
