# MoonAsterik Project Refactoring Plan

## Executive Summary

The current project is a single-page application (SPA) using vanilla HTML/CSS/JS with a basic routing system. The refactoring will align it with the comprehensive specification in `project-structure.md`, transforming it into a multi-page, modular architecture with clear separation of concerns, better scalability, and improved maintainability.

---

## Current State Analysis

### What Exists

- ✅ Single `index.html` with inline navigation
- ✅ Basic router (`router.js`) with limited page support
- ✅ State management (`state.js`)
- ✅ Page templates in `pages` (13 files)
- ✅ Some JSON data files (jobs, companies, applications, blogs, stats)
- ✅ Basic styling in `styles` (3 CSS files)
- ✅ Some modules in `modules` directory
- ⚠️ Empty `css` and `pages` directories
- ⚠️ No structured component system
- ⚠️ Limited API layer
- ⚠️ No clear separation between public and authenticated pages

### What's Missing (per spec)

- ❌ Separate HTML files for each page/section
- ❌ Organized CSS architecture (base, layout, components, pages)
- ❌ Comprehensive component library
- ❌ Complete API layer for all resources
- ❌ Utility modules (formatters, validators, templates)
- ❌ Missing data files (fairs, candidates, site config)
- ❌ Student and Employer portal separation
- ❌ Many pages from spec (Fairs, Pricing, Blog detail, Campaigns, etc.)

---

## Refactoring Strategy

## Phase 1: Directory Restructure & Foundation 🗂️

**Goal:** Establish the new directory structure without breaking existing functionality.

### 1.1 Create New Directory Structure

```
moonasterisk-jobfair/
├── public/
│   ├── index.html (Landing)
│   ├── jobs.html
│   ├── job-detail.html
│   ├── companies.html
│   ├── company-detail.html
│   ├── fairs.html
│   ├── fair-detail.html
│   ├── pricing.html
│   ├── blog.html
│   ├── blog-article.html
│   ├── student/
│   │   ├── dashboard.html
│   │   ├── saved.html
│   │   ├── applications.html
│   │   ├── profile.html
│   │   └── fairs.html
│   └── employer/
│       ├── dashboard.html
│       ├── jobs.html
│       ├── post-job.html
│       ├── candidates.html
│       ├── campaigns.html
│       └── fairs.html
```

### 1.2 Move/Organize Assets

- Move `assets` → `public/assets/`
- Add missing subdirectories:
  - `public/assets/img/banners/`
  - `public/assets/img/placeholders/`
  - `public/assets/fonts/`
- Add missing data files:
  - `assets/data/fairs.json`
  - `assets/data/candidates.json`
  - `assets/data/site.json`

### 1.3 Reorganize Source Files

```
src/
├── css/
│   ├── base/ (reset, variables, typography)
│   ├── layout/ (grid, header, footer, sections)
│   ├── components/ (buttons, cards, forms, tables, chips, skeleton)
│   ├── pages/ (home, jobs, companies, fairs, pricing, blog, student, employer)
│   └── main.css
└── js/
    ├── core/ (router, store, dom, events)
    ├── api/ (http, jobs.api, companies.api, fairs.api, blog.api, candidates.api)
    ├── utils/ (formatters, validators, templates)
    ├── components/ (navbar, footer, search-bar, cards, modal, pagination)
    ├── pages/ (all page logic)
    └── app.js
```

**Actions:**
1. Create all directories
2. Move `styles` content → `src/css/`
3. Move `js` content → `src/js/`
4. Keep `modules` for legacy support during transition

---

## Phase 2: CSS Architecture Refactor 🎨

**Goal:** Modularize CSS with clear separation of concerns.

### 2.1 Base Layer

Create foundational CSS:
- `src/css/base/reset.css` - CSS reset/normalize
- `src/css/base/variables.css` - CSS custom properties (colors, spacing, typography)
- `src/css/base/typography.css` - Font definitions, text styles

### 2.2 Layout Layer

- `src/css/layout/grid.css` - 12-column grid system, container, responsive utilities
- `src/css/layout/header.css` - 3 header variants (pre-login, student, employer)
- `src/css/layout/footer.css` - Global footer
- `src/css/layout/sections.css` - Common section layouts

### 2.3 Components Layer

Create reusable component styles:
- `buttons.css` - Primary, secondary, outline, ghost variants
- `cards.css` - JobCard, CompanyCard, FairCard, TestimonialCard, KPI cards
- `forms.css` - Inputs, selects, checkboxes, radio, file upload
- `tables.css` - Data tables, sortable headers, pagination
- `chips.css` - Tag/filter chips
- `skeleton.css` - Loading state skeletons

### 2.4 Pages Layer

Page-specific overrides:
- Each major page gets its own CSS file
- Import in page HTML or `main.css`

### 2.5 Main CSS

Update `src/css/main.css` to import all modules in correct order:

```css
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';
@import './layout/grid.css';
/* ... etc */
```

**Migration Strategy:**
1. Extract existing styles from `main.css`, `landing.css`, `profile-styles.css`
2. Categorize into appropriate modules
3. Update HTML to reference new `src/css/main.css`

---

## Phase 3: JavaScript Architecture Refactor ⚙️

**Goal:** Create modular, maintainable JavaScript with clear APIs.

### 3.1 Core Modules

Transform existing modules:

**`router.js` → `router.js`**
- Extend to support multi-page navigation
- Add hash routing for SPAs
- Support URL parameters (`job/:id`, `company/:id`)
- Add route guards (auth checks)

**`state.js` → `src/js/core/store.js`**
- Enhance with pub/sub pattern
- Add actions/mutations pattern
- Support for saved jobs, applications, user preferences
- LocalStorage sync

**NEW: `src/js/core/dom.js`**
- Helper functions: `qs()`, `qsa()`, `createElement()`, `render()`
- Event delegation helpers

**NEW: `src/js/core/events.js`**
- Simple pub/sub event bus
- Track user interactions for analytics

### 3.2 API Layer

Create structured API modules:

**`src/js/api/http.js`**

Fetch wrapper with:
- Timeout handling
- Error handling
- Request/response interceptors
- Loading state management

**Resource APIs:**
- `jobs.api.js` - GET /jobs, GET /jobs/:id, POST /jobs
- `companies.api.js` - GET /companies, GET /companies/:id
- `fairs.api.js` - GET /fairs, GET /fairs/:id, POST /fairs/:id/register
- `blog.api.js` - GET /blog, GET /blog/:slug
- `candidates.api.js` - GET /candidates, GET /candidates/:id

Each API module exports functions like:

```javascript
export const getJobs = (filters) => http.get('/assets/data/jobs.json', { params: filters });
export const getJobById = (id) => http.get(`/assets/data/jobs.json`).then(data => data.find(j => j.id === id));
```

### 3.3 Utils Layer

**`src/js/utils/formatters.js`**
- `formatSalary()`, `formatDate()`, `formatLocation()`
- `pluralize()`, `truncate()`

**`src/js/utils/validators.js`**
- Form validation: `validateEmail()`, `validatePhone()`, `validateCV()`
- `isValidJobPosting()`, `isValidProfile()`

**`src/js/utils/templates.js`**
- HTML template functions
- Safe HTML escaping
- Template literal helpers

### 3.4 Components Layer

Extract reusable UI components:
- `navbar.js` - Render navbar based on auth state
- `footer.js` - Render footer
- `search-bar.js` - Job search component with filters
- `job-card.js` - JobCard component with save/apply actions
- `company-card.js` - Company display card
- `fair-card.js` - Fair event card
- `testimonial-card.js` - Testimonial component
- `modal.js` - Reusable modal system (apply, audio recorder, etc.)
- `pagination.js` - Pagination controls

Each component exports:

```javascript
export const JobCard = (job) => `...HTML...`;
export const initJobCard = (element, job) => { /* event handlers */ };
```

### 3.5 Page Controllers

Refactor existing page templates into controllers:

Move from `pages` to `src/js/pages/` and enhance:
- `home.page.js` - Landing page logic
- `jobs.page.js` - Job list with filtering/sorting
- `job-detail.page.js` - Single job view
- `companies.page.js` - Company list
- `company-detail.page.js` - Company profile
- `fairs.page.js` - Fair list
- `fair-detail.page.js` - Single fair
- `pricing.page.js` - Pricing table
- `blog.page.js` - Blog list
- `blog-article.page.js` - Single article

**Student pages:**
- `student/dashboard.page.js`
- `student/saved.page.js`
- `student/applications.page.js`
- `student/profile.page.js`

**Employer pages:**
- `employer/dashboard.page.js`
- `employer/jobs.page.js`
- `employer/post-job.page.js`
- `employer/candidates.page.js`
- `employer/campaigns.page.js`

Each page exports:

```javascript
export const init = () => { /* page initialization */ };
export const destroy = () => { /* cleanup */ };
```

---

## Phase 4: Multi-Page HTML Structure 📄

**Goal:** Create separate HTML files for better SEO and structure.

### 4.1 Create HTML Pages

For each page in the spec, create an HTML file:

**Template Structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Moon*</title>
    <link rel="stylesheet" href="/src/css/main.css">
</head>
<body>
    <!-- Navbar placeholder (populated by JS) -->
    <nav id="navbar"></nav>
    
    <!-- Page-specific content -->
    <main id="main-content">
        <!-- ... -->
    </main>
    
    <!-- Footer placeholder (populated by JS) -->
    <footer id="footer"></footer>
    
    <!-- Scripts -->
    <script type="module" src="/src/js/app.js"></script>
    <script type="module" src="/src/js/pages/[page].page.js"></script>
</body>
</html>
```

### 4.2 Pages to Create

**Public Pages:**
- `index.html` - Landing
- `public/jobs.html` - Job list
- `public/job-detail.html` - Job detail
- `public/companies.html` - Companies list
- `public/company-detail.html` - Company profile
- `public/fairs.html` - Fair list
- `public/fair-detail.html` - Fair detail
- `public/pricing.html` - Pricing page
- `public/blog.html` - Blog list
- `public/blog-article.html` - Blog article

**Student Portal:**
- `public/student/dashboard.html`
- `public/student/saved.html`
- `public/student/applications.html`
- `public/student/profile.html`
- `public/student/fairs.html`

**Employer Portal:**
- `public/employer/dashboard.html`
- `public/employer/jobs.html`
- `public/employer/post-job.html`
- `public/employer/candidates.html`
- `public/employer/campaigns.html`
- `public/employer/fairs.html`

---

## Phase 5: Data Structure Enhancement 📊

**Goal:** Complete data files with realistic mock data.

### 5.1 Create Missing Data Files

**`assets/data/fairs.json`**

```json
[
  {
    "id": 1,
    "name": "Tech Career Fair Spring 2025",
    "date": "2025-03-15",
    "location": "HCMC Exhibition Center",
    "type": "onsite",
    "status": "upcoming",
    "boothCount": 45,
    "description": "...",
    "booths": [...]
  }
]
```

**`assets/data/candidates.json`**

```json
[
  {
    "id": 1,
    "name": "Nguyen Van A (Anonymous)",
    "school": "HCMUT",
    "major": "Computer Science",
    "graduationYear": 2025,
    "gpa": 3.5,
    "skills": ["React", "Node.js", "Python"],
    "hasAudioIntro": true,
    "matchScore": 85
  }
]
```

**`assets/data/site.json`**

```json
{
  "siteTitle": "Moon* JobFair Vietnam",
  "industries": ["Data/AI", "Frontend", "Backend", "Mobile", "DevOps"],
  "locations": ["Hà Nội", "TP.HCM", "Đà Nẵng"],
  "testimonials": [...]
}
```

### 5.2 Enhance Existing Data

- Add more fields to `jobs.json` (fair badges, audio intro support)
- Add company culture/benefits to `companies.json`
- Add application tracking fields to `applications.json`

---

## Phase 6: Feature Implementation 🚀

**Goal:** Implement missing features from spec.

### 6.1 Core Features

- **Filter System** - Advanced job/company filtering
- **Search** - Keyword + location search
- **Save/Apply** - Job save and application flow
- **Audio Intro** - Upload/record audio (mock with file input)
- **CV Builder** - Basic CV creation form
- **Fair Registration** - Event and booth registration
- **Application Tracking** - Status pipeline

### 6.2 Student Features

- Profile setup wizard
- Saved jobs management
- Application history with status
- Fair registration and slot booking

### 6.3 Employer Features

- Post job form with validation
- Candidate search and filtering
- Application review pipeline
- Campaign analytics (mock data)

### 6.4 UI States

- **Loading** - Skeleton loaders for cards/tables
- **Empty** - Helpful messages with CTAs
- **Error** - Retry buttons with error details

---

## Phase 7: Build & Deployment Setup 🔧

**Goal:** Modern development workflow.

### 7.1 Update package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 7.2 Vite Configuration

- Multi-page build support
- Asset optimization
- CSS preprocessing (optional)

### 7.3 Vercel Configuration

Update `vercel.json` for proper routing:

```json
{
  "rewrites": [
    { "source": "/student/(.*)", "destination": "/student/$1.html" },
    { "source": "/employer/(.*)", "destination": "/employer/$1.html" }
  ]
}
```

---

## Phase 8: Quality & Polish ✨

### 8.1 Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast checks

### 8.2 Performance

- Lazy load images
- Code splitting
- Asset optimization
- Caching strategy

### 8.3 SEO

- Meta tags for each page
- Open Graph tags
- Structured data (JobPosting, Organization, Event)

### 8.4 Testing

- Manual testing checklist
- Cross-browser testing
- Mobile responsiveness