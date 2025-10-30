// ===========================
// Router Module
// ===========================

const Router = {
  navigate(page) {
    // Special handling for landing page - always log out and show landing
    if (page === "landing") {
      window.AppState.setLoggedIn(false);
      window.AppState.setUserType(null);
      window.AppState.setCurrentPage("landing");
      this.renderPage();
      this.updateNavbar();
      window.scrollTo(0, 0);
      return;
    }

    window.AppState.setCurrentPage(page);
    this.renderPage();
    window.scrollTo(0, 0);
  },

  renderPage() {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    const state = window.AppState.state;

    if (!state.isLoggedIn) {
      mainContent.innerHTML = window.PageTemplates.landing();
      // Initialize stats animation after rendering landing page
      setTimeout(() => {
        if (window.PageTemplates.initStatsAnimation) {
          window.PageTemplates.initStatsAnimation();
        }
      }, 100);
      return;
    }

    // Render logged-in pages
    const currentPage = state.currentPage;
    let template;

    // Route to appropriate page
    switch (currentPage) {
      case "dashboard":
        template =
          state.userType === "student"
            ? window.PageTemplates.studentDashboard
            : window.PageTemplates.companyDashboard;
        break;
      case "profile":
        template = window.PageTemplates.profile;
        break;
      case "jobs":
        template = window.PageTemplates.jobs;
        break;
      case "applications":
        template = window.PageTemplates.applications;
        break;
      case "post-job":
        template = window.PageTemplates["post-job"];
        break;
      case "manage-listings":
        template = window.PageTemplates["manage-listings"];
        break;
      case "applicants":
        template = window.PageTemplates.applicants;
        break;
      default:
        // Default to dashboard
        template =
          state.userType === "student"
            ? window.PageTemplates.studentDashboard
            : window.PageTemplates.companyDashboard;
    }

    if (template) {
      mainContent.innerHTML = template();
    }
  },

  updateNavbar() {
    const navbarActions = document.getElementById("navbar-actions");
    const navbarLoggedIn = document.getElementById("navbar-logged-in");
    const userTypeLabel = document.getElementById("user-type-label");
    const state = window.AppState.state;

    if (state.isLoggedIn) {
      navbarActions.style.display = "none";
      navbarLoggedIn.style.display = "flex";
      userTypeLabel.textContent =
        state.userType === "student" ? "Student Portal" : "Company Portal";
    } else {
      navbarActions.style.display = "flex";
      navbarLoggedIn.style.display = "none";
    }
  },
};

// Export for use in other modules
window.Router = Router;
