// ===========================
// Student Dashboard Template
// ===========================

const renderStudentDashboard = () => {
  const state = window.AppState.state;

  return `
    <div class="dashboard" style="padding: 2rem 1rem;">
      <div class="container">
        <div style="margin-bottom: 2rem;">
          <h1 style="color: #263238;">Welcome back, ${state.user.name}!</h1>
          <p style="color: #78909C;">Here's what's happening with your job search</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid md-grid-cols-4 gap-lg" style="margin-bottom: 2rem;">
          ${[
            {
              icon: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>`,
              label: "Applications",
              value: "12",
              color: "#00BCD4",
            },
            {
              icon: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`,
              label: "In Review",
              value: "5",
              color: "#4DD0E1",
            },
            {
              icon: `<path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`,
              label: "Interviews",
              value: "2",
              color: "#00BCD4",
            },
            {
              icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
              label: "Profile Views",
              value: "48",
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

        <!-- Profile Completion Alert -->
        <div class="card" style="border: 2px solid #00BCD4; margin-bottom: 2rem;">
          <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
            <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="#00BCD4">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 style="color: #263238; margin: 0;">Complete Your Profile</h3>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: #263238;">Profile Completion</span>
              <span style="color: #00BCD4; font-weight: 600;">75%</span>
            </div>
            <div class="progress">
              <div class="progress-bar" style="width: 75%;"></div>
            </div>
            <p style="color: #78909C; margin: 1rem 0;">
              A complete profile gets 3x more views! Add your projects and skills to stand out.
            </p>
            <button class="btn btn-primary" onclick="app.navigate('profile')">
              Complete Profile
            </button>
          </div>
        </div>

        <div class="grid md-grid-cols-3 gap-lg">
          <!-- Recommended Jobs -->
          <div style="grid-column: span 2;">
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: #263238; margin: 0;">Recommended for You</h3>
                <button class="btn btn-ghost" style="color: #00BCD4;" onclick="app.navigate('jobs')">
                  View All
                </button>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${[
                  {
                    title: "Frontend Developer Intern",
                    company: "TechStart Inc.",
                    location: "Remote",
                    type: "Internship",
                    match: 95,
                    skills: ["React", "TypeScript", "CSS"],
                  },
                  {
                    title: "Junior Full Stack Developer",
                    company: "DataFlow Solutions",
                    location: "New York, NY",
                    type: "Full-time",
                    match: 88,
                    skills: ["Node.js", "React", "MongoDB"],
                  },
                  {
                    title: "Data Science Intern",
                    company: "AI Innovations",
                    location: "San Francisco, CA",
                    type: "Internship",
                    match: 82,
                    skills: ["Python", "Machine Learning", "SQL"],
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
                        <p style="color: #78909C; margin: 0;">${job.company}</p>
                      </div>
                      <span class="badge badge-primary">${
                        job.match
                      }% Match</span>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; font-size: 0.875rem; color: #78909C;">
                      <span>📍 ${job.location}</span>
                      <span>💼 ${job.type}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                      ${job.skills
                        .map(
                          (skill) =>
                            `<span class="badge badge-secondary">${skill}</span>`
                        )
                        .join("")}
                    </div>
                    <button class="btn btn-primary btn-full">Apply Now</button>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <!-- Recent Applications -->
          <div>
            <div class="card">
              <h3 style="color: #263238; margin-bottom: 1.5rem;">Recent Applications</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${[
                  {
                    title: "Backend Developer Intern",
                    company: "Cloud Systems",
                    status: "Interview Scheduled",
                    date: "Applied 5 days ago",
                  },
                  {
                    title: "UI/UX Developer",
                    company: "Design Studio",
                    status: "In Review",
                    date: "Applied 1 week ago",
                  },
                ]
                  .map(
                    (app) => `
                  <div style="padding: 1rem; border: 1px solid #ECEFF1; border-radius: 0.5rem;">
                    <h4 style="color: #263238; margin: 0 0 0.25rem 0; font-size: 1rem;">${app.title}</h4>
                    <p style="color: #78909C; margin: 0 0 0.5rem 0; font-size: 0.875rem;">${app.company}</p>
                    <span class="badge badge-warning" style="margin-bottom: 0.5rem;">${app.status}</span>
                    <p style="color: #78909C; margin: 0; font-size: 0.75rem;">${app.date}</p>
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
window.PageTemplates.studentDashboard = renderStudentDashboard;
