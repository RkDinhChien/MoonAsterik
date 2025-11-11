// ===========================
// Router Module
// ===========================

const Router = {
  // If deployed under a subfolder, set BASE_PATH accordingly. For local root keep empty string.
  BASE_PATH: "",
  pathFor(page) {
    if (page === "landing") return (this.BASE_PATH || "") + "/";
    return (this.BASE_PATH || "") + "/" + page;
  },
  parsePath() {
    const { pathname } = window.location;
    const base = this.BASE_PATH;
    const raw =
      base && pathname.startsWith(base)
        ? pathname.substring(base.length)
        : pathname;
    const seg = raw.replace(/^\//, "");
    if (!seg) return "landing";
    const first = seg.split("/")[0];
    // whitelist pages
    const allowed = ["landing", "jobs", "profile", "applications", "dashboard"];
    return allowed.includes(first) ? first : "landing";
  },
  navigate(page, replace = false) {
    // landing means reset session
    if (page === "landing") {
      window.AppState.setLoggedIn(false);
      window.AppState.setUserType(null);
    }
    window.AppState.setCurrentPage(page);
    const url = this.pathFor(page);
    try {
      if (replace) window.history.replaceState({ page }, "", url);
      else window.history.pushState({ page }, "", url);
    } catch {}
    this.renderPage();
    this.updateNavbar();
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
      case "profile-setup":
        template = window.PageTemplates["profile-setup"];
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
        state.userType === "student" ? "Sinh viên" : "Công ty";
    } else {
      navbarActions.style.display = "flex";
      navbarLoggedIn.style.display = "none";
    }
  },
};

// Export for use in other modules
window.Router = Router;

// Initialize route from URL on load
window.addEventListener("DOMContentLoaded", () => {
  const initial = Router.parsePath();
  if (initial !== window.AppState.state.currentPage) {
    window.AppState.setCurrentPage(initial);
  }
  // Replace state to sync
  Router.navigate(initial, true);
});

// Handle back/forward
window.addEventListener("popstate", (e) => {
  const page = (e.state && e.state.page) || Router.parsePath();
  window.AppState.setCurrentPage(page);
  Router.renderPage();
  Router.updateNavbar();
});
