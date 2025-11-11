/**
 * Home/Landing Page Controller
 */

import store from '../core/store.js';
import * as jobsAPI from '../api/jobs.api.js';
import * as companiesAPI from '../api/companies.api.js';
import * as fairsAPI from '../api/fairs.api.js';
import * as blogAPI from '../api/blog.api.js';
import navbar from '../components/navbar.js';
import footer from '../components/footer.js';
import searchBar from '../components/search-bar.js';
import jobCard from '../components/job-card.js';
import companyCard from '../components/company-card.js';
import fairCard from '../components/fair-card.js';
import { formatNumber } from '../utils/formatters.js';

let state = {
	stats: null,
	featuredJobs: [],
	featuredCompanies: [],
	upcomingFairs: [],
	featuredBlogs: [],
	loading: true,
};

/**
 * Initialize home page
 */
export const init = async () => {
	renderLayout();
	await loadData();
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
    
    <main class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Kết nối sinh viên IT với<br>
              <span class="gradient-text">Cơ hội việc làm hàng đầu</span>
            </h1>
            <p class="hero-subtitle">
              Nền tảng tuyển dụng IT chuyên nghiệp dành cho sinh viên và fresh graduate
            </p>
            
            <div id="hero-search"></div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-value" data-stat="jobs">-</span>
                <span class="stat-label">Việc làm</span>
              </div>
              <div class="stat-item">
                <span class="stat-value" data-stat="companies">-</span>
                <span class="stat-label">Công ty</span>
              </div>
              <div class="stat-item">
                <span class="stat-value" data-stat="students">-</span>
                <span class="stat-label">Sinh viên</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Featured Jobs -->
      <section class="section section-featured-jobs">
        <div class="container">
          <div class="section-header">
            <h2>Việc làm nổi bật</h2>
            <a href="/jobs" class="section-link">Xem tất cả →</a>
          </div>
          <div id="featured-jobs" class="job-grid"></div>
        </div>
      </section>
      
      <!-- How It Works -->
      <section class="section section-how-it-works">
        <div class="container">
          <h2 class="section-title-center">Cách thức hoạt động</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Tìm kiếm việc làm</h3>
              <p>Dễ dàng tìm kiếm công việc phù hợp với kỹ năng và mong muốn</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3>Tạo hồ sơ</h3>
              <p>Xây dựng profile chuyên nghiệp với CV và portfolio</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Ứng tuyển nhanh</h3>
              <p>Ứng tuyển chỉ với một cú click, theo dõi trạng thái dễ dàng</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Featured Companies -->
      <section class="section section-featured-companies">
        <div class="container">
          <div class="section-header">
            <h2>Công ty hàng đầu</h2>
            <a href="/companies" class="section-link">Xem tất cả →</a>
          </div>
          <div id="featured-companies" class="company-grid"></div>
        </div>
      </section>
      
      <!-- Upcoming Fairs -->
      <section class="section section-fairs">
        <div class="container">
          <div class="section-header">
            <h2>Job Fair sắp diễn ra</h2>
            <a href="/fairs" class="section-link">Xem tất cả →</a>
          </div>
          <div id="upcoming-fairs" class="fair-grid"></div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="section section-cta">
        <div class="container">
          <div class="cta-card">
            <h2>Sẵn sàng bắt đầu sự nghiệp IT?</h2>
            <p>Tham gia cộng đồng sinh viên IT lớn nhất Việt Nam</p>
            <div class="cta-actions">
              <button class="button button-primary button-lg" data-action="register-student">
                Đăng ký ngay
              </button>
              <button class="button button-outline button-lg" data-action="learn-more">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </section>
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
 * Load page data
 */
const loadData = async () => {
	try {
		const [stats, jobs, companies, fairs, blogs] = await Promise.all([
			fetch('/assets/data/stats.json')
				.then((r) => r.json())
				.catch(() => ({ jobs: 1500, companies: 250, students: 10000 })),
			jobsAPI.getFeaturedJobs({ limit: 6 }),
			companiesAPI.getFeaturedCompanies({ limit: 6 }),
			fairsAPI.getUpcomingFairs({ limit: 3 }),
			blogAPI.getFeaturedPosts({ limit: 3 }),
		]);

		state.stats = stats;
		state.featuredJobs = jobs.data || [];
		state.featuredCompanies = companies.data || [];
		state.upcomingFairs = fairs.data || [];
		state.featuredBlogs = blogs.data || [];
		state.loading = false;
	} catch (error) {
		console.error('Error loading home page data:', error);
		state.loading = false;
	}
};

/**
 * Render page content
 */
const render = () => {
	// Render hero search
	const heroSearch = document.getElementById('hero-search');
	if (heroSearch) {
		heroSearch.innerHTML = searchBar.render({
			variant: 'hero',
			placeholder: 'Tìm kiếm công việc, kỹ năng...',
		});
		searchBar.init(heroSearch, handleSearch);
	}

	// Render stats
	if (state.stats) {
		document.querySelector('[data-stat="jobs"]').textContent = formatNumber(
			state.stats.jobs
		);
		document.querySelector('[data-stat="companies"]').textContent =
			formatNumber(state.stats.companies);
		document.querySelector('[data-stat="students"]').textContent = formatNumber(
			state.stats.students
		);
	}

	// Render featured jobs
	const jobsContainer = document.getElementById('featured-jobs');
	if (jobsContainer) {
		jobsContainer.innerHTML = jobCard.renderList(state.featuredJobs);
		jobsContainer
			.querySelectorAll('.job-card')
			.forEach((card) => jobCard.init(card));
	}

	// Render featured companies
	const companiesContainer = document.getElementById('featured-companies');
	if (companiesContainer) {
		companiesContainer.innerHTML = companyCard.renderList(
			state.featuredCompanies
		);
		companiesContainer
			.querySelectorAll('.company-card')
			.forEach((card) => companyCard.init(card));
	}

	// Render upcoming fairs
	const fairsContainer = document.getElementById('upcoming-fairs');
	if (fairsContainer) {
		fairsContainer.innerHTML = fairCard.renderList(state.upcomingFairs);
		fairsContainer
			.querySelectorAll('.fair-card')
			.forEach((card) => fairCard.init(card));
	}
};

/**
 * Handle search submission
 */
const handleSearch = (params) => {
	const queryString = new URLSearchParams(params).toString();
	if (window.router) {
		window.router.navigate(`jobs?${queryString}`);
	} else {
		window.location.href = `/jobs?${queryString}`;
	}
};

/**
 * Attach event listeners
 */
const attachEventListeners = () => {
	// Register student button
	const registerBtn = document.querySelector(
		'[data-action="register-student"]'
	);
	if (registerBtn) {
		registerBtn.addEventListener('click', () => {
			// TODO: Show registration modal
			window.location.href = '/register';
		});
	}

	// Learn more button
	const learnMoreBtn = document.querySelector('[data-action="learn-more"]');
	if (learnMoreBtn) {
		learnMoreBtn.addEventListener('click', () => {
			window.location.href = '/about';
		});
	}
};

/**
 * Cleanup
 */
export const destroy = () => {
	// Cleanup if needed
};

export default { init, destroy };
