// ===========================
// Company Dashboard Template
// ===========================

const renderCompanyDashboard = () => {
  const state = window.AppState.state;

  return `
    <div class="dashboard" style="padding: 2rem 1rem;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="color: #263238;">Company Dashboard</h1>
            <p style="color: #78909C;">Welcome back, ${
              state.user.companyName
            }</p>
          </div>
          <button class="btn btn-primary" onclick="app.navigate('post-job')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Post New Job
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid md-grid-cols-4 gap-lg" style="margin-bottom: 2rem;">
          ${[
            {
              icon: `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>`,
              label: "Active Jobs",
              value: "3",
              color: "#00BCD4",
            },
            {
              icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>`,
              label: "Total Applicants",
              value: "97",
              color: "#4DD0E1",
            },
            {
              icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
              label: "New Applicants",
              value: "35",
              color: "#00BCD4",
            },
            {
              icon: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`,
              label: "Profile Views",
              value: "1,234",
              color: "#4DD0E1",
            },
          ]
            .map(
              (stat) => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="color: #78909C; margin: 0 0 0.5rem 0;">${stat.label}</p>
                  <h2 style="color: #263238; margin: 0;">${stat.value}</h2>
                </div>
                <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="${stat.color}">
                  ${stat.icon}
                </svg>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="grid md-grid-cols-3 gap-lg">
          <!-- Active Job Listings -->
          <div style="grid-column: span 2;">
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: #263238; margin: 0;">Active Job Listings</h3>
                <button class="btn btn-ghost" style="color: #00BCD4;" onclick="app.navigate('manage-listings')">
                  View All
                </button>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${[
                  {
                    title: "Frontend Developer Intern",
                    posted: "2 days ago",
                    applicants: 24,
                    newApplicants: 8,
                    views: 156,
                  },
                  {
                    title: "Backend Developer",
                    posted: "1 week ago",
                    applicants: 42,
                    newApplicants: 12,
                    views: 298,
                  },
                  {
                    title: "Full Stack Developer",
                    posted: "3 days ago",
                    applicants: 31,
                    newApplicants: 15,
                    views: 203,
                  },
                ]
                  .map(
                    (job) => `
                  <div class="card" style="border: 1px solid #ECEFF1;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                      <div>
                        <h4 style="color: #263238; margin: 0 0 0.25rem 0;">${
                          job.title
                        }</h4>
                        <p style="color: #78909C; margin: 0;">Posted ${
                          job.posted
                        }</p>
                      </div>
                      ${
                        job.newApplicants > 0
                          ? `<span class="badge badge-primary">${job.newApplicants} New</span>`
                          : ""
                      }
                    </div>
                    <div class="grid grid-cols-3 gap-md" style="margin-bottom: 1rem;">
                      <div>
                        <p style="color: #78909C; margin: 0; font-size: 0.875rem;">Applicants</p>
                        <p style="color: #263238; margin: 0; font-weight: 600;">${
                          job.applicants
                        }</p>
                      </div>
                      <div>
                        <p style="color: #78909C; margin: 0; font-size: 0.875rem;">Views</p>
                        <p style="color: #263238; margin: 0; font-weight: 600;">${
                          job.views
                        }</p>
                      </div>
                      <div>
                        <p style="color: #78909C; margin: 0; font-size: 0.875rem;">Status</p>
                        <span class="badge badge-secondary">Active</span>
                      </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                      <button class="btn btn-outline" style="flex: 1;" onclick="app.navigate('applicants')">View Applicants</button>
                      <button class="btn btn-outline" style="flex: 1;">Edit Job</button>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <!-- Recent Applicants -->
          <div>
            <div class="card">
              <h3 style="color: #263238; margin-bottom: 1.5rem;">Recent Applicants</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${[
                  {
                    name: "Sarah Chen",
                    role: "Frontend Developer Intern",
                    match: 95,
                    applied: "2 hours ago",
                  },
                  {
                    name: "Marcus Rodriguez",
                    role: "Backend Developer",
                    match: 88,
                    applied: "5 hours ago",
                  },
                  {
                    name: "Emily Watson",
                    role: "Full Stack Developer",
                    match: 92,
                    applied: "1 day ago",
                  },
                ]
                  .map(
                    (applicant) => `
                  <div style="padding: 1rem; border: 1px solid #ECEFF1; border-radius: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                      <h4 style="color: #263238; margin: 0; font-size: 1rem;">${applicant.name}</h4>
                      <span class="badge badge-primary">${applicant.match}%</span>
                    </div>
                    <p style="color: #78909C; margin: 0 0 0.5rem 0; font-size: 0.875rem;">${applicant.role}</p>
                    <p style="color: #78909C; margin: 0; font-size: 0.75rem;">Applied ${applicant.applied}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.companyDashboard = renderCompanyDashboard;
