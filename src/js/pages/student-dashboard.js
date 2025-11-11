// ===========================
// Enhanced Student Dashboard Template
// ===========================

const renderStudentDashboard = () => {
  const state = window.AppState.state;
  const profile = state.profile || {};
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 10;
    
    if (profile.fullName) completed++;
    if (profile.email) completed++;
    if (profile.phone) completed++;
    if (profile.bio) completed++;
    if (profile.avatar) completed++;
    if (profile.skills && profile.skills.length > 0) completed++;
    if (profile.education && profile.education.length > 0) completed++;
    if (profile.experience && profile.experience.length > 0) completed++;
    if (profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl) completed++;
    if (profile.cvFile) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  const stats = [
    { label: 'Profile Views', value: '127', icon: 'eye' },
    { label: 'Applications', value: '8', icon: 'file' },
    { label: 'Saved Jobs', value: '15', icon: 'bookmark' },
    { label: 'Interviews', value: '3', icon: 'calendar' }
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechViet Solutions',
      location: 'Ho Chi Minh City',
      type: 'Internship',
      salary: '$500-800/month',
      posted: '2 days ago',
      match: 95
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Digital Innovation Corp',
      location: 'Hanoi',
      type: 'Full-time',
      salary: '$1,200-1,800/month',
      posted: '5 days ago',
      match: 88
    },
    {
      id: 3,
      title: 'Full Stack Intern',
      company: 'StartupHub Vietnam',
      location: 'Da Nang',
      type: 'Internship',
      salary: '$400-700/month',
      posted: '1 week ago',
      match: 82
    }
  ];

  const recentApplications = [
    {
      id: 1,
      company: 'FPT Software',
      position: 'Software Engineer Intern',
      status: 'under-review',
      date: 'Oct 28, 2025'
    },
    {
      id: 2,
      company: 'VNG Corporation',
      position: 'Junior Developer',
      status: 'interview',
      date: 'Oct 25, 2025'
    },
    {
      id: 3,
      company: 'Tiki',
      position: 'Frontend Developer',
      status: 'rejected',
      date: 'Oct 20, 2025'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'under-review': { class: 'badge-warning', text: 'Under Review' },
      'interview': { class: 'badge-primary', text: 'Interview Scheduled' },
      'accepted': { class: 'badge-success', text: 'Accepted' },
      'rejected': { class: 'badge-secondary', text: 'Not Selected' }
    };
    return statusMap[status] || statusMap['under-review'];
  };

  return `
    <div class="container py-xl">
      <!-- Welcome Section -->
      <div class="dashboard-welcome">
        <div class="welcome-text">
          <h1>Welcome back, ${profile.fullName || state.user.name}!</h1>
          <p class="text-gray">Here's what's happening with your job search</p>
        </div>
        <button class="btn btn-primary" onclick="window.Router.navigate('profile')">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Edit Profile
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md-grid-cols-4 mb-lg">
        ${stats.map(stat => `
          <div class="stat-card">
            <div class="stat-icon">
              ${stat.icon === 'eye' ? `
                <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ` : stat.icon === 'file' ? `
                <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ` : stat.icon === 'bookmark' ? `
                <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ` : `
                <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              `}
            </div>
            <div class="stat-content">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Profile Completion Alert -->
      ${completionPercentage < 80 ? `
        <div class="alert alert-info mb-lg">
          <div class="alert-content">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="16" x2="12" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="8" x2="12.01" y2="8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="alert-text">
              <h4>Complete Your Profile</h4>
              <p>Your profile is ${completionPercentage}% complete. A complete profile gets 3x more views! Add your skills, experience, and portfolio to stand out.</p>
              <div class="progress mt-md">
                <div class="progress-bar" style="width: ${completionPercentage}%"></div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.Router.navigate('profile')">
            Complete Profile
          </button>
        </div>
      ` : ''}

      <!-- Main Content Grid -->
      <div class="dashboard-grid">
        <!-- Recommended Jobs Section -->
        <div class="dashboard-section">
          <div class="section-header">
            <h3>Recommended for You</h3>
            <a href="#" class="text-primary" onclick="window.Router.navigate('jobs'); return false;">
              View all jobs →
            </a>
          </div>
          <div class="job-cards">
            ${recommendedJobs.map(job => `
              <div class="job-card">
                <div class="job-card-header">
                  <div class="job-company-logo">
                    <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="job-match-badge">
                    <span class="badge badge-success">${job.match}% Match</span>
                  </div>
                </div>
                <div class="job-card-content">
                  <h4 class="job-title">${job.title}</h4>
                  <p class="job-company">${job.company}</p>
                  <div class="job-meta">
                    <span class="job-meta-item">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      ${job.location}
                    </span>
                    <span class="job-meta-item">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      ${job.type}
                    </span>
                  </div>
                  <div class="job-salary">${job.salary}</div>
                  <div class="job-posted">${job.posted}</div>
                </div>
                <div class="job-card-actions">
                  <button class="btn btn-primary btn-full">
                    Apply Now
                  </button>
                  <button class="btn btn-ghost">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Applications Section -->
        <div class="dashboard-sidebar">
          <div class="sidebar-section">
            <div class="section-header">
              <h3>Recent Applications</h3>
              <a href="#" class="text-primary" onclick="window.Router.navigate('applications'); return false;">
                View all →
              </a>
            </div>
            <div class="application-list">
              ${recentApplications.map(app => {
                const statusInfo = getStatusBadge(app.status);
                return `
                  <div class="application-item">
                    <div class="application-info">
                      <h4>${app.position}</h4>
                      <p class="text-gray">${app.company}</p>
                      <span class="badge ${statusInfo.class}">${statusInfo.text}</span>
                    </div>
                    <div class="application-date text-gray">${app.date}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Profile Quick View -->
          <div class="sidebar-section mt-lg">
            <div class="section-header">
              <h3>Profile Quick View</h3>
            </div>
            <div class="profile-quick-view">
              <div class="profile-avatar-medium">
                ${profile.avatar 
                  ? `<img src="${profile.avatar}" alt="${profile.fullName}" class="avatar-img" />`
                  : `<div class="avatar-placeholder">
                       <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
                         <circle cx="12" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                     </div>`
                }
              </div>
              <h4>${profile.fullName || state.user.name}</h4>
              <p class="text-gray">${profile.bio || 'Add a professional summary to your profile'}</p>
              
              ${profile.skills && profile.skills.length > 0 ? `
                <div class="profile-skills-preview">
                  <h5>Top Skills</h5>
                  <div class="skills-tags">
                    ${profile.skills.slice(0, 3).map(skill => `
                      <span class="skill-tag">${skill.name}</span>
                    `).join('')}
                    ${profile.skills.length > 3 ? `
                      <span class="skill-tag-more">+${profile.skills.length - 3} more</span>
                    ` : ''}
                  </div>
                </div>
              ` : ''}

              <div class="profile-completion-mini">
                <div class="completion-header">
                  <span>Profile Strength</span>
                  <span class="completion-percentage">${completionPercentage}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar" style="width: ${completionPercentage}%"></div>
                </div>
              </div>

              <button class="btn btn-outline btn-full mt-md" onclick="window.Router.navigate('profile')">
                View Full Profile
              </button>
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