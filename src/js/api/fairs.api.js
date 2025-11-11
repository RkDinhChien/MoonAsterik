/**
 * Fairs API
 * API layer for job fair/career fair data
 */

import http from './http.js';

const BASE_PATH = '/public/assets/data';

/**
 * Get all fairs
 * @param {Object} options - Query options
 * @returns {Promise<Object>}
 */
export const getFairs = async (options = {}) => {
	try {
		const {
			filter = {},
			sort = 'date',
			order = 'asc',
			page = 1,
			limit = 10,
		} = options;

		const fairs = await http.get(`${BASE_PATH}/fairs.json`);

		let filtered = fairs;

		// Apply filters
		if (filter.type) {
			filtered = filtered.filter((f) => f.type === filter.type);
		}

		if (filter.status) {
			filtered = filtered.filter((f) => f.status === filter.status);
		}

		if (filter.location) {
			filtered = filtered.filter((f) =>
				f.location.toLowerCase().includes(filter.location.toLowerCase())
			);
		}

		if (filter.upcoming) {
			const now = new Date();
			filtered = filtered.filter((f) => new Date(f.date) > now);
		}

		if (filter.search) {
			const searchLower = filter.search.toLowerCase();
			filtered = filtered.filter(
				(f) =>
					f.name.toLowerCase().includes(searchLower) ||
					f.description.toLowerCase().includes(searchLower)
			);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			let aVal = a[sort];
			let bVal = b[sort];

			if (sort === 'date') {
				aVal = new Date(aVal);
				bVal = new Date(bVal);
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
		console.error('Error fetching fairs:', error);
		throw error;
	}
};

/**
 * Get fair by ID
 * @param {number} id - Fair ID
 * @returns {Promise<Object>}
 */
export const getFairById = async (id) => {
	try {
		const fairs = await http.get(`${BASE_PATH}/fairs.json`);
		const fair = fairs.find((f) => f.id === parseInt(id));

		if (!fair) {
			throw new Error(`Fair with ID ${id} not found`);
		}

		return fair;
	} catch (error) {
		console.error(`Error fetching fair ${id}:`, error);
		throw error;
	}
};

/**
 * Get fair by slug
 * @param {string} slug - Fair slug
 * @returns {Promise<Object>}
 */
export const getFairBySlug = async (slug) => {
	try {
		const fairs = await http.get(`${BASE_PATH}/fairs.json`);
		const fair = fairs.find(
			(f) => f.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
		);

		if (!fair) {
			throw new Error(`Fair with slug "${slug}" not found`);
		}

		return fair;
	} catch (error) {
		console.error(`Error fetching fair "${slug}":`, error);
		throw error;
	}
};

/**
 * Get upcoming fairs
 * @param {number} limit - Number of fairs to return
 * @returns {Promise<Array>}
 */
export const getUpcomingFairs = async (limit = 5) => {
	try {
		const fairs = await http.get(`${BASE_PATH}/fairs.json`);
		const now = new Date();

		const upcoming = fairs
			.filter((f) => new Date(f.date) > now)
			.sort((a, b) => new Date(a.date) - new Date(b.date))
			.slice(0, limit);

		return upcoming;
	} catch (error) {
		console.error('Error fetching upcoming fairs:', error);
		throw error;
	}
};

/**
 * Get past fairs
 * @param {number} limit - Number of fairs to return
 * @returns {Promise<Array>}
 */
export const getPastFairs = async (limit = 5) => {
	try {
		const fairs = await http.get(`${BASE_PATH}/fairs.json`);
		const now = new Date();

		const past = fairs
			.filter((f) => new Date(f.date) <= now)
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, limit);

		return past;
	} catch (error) {
		console.error('Error fetching past fairs:', error);
		throw error;
	}
};

/**
 * Get fair booths/exhibitors
 * @param {number} fairId - Fair ID
 * @returns {Promise<Array>}
 */
export const getFairBooths = async (fairId) => {
	try {
		const fair = await getFairById(fairId);
		return fair.booths || [];
	} catch (error) {
		console.error(`Error fetching booths for fair ${fairId}:`, error);
		throw error;
	}
};

/**
 * Get companies participating in a fair
 * @param {number} fairId - Fair ID
 * @returns {Promise<Array>}
 */
export const getFairCompanies = async (fairId) => {
	try {
		const booths = await getFairBooths(fairId);
		const companies = await http.get(`${BASE_PATH}/companies.json`);

		const fairCompanies = booths
			.map((booth) => {
				const company = companies.find((c) => c.id === booth.companyId);
				return {
					...company,
					boothNumber: booth.boothNumber,
					category: booth.category,
				};
			})
			.filter(Boolean);

		return fairCompanies;
	} catch (error) {
		console.error(`Error fetching companies for fair ${fairId}:`, error);
		throw error;
	}
};

/**
 * Mock: Register for a fair
 * @param {number} fairId - Fair ID
 * @param {Object} registrationData - Registration data
 * @returns {Promise<Object>}
 */
export const registerForFair = async (fairId, registrationData) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log('Registered for fair:', { fairId, ...registrationData });

		return {
			success: true,
			registrationId: Date.now(),
			fairId,
			...registrationData,
			registeredAt: new Date().toISOString(),
		};
	} catch (error) {
		console.error('Error registering for fair:', error);
		throw error;
	}
};

/**
 * Mock: Book a booth at a fair
 * @param {number} fairId - Fair ID
 * @param {Object} boothData - Booth booking data
 * @returns {Promise<Object>}
 */
export const bookBooth = async (fairId, boothData) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log('Booth booked:', { fairId, ...boothData });

		return {
			success: true,
			bookingId: Date.now(),
			fairId,
			...boothData,
			bookedAt: new Date().toISOString(),
		};
	} catch (error) {
		console.error('Error booking booth:', error);
		throw error;
	}
};

/**
 * Get fair statistics
 * @param {number} fairId - Fair ID
 * @returns {Promise<Object>}
 */
export const getFairStats = async (fairId) => {
	try {
		const fair = await getFairById(fairId);
		const booths = fair.booths || [];

		return {
			totalBooths: fair.boothCount || booths.length,
			occupiedBooths: booths.length,
			availableBooths: (fair.boothCount || booths.length) - booths.length,
			categories: [...new Set(booths.map((b) => b.category))],
			companies: booths.length,
		};
	} catch (error) {
		console.error(`Error fetching stats for fair ${fairId}:`, error);
		throw error;
	}
};

/**
 * Search fairs
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>}
 */
export const searchFairs = async (query, options = {}) => {
	try {
		const { limit = 10 } = options;

		const fairs = await http.get(`${BASE_PATH}/fairs.json`);
		const queryLower = query.toLowerCase();

		const results = fairs.filter(
			(f) =>
				f.name.toLowerCase().includes(queryLower) ||
				f.description.toLowerCase().includes(queryLower) ||
				f.location.toLowerCase().includes(queryLower)
		);

		return results.slice(0, limit);
	} catch (error) {
		console.error('Error searching fairs:', error);
		throw error;
	}
};

export default {
	getFairs,
	getFairById,
	getFairBySlug,
	getUpcomingFairs,
	getPastFairs,
	getFairBooths,
	getFairCompanies,
	registerForFair,
	bookBooth,
	getFairStats,
	searchFairs,
};
