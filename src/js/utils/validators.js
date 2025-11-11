// ===========================
// Validators Module
// Form validation utilities
// ===========================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
	if (!email || email.trim() === '') {
		return { isValid: false, error: 'Email is required' };
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		return { isValid: false, error: 'Please enter a valid email address' };
	}

	return { isValid: true, error: null };
};

/**
 * Validate phone number (Vietnam format)
 * @param {string} phone - Phone number to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePhone = (phone) => {
	if (!phone || phone.trim() === '') {
		return { isValid: false, error: 'Phone number is required' };
	}

	// Remove all non-digits
	const digits = phone.replace(/\D/g, '');

	// Vietnam phone: 10 digits starting with 0, or 11 digits starting with 84
	const phoneRegex = /^(0[3|5|7|8|9]\d{8}|84[3|5|7|8|9]\d{8})$/;

	if (!phoneRegex.test(digits)) {
		return {
			isValid: false,
			error: 'Please enter a valid Vietnamese phone number',
		};
	}

	return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @param {Object} options - Validation options
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePassword = (password, options = {}) => {
	const {
		minLength = 8,
		requireUppercase = true,
		requireLowercase = true,
		requireNumber = true,
		requireSpecial = false,
	} = options;

	if (!password || password.trim() === '') {
		return { isValid: false, error: 'Password is required' };
	}

	if (password.length < minLength) {
		return {
			isValid: false,
			error: `Password must be at least ${minLength} characters`,
		};
	}

	if (requireUppercase && !/[A-Z]/.test(password)) {
		return {
			isValid: false,
			error: 'Password must contain at least one uppercase letter',
		};
	}

	if (requireLowercase && !/[a-z]/.test(password)) {
		return {
			isValid: false,
			error: 'Password must contain at least one lowercase letter',
		};
	}

	if (requireNumber && !/\d/.test(password)) {
		return {
			isValid: false,
			error: 'Password must contain at least one number',
		};
	}

	if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return {
			isValid: false,
			error: 'Password must contain at least one special character',
		};
	}

	return { isValid: true, error: null };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = 'This field') => {
	if (
		value === null ||
		value === undefined ||
		value === '' ||
		(Array.isArray(value) && value.length === 0)
	) {
		return { isValid: false, error: `${fieldName} is required` };
	}

	return { isValid: true, error: null };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateURL = (url) => {
	if (!url || url.trim() === '') {
		return { isValid: false, error: 'URL is required' };
	}

	try {
		new URL(url);
		return { isValid: true, error: null };
	} catch {
		return { isValid: false, error: 'Please enter a valid URL' };
	}
};

/**
 * Validate file
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateFile = (file, options = {}) => {
	const {
		maxSize = 5 * 1024 * 1024, // 5MB default
		allowedTypes = [],
		allowedExtensions = [],
	} = options;

	if (!file) {
		return { isValid: false, error: 'Please select a file' };
	}

	// Check file size
	if (file.size > maxSize) {
		const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
		return {
			isValid: false,
			error: `File size must be less than ${maxSizeMB}MB`,
		};
	}

	// Check file type
	if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
		return {
			isValid: false,
			error: `File type must be one of: ${allowedTypes.join(', ')}`,
		};
	}

	// Check file extension
	if (allowedExtensions.length > 0) {
		const extension = file.name.split('.').pop().toLowerCase();
		if (!allowedExtensions.includes(extension)) {
			return {
				isValid: false,
				error: `File extension must be one of: ${allowedExtensions.join(', ')}`,
			};
		}
	}

	return { isValid: true, error: null };
};

/**
 * Validate CV file
 * @param {File} file - CV file to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateCV = (file) => {
	return validateFile(file, {
		maxSize: 10 * 1024 * 1024, // 10MB
		allowedTypes: [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		],
		allowedExtensions: ['pdf', 'doc', 'docx'],
	});
};

/**
 * Validate audio file
 * @param {File} file - Audio file to validate
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateAudio = (file) => {
	return validateFile(file, {
		maxSize: 10 * 1024 * 1024, // 10MB
		allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a'],
		allowedExtensions: ['mp3', 'wav', 'm4a', 'mp4'],
	});
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateRange = (value, min, max) => {
	const num = Number(value);

	if (isNaN(num)) {
		return { isValid: false, error: 'Please enter a valid number' };
	}

	if (num < min) {
		return { isValid: false, error: `Value must be at least ${min}` };
	}

	if (num > max) {
		return { isValid: false, error: `Value must be at most ${max}` };
	}

	return { isValid: true, error: null };
};

/**
 * Validate date
 * @param {string} dateStr - Date string to validate
 * @param {Object} options - Validation options
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateDate = (dateStr, options = {}) => {
	const { minDate, maxDate, futureOnly = false, pastOnly = false } = options;

	if (!dateStr) {
		return { isValid: false, error: 'Date is required' };
	}

	const date = new Date(dateStr);

	if (isNaN(date.getTime())) {
		return { isValid: false, error: 'Please enter a valid date' };
	}

	const now = new Date();

	if (futureOnly && date < now) {
		return { isValid: false, error: 'Date must be in the future' };
	}

	if (pastOnly && date > now) {
		return { isValid: false, error: 'Date must be in the past' };
	}

	if (minDate && date < new Date(minDate)) {
		return { isValid: false, error: `Date must be after ${minDate}` };
	}

	if (maxDate && date > new Date(maxDate)) {
		return { isValid: false, error: `Date must be before ${maxDate}` };
	}

	return { isValid: true, error: null };
};

/**
 * Validate form
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateForm = (formData, rules) => {
	const errors = {};
	let isValid = true;

	Object.entries(rules).forEach(([field, validators]) => {
		const value = formData[field];

		for (const validator of validators) {
			const result = validator(value);
			if (!result.isValid) {
				errors[field] = result.error;
				isValid = false;
				break; // Stop at first error for this field
			}
		}
	});

	return { isValid, errors };
};

/**
 * Validate job posting
 * @param {Object} jobData - Job posting data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const isValidJobPosting = (jobData) => {
	const rules = {
		title: [
			(v) => validateRequired(v, 'Job title'),
			(v) =>
				v && v.length >= 5
					? { isValid: true }
					: {
							isValid: false,
							error: 'Job title must be at least 5 characters',
					  },
		],
		description: [
			(v) => validateRequired(v, 'Job description'),
			(v) =>
				v && v.length >= 50
					? { isValid: true }
					: {
							isValid: false,
							error: 'Job description must be at least 50 characters',
					  },
		],
		location: [(v) => validateRequired(v, 'Location')],
		type: [(v) => validateRequired(v, 'Employment type')],
		experienceLevel: [(v) => validateRequired(v, 'Experience level')],
	};

	return validateForm(jobData, rules);
};

/**
 * Validate student profile
 * @param {Object} profileData - Profile data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const isValidProfile = (profileData) => {
	const rules = {
		name: [(v) => validateRequired(v, 'Name')],
		email: [(v) => validateRequired(v, 'Email'), validateEmail],
		phone: [(v) => validateRequired(v, 'Phone'), validatePhone],
		school: [(v) => validateRequired(v, 'School')],
		major: [(v) => validateRequired(v, 'Major')],
		graduationYear: [
			(v) => validateRequired(v, 'Graduation year'),
			(v) => validateRange(v, 2020, 2030),
		],
	};

	return validateForm(profileData, rules);
};

export default {
	validateEmail,
	validatePhone,
	validatePassword,
	validateRequired,
	validateURL,
	validateFile,
	validateCV,
	validateAudio,
	validateRange,
	validateDate,
	validateForm,
	isValidJobPosting,
	isValidProfile,
};
