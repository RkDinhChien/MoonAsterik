/**
 * Templates Utility
 * HTML template functions and safe HTML escaping
 */

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} unsafe - Unsafe HTML string
 * @returns {string} - Escaped HTML string
 */
export const escapeHtml = (unsafe) => {
	if (typeof unsafe !== 'string') return '';

	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

/**
 * Create HTML element from template string
 * @param {string} html - HTML string
 * @returns {HTMLElement}
 */
export const htmlToElement = (html) => {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content.firstChild;
};

/**
 * Create multiple HTML elements from template string
 * @param {string} html - HTML string
 * @returns {NodeList}
 */
export const htmlToElements = (html) => {
	const template = document.createElement('template');
	template.innerHTML = html.trim();
	return template.content.childNodes;
};

/**
 * Template literal tag for safe HTML
 * Usage: html`<div>${unsafeContent}</div>`
 * @param {Array} strings - Template strings
 * @param {...any} values - Template values
 * @returns {string}
 */
export const html = (strings, ...values) => {
	return strings.reduce((result, string, i) => {
		const value = values[i] || '';
		// Only escape non-HTML values (strings)
		const escaped =
			typeof value === 'string' && !value.startsWith('<')
				? escapeHtml(value)
				: value;
		return result + string + escaped;
	}, '');
};

/**
 * Conditional class helper
 * @param {Object} classes - Object with class names as keys and conditions as values
 * @returns {string} - Space-separated class names
 */
export const classNames = (classes) => {
	return Object.entries(classes)
		.filter(([_, condition]) => condition)
		.map(([className]) => className)
		.join(' ');
};

/**
 * Render template with data
 * @param {string} template - Template string with {{placeholder}}
 * @param {Object} data - Data object
 * @returns {string}
 */
export const renderTemplate = (template, data) => {
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return data[key] !== undefined ? escapeHtml(String(data[key])) : match;
	});
};

/**
 * Loading spinner template
 * @param {string} size - Size (sm, md, lg)
 * @returns {string}
 */
export const spinnerTemplate = (size = 'md') => {
	return `
    <div class="spinner spinner-${size}" role="status" aria-label="Loading">
      <span class="sr-only">Loading...</span>
    </div>
  `;
};

/**
 * Empty state template
 * @param {Object} options - Empty state options
 * @returns {string}
 */
export const emptyStateTemplate = (options = {}) => {
	const {
		icon = '📭',
		title = 'No data available',
		description = '',
		actionText = '',
		actionHref = '#',
	} = options;

	return `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <h3 class="empty-state-title">${escapeHtml(title)}</h3>
      ${
				description
					? `<p class="empty-state-description">${escapeHtml(description)}</p>`
					: ''
			}
      ${
				actionText
					? `
        <a href="${escapeHtml(actionHref)}" class="button button-primary">
          ${escapeHtml(actionText)}
        </a>
      `
					: ''
			}
    </div>
  `;
};

/**
 * Error message template
 * @param {Object} options - Error options
 * @returns {string}
 */
export const errorTemplate = (options = {}) => {
	const {
		title = 'Error',
		message = 'Something went wrong',
		retryAction = null,
	} = options;

	return `
    <div class="error-message" role="alert">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h4 class="error-title">${escapeHtml(title)}</h4>
        <p class="error-text">${escapeHtml(message)}</p>
        ${
					retryAction
						? `
          <button class="button button-outline button-sm" onclick="${escapeHtml(
						retryAction
					)}">
            Try Again
          </button>
        `
						: ''
				}
      </div>
    </div>
  `;
};

/**
 * Toast/notification template
 * @param {Object} options - Toast options
 * @returns {string}
 */
export const toastTemplate = (options = {}) => {
	const {
		type = 'info', // success, error, warning, info
		message = '',
		duration = 3000,
	} = options;

	const icons = {
		success: '✓',
		error: '✕',
		warning: '⚠',
		info: 'ℹ',
	};

	return `
    <div class="toast toast-${escapeHtml(type)}" data-duration="${duration}">
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-message">${escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    </div>
  `;
};

/**
 * Breadcrumb template
 * @param {Array} items - Breadcrumb items [{text, href}, ...]
 * @returns {string}
 */
export const breadcrumbTemplate = (items) => {
	if (!items || items.length === 0) return '';

	const breadcrumbItems = items
		.map((item, index) => {
			const isLast = index === items.length - 1;

			if (isLast) {
				return `<li class="breadcrumb-item active" aria-current="page">${escapeHtml(
					item.text
				)}</li>`;
			}

			return `<li class="breadcrumb-item"><a href="${escapeHtml(
				item.href
			)}">${escapeHtml(item.text)}</a></li>`;
		})
		.join('');

	return `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        ${breadcrumbItems}
      </ol>
    </nav>
  `;
};

/**
 * Pagination template
 * @param {Object} options - Pagination options
 * @returns {string}
 */
export const paginationTemplate = (options = {}) => {
	const {
		currentPage = 1,
		totalPages = 1,
		onPageChange = 'handlePageChange',
		maxVisiblePages = 5,
	} = options;

	if (totalPages <= 1) return '';

	const pages = [];
	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
	let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	// Previous button
	const prevDisabled = currentPage === 1 ? 'disabled' : '';
	pages.push(`
    <li class="pagination-item">
      <button class="pagination-link ${prevDisabled}" 
              onclick="${onPageChange}(${currentPage - 1})"
              ${prevDisabled ? 'disabled' : ''}
              aria-label="Previous page">
        &laquo;
      </button>
    </li>
  `);

	// First page
	if (startPage > 1) {
		pages.push(`
      <li class="pagination-item">
        <button class="pagination-link" onclick="${onPageChange}(1)">1</button>
      </li>
    `);
		if (startPage > 2) {
			pages.push(
				`<li class="pagination-item"><span class="pagination-ellipsis">...</span></li>`
			);
		}
	}

	// Page numbers
	for (let i = startPage; i <= endPage; i++) {
		const activeClass = i === currentPage ? 'active' : '';
		pages.push(`
      <li class="pagination-item">
        <button class="pagination-link ${activeClass}" 
                onclick="${onPageChange}(${i})"
                ${i === currentPage ? 'aria-current="page"' : ''}>
          ${i}
        </button>
      </li>
    `);
	}

	// Last page
	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			pages.push(
				`<li class="pagination-item"><span class="pagination-ellipsis">...</span></li>`
			);
		}
		pages.push(`
      <li class="pagination-item">
        <button class="pagination-link" onclick="${onPageChange}(${totalPages})">${totalPages}</button>
      </li>
    `);
	}

	// Next button
	const nextDisabled = currentPage === totalPages ? 'disabled' : '';
	pages.push(`
    <li class="pagination-item">
      <button class="pagination-link ${nextDisabled}" 
              onclick="${onPageChange}(${currentPage + 1})"
              ${nextDisabled ? 'disabled' : ''}
              aria-label="Next page">
        &raquo;
      </button>
    </li>
  `);

	return `
    <nav aria-label="Pagination">
      <ul class="pagination">
        ${pages.join('')}
      </ul>
    </nav>
  `;
};

/**
 * Badge template
 * @param {string} text - Badge text
 * @param {string} variant - Badge variant (primary, success, warning, danger, info)
 * @returns {string}
 */
export const badgeTemplate = (text, variant = 'primary') => {
	return `<span class="badge badge-${escapeHtml(variant)}">${escapeHtml(
		text
	)}</span>`;
};

/**
 * Avatar template
 * @param {Object} options - Avatar options
 * @returns {string}
 */
export const avatarTemplate = (options = {}) => {
	const {
		src = '',
		alt = 'Avatar',
		name = '',
		size = 'md', // sm, md, lg, xl
		fallbackColor = '#2196F3',
	} = options;

	if (src) {
		return `<img src="${escapeHtml(src)}" alt="${escapeHtml(
			alt
		)}" class="avatar avatar-${escapeHtml(size)}">`;
	}

	// Generate initials from name
	const initials = name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return `
    <div class="avatar avatar-${escapeHtml(size)} avatar-fallback" 
         style="background-color: ${escapeHtml(fallbackColor)}">
      ${escapeHtml(initials || '?')}
    </div>
  `;
};

/**
 * Progress bar template
 * @param {Object} options - Progress options
 * @returns {string}
 */
export const progressBarTemplate = (options = {}) => {
	const {
		value = 0,
		max = 100,
		label = '',
		variant = 'primary', // primary, success, warning, danger
		showLabel = true,
	} = options;

	const percentage = Math.min(100, Math.max(0, (value / max) * 100));

	return `
    <div class="progress" role="progressbar" 
         aria-valuenow="${value}" 
         aria-valuemin="0" 
         aria-valuemax="${max}">
      <div class="progress-bar progress-bar-${escapeHtml(variant)}" 
           style="width: ${percentage}%">
        ${
					showLabel
						? `<span class="progress-label">${escapeHtml(
								label || `${Math.round(percentage)}%`
						  )}</span>`
						: ''
				}
      </div>
    </div>
  `;
};

/**
 * Modal template
 * @param {Object} options - Modal options
 * @returns {string}
 */
export const modalTemplate = (options = {}) => {
	const {
		id = 'modal',
		title = 'Modal',
		content = '',
		size = 'md', // sm, md, lg, xl
		footer = '',
		closeButton = true,
	} = options;

	return `
    <div class="modal" id="${escapeHtml(
			id
		)}" role="dialog" aria-labelledby="${escapeHtml(id)}-title">
      <div class="modal-overlay" data-dismiss="modal"></div>
      <div class="modal-dialog modal-${escapeHtml(size)}">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="${escapeHtml(id)}-title">${escapeHtml(
		title
	)}</h3>
            ${
							closeButton
								? '<button class="modal-close" data-dismiss="modal" aria-label="Close">&times;</button>'
								: ''
						}
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    </div>
  `;
};

/**
 * Skeleton loader template
 * @param {string} type - Skeleton type (text, avatar, card, etc.)
 * @returns {string}
 */
export const skeletonTemplate = (type = 'text') => {
	const templates = {
		text: '<div class="skeleton skeleton-text"></div>',
		avatar: '<div class="skeleton skeleton-avatar"></div>',
		image: '<div class="skeleton skeleton-image"></div>',
		button: '<div class="skeleton skeleton-button"></div>',
		card: `
      <div class="skeleton-card">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton-card-body">
          <div class="skeleton skeleton-text skeleton-w-75"></div>
          <div class="skeleton skeleton-text skeleton-w-50"></div>
        </div>
      </div>
    `,
	};

	return templates[type] || templates.text;
};

export default {
	escapeHtml,
	htmlToElement,
	htmlToElements,
	html,
	classNames,
	renderTemplate,
	spinnerTemplate,
	emptyStateTemplate,
	errorTemplate,
	toastTemplate,
	breadcrumbTemplate,
	paginationTemplate,
	badgeTemplate,
	avatarTemplate,
	progressBarTemplate,
	modalTemplate,
	skeletonTemplate,
};
