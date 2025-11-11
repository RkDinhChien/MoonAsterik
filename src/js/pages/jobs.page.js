/**
 * Jobs Listing Page Controller
 */

import store from '../core/store.js';
import * as jobsAPI from '../api/jobs.api.js';
import navbar from '../components/navbar.js';
import footer from '../components/footer.js';
import searchBar from '../components/search-bar.js';
import jobCard from '../components/job-card.js';
import pagination from '../components/pagination.js';
import { skeletonTemplate } from '../utils/templates.js';

let state = {
	jobs: [],
	filters: {
		keyword: '',
		location: '',
		jobType: '',
		experience: '',
		salary: '',
		sort: 'latest',
	},
	pagination: {
		currentPage: 1,
		itemsPerPage: 12,
		totalItems: 0,
		totalPages: 0,
	},
	loading: true,
};

/**
 * Initialize jobs page
 * @param {Object} query - URL query parameters
 */
export const init = async (query = {}) => {
	// Parse query params
	parseQueryParams(query);

	renderLayout();
	await loadJobs();
	render();
	attachEventListeners();
};

/**
 * Parse URL query parameters
 */
const parseQueryParams = (query) => {
	state.filters = {
		keyword: query.keyword || '',
		location: query.location || '',
		jobType: query.jobType || query.type || '',
		experience: query.experience || '',
		salary: query.salary || '',
		sort: query.sort || 'latest',
	};

	state.pagination.currentPage = parseInt(query.page) || 1;
};

/**
 * Render page layout
 */
const renderLayout = () => {
	const app = document.getElementById('app');
	if (!app) return;

	app.innerHTML = `
    ${navbar.render()}
    
    <main class="jobs-page">
      <div class="container">
        <div class="page-header">
          <h1>Tìm việc làm IT</h1>
          <p class="page-subtitle">
            Khám phá <span id="total-jobs">...</span> công việc phù hợp với bạn
          </p>
        </div>
        
        <!-- Search Bar -->
        <div id="jobs-search"></div>
        
        <div class="content-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filter-section">
              <h3 class="filter-title">Lọc kết quả</h3>
              
              <div class="filter-group">
                <label class="filter-label">Loại công việc</label>
                <div class="filter-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="jobType" value="full-time" ${
											state.filters.jobType === 'full-time' ? 'checked' : ''
										}>
                    <span>Full-time</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="jobType" value="part-time" ${
											state.filters.jobType === 'part-time' ? 'checked' : ''
										}>
                    <span>Part-time</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="jobType" value="internship" ${
											state.filters.jobType === 'internship' ? 'checked' : ''
										}>
                    <span>Thực tập</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="jobType" value="freelance" ${
											state.filters.jobType === 'freelance' ? 'checked' : ''
										}>
                    <span>Freelance</span>
                  </label>
                </div>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Kinh nghiệm</label>
                <div class="filter-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="experience" value="fresher" ${
											state.filters.experience === 'fresher' ? 'checked' : ''
										}>
                    <span>Fresher</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="experience" value="junior" ${
											state.filters.experience === 'junior' ? 'checked' : ''
										}>
                    <span>Junior (1-2 năm)</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="experience" value="middle" ${
											state.filters.experience === 'middle' ? 'checked' : ''
										}>
                    <span>Middle (3-5 năm)</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="experience" value="senior" ${
											state.filters.experience === 'senior' ? 'checked' : ''
										}>
                    <span>Senior (5+ năm)</span>
                  </label>
                </div>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Mức lương</label>
                <div class="filter-options">
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="" ${
											!state.filters.salary ? 'checked' : ''
										}>
                    <span>Tất cả</span>
                  </label>
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="0-10" ${
											state.filters.salary === '0-10' ? 'checked' : ''
										}>
                    <span>Dưới 10 triệu</span>
                  </label>
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="10-20" ${
											state.filters.salary === '10-20' ? 'checked' : ''
										}>
                    <span>10-20 triệu</span>
                  </label>
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="20-30" ${
											state.filters.salary === '20-30' ? 'checked' : ''
										}>
                    <span>20-30 triệu</span>
                  </label>
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="30-50" ${
											state.filters.salary === '30-50' ? 'checked' : ''
										}>
                    <span>30-50 triệu</span>
                  </label>
                  <label class="filter-radio">
                    <input type="radio" name="salary" value="50+" ${
											state.filters.salary === '50+' ? 'checked' : ''
										}>
                    <span>Trên 50 triệu</span>
                  </label>
                </div>
              </div>
              
              <button class="button button-outline button-full" data-action="reset-filters">
                Xóa bộ lọc
              </button>
            </div>
          </aside>
          
          <!-- Jobs List -->
          <div class="main-content">
            <div class="jobs-header">
              <p id="jobs-count" class="jobs-count">Đang tải...</p>
              
              <div class="sort-dropdown">
                <label for="sort-select">Sắp xếp:</label>
                <select id="sort-select" class="sort-select">
                  <option value="latest" ${
										state.filters.sort === 'latest' ? 'selected' : ''
									}>Mới nhất</option>
                  <option value="relevant" ${
										state.filters.sort === 'relevant' ? 'selected' : ''
									}>Phù hợp nhất</option>
                  <option value="salary-high" ${
										state.filters.sort === 'salary-high' ? 'selected' : ''
									}>Lương cao nhất</option>
                  <option value="salary-low" ${
										state.filters.sort === 'salary-low' ? 'selected' : ''
									}>Lương thấp nhất</option>
                </select>
              </div>
            </div>
            
            <div id="jobs-list" class="job-grid">
              ${skeletonTemplate('job-card', 6)}
            </div>
            
            <div id="jobs-pagination"></div>
          </div>
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
 * Load jobs data
 */
const loadJobs = async () => {
	state.loading = true;

	try {
		const result = await jobsAPI.getJobs({
			...state.filters,
			page: state.pagination.currentPage,
			limit: state.pagination.itemsPerPage,
		});

		state.jobs = result.data || [];
		state.pagination.totalItems = result.pagination?.total || 0;
		state.pagination.totalPages = Math.ceil(
			state.pagination.totalItems / state.pagination.itemsPerPage
		);
		state.loading = false;
	} catch (error) {
		console.error('Error loading jobs:', error);
		state.jobs = [];
		state.loading = false;
	}
};

/**
 * Render page content
 */
const render = () => {
	// Render search bar
	const searchContainer = document.getElementById('jobs-search');
	if (searchContainer) {
		searchContainer.innerHTML = searchBar.render({
			showLocationFilter: true,
			showAdvancedFilters: false,
			initialValues: state.filters,
		});
		searchBar.init(searchContainer, handleSearch);
	}

	// Update total count
	const totalJobs = document.getElementById('total-jobs');
	if (totalJobs) {
		totalJobs.textContent = state.pagination.totalItems.toLocaleString();
	}

	// Update jobs count
	const jobsCount = document.getElementById('jobs-count');
	if (jobsCount) {
		const start =
			(state.pagination.currentPage - 1) * state.pagination.itemsPerPage + 1;
		const end = Math.min(
			state.pagination.currentPage * state.pagination.itemsPerPage,
			state.pagination.totalItems
		);
		jobsCount.textContent = `Hiển thị ${start}-${end} trong ${state.pagination.totalItems} công việc`;
	}

	// Render jobs list
	const jobsList = document.getElementById('jobs-list');
	if (jobsList) {
		if (state.loading) {
			jobsList.innerHTML = skeletonTemplate('job-card', 6);
		} else {
			jobsList.innerHTML = jobCard.renderList(state.jobs);
			jobsList
				.querySelectorAll('.job-card')
				.forEach((card) => jobCard.init(card));
		}
	}

	// Render pagination
	const paginationContainer = document.getElementById('jobs-pagination');
	if (paginationContainer && state.pagination.totalPages > 1) {
		paginationContainer.innerHTML = pagination.render(state.pagination);
		pagination.init(paginationContainer, handlePageChange);
	}
};

/**
 * Handle search
 */
const handleSearch = async (params) => {
	state.filters = { ...state.filters, ...params };
	state.pagination.currentPage = 1;

	await loadJobs();
	render();
	updateURL();
};

/**
 * Handle page change
 */
const handlePageChange = async (page) => {
	state.pagination.currentPage = page;

	await loadJobs();
	render();
	updateURL();

	// Scroll to top
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Attach event listeners
 */
const attachEventListeners = () => {
	// Filter checkboxes
	const filterInputs = document.querySelectorAll('.filters-sidebar input');
	filterInputs.forEach((input) => {
		input.addEventListener('change', async () => {
			const name = input.getAttribute('name');
			const value = input.value;

			if (input.type === 'checkbox') {
				state.filters[name] = input.checked ? value : '';
			} else if (input.type === 'radio') {
				state.filters[name] = value;
			}

			state.pagination.currentPage = 1;
			await loadJobs();
			render();
			updateURL();
		});
	});

	// Sort dropdown
	const sortSelect = document.getElementById('sort-select');
	if (sortSelect) {
		sortSelect.addEventListener('change', async () => {
			state.filters.sort = sortSelect.value;
			state.pagination.currentPage = 1;
			await loadJobs();
			render();
			updateURL();
		});
	}

	// Reset filters button
	const resetBtn = document.querySelector('[data-action="reset-filters"]');
	if (resetBtn) {
		resetBtn.addEventListener('click', async () => {
			state.filters = {
				keyword: '',
				location: '',
				jobType: '',
				experience: '',
				salary: '',
				sort: 'latest',
			};
			state.pagination.currentPage = 1;

			await loadJobs();
			renderLayout();
			render();
			attachEventListeners();
			updateURL();
		});
	}
};

/**
 * Update URL with current filters
 */
const updateURL = () => {
	const params = new URLSearchParams();

	Object.entries(state.filters).forEach(([key, value]) => {
		if (value) params.set(key, value);
	});

	if (state.pagination.currentPage > 1) {
		params.set('page', state.pagination.currentPage);
	}

	const queryString = params.toString();
	const newURL = queryString ? `/jobs?${queryString}` : '/jobs';

	window.history.pushState({}, '', newURL);
};

/**
 * Cleanup
 */
export const destroy = () => {
	// Cleanup if needed
};

export default { init, destroy };
