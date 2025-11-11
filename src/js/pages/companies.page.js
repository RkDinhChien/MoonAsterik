/**
 * Companies Listing Page Controller
 */

import * as companiesAPI from '../api/companies.api.js';
import navbar from '../components/navbar.js';
import footer from '../components/footer.js';
import searchBar from '../components/search-bar.js';
import companyCard from '../components/company-card.js';
import pagination from '../components/pagination.js';
import { skeletonTemplate } from '../utils/templates.js';

let state = {
	companies: [],
	filters: {
		keyword: '',
		industry: '',
		size: '',
		location: '',
		sort: 'featured',
	},
	pagination: {
		currentPage: 1,
		itemsPerPage: 12,
		totalItems: 0,
		totalPages: 0,
	},
	industries: [],
	loading: true,
};

/**
 * Initialize companies page
 */
export const init = async (query = {}) => {
	parseQueryParams(query);
	renderLayout();
	await Promise.all([loadCompanies(), loadIndustries()]);
	render();
	attachEventListeners();
};

/**
 * Parse query parameters
 */
const parseQueryParams = (query) => {
	state.filters = {
		keyword: query.keyword || '',
		industry: query.industry || '',
		size: query.size || '',
		location: query.location || '',
		sort: query.sort || 'featured',
	};
	state.pagination.currentPage = parseInt(query.page) || 1;
};

/**
 * Render layout
 */
const renderLayout = () => {
	const app = document.getElementById('app');
	if (!app) return;

	app.innerHTML = `
    ${navbar.render()}
    
    <main class="companies-page">
      <div class="container">
        <div class="page-header">
          <h1>Khám phá công ty IT</h1>
          <p class="page-subtitle">
            Tìm hiểu về <span id="total-companies">...</span> công ty hàng đầu
          </p>
        </div>
        
        <div id="companies-search"></div>
        
        <div class="content-layout">
          <aside class="filters-sidebar">
            <div class="filter-section">
              <h3 class="filter-title">Lọc kết quả</h3>
              
              <div class="filter-group">
                <label class="filter-label">Ngành nghề</label>
                <div class="filter-options" id="industry-filters"></div>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Quy mô</label>
                <div class="filter-options">
                  <label class="filter-checkbox">
                    <input type="checkbox" name="size" value="1-50">
                    <span>1-50 nhân viên</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="size" value="51-200">
                    <span>51-200 nhân viên</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="size" value="201-500">
                    <span>201-500 nhân viên</span>
                  </label>
                  <label class="filter-checkbox">
                    <input type="checkbox" name="size" value="500+">
                    <span>500+ nhân viên</span>
                  </label>
                </div>
              </div>
              
              <button class="button button-outline button-full" data-action="reset-filters">
                Xóa bộ lọc
              </button>
            </div>
          </aside>
          
          <div class="main-content">
            <div class="companies-header">
              <p id="companies-count" class="companies-count">Đang tải...</p>
              
              <div class="sort-dropdown">
                <label for="sort-select">Sắp xếp:</label>
                <select id="sort-select" class="sort-select">
                  <option value="featured">Nổi bật</option>
                  <option value="name">Tên A-Z</option>
                  <option value="jobs">Nhiều việc làm</option>
                </select>
              </div>
            </div>
            
            <div id="companies-list" class="company-grid">
              ${skeletonTemplate('company-card', 6)}
            </div>
            
            <div id="companies-pagination"></div>
          </div>
        </div>
      </div>
    </main>
    
    ${footer.render()}
  `;

	const navElement = document.querySelector('.navbar');
	if (navElement) navbar.init(navElement);

	const footerElement = document.querySelector('.footer');
	if (footerElement) footer.init(footerElement);
};

/**
 * Load companies
 */
const loadCompanies = async () => {
	state.loading = true;

	try {
		const result = await companiesAPI.getCompanies({
			...state.filters,
			page: state.pagination.currentPage,
			limit: state.pagination.itemsPerPage,
		});

		state.companies = result.data || [];
		state.pagination.totalItems = result.pagination?.total || 0;
		state.pagination.totalPages = Math.ceil(
			state.pagination.totalItems / state.pagination.itemsPerPage
		);
		state.loading = false;
	} catch (error) {
		console.error('Error loading companies:', error);
		state.companies = [];
		state.loading = false;
	}
};

/**
 * Load industries
 */
const loadIndustries = async () => {
	try {
		const result = await companiesAPI.getIndustries();
		state.industries = result.data || [];
	} catch (error) {
		console.error('Error loading industries:', error);
		state.industries = [];
	}
};

/**
 * Render content
 */
const render = () => {
	// Render search
	const searchContainer = document.getElementById('companies-search');
	if (searchContainer) {
		searchContainer.innerHTML = searchBar.render({
			placeholder: 'Tìm kiếm công ty...',
			variant: 'minimal',
			initialValues: { keyword: state.filters.keyword },
		});
		searchBar.init(searchContainer, handleSearch);
	}

	// Render industry filters
	const industryFilters = document.getElementById('industry-filters');
	if (industryFilters) {
		industryFilters.innerHTML = state.industries
			.map(
				(industry) => `
      <label class="filter-checkbox">
        <input type="checkbox" name="industry" value="${
					industry.slug || industry.name
				}">
        <span>${industry.name} (${industry.count || 0})</span>
      </label>
    `
			)
			.join('');
	}

	// Update counts
	const totalCompanies = document.getElementById('total-companies');
	if (totalCompanies) {
		totalCompanies.textContent = state.pagination.totalItems.toLocaleString();
	}

	const companiesCount = document.getElementById('companies-count');
	if (companiesCount) {
		const start =
			(state.pagination.currentPage - 1) * state.pagination.itemsPerPage + 1;
		const end = Math.min(
			state.pagination.currentPage * state.pagination.itemsPerPage,
			state.pagination.totalItems
		);
		companiesCount.textContent = `Hiển thị ${start}-${end} trong ${state.pagination.totalItems} công ty`;
	}

	// Render companies
	const companiesList = document.getElementById('companies-list');
	if (companiesList) {
		if (state.loading) {
			companiesList.innerHTML = skeletonTemplate('company-card', 6);
		} else {
			companiesList.innerHTML = companyCard.renderList(state.companies);
			companiesList
				.querySelectorAll('.company-card')
				.forEach((card) => companyCard.init(card));
		}
	}

	// Render pagination
	const paginationContainer = document.getElementById('companies-pagination');
	if (paginationContainer && state.pagination.totalPages > 1) {
		paginationContainer.innerHTML = pagination.render(state.pagination);
		pagination.init(paginationContainer, handlePageChange);
	}
};

/**
 * Handle search
 */
const handleSearch = async (params) => {
	state.filters.keyword = params.keyword || '';
	state.pagination.currentPage = 1;
	await loadCompanies();
	render();
	updateURL();
};

/**
 * Handle page change
 */
const handlePageChange = async (page) => {
	state.pagination.currentPage = page;
	await loadCompanies();
	render();
	updateURL();
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Attach event listeners
 */
const attachEventListeners = () => {
	// Filter inputs
	const filterInputs = document.querySelectorAll('.filters-sidebar input');
	filterInputs.forEach((input) => {
		input.addEventListener('change', async () => {
			const name = input.getAttribute('name');
			const value = input.value;
			state.filters[name] = input.checked ? value : '';
			state.pagination.currentPage = 1;
			await loadCompanies();
			render();
			updateURL();
		});
	});

	// Sort select
	const sortSelect = document.getElementById('sort-select');
	if (sortSelect) {
		sortSelect.addEventListener('change', async () => {
			state.filters.sort = sortSelect.value;
			state.pagination.currentPage = 1;
			await loadCompanies();
			render();
			updateURL();
		});
	}

	// Reset filters
	const resetBtn = document.querySelector('[data-action="reset-filters"]');
	if (resetBtn) {
		resetBtn.addEventListener('click', async () => {
			state.filters = {
				keyword: '',
				industry: '',
				size: '',
				location: '',
				sort: 'featured',
			};
			state.pagination.currentPage = 1;
			await loadCompanies();
			renderLayout();
			await loadIndustries();
			render();
			attachEventListeners();
			updateURL();
		});
	}
};

/**
 * Update URL
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
	const newURL = queryString ? `/companies?${queryString}` : '/companies';
	window.history.pushState({}, '', newURL);
};

export const destroy = () => {};

export default { init, destroy };
