# MoonAsterisk JobFair Vietnam - Project Structure

## Project Overview

**Goal**: Low-fidelity wireframe (desktop 1440px). Prioritize flow, layout, and information hierarchy. Use placeholders & labels, no real content. Include Loading, Empty, and Error states. Form registration/login (flow description only).

**Target Users**: 
- Students/early-career candidates
- Recruiters (HR/TA)

**Design Principles**: 
- Clear like TopCV
- Modern like jobfair.co
- Unique features: Job Fair & Audio Intro

---

## 1. Global & Navigation

### Header (Pre-login)
- Logo (click → Home, reset filter)
- Nav: Jobs, Companies, Fairs, Pricing, Blog, Sign in
- CTA: "Post a Job"

### Header (Post-login – Student)
- Logo
- Nav: Jobs, Saved, Applications, Fairs, Messages, Profile
- Notification badge

### Header (Post-login – Employer)
- Logo
- Nav: Dashboard, Jobs, Candidates, Campaigns, Fairs, Billing
- CTA: "Post a Job"

### Footer (All Pages)
- Quick links: About, Terms, Privacy
- Contact, Social media
- Mini-sitemap

### Global Search Bar
- Keyword + Location + Filter trigger

---

## 2. Pre-login Pages

### Home (Landing)

**Hero Section**
- Headline, subline
- 2 CTAs: "Create Free CV" & "Post a Job"

**Quick Search**
- Search box + industry chips (Data/AI, Frontend, Marketing, Finance, Internships)

**Job Highlights**
- 6 newest jobs → "View All Jobs"

**Top Companies**
- Logo carousel (Shopee, VinAI, Grab, MoMo, FPT, Viettel…)

**Upcoming Job Fairs**
- List of 3 upcoming events (time, location, registration status)

**Testimonials**
- 2–3 cards from candidates and companies

**Final CTA**
- "Register for Job Fair" + "Try Employer Free for 7 Days"

---

### Jobs (List)

**Filter Sidebar** (desktop) / Drawer (mobile)
- Keywords, Location, Salary range, Level
- Employment type (FT/PT/Intern)
- Mode (Onsite/Hybrid/Remote)
- Skills (tags), Company, Fair badge

**Result List**
- JobCard: Logo, Job Title, Company, Location, Salary, Tags, Posted time, ★ Save

**Sort Options**
- Newest | Salary (High→Low) | Relevance

**States**
- Loading: skeleton
- Empty: suggest removing filters
- Error: Retry option

---

### Job Detail

**Header**
- Job Title + ★ Save + Apply Now

**Left Column**
- Description
- Requirements
- Benefits
- Recruitment process (steps)
- Deadline
- Share button

**Right Column**
- Company card (logo, info, view all jobs)
- Salary & Level & Mode
- Skill tags
- "Related Jobs"

**Apply Modal**
- Select CV (upload/choose from CV Builder)
- Portfolio URL
- Audio Intro (≤60s)
- Note
- Checkbox: agree to terms

---

### Companies (List & Detail)

**Companies List**
- Logo grid + search + filter by industry/size

**Company Profile**
- Cover, logo, description, culture, benefits, video
- Tabs: Open Jobs, Album/Media, FAQ

---

### Fairs (List & Detail)

**Fair List**
- Event cards (name, time, location/online, booth count, status)

**Fair Detail**
- Hero
- Description
- Booth list (company logo + positions + "Register slot")
- Event schedule
- FAQ
- CTA: "Register to Join"

---

### Pricing (Employer)

**Package Table**
- Free, Credit, Pro
- Feature comparison: job count, unlock CV, Top Job, Branding, Online Test, AI Matching

**Additional**
- FAQ + Contact Sales

---

### Blog (Category & Article)

**Category Page**
- Grid layout
- Filter by tags

**Article Detail**
- Title, date, author
- Table of contents
- Related posts

---

## 3. Post-login Experience – Student

### Student Dashboard

**Hero/Summary**
- Overview: Jobs saved, Applications, Upcoming interviews, Fair registrations

**Cards**
- Saved Jobs (small list, view all)
- Applications (status: Sent | Viewed | Interview | Offer | Rejected)
- Upcoming (interviews & fair slots)
- AI Tips (CV/skills)

**Empty States**
- Guide: "Create CV", "Enable Job Alerts"

---

### Saved Jobs
- List of saved jobs
- Actions: Apply/Remove
- Personal notes per job

---

### Applications
- Tracking table: Job, Company, Round, Status, Last update
- Filter by status

---

### Messages
- Conversation list (employer ↔ candidate)
- Status: Unread/Read

---

### Profile

**CV Builder**
- Choose template (ATS-Friendly/Modern/Classic)
- Keyword suggestions
- Export PDF

**Personal Information**
- Education, Projects, Skills (rating), Certificates, Languages

**Audio Intro**
- Record/upload 60s file
- Display "Confidence Score"

**Privacy Toggle**
- Hide/Show contact info
- Show audio before CV

---

### Fairs (Student)

**My Registrations**
- List of registered events + interview slots

**Discover Fairs**
- Booth suggestions based on CV + audio

---

## 4. Post-login Experience – Employer

### Employer Dashboard

**KPI Summary**
- Active jobs, Candidates this week
- Conversion funnel (Viewed→Interview→Offer)
- Cost per application

**Widgets**
- Performance by channel (Organic/Top Job/Fair)
- Suggested actions (AI)
- Upcoming interviews
- Billing status

---

### Jobs (Employer)

**Job List**
- Status (Draft/Active/Closed)
- Views, applications, time remaining

**Post a Job** (1-page form, grouped fields)

**Basics**
- Title, Level, Department, Employment Type, Mode, Location

**Compensation**
- Salary range (gross/net), Currency
- Benefits (select + custom)

**Description**
- JD editor (bullet points for Responsibilities/Requirements/Benefits)

**Skills**
- Tags (suggestions based on JD)

**Visibility**
- Standard (Free) / Top Job (Paid) / Attach to Fair

**Actions**
- Deadline, Preview, Submit

**Job Detail (Employer View)**
- Performance, candidate sources
- AI suggestions for JD optimization

---

### Candidates

**Search & Filters**
- School, major, skills, graduation year, GPA, certificates
- Privacy badges

**List**
- CandidateCard: anonymous name, skills, Audio Intro play, match score
- Button: "Interested" to view contact

**Candidate Detail**
- CV, Portfolio, Audio
- Application history
- Internal notes
- Assign pipeline stage

---

### Campaigns
- Create campaign by position/recruitment round
- KPI: cost/apply, time-to-hire, sources
- A/B test JD titles

---

### Fairs (Employer)
- Register booth
- Configure jobs for fair
- Receive interview slot schedule at event
- Check-in dashboard on event day (count visits, scan CV QR)

---

### Billing
- Service packages
- Payment history
- Credit top-up
- Invoice center

---

## 5. Components Library

### Navigation
- Navbar (3 variants): Pre-login / Student / Employer

### Search
- Search bar: Keyword input, Location combobox, filter trigger

### Chips
- Industry chips: selectable + multi-select

### Cards
- **JobCard**: logo, title, company, location, salary, tags, posted time, ★ Save, hover "Quick Apply"
- **CompanyCard**: logo, intro, "View jobs"
- **FairCard**: name, time, location/online, status, CTA
- **TestimonialCard**: avatar, quote, role
- **Stats/KPI Cards** (Employer): compact, mini-trend sparkline

### Tables
- Applications (Student)
- Candidates (Employer)

### Modals
- Apply, Audio recorder, Schedule interview, Post a Job

### States
- Empty/Loading/Error: skeleton + helpful message

### UI Elements
- Toasts/Badges: Saved, Applied, Status
- Pagination & Sort

---

## 6. Main User Flows

### Candidate Search → View Job → Apply
1. Type keyword/click chip → Jobs list (filters on)
2. Open Job detail → Apply Now → select CV/Audio/Note → Submit
3. Success toast → Applications shows "Sent"
4. Email/notification sent

### Employer Post Job → Track Performance
1. Employer Dashboard → Post a Job → fill form → Preview → Submit
2. Job list shows "Active" status
3. Receive applications, view sources, AI improvement suggestions

### Fair Registration & Booking

**Student**
- Fair detail → select booth → choose slot → confirm calendar

**Employer**
- Fair detail → register booth → set positions + interview slots

---

## 7. States & UX Rules

### Loading
- Skeleton for list/table/card
- Max 3s samples

### Empty
- Suggest: remove filter / increase radius / add skills

### Error
- Error banner + Retry
- Preserve user filters

### Responsive
- Desktop: 12-grid
- Mobile: 1-column
- Priority: "Apply" & "Save"

### Accessibility
- Heading hierarchy
- Contrast ≥ 4.5:1
- Focus ring
- Keyboard-friendly

### SEO (Pre-login)
- Title/description templating
- Schema: JobPosting/Organization/Event

### Performance
- LCP < 2.5s (simple hero, lazy images)
- Use skeleton loaders

---

## 8. Tracking & Metrics

### Events
- search_performed, filter_applied
- job_viewed, job_saved, job_applied
- cv_exported, audio_recorded
- fair_registered, interview_scheduled
- employer_post_job
- candidate_opened, candidate_contact_viewed

### Funnels
- Job view → Apply
- Candidate view → Contact
- Fair view → Register

---

## 9. Content & Placeholders

### Text
- Use Lorem for descriptions

### Sample Tags
- Python, React, SQL, Communication, Internship

### Sample Salary
- "Negotiable" or "15–25M VND/month"

### Sample Locations
- "Hà Nội", "TP.HCM", "Hybrid"

---

## 10. URL Structure

### Public Pages
- `/` (Home)
- `/jobs` (list), `/jobs/:id` (detail)
- `/companies`, `/companies/:id`
- `/fairs`, `/fairs/:id`
- `/pricing`, `/blog`, `/blog/:slug`

### Student Portal
- `/student/dashboard`
- `/student/saved`
- `/student/applications`
- `/student/messages`
- `/student/profile`
- `/student/fairs`

### Employer Portal
- `/employer/dashboard`
- `/employer/jobs`
- `/employer/post-job`
- `/employer/candidates`
- `/employer/campaigns`
- `/employer/fairs`
- `/employer/billing`

---

## Directory Structure

```
moonasterisk-jobfair/
├─ README.md
├─ .editorconfig
├─ .gitignore
├─ public/
│  ├─ index.html                  # Landing (pre-login)
│  ├─ jobs.html
│  ├─ job-detail.html
│  ├─ companies.html
│  ├─ company-detail.html
│  ├─ fairs.html
│  ├─ fair-detail.html
│  ├─ pricing.html
│  ├─ blog.html
│  ├─ blog-article.html
│  ├─ student/
│  │  ├─ dashboard.html
│  │  ├─ saved.html
│  │  ├─ applications.html
│  │  ├─ profile.html
│  │  └─ fairs.html
│  ├─ employer/
│  │  ├─ dashboard.html
│  │  ├─ jobs.html
│  │  ├─ post-job.html
│  │  ├─ candidates.html
│  │  ├─ campaigns.html
│  │  └─ fairs.html
│  ├─ assets/
│  │  ├─ logos/
│  │  ├─ img/
│  │  │  ├─ banners/
│  │  │  └─ placeholders/
│  │  ├─ fonts/
│  │  └─ data/
│  │     ├─ jobs.json
│  │     ├─ companies.json
│  │     ├─ fairs.json
│  │     ├─ blog.json
│  │     ├─ candidates.json
│  │     └─ site.json
│  └─ favicon.ico
├─ src/
│  ├─ css/
│  │  ├─ base/
│  │  │  ├─ reset.css
│  │  │  ├─ variables.css
│  │  │  └─ typography.css
│  │  ├─ layout/
│  │  │  ├─ grid.css
│  │  │  ├─ header.css
│  │  │  ├─ footer.css
│  │  │  └─ sections.css
│  │  ├─ components/
│  │  │  ├─ buttons.css
│  │  │  ├─ cards.css
│  │  │  ├─ forms.css
│  │  │  ├─ tables.css
│  │  │  ├─ chips.css
│  │  │  └─ skeleton.css
│  │  ├─ pages/
│  │  │  ├─ home.css
│  │  │  ├─ jobs.css
│  │  │  ├─ job-detail.css
│  │  │  ├─ companies.css
│  │  │  ├─ company-detail.css
│  │  │  ├─ fairs.css
│  │  │  ├─ fair-detail.css
│  │  │  ├─ pricing.css
│  │  │  ├─ blog.css
│  │  │  ├─ blog-article.css
│  │  │  ├─ student.css
│  │  │  └─ employer.css
│  │  └─ main.css                # imports all above files
│  ├─ js/
│  │  ├─ core/
│  │  │  ├─ router.js            # internal anchor navigation
│  │  │  ├─ store.js             # lightweight state: saved jobs, auth mock
│  │  │  ├─ dom.js               # DOM helpers
│  │  │  └─ events.js            # small pub/sub (optional)
│  │  ├─ api/
│  │  │  ├─ http.js              # fetch wrapper (timeout, error handling)
│  │  │  ├─ jobs.api.js
│  │  │  ├─ companies.api.js
│  │  │  ├─ fairs.api.js
│  │  │  ├─ blog.api.js
│  │  │  └─ candidates.api.js
│  │  ├─ utils/
│  │  │  ├─ formatters.js
│  │  │  ├─ validators.js
│  │  │  └─ templates.js
│  │  ├─ components/
│  │  │  ├─ navbar.js
│  │  │  ├─ footer.js
│  │  │  ├─ search-bar.js
│  │  │  ├─ job-card.js
│  │  │  ├─ company-card.js
│  │  │  ├─ fair-card.js
│  │  │  ├─ testimonial-card.js
│  │  │  ├─ modal.js
│  │  │  └─ pagination.js
│  │  ├─ pages/
│  │  │  ├─ home.page.js
│  │  │  ├─ jobs.page.js
│  │  │  ├─ job-detail.page.js
│  │  │  ├─ companies.page.js
│  │  │  ├─ company-detail.page.js
│  │  │  ├─ fairs.page.js
│  │  │  ├─ fair-detail.page.js
│  │  │  ├─ pricing.page.js
│  │  │  ├─ blog.page.js
│  │  │  ├─ blog-article.page.js
│  │  │  ├─ student/
│  │  │  │  ├─ dashboard.page.js
│  │  │  │  ├─ saved.page.js
│  │  │  │  ├─ applications.page.js
│  │  │  │  └─ profile.page.js
│  │  │  └─ employer/
│  │  │     ├─ dashboard.page.js
│  │  │     ├─ jobs.page.js
│  │  │     ├─ post-job.page.js
│  │  │     ├─ candidates.page.js
│  │  │     ├─ campaigns.page.js
│  │  │     └─ fairs.page.js
│  │  └─ app.js                  # common initialization: mount navbar/footer, load page script
└─ scripts/
   └─ dev-serve.sh               # optional; not required
```