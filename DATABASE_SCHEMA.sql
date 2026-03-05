-- ============================================================
--  CareerHub — Supabase Database Schema
--  Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. JOBS TABLE
create table if not exists jobs (
  id          bigint generated always as identity primary key,
  title       text not null,
  company     text not null,
  location    text not null,
  type        text not null check (type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  category    text not null,
  salary      text,
  description text,
  requirements text[],   -- array of strings
  logo        text,      -- emoji or image URL
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- 2. APPLICATIONS TABLE
create table if not exists applications (
  id            text primary key default ('APP-' || extract(epoch from now())::bigint || floor(random()*1000)::int),
  job_id        bigint references jobs(id) on delete cascade,
  name          text not null,
  email         text not null,
  phone         text,
  cover_letter  text,
  status        text not null default 'pending' check (status in ('pending', 'reviewed', 'shortlisted', 'rejected')),
  applied_at    timestamptz default now(),
  unique(email, job_id)   -- prevent duplicate applications
);

-- 3. SUBSCRIBERS TABLE
create table if not exists subscribers (
  id         bigint generated always as identity primary key,
  email      text unique not null,
  subscribed_at timestamptz default now()
);

-- ============================================================
--  SEED DATA — Sample Jobs
-- ============================================================
insert into jobs (title, company, location, type, category, salary, description, requirements, logo) values
  ('UX Designer',      'Adobe Systems',  'San Francisco', 'Full-time', 'Development', '$90K–$120K', 'Join our design team to create stunning user experiences.', array['Figma','3+ years experience','Portfolio required'], '🎨'),
  ('UX Designer',      'Meta Platforms', 'Remote',        'Contract',  'Development', '$80K–$110K', 'Design the future of social media at Meta.',              array['React','Design Systems','2+ years experience'],  '📘'),
  ('Job Agency Lead',  'Startup Hub',    'New York',      'Full-time', 'Finance',     '$70K–$95K',  'Help build the startup ecosystem in NYC.',                array['Finance background','Networking skills'],         '🏢'),
  ('Marketing Lead',   'BrandCo',        'Chicago',       'Full-time', 'Marketing',   '$75K–$100K', 'Lead our marketing strategy and brand identity.',         array['SEO/SEM','5+ years experience','Leadership'],     '📣'),
  ('Data Analyst',     'FinTech Corp',   'Austin',        'Full-time', 'Finance',     '$85K–$115K', 'Analyze financial data to drive business decisions.',     array['Python','SQL','Tableau'],                        '📈'),
  ('React Developer',  'WebLabs',        'Remote',        'Contract',  'Development', '$95K–$130K', 'Build high-performance React applications.',              array['React','TypeScript','Node.js'],                  '⚛️'),
  ('Content Writer',   'MediaHouse',     'Los Angeles',   'Part-time', 'Marketing',   '$40K–$60K',  'Create engaging content for our digital platforms.',      array['SEO writing','2+ years','Portfolio'],            '✍️'),
  ('DevOps Engineer',  'CloudStack',     'Seattle',       'Full-time', 'Development', '$110K–$140K','Manage cloud infrastructure and CI/CD pipelines.',       array['AWS','Docker','Kubernetes'],                     '☁️');

-- ============================================================
--  ROW LEVEL SECURITY (RLS) — Optional but Recommended
-- ============================================================
-- Allow anyone to READ jobs (public)
alter table jobs enable row level security;
create policy "Jobs are publicly readable" on jobs for select using (is_active = true);

-- Allow anyone to INSERT applications
alter table applications enable row level security;
create policy "Anyone can apply" on applications for insert with check (true);

-- Allow anyone to subscribe
alter table subscribers enable row level security;
create policy "Anyone can subscribe" on subscribers for insert with check (true);

-- ============================================================
--  DONE! Copy your Supabase URL and anon key from:
--  Supabase Dashboard → Settings → API
-- ============================================================
