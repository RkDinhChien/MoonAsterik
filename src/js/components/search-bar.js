/**
 * Search Bar Component
 * Job search with filters
 */

import { escapeHtml } from '../utils/templates.js';

/**
 * Render search bar
 * @param {Object} options - Search bar options
 * @returns {string} - HTML string
 */
export const render = (options = {}) => {
	const {
		placeholder = 'Tìm kiếm công việc, kỹ năng...',
		showLocationFilter = true,
		showAdvancedFilters = false,
		variant = 'default', // default, minimal, hero
		initialValues = {},
	} = options;

	const {
		keyword = '',
		location = '',
		jobType = '',
		experience = '',
	} = initialValues;

	if (variant === 'hero') {
		return renderHeroSearch({ placeholder, keyword, location });
	}

	if (variant === 'minimal') {
		return renderMinimalSearch({ placeholder, keyword });
	}

	return `
    <div class="search-bar ${showAdvancedFilters ? 'search-bar-advanced' : ''}">
      <form class="search-form" data-search-form>
        <div class="search-bar-main">
          <div class="search-input-group">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              name="keyword"
              placeholder="${escapeHtml(placeholder)}"
              value="${escapeHtml(keyword)}"
              aria-label="Search jobs"
            >
          </div>
          
          ${
						showLocationFilter
							? `
            <div class="search-input-group">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input 
                type="text" 
                class="search-input" 
                name="location"
                placeholder="Địa điểm"
                value="${escapeHtml(location)}"
                aria-label="Location"
              >
            </div>
          `
							: ''
					}
          
          <button type="submit" class="button button-primary search-submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span>Tìm kiếm</span>
          </button>
          
          ${
						showAdvancedFilters
							? `
            <button type="button" class="button button-outline search-filter-toggle" data-action="toggle-filters">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Bộ lọc</span>
            </button>
          `
							: ''
					}
        </div>
        
        ${
					showAdvancedFilters
						? `
          <div class="search-filters" hidden>
            <div class="filter-group">
              <label class="filter-label">Loại công việc</label>
              <select name="jobType" class="filter-select">
                <option value="">Tất cả</option>
                <option value="full-time" ${
									jobType === 'full-time' ? 'selected' : ''
								}>Full-time</option>
                <option value="part-time" ${
									jobType === 'part-time' ? 'selected' : ''
								}>Part-time</option>
                <option value="internship" ${
									jobType === 'internship' ? 'selected' : ''
								}>Thực tập</option>
                <option value="freelance" ${
									jobType === 'freelance' ? 'selected' : ''
								}>Freelance</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Kinh nghiệm</label>
              <select name="experience" class="filter-select">
                <option value="">Tất cả</option>
                <option value="fresher" ${
									experience === 'fresher' ? 'selected' : ''
								}>Fresher</option>
                <option value="junior" ${
									experience === 'junior' ? 'selected' : ''
								}>Junior (1-2 năm)</option>
                <option value="middle" ${
									experience === 'middle' ? 'selected' : ''
								}>Middle (3-5 năm)</option>
                <option value="senior" ${
									experience === 'senior' ? 'selected' : ''
								}>Senior (5+ năm)</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Mức lương</label>
              <select name="salary" class="filter-select">
                <option value="">Tất cả</option>
                <option value="0-10">Dưới 10 triệu</option>
                <option value="10-20">10-20 triệu</option>
                <option value="20-30">20-30 triệu</option>
                <option value="30-50">30-50 triệu</option>
                <option value="50+">Trên 50 triệu</option>
              </select>
            </div>
            
            <div class="filter-actions">
              <button type="button" class="button button-sm button-outline" data-action="reset-filters">
                Xóa bộ lọc
              </button>
              <button type="submit" class="button button-sm button-primary">
                Áp dụng
              </button>
            </div>
          </div>
        `
						: ''
				}
      </form>
    </div>
  `;
};

/**
 * Render hero search (for landing page)
 */
const renderHeroSearch = ({ placeholder, keyword, location }) => {
	return `
    <div class="search-bar search-bar-hero">
      <form class="search-form" data-search-form>
        <div class="search-bar-hero-content">
          <div class="search-input-group search-input-hero">
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              name="keyword"
              placeholder="${escapeHtml(placeholder)}"
              value="${escapeHtml(keyword)}"
              aria-label="Search jobs"
            >
          </div>
          
          <div class="search-input-group search-input-hero">
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              name="location"
              placeholder="Địa điểm"
              value="${escapeHtml(location)}"
              aria-label="Location"
            >
          </div>
          
          <button type="submit" class="button button-primary button-lg search-submit-hero">
            Tìm kiếm việc làm
          </button>
        </div>
        
        <div class="search-suggestions">
          <span class="suggestion-label">Gợi ý:</span>
          <a href="/jobs?keyword=ReactJS" class="suggestion-tag">ReactJS</a>
          <a href="/jobs?keyword=NodeJS" class="suggestion-tag">NodeJS</a>
          <a href="/jobs?keyword=Python" class="suggestion-tag">Python</a>
          <a href="/jobs?keyword=Java" class="suggestion-tag">Java</a>
          <a href="/jobs?keyword=DevOps" class="suggestion-tag">DevOps</a>
        </div>
      </form>
    </div>
  `;
};

/**
 * Render minimal search
 */
const renderMinimalSearch = ({ placeholder, keyword }) => {
	return `
    <div class="search-bar search-bar-minimal">
      <form class="search-form" data-search-form>
        <div class="search-input-group">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            type="text" 
            class="search-input" 
            name="keyword"
            placeholder="${escapeHtml(placeholder)}"
            value="${escapeHtml(keyword)}"
            aria-label="Search"
          >
          <button type="submit" class="search-submit-minimal" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </div>
  `;
};

/**
 * Initialize search bar interactions
 * @param {HTMLElement} element - Search bar element
 * @param {Function} onSearch - Callback when search is submitted
 */
export const init = (element, onSearch) => {
	if (!element) return;

	const form = element.querySelector('[data-search-form]');
	if (!form) return;

	// Form submit
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const params = {};

		for (const [key, value] of formData.entries()) {
			if (value.trim()) {
				params[key] = value.trim();
			}
		}

		if (onSearch) {
			onSearch(params);
		}
	});

	// Toggle advanced filters
	const toggleBtn = element.querySelector('[data-action="toggle-filters"]');
	const filters = element.querySelector('.search-filters');

	if (toggleBtn && filters) {
		toggleBtn.addEventListener('click', () => {
			const isHidden = filters.hidden;
			filters.hidden = !isHidden;
			toggleBtn.classList.toggle('active', !isHidden);
		});
	}

	// Reset filters
	const resetBtn = element.querySelector('[data-action="reset-filters"]');
	if (resetBtn) {
		resetBtn.addEventListener('click', () => {
			// Reset form
			form.reset();

			// Trigger search
			if (onSearch) {
				onSearch({});
			}
		});
	}

	// Suggestion tags
	const suggestionTags = element.querySelectorAll('.suggestion-tag');
	suggestionTags.forEach((tag) => {
		tag.addEventListener('click', (e) => {
			e.preventDefault();
			const keyword = tag.textContent.trim();
			const keywordInput = form.querySelector('input[name="keyword"]');
			if (keywordInput) {
				keywordInput.value = keyword;
				form.dispatchEvent(new Event('submit', { cancelable: true }));
			}
		});
	});

	// Auto-complete (TODO: implement with API)
	const keywordInput = form.querySelector('input[name="keyword"]');
	if (keywordInput) {
		let timeout;
		keywordInput.addEventListener('input', (e) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				const value = e.target.value.trim();
				if (value.length >= 2) {
					// TODO: Fetch suggestions from API
					// showSuggestions(value);
				}
			}, 300);
		});
	}
};

export default {
	render,
	init,
};
