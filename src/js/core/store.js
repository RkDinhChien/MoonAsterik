/**
 * Enhanced State Management Store
 * Pub/sub pattern with actions/mutations and localStorage sync
 */

// Storage keys
const STORAGE_KEYS = {
	APP_STATE: 'jobfair_app_state',
	USER_PROFILE: 'jobfair_user_profile',
	PREFERENCES: 'jobfair_preferences',
	SAVED_JOBS: 'jobfair_saved_jobs',
	APPLICATIONS: 'jobfair_applications',
};

class Store {
	constructor(initialState = {}) {
		this.state = {
			// Authentication
			isLoggedIn: false,
			userType: null, // 'student' or 'employer'
			currentPage: 'landing',

			// User data
			user: {
				id: null,
				name: '',
				email: '',
				companyName: '',
				avatar: null,
			},

			// Profile data
			profile: {
				fullName: '',
				email: '',
				phone: '',
				location: '',
				bio: '',
				avatar: null,
				visibility: 'public',
				skills: [],
				education: [],
				experience: [],
				githubUrl: '',
				linkedinUrl: '',
				portfolioUrl: '',
				behanceUrl: '',
				cvFile: null,
				audioIntro: null,
			},

			// Saved jobs and applications
			savedJobs: [],
			applications: [],

			// Preferences
			preferences: {
				theme: 'light',
				language: 'vi',
				emailNotifications: true,
				pushNotifications: false,
			},

			// UI state
			ui: {
				loading: false,
				sidebarOpen: false,
				modalOpen: false,
				filters: {},
			},

			...initialState,
		};

		this.subscribers = new Map();
		this.actions = new Map();
		this.mutations = new Map();

		this.registerDefaultActions();
		this.registerDefaultMutations();
	}

	/**
	 * Subscribe to state changes
	 * @param {string} event - Event name (* for all changes)
	 * @param {Function} callback - Callback function
	 * @returns {Function} Unsubscribe function
	 */
	subscribe(event, callback) {
		if (!this.subscribers.has(event)) {
			this.subscribers.set(event, []);
		}

		this.subscribers.get(event).push(callback);

		// Return unsubscribe function
		return () => {
			const callbacks = this.subscribers.get(event);
			const index = callbacks.indexOf(callback);
			if (index > -1) {
				callbacks.splice(index, 1);
			}
		};
	}

	/**
	 * Emit event to subscribers
	 * @param {string} event - Event name
	 * @param {*} data - Event data
	 */
	emit(event, data) {
		// Emit to specific event subscribers
		if (this.subscribers.has(event)) {
			this.subscribers.get(event).forEach((callback) => {
				try {
					callback(data, this.state);
				} catch (error) {
					console.error(`Error in ${event} subscriber:`, error);
				}
			});
		}

		// Emit to all-events subscribers
		if (this.subscribers.has('*')) {
			this.subscribers.get('*').forEach((callback) => {
				try {
					callback({ event, data }, this.state);
				} catch (error) {
					console.error('Error in global subscriber:', error);
				}
			});
		}
	}

	/**
	 * Register an action
	 * @param {string} name - Action name
	 * @param {Function} handler - Action handler
	 */
	registerAction(name, handler) {
		this.actions.set(name, handler);
	}

	/**
	 * Register a mutation
	 * @param {string} name - Mutation name
	 * @param {Function} handler - Mutation handler
	 */
	registerMutation(name, handler) {
		this.mutations.set(name, handler);
	}

	/**
	 * Commit a mutation (synchronous state change)
	 * @param {string} name - Mutation name
	 * @param {*} payload - Mutation payload
	 */
	commit(name, payload) {
		const mutation = this.mutations.get(name);

		if (!mutation) {
			console.error(`Mutation ${name} not found`);
			return;
		}

		const oldState = JSON.parse(JSON.stringify(this.state));

		try {
			mutation(this.state, payload);
			this.emit(name, payload);
			this.saveToStorage();
		} catch (error) {
			console.error(`Error in mutation ${name}:`, error);
			this.state = oldState; // Rollback on error
		}
	}

	/**
	 * Dispatch an action (can be asynchronous)
	 * @param {string} name - Action name
	 * @param {*} payload - Action payload
	 * @returns {Promise}
	 */
	async dispatch(name, payload) {
		const action = this.actions.get(name);

		if (!action) {
			console.error(`Action ${name} not found`);
			return Promise.reject(new Error(`Action ${name} not found`));
		}

		try {
			const context = {
				state: this.state,
				commit: this.commit.bind(this),
				dispatch: this.dispatch.bind(this),
				getters: this.getters.bind(this),
			};

			const result = await action(context, payload);
			return result;
		} catch (error) {
			console.error(`Error in action ${name}:`, error);
			throw error;
		}
	}

	/**
	 * Get state value using path
	 * @param {string} path - State path (e.g., 'user.name')
	 * @returns {*}
	 */
	get(path) {
		return path.split('.').reduce((obj, key) => obj?.[key], this.state);
	}

	/**
	 * Register default mutations
	 */
	registerDefaultMutations() {
		// Authentication
		this.registerMutation('SET_LOGGED_IN', (state, isLoggedIn) => {
			state.isLoggedIn = isLoggedIn;
		});

		this.registerMutation('SET_USER_TYPE', (state, userType) => {
			state.userType = userType;
		});

		this.registerMutation('SET_CURRENT_PAGE', (state, page) => {
			state.currentPage = page;
		});

		// User data
		this.registerMutation('SET_USER', (state, user) => {
			state.user = { ...state.user, ...user };
		});

		this.registerMutation('SET_PROFILE', (state, profile) => {
			state.profile = { ...state.profile, ...profile };
		});

		this.registerMutation('RESET_PROFILE', (state) => {
			state.profile = {
				fullName: '',
				email: '',
				phone: '',
				location: '',
				bio: '',
				avatar: null,
				visibility: 'public',
				skills: [],
				education: [],
				experience: [],
				githubUrl: '',
				linkedinUrl: '',
				portfolioUrl: '',
				behanceUrl: '',
				cvFile: null,
				audioIntro: null,
			};
		});

		// Saved jobs
		this.registerMutation('ADD_SAVED_JOB', (state, jobId) => {
			if (!state.savedJobs.includes(jobId)) {
				state.savedJobs.push(jobId);
			}
		});

		this.registerMutation('REMOVE_SAVED_JOB', (state, jobId) => {
			state.savedJobs = state.savedJobs.filter((id) => id !== jobId);
		});

		// Applications
		this.registerMutation('ADD_APPLICATION', (state, application) => {
			state.applications.push({
				...application,
				id: Date.now(),
				status: 'pending',
				appliedAt: new Date().toISOString(),
			});
		});

		this.registerMutation('UPDATE_APPLICATION', (state, { id, updates }) => {
			const index = state.applications.findIndex((app) => app.id === id);
			if (index !== -1) {
				state.applications[index] = {
					...state.applications[index],
					...updates,
				};
			}
		});

		// UI state
		this.registerMutation('SET_LOADING', (state, loading) => {
			state.ui.loading = loading;
		});

		this.registerMutation('SET_SIDEBAR_OPEN', (state, open) => {
			state.ui.sidebarOpen = open;
		});

		this.registerMutation('SET_MODAL_OPEN', (state, open) => {
			state.ui.modalOpen = open;
		});

		this.registerMutation('SET_FILTERS', (state, filters) => {
			state.ui.filters = { ...state.ui.filters, ...filters };
		});

		// Preferences
		this.registerMutation('SET_PREFERENCES', (state, preferences) => {
			state.preferences = { ...state.preferences, ...preferences };
		});
	}

	/**
	 * Register default actions
	 */
	registerDefaultActions() {
		// Login action
		this.registerAction(
			'login',
			async ({ commit }, { userType, credentials }) => {
				commit('SET_LOADING', true);

				try {
					// Mock API call
					await new Promise((resolve) => setTimeout(resolve, 500));

					commit('SET_LOGGED_IN', true);
					commit('SET_USER_TYPE', userType);
					commit('SET_USER', {
						id: Date.now(),
						email: credentials.email,
						name: credentials.name || 'User',
					});

					return { success: true };
				} catch (error) {
					console.error('Login error:', error);
					throw error;
				} finally {
					commit('SET_LOADING', false);
				}
			}
		);

		// Logout action
		this.registerAction('logout', async ({ commit }) => {
			commit('SET_LOGGED_IN', false);
			commit('SET_USER_TYPE', null);
			commit('SET_USER', {
				id: null,
				name: '',
				email: '',
				companyName: '',
				avatar: null,
			});
			commit('RESET_PROFILE');
		});

		// Save job action
		this.registerAction('saveJob', async ({ commit, state }, jobId) => {
			if (!state.isLoggedIn) {
				throw new Error('Must be logged in to save jobs');
			}

			if (state.savedJobs.includes(jobId)) {
				commit('REMOVE_SAVED_JOB', jobId);
			} else {
				commit('ADD_SAVED_JOB', jobId);
			}
		});

		// Apply to job action
		this.registerAction(
			'applyToJob',
			async ({ commit, state }, { jobId, coverLetter, cv }) => {
				if (!state.isLoggedIn) {
					throw new Error('Must be logged in to apply');
				}

				commit('SET_LOADING', true);

				try {
					// Mock API call
					await new Promise((resolve) => setTimeout(resolve, 1000));

					commit('ADD_APPLICATION', {
						jobId,
						coverLetter,
						cv: cv || state.profile.cvFile,
					});

					return { success: true };
				} finally {
					commit('SET_LOADING', false);
				}
			}
		);
	}

	/**
	 * Getters (computed values)
	 */
	getters() {
		return {
			isLoggedIn: () => this.state.isLoggedIn,
			userType: () => this.state.userType,
			currentPage: () => this.state.currentPage,
			user: () => this.state.user,
			profile: () => this.state.profile,
			savedJobs: () => this.state.savedJobs,
			applications: () => this.state.applications,
			preferences: () => this.state.preferences,
			isLoading: () => this.state.ui.loading,

			// Computed getters
			profileCompletion: () => {
				const profile = this.state.profile;
				let completed = 0;
				let total = 10;

				if (profile.fullName) completed++;
				if (profile.email) completed++;
				if (profile.phone) completed++;
				if (profile.bio && profile.bio.length > 20) completed++;
				if (profile.avatar) completed++;
				if (profile.skills && profile.skills.length >= 3) completed++;
				if (profile.education && profile.education.length > 0) completed++;
				if (profile.experience && profile.experience.length > 0) completed++;
				if (profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl)
					completed++;
				if (profile.cvFile) completed++;

				return Math.round((completed / total) * 100);
			},

			isJobSaved: (jobId) => {
				return this.state.savedJobs.includes(jobId);
			},

			hasAppliedToJob: (jobId) => {
				return this.state.applications.some((app) => app.jobId === jobId);
			},

			applicationsByStatus: (status) => {
				if (!status) return this.state.applications;
				return this.state.applications.filter((app) => app.status === status);
			},
		};
	}

	/**
	 * Load state from localStorage
	 */
	loadFromStorage() {
		try {
			const savedState = localStorage.getItem(STORAGE_KEYS.APP_STATE);
			const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
			const savedJobs = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
			const savedApplications = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
			const savedPreferences = localStorage.getItem(STORAGE_KEYS.PREFERENCES);

			if (savedState) {
				const parsedState = JSON.parse(savedState);
				Object.assign(this.state, parsedState);
			}

			if (savedProfile) {
				this.state.profile = {
					...this.state.profile,
					...JSON.parse(savedProfile),
				};
			}

			if (savedJobs) {
				this.state.savedJobs = JSON.parse(savedJobs);
			}

			if (savedApplications) {
				this.state.applications = JSON.parse(savedApplications);
			}

			if (savedPreferences) {
				this.state.preferences = {
					...this.state.preferences,
					...JSON.parse(savedPreferences),
				};
			}

			console.log('State loaded from localStorage');
		} catch (error) {
			console.error('Error loading state from localStorage:', error);
		}
	}

	/**
	 * Save state to localStorage
	 */
	saveToStorage() {
		try {
			// Save main state
			const stateToSave = {
				isLoggedIn: this.state.isLoggedIn,
				userType: this.state.userType,
				currentPage: this.state.currentPage,
				user: this.state.user,
			};
			localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(stateToSave));

			// Save profile separately
			localStorage.setItem(
				STORAGE_KEYS.USER_PROFILE,
				JSON.stringify(this.state.profile)
			);

			// Save saved jobs
			localStorage.setItem(
				STORAGE_KEYS.SAVED_JOBS,
				JSON.stringify(this.state.savedJobs)
			);

			// Save applications
			localStorage.setItem(
				STORAGE_KEYS.APPLICATIONS,
				JSON.stringify(this.state.applications)
			);

			// Save preferences
			localStorage.setItem(
				STORAGE_KEYS.PREFERENCES,
				JSON.stringify(this.state.preferences)
			);
		} catch (error) {
			console.error('Error saving state to localStorage:', error);

			if (error.name === 'QuotaExceededError') {
				console.error('Storage quota exceeded');
				this.emit('storage:quota_exceeded', error);
			}
		}
	}

	/**
	 * Clear all stored data
	 */
	clearStorage() {
		try {
			Object.values(STORAGE_KEYS).forEach((key) => {
				localStorage.removeItem(key);
			});
			console.log('Storage cleared');
		} catch (error) {
			console.error('Error clearing storage:', error);
		}
	}

	/**
	 * Reset store to initial state
	 */
	reset() {
		this.state = {
			isLoggedIn: false,
			userType: null,
			currentPage: 'landing',
			user: { id: null, name: '', email: '', companyName: '', avatar: null },
			profile: {
				fullName: '',
				email: '',
				phone: '',
				location: '',
				bio: '',
				avatar: null,
				visibility: 'public',
				skills: [],
				education: [],
				experience: [],
				githubUrl: '',
				linkedinUrl: '',
				portfolioUrl: '',
				behanceUrl: '',
				cvFile: null,
				audioIntro: null,
			},
			savedJobs: [],
			applications: [],
			preferences: {
				theme: 'light',
				language: 'vi',
				emailNotifications: true,
				pushNotifications: false,
			},
			ui: { loading: false, sidebarOpen: false, modalOpen: false, filters: {} },
		};

		this.clearStorage();
		this.emit('store:reset');
	}
}

// Create singleton instance
const store = new Store();

// Load saved state
store.loadFromStorage();

// Auto-save before page unload
if (typeof window !== 'undefined') {
	window.addEventListener('beforeunload', () => {
		store.saveToStorage();
	});

	// Handle storage events (sync across tabs)
	window.addEventListener('storage', (e) => {
		if (Object.values(STORAGE_KEYS).includes(e.key)) {
			store.loadFromStorage();
			store.emit('storage:sync', { key: e.key, newValue: e.newValue });
		}
	});
}

// Export
export default store;
export { Store, STORAGE_KEYS };

// Global access (for backward compatibility)
if (typeof window !== 'undefined') {
	window.store = store;
	window.AppState = {
		// Legacy compatibility
		state: store.state,
		getState: () => store.state,
		isLoggedIn: () => store.state.isLoggedIn,
		getUserType: () => store.state.userType,
		getCurrentPage: () => store.state.currentPage,
		getUserInfo: () => store.state.user,
		getProfile: () => store.state.profile,
		setLoggedIn: (status) => store.commit('SET_LOGGED_IN', status),
		setUserType: (type) => store.commit('SET_USER_TYPE', type),
		setCurrentPage: (page) => store.commit('SET_CURRENT_PAGE', page),
		setUserInfo: (info) => store.commit('SET_USER', info),
		updateProfile: (profile) => store.commit('SET_PROFILE', profile),
		resetProfile: () => store.commit('RESET_PROFILE'),
		calculateProfileCompletion: () => store.getters().profileCompletion(),
	};
}
