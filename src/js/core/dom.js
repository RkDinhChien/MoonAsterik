// ===========================
// DOM Utility Module
// Helper functions for DOM manipulation
// ===========================

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null}
 */
export const qs = (selector, context = document) => {
	return context.querySelector(selector);
};

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList}
 */
export const qsa = (selector, context = document) => {
	return context.querySelectorAll(selector);
};

/**
 * Create an element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Element attributes
 * @param {Array|string} children - Child elements or text
 * @returns {Element}
 */
export const createElement = (tag, attrs = {}, children = []) => {
	const element = document.createElement(tag);

	// Set attributes
	Object.entries(attrs).forEach(([key, value]) => {
		if (key === 'className') {
			element.className = value;
		} else if (key === 'dataset') {
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue;
			});
		} else if (key.startsWith('on') && typeof value === 'function') {
			const eventName = key.substring(2).toLowerCase();
			element.addEventListener(eventName, value);
		} else {
			element.setAttribute(key, value);
		}
	});

	// Append children
	if (typeof children === 'string') {
		element.textContent = children;
	} else if (Array.isArray(children)) {
		children.forEach((child) => {
			if (typeof child === 'string') {
				element.appendChild(document.createTextNode(child));
			} else if (child instanceof Element) {
				element.appendChild(child);
			}
		});
	}

	return element;
};

/**
 * Render HTML string or element into a container
 * @param {Element} container - Container element
 * @param {string|Element} content - HTML string or Element
 */
export const render = (container, content) => {
	if (!container) return;

	if (typeof content === 'string') {
		container.innerHTML = content;
	} else if (content instanceof Element) {
		container.innerHTML = '';
		container.appendChild(content);
	}
};

/**
 * Add event listener with delegation
 * @param {Element} parent - Parent element
 * @param {string} eventType - Event type
 * @param {string} selector - Child selector
 * @param {Function} handler - Event handler
 */
export const delegate = (parent, eventType, selector, handler) => {
	parent.addEventListener(eventType, (e) => {
		const target = e.target.closest(selector);
		if (target) {
			handler.call(target, e);
		}
	});
};

/**
 * Toggle class on element
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add/remove
 */
export const toggleClass = (element, className, force) => {
	if (!element) return;
	element.classList.toggle(className, force);
};

/**
 * Add class to element
 * @param {Element} element - Target element
 * @param {...string} classNames - Class names to add
 */
export const addClass = (element, ...classNames) => {
	if (!element) return;
	element.classList.add(...classNames);
};

/**
 * Remove class from element
 * @param {Element} element - Target element
 * @param {...string} classNames - Class names to remove
 */
export const removeClass = (element, ...classNames) => {
	if (!element) return;
	element.classList.remove(...classNames);
};

/**
 * Check if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export const hasClass = (element, className) => {
	if (!element) return false;
	return element.classList.contains(className);
};

/**
 * Get element's data attribute
 * @param {Element} element - Target element
 * @param {string} key - Data attribute key
 * @returns {string|null}
 */
export const getData = (element, key) => {
	if (!element) return null;
	return element.dataset[key];
};

/**
 * Set element's data attribute
 * @param {Element} element - Target element
 * @param {string} key - Data attribute key
 * @param {string} value - Data attribute value
 */
export const setData = (element, key, value) => {
	if (!element) return;
	element.dataset[key] = value;
};

/**
 * Show element
 * @param {Element} element - Target element
 */
export const show = (element) => {
	if (!element) return;
	element.style.display = '';
	removeClass(element, 'hidden');
};

/**
 * Hide element
 * @param {Element} element - Target element
 */
export const hide = (element) => {
	if (!element) return;
	addClass(element, 'hidden');
};

/**
 * Check if element is visible
 * @param {Element} element - Target element
 * @returns {boolean}
 */
export const isVisible = (element) => {
	if (!element) return false;
	return element.offsetParent !== null && !hasClass(element, 'hidden');
};

/**
 * Scroll to element smoothly
 * @param {Element} element - Target element
 * @param {Object} options - Scroll options
 */
export const scrollTo = (element, options = {}) => {
	if (!element) return;

	const defaultOptions = {
		behavior: 'smooth',
		block: 'start',
		inline: 'nearest',
	};

	element.scrollIntoView({ ...defaultOptions, ...options });
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
	let inThrottle;
	return function executedFunction(...args) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

export default {
	qs,
	qsa,
	createElement,
	render,
	delegate,
	toggleClass,
	addClass,
	removeClass,
	hasClass,
	getData,
	setData,
	show,
	hide,
	isVisible,
	scrollTo,
	debounce,
	throttle,
};
