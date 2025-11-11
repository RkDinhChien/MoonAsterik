/**
 * Companies API
 * API layer for companies/employers data
 */

import http from './http.js';

const BASE_PATH = '/public/assets/data';

/**
 * Get all companies
 * @param {Object} options - Query options (filters, sorting, pagination)
 * @returns {Promise<Array>}
 */
export const getCompanies = async (options = {}) => {
	try {
		const {
			filter = {},
			sort = 'name',
			order = 'asc',
			page = 1,
			limit = 20,
		} = options;

		const companies = await http.get(`${BASE_PATH}/companies.json`);

		let filtered = companies;

		// Apply filters
		if (filter.industry) {
			filtered = filtered.filter((c) => c.industry === filter.industry);
		}

		if (filter.location) {
			filtered = filtered.filter((c) =>
				c.location.toLowerCase().includes(filter.location.toLowerCase())
			);
		}

		if (filter.size) {
			filtered = filtered.filter((c) => c.size === filter.size);
		}

		if (filter.search) {
			const searchLower = filter.search.toLowerCase();
			filtered = filtered.filter(
				(c) =>
					c.name.toLowerCase().includes(searchLower) ||
					c.description.toLowerCase().includes(searchLower)
			);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			let aVal = a[sort];
			let bVal = b[sort];

			if (typeof aVal === 'string') {
				aVal = aVal.toLowerCase();
				bVal = bVal.toLowerCase();
			}

			if (order === 'asc') {
				return aVal > bVal ? 1 : -1;
			} else {
				return aVal < bVal ? 1 : -1;
			}
		});

		// Apply pagination
		const start = (page - 1) * limit;
		const end = start + limit;
		const paginated = filtered.slice(start, end);

		return {
			data: paginated,
			pagination: {
				page,
				limit,
				total: filtered.length,
				totalPages: Math.ceil(filtered.length / limit),
			},
		};
	} catch (error) {
		console.error('Error fetching companies:', error);
		throw error;
	}
};

/**
 * Get company by ID
 * @param {number} id - Company ID
 * @returns {Promise<Object>}
 */
export const getCompanyById = async (id) => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const company = companies.find((c) => c.id === parseInt(id));

		if (!company) {
			throw new Error(`Company with ID ${id} not found`);
		}

		return company;
	} catch (error) {
		console.error(`Error fetching company ${id}:`, error);
		throw error;
	}
};

/**
 * Get company by slug
 * @param {string} slug - Company slug
 * @returns {Promise<Object>}
 */
export const getCompanyBySlug = async (slug) => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const company = companies.find((c) => c.slug === slug);

		if (!company) {
			throw new Error(`Company with slug "${slug}" not found`);
		}

		return company;
	} catch (error) {
		console.error(`Error fetching company "${slug}":`, error);
		throw error;
	}
};

/**
 * Get jobs for a specific company
 * @param {number} companyId - Company ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>}
 */
export const getCompanyJobs = async (companyId, options = {}) => {
	try {
		const {
			status = 'active',
			sort = 'postedDate',
			order = 'desc',
			limit = 10,
		} = options;

		const jobs = await http.get(`${BASE_PATH}/jobs.json`);

		let companyJobs = jobs.filter((j) => j.companyId === parseInt(companyId));

		if (status) {
			companyJobs = companyJobs.filter((j) => j.status === status);
		}

		// Sort
		companyJobs.sort((a, b) => {
			const aVal = a[sort];
			const bVal = b[sort];

			if (order === 'asc') {
				return aVal > bVal ? 1 : -1;
			} else {
				return aVal < bVal ? 1 : -1;
			}
		});

		// Limit results
		if (limit) {
			companyJobs = companyJobs.slice(0, limit);
		}

		return companyJobs;
	} catch (error) {
		console.error(`Error fetching jobs for company ${companyId}:`, error);
		throw error;
	}
};

/**
 * Get unique industries
 * @returns {Promise<Array<string>>}
 */
export const getIndustries = async () => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const industries = [...new Set(companies.map((c) => c.industry))].sort();
		return industries;
	} catch (error) {
		console.error('Error fetching industries:', error);
		throw error;
	}
};

/**
 * Get unique locations
 * @returns {Promise<Array<string>>}
 */
export const getLocations = async () => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const locations = [...new Set(companies.map((c) => c.location))].sort();
		return locations;
	} catch (error) {
		console.error('Error fetching locations:', error);
		throw error;
	}
};

/**
 * Get company sizes distribution
 * @returns {Promise<Object>}
 */
export const getCompanySizes = async () => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const sizes = companies.reduce((acc, c) => {
			acc[c.size] = (acc[c.size] || 0) + 1;
			return acc;
		}, {});
		return sizes;
	} catch (error) {
		console.error('Error fetching company sizes:', error);
		throw error;
	}
};

/**
 * Search companies
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>}
 */
export const searchCompanies = async (query, options = {}) => {
	try {
		const { limit = 20 } = options;

		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const queryLower = query.toLowerCase();

		const results = companies.filter(
			(c) =>
				c.name.toLowerCase().includes(queryLower) ||
				c.description.toLowerCase().includes(queryLower) ||
				c.industry.toLowerCase().includes(queryLower)
		);

		return results.slice(0, limit);
	} catch (error) {
		console.error('Error searching companies:', error);
		throw error;
	}
};

/**
 * Get featured companies
 * @param {number} limit - Number of companies to return
 * @returns {Promise<Array>}
 */
export const getFeaturedCompanies = async (limit = 6) => {
	try {
		const companies = await http.get(`${BASE_PATH}/companies.json`);
		const featured = companies.filter((c) => c.featured);
		return featured.slice(0, limit);
	} catch (error) {
		console.error('Error fetching featured companies:', error);
		throw error;
	}
};

/**
 * Mock: Create/update company profile (for employers)
 * @param {Object} companyData - Company data
 * @returns {Promise<Object>}
 */
export const updateCompanyProfile = async (companyData) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log('Company profile updated:', companyData);

		return {
			success: true,
			company: companyData,
		};
	} catch (error) {
		console.error('Error updating company profile:', error);
		throw error;
	}
};

export default {
	getCompanies,
	getCompanyById,
	getCompanyBySlug,
	getCompanyJobs,
	getIndustries,
	getLocations,
	getCompanySizes,
	searchCompanies,
	getFeaturedCompanies,
	updateCompanyProfile,
};
