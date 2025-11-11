/**
 * Pages Index
 * Export all page controllers
 */

// Public pages
export { default as home } from './home.page.js';
export { default as jobs } from './jobs.page.js';
export { default as jobDetail } from './job-detail.page.js';
export { default as companies } from './companies.page.js';

// Note: Additional page controllers would be exported here:
// export { default as companyDetail } from './company-detail.page.js';
// export { default as fairs } from './fairs.page.js';
// export { default as fairDetail } from './fair-detail.page.js';
// export { default as blog } from './blog.page.js';
// export { default as blogArticle } from './blog-article.page.js';
// export { default as pricing } from './pricing.page.js';

// Student pages
// export { default as studentDashboard } from './student/dashboard.page.js';
// export { default as studentProfile } from './student/profile.page.js';
// export { default as studentSaved } from './student/saved.page.js';
// export { default as studentApplications } from './student/applications.page.js';

// Employer pages
// export { default as employerDashboard } from './employer/dashboard.page.js';
// export { default as employerJobs } from './employer/jobs.page.js';
// export { default as employerPostJob } from './employer/post-job.page.js';
// export { default as employerCandidates } from './employer/candidates.page.js';

/**
 * Get page controller by route name
 * @param {string} routeName - Route name
 * @returns {Object} - Page controller
 */
export const getPage = (routeName) => {
	const pages = {
		home,
		jobs,
		'job-detail': jobDetail,
		companies,
		// Add more mappings as pages are created
	};

	return pages[routeName] || null;
};
