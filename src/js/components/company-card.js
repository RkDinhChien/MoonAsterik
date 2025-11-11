/**
 * Company Card Component
 * Displays company card with logo, stats, and actions
 */

import { escapeHtml } from '../utils/templates.js';
import { formatNumber } from '../utils/formatters.js';

/**
 * Render company card
 * @param {Object} company - Company data
 * @param {Object} options - Card options
 * @returns {string} - HTML string
 */
export const render = (company, options = {}) => {
	const { variant = 'default', showStats = true } = options;

	return `
    <div class="company-card ${
			variant !== 'default' ? `company-card-${variant}` : ''
		}" data-company-id="${company.id}">
      <div class="company-card-header">
        <div class="company-logo">
          ${
						company.logo
							? `<img src="${escapeHtml(company.logo)}" alt="${escapeHtml(
									company.name
							  )}">`
							: `<span class="company-logo-placeholder">${escapeHtml(
									company.name?.[0] || 'C'
							  )}</span>`
					}
        </div>
        
        ${
					company.featured
						? `
          <span class="company-badge badge-featured">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Nổi bật
          </span>
        `
						: ''
				}
      </div>
      
      <div class="company-card-body">
        <a href="/company/${company.id}" class="company-card-title">
          <h3>${escapeHtml(company.name)}</h3>
        </a>
        
        ${
					company.tagline
						? `
          <p class="company-tagline">${escapeHtml(company.tagline)}</p>
        `
						: ''
				}
        
        <div class="company-card-meta">
          ${
						company.industry
							? `
            <span class="company-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              ${escapeHtml(company.industry)}
            </span>
          `
							: ''
					}
          
          ${
						company.location
							? `
            <span class="company-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${escapeHtml(company.location)}
            </span>
          `
							: ''
					}
          
          ${
						company.size
							? `
            <span class="company-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              ${escapeHtml(company.size)}
            </span>
          `
							: ''
					}
        </div>
        
        ${
					company.description
						? `
          <p class="company-card-description">${escapeHtml(
						company.description.substring(0, 120)
					)}${company.description.length > 120 ? '...' : ''}</p>
        `
						: ''
				}
        
        ${
					company.technologies && company.technologies.length > 0
						? `
          <div class="company-technologies">
            ${company.technologies
							.slice(0, 4)
							.map(
								(tech) => `
              <span class="tech-tag">${escapeHtml(tech)}</span>
            `
							)
							.join('')}
            ${
							company.technologies.length > 4
								? `
              <span class="tech-tag tech-tag-more">+${
								company.technologies.length - 4
							}</span>
            `
								: ''
						}
          </div>
        `
						: ''
				}
      </div>
      
      ${
				showStats && (company.jobCount || company.employeeCount)
					? `
        <div class="company-card-stats">
          ${
						company.jobCount
							? `
            <div class="stat-item">
              <span class="stat-value">${formatNumber(company.jobCount)}</span>
              <span class="stat-label">Việc làm</span>
            </div>
          `
							: ''
					}
          ${
						company.employeeCount
							? `
            <div class="stat-item">
              <span class="stat-value">${formatNumber(
								company.employeeCount
							)}</span>
              <span class="stat-label">Nhân viên</span>
            </div>
          `
							: ''
					}
          ${
						company.rating
							? `
            <div class="stat-item">
              <span class="stat-value">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${company.rating.toFixed(1)}
              </span>
              <span class="stat-label">Đánh giá</span>
            </div>
          `
							: ''
					}
        </div>
      `
					: ''
			}
      
      <div class="company-card-footer">
        <button class="button button-outline button-sm button-full" data-action="view-company">
          Xem công ty
        </button>
        <button class="button button-primary button-sm button-full" data-action="view-jobs">
          Xem ${company.jobCount || 0} việc làm
        </button>
      </div>
    </div>
  `;
};

/**
 * Initialize company card interactions
 * @param {HTMLElement} card - Card element
 */
export const init = (card) => {
	if (!card) return;

	const companyId = card.getAttribute('data-company-id');

	// View company button
	const viewBtn = card.querySelector('[data-action="view-company"]');
	if (viewBtn) {
		viewBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (window.router) {
				window.router.navigate(`company/${companyId}`);
			} else {
				window.location.href = `/company/${companyId}`;
			}
		});
	}

	// View jobs button
	const viewJobsBtn = card.querySelector('[data-action="view-jobs"]');
	if (viewJobsBtn) {
		viewJobsBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (window.router) {
				window.router.navigate(`company/${companyId}/jobs`);
			} else {
				window.location.href = `/company/${companyId}#jobs`;
			}
		});
	}

	// Click on card to view company
	card.addEventListener('click', (e) => {
		// Don't navigate if clicking on buttons
		if (e.target.closest('button') || e.target.closest('a')) {
			return;
		}

		if (window.router) {
			window.router.navigate(`company/${companyId}`);
		} else {
			window.location.href = `/company/${companyId}`;
		}
	});
};

/**
 * Render company card list
 * @param {Array} companies - Array of company data
 * @param {Object} options - Options
 * @returns {string} - HTML string
 */
export const renderList = (companies, options = {}) => {
	if (!companies || companies.length === 0) {
		return `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <h3>Không tìm thấy công ty</h3>
        <p>Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
      </div>
    `;
	}

	return companies.map((company) => render(company, options)).join('');
};

export default {
	render,
	renderList,
	init,
};
