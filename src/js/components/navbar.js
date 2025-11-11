/**
 * Navbar Component
 * Dynamic navigation bar based on authentication state
 */

import store from '../core/store.js';
import { escapeHtml } from '../utils/templates.js';

/**
 * Render navbar HTML
 * @param {Object} options - Navbar options
 * @returns {string} - HTML string
 */
export const render = (options = {}) => {
	const { variant = 'default' } = options;
	const { isLoggedIn, userType, user } = store.state;

	if (!isLoggedIn) {
		return renderPreLoginNavbar();
	}

	if (userType === 'student') {
		return renderStudentNavbar(user);
	}

	if (userType === 'employer') {
		return renderEmployerNavbar(user);
	}

	return renderPreLoginNavbar();
};

/**
 * Render pre-login navbar
 */
const renderPreLoginNavbar = () => {
	return `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a href="/" class="navbar-logo">
            <span class="logo-text">Moon<span class="logo-asterisk">*</span></span>
          </a>
        </div>
        
        <button class="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div class="navbar-menu">
          <ul class="navbar-nav">
            <li><a href="/jobs" class="navbar-link">Việc làm</a></li>
            <li><a href="/companies" class="navbar-link">Công ty</a></li>
            <li><a href="/fairs" class="navbar-link">Job Fair</a></li>
            <li><a href="/pricing" class="navbar-link">Bảng giá</a></li>
            <li><a href="/blog" class="navbar-link">Blog</a></li>
          </ul>
          
          <div class="navbar-actions">
            <button class="button button-outline button-sm" data-action="login">
              Đăng nhập
            </button>
            <button class="button button-primary button-sm" data-action="register">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
};

/**
 * Render student navbar
 */
const renderStudentNavbar = (user) => {
	return `
    <nav class="navbar navbar-student" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a href="/dashboard" class="navbar-logo">
            <span class="logo-text">Moon<span class="logo-asterisk">*</span></span>
          </a>
        </div>
        
        <button class="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div class="navbar-menu">
          <ul class="navbar-nav">
            <li><a href="/dashboard" class="navbar-link">Dashboard</a></li>
            <li><a href="/jobs" class="navbar-link">Tìm việc</a></li>
            <li><a href="/saved" class="navbar-link">Đã lưu</a></li>
            <li><a href="/applications" class="navbar-link">Ứng tuyển</a></li>
            <li><a href="/fairs" class="navbar-link">Job Fair</a></li>
          </ul>
          
          <div class="navbar-actions">
            <button class="navbar-notification" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span class="notification-badge">3</span>
            </button>
            
            <div class="navbar-user">
              <button class="user-menu-toggle" aria-label="User menu" aria-expanded="false">
                <div class="user-avatar">
                  ${
										user.avatar
											? `<img src="${escapeHtml(
													user.avatar
											  )}" alt="${escapeHtml(user.name)}">`
											: `<span>${escapeHtml(user.name?.[0] || 'U')}</span>`
									}
                </div>
                <span class="user-name">${escapeHtml(
									user.name || 'Student'
								)}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </button>
              
              <div class="user-menu" hidden>
                <a href="/profile" class="user-menu-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-3.866 0-7 1.79-7 4v1h14v-1c0-2.21-3.134-4-7-4z"/>
                  </svg>
                  Hồ sơ của tôi
                </a>
                <a href="/profile" class="user-menu-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z"/>
                  </svg>
                  Cài đặt
                </a>
                <hr class="user-menu-divider">
                <button class="user-menu-item" data-action="logout">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3v2H4v8h2v2zm5-12h-1v2h1v8h-1v2h1a1 1 0 001-1V3a1 1 0 00-1-1z"/>
                    <path d="M10.586 8L8.293 5.707l1.414-1.414L13.414 8l-3.707 3.707-1.414-1.414L10.586 8z"/>
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
};

/**
 * Render employer navbar
 */
const renderEmployerNavbar = (user) => {
	return `
    <nav class="navbar navbar-employer" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a href="/employer/dashboard" class="navbar-logo">
            <span class="logo-text">Moon<span class="logo-asterisk">*</span></span>
          </a>
        </div>
        
        <button class="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div class="navbar-menu">
          <ul class="navbar-nav">
            <li><a href="/employer/dashboard" class="navbar-link">Dashboard</a></li>
            <li><a href="/employer/jobs" class="navbar-link">Tin tuyển dụng</a></li>
            <li><a href="/employer/candidates" class="navbar-link">Ứng viên</a></li>
            <li><a href="/employer/campaigns" class="navbar-link">Chiến dịch</a></li>
            <li><a href="/employer/fairs" class="navbar-link">Job Fair</a></li>
          </ul>
          
          <div class="navbar-actions">
            <button class="button button-primary button-sm" data-action="post-job">
              + Đăng tin
            </button>
            
            <button class="navbar-notification" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span class="notification-badge">5</span>
            </button>
            
            <div class="navbar-user">
              <button class="user-menu-toggle" aria-label="User menu" aria-expanded="false">
                <div class="user-avatar">
                  ${
										user.avatar
											? `<img src="${escapeHtml(
													user.avatar
											  )}" alt="${escapeHtml(user.companyName || user.name)}">`
											: `<span>${escapeHtml(
													(user.companyName || user.name)?.[0] || 'E'
											  )}</span>`
									}
                </div>
                <span class="user-name">${escapeHtml(
									user.companyName || user.name || 'Employer'
								)}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </button>
              
              <div class="user-menu" hidden>
                <a href="/employer/profile" class="user-menu-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
                  </svg>
                  Thông tin công ty
                </a>
                <a href="/employer/settings" class="user-menu-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z"/>
                  </svg>
                  Cài đặt
                </a>
                <hr class="user-menu-divider">
                <button class="user-menu-item" data-action="logout">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3v2H4v8h2v2zm5-12h-1v2h1v8h-1v2h1a1 1 0 001-1V3a1 1 0 00-1-1z"/>
                    <path d="M10.586 8L8.293 5.707l1.414-1.414L13.414 8l-3.707 3.707-1.414-1.414L10.586 8z"/>
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
};

/**
 * Initialize navbar interactions
 * @param {HTMLElement} element - Navbar element
 */
export const init = (element) => {
	if (!element) return;

	// Mobile menu toggle
	const toggle = element.querySelector('.navbar-toggle');
	const menu = element.querySelector('.navbar-menu');

	if (toggle && menu) {
		toggle.addEventListener('click', () => {
			const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', !isExpanded);
			menu.classList.toggle('active');
		});
	}

	// User menu toggle
	const userMenuToggle = element.querySelector('.user-menu-toggle');
	const userMenu = element.querySelector('.user-menu');

	if (userMenuToggle && userMenu) {
		userMenuToggle.addEventListener('click', () => {
			const isExpanded =
				userMenuToggle.getAttribute('aria-expanded') === 'true';
			userMenuToggle.setAttribute('aria-expanded', !isExpanded);
			userMenu.hidden = isExpanded;
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!userMenuToggle.contains(e.target) && !userMenu.contains(e.target)) {
				userMenuToggle.setAttribute('aria-expanded', 'false');
				userMenu.hidden = true;
			}
		});
	}

	// Handle logout
	const logoutBtn = element.querySelector('[data-action="logout"]');
	if (logoutBtn) {
		logoutBtn.addEventListener('click', async () => {
			await store.dispatch('logout');
			window.location.href = '/';
		});
	}

	// Handle post job button
	const postJobBtn = element.querySelector('[data-action="post-job"]');
	if (postJobBtn) {
		postJobBtn.addEventListener('click', () => {
			if (window.router) {
				window.router.navigate('post-job');
			} else {
				window.location.href = '/employer/post-job';
			}
		});
	}

	// Subscribe to auth state changes
	const unsubscribe = store.subscribe('SET_LOGGED_IN', () => {
		updateNavbar(element);
	});

	// Store unsubscribe function for cleanup
	element._unsubscribe = unsubscribe;
};

/**
 * Update navbar when state changes
 */
const updateNavbar = (element) => {
	const newHtml = render();
	element.outerHTML = newHtml;

	// Re-initialize the new element
	const newElement = document.querySelector('.navbar');
	if (newElement) {
		init(newElement);
	}
};

/**
 * Cleanup navbar
 * @param {HTMLElement} element - Navbar element
 */
export const destroy = (element) => {
	if (element && element._unsubscribe) {
		element._unsubscribe();
	}
};

export default {
	render,
	init,
	destroy,
};
