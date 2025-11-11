/**
 * Modal Component
 * Reusable modal system for various use cases
 */

import { escapeHtml } from '../utils/templates.js';

/**
 * Create modal
 * @param {Object} options - Modal options
 * @returns {HTMLElement} - Modal element
 */
export const create = (options = {}) => {
	const {
		id = `modal-${Date.now()}`,
		title = '',
		content = '',
		size = 'medium', // small, medium, large, fullscreen
		showClose = true,
		closeOnBackdrop = true,
		actions = [],
		className = '',
		onOpen = null,
		onClose = null,
	} = options;

	// Create modal container
	const modal = document.createElement('div');
	modal.id = id;
	modal.className = `modal modal-${size} ${className}`;
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-modal', 'true');
	modal.setAttribute('aria-labelledby', `${id}-title`);

	// Modal HTML
	modal.innerHTML = `
    <div class="modal-backdrop" ${closeOnBackdrop ? 'data-close' : ''}></div>
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title" id="${id}-title">${escapeHtml(title)}</h2>
        ${
					showClose
						? `
          <button class="modal-close" aria-label="Close modal" data-close>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `
						: ''
				}
      </div>
      
      <div class="modal-body">
        ${typeof content === 'string' ? content : ''}
      </div>
      
      ${
				actions.length > 0
					? `
        <div class="modal-footer">
          ${actions
						.map(
							(action) => `
            <button 
              class="button ${action.variant || 'button-outline'} ${
								action.className || ''
							}"
              data-action="${action.name}"
              ${action.disabled ? 'disabled' : ''}
            >
              ${escapeHtml(action.label)}
            </button>
          `
						)
						.join('')}
        </div>
      `
					: ''
			}
    </div>
  `;

	// If content is an element, append it
	if (content instanceof HTMLElement) {
		const body = modal.querySelector('.modal-body');
		body.innerHTML = '';
		body.appendChild(content);
	}

	// Store callbacks
	modal._onOpen = onOpen;
	modal._onClose = onClose;

	// Append to body
	document.body.appendChild(modal);

	// Initialize
	init(modal);

	return modal;
};

/**
 * Initialize modal interactions
 * @param {HTMLElement} modal - Modal element
 */
export const init = (modal) => {
	if (!modal) return;

	// Close button
	const closeButtons = modal.querySelectorAll('[data-close]');
	closeButtons.forEach((btn) => {
		btn.addEventListener('click', () => close(modal));
	});

	// Action buttons
	const actionButtons = modal.querySelectorAll('[data-action]');
	actionButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			const actionName = btn.getAttribute('data-action');
			const event = new CustomEvent('modal:action', {
				detail: { action: actionName, modal },
			});
			modal.dispatchEvent(event);
		});
	});

	// Escape key
	const handleEscape = (e) => {
		if (e.key === 'Escape') {
			close(modal);
		}
	};
	modal._handleEscape = handleEscape;
	document.addEventListener('keydown', handleEscape);

	// Focus trap
	setupFocusTrap(modal);
};

/**
 * Open modal
 * @param {HTMLElement|string} modal - Modal element or ID
 */
export const open = (modal) => {
	if (typeof modal === 'string') {
		modal = document.getElementById(modal);
	}

	if (!modal) return;

	// Prevent body scroll
	document.body.style.overflow = 'hidden';

	// Show modal
	modal.classList.add('active');

	// Focus first focusable element
	const firstFocusable = modal.querySelector(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);
	if (firstFocusable) {
		setTimeout(() => firstFocusable.focus(), 100);
	}

	// Trigger onOpen callback
	if (modal._onOpen) {
		modal._onOpen(modal);
	}

	// Dispatch event
	modal.dispatchEvent(new CustomEvent('modal:open'));
};

/**
 * Close modal
 * @param {HTMLElement|string} modal - Modal element or ID
 */
export const close = (modal) => {
	if (typeof modal === 'string') {
		modal = document.getElementById(modal);
	}

	if (!modal) return;

	// Restore body scroll
	document.body.style.overflow = '';

	// Hide modal
	modal.classList.remove('active');

	// Trigger onClose callback
	if (modal._onClose) {
		modal._onClose(modal);
	}

	// Dispatch event
	modal.dispatchEvent(new CustomEvent('modal:close'));
};

/**
 * Destroy modal
 * @param {HTMLElement|string} modal - Modal element or ID
 */
export const destroy = (modal) => {
	if (typeof modal === 'string') {
		modal = document.getElementById(modal);
	}

	if (!modal) return;

	// Close first
	close(modal);

	// Remove event listeners
	if (modal._handleEscape) {
		document.removeEventListener('keydown', modal._handleEscape);
	}

	// Remove from DOM
	setTimeout(() => modal.remove(), 300);
};

/**
 * Setup focus trap
 */
const setupFocusTrap = (modal) => {
	const focusableElements = modal.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);

	if (focusableElements.length === 0) return;

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	modal.addEventListener('keydown', (e) => {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			// Shift + Tab
			if (document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			}
		} else {
			// Tab
			if (document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		}
	});
};

/**
 * Confirmation modal
 * @param {Object} options - Confirmation options
 * @returns {Promise<boolean>}
 */
export const confirm = (options = {}) => {
	const {
		title = 'Xác nhận',
		message = 'Bạn có chắc chắn?',
		confirmText = 'Xác nhận',
		cancelText = 'Hủy',
		confirmVariant = 'button-primary',
		danger = false,
	} = options;

	return new Promise((resolve) => {
		const modal = create({
			title,
			content: `<p>${escapeHtml(message)}</p>`,
			size: 'small',
			actions: [
				{
					name: 'cancel',
					label: cancelText,
					variant: 'button-outline',
				},
				{
					name: 'confirm',
					label: confirmText,
					variant: danger ? 'button-danger' : confirmVariant,
				},
			],
		});

		modal.addEventListener('modal:action', (e) => {
			const { action } = e.detail;
			if (action === 'confirm') {
				resolve(true);
			} else {
				resolve(false);
			}
			destroy(modal);
		});

		modal.addEventListener('modal:close', () => {
			resolve(false);
			destroy(modal);
		});

		open(modal);
	});
};

/**
 * Alert modal
 * @param {Object} options - Alert options
 * @returns {Promise<void>}
 */
export const alert = (options = {}) => {
	const {
		title = 'Thông báo',
		message = '',
		okText = 'OK',
		type = 'info', // info, success, warning, error
	} = options;

	const icons = {
		info: '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
		success:
			'<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
		warning:
			'<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
		error:
			'<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
	};

	return new Promise((resolve) => {
		const modal = create({
			title,
			content: `
        <div class="alert-modal alert-${type}">
          <div class="alert-icon">${icons[type]}</div>
          <p class="alert-message">${escapeHtml(message)}</p>
        </div>
      `,
			size: 'small',
			className: 'modal-alert',
			actions: [
				{
					name: 'ok',
					label: okText,
					variant: 'button-primary',
				},
			],
		});

		modal.addEventListener('modal:action', () => {
			resolve();
			destroy(modal);
		});

		modal.addEventListener('modal:close', () => {
			resolve();
			destroy(modal);
		});

		open(modal);
	});
};

/**
 * Prompt modal
 * @param {Object} options - Prompt options
 * @returns {Promise<string|null>}
 */
export const prompt = (options = {}) => {
	const {
		title = 'Nhập thông tin',
		message = '',
		placeholder = '',
		defaultValue = '',
		okText = 'OK',
		cancelText = 'Hủy',
		inputType = 'text',
		required = false,
	} = options;

	return new Promise((resolve) => {
		const inputId = `prompt-input-${Date.now()}`;

		const modal = create({
			title,
			content: `
        <div class="prompt-modal">
          ${
						message
							? `<p class="prompt-message">${escapeHtml(message)}</p>`
							: ''
					}
          <input 
            type="${inputType}" 
            id="${inputId}"
            class="form-input" 
            placeholder="${escapeHtml(placeholder)}"
            value="${escapeHtml(defaultValue)}"
            ${required ? 'required' : ''}
          >
        </div>
      `,
			size: 'small',
			className: 'modal-prompt',
			actions: [
				{
					name: 'cancel',
					label: cancelText,
					variant: 'button-outline',
				},
				{
					name: 'ok',
					label: okText,
					variant: 'button-primary',
				},
			],
		});

		const input = modal.querySelector(`#${inputId}`);

		modal.addEventListener('modal:action', (e) => {
			const { action } = e.detail;
			if (action === 'ok') {
				const value = input.value.trim();
				if (required && !value) {
					input.focus();
					return;
				}
				resolve(value || null);
				destroy(modal);
			} else {
				resolve(null);
				destroy(modal);
			}
		});

		modal.addEventListener('modal:close', () => {
			resolve(null);
			destroy(modal);
		});

		open(modal);

		// Focus input
		setTimeout(() => input.focus(), 100);
	});
};

export default {
	create,
	init,
	open,
	close,
	destroy,
	confirm,
	alert,
	prompt,
};
