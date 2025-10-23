// ===========================
// Other Page Templates
// ===========================

const renderProfilePage = () => {
  const state = window.AppState.state;

  return `
    <div class="profile-page" style="padding: 2rem 1rem;">
      <div class="container" style="max-width: 900px;">
        <h1 style="color: #263238; margin-bottom: 2rem;">
          ${
            state.userType === "student" ? "Student Profile" : "Company Profile"
          }
        </h1>
        <div class="card">
          <h3 style="color: #263238;">Profile Settings</h3>
          <p style="color: #78909C;">Manage your profile information and preferences.</p>
          <button class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  `;
};

const renderJobsPage = () => `
  <div class="jobs-page" style="padding: 2rem 1rem;">
    <div class="container">
      <h1 style="color: #263238; margin-bottom: 2rem;">Job Search</h1>
      <div class="card">
        <h3 style="color: #263238;">Find Your Perfect Role</h3>
        <p style="color: #78909C;">Browse thousands of opportunities from top companies.</p>
      </div>
    </div>
  </div>
`;

const renderApplicationsPage = () => `
  <div class="applications-page" style="padding: 2rem 1rem;">
    <div class="container">
      <h1 style="color: #263238; margin-bottom: 2rem;">My Applications</h1>
      <div class="card">
        <h3 style="color: #263238;">Track Your Applications</h3>
        <p style="color: #78909C;">View and manage all your job applications in one place.</p>
      </div>
    </div>
  </div>
`;

const renderPostJobPage = () => `
  <div class="post-job-page" style="padding: 2rem 1rem;">
    <div class="container" style="max-width: 900px;">
      <h1 style="color: #263238; margin-bottom: 2rem;">Post a New Job</h1>
      <div class="card">
        <h3 style="color: #263238;">Create Job Listing</h3>
        <p style="color: #78909C;">Fill out the details to post your job opportunity.</p>
        <button class="btn btn-primary">Publish Job</button>
      </div>
    </div>
  </div>
`;

const renderManageListingsPage = () => `
  <div class="manage-listings-page" style="padding: 2rem 1rem;">
    <div class="container">
      <h1 style="color: #263238; margin-bottom: 2rem;">Manage Job Listings</h1>
      <div class="card">
        <h3 style="color: #263238;">Your Active Listings</h3>
        <p style="color: #78909C;">View, edit, or close your job postings.</p>
      </div>
    </div>
  </div>
`;

const renderApplicantsPage = () => `
  <div class="applicants-page" style="padding: 2rem 1rem;">
    <div class="container">
      <h1 style="color: #263238; margin-bottom: 2rem;">Applicant Management</h1>
      <div class="card">
        <h3 style="color: #263238;">Review Candidates</h3>
        <p style="color: #78909C;">Review and manage applications for your job postings.</p>
      </div>
    </div>
  </div>
`;

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.profile = renderProfilePage;
window.PageTemplates.jobs = renderJobsPage;
window.PageTemplates.applications = renderApplicationsPage;
window.PageTemplates["post-job"] = renderPostJobPage;
window.PageTemplates["manage-listings"] = renderManageListingsPage;
window.PageTemplates.applicants = renderApplicantsPage;
