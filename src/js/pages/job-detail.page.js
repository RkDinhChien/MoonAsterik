/**
 * Job Detail Page Controller
 */

import store from '../core/store.js';
import * as jobsAPI from '../api/jobs.api.js';
import navbar from '../components/navbar.js';
import footer from '../components/footer.js';
import modal from '../components/modal.js';
import jobCard from '../components/job-card.js';
import { formatSalary, formatDate, timeAgo } from '../utils/formatters.js';
import { escapeHtml, skeletonTemplate } from '../utils/templates.js';

let state = {
	job: null,
	relatedJobs: [],
	loading: true,
};

/**
 * Initialize job detail page
 * @param {string|number} jobId - Job ID
 */
export const init = async (jobId) => {
	renderLayout();
	await loadJob(jobId);
	render();
	attachEventListeners();
};

/**
 * Render page layout
 */
const renderLayout = () => {
	const app = document.getElementById('app');
	if (!app) return;

	app.innerHTML = `
    ${navbar.render()}
    
    <main class="job-detail-page">
      <div class="container">
        <div id="job-content" class="job-detail-layout">
          ${skeletonTemplate('job-detail')}
        </div>
      </div>
    </main>
    
    ${footer.render()}
  `;

	// Initialize components
	const navElement = document.querySelector('.navbar');
	if (navElement) navbar.init(navElement);

	const footerElement = document.querySelector('.footer');
	if (footerElement) footer.init(footerElement);
};

/**
 * Load job data
 */
const loadJob = async (jobId) => {
	state.loading = true;

	try {
		const [jobResult, relatedResult] = await Promise.all([
			jobsAPI.getJobById(jobId),
			jobsAPI.getRelatedJobs(jobId, { limit: 3 }),
		]);

		state.job = jobResult;
		state.relatedJobs = relatedResult.data || [];
		state.loading = false;
	} catch (error) {
		console.error('Error loading job:', error);
		state.loading = false;
	}
};

/**
 * Render page content
 */
const render = () => {
	const container = document.getElementById('job-content');
	if (!container || !state.job) return;

	const job = state.job;
	const savedJobs = store.state.savedJobs || [];
	const isSaved = savedJobs.includes(job.id);

	container.innerHTML = `
    <div class="job-detail-main">
      <!-- Job Header -->
      <div class="job-detail-header">
        <div class="job-company">
          <a href="/company/${job.company.id}" class="company-logo-large">
            ${
							job.company.logo
								? `<img src="${escapeHtml(job.company.logo)}" alt="${escapeHtml(
										job.company.name
								  )}">`
								: `<span>${escapeHtml(job.company.name?.[0] || 'C')}</span>`
						}
          </a>
          <div class="job-header-info">
            <h1 class="job-title">${escapeHtml(job.title)}</h1>
            <a href="/company/${job.company.id}" class="company-name">
              ${escapeHtml(job.company.name)}
            </a>
            <div class="job-meta">
              ${
								job.location
									? `
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${escapeHtml(job.location)}
                </span>
              `
									: ''
							}
              ${
								job.type
									? `
                <span class="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  ${escapeHtml(job.type)}
                </span>
              `
									: ''
							}
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${timeAgo(job.postedAt || job.createdAt)}
              </span>
            </div>
          </div>
        </div>
        
        <div class="job-actions">
          <button class="button button-icon ${
						isSaved ? 'active' : ''
					}" data-action="save-job" title="${
		isSaved ? 'Bỏ lưu' : 'Lưu công việc'
	}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${
							isSaved ? 'currentColor' : 'none'
						}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button class="button button-primary button-lg" data-action="apply-job">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Ứng tuyển ngay
          </button>
        </div>
      </div>
      
      <!-- Job Details -->
      <div class="job-detail-content">
        <section class="detail-section">
          <h2>Mô tả công việc</h2>
          <div class="content-text">${job.description || 'Chưa có mô tả'}</div>
        </section>
        
        ${
					job.requirements
						? `
          <section class="detail-section">
            <h2>Yêu cầu ứng viên</h2>
            <div class="content-text">${job.requirements}</div>
          </section>
        `
						: ''
				}
        
        ${
					job.benefits
						? `
          <section class="detail-section">
            <h2>Quyền lợi</h2>
            <div class="content-text">${job.benefits}</div>
          </section>
        `
						: ''
				}
        
        ${
					job.skills && job.skills.length > 0
						? `
          <section class="detail-section">
            <h2>Kỹ năng yêu cầu</h2>
            <div class="skills-list">
              ${job.skills
								.map(
									(skill) => `
                <span class="skill-tag">${escapeHtml(skill)}</span>
              `
								)
								.join('')}
            </div>
          </section>
        `
						: ''
				}
      </div>
      
      <!-- Related Jobs -->
      ${
				state.relatedJobs.length > 0
					? `
        <div class="related-jobs">
          <h2>Việc làm liên quan</h2>
          <div class="job-grid">
            ${jobCard.renderList(state.relatedJobs)}
          </div>
        </div>
      `
					: ''
			}
    </div>
    
    <!-- Sidebar -->
    <aside class="job-detail-sidebar">
      <div class="sidebar-card">
        <h3>Thông tin chung</h3>
        <div class="info-list">
          ${
						job.salary
							? `
            <div class="info-item">
              <span class="info-label">Mức lương</span>
              <span class="info-value">${formatSalary(
								job.salary.min,
								job.salary.max,
								job.salary.currency
							)}</span>
            </div>
          `
							: ''
					}
          ${
						job.experience
							? `
            <div class="info-item">
              <span class="info-label">Kinh nghiệm</span>
              <span class="info-value">${escapeHtml(job.experience)}</span>
            </div>
          `
							: ''
					}
          ${
						job.type
							? `
            <div class="info-item">
              <span class="info-label">Loại công việc</span>
              <span class="info-value">${escapeHtml(job.type)}</span>
            </div>
          `
							: ''
					}
          ${
						job.deadline
							? `
            <div class="info-item">
              <span class="info-label">Hạn ứng tuyển</span>
              <span class="info-value">${formatDate(job.deadline)}</span>
            </div>
          `
							: ''
					}
        </div>
      </div>
      
      <div class="sidebar-card">
        <h3>Về công ty</h3>
        <p class="company-description">${escapeHtml(
					job.company.description || 'Chưa có mô tả'
				)}</p>
        <a href="/company/${
					job.company.id
				}" class="button button-outline button-full">
          Xem trang công ty
        </a>
      </div>
    </aside>
  `;

	// Initialize related job cards
	const relatedCards = container.querySelectorAll('.related-jobs .job-card');
	relatedCards.forEach((card) => jobCard.init(card));
};

/**
 * Attach event listeners
 */
const attachEventListeners = () => {
	// Save job button
	const saveBtn = document.querySelector('[data-action="save-job"]');
	if (saveBtn) {
		saveBtn.addEventListener('click', async () => {
			const savedJobs = store.state.savedJobs || [];
			const isSaved = savedJobs.includes(state.job.id);

			try {
				if (isSaved) {
					await store.dispatch('unsaveJob', state.job.id);
				} else {
					await store.dispatch('saveJob', state.job.id);
				}
				render(); // Re-render to update button state
			} catch (error) {
				console.error('Error saving job:', error);
			}
		});
	}

	// Apply job button
	const applyBtn = document.querySelector('[data-action="apply-job"]');
	if (applyBtn) {
		applyBtn.addEventListener('click', () => {
			showApplyModal(state.job);
		});
	}
};

/**
 * Show apply modal
 */
const showApplyModal = (job) => {
	// Check if logged in
	if (!store.state.isLoggedIn) {
		modal
			.alert({
				title: 'Yêu cầu đăng nhập',
				message: 'Bạn cần đăng nhập để ứng tuyển công việc này',
				type: 'info',
			})
			.then(() => {
				window.location.href =
					'/login?returnTo=' + encodeURIComponent(window.location.pathname);
			});
		return;
	}

	const applyModal = modal.create({
		title: `Ứng tuyển: ${job.title}`,
		size: 'large',
		content: `
      <form id="apply-form">
        <div class="form-group">
          <label for="coverLetter">Thư xin việc *</label>
          <textarea 
            id="coverLetter" 
            name="coverLetter" 
            rows="6" 
            class="form-input" 
            required
            placeholder="Giới thiệu bản thân và lý do bạn phù hợp với vị trí này..."
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="cv">CV *</label>
          <input type="file" id="cv" name="cv" class="form-input" accept=".pdf,.doc,.docx" required>
          <small class="form-help">Định dạng: PDF, DOC, DOCX (tối đa 5MB)</small>
        </div>
        
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="terms" required>
            <span>Tôi đồng ý với <a href="/terms" target="_blank">Điều khoản sử dụng</a></span>
          </label>
        </div>
      </form>
    `,
		actions: [
			{ name: 'cancel', label: 'Hủy', variant: 'button-outline' },
			{ name: 'submit', label: 'Gửi ứng tuyển', variant: 'button-primary' },
		],
	});

	applyModal.addEventListener('modal:action', async (e) => {
		if (e.detail.action === 'submit') {
			const form = applyModal.querySelector('#apply-form');
			if (form.checkValidity()) {
				// TODO: Submit application
				await modal.alert({
					title: 'Thành công',
					message: 'Đã gửi hồ sơ ứng tuyển thành công!',
					type: 'success',
				});
				modal.close(applyModal);
			} else {
				form.reportValidity();
			}
		}
	});

	modal.open(applyModal);
};

/**
 * Cleanup
 */
export const destroy = () => {
	// Cleanup if needed
};

export default { init, destroy };
