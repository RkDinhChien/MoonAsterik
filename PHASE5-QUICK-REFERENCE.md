# Phase 5 Quick Reference Guide

## What Changed in Phase 5?

Phase 5 enhanced the data structures with fields needed for the Moon\* JobFair platform's advanced features.

---

## Jobs Data (jobs.json)

### New Fields

#### 1. fairBadge (Object | null)

Connects jobs to specific career fairs.

```javascript
"fairBadge": {
  "fairId": 1,
  "fairName": "Tech Career Fair Spring 2025",
  "hasSpecialBooth": true
}
```

**Usage:**

- Filter jobs by fair event
- Display fair badge on job cards
- Link to fair detail page

**Distribution:** ~31% of jobs

---

#### 2. supportsAudioIntro (Boolean)

Indicates if the job accepts audio introductions from candidates.

```javascript
"supportsAudioIntro": true
```

**Usage:**

- Show audio upload option in apply modal
- Filter jobs accepting audio
- Badge on job listings

**Distribution:** ~48% of jobs

---

#### 3. featured (Boolean)

Marks premium/highlighted job postings.

```javascript
"featured": true
```

**Usage:**

- Homepage featured jobs section
- Special styling/badges
- Top of search results

**Distribution:** ~11% of jobs

---

#### 4. applicationDeadline (ISO Date String)

Explicit application deadline.

```javascript
"applicationDeadline": "2025-11-27"
```

**Usage:**

- Urgency indicators ("3 days left")
- Filter expiring jobs
- Reminder notifications

**Distribution:** All jobs (100%)

---

#### 5. applicantCount (Number)

Total number of applicants.

```javascript
"applicantCount": 95
```

**Usage:**

- Social proof on job cards
- Competition indicator
- Analytics

**Range:** 1-150
**Distribution:** All jobs (100%)

---

#### 6. viewCount (Number)

Total page views for the job.

```javascript
"viewCount": 554
```

**Usage:**

- Popularity metric
- Trending jobs
- Analytics

**Range:** 50-1000
**Distribution:** All jobs (100%)

---

## Companies Data (companies.json)

### New Fields

#### 1. culture (String)

Company culture description.

```javascript
"culture": "Innovation-driven culture with focus on continuous learning"
```

**Usage:**

- Company detail page overview tab
- Culture section
- Search/matching

---

#### 2. values (Array of Strings)

Core company values.

```javascript
"values": ["Innovation", "Collaboration", "Excellence", "Integrity"]
```

**Usage:**

- Display as chips/badges
- Values-based filtering
- Culture fit indicators

**Count:** 3-4 values per company

---

#### 3. benefits (Array of Strings)

Employee benefits list.

```javascript
"benefits": [
  "Competitive salary with annual review",
  "Premium health insurance",
  "13th month salary",
  "Flexible working hours",
  "Learning budget"
]
```

**Usage:**

- Benefits section in company profile
- Comparison feature
- Selling points

**Count:** 5-8 benefits per company

---

#### 4. workEnvironment (String)

Work environment description.

```javascript
"workEnvironment": "Modern office space in city center with open workspace"
```

**Usage:**

- Culture tab content
- Office/remote info
- Facilities description

---

#### 5. employeeCount (Number)

Actual employee count (more precise than size category).

```javascript
"employeeCount": 39
```

**Usage:**

- Company size display
- Statistics
- Filtering

**Calculated from size category**

---

#### 6. followerCount (Number)

Number of platform followers.

```javascript
"followerCount": 4686
```

**Usage:**

- Social proof metric
- Popularity indicator
- Follow feature

**Range:** 100-5000

---

#### 7. industries (Array of Strings)

Industry classifications.

```javascript
"industries": ["Technology", "AI/ML", "E-commerce"]
```

**Usage:**

- Industry filtering
- Company categorization
- Related companies

**Count:** 1-3 industries per company

---

#### 8. gallery (Array of Strings)

Company office/team photos.

```javascript
"gallery": [
  "assets/img/companies/vng/gallery-1.jpg",
  "assets/img/companies/vng/gallery-2.jpg",
  "assets/img/companies/vng/gallery-3.jpg"
]
```

**Usage:**

- Photo gallery on company page
- Lightbox viewer
- Visual showcase

**Count:** 3-6 images per company

---

#### 9. coverImage (String)

Company profile cover/hero image.

```javascript
"coverImage": "assets/img/companies/vng/cover.jpg"
```

**Usage:**

- Hero banner on company page
- Professional company photo
- Brand showcase

---

## Common Use Cases

### Filter jobs by fair

```javascript
const fairJobs = jobs.filter((job) => job.fairBadge?.fairId === selectedFairId);
```

### Get jobs accepting audio intro

```javascript
const audioJobs = jobs.filter((job) => job.supportsAudioIntro === true);
```

### Get featured jobs for homepage

```javascript
const featured = jobs
	.filter((job) => job.featured)
	.sort((a, b) => b.viewCount - a.viewCount)
	.slice(0, 6);
```

### Get popular jobs

```javascript
const popular = jobs.sort((a, b) => b.viewCount - a.viewCount).slice(0, 10);
```

### Filter companies by values

```javascript
const innovative = companies.filter((c) => c.values?.includes('Innovation'));
```

### Get companies with hybrid work

```javascript
const hybrid = companies.filter((c) =>
	c.workEnvironment?.toLowerCase().includes('hybrid')
);
```

### Application status breakdown

```javascript
const statusCounts = applications.reduce((acc, app) => {
	acc[app.status] = (acc[app.status] || 0) + 1;
	return acc;
}, {});
```

---

## API Integration Examples

### Job Detail Page

```javascript
async function loadJobDetail(jobId) {
	const job = await api.getJob(jobId);

	// Use enhanced fields
	if (job.fairBadge) {
		showFairBadge(job.fairBadge);
	}

	if (job.supportsAudioIntro) {
		enableAudioUpload();
	}

	updateSocialProof(job.applicantCount, job.viewCount);
	showDeadline(job.applicationDeadline);
}
```

### Company Profile Page

```javascript
async function loadCompanyProfile(companyId) {
	const company = await api.getCompany(companyId);

	// Render enhanced sections
	renderCulture(company.culture);
	renderValues(company.values);
	renderBenefits(company.benefits);
	renderWorkEnvironment(company.workEnvironment);
	renderGallery(company.gallery);
	setCoverImage(company.coverImage);

	updateStats(company.employeeCount, company.followerCount);
}
```

### Fair Jobs Listing

```javascript
async function loadFairJobs(fairId) {
	const jobs = await api.getJobs({ fairId });

	jobs.forEach((job) => {
		if (job.fairBadge?.hasSpecialBooth) {
			addSpecialBoothBadge(job);
		}
	});

	renderJobList(jobs);
}
```

---

## Testing

Run the example script to see all enhanced data in action:

```bash
node scripts/data-usage-examples.js
```

This demonstrates:

- Fair filtering
- Audio intro filtering
- Featured jobs selection
- Company culture display
- Application tracking
- Popular jobs ranking
- And more...

---

## Migration Notes

### Backward Compatibility

All new fields are optional and have fallback values:

- `fairBadge`: Check with `job.fairBadge?.fairId`
- `supportsAudioIntro`: Defaults to `false` if missing
- `featured`: Defaults to `false` if missing
- Other fields: Check existence before use

### Performance Considerations

- Large files (jobs.json is 1.7MB)
- Consider pagination in production
- Cache frequently accessed data
- Use indexes for filtering

---

## Next Steps (Phase 6)

Phase 6 will implement UI features using this data:

1. **Fair Integration**

   - Fair detail pages with job listings
   - Booth booking system
   - Fair registration flow

2. **Audio Features**

   - Audio upload component
   - Audio playback in candidate profiles
   - Audio intro filtering

3. **Company Profiles**

   - Culture tab implementation
   - Gallery lightbox
   - Values/benefits display

4. **Enhanced Filtering**
   - Fair-based job filters
   - Audio intro toggle
   - Values-based matching

---

For complete details, see:

- `PHASE5-COMPLETE.md` - Full implementation report
- `PHASE5-SUMMARY.md` - Quick stats overview
- `scripts/enhance-data-phase5.js` - Enhancement script
- `scripts/data-usage-examples.js` - Usage examples
