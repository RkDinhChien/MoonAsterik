/**
 * Footer Component
 * Site footer with links, social media, newsletter
 */

import { escapeHtml } from '../utils/templates.js';

/**
 * Render footer HTML
 * @param {Object} options - Footer options
 * @returns {string} - HTML string
 */
export const render = (options = {}) => {
	const currentYear = new Date().getFullYear();

	return `
    <footer class="footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-section footer-brand">
            <div class="footer-logo">
              <span class="logo-text">Moon<span class="logo-asterisk">*</span></span>
            </div>
            <p class="footer-tagline">
              Nền tảng kết nối sinh viên IT với cơ hội việc làm hàng đầu Việt Nam
            </p>
            <div class="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Dành cho sinh viên</h3>
            <ul class="footer-links">
              <li><a href="/jobs">Tìm việc làm</a></li>
              <li><a href="/companies">Khám phá công ty</a></li>
              <li><a href="/fairs">Job Fair</a></li>
              <li><a href="/blog">Blog IT</a></li>
              <li><a href="/cv-builder">Tạo CV</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Dành cho nhà tuyển dụng</h3>
            <ul class="footer-links">
              <li><a href="/employer/register">Đăng ký tuyển dụng</a></li>
              <li><a href="/employer/pricing">Bảng giá dịch vụ</a></li>
              <li><a href="/employer/post-job">Đăng tin tuyển dụng</a></li>
              <li><a href="/employer/search">Tìm ứng viên</a></li>
              <li><a href="/employer/book-booth">Đặt booth Job Fair</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3 class="footer-title">Về chúng tôi</h3>
            <ul class="footer-links">
              <li><a href="/about">Giới thiệu</a></li>
              <li><a href="/contact">Liên hệ</a></li>
              <li><a href="/terms">Điều khoản sử dụng</a></li>
              <li><a href="/privacy">Chính sách bảo mật</a></li>
              <li><a href="/faq">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <div class="footer-section footer-newsletter">
            <h3 class="footer-title">Nhận thông tin mới nhất</h3>
            <p class="footer-newsletter-text">
              Đăng ký nhận tin tức về việc làm IT, sự kiện và mẹo phỏng vấn
            </p>
            <form class="newsletter-form" data-newsletter-form>
              <input 
                type="email" 
                placeholder="Email của bạn" 
                class="newsletter-input"
                required
                aria-label="Email address"
              >
              <button type="submit" class="button button-primary">
                Đăng ký
              </button>
            </form>
            <p class="newsletter-note">
              Bằng việc đăng ký, bạn đồng ý với <a href="/privacy">Chính sách bảo mật</a>
            </p>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>&copy; ${currentYear} Moon*. All rights reserved.</p>
          </div>
          <div class="footer-meta">
            <a href="/sitemap">Sơ đồ trang</a>
            <span class="separator">•</span>
            <a href="/accessibility">Trợ năng</a>
            <span class="separator">•</span>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;
};

/**
 * Initialize footer interactions
 * @param {HTMLElement} element - Footer element
 */
export const init = (element) => {
	if (!element) return;

	// Newsletter form
	const form = element.querySelector('[data-newsletter-form]');
	if (form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const input = form.querySelector('input[type="email"]');
			const button = form.querySelector('button[type="submit"]');
			const email = input.value.trim();

			if (!email) return;

			// Disable form
			button.disabled = true;
			button.textContent = 'Đang xử lý...';

			try {
				// TODO: Call newsletter API
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Show success message
				showMessage(
					form,
					'Đăng ký thành công! Kiểm tra email để xác nhận.',
					'success'
				);
				input.value = '';
			} catch (error) {
				showMessage(form, 'Có lỗi xảy ra. Vui lòng thử lại.', 'error');
			} finally {
				button.disabled = false;
				button.textContent = 'Đăng ký';
			}
		});
	}

	// Smooth scroll for internal links
	const links = element.querySelectorAll('a[href^="/"]');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (window.router && !href.includes('#')) {
				e.preventDefault();
				window.router.navigate(href.substring(1));
			}
		});
	});
};

/**
 * Show message below form
 */
const showMessage = (form, message, type = 'info') => {
	// Remove existing message
	const existingMsg = form.querySelector('.form-message');
	if (existingMsg) existingMsg.remove();

	// Create message element
	const msgEl = document.createElement('div');
	msgEl.className = `form-message form-message-${type}`;
	msgEl.textContent = message;

	// Insert after form
	form.insertAdjacentElement('afterend', msgEl);

	// Remove after 5 seconds
	setTimeout(() => msgEl.remove(), 5000);
};

export default {
	render,
	init,
};
