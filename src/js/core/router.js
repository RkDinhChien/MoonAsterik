/**
 * Enhanced Router Module
 * Supports multi-page navigation, hash routing, URL parameters, and route guards
 */

class Router {
	constructor() {
		this.BASE_PATH = '';
		this.routes = new Map();
		this.currentRoute = null;
		this.guards = [];
		this.beforeHooks = [];
		this.afterHooks = [];
	}

	/**
	 * Register a route
	 * @param {string} path - Route path (supports :params)
	 * @param {Function} handler - Route handler function
	 * @param {Object} meta - Route metadata (requiresAuth, roles, etc.)
	 */
	register(path, handler, meta = {}) {
		this.routes.set(path, { handler, meta, pattern: this.pathToRegex(path) });
	}

	/**
	 * Convert path pattern to regex
	 * @param {string} path - Path with :param syntax
	 * @returns {RegExp}
	 */
	pathToRegex(path) {
		const pattern = path
			.replace(/\//g, '\\/')
			.replace(/:(\w+)/g, '(?<$1>[^/]+)');
		return new RegExp(`^${pattern}$`);
	}

	/**
	 * Generate URL for a named path
	 * @param {string} page - Page name
	 * @param {Object} params - URL parameters
	 * @returns {string}
	 */
	pathFor(page, params = {}) {
		if (page === 'landing' || page === 'home') {
			return (this.BASE_PATH || '') + '/';
		}

		let path = (this.BASE_PATH || '') + '/' + page;

		// Replace params in path
		Object.keys(params).forEach((key) => {
			path = path.replace(`:${key}`, params[key]);
		});

		return path;
	}

	/**
	 * Parse current path and extract parameters
	 * @returns {Object} { page, params }
	 */
	parsePath() {
		const { pathname, hash } = window.location;
		const base = this.BASE_PATH;

		// Remove base path
		const raw =
			base && pathname.startsWith(base)
				? pathname.substring(base.length)
				: pathname;

		const path = raw.replace(/^\//, '') || 'landing';

		// Check for hash routing
		if (hash) {
			const hashPath = hash.replace(/^#\//, '');
			return this.matchRoute(hashPath);
		}

		return this.matchRoute(path);
	}

	/**
	 * Match path against registered routes
	 * @param {string} path - Path to match
	 * @returns {Object} { page, params, meta }
	 */
	matchRoute(path) {
		// Try to match against registered routes
		for (const [routePath, route] of this.routes) {
			const match = path.match(route.pattern);
			if (match) {
				return {
					page: routePath,
					params: match.groups || {},
					meta: route.meta,
				};
			}
		}

		// Default whitelist for simple paths
		const first = path.split('/')[0];
		const allowed = [
			'landing',
			'jobs',
			'companies',
			'fairs',
			'pricing',
			'blog',
			'profile',
			'applications',
			'dashboard',
			'saved',
			'post-job',
			'manage-listings',
			'applicants',
			'candidates',
			'campaigns',
		];

		if (allowed.includes(first)) {
			return { page: first, params: {}, meta: {} };
		}

		return { page: 'landing', params: {}, meta: {} };
	}

	/**
	 * Add navigation guard
	 * @param {Function} guard - Guard function (to, from, next)
	 */
	addGuard(guard) {
		this.guards.push(guard);
	}

	/**
	 * Add before navigation hook
	 * @param {Function} hook - Hook function (to, from)
	 */
	beforeNavigate(hook) {
		this.beforeHooks.push(hook);
	}

	/**
	 * Add after navigation hook
	 * @param {Function} hook - Hook function (to, from)
	 */
	afterNavigate(hook) {
		this.afterHooks.push(hook);
	}

	/**
	 * Run navigation guards
	 * @param {Object} to - Target route
	 * @param {Object} from - Current route
	 * @returns {Promise<boolean>}
	 */
	async runGuards(to, from) {
		for (const guard of this.guards) {
			const result = await new Promise((resolve) => {
				guard(to, from, (allowed = true) => resolve(allowed));
			});

			if (!result) return false;
		}
		return true;
	}

	/**
	 * Navigate to a page
	 * @param {string} page - Page name or path
	 * @param {Object} options - Navigation options
	 */
	async navigate(page, options = {}) {
		const {
			replace = false,
			params = {},
			state = {},
			skipGuards = false,
		} = options;

		const from = this.currentRoute;
		const to = { page, params, meta: {}, state };

		// Run before hooks
		for (const hook of this.beforeHooks) {
			await hook(to, from);
		}

		// Run guards
		if (!skipGuards) {
			const allowed = await this.runGuards(to, from);
			if (!allowed) {
				console.warn('Navigation blocked by guard');
				return;
			}
		}

		// Update state
		this.currentRoute = to;

		// Update browser history
		const url = this.pathFor(page, params);
		try {
			if (replace) {
				window.history.replaceState({ page, params, ...state }, '', url);
			} else {
				window.history.pushState({ page, params, ...state }, '', url);
			}
		} catch (error) {
			console.error('History API error:', error);
		}

		// Render page
		await this.renderPage(to);

		// Run after hooks
		for (const hook of this.afterHooks) {
			await hook(to, from);
		}

		// Scroll to top
		window.scrollTo(0, 0);
	}

	/**
	 * Render current page
	 * @param {Object} route - Route object
	 */
	async renderPage(route) {
		const mainContent = document.getElementById('main-content');
		if (!mainContent) {
			console.error('Main content element not found');
			return;
		}

		// Find route handler
		const routeData = this.routes.get(route.page);

		if (routeData && routeData.handler) {
			try {
				await routeData.handler(route.params, route.state);
			} catch (error) {
				console.error('Route handler error:', error);
				this.renderError(error);
			}
		} else {
			// Fallback to legacy page templates
			this.renderLegacy(route.page);
		}
	}

	/**
	 * Render legacy page template
	 * @param {string} page - Page name
	 */
	renderLegacy(page) {
		const mainContent = document.getElementById('main-content');

		// Check if PageTemplates exist (legacy)
		if (window.PageTemplates && window.PageTemplates[page]) {
			mainContent.innerHTML = window.PageTemplates[page]();
		} else {
			mainContent.innerHTML = `
        <div class="container" style="text-align: center; padding: 60px 20px;">
          <h1>404 - Page Not Found</h1>
          <p>The page "${page}" does not exist.</p>
          <button onclick="router.navigate('landing')">Go Home</button>
        </div>
      `;
		}
	}

	/**
	 * Render error page
	 * @param {Error} error - Error object
	 */
	renderError(error) {
		const mainContent = document.getElementById('main-content');
		mainContent.innerHTML = `
      <div class="container" style="text-align: center; padding: 60px 20px;">
        <h1>Error</h1>
        <p>${error.message}</p>
        <button onclick="router.navigate('landing')">Go Home</button>
      </div>
    `;
	}

	/**
	 * Go back in history
	 */
	back() {
		window.history.back();
	}

	/**
	 * Go forward in history
	 */
	forward() {
		window.history.forward();
	}

	/**
	 * Initialize router
	 */
	init() {
		// Parse initial route
		const route = this.parsePath();
		this.currentRoute = route;

		// Navigate to initial page
		this.navigate(route.page, {
			replace: true,
			params: route.params,
			skipGuards: false,
		});

		// Handle popstate (back/forward)
		window.addEventListener('popstate', (event) => {
			const state = event.state || {};
			const route = this.parsePath();

			this.navigate(route.page, {
				replace: true,
				params: state.params || route.params,
				state: state,
				skipGuards: false,
			});
		});

		// Handle hash changes
		window.addEventListener('hashchange', () => {
			const route = this.parsePath();
			this.navigate(route.page, {
				replace: true,
				params: route.params,
			});
		});
	}
}

// Create singleton instance
const router = new Router();

// Export
export default router;
export { Router };

// Global access (for backward compatibility)
if (typeof window !== 'undefined') {
	window.router = router;
	window.Router = Router;
}
