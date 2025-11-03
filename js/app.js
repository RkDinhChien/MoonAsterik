// ===========================
// Main Application Controller
// ===========================
// This file coordinates the app using modules:
// - state.js: Application state management
// - router.js: Routing and navigation
// - pages/*.js: Page templates

const app = {
  init() {
    // Hydrate user profile from localStorage if exists (demo persistence)
    try {
      const cached = localStorage.getItem("moon_profile");
      if (cached) {
        window.AppState.setUserInfo(JSON.parse(cached));
      }
    } catch {}
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

    // Mobile menu toggle
    document
      .getElementById("mobile-menu-toggle")
      ?.addEventListener("click", () => this.toggleMobileMenu());

    // Close mobile menu when clicking a link
    document.querySelectorAll(".navbar-link").forEach((link) => {
      link.addEventListener("click", () => {
        const menu = document.getElementById("navbar-menu");
        if (menu) menu.classList.remove("active");
      });
    });

    // Unified signup form
    document
      .getElementById("unified-signup-form")
      ?.addEventListener("submit", (e) => this.handleUnifiedSignUp(e));

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
    window.AppState.setCurrentPage("profile");
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

  // ===============
  // Sign Up helpers
  // ===============
  // Old multi-step helpers are now unused; kept for reference.

  updatePasswordStrength(userType) {
    const inputId =
      userType === "student"
        ? "student-signup-password"
        : "employer-signup-password";
    const meterId =
      userType === "student"
        ? "student-password-strength"
        : "employer-password-strength";
    const val = document.getElementById(inputId)?.value || "";
    const meter = document.getElementById(meterId);
    if (!meter) return;

    // Simple strength rules
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const labels = ["Weak", "Fair", "Good", "Strong"];
    const colors = ["#ef5350", "#ff9800", "#2196f3", "#43a047"];
    const idx = Math.min(score - 1, 3);
    if (val.length === 0) {
      meter.textContent = "";
      meter.style.height = "0";
    } else {
      meter.textContent = labels[idx] || "Weak";
      meter.style.color = colors[idx] || "#ef5350";
      meter.style.height = "auto";
      meter.style.marginTop = "4px";
      meter.style.fontSize = "12px";
      meter.style.fontWeight = "600";
    }
  },

  togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    if (btn) {
      btn.style.color = type === "password" ? "#90a4ae" : "#263238";
    }
  },

  handleSocialLogin(provider) {
    alert(`Social ${provider} login is a demo placeholder.`);
  },

  handleSignUpSubmit(event, userType) {
    event.preventDefault();

    const isStudent = userType === "student";
    const name = isStudent
      ? document.getElementById("student-name").value.trim()
      : document.getElementById("company-name").value.trim();
    const email = isStudent
      ? document.getElementById("student-signup-email").value.trim()
      : document.getElementById("employer-signup-email").value.trim();
    const password = isStudent
      ? document.getElementById("student-signup-password").value
      : document.getElementById("employer-signup-password").value;
    const skills = isStudent
      ? (document.getElementById("student-skills").value || "").trim()
      : "";
    const agreed = isStudent
      ? document.getElementById("student-terms").checked
      : document.getElementById("employer-terms").checked;

    // Validation
    if (!name || !email || !password) {
      alert("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }
    if (!agreed) {
      alert("Please agree to the Terms");
      return false;
    }

    // Local storage store
    const key = "moon_users";
    const users = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      alert("An account with this email already exists.");
      return false;
    }

    const newUser = {
      type: userType,
      name,
      email,
      password, // Note: in real apps, never store plain passwords.
      skills,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(key, JSON.stringify(users));

    // Auto login and go to dashboard
    this.closeAllModals();
  window.AppState.setUserType(userType);
  window.AppState.setLoggedIn(true);
  window.AppState.setCurrentPage(userType === "student" ? "profile" : "dashboard");
    this.updateNavbar();
    this.renderPage();
    return false;
  },

  handleUnifiedSignUp(event) {
    event.preventDefault();
    const name = document.getElementById("full-name")?.value.trim();
    const identifier = document
      .getElementById("signup-identifier")
      ?.value.trim();
    const password = document.getElementById("signup-password")?.value;
    const confirm = document.getElementById("signup-confirm")?.value;
    const agreed = document.getElementById("signup-terms")?.checked;

    if (!name || !identifier || !password || !confirm) {
      alert("Please fill in all required fields");
      return false;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password) || password.length < 8) {
      alert(
        "Password must be at least 8 characters and contain a special character"
      );
      return false;
    }
    if (!agreed) {
      alert("Please agree to the terms & policy");
      return false;
    }

    // Accept either username or email
    const isEmail = /@/.test(identifier);
    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      alert("Please enter a valid email address");
      return false;
    }

    const key = "moon_users";
    const users = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = users.find((u) => {
      const uid = (u.identifier || "").toLowerCase();
      const uem = (u.email || "").toLowerCase();
      const idLower = identifier.toLowerCase();
      // Match against either stored identifier or email for backward compatibility
      return uid === idLower || (isEmail && uem === idLower);
    });
    if (exists) {
      alert("An account with this username/email already exists.");
      return false;
    }

    const newUser = {
      type: "student",
      name,
      identifier,
      email: isEmail ? identifier : "",
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(key, JSON.stringify(users));

    this.closeAllModals();
    window.AppState.setUserType("student");
    window.AppState.setLoggedIn(true);
    // Seed basic user info for profile page
    window.AppState.setUserInfo({ fullName: name, email: isEmail ? identifier : "" });
    window.AppState.setCurrentPage("profile");
    this.updateNavbar();
    this.renderPage();
    return false;
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

  scrollToSection(sectionId) {
    // Check if user is on landing page
    const state = window.AppState.state;

    if (state.isLoggedIn) {
      // If logged in, first navigate to landing (which logs out)
      window.Router.navigate("landing");
      // Wait for page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      // Already on landing page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  },

  toggleMobileMenu() {
    const menu = document.getElementById("navbar-menu");
    if (menu) {
      menu.classList.toggle("active");
    }
  },

  // Jobs search (demo)
  searchJobs() {
    const q = document.getElementById('job-q')?.value?.toLowerCase() || '';
    const loc = document.getElementById('job-loc')?.value?.toLowerCase() || '';
    const cards = document.querySelectorAll('#jobs-list .card');
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const match = (!q || text.includes(q)) && (!loc || text.includes(loc));
      card.style.display = match ? '' : 'none';
    });
  },

  // ===========================
  // Profile setup handlers
  // ===========================
  handleAvatarChange(e) {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.getElementById("avatar-preview");
      if (img) img.src = reader.result;
      window.AppState.setUserInfo({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  },

  saveStudentProfile() {
    const get = (id) => document.getElementById(id)?.value?.trim() || "";
    // Basic profile info
    const profile = {
      fullName: get("pf-fullname"),
      studentId: get("pf-student-id"),
      graduation: get("pf-graduation"),
      gender: document.getElementById("pf-gender")?.value || "",
      phone: get("pf-phone"),
      email: get("pf-email"),
      country: get("pf-country"),
      github: get("pf-github"),
      viblo: get("pf-viblo"),
      facebook: get("pf-facebook"),
      slack: get("pf-slack"),
      jlpt: window.AppState.state?.user?.jlpt || "",
    };

    // Education (single)
    profile.university = get('pf-edu-university');
    profile.faculty = get('pf-edu-faculty');
    profile.gpa = get('pf-edu-gpa');
    // Prepare array form for profile rendering
    const studentCodeEd = get('pf-edu-code');
    profile.education = [
      {
        university: profile.university || '',
        faculty: profile.faculty || '',
        studentCode: studentCodeEd || profile.studentId || '',
        year: profile.year || '',
        graduation: profile.graduation || '',
        gpa: profile.gpa || '',
      },
    ];

    // Certificates
    const certRows = Array.from(document.querySelectorAll('#cert-list .row-cert'));
    profile.certificates = certRows.map(row => {
      const name = row.querySelector('.cert-name')?.value?.trim() || '';
      const value = row.querySelector('.cert-value')?.value?.trim() || '';
      const dateRaw = row.querySelector('.cert-date')?.value?.trim() || '';
      const date = dateRaw ? dateRaw.replaceAll('-', '/') : '';
      return { name, value, date };
    }).filter(c => c.name || c.value || c.date);

    // Awards
    const awardRows = Array.from(document.querySelectorAll('#award-list .row-award'));
    profile.awards = awardRows.map(row => {
      const title = row.querySelector('.award-title')?.value?.trim() || '';
      const dateRaw = row.querySelector('.award-date')?.value?.trim() || '';
      const date = dateRaw ? dateRaw.replaceAll('-', '/') : '';
      return { title, date };
    }).filter(a => a.title || a.date);

    // Highlights
    const highlightRows = Array.from(document.querySelectorAll('#highlight-list .row-highlight'));
    profile.highlights = highlightRows.map(row => row.querySelector('.highlight-text')?.value?.trim() || '')
      .filter(h => h);

    // Skills
    const skillRows = Array.from(document.querySelectorAll('#skill-list .row-skill'));
    profile.skills = skillRows.map(row => {
      const name = row.querySelector('.skill-name')?.value?.trim() || '';
      const months = parseInt(row.querySelector('.skill-months')?.value || '0', 10) || 0;
      return { name, months };
    }).filter(s => s.name);

    window.AppState.setUserInfo(profile);
    // Lightweight local persistence for demo
    try { localStorage.setItem("moon_profile", JSON.stringify(profile)); } catch {}
    window.Router.navigate("profile");
    this.updateNavbar();
    this.renderPage();
  },

  // Helpers for dynamic rows in profile setup
  addCertRow() {
    const list = document.getElementById('cert-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'row grid-cert row-cert';
    div.innerHTML = `
      <input class="form-input cert-name" placeholder="Tên chứng chỉ (vd: JLPT, IELTS)" />
      <input class="form-input cert-value" placeholder="Giá trị (vd: N4, 6.0)" />
      <input class="form-input cert-date" type="date" />
      <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
    `;
    list.appendChild(div);
  },
  addAwardRow() {
    const list = document.getElementById('award-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'row grid-award row-award';
    div.innerHTML = `
      <input class="form-input award-title" placeholder="Tên giải thưởng" />
      <input class="form-input award-date" type="date" />
      <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
    `;
    list.appendChild(div);
  },
  addHighlightRow() {
    const list = document.getElementById('highlight-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'row row-highlight';
    div.innerHTML = `
      <input class="form-input highlight-text" placeholder="Mô tả ngắn điểm mạnh / thành tích" />
      <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
    `;
    list.appendChild(div);
  },
  addSkillRow() {
    const list = document.getElementById('skill-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'row grid-skill row-skill';
    div.innerHTML = `
      <input class="form-input skill-name" placeholder="Tên kỹ năng (vd: React, Node.js)" />
      <input class="form-input skill-months" type="number" min="0" placeholder="Số tháng kinh nghiệm" />
      <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
    `;
    list.appendChild(div);
  },
  resetEdu() {
    ['pf-edu-university','pf-edu-faculty','pf-edu-code','pf-edu-gpa'].forEach(id=>{
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const grad = document.getElementById('pf-edu-graduation');
    if (grad) grad.value = '';
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
