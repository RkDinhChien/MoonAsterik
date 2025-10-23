// ===========================
// Main Application Controller
// ===========================
// This file coordinates the app using modules:
// - state.js: Application state management
// - router.js: Routing and navigation
// - pages/*.js: Page templates

const app = {
  init() {
    this.setupEventListeners();
    this.renderPage();
  },

  setupEventListeners() {
    // Navbar buttons
    document
      .getElementById("login-btn")
      ?.addEventListener("click", () => this.openLoginModal());
    document
      .getElementById("signup-btn")
      ?.addEventListener("click", () => this.openSignUpModal());
    document
      .getElementById("logout-btn")
      ?.addEventListener("click", () => this.handleLogout());

    // Sign up modal
    document
      .getElementById("signup-student-btn")
      ?.addEventListener("click", () => this.handleStudentClick());
    document
      .getElementById("signup-employer-btn")
      ?.addEventListener("click", () => this.handleEmployerClick());

    // Login modal
    document
      .getElementById("login-student-btn")
      ?.addEventListener("click", () => this.handleStudentClick());
    document
      .getElementById("login-employer-btn")
      ?.addEventListener("click", () => this.handleEmployerClick());

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.closest(".modal").classList.remove("active");
      });
    });

    // Modal overlay close
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => {
        overlay.closest(".modal").classList.remove("active");
      });
    });
  },

  navigate(page) {
    window.Router.navigate(page);
  },

  renderPage() {
    window.Router.renderPage();
  },

  updateNavbar() {
    window.Router.updateNavbar();
  },

  handleStudentClick() {
    this.closeAllModals();
    window.AppState.setUserType("student");
    window.AppState.setLoggedIn(true);
    window.AppState.setCurrentPage("dashboard");
    this.updateNavbar();
    this.renderPage();
  },

  handleEmployerClick() {
    this.closeAllModals();
    window.AppState.setUserType("company");
    window.AppState.setLoggedIn(true);
    window.AppState.setCurrentPage("dashboard");
    this.updateNavbar();
    this.renderPage();
  },

  handleLogout() {
    window.AppState.setLoggedIn(false);
    window.AppState.setUserType(null);
    window.AppState.setCurrentPage("landing");
    this.updateNavbar();
    this.renderPage();
  },

  openLoginModal() {
    document.getElementById("login-modal").classList.add("active");
  },

  openSignUpModal() {
    document.getElementById("signup-modal").classList.add("active");
  },

  closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
  },
};

// Make app globally available
window.app = app;

// ===========================
// Initialize App
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
