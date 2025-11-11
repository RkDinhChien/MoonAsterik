// ===========================
// Jobs API Module
// API functions for job-related operations
// ===========================

import http from './http.js';

const BASE_PATH = '/public/assets/data';

/**
 * Get all jobs with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>}
 */
export const getJobs = async (filters = {}) => {
	try {
		// Fetch all jobs
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);

		// Apply client-side filters
		let filteredJobs = jobs;

		if (filters.keyword) {
			const keyword = filters.keyword.toLowerCase();
			filteredJobs = filteredJobs.filter(
				(job) =>
					job.title.toLowerCase().includes(keyword) ||
					job.description?.summary?.toLowerCase().includes(keyword) ||
					job.tags?.some((tag) => tag.toLowerCase().includes(keyword))
			);
		}

		if (filters.location) {
			filteredJobs = filteredJobs.filter((job) =>
				job.location?.city
					?.toLowerCase()
					.includes(filters.location.toLowerCase())
			);
		}

		if (filters.category) {
			filteredJobs = filteredJobs.filter(
				(job) => job.category?.toLowerCase() === filters.category.toLowerCase()
			);
		}

		if (filters.type) {
			filteredJobs = filteredJobs.filter(
				(job) => job.type?.toLowerCase() === filters.type.toLowerCase()
			);
		}

		if (filters.experienceLevel) {
			filteredJobs = filteredJobs.filter(
				(job) =>
					job.experienceLevel?.toLowerCase() ===
					filters.experienceLevel.toLowerCase()
			);
		}

		if (filters.minSalary) {
			filteredJobs = filteredJobs.filter(
				(job) => job.salary?.min >= filters.minSalary
			);
		}

		if (filters.maxSalary) {
			filteredJobs = filteredJobs.filter(
				(job) => job.salary?.max <= filters.maxSalary
			);
		}

		if (filters.tags && filters.tags.length > 0) {
			filteredJobs = filteredJobs.filter((job) =>
				filters.tags.some((tag) => job.tags?.includes(tag))
			);
		}

		// Apply sorting
		if (filters.sortBy) {
			filteredJobs = sortJobs(filteredJobs, filters.sortBy, filters.sortOrder);
		}

		// Apply pagination
		if (filters.page && filters.perPage) {
			const start = (filters.page - 1) * filters.perPage;
			const end = start + filters.perPage;
			filteredJobs = filteredJobs.slice(start, end);
		}

		return filteredJobs;
	} catch (error) {
		console.error('Error fetching jobs:', error);
		throw error;
	}
};

/**
 * Get job by ID
 * @param {number} id - Job ID
 * @returns {Promise<Object>}
 */
export const getJobById = async (id) => {
	try {
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);
		const job = jobs.find((j) => j.id === parseInt(id));

		if (!job) {
			throw new Error(`Job with ID ${id} not found`);
		}

		return job;
	} catch (error) {
		console.error('Error fetching job:', error);
		throw error;
	}
};

/**
 * Get jobs by company ID
 * @param {string} companyId - Company ID
 * @returns {Promise<Array>}
 */
export const getJobsByCompany = async (companyId) => {
	try {
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);
		return jobs.filter((job) => job.companyId === companyId);
	} catch (error) {
		console.error('Error fetching company jobs:', error);
		throw error;
	}
};

/**
 * Get newest jobs
 * @param {number} limit - Number of jobs to return
 * @returns {Promise<Array>}
 */
export const getNewestJobs = async (limit = 6) => {
	try {
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);
		return jobs
			.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
			.slice(0, limit);
	} catch (error) {
		console.error('Error fetching newest jobs:', error);
		throw error;
	}
};

/**
 * Get featured jobs
 * @param {number} limit - Number of jobs to return
 * @returns {Promise<Array>}
 */
export const getFeaturedJobs = async (limit = 6) => {
	try {
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);
		return jobs.filter((job) => job.featured).slice(0, limit);
	} catch (error) {
		console.error('Error fetching featured jobs:', error);
		throw error;
	}
};

/**
 * Get similar jobs
 * @param {number} jobId - Current job ID
 * @param {number} limit - Number of jobs to return
 * @returns {Promise<Array>}
 */
export const getSimilarJobs = async (jobId, limit = 3) => {
	try {
		const jobs = await http.get(`${BASE_PATH}/jobs.json`);
		const currentJob = jobs.find((j) => j.id === parseInt(jobId));

		if (!currentJob) {
			return [];
		}

		// Find jobs with similar tags or category
		return jobs
			.filter((job) => job.id !== currentJob.id)
			.filter(
				(job) =>
					job.category === currentJob.category ||
					job.tags?.some((tag) => currentJob.tags?.includes(tag))
			)
			.slice(0, limit);
	} catch (error) {
		console.error('Error fetching similar jobs:', error);
		throw error;
	}
};

/**
 * Search jobs
 * @param {string} query - Search query
 * @returns {Promise<Array>}
 */
export const searchJobs = async (query) => {
	return getJobs({ keyword: query });
};

/**
 * Sort jobs
 * @param {Array} jobs - Jobs array
 * @param {string} sortBy - Sort field
 * @param {string} sortOrder - Sort order (asc/desc)
 * @returns {Array}
 */
const sortJobs = (jobs, sortBy, sortOrder = 'desc') => {
	const sorted = [...jobs];

	sorted.sort((a, b) => {
		let aValue, bValue;

		switch (sortBy) {
			case 'date':
			case 'newest':
				aValue = new Date(a.postedAt);
				bValue = new Date(b.postedAt);
				break;

			case 'salary':
				aValue = a.salary?.max || 0;
				bValue = b.salary?.max || 0;
				break;

			case 'title':
				aValue = a.title.toLowerCase();
				bValue = b.title.toLowerCase();
				break;

			default:
				return 0;
		}

		if (sortOrder === 'asc') {
			return aValue > bValue ? 1 : -1;
		} else {
			return aValue < bValue ? 1 : -1;
		}
	});

	return sorted;
};

/**
 * Mock: Create job (for employer)
 * @param {Object} jobData - Job data
 * @returns {Promise<Object>}
 */
export const createJob = async (jobData) => {
	// Mock implementation - in real app would POST to API
	console.log('Creating job:', jobData);

	return {
		success: true,
		message: 'Job posted successfully',
		data: {
			id: Date.now(),
			...jobData,
			postedAt: new Date().toISOString(),
		},
	};
};

/**
 * Mock: Update job
 * @param {number} id - Job ID
 * @param {Object} updates - Job updates
 * @returns {Promise<Object>}
 */
export const updateJob = async (id, updates) => {
	// Mock implementation
	console.log('Updating job:', id, updates);

	return {
		success: true,
		message: 'Job updated successfully',
		data: { id, ...updates },
	};
};

/**
 * Mock: Delete job
 * @param {number} id - Job ID
 * @returns {Promise<Object>}
 */
export const deleteJob = async (id) => {
	// Mock implementation
	console.log('Deleting job:', id);

	return {
		success: true,
		message: 'Job deleted successfully',
	};
};

export default {
	getJobs,
	getJobById,
	getJobsByCompany,
	getNewestJobs,
	getFeaturedJobs,
	getSimilarJobs,
	searchJobs,
	createJob,
	updateJob,
	deleteJob,
};
