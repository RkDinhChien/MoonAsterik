// ===========================
// Formatters Module
// Utility functions for formatting data
// ===========================

/**
 * Format salary range
 * @param {Object} salary - Salary object with min, max, currency
 * @returns {string}
 */
export const formatSalary = (salary) => {
	if (!salary) return 'Negotiable';

	const { min, max, currency = 'VND', unit = 'month' } = salary;

	if (!min && !max) return 'Negotiable';

	const formatAmount = (amount) => {
		if (currency === 'VND') {
			// Convert to millions
			const millions = amount / 1000000;
			return `${millions.toFixed(0)}M`;
		}
		return new Intl.NumberFormat('vi-VN').format(amount);
	};

	if (min && max) {
		return `${formatAmount(min)} - ${formatAmount(max)} ${currency}/${unit}`;
	} else if (min) {
		return `From ${formatAmount(min)} ${currency}/${unit}`;
	} else {
		return `Up to ${formatAmount(max)} ${currency}/${unit}`;
	}
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type (relative, short, long)
 * @returns {string}
 */
export const formatDate = (date, format = 'relative') => {
	if (!date) return '';

	const d = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffMs = now - d;
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (format === 'relative') {
		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
		return `${Math.floor(diffDays / 365)} years ago`;
	}

	if (format === 'short') {
		return d.toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}

	if (format === 'long') {
		return d.toLocaleDateString('vi-VN', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	}

	return d.toLocaleDateString('vi-VN');
};

/**
 * Format location
 * @param {Object} location - Location object with city, country
 * @returns {string}
 */
export const formatLocation = (location) => {
	if (!location) return 'Remote';

	if (typeof location === 'string') return location;

	const { city, country, geo } = location;

	if (city && country) {
		return `${city}, ${country}`;
	}

	return city || country || 'Remote';
};

/**
 * Pluralize word
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional)
 * @returns {string}
 */
export const pluralize = (count, singular, plural) => {
	if (count === 1) return singular;
	return plural || `${singular}s`;
};

/**
 * Truncate string
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string}
 */
export const truncate = (str, maxLength = 100, suffix = '...') => {
	if (!str || str.length <= maxLength) return str;
	return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string}
 */
export const formatPhone = (phone) => {
	if (!phone) return '';

	// Remove all non-digits
	const digits = phone.replace(/\D/g, '');

	// Vietnam phone format: +84 xxx xxx xxxx
	if (digits.startsWith('84') && digits.length === 11) {
		return `+84 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
	}

	// Local format: 0xxx xxx xxx
	if (digits.startsWith('0') && digits.length === 10) {
		return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
	}

	return phone;
};

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @param {string} locale - Locale (default: 'vi-VN')
 * @returns {string}
 */
export const formatNumber = (num, locale = 'vi-VN') => {
	if (num === null || num === undefined) return '';
	return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Decimal places
 * @returns {string}
 */
export const formatPercent = (value, decimals = 0) => {
	if (value === null || value === undefined) return '';
	return `${value.toFixed(decimals)}%`;
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format duration (seconds to readable format)
 * @param {number} seconds - Duration in seconds
 * @returns {string}
 */
export const formatDuration = (seconds) => {
	if (!seconds) return '0:00';

	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);

	return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string}
 */
export const getInitials = (name) => {
	if (!name) return '';

	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string}
 */
export const capitalize = (str) => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to title case
 * @param {string} str - String to convert
 * @returns {string}
 */
export const toTitleCase = (str) => {
	if (!str) return '';
	return str.split(' ').map(capitalize).join(' ');
};

/**
 * Generate slug from string
 * @param {string} str - String to slugify
 * @returns {string}
 */
export const slugify = (str) => {
	if (!str) return '';

	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start
		.replace(/-+$/, ''); // Trim - from end
};

export default {
	formatSalary,
	formatDate,
	formatLocation,
	pluralize,
	truncate,
	formatPhone,
	formatNumber,
	formatPercent,
	formatFileSize,
	formatDuration,
	getInitials,
	capitalize,
	toTitleCase,
	slugify,
};
