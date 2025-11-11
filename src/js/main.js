/**
 * Main Application Entry Point (New Architecture)
 * Integrates router, store, and page controllers
 *
 * This file replaces the old /js/app.js with a modern architecture
 * using ES6 modules, centralized state management, and SPA routing
 */

import Router from './core/router.js';
import store from './core/store.js';
import * as pages from './pages/index.js';

/**
 * Application class
 */
class App {
	constructor() {
		this.router = null;
		this.currentPage = null;
	}

	/**
	 * Initialize application
	 */
	async init() {
		console.log('🚀 MoonAsterik Application Starting...');

		// Initialize store
		await this.initStore();

		// Initialize router
		this.initRouter();

		// Setup global error handler
		this.setupErrorHandler();

		// Expose to window for debugging
		window.app = this;
		window.router = this.router;
		window.store = store;

		console.log('✅ Application Ready');
	}

	/**
	 * Initialize store
	 */
	async initStore() {
		// Load initial state from localStorage
		const savedState = localStorage.getItem('app-state');
		if (savedState) {
			try {
				const state = JSON.parse(savedState);
				Object.assign(store.state, state);
			} catch (error) {
				console.error('Error loading saved state:', error);
			}
		}

		// Subscribe to state changes for persistence
		store.subscribe('*', () => {
			localStorage.setItem(
				'app-state',
				JSON.stringify({
					isLoggedIn: store.state.isLoggedIn,
					userType: store.state.userType,
					user: store.state.user,
					savedJobs: store.state.savedJobs,
				})
			);
		});

		// Setup store actions
		this.setupStoreActions();

		console.log('📦 Store initialized');
	}

	/**
	 * Setup store actions
	 */
	setupStoreActions() {
		// Login action
		store.actions.login = async ({ email, password, userType }) => {
			// TODO: Call login API
			return new Promise((resolve) => {
				setTimeout(() => {
					store.commit('SET_LOGGED_IN', true);
					store.commit('SET_USER_TYPE', userType);
					store.commit('SET_USER', {
						id: Date.now(),
						name: 'Test User',
						email,
					});
					resolve({ success: true });
				}, 1000);
			});
		};

		// Logout action
		store.actions.logout = async () => {
			store.commit('SET_LOGGED_IN', false);
			store.commit('SET_USER_TYPE', null);
			store.commit('SET_USER', null);
			localStorage.removeItem('app-state');
			return { success: true };
		};

		// Save job action
		store.actions.saveJob = async (jobId) => {
			const savedJobs = store.state.savedJobs || [];
			if (!savedJobs.includes(jobId)) {
				store.commit('SET_SAVED_JOBS', [...savedJobs, jobId]);
			}
			return { success: true };
		};

		// Unsave job action
		store.actions.unsaveJob = async (jobId) => {
			const savedJobs = store.state.savedJobs || [];
			store.commit(
				'SET_SAVED_JOBS',
				savedJobs.filter((id) => id !== jobId)
			);
			return { success: true };
		};

		// Setup mutations
		store.mutations.SET_LOGGED_IN = (state, value) => {
			state.isLoggedIn = value;
		};

		store.mutations.SET_USER_TYPE = (state, value) => {
			state.userType = value;
		};

		store.mutations.SET_USER = (state, value) => {
			state.user = value;
		};

		store.mutations.SET_SAVED_JOBS = (state, value) => {
			state.savedJobs = value;
		};
	}

	/**
	 * Initialize router
	 */
	initRouter() {
		this.router = new Router();

		// Define routes
		this.defineRoutes();

		// Setup navigation guards
		this.setupGuards();

		// Start router
		this.router.start();

		console.log('🧭 Router initialized');
	}

	/**
	 * Define application routes
	 */
	defineRoutes() {
		// Home page
		this.router.addRoute('/', 'home', () => {
			this.loadPage(pages.home);
		});

		// Jobs pages
		this.router.addRoute('/jobs', 'jobs', () => {
			const query = this.parseQueryString();
			this.loadPage(pages.jobs, query);
		});

		this.router.addRoute('/job/:id', 'job-detail', (params) => {
			this.loadPage(pages.jobDetail, params.id);
		});

		// Companies pages
		this.router.addRoute('/companies', 'companies', () => {
			const query = this.parseQueryString();
			this.loadPage(pages.companies, query);
		});

		this.router.addRoute('/company/:id', 'company-detail', (params) => {
			// TODO: Load company detail page when created
			console.log('Company detail:', params.id);
		});

		// Job fairs pages
		this.router.addRoute('/fairs', 'fairs', () => {
			// TODO: Load fairs page when created
			console.log('Fairs page');
		});

		this.router.addRoute('/fair/:id', 'fair-detail', (params) => {
			// TODO: Load fair detail page when created
			console.log('Fair detail:', params.id);
		});

		// Blog pages
		this.router.addRoute('/blog', 'blog', () => {
			// TODO: Load blog page when created
			console.log('Blog page');
		});

		this.router.addRoute('/blog/:slug', 'blog-article', (params) => {
			// TODO: Load blog article page when created
			console.log('Blog article:', params.slug);
		});

		// Pricing page
		this.router.addRoute('/pricing', 'pricing', () => {
			// TODO: Load pricing page when created
			console.log('Pricing page');
		});

		// Student pages (protected)
		this.router.addRoute(
			'/dashboard',
			'student-dashboard',
			() => {
				// TODO: Load student dashboard when created
				console.log('Student dashboard');
			},
			{ requiresAuth: true, userType: 'student' }
		);

		this.router.addRoute(
			'/saved',
			'student-saved',
			() => {
				// TODO: Load saved jobs page when created
				console.log('Saved jobs');
			},
			{ requiresAuth: true, userType: 'student' }
		);

		this.router.addRoute(
			'/applications',
			'student-applications',
			() => {
				// TODO: Load applications page when created
				console.log('Applications');
			},
			{ requiresAuth: true, userType: 'student' }
		);

		this.router.addRoute(
			'/profile',
			'student-profile',
			() => {
				// TODO: Load profile page when created
				console.log('Profile');
			},
			{ requiresAuth: true, userType: 'student' }
		);

		// Employer pages (protected)
		this.router.addRoute(
			'/employer/dashboard',
			'employer-dashboard',
			() => {
				// TODO: Load employer dashboard when created
				console.log('Employer dashboard');
			},
			{ requiresAuth: true, userType: 'employer' }
		);

		this.router.addRoute(
			'/employer/jobs',
			'employer-jobs',
			() => {
				// TODO: Load employer jobs when created
				console.log('Employer jobs');
			},
			{ requiresAuth: true, userType: 'employer' }
		);

		this.router.addRoute(
			'/employer/post-job',
			'employer-post-job',
			() => {
				// TODO: Load post job page when created
				console.log('Post job');
			},
			{ requiresAuth: true, userType: 'employer' }
		);

		this.router.addRoute(
			'/employer/candidates',
			'employer-candidates',
			() => {
				// TODO: Load candidates page when created
				console.log('Candidates');
			},
			{ requiresAuth: true, userType: 'employer' }
		);

		// 404 Not Found
		this.router.setNotFoundHandler(() => {
			document.getElementById('app').innerHTML = `
        <div class="error-page">
          <h1>404</h1>
          <p>Page not found</p>
          <a href="/" class="button button-primary">Go Home</a>
        </div>
      `;
		});
	}

	/**
	 * Setup navigation guards
	 */
	setupGuards() {
		// Auth guard
		this.router.beforeEach((to, from, next) => {
			if (to.meta?.requiresAuth && !store.state.isLoggedIn) {
				window.location.href = `/login?returnTo=${encodeURIComponent(to.path)}`;
				return false;
			}

			if (to.meta?.userType && store.state.userType !== to.meta.userType) {
				console.warn('Unauthorized access attempt');
				this.router.navigate('/');
				return false;
			}

			return next();
		});

		// Loading indicator
		this.router.beforeEach((to, from, next) => {
			this.showLoadingIndicator();
			return next();
		});

		this.router.afterEach(() => {
			this.hideLoadingIndicator();
			window.scrollTo(0, 0);
		});
	}

	/**
	 * Load page controller
	 */
	async loadPage(pageController, ...args) {
		try {
			if (this.currentPage && this.currentPage.destroy) {
				this.currentPage.destroy();
			}

			if (pageController && pageController.init) {
				await pageController.init(...args);
				this.currentPage = pageController;
			}
		} catch (error) {
			console.error('Error loading page:', error);
			this.showErrorPage(error);
		}
	}

	/**
	 * Parse query string
	 */
	parseQueryString() {
		const params = new URLSearchParams(window.location.search);
		const query = {};
		for (const [key, value] of params) {
			query[key] = value;
		}
		return query;
	}

	/**
	 * Show loading indicator
	 */
	showLoadingIndicator() {
		let indicator = document.getElementById('loading-indicator');
		if (!indicator) {
			indicator = document.createElement('div');
			indicator.id = 'loading-indicator';
			indicator.className = 'loading-indicator';
			indicator.innerHTML = '<div class="spinner"></div>';
			document.body.appendChild(indicator);
		}
		indicator.classList.add('active');
	}

	/**
	 * Hide loading indicator
	 */
	hideLoadingIndicator() {
		const indicator = document.getElementById('loading-indicator');
		if (indicator) {
			indicator.classList.remove('active');
			setTimeout(() => indicator.remove(), 300);
		}
	}

	/**
	 * Show error page
	 */
	showErrorPage(error) {
		const app = document.getElementById('app');
		if (app) {
			app.innerHTML = `
        <div class="error-page">
          <h1>Oops!</h1>
          <p>Something went wrong</p>
          <p class="error-message">${error.message}</p>
          <button class="button button-primary" onclick="window.location.reload()">Reload</button>
        </div>
      `;
		}
	}

	/**
	 * Setup global error handler
	 */
	setupErrorHandler() {
		window.addEventListener('error', (event) => {
			console.error('Global error:', event.error);
		});

		window.addEventListener('unhandledrejection', (event) => {
			console.error('Unhandled promise rejection:', event.reason);
		});
	}
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		const app = new App();
		app.init();
	});
} else {
	const app = new App();
	app.init();
}

export default App;
