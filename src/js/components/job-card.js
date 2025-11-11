/**
 * Job Card Component
 * Displays job listing card with save/apply actions
 */

import store from '../core/store.js';
import { escapeHtml } from '../utils/templates.js';
import { formatSalary, formatDate, timeAgo } from '../utils/formatters.js';

/**
 * Render job card
 * @param {Object} job - Job data
 * @param {Object} options - Card options
 * @returns {string} - HTML string
 */
export const render = (job, options = {}) => {
	const { variant = 'default', showCompany = true } = options;
	const savedJobs = store.state.savedJobs || [];
	const isSaved = savedJobs.includes(job.id);

	return `
    <div class="job-card ${
			variant !== 'default' ? `job-card-${variant}` : ''
		}" data-job-id="${job.id}">
      <div class="job-card-header">
        ${
					showCompany && job.company
						? `
          <a href="/company/${job.company.id}" class="job-card-company">
            <div class="company-logo">
              ${
								job.company.logo
									? `<img src="${escapeHtml(
											job.company.logo
									  )}" alt="${escapeHtml(job.company.name)}">`
									: `<span>${escapeHtml(job.company.name?.[0] || 'C')}</span>`
							}
            </div>
            <div class="company-info">
              <h4 class="company-name">${escapeHtml(job.company.name)}</h4>
              ${
								job.company.location
									? `
                <span class="company-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${escapeHtml(job.company.location)}
                </span>
              `
									: ''
							}
            </div>
          </a>
        `
						: ''
				}
        
        <button 
          class="job-card-save ${isSaved ? 'active' : ''}" 
          data-action="save-job"
          aria-label="${isSaved ? 'Unsave job' : 'Save job'}"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${
						isSaved ? 'currentColor' : 'none'
					}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      
      <div class="job-card-body">
        <a href="/job/${job.id}" class="job-card-title">
          <h3>${escapeHtml(job.title)}</h3>
        </a>
        
        <div class="job-card-meta">
          ${
						job.salary
							? `
            <span class="job-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              ${formatSalary(
								job.salary.min,
								job.salary.max,
								job.salary.currency
							)}
            </span>
          `
							: ''
					}
          
          ${
						job.type
							? `
            <span class="job-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              ${escapeHtml(job.type)}
            </span>
          `
							: ''
					}
          
          ${
						job.experience
							? `
            <span class="job-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              ${escapeHtml(job.experience)}
            </span>
          `
							: ''
					}
          
          ${
						job.location
							? `
            <span class="job-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${escapeHtml(job.location)}
            </span>
          `
							: ''
					}
        </div>
        
        ${
					job.skills && job.skills.length > 0
						? `
          <div class="job-card-skills">
            ${job.skills
							.slice(0, 5)
							.map(
								(skill) => `
              <span class="skill-tag">${escapeHtml(skill)}</span>
            `
							)
							.join('')}
            ${
							job.skills.length > 5
								? `
              <span class="skill-tag skill-tag-more">+${
								job.skills.length - 5
							}</span>
            `
								: ''
						}
          </div>
        `
						: ''
				}
        
        ${
					job.description
						? `
          <p class="job-card-description">${escapeHtml(
						job.description.substring(0, 150)
					)}${job.description.length > 150 ? '...' : ''}</p>
        `
						: ''
				}
        
        ${
					job.badges && job.badges.length > 0
						? `
          <div class="job-card-badges">
            ${job.badges
							.map(
								(badge) => `
              <span class="badge badge-${badge.type || 'default'}">${escapeHtml(
									badge.text
								)}</span>
            `
							)
							.join('')}
          </div>
        `
						: ''
				}
      </div>
      
      <div class="job-card-footer">
        <div class="job-card-time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${timeAgo(job.createdAt || job.postedAt)}
        </div>
        
        <div class="job-card-actions">
          <button class="button button-outline button-sm" data-action="view-job">
            Xem chi tiết
          </button>
          <button class="button button-primary button-sm" data-action="apply-job">
            Ứng tuyển
          </button>
        </div>
      </div>
    </div>
  `;
};

/**
 * Initialize job card interactions
 * @param {HTMLElement} card - Card element
 */
export const init = (card) => {
	if (!card) return;

	const jobId = card.getAttribute('data-job-id');

	// Save job button
	const saveBtn = card.querySelector('[data-action="save-job"]');
	if (saveBtn) {
		saveBtn.addEventListener('click', async (e) => {
			e.preventDefault();
			e.stopPropagation();

			const isActive = saveBtn.classList.contains('active');

			try {
				if (isActive) {
					await store.dispatch('unsaveJob', jobId);
					saveBtn.classList.remove('active');
					saveBtn.setAttribute('aria-label', 'Save job');

					// Update SVG
					const svg = saveBtn.querySelector('svg');
					if (svg) svg.setAttribute('fill', 'none');
				} else {
					await store.dispatch('saveJob', jobId);
					saveBtn.classList.add('active');
					saveBtn.setAttribute('aria-label', 'Unsave job');

					// Update SVG
					const svg = saveBtn.querySelector('svg');
					if (svg) svg.setAttribute('fill', 'currentColor');
				}
			} catch (error) {
				console.error('Error saving job:', error);
			}
		});
	}

	// View job button
	const viewBtn = card.querySelector('[data-action="view-job"]');
	if (viewBtn) {
		viewBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (window.router) {
				window.router.navigate(`job/${jobId}`);
			} else {
				window.location.href = `/job/${jobId}`;
			}
		});
	}

	// Apply job button
	const applyBtn = card.querySelector('[data-action="apply-job"]');
	if (applyBtn) {
		applyBtn.addEventListener('click', async (e) => {
			e.preventDefault();
			e.stopPropagation();

			// Check if logged in
			if (!store.state.isLoggedIn) {
				// Show login modal
				const event = new CustomEvent('app:showLogin', {
					detail: { returnTo: `/job/${jobId}` },
				});
				document.dispatchEvent(event);
				return;
			}

			// Show apply modal
			const event = new CustomEvent('job:apply', {
				detail: { jobId },
			});
			document.dispatchEvent(event);
		});
	}

	// Click on card to view details
	card.addEventListener('click', (e) => {
		// Don't navigate if clicking on buttons
		if (e.target.closest('button') || e.target.closest('a')) {
			return;
		}

		if (window.router) {
			window.router.navigate(`job/${jobId}`);
		} else {
			window.location.href = `/job/${jobId}`;
		}
	});
};

/**
 * Render job card list
 * @param {Array} jobs - Array of job data
 * @param {Object} options - Options
 * @returns {string} - HTML string
 */
export const renderList = (jobs, options = {}) => {
	if (!jobs || jobs.length === 0) {
		return `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <h3>Không tìm thấy công việc</h3>
        <p>Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
      </div>
    `;
	}

	return jobs.map((job) => render(job, options)).join('');
};

export default {
	render,
	renderList,
	init,
};
