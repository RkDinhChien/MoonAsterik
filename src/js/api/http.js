// ===========================
// HTTP Module
// Fetch wrapper with timeout, error handling, and interceptors
// ===========================

class HTTPClient {
	constructor(config = {}) {
		this.baseURL = config.baseURL || '';
		this.timeout = config.timeout || 30000;
		this.headers = config.headers || {};
		this.requestInterceptors = [];
		this.responseInterceptors = [];
		this.loading = false;
	}

	/**
	 * Add request interceptor
	 * @param {Function} interceptor - Function to modify request config
	 */
	addRequestInterceptor(interceptor) {
		this.requestInterceptors.push(interceptor);
	}

	/**
	 * Add response interceptor
	 * @param {Function} onSuccess - Function to handle successful response
	 * @param {Function} onError - Function to handle error response
	 */
	addResponseInterceptor(onSuccess, onError) {
		this.responseInterceptors.push({ onSuccess, onError });
	}

	/**
	 * Apply request interceptors
	 * @param {Object} config - Request config
	 * @returns {Object} Modified config
	 */
	applyRequestInterceptors(config) {
		let modifiedConfig = { ...config };

		for (const interceptor of this.requestInterceptors) {
			modifiedConfig = interceptor(modifiedConfig);
		}

		return modifiedConfig;
	}

	/**
	 * Apply response interceptors
	 * @param {Response} response - Fetch response
	 * @returns {Response} Modified response
	 */
	async applyResponseInterceptors(response) {
		let modifiedResponse = response;

		for (const { onSuccess, onError } of this.responseInterceptors) {
			try {
				if (response.ok && onSuccess) {
					modifiedResponse = await onSuccess(modifiedResponse);
				} else if (!response.ok && onError) {
					modifiedResponse = await onError(modifiedResponse);
				}
			} catch (error) {
				if (onError) {
					await onError(error);
				}
			}
		}

		return modifiedResponse;
	}

	/**
	 * Make HTTP request
	 * @param {string} url - Request URL
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	async request(url, options = {}) {
		const {
			method = 'GET',
			headers = {},
			body,
			params,
			timeout = this.timeout,
			...restOptions
		} = options;

		// Build full URL
		let fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;

		// Add query parameters
		if (params) {
			const searchParams = new URLSearchParams(params);
			fullURL += `?${searchParams.toString()}`;
		}

		// Prepare request config
		let config = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...this.headers,
				...headers,
			},
			...restOptions,
		};

		// Add body for non-GET requests
		if (body && method !== 'GET') {
			config.body = typeof body === 'string' ? body : JSON.stringify(body);
		}

		// Apply request interceptors
		config = this.applyRequestInterceptors(config);

		// Set loading state
		this.loading = true;

		try {
			// Create abort controller for timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			config.signal = controller.signal;

			// Make request
			const response = await fetch(fullURL, config);

			clearTimeout(timeoutId);

			// Apply response interceptors
			const interceptedResponse = await this.applyResponseInterceptors(
				response
			);

			// Check if response is ok
			if (!interceptedResponse.ok) {
				const error = new Error(`HTTP Error: ${interceptedResponse.status}`);
				error.status = interceptedResponse.status;
				error.statusText = interceptedResponse.statusText;

				try {
					error.data = await interceptedResponse.json();
				} catch {
					error.data = await interceptedResponse.text();
				}

				throw error;
			}

			// Parse response
			const contentType = interceptedResponse.headers.get('content-type');
			let data;

			if (contentType && contentType.includes('application/json')) {
				data = await interceptedResponse.json();
			} else {
				data = await interceptedResponse.text();
			}

			return data;
		} catch (error) {
			if (error.name === 'AbortError') {
				throw new Error('Request timeout');
			}
			throw error;
		} finally {
			this.loading = false;
		}
	}

	/**
	 * GET request
	 * @param {string} url - Request URL
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	get(url, options = {}) {
		return this.request(url, { ...options, method: 'GET' });
	}

	/**
	 * POST request
	 * @param {string} url - Request URL
	 * @param {Object} body - Request body
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	post(url, body, options = {}) {
		return this.request(url, { ...options, method: 'POST', body });
	}

	/**
	 * PUT request
	 * @param {string} url - Request URL
	 * @param {Object} body - Request body
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	put(url, body, options = {}) {
		return this.request(url, { ...options, method: 'PUT', body });
	}

	/**
	 * PATCH request
	 * @param {string} url - Request URL
	 * @param {Object} body - Request body
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	patch(url, body, options = {}) {
		return this.request(url, { ...options, method: 'PATCH', body });
	}

	/**
	 * DELETE request
	 * @param {string} url - Request URL
	 * @param {Object} options - Request options
	 * @returns {Promise}
	 */
	delete(url, options = {}) {
		return this.request(url, { ...options, method: 'DELETE' });
	}
}

// Create default HTTP client instance
const http = new HTTPClient({
	baseURL: '',
	timeout: 30000,
});

// Add default error interceptor
http.addResponseInterceptor(null, (error) => {
	console.error('HTTP Error:', error);
	return Promise.reject(error);
});

export { HTTPClient };
export default http;
