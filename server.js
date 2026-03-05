// ─────────────────────────────────────────────────────────────────
//  server.js  —  CareerHub Backend  (Node + Express + Supabase)
//
//  INSTALL:  npm install express cors @supabase/supabase-js dotenv
//  RUN:      node server.js
//
//  ⚠️  Your package.json MUST have:  "type": "module"
// ─────────────────────────────────────────────────────────────────

import express  from "express";
import cors     from "cors";
import dotenv   from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import nodemailer from "nodemailer";

dotenv.config();

// ── Validate env ──────────────────────────────────────────────────
const { SUPABASE_URL, SUPABASE_ANON_KEY, PORT = 5000 } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("\n❌  Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env\n");
  process.exit(1);
}

// ── Supabase ──────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// optional SMTP transporter (used if Resend fails or not configured)
const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

// If the anon key looks like a placeholder or is missing, enable a local mock mode
const useMock = !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.toString().toUpperCase().includes("YOUR_") || SUPABASE_ANON_KEY === "YOUR_NEW_SUPABASE_KEY";

// Simple in-memory mock data for development when Supabase isn't configured
const MOCK_JOBS = [
  { id: 1, title: "Junior Backend Analyst", company: "Acme Labs", category: "Backend Analyst", type: "Full-time", location: "Remote", salary: "₹25k", is_active: true, created_at: new Date().toISOString() },
  { id: 2, title: "Game Designer", company: "PixelWorks", category: "Game Design", type: "Part-time", location: "Bangalore", salary: "₹18k", is_active: true, created_at: new Date().toISOString() },
  { id: 3, title: "Full Stack Developer", company: "StackHero", category: "Full Stack Developer", type: "Full-time", location: "Mumbai", salary: "₹45k", is_active: true, created_at: new Date().toISOString() },
];

const MOCK_APPLICATIONS = [];

// ── Express ───────────────────────────────────────────────────────
const app = express();

// Allow ANY localhost port (dev) + production URL from .env
app.use(cors({
  origin: (origin, cb) => {
    if (!origin)                                           return cb(null, true); // Postman / curl
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true); // any local port
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

// ── Helpers ───────────────────────────────────────────────────────
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const require_fields = (fields) => (req, res, next) => {
  const missing = fields.filter(f => !req.body[f]);
  if (missing.length)
    return res.status(400).json({ error: `Missing: ${missing.join(", ")}` });
  next();
};

// ── Email helper (using Resend service) ─────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY || "");
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "sahoodipanjali765@gmail.com";

async function sendContactEmail({ name, email, message }) {
  console.log("sendContactEmail called; RESEND_API_KEY present?", !!process.env.RESEND_API_KEY);

  // try Resend first if available
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "no-reply@example.com",
        to: CONTACT_EMAIL,
        subject: "New contact request",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });
      console.log("Resend email sent successfully");
      return;
    } catch (err) {
      console.error("Resend send error", err);
      // fall through to SMTP if configured
    }
  }

  // fallback to SMTP if credentials present
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      await smtpTransport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: CONTACT_EMAIL,
        subject: "New contact request",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });
      console.log("SMTP email sent successfully");
      return;
    } catch (err) {
      console.error("SMTP send error", err);
    }
  }

  // if neither service worked, log mock
  console.log("[mock email]", { name, email, message });
}


// ── ROUTES ────────────────────────────────────────────────────────

// GET /api/jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const { category, search, type, location } = req.query;

    if (useMock) {
      let data = MOCK_JOBS.filter(j => j.is_active);
      if (category && category !== "All") data = data.filter(d => d.category === category);
      if (type) data = data.filter(d => d.type === type);
      if (location) data = data.filter(d => d.location.toLowerCase().includes(String(location).toLowerCase()));
      if (search) {
        const s = String(search).toLowerCase();
        data = data.filter(d => d.title.toLowerCase().includes(s) || d.company.toLowerCase().includes(s) || d.location.toLowerCase().includes(s));
      }
      return res.json({ success: true, count: data.length, jobs: data });
    }

    let q = supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (category && category !== "All") q = q.eq("category", category);
    if (type)     q = q.eq("type", type);
    if (location) q = q.ilike("location", `%${location}%`);
    if (search)   q = q.or(`title.ilike.%${search}%,company.ilike.%${search}%,location.ilike.%${search}%`);

    const { data, error } = await q;
    if (error) throw error;

    res.json({ success: true, count: data.length, jobs: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/:id
app.get("/api/jobs/:id", async (req, res) => {
  try {
    if (useMock) {
      const job = MOCK_JOBS.find(j => String(j.id) === String(req.params.id));
      if (!job) return res.status(404).json({ error: "Job not found" });
      return res.json({ success: true, job });
    }

    const { data, error } = await supabase
      .from("jobs").select("*").eq("id", req.params.id).single();
    if (error || !data) return res.status(404).json({ error: "Job not found" });
    res.json({ success: true, job: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/categories
app.get("/api/categories", async (req, res) => {
  try {

    if (useMock) {
      const counts = {};
      MOCK_JOBS.forEach(({ category }) => { counts[category] = (counts[category] || 0) + 1; });
      return res.json({
        success: true,
        categories: [ { name: "All", count: MOCK_JOBS.length }, ...Object.entries(counts).map(([name, count]) => ({ name, count })) ],
      });
    }

    const { data, error } = await supabase
      .from("jobs").select("category").eq("is_active", true);
    if (error) throw error;

    const counts = {};
    data.forEach(({ category }) => { counts[category] = (counts[category] || 0) + 1; });

    res.json({
      success: true,
      categories: [
        { name: "All", count: data.length },
        ...Object.entries(counts).map(([name, count]) => ({ name, count })),
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/apply
app.post("/api/apply", require_fields(["name", "email", "jobId"]), async (req, res) => {
  try {
    const { name, email, phone, coverLetter, jobId } = req.body;

    if (!emailRx.test(email))
      return res.status(400).json({ error: "Invalid email address" });

    if (useMock) {
      const job = MOCK_JOBS.find(j => String(j.id) === String(jobId));
      if (!job) return res.status(404).json({ error: "Job not found" });
      const id = MOCK_APPLICATIONS.length + 1;
      MOCK_APPLICATIONS.push({ id, job_id: jobId, name, email, phone: phone || null, cover_letter: coverLetter || null, applied_at: new Date().toISOString() });
      console.log(`(mock) ✅  ${id}  ${name}  →  ${job.title} @ ${job.company}`);
      return res.status(201).json({ success: true, message: "Application submitted (mock)", applicationId: id });
    }

    const { data: job } = await supabase
      .from("jobs").select("id, title, company").eq("id", jobId).single();
    if (!job) return res.status(404).json({ error: "Job not found" });

    const { data, error } = await supabase
      .from("applications")
      .insert([{ job_id: parseInt(jobId), name, email, phone: phone || null, cover_letter: coverLetter || null }])
      .select().single();

    if (error) {
      if (error.code === "23505")
        return res.status(409).json({ error: "You already applied for this position." });
      throw error;
    }

    console.log(`✅  ${data.id}  ${name}  →  ${job.title} @ ${job.company}`);
    res.status(201).json({ success: true, message: "Application submitted!", applicationId: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contact  (site-wide contact form)
app.post("/api/contact", require_fields(["name", "email", "message"]), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!emailRx.test(email))
      return res.status(400).json({ error: "Invalid email address" });

    // Always try to send the email; sendContactEmail handles missing API key by logging.
    await sendContactEmail({ name, email, message });

    // mimic old behavior when supabase is missing
    if (useMock) {
      console.log("[mock contact]", { name, email, message });
    }

    res.status(201).json({ success: true, message: "Message sent! We'll be in touch." });
  } catch (err) {
    console.error("contact error", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/subscribe
app.post("/api/subscribe", require_fields(["email"]), async (req, res) => {
  try {
    const { email } = req.body;
    if (!emailRx.test(email))
      return res.status(400).json({ error: "Invalid email address" });

    if (useMock) {
      // noop mock subscribe
      return res.status(201).json({ success: true, message: "Subscribed (mock)! You'll get the latest job alerts." });
    }

    const { error } = await supabase.from("subscribers").insert([{ email }]);
    if (error) {
      if (error.code === "23505")
        return res.status(409).json({ error: "Already subscribed." });
      throw error;
    }

    res.status(201).json({ success: true, message: "Subscribed! You'll get the latest job alerts." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats
app.get("/api/stats", async (req, res) => {
  try {
    if (useMock) {
      return res.json({ success: true, stats: { totalJobs: MOCK_JOBS.length, totalApplications: MOCK_APPLICATIONS.length, totalSubscribers: 0 } });
    }

    const [j, a, s] = await Promise.all([
      supabase.from("jobs").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("applications").select("id", { count: "exact", head: true }),
      supabase.from("subscribers").select("id", { count: "exact", head: true }),
    ]);
    res.json({ success: true, stats: { totalJobs: j.count || 0, totalApplications: a.count || 0, totalSubscribers: s.count || 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/applications  (admin)
app.get("/api/applications", async (req, res) => {
  try {
    if (useMock) {
      const apps = MOCK_APPLICATIONS.map(a => ({ ...a, jobs: MOCK_JOBS.find(j => String(j.id) === String(a.job_id)) }));
      return res.json({ success: true, count: apps.length, applications: apps });
    }

    const { data, error } = await supabase
      .from("applications")
      .select("*, jobs(title, company)")
      .order("applied_at", { ascending: false });
    if (error) throw error;
    res.json({ success: true, count: data.length, applications: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── 404 + error handlers ──────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, _req, res, _next) => res.status(500).json({ error: err.message }));

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
🚀  CareerHub API  →  http://localhost:${PORT}
✅  CORS: all localhost ports allowed
✅  Supabase connected

   GET  /api/jobs
   GET  /api/jobs/:id
   GET  /api/categories
   POST /api/apply
   POST /api/subscribe
   GET  /api/stats
   GET  /api/applications
`);
});