/**
 * Fair Card Component
 * Displays job fair event card
 */

import { escapeHtml } from '../utils/templates.js';
import { formatDate, formatDateRange } from '../utils/formatters.js';

/**
 * Render fair card
 * @param {Object} fair - Fair data
 * @param {Object} options - Card options
 * @returns {string} - HTML string
 */
export const render = (fair, options = {}) => {
	const { variant = 'default', showActions = true } = options;
	const now = new Date();
	const startDate = new Date(fair.startDate);
	const endDate = new Date(fair.endDate);
	const isUpcoming = startDate > now;
	const isOngoing = startDate <= now && endDate >= now;
	const isPast = endDate < now;

	let status = 'upcoming';
	let statusText = 'Sắp diễn ra';

	if (isOngoing) {
		status = 'ongoing';
		statusText = 'Đang diễn ra';
	} else if (isPast) {
		status = 'past';
		statusText = 'Đã kết thúc';
	}

	return `
    <div class="fair-card fair-card-${status} ${
		variant !== 'default' ? `fair-card-${variant}` : ''
	}" data-fair-id="${fair.id}">
      ${
				fair.coverImage
					? `
        <div class="fair-card-image">
          <img src="${escapeHtml(fair.coverImage)}" alt="${escapeHtml(
							fair.name
					  )}">
          <span class="fair-status-badge badge-${status}">${statusText}</span>
        </div>
      `
					: `
        <div class="fair-card-image-placeholder">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="fair-status-badge badge-${status}">${statusText}</span>
        </div>
      `
			}
      
      <div class="fair-card-body">
        <a href="/fair/${fair.id}" class="fair-card-title">
          <h3>${escapeHtml(fair.name)}</h3>
        </a>
        
        ${
					fair.tagline
						? `
          <p class="fair-tagline">${escapeHtml(fair.tagline)}</p>
        `
						: ''
				}
        
        <div class="fair-card-meta">
          <div class="fair-meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>${formatDateRange(fair.startDate, fair.endDate)}</span>
          </div>
          
          ${
						fair.time
							? `
            <div class="fair-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${escapeHtml(fair.time)}</span>
            </div>
          `
							: ''
					}
          
          ${
						fair.location
							? `
            <div class="fair-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${escapeHtml(fair.location)}</span>
            </div>
          `
							: ''
					}
          
          ${
						fair.format
							? `
            <div class="fair-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>${escapeHtml(fair.format)}</span>
            </div>
          `
							: ''
					}
        </div>
        
        ${
					fair.description
						? `
          <p class="fair-card-description">${escapeHtml(
						fair.description.substring(0, 120)
					)}${fair.description.length > 120 ? '...' : ''}</p>
        `
						: ''
				}
        
        <div class="fair-card-stats">
          ${
						fair.companyCount
							? `
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>${fair.companyCount} công ty</span>
            </div>
          `
							: ''
					}
          
          ${
						fair.jobCount
							? `
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>${fair.jobCount} việc làm</span>
            </div>
          `
							: ''
					}
          
          ${
						fair.attendeeCount
							? `
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>${fair.attendeeCount} người tham gia</span>
            </div>
          `
							: ''
					}
        </div>
        
        ${
					fair.highlights && fair.highlights.length > 0
						? `
          <div class="fair-highlights">
            ${fair.highlights
							.slice(0, 3)
							.map(
								(highlight) => `
              <div class="highlight-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${escapeHtml(highlight)}</span>
              </div>
            `
							)
							.join('')}
          </div>
        `
						: ''
				}
      </div>
      
      ${
				showActions
					? `
        <div class="fair-card-footer">
          ${
						!isPast
							? `
            <button class="button button-primary button-sm button-full" data-action="register">
              ${isOngoing ? 'Tham gia ngay' : 'Đăng ký tham gia'}
            </button>
          `
							: `
            <button class="button button-outline button-sm button-full" data-action="view-recap">
              Xem lại sự kiện
            </button>
          `
					}
          <button class="button button-outline button-sm button-full" data-action="view-details">
            Xem chi tiết
          </button>
        </div>
      `
					: ''
			}
    </div>
  `;
};

/**
 * Initialize fair card interactions
 * @param {HTMLElement} card - Card element
 */
export const init = (card) => {
	if (!card) return;

	const fairId = card.getAttribute('data-fair-id');

	// Register button
	const registerBtn = card.querySelector('[data-action="register"]');
	if (registerBtn) {
		registerBtn.addEventListener('click', async (e) => {
			e.preventDefault();
			e.stopPropagation();

			// Dispatch event for registration modal
			const event = new CustomEvent('fair:register', {
				detail: { fairId },
			});
			document.dispatchEvent(event);
		});
	}

	// View details button
	const viewBtn = card.querySelector('[data-action="view-details"]');
	if (viewBtn) {
		viewBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (window.router) {
				window.router.navigate(`fair/${fairId}`);
			} else {
				window.location.href = `/fair/${fairId}`;
			}
		});
	}

	// View recap button
	const recapBtn = card.querySelector('[data-action="view-recap"]');
	if (recapBtn) {
		recapBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (window.router) {
				window.router.navigate(`fair/${fairId}/recap`);
			} else {
				window.location.href = `/fair/${fairId}#recap`;
			}
		});
	}

	// Click on card to view details
	card.addEventListener('click', (e) => {
		// Don't navigate if clicking on buttons
		if (e.target.closest('button') || e.target.closest('a')) {
			return;
		}

		if (window.router) {
			window.router.navigate(`fair/${fairId}`);
		} else {
			window.location.href = `/fair/${fairId}`;
		}
	});
};

/**
 * Render fair card list
 * @param {Array} fairs - Array of fair data
 * @param {Object} options - Options
 * @returns {string} - HTML string
 */
export const renderList = (fairs, options = {}) => {
	if (!fairs || fairs.length === 0) {
		return `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <h3>Không có sự kiện Job Fair</h3>
        <p>Chưa có sự kiện nào được tổ chức. Hãy quay lại sau nhé!</p>
      </div>
    `;
	}

	return fairs.map((fair) => render(fair, options)).join('');
};

export default {
	render,
	renderList,
	init,
};
