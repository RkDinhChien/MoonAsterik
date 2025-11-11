/**
 * Pagination Component
 * Reusable pagination controls
 */

import { paginationTemplate } from '../utils/templates.js';

/**
 * Render pagination
 * @param {Object} options - Pagination options
 * @returns {string} - HTML string
 */
export const render = (options = {}) => {
	const {
		currentPage = 1,
		totalPages = 1,
		totalItems = 0,
		itemsPerPage = 10,
		onPageChange = null,
		showInfo = true,
		maxVisible = 7,
	} = options;

	return paginationTemplate({
		currentPage,
		totalPages,
		totalItems,
		itemsPerPage,
		showInfo,
		maxVisible,
	});
};

/**
 * Initialize pagination interactions
 * @param {HTMLElement} element - Pagination element
 * @param {Function} onPageChange - Callback when page changes
 */
export const init = (element, onPageChange) => {
	if (!element || typeof onPageChange !== 'function') return;

	// Page buttons
	const pageButtons = element.querySelectorAll('[data-page]');
	pageButtons.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const page = parseInt(btn.getAttribute('data-page'));
			if (!isNaN(page)) {
				onPageChange(page);
			}
		});
	});

	// Previous button
	const prevBtn = element.querySelector('[data-action="prev"]');
	if (prevBtn) {
		prevBtn.addEventListener('click', (e) => {
			e.preventDefault();
			const currentPage =
				parseInt(element.getAttribute('data-current-page')) || 1;
			if (currentPage > 1) {
				onPageChange(currentPage - 1);
			}
		});
	}

	// Next button
	const nextBtn = element.querySelector('[data-action="next"]');
	if (nextBtn) {
		nextBtn.addEventListener('click', (e) => {
			e.preventDefault();
			const currentPage =
				parseInt(element.getAttribute('data-current-page')) || 1;
			const totalPages =
				parseInt(element.getAttribute('data-total-pages')) || 1;
			if (currentPage < totalPages) {
				onPageChange(currentPage + 1);
			}
		});
	}

	// Store callback
	element._onPageChange = onPageChange;
};

/**
 * Update pagination
 * @param {HTMLElement} element - Pagination element
 * @param {Object} options - New pagination options
 */
export const update = (element, options) => {
	if (!element) return;

	const newHtml = render(options);
	element.outerHTML = newHtml;

	// Re-initialize
	const newElement = document.querySelector('.pagination');
	if (newElement && element._onPageChange) {
		init(newElement, element._onPageChange);
	}
};

/**
 * Calculate pagination info
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Items per page
 * @param {number} totalItems - Total items
 * @returns {Object} - Pagination info
 */
export const calculatePagination = (currentPage, itemsPerPage, totalItems) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const start = (currentPage - 1) * itemsPerPage + 1;
	const end = Math.min(currentPage * itemsPerPage, totalItems);

	return {
		currentPage,
		totalPages,
		totalItems,
		itemsPerPage,
		start,
		end,
		hasNext: currentPage < totalPages,
		hasPrev: currentPage > 1,
	};
};

/**
 * Get page range to display
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxVisible - Max visible pages
 * @returns {Array} - Array of page numbers
 */
export const getPageRange = (currentPage, totalPages, maxVisible = 7) => {
	if (totalPages <= maxVisible) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const halfVisible = Math.floor(maxVisible / 2);
	let start = currentPage - halfVisible;
	let end = currentPage + halfVisible;

	if (start < 1) {
		start = 1;
		end = maxVisible;
	}

	if (end > totalPages) {
		end = totalPages;
		start = totalPages - maxVisible + 1;
	}

	const pages = [];

	// Always show first page
	if (start > 1) {
		pages.push(1);
		if (start > 2) {
			pages.push('...');
		}
	}

	// Show range
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	// Always show last page
	if (end < totalPages) {
		if (end < totalPages - 1) {
			pages.push('...');
		}
		pages.push(totalPages);
	}

	return pages;
};

export default {
	render,
	init,
	update,
	calculatePagination,
	getPageRange,
};
