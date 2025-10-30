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

    // Login type selection
    document
      .getElementById("select-student-login")
      ?.addEventListener("click", () => this.showStudentLoginForm());
    document
      .getElementById("select-employer-login")
      ?.addEventListener("click", () => this.showEmployerLoginForm());

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.closest(".modal").classList.remove("active");
        this.resetLoginModal();
      });
    });

    // Modal overlay close
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => {
        overlay.closest(".modal").classList.remove("active");
        this.resetLoginModal();
      });
    });
  },

  navigate(page) {
    window.Router.navigate(page);
  },

  renderPage() {
    window.Router.renderPage();
    // Initialize stats animation if on landing page
    const state = window.AppState.state;
    if (!state.isLoggedIn) {
      setTimeout(() => {
        if (window.PageTemplates.initStatsAnimation) {
          window.PageTemplates.initStatsAnimation();
        }
      }, 100);
    }
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
    this.resetLoginModal();
  },

  openSignUpModal() {
    document.getElementById("signup-modal").classList.add("active");
  },

  closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    this.resetLoginModal();
  },

  resetLoginModal() {
    // Reset to type selection view
    const typeSelection = document.getElementById("login-type-selection");
    const studentForm = document.getElementById("student-login-form");
    const employerForm = document.getElementById("employer-login-form");

    if (typeSelection) typeSelection.style.display = "block";
    if (studentForm) studentForm.style.display = "none";
    if (employerForm) employerForm.style.display = "none";

    // Clear form inputs
    const forms = document.querySelectorAll(
      "#student-login-form form, #employer-login-form form"
    );
    forms.forEach((form) => form.reset());
  },

  showLoginTypeSelection() {
    this.resetLoginModal();
  },

  showStudentLoginForm() {
    document.getElementById("login-type-selection").style.display = "none";
    document.getElementById("student-login-form").style.display = "block";
    document.getElementById("employer-login-form").style.display = "none";
  },

  showEmployerLoginForm() {
    document.getElementById("login-type-selection").style.display = "none";
    document.getElementById("student-login-form").style.display = "none";
    document.getElementById("employer-login-form").style.display = "block";
  },

  switchToSignUp() {
    this.closeAllModals();
    setTimeout(() => this.openSignUpModal(), 200);
  },

  handleLoginSubmit(event, userType) {
    event.preventDefault();

    // Get form values
    const emailInput =
      userType === "student"
        ? document.getElementById("student-email")
        : document.getElementById("employer-email");
    const passwordInput =
      userType === "student"
        ? document.getElementById("student-password")
        : document.getElementById("employer-password");

    const email = emailInput.value;
    const password = passwordInput.value;

    // Simple validation (in real app, this would be server-side)
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }

    // For demo purposes, accept any credentials
    // In a real app, this would authenticate with a backend
    console.log(`Login attempt - Type: ${userType}, Email: ${email}`);

    this.closeAllModals();
    window.AppState.setUserType(userType);
    window.AppState.setLoggedIn(true);
    window.AppState.setCurrentPage("dashboard");
    this.updateNavbar();
    this.renderPage();

    return false;
  },

  openStoryModal(storyId) {
    const story = window.successStories?.find((s) => s.id === storyId);
    if (!story) return;

    // Populate modal content
    document.getElementById("story-modal-title").textContent = story.title;
    document.getElementById("story-modal-category").textContent =
      story.category;
    document.getElementById("story-modal-author").textContent = story.author;
    document.getElementById("story-modal-role").textContent = story.authorRole;
    document.getElementById("story-modal-date").textContent = story.date;
    document.getElementById("story-modal-readtime").textContent =
      story.readTime;
    document.getElementById("story-modal-content").innerHTML = story.fullStory;

    const imageElement = document.getElementById("story-modal-image");
    imageElement.src = story.image;
    imageElement.alt = story.title;

    // Open modal
    document.getElementById("story-modal").classList.add("active");
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
