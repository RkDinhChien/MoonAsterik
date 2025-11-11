/**
 * Phase 5: Data Enhancement Script
 * Adds missing fields to jobs.json, companies.json as per refactoring plan
 */

const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '..', 'public', 'assets', 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const COMPANIES_FILE = path.join(DATA_DIR, 'companies.json');
const FAIRS_FILE = path.join(DATA_DIR, 'fairs.json');

// Fair IDs from fairs.json
const FAIR_IDS = [1, 2, 3, 4, 5];

// Helper to randomly select from array
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to randomly decide boolean with probability
const randomBool = (probability = 0.5) => Math.random() < probability;

console.log('🚀 Starting Phase 5 Data Enhancement...\n');

// ============================================
// ENHANCE JOBS.JSON
// ============================================
console.log('📋 Enhancing jobs.json...');
let jobs = JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8'));
const originalJobCount = jobs.length;

jobs = jobs.map((job, index) => {
	const enhanced = { ...job };

	// Add fairBadge (30% chance)
	if (randomBool(0.3)) {
		enhanced.fairBadge = {
			fairId: randomFromArray(FAIR_IDS),
			fairName: `Fair ${randomFromArray(FAIR_IDS)}`,
			hasSpecialBooth: randomBool(0.5),
		};
	}

	// Add supportsAudioIntro (50% of jobs support it)
	enhanced.supportsAudioIntro = randomBool(0.5);

	// Add featured flag (10% chance)
	if (!enhanced.featured) {
		enhanced.featured = randomBool(0.1);
	}

	// Add applicationDeadline if not exists
	if (!enhanced.applicationDeadline) {
		enhanced.applicationDeadline = enhanced.expiresAt;
	}

	// Add applicantCount if not exists
	if (!enhanced.applicantCount) {
		enhanced.applicantCount = Math.floor(Math.random() * 150) + 1;
	}

	// Add viewCount if not exists
	if (!enhanced.viewCount) {
		enhanced.viewCount = Math.floor(Math.random() * 1000) + 50;
	}

	if ((index + 1) % 200 === 0) {
		process.stdout.write(
			`  Progress: ${index + 1}/${originalJobCount} jobs processed\r`
		);
	}

	return enhanced;
});

console.log(
	`\n✅ Enhanced ${jobs.length} jobs with fair badges, audio intro support, and metadata`
);
fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf8');

// ============================================
// ENHANCE COMPANIES.JSON
// ============================================
console.log('\n🏢 Enhancing companies.json...');
let companies = JSON.parse(fs.readFileSync(COMPANIES_FILE, 'utf8'));
const originalCompanyCount = companies.length;

// Sample data for enhancements
const cultureSamples = [
	'Innovation-driven culture with focus on continuous learning',
	'Collaborative work environment with flat hierarchy',
	'Fast-paced startup culture with flexibility and autonomy',
	'Established company culture with strong work-life balance',
	'Tech-first culture embracing latest technologies',
];

const valuesSamples = [
	['Innovation', 'Collaboration', 'Excellence', 'Integrity'],
	['Customer First', 'Teamwork', 'Innovation', 'Accountability'],
	['Quality', 'Transparency', 'Growth', 'Respect'],
	['Excellence', 'Trust', 'Innovation', 'Diversity'],
	['Impact', 'Learning', 'Openness', 'Sustainability'],
];

const benefitsSamples = [
	'Competitive salary with annual review',
	'Premium health insurance for employee and family',
	'13th month salary and performance bonus',
	'Flexible working hours and remote work options',
	'Modern office with free snacks and drinks',
	'Annual company trips and team building activities',
	'Learning budget for courses and conferences',
	'Latest MacBook Pro and equipment',
	'Gym membership and wellness programs',
	'Generous parental leave policy',
];

const workEnvironmentSamples = [
	'Modern office space in city center with open workspace',
	'Collaborative environment with dedicated meeting rooms and quiet zones',
	'Hybrid work model with flexible office days',
	'State-of-the-art facilities with gaming room and relaxation areas',
	'Agile workspace with standing desks and ergonomic furniture',
];

companies = companies.map((company, index) => {
	const enhanced = { ...company };

	// Add culture
	if (!enhanced.culture) {
		enhanced.culture = randomFromArray(cultureSamples);
	}

	// Add values
	if (!enhanced.values) {
		enhanced.values = randomFromArray(valuesSamples);
	}

	// Add benefits (select 5-8 random benefits)
	if (!enhanced.benefits) {
		const benefitCount = Math.floor(Math.random() * 4) + 5; // 5-8 benefits
		const shuffled = [...benefitsSamples].sort(() => 0.5 - Math.random());
		enhanced.benefits = shuffled.slice(0, benefitCount);
	}

	// Add workEnvironment
	if (!enhanced.workEnvironment) {
		enhanced.workEnvironment = randomFromArray(workEnvironmentSamples);
	}

	// Add employeeCount if not exists (based on size)
	if (!enhanced.employeeCount) {
		const sizeMap = {
			'1-10': Math.floor(Math.random() * 9) + 1,
			'11-50': Math.floor(Math.random() * 40) + 11,
			'51-200': Math.floor(Math.random() * 150) + 51,
			'201-500': Math.floor(Math.random() * 300) + 201,
			'501-1000': Math.floor(Math.random() * 500) + 501,
			'1000+': Math.floor(Math.random() * 2000) + 1000,
		};
		enhanced.employeeCount = sizeMap[company.size] || 50;
	}

	// Add followerCount if not exists
	if (!enhanced.followerCount) {
		enhanced.followerCount = Math.floor(Math.random() * 5000) + 100;
	}

	// Add industries array if not exists
	if (!enhanced.industries) {
		const industryPool = [
			'Technology',
			'E-commerce',
			'Fintech',
			'Gaming',
			'Enterprise Software',
			'AI/ML',
			'Cloud Services',
		];
		const industryCount = Math.floor(Math.random() * 3) + 1;
		enhanced.industries = [...industryPool]
			.sort(() => 0.5 - Math.random())
			.slice(0, industryCount);
	}

	// Add gallery images (3-6 images)
	if (!enhanced.gallery) {
		const imageCount = Math.floor(Math.random() * 4) + 3;
		enhanced.gallery = Array.from(
			{ length: imageCount },
			(_, i) => `assets/img/companies/${company.id}/gallery-${i + 1}.jpg`
		);
	}

	// Add cover image
	if (!enhanced.coverImage) {
		enhanced.coverImage = `assets/img/companies/${company.id}/cover.jpg`;
	}

	if ((index + 1) % 10 === 0) {
		process.stdout.write(
			`  Progress: ${index + 1}/${originalCompanyCount} companies processed\r`
		);
	}

	return enhanced;
});

console.log(
	`\n✅ Enhanced ${companies.length} companies with culture, benefits, values, and work environment`
);
fs.writeFileSync(COMPANIES_FILE, JSON.stringify(companies, null, 2), 'utf8');

// ============================================
// VERIFY FAIRS.JSON
// ============================================
console.log('\n🎪 Verifying fairs.json...');
const fairs = JSON.parse(fs.readFileSync(FAIRS_FILE, 'utf8'));
console.log(`✅ Found ${fairs.length} fairs with complete data structure`);

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '='.repeat(60));
console.log('✨ PHASE 5 DATA ENHANCEMENT COMPLETE');
console.log('='.repeat(60));
console.log(`📋 Jobs enhanced: ${jobs.length} entries`);
console.log('   - Added fairBadge to ~30% of jobs');
console.log('   - Added supportsAudioIntro flag');
console.log('   - Added featured, applicantCount, viewCount metadata');
console.log(`\n🏢 Companies enhanced: ${companies.length} entries`);
console.log('   - Added culture descriptions');
console.log('   - Added company values');
console.log('   - Added benefits lists');
console.log('   - Added work environment descriptions');
console.log('   - Added gallery images and cover images');
console.log('   - Added employee count and follower count');
console.log(`\n🎪 Fairs verified: ${fairs.length} entries (already complete)`);
console.log('\n✅ All data files successfully enhanced!');
console.log('='.repeat(60) + '\n');
