/**
 * Blog API
 * API layer for blog/articles data
 */

import http from './http.js';

const BASE_PATH = '/public/assets/data';

/**
 * Get all blog posts
 * @param {Object} options - Query options
 * @returns {Promise<Object>}
 */
export const getBlogPosts = async (options = {}) => {
	try {
		const {
			filter = {},
			sort = 'date',
			order = 'desc',
			page = 1,
			limit = 10,
		} = options;

		const posts = await http.get(`${BASE_PATH}/blogs.json`);

		let filtered = posts;

		// Apply filters
		if (filter.category) {
			filtered = filtered.filter((p) => p.category === filter.category);
		}

		if (filter.author) {
			filtered = filtered.filter((p) => p.author === filter.author);
		}

		if (filter.tag) {
			filtered = filtered.filter((p) => p.tags && p.tags.includes(filter.tag));
		}

		if (filter.search) {
			const searchLower = filter.search.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.title.toLowerCase().includes(searchLower) ||
					p.excerpt.toLowerCase().includes(searchLower) ||
					(p.content && p.content.toLowerCase().includes(searchLower))
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
		console.error('Error fetching blog posts:', error);
		throw error;
	}
};

/**
 * Get blog post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object>}
 */
export const getBlogPostById = async (id) => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const post = posts.find((p) => p.id === parseInt(id));

		if (!post) {
			throw new Error(`Blog post with ID ${id} not found`);
		}

		return post;
	} catch (error) {
		console.error(`Error fetching blog post ${id}:`, error);
		throw error;
	}
};

/**
 * Get blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>}
 */
export const getBlogPostBySlug = async (slug) => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const post = posts.find((p) => p.slug === slug);

		if (!post) {
			throw new Error(`Blog post with slug "${slug}" not found`);
		}

		return post;
	} catch (error) {
		console.error(`Error fetching blog post "${slug}":`, error);
		throw error;
	}
};

/**
 * Get featured blog posts
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>}
 */
export const getFeaturedPosts = async (limit = 3) => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const featured = posts.filter((p) => p.featured);
		return featured.slice(0, limit);
	} catch (error) {
		console.error('Error fetching featured posts:', error);
		throw error;
	}
};

/**
 * Get recent blog posts
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>}
 */
export const getRecentPosts = async (limit = 5) => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
		return sorted.slice(0, limit);
	} catch (error) {
		console.error('Error fetching recent posts:', error);
		throw error;
	}
};

/**
 * Get related blog posts
 * @param {number} postId - Current post ID
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>}
 */
export const getRelatedPosts = async (postId, limit = 3) => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const currentPost = posts.find((p) => p.id === parseInt(postId));

		if (!currentPost) {
			return [];
		}

		// Find posts with matching category or tags
		const related = posts
			.filter((p) => p.id !== parseInt(postId))
			.filter((p) => {
				const matchesCategory = p.category === currentPost.category;
				const matchesTags =
					p.tags &&
					currentPost.tags &&
					p.tags.some((tag) => currentPost.tags.includes(tag));
				return matchesCategory || matchesTags;
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, limit);

		return related;
	} catch (error) {
		console.error('Error fetching related posts:', error);
		throw error;
	}
};

/**
 * Get all blog categories
 * @returns {Promise<Array<string>>}
 */
export const getCategories = async () => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const categories = [...new Set(posts.map((p) => p.category))].sort();
		return categories;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

/**
 * Get all blog tags
 * @returns {Promise<Array<string>>}
 */
export const getTags = async () => {
	try {
		const posts = await http.get(`${BASE_PATH}/blogs.json`);
		const allTags = posts.reduce((acc, post) => {
			if (post.tags) {
				acc.push(...post.tags);
			}
			return acc;
		}, []);
		const uniqueTags = [...new Set(allTags)].sort();
		return uniqueTags;
	} catch (error) {
		console.error('Error fetching tags:', error);
		throw error;
	}
};

/**
 * Get posts by category
 * @param {string} category - Category name
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>}
 */
export const getPostsByCategory = async (category, limit = 10) => {
	try {
		const result = await getBlogPosts({
			filter: { category },
			limit,
		});
		return result.data;
	} catch (error) {
		console.error(`Error fetching posts for category "${category}":`, error);
		throw error;
	}
};

/**
 * Get posts by tag
 * @param {string} tag - Tag name
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>}
 */
export const getPostsByTag = async (tag, limit = 10) => {
	try {
		const result = await getBlogPosts({
			filter: { tag },
			limit,
		});
		return result.data;
	} catch (error) {
		console.error(`Error fetching posts for tag "${tag}":`, error);
		throw error;
	}
};

/**
 * Search blog posts
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>}
 */
export const searchPosts = async (query, options = {}) => {
	try {
		const { limit = 10 } = options;

		const result = await getBlogPosts({
			filter: { search: query },
			limit,
		});

		return result.data;
	} catch (error) {
		console.error('Error searching blog posts:', error);
		throw error;
	}
};

/**
 * Mock: Increment view count
 * @param {number} postId - Post ID
 * @returns {Promise<number>}
 */
export const incrementViewCount = async (postId) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 100));

		const post = await getBlogPostById(postId);
		const newViewCount = (post.views || 0) + 1;

		console.log(`View count for post ${postId}: ${newViewCount}`);

		return newViewCount;
	} catch (error) {
		console.error('Error incrementing view count:', error);
		throw error;
	}
};

/**
 * Mock: Like a blog post
 * @param {number} postId - Post ID
 * @returns {Promise<number>}
 */
export const likePost = async (postId) => {
	try {
		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 200));

		const post = await getBlogPostById(postId);
		const newLikeCount = (post.likes || 0) + 1;

		console.log(`Like count for post ${postId}: ${newLikeCount}`);

		return newLikeCount;
	} catch (error) {
		console.error('Error liking post:', error);
		throw error;
	}
};

export default {
	getBlogPosts,
	getBlogPostById,
	getBlogPostBySlug,
	getFeaturedPosts,
	getRecentPosts,
	getRelatedPosts,
	getCategories,
	getTags,
	getPostsByCategory,
	getPostsByTag,
	searchPosts,
	incrementViewCount,
	likePost,
};
