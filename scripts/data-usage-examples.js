/**
 * Phase 5 Data Usage Examples
 * Demonstrates how to use the enhanced data structures
 */

const jobs = require('../public/assets/data/jobs.json');
const companies = require('../public/assets/data/companies.json');
const applications = require('../public/assets/data/applications.json');
const fairs = require('../public/assets/data/fairs.json');
const candidates = require('../public/assets/data/candidates.json');
const site = require('../public/assets/data/site.json');

console.log('🚀 Phase 5 Enhanced Data Usage Examples\n');

// ============================================
// EXAMPLE 1: Get jobs available at a specific fair
// ============================================
console.log('📍 Example 1: Jobs at Fair #1');
const fairId = 1;
const jobsAtFair = jobs.filter(
	(job) => job.fairBadge && job.fairBadge.fairId === fairId
);
console.log(`Found ${jobsAtFair.length} jobs at Fair #${fairId}`);
console.log('Sample:', jobsAtFair[0].title, 'at', jobsAtFair[0].companyName);
if (jobsAtFair[0].fairBadge.hasSpecialBooth) {
	console.log('✨ This company has a special booth!');
}

// ============================================
// EXAMPLE 2: Filter jobs that accept audio introductions
// ============================================
console.log('\n🎤 Example 2: Jobs Accepting Audio Introductions');
const audioJobs = jobs.filter((job) => job.supportsAudioIntro);
console.log(`Found ${audioJobs.length} jobs accepting audio intros`);
console.log('Sample:', audioJobs[0].title);

// ============================================
// EXAMPLE 3: Get featured jobs for homepage
// ============================================
console.log('\n⭐ Example 3: Featured Jobs');
const featuredJobs = jobs.filter((job) => job.featured);
console.log(`Found ${featuredJobs.length} featured jobs`);
console.log(
	'Top featured:',
	featuredJobs
		.slice(0, 3)
		.map((j) => j.title)
		.join(', ')
);

// ============================================
// EXAMPLE 4: Get company culture and benefits
// ============================================
console.log('\n🏢 Example 4: Company Culture & Benefits');
const company = companies[0];
console.log(`Company: ${company.name}`);
console.log(`Culture: ${company.culture}`);
console.log(`Values: ${company.values.join(', ')}`);
console.log(`Benefits (${company.benefits.length}):`);
company.benefits.slice(0, 3).forEach((b) => console.log(`  - ${b}`));
console.log(`Gallery: ${company.gallery.length} images`);
console.log(`Followers: ${company.followerCount}`);

// ============================================
// EXAMPLE 5: Application tracking pipeline
// ============================================
console.log('\n📊 Example 5: Application Status Pipeline');
const statusCounts = applications.reduce((acc, app) => {
	acc[app.status] = (acc[app.status] || 0) + 1;
	return acc;
}, {});
console.log('Status distribution:');
Object.entries(statusCounts)
	.sort((a, b) => b[1] - a[1])
	.forEach(([status, count]) => {
		const percentage = ((count / applications.length) * 100).toFixed(1);
		console.log(`  ${status}: ${count} (${percentage}%)`);
	});

// ============================================
// EXAMPLE 6: Fair booth availability
// ============================================
console.log('\n🎪 Example 6: Fair Booth Information');
const fair = fairs[0];
console.log(`Fair: ${fair.name}`);
console.log(`Date: ${fair.date} to ${fair.endDate}`);
console.log(`Location: ${fair.location}`);
console.log(`Total booths: ${fair.boothCount}`);
console.log(`Registered attendees: ${fair.registeredCount}`);
const availableBooths = fair.booths.filter((b) => b.bookedSlots < b.slots);
console.log(`Booths with availability: ${availableBooths.length}`);
if (availableBooths.length > 0) {
	const booth = availableBooths[0];
	const available = booth.slots - booth.bookedSlots;
	console.log(
		`  ${booth.companyName}: ${available}/${booth.slots} slots available`
	);
}

// ============================================
// EXAMPLE 7: Candidate matching with audio
// ============================================
console.log('\n👤 Example 7: Candidates with Audio Introductions');
const audioCandidates = candidates.filter((c) => c.hasAudioIntro);
console.log(`Found ${audioCandidates.length} candidates with audio intros`);
const highMatch = audioCandidates.filter((c) => c.matchScore >= 85);
console.log(`High match candidates (≥85%): ${highMatch.length}`);
if (highMatch.length > 0) {
	const candidate = highMatch[0];
	console.log(`  ${candidate.name}`);
	console.log(`  School: ${candidate.school}`);
	console.log(`  Match Score: ${candidate.matchScore}%`);
	console.log(`  Skills: ${candidate.skills.join(', ')}`);
}

// ============================================
// EXAMPLE 8: Popular jobs by views
// ============================================
console.log('\n🔥 Example 8: Most Popular Jobs');
const popularJobs = [...jobs]
	.sort((a, b) => b.viewCount - a.viewCount)
	.slice(0, 5);
console.log('Top 5 most viewed jobs:');
popularJobs.forEach((job, i) => {
	console.log(
		`  ${i + 1}. ${job.title} - ${job.viewCount} views, ${
			job.applicantCount
		} applicants`
	);
});

// ============================================
// EXAMPLE 9: Companies by size and culture
// ============================================
console.log('\n🌟 Example 9: Company Filtering');
const techCompanies = companies.filter(
	(c) => c.industries && c.industries.includes('Technology')
);
console.log(`Tech companies: ${techCompanies.length}`);

const innovativeCompanies = companies.filter(
	(c) => c.values && c.values.includes('Innovation')
);
console.log(`Companies valuing Innovation: ${innovativeCompanies.length}`);

const hybridCompanies = companies.filter(
	(c) => c.workEnvironment && c.workEnvironment.toLowerCase().includes('hybrid')
);
console.log(`Companies with hybrid work: ${hybridCompanies.length}`);

// ============================================
// EXAMPLE 10: Site configuration
// ============================================
console.log('\n⚙️ Example 10: Platform Configuration');
console.log(`Site Title: ${site.siteTitle}`);
console.log(`Industries: ${site.industries.length}`);
console.log('Top industries by job count:');
const topIndustries = [...site.industries]
	.sort((a, b) => b.jobCount - a.jobCount)
	.slice(0, 3);
topIndustries.forEach((ind) => {
	console.log(`  ${ind.icon} ${ind.name}: ${ind.jobCount} jobs`);
});

console.log('\n✅ All examples executed successfully!');
console.log('📚 Use these patterns in your page controllers and API layer.\n');
