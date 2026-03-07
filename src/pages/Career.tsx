import { useState, useEffect } from "react";
import careerApi from "@/api/careerApi";
import styled from "styled-components";

// ─── Pattern Component ────────────────────────────────────────────────────────
const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;

  .grid-wrapper {
    min-height: 100%;
    width: 100%;
    position: relative;
    background-color: transparent;
  }
  .grid-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-image: linear-gradient(to right, #ffffff10 1px, transparent 1px),
      linear-gradient(to bottom, #ffffff10 1px, transparent 1px);
    background-size: 20px 30px;
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
    mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
  }
`;

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="grid-wrapper">
        <div className="grid-background" />
      </div>
    </StyledWrapper>
  );
};

// ─── Static Data ──────────────────────────────────────────────────────────────
const EXPLORE_CATEGORIES = [
  { label: "Game Design", icon: "🎮", count: 2 },
  { label: "Data Science", icon: "📊", count: 1 },
  { label: "Politician", icon: "🏛️", count: 1 },
  { label: "Backend Analyst", icon: "⚙️", count: 1 },
  { label: "Full Stack Developer", icon: "💻", count: 2 },
  { label: "UI/UX Designer", icon: "🎨", count: 1 },
  { label: "Fitness Trainer", icon: "💪", count: 1 },
  { label: "Personal Branding", icon: "✨", count: 1 },
];

const STATS = [
  { value: "20M+", label: "Users" },
  { value: "500K+", label: "Jobs" },
  { value: "100+", label: "Partners" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden pt-16">
      {/* Pattern */}
      <Pattern />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20 pb-10">
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-bounce">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          00+ new jobs added this week
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6">
          One Step Closer To
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mt-2">
            Your Dream Job
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Let us help you find a job that suits you the best. Thousands of opportunities waiting for you.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs">Scroll down</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
      </div>
    </section>
  );
}

function JobCard({ job, onApply }: any) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl group-hover:bg-red-600/10 transition-colors">
          {job.logo}
        </div>
        <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full">{job.type}</span>
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{job.title}</h3>
      <p className="text-gray-500 text-sm mb-3">{job.company} · {job.location}</p>
      <div className="flex items-center justify-between">
        <span className="text-red-400 font-semibold text-sm">{job.salary}</span>
        <span className="text-gray-600 text-xs">{job.posted || "Recently"}</span>
      </div>
      <button
        onClick={() => onApply(job)}
        className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-600/30"
      >
        Apply Now
      </button>
    </div>
  );
}

function JobsSection({ onApply, activeCategory, setActiveCategory }: any) {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    careerApi
      .getJobs({ category: activeCategory, search })
      .then((data: any) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
        setLoading(false);
      });
  }, [activeCategory, search]);

  useEffect(() => {
    careerApi
      .getCategories()
      .then((data: any) => {
        setCategories(data.categories || []);
      })
      .catch((err: any) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  const categoryNames = categories.map(cat => cat.name) || ["All", "Finance", "Development", "Marketing"];

  return (
    <section className="bg-gray-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm mb-2">Get the finest application set that you have always dreamed of</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Newest <span className="text-red-500">Jobs</span> For You
          </h2>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-5 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryNames.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-900 rounded-2xl p-5 animate-pulse h-52 border border-gray-800"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold">No jobs found</p>
            <p className="text-sm mt-1">Try different filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onApply={onApply} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await careerApi.subscribe(email);
      setStatus({ type: "success", message: res.message });
      setEmail("");
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <section className="bg-gray-950 py-20 px-4">
  //     <div className="max-w-7xl mx-auto">
  //       <div className="grid md:grid-cols-2 gap-12 items-center">
  //         <div className="relative hidden md:flex items-center justify-center">
  //           <div className="relative">
  //             <div className="w-64 h-96 bg-gray-900 rounded-[2.5rem] border border-gray-700 shadow-2xl flex flex-col items-center justify-center gap-4 p-6">
  //               <div className="w-full bg-gray-800 rounded-xl p-4">
  //                 <div className="text-white text-xs font-bold mb-2">📋 Job Name</div>
  //                 <div className="h-2 bg-gray-700 rounded w-3/4 mb-1"></div>
  //                 <div className="h-2 bg-gray-700 rounded w-1/2"></div>
  //                 <button className="mt-3 w-full bg-red-600 text-white text-xs font-bold py-2 rounded-lg">Apply</button>
  //               </div>
  //               <div className="w-full bg-gray-800 rounded-xl p-4">
  //                 <div className="text-white text-xs font-bold mb-2">📍 Job Match</div>
  //                 <div className="h-2 bg-gray-700 rounded w-full mb-1"></div>
  //                 <div className="h-2 bg-gray-700 rounded w-2/3"></div>
  //                 <button className="mt-3 w-full bg-red-600 text-white text-xs font-bold py-2 rounded-lg">View</button>
  //               </div>
  //             </div>
  //             <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">🔔</div>
  //           </div>
  //         </div>

  //         <div>
  //           <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
  //             Always Get The <span className="text-red-500">Latest</span> Information
  //           </h2>
  //           <p className="text-gray-400 text-base mb-8 leading-relaxed">
  //             One Universal Hub For News, Openings, Announcements And Career Opportunities. Be The First To Know When Roles That Match Your Skills And Ambitions Become Available.
  //           </p>

  //           <div className="flex flex-col sm:flex-row gap-3">
  //             <input
  //               type="email"
  //               placeholder="Enter your email address"
  //               value={email}
  //               onChange={e => setEmail(e.target.value)}
  //               onKeyDown={e => e.key === "Enter" && handleSubscribe()}
  //               className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-5 py-4 rounded-xl focus:outline-none focus:border-red-500 transition-all"
  //             />
  //             <button
  //               onClick={handleSubscribe}
  //               disabled={loading}
  //               className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-red-600/40 whitespace-nowrap"
  //             >
  //               {loading ? "..." : "Subscribe"}
  //             </button>
  //           </div>

  //           {status && (
  //             <div className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${status.type === "success" ? "bg-green-900/30 border border-green-700/50 text-green-400" : "bg-red-900/30 border border-red-700/50 text-red-400"}`}>
  //               {status.message}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}

function ApplyModal({ job, onClose }: any) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    const f = e.target.files && e.target.files[0];
    if (f) setResume(f);
  };

  const handleSubmit = async () => {
  if (!form.name || !form.email) {
    setStatus({ type: "error", message: "Please provide your name and email." });
    return;
  }
  if (!resume) {
    setStatus({ type: "error", message: "Please upload your resume." });
    return;
  }
    setLoading(true);
    setStatus(null);
    try {
      let res;
      if (resume) {
        const fd = new FormData();
        fd.append("jobId", String(job.id));
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("phone", form.phone || "");
        fd.append("coverLetter", form.coverLetter || "");
        fd.append("resume", resume, resume.name);
       res = await careerApi.applyJob(job.id, fd);
      } else {
        res = await careerApi.applyJob(job.id, form);
      }

      
      if (res && res.error === "already_applied") {
        setStatus({ type: "error", message: "⚠️ You have already applied for this position!" });
        setLoading(false);
        return;
      }
      setStatus({ type: "success", message: res && res.message ? res.message : "Application submitted!" });
      setTimeout(() => onClose(), 2000);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to submit application" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-black text-xl">{job.title}</h3>
            <p className="text-gray-500 text-sm">{job.company}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors text-xl">×</button>
        </div>

        <div className="space-y-4">
          <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-all" />
          <input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-all" />
          <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-all" />
          <textarea placeholder="Cover Letter (optional)" value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} rows={4} className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 transition-all resize-none" />
          <div>
<label className="text-sm text-gray-300 mb-2 block">Upload Resume (PDF/DOC) <span className="text-red-500">*</span></label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="text-sm text-gray-400" />
            {resume && <div className="mt-2 text-xs text-gray-400">Selected: {resume.name}</div>}
          </div>
        </div>

        {status && (
          <div className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${status.type === "success" ? "bg-green-900/30 border border-green-700/50 text-green-400" : "bg-red-900/30 border border-red-700/50 text-red-400"}`}>
            {status.message}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} className="mt-6 w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-red-600/40">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Career Page ─────────────────────────────────────────────────────────
export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <HeroSection />
      <JobsSection onApply={setSelectedJob} activeCategory={filterCategory} setActiveCategory={setFilterCategory} />
      {/* <SubscribeSection /> */}
      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}