/**
 * Candidates API
 * API layer for candidate/student profiles (for employer viewing)
 */

import http from './http.js';

const BASE_PATH = '/public/assets/data';

/**
 * Get all candidates
 * @param {Object} options - Query options (filters, sorting, pagination)
 * @returns {Promise<Object>}
 */
export const getCandidates = async (options = {}) => {
	try {
		const {
			filter = {},
			sort = 'matchScore',
			order = 'desc',
			page = 1,
			limit = 20,
		} = options;

		const candidates = await http.get(`${BASE_PATH}/candidates.json`);

		let filtered = candidates;

		// Apply filters
		if (filter.school) {
			filtered = filtered.filter((c) =>
				c.school.toLowerCase().includes(filter.school.toLowerCase())
			);
		}

		if (filter.major) {
			filtered = filtered.filter((c) =>
				c.major.toLowerCase().includes(filter.major.toLowerCase())
			);
		}

		if (filter.graduationYear) {
			filtered = filtered.filter(
				(c) => c.graduationYear === parseInt(filter.graduationYear)
			);
		}

		if (filter.skills && filter.skills.length > 0) {
			filtered = filtered.filter((c) =>
				filter.skills.some((skill) =>
					c.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
				)
			);
		}

		if (filter.minGpa) {
			filtered = filtered.filter((c) => c.gpa >= parseFloat(filter.minGpa));
		}

		if (filter.hasAudioIntro !== undefined) {
			filtered = filtered.filter(
				(c) => c.hasAudioIntro === filter.hasAudioIntro
			);
		}

		if (filter.minMatchScore) {
			filtered = filtered.filter(
				(c) => c.matchScore >= parseInt(filter.minMatchScore)
			);
		}

		if (filter.search) {
			const searchLower = filter.search.toLowerCase();
			filtered = filtered.filter(
				(c) =>
					c.name.toLowerCase().includes(searchLower) ||
					c.school.toLowerCase().includes(searchLower) ||
					c.major.toLowerCase().includes(searchLower) ||
					c.skills.some((s) => s.toLowerCase().includes(searchLower))
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
		console.error('Error fetching candidates:', error);
		throw error;
	}
};

/**
 * Get candidate by ID
 * @param {number} id - Candidate ID
 * @returns {Promise<Object>}
 */
export const getCandidateById = async (id) => {
	try {
		const candidates = await http.get(`${BASE_PATH}/candidates.json`);
		const candidate = candidates.find((c) => c.id === parseInt(id));

		if (!candidate) {
			throw new Error(`Candidate with ID ${id} not found`);
		}

		return candidate;
	} catch (error) {
		console.error(`Error fetching candidate ${id}:`, error);
		throw error;
	}
};

/**
 * Get candidates with audio intro
 * @param {number} limit - Number of candidates to return
 * @returns {Promise<Array>}
 */
export const getCandidatesWithAudio = async (limit = 10) => {
	try {
		const result = await getCandidates({
			filter: { hasAudioIntro: true },
			limit,
		});
		return result.data;
	} catch (error) {
		console.error('Error fetching candidates with audio:', error);
		throw error;
	}
};

/**
 * Get top-matched candidates
 * @param {number} minMatchScore - Minimum match score
 * @param {number} limit - Number of candidates to return
 * @returns {Promise<Array>}
 */
export const getTopMatchedCandidates = async (
	minMatchScore = 80,
	limit = 10
) => {
	try {
		const result = await getCandidates({
			filter: { minMatchScore },
			sort: 'matchScore',
			order: 'desc',
			limit,
		});
		return result.data;
	} catch (error) {
		console.error('Error fetching top matched candidates:', error);
		throw error;
	}
};

/**
 * Get candidates by skills
 * @param {Array<string>} skills - Required skills
 * @param {Object} options - Additional options
 * @returns {Promise<Array>}
 */
export const getCandidatesBySkills = async (skills, options = {}) => {
	try {
		const { limit = 20 } = options;

		const result = await getCandidates({
			filter: { skills },
			sort: 'matchScore',
			order: 'desc',
			limit,
		});

		return result.data;
	} catch (error) {
		console.error('Error fetching candidates by skills:', error);
		throw error;
	}
};

/**
 * Get candidates by school
 * @param {string} school - School name
 * @param {Object} options - Additional options
 * @returns {Promise<Array>}
 */
export const getCandidatesBySchool = async (school, options = {}) => {
	try {
		const { limit = 20 } = options;

		const result = await getCandidates({
			filter: { school },
			sort: 'gpa',
			order: 'desc',
			limit,
		});

		return result.data;
	} catch (error) {
		console.error('Error fetching candidates by school:', error);
		throw error;
	}
};

/**
 * Get candidates by graduation year
 * @param {number} year - Graduation year
 * @param {Object} options - Additional options
 * @returns {Promise<Array>}
 */
export const getCandidatesByGraduationYear = async (year, options = {}) => {
	try {
		const { limit = 20 } = options;

		const result = await getCandidates({
			filter: { graduationYear: year },
			sort: 'gpa',
			order: 'desc',
			limit,
		});

		return result.data;
	} catch (error) {
		console.error('Error fetching candidates by graduation year:', error);
		throw error;
	}
};

/**
 * Get unique schools
 * @returns {Promise<Array<string>>}
 */
export const getSchools = async () => {
	try {
		const candidates = await http.get(`${BASE_PATH}/candidates.json`);
		const schools = [...new Set(candidates.map((c) => c.school))].sort();
		return schools;
	} catch (error) {
		console.error('Error fetching schools:', error);
		throw error;
	}
};

/**
 * Get unique majors
 * @returns {Promise<Array<string>>}
 */
export const getMajors = async () => {
	try {
		const candidates = await http.get(`${BASE_PATH}/candidates.json`);
		const majors = [...new Set(candidates.map((c) => c.major))].sort();
		return majors;
	} catch (error) {
		console.error('Error fetching majors:', error);
		throw error;
	}
};

/**
 * Get all skills from candidates
 * @returns {Promise<Array<string>>}
 */
export const getAllSkills = async () => {
	try {
		const candidates = await http.get(`${BASE_PATH}/candidates.json`);
		const allSkills = candidates.reduce((acc, candidate) => {
			if (candidate.skills) {
				acc.push(...candidate.skills);
			}
			return acc;
		}, []);
		const uniqueSkills = [...new Set(allSkills)].sort();
		return uniqueSkills;
	} catch (error) {
		console.error('Error fetching skills:', error);
		throw error;
	}
};

/**
 * Search candidates
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>}
 */
export const searchCandidates = async (query, options = {}) => {
	try {
		const { limit = 20 } = options;

		const result = await getCandidates({
			filter: { search: query },
			limit,
		});

		return result.data;
	} catch (error) {
		console.error('Error searching candidates:', error);
		throw error;
	}
};

/**
 * Mock: Request candidate contact info
 * @param {number} candidateId - Candidate ID
 * @returns {Promise<Object>}
 */
export const requestCandidateContact = async (candidateId) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log(`Contact info requested for candidate ${candidateId}`);

		return {
			success: true,
			message: 'Contact request sent to candidate',
			candidateId,
			requestedAt: new Date().toISOString(),
		};
	} catch (error) {
		console.error('Error requesting candidate contact:', error);
		throw error;
	}
};

/**
 * Mock: Save candidate to shortlist
 * @param {number} candidateId - Candidate ID
 * @returns {Promise<Object>}
 */
export const saveToShortlist = async (candidateId) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 300));

		console.log(`Candidate ${candidateId} saved to shortlist`);

		return {
			success: true,
			candidateId,
			savedAt: new Date().toISOString(),
		};
	} catch (error) {
		console.error('Error saving candidate to shortlist:', error);
		throw error;
	}
};

/**
 * Mock: Invite candidate to apply
 * @param {number} candidateId - Candidate ID
 * @param {number} jobId - Job ID
 * @param {string} message - Invitation message
 * @returns {Promise<Object>}
 */
export const inviteCandidateToApply = async (candidateId, jobId, message) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		console.log('Invitation sent:', { candidateId, jobId, message });

		return {
			success: true,
			invitationId: Date.now(),
			candidateId,
			jobId,
			message,
			sentAt: new Date().toISOString(),
		};
	} catch (error) {
		console.error('Error inviting candidate:', error);
		throw error;
	}
};

export default {
	getCandidates,
	getCandidateById,
	getCandidatesWithAudio,
	getTopMatchedCandidates,
	getCandidatesBySkills,
	getCandidatesBySchool,
	getCandidatesByGraduationYear,
	getSchools,
	getMajors,
	getAllSkills,
	searchCandidates,
	requestCandidateContact,
	saveToShortlist,
	inviteCandidateToApply,
};
