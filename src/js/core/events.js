// ===========================
// Event Bus Module
// Simple pub/sub event system
// ===========================

class EventBus {
	constructor() {
		this.events = {};
	}

	/**
	 * Subscribe to an event
	 * @param {string} event - Event name
	 * @param {Function} callback - Callback function
	 * @returns {Function} Unsubscribe function
	 */
	on(event, callback) {
		if (!this.events[event]) {
			this.events[event] = [];
		}

		this.events[event].push(callback);

		// Return unsubscribe function
		return () => this.off(event, callback);
	}

	/**
	 * Subscribe to an event only once
	 * @param {string} event - Event name
	 * @param {Function} callback - Callback function
	 */
	once(event, callback) {
		const onceWrapper = (...args) => {
			callback(...args);
			this.off(event, onceWrapper);
		};

		this.on(event, onceWrapper);
	}

	/**
	 * Unsubscribe from an event
	 * @param {string} event - Event name
	 * @param {Function} callback - Callback function to remove
	 */
	off(event, callback) {
		if (!this.events[event]) return;

		this.events[event] = this.events[event].filter((cb) => cb !== callback);

		// Clean up if no more listeners
		if (this.events[event].length === 0) {
			delete this.events[event];
		}
	}

	/**
	 * Emit an event
	 * @param {string} event - Event name
	 * @param {...any} args - Arguments to pass to callbacks
	 */
	emit(event, ...args) {
		if (!this.events[event]) return;

		this.events[event].forEach((callback) => {
			try {
				callback(...args);
			} catch (error) {
				console.error(`Error in event handler for "${event}":`, error);
			}
		});
	}

	/**
	 * Remove all event listeners
	 * @param {string} event - Optional event name (if not provided, clears all)
	 */
	clear(event) {
		if (event) {
			delete this.events[event];
		} else {
			this.events = {};
		}
	}

	/**
	 * Get list of events
	 * @returns {Array<string>}
	 */
	getEvents() {
		return Object.keys(this.events);
	}

	/**
	 * Get listener count for an event
	 * @param {string} event - Event name
	 * @returns {number}
	 */
	listenerCount(event) {
		return this.events[event] ? this.events[event].length : 0;
	}
}

// Create global event bus instance
const eventBus = new EventBus();

// Common event names
export const EVENTS = {
	// Auth events
	LOGIN: 'auth:login',
	LOGOUT: 'auth:logout',
	SIGNUP: 'auth:signup',

	// Navigation events
	NAVIGATE: 'nav:navigate',
	PAGE_CHANGE: 'nav:page-change',

	// Job events
	JOB_SAVED: 'job:saved',
	JOB_UNSAVED: 'job:unsaved',
	JOB_APPLIED: 'job:applied',
	JOB_VIEWED: 'job:viewed',

	// Search events
	SEARCH_PERFORMED: 'search:performed',
	FILTER_APPLIED: 'search:filter-applied',
	FILTER_CLEARED: 'search:filter-cleared',

	// Fair events
	FAIR_REGISTERED: 'fair:registered',
	FAIR_UNREGISTERED: 'fair:unregistered',

	// Application events
	APPLICATION_SUBMITTED: 'app:submitted',
	APPLICATION_UPDATED: 'app:updated',

	// Notification events
	NOTIFICATION_SHOW: 'notif:show',
	NOTIFICATION_HIDE: 'notif:hide',

	// Modal events
	MODAL_OPEN: 'modal:open',
	MODAL_CLOSE: 'modal:close',

	// State events
	STATE_CHANGED: 'state:changed',
};

export { EventBus };
export default eventBus;
