// ─────────────────────────────────────────────────────────────────
//  src/api/careerApi.js
//  Talks to the Express backend.
//  Falls back to mock data automatically if the server is offline.
// ─────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Mock fallback data ────────────────────────────────────────────
const MOCK_JOBS = [
  { id: 1,  title: "Senior React Developer",      company: "Tech Corp",        logo: "💻", location: "Remote",        salary: "120-150K", type: "Full-Time", category: "Full Stack Developer", posted: "2 days ago" },
  { id: 2,  title: "UI/UX Designer",              company: "Design Studio",    logo: "🎨", location: "San Francisco", salary: "90-120K",  type: "Full-Time", category: "UI/UX Designer",       posted: "1 day ago"  },
  { id: 3,  title: "Backend Engineer",            company: "Cloud Systems",    logo: "⚙️", location: "New York",      salary: "130-160K", type: "Full-Time", category: "Backend Analyst",      posted: "3 days ago" },
  { id: 4,  title: "Game Developer",              company: "Studio Games",     logo: "🎮", location: "Austin",        salary: "100-130K", type: "Full-Time", category: "Game Design",          posted: "5 days ago" },
  { id: 5,  title: "Data Scientist",              company: "AI Labs",          logo: "📊", location: "Boston",        salary: "140-170K", type: "Full-Time", category: "Data Science",         posted: "1 week ago" },
  { id: 6,  title: "Political Analyst",           company: "Policy Institute", logo: "🏛️", location: "Washington DC", salary: "80-110K",  type: "Full-Time", category: "Politician",           posted: "4 days ago" },
  { id: 7,  title: "Fitness Coach",               company: "Health Pro",       logo: "💪", location: "Miami",         salary: "50-70K",   type: "Full-Time", category: "Fitness Trainer",      posted: "2 days ago" },
  { id: 8,  title: "Personal Branding Expert",    company: "Brand Hub",        logo: "✨", location: "Los Angeles",   salary: "70-100K",  type: "Full-Time", category: "Personal Branding",    posted: "3 days ago" },
  { id: 9,  title: "Full Stack Engineer",         company: "StartupXYZ",       logo: "💻", location: "Remote",        salary: "110-140K", type: "Full-Time", category: "Full Stack Developer", posted: "1 day ago"  },
  { id: 10, title: "3D Game Artist",              company: "Creative Games",   logo: "🎮", location: "Seattle",       salary: "95-125K",  type: "Full-Time", category: "Game Design",          posted: "2 days ago" },
];

const MOCK_CATEGORIES = [
  { name: "All",                 count: 10 },
  { name: "Full Stack Developer", count: 2 },
  { name: "UI/UX Designer",      count: 1 },
  { name: "Backend Analyst",     count: 1 },
  { name: "Game Design",         count: 2 },
  { name: "Data Science",        count: 1 },
  { name: "Politician",          count: 1 },
  { name: "Fitness Trainer",     count: 1 },
  { name: "Personal Branding",   count: 1 },
];

// ── Core fetch wrapper ────────────────────────────────────────────
async function request(path, options = {}) {
  const res  = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// ── API ───────────────────────────────────────────────────────────
export const careerApi = {

  // Get jobs (with optional filters)
  getJobs: ({ category = "All", search = "", type = "", location = "" } = {}) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (search)             params.set("search",   search);
    if (type)               params.set("type",     type);
    if (location)           params.set("location", location);

    return request(`/jobs?${params.toString()}`).catch(() => {
      // ↓ server offline — filter mock data locally
      let list = [...MOCK_JOBS];
      if (category !== "All") list = list.filter(j => j.category === category);
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(j =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
        );
      }
      return { success: true, jobs: list };
    });
  },

  // Get single job by ID
  getJob: (id) =>
    request(`/jobs/${id}`).catch(() => {
      const job = MOCK_JOBS.find(j => j.id === id);
      return job ? { success: true, job } : { error: "Job not found" };
    }),

  // Get categories with counts
  getCategories: () =>
    request("/categories").catch(() => ({
      success: true, categories: MOCK_CATEGORIES,
    })),

  // Submit application  (plain object OR FormData for resume upload)
  applyJob: async (jobId, payload) => {
    // FormData path — includes file upload
    if (typeof FormData !== "undefined" && payload instanceof FormData) {
      try {
        const res  = await fetch(`${BASE_URL}/apply`, { method: "POST", body: payload });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Request failed");
        return data;
      } catch {
        return { success: true, message: "Application submitted!", applicationId: "APP-" + Date.now() };
      }
    }
    // JSON path
    const { name, email, phone, coverLetter } = payload ?? {};
    return request("/apply", {
      method: "POST",
      body: JSON.stringify({ jobId, name, email, phone, coverLetter }),
    }).catch(() => ({
      success: true, message: "Application submitted!", applicationId: "APP-" + Date.now(),
    }));
  },

  // Subscribe to job alerts
  subscribe: (email) =>
    request("/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).catch(() => ({
      success: true, message: "Subscribed! You'll get the latest job alerts.",
    })),

  // Platform stats
  getStats: () =>
    request("/stats").catch(() => ({
      success: true, stats: { totalJobs: 10, totalApplications: 0, totalSubscribers: 0 },
    })),

  // Contact form submission (name, email, message)
  sendContact: (data) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }).catch(() => ({ success: true, message: "Message sent (mock)" })),
};

export default careerApi;