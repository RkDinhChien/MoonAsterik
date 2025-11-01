// ===========================
// Profile Page Template
// ===========================

const renderProfilePage = () => {
  const state = window.AppState.state;
  const profile = state.profile || {};

  return `
    <div class="container py-xl">
      <div class="profile-header">
        <h2>My Profile</h2>
        <p class="text-gray">Manage your professional information and visibility settings</p>
      </div>

      <!-- Profile Visibility Settings -->
      <div class="card mb-lg">
        <div class="card-header flex justify-between items-center">
          <h3 class="card-title">Profile Visibility</h3>
          <div class="visibility-status">
            <span class="badge ${profile.visibility === 'public' ? 'badge-success' : 'badge-primary'}">
              ${profile.visibility === 'public' ? 'Public Profile' : 'Recruiter Only'}
            </span>
          </div>
        </div>
        <div class="card-content">
          <div class="visibility-options">
            <label class="radio-option">
              <input 
                type="radio" 
                name="visibility" 
                value="public" 
                ${profile.visibility === 'public' ? 'checked' : ''}
                onchange="window.ProfileManager.updateVisibility('public')"
              />
              <div class="radio-content">
                <h4>Public Profile</h4>
                <p>Your profile is visible to everyone, including companies and other students</p>
              </div>
            </label>
            <label class="radio-option">
              <input 
                type="radio" 
                name="visibility" 
                value="recruiter" 
                ${profile.visibility === 'recruiter' ? 'checked' : ''}
                onchange="window.ProfileManager.updateVisibility('recruiter')"
              />
              <div class="radio-content">
                <h4>Recruiter Only</h4>
                <p>Only verified recruiters can view your complete profile</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Profile Picture and Basic Info -->
      <div class="card mb-lg">
        <div class="card-header">
          <h3 class="card-title">Profile Picture & Basic Information</h3>
        </div>
        <div class="card-content">
          <div class="profile-picture-section">
            <div class="profile-avatar-large">
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
            <div class="profile-upload-controls">
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                style="display: none;"
                onchange="window.ProfileManager.handleAvatarUpload(event)"
              />
              <button class="btn btn-primary" onclick="document.getElementById('avatar-upload').click()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Upload Photo
              </button>
              ${profile.avatar ? `
                <button class="btn btn-outline" onclick="window.ProfileManager.removeAvatar()">Remove</button>
              ` : ''}
              <p class="upload-hint">JPG, PNG or GIF. Max size 5MB</p>
            </div>
          </div>

          <div class="profile-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="fullName">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  class="form-input" 
                  value="${profile.fullName || ''}"
                  placeholder="Enter your full name"
                  onchange="window.ProfileManager.updateField('fullName', this.value)"
                />
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  class="form-input" 
                  value="${profile.email || ''}"
                  placeholder="your.email@example.com"
                  onchange="window.ProfileManager.updateField('email', this.value)"
                />
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  class="form-input" 
                  value="${profile.phone || ''}"
                  placeholder="+84 123 456 789"
                  onchange="window.ProfileManager.updateField('phone', this.value)"
                />
              </div>

              <div class="form-group">
                <label for="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  class="form-input" 
                  value="${profile.location || ''}"
                  placeholder="City, Country"
                  onchange="window.ProfileManager.updateField('location', this.value)"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="bio">Professional Summary</label>
              <textarea 
                id="bio" 
                class="form-textarea" 
                rows="4"
                placeholder="Write a brief summary about yourself, your passion, and career goals..."
                onchange="window.ProfileManager.updateField('bio', this.value)"
              >${profile.bio || ''}</textarea>
              <span class="form-hint">${(profile.bio || '').length}/500 characters</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="card mb-lg">
        <div class="card-header flex justify-between items-center">
          <h3 class="card-title">Technical Skills</h3>
          <button class="btn btn-primary btn-sm" onclick="window.ProfileManager.addSkill()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Skill
          </button>
        </div>
        <div class="card-content">
          <div id="skills-list" class="skills-list">
            ${(profile.skills || []).length > 0 
              ? profile.skills.map((skill, index) => `
                  <div class="skill-item" data-index="${index}">
                    <div class="skill-info">
                      <input 
                        type="text" 
                        class="skill-input" 
                        value="${skill.name}"
                        placeholder="Skill name (e.g., JavaScript, Python)"
                        onchange="window.ProfileManager.updateSkill(${index}, 'name', this.value)"
                      />
                      <select 
                        class="skill-level"
                        onchange="window.ProfileManager.updateSkill(${index}, 'level', this.value)"
                      >
                        <option value="beginner" ${skill.level === 'beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="intermediate" ${skill.level === 'intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="advanced" ${skill.level === 'advanced' ? 'selected' : ''}>Advanced</option>
                        <option value="expert" ${skill.level === 'expert' ? 'selected' : ''}>Expert</option>
                      </select>
                    </div>
                    <button class="btn-icon-danger" onclick="window.ProfileManager.removeSkill(${index})">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                `).join('')
              : '<p class="empty-state">No skills added yet. Add your technical skills to showcase your expertise.</p>'
            }
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div class="card mb-lg">
        <div class="card-header flex justify-between items-center">
          <h3 class="card-title">Education</h3>
          <button class="btn btn-primary btn-sm" onclick="window.ProfileManager.addEducation()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Education
          </button>
        </div>
        <div class="card-content">
          <div id="education-list" class="timeline-list">
            ${(profile.education || []).length > 0
              ? profile.education.map((edu, index) => `
                  <div class="timeline-item" data-index="${index}">
                    <div class="timeline-content">
                      <div class="form-grid">
                        <div class="form-group">
                          <label>School/University *</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${edu.school || ''}"
                            placeholder="Institution name"
                            onchange="window.ProfileManager.updateEducation(${index}, 'school', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Degree *</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${edu.degree || ''}"
                            placeholder="Bachelor's, Master's, etc."
                            onchange="window.ProfileManager.updateEducation(${index}, 'degree', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Field of Study *</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${edu.field || ''}"
                            placeholder="Computer Science, IT, etc."
                            onchange="window.ProfileManager.updateEducation(${index}, 'field', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>GPA</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${edu.gpa || ''}"
                            placeholder="3.5/4.0"
                            onchange="window.ProfileManager.updateEducation(${index}, 'gpa', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Start Date</label>
                          <input 
                            type="month" 
                            class="form-input" 
                            value="${edu.startDate || ''}"
                            onchange="window.ProfileManager.updateEducation(${index}, 'startDate', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>End Date</label>
                          <input 
                            type="month" 
                            class="form-input" 
                            value="${edu.endDate || ''}"
                            ${edu.current ? 'disabled' : ''}
                            onchange="window.ProfileManager.updateEducation(${index}, 'endDate', this.value)"
                          />
                          <label class="checkbox-label">
                            <input 
                              type="checkbox" 
                              ${edu.current ? 'checked' : ''}
                              onchange="window.ProfileManager.updateEducation(${index}, 'current', this.checked)"
                            />
                            Currently studying
                          </label>
                        </div>
                      </div>
                      <button class="btn btn-outline btn-sm mt-md" onclick="window.ProfileManager.removeEducation(${index})">
                        Remove Education
                      </button>
                    </div>
                  </div>
                `).join('')
              : '<p class="empty-state">No education added yet. Add your academic background.</p>'
            }
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="card mb-lg">
        <div class="card-header flex justify-between items-center">
          <h3 class="card-title">Work Experience & Internships</h3>
          <button class="btn btn-primary btn-sm" onclick="window.ProfileManager.addExperience()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Experience
          </button>
        </div>
        <div class="card-content">
          <div id="experience-list" class="timeline-list">
            ${(profile.experience || []).length > 0
              ? profile.experience.map((exp, index) => `
                  <div class="timeline-item" data-index="${index}">
                    <div class="timeline-content">
                      <div class="form-grid">
                        <div class="form-group">
                          <label>Job Title *</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${exp.title || ''}"
                            placeholder="Software Engineer Intern, Developer, etc."
                            onchange="window.ProfileManager.updateExperience(${index}, 'title', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Company *</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${exp.company || ''}"
                            placeholder="Company name"
                            onchange="window.ProfileManager.updateExperience(${index}, 'company', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Location</label>
                          <input 
                            type="text" 
                            class="form-input" 
                            value="${exp.location || ''}"
                            placeholder="City, Country"
                            onchange="window.ProfileManager.updateExperience(${index}, 'location', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>Employment Type</label>
                          <select 
                            class="form-input"
                            onchange="window.ProfileManager.updateExperience(${index}, 'type', this.value)"
                          >
                            <option value="internship" ${exp.type === 'internship' ? 'selected' : ''}>Internship</option>
                            <option value="part-time" ${exp.type === 'part-time' ? 'selected' : ''}>Part-time</option>
                            <option value="full-time" ${exp.type === 'full-time' ? 'selected' : ''}>Full-time</option>
                            <option value="freelance" ${exp.type === 'freelance' ? 'selected' : ''}>Freelance</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Start Date</label>
                          <input 
                            type="month" 
                            class="form-input" 
                            value="${exp.startDate || ''}"
                            onchange="window.ProfileManager.updateExperience(${index}, 'startDate', this.value)"
                          />
                        </div>
                        <div class="form-group">
                          <label>End Date</label>
                          <input 
                            type="month" 
                            class="form-input" 
                            value="${exp.endDate || ''}"
                            ${exp.current ? 'disabled' : ''}
                            onchange="window.ProfileManager.updateExperience(${index}, 'endDate', this.value)"
                          />
                          <label class="checkbox-label">
                            <input 
                              type="checkbox" 
                              ${exp.current ? 'checked' : ''}
                              onchange="window.ProfileManager.updateExperience(${index}, 'current', this.checked)"
                            />
                            Currently working
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Description</label>
                        <textarea 
                          class="form-textarea" 
                          rows="3"
                          placeholder="Describe your responsibilities, achievements, and technologies used..."
                          onchange="window.ProfileManager.updateExperience(${index}, 'description', this.value)"
                        >${exp.description || ''}</textarea>
                      </div>
                      <button class="btn btn-outline btn-sm mt-md" onclick="window.ProfileManager.removeExperience(${index})">
                        Remove Experience
                      </button>
                    </div>
                  </div>
                `).join('')
              : '<p class="empty-state">No experience added yet. Add your internships and work experience.</p>'
            }
          </div>
        </div>
      </div>

      <!-- Portfolio & Links Section -->
      <div class="card mb-lg">
        <div class="card-header">
          <h3 class="card-title">Portfolio & Professional Links</h3>
        </div>
        <div class="card-content">
          <div class="form-grid">
            <div class="form-group">
              <label for="githubUrl">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </label>
              <input 
                type="url" 
                id="githubUrl" 
                class="form-input" 
                value="${profile.githubUrl || ''}"
                placeholder="https://github.com/yourusername"
                onchange="window.ProfileManager.updateField('githubUrl', this.value)"
              />
            </div>

            <div class="form-group">
              <label for="linkedinUrl">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </label>
              <input 
                type="url" 
                id="linkedinUrl" 
                class="form-input" 
                value="${profile.linkedinUrl || ''}"
                placeholder="https://linkedin.com/in/yourusername"
                onchange="window.ProfileManager.updateField('linkedinUrl', this.value)"
              />
            </div>

            <div class="form-group">
              <label for="portfolioUrl">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Portfolio Website
              </label>
              <input 
                type="url" 
                id="portfolioUrl" 
                class="form-input" 
                value="${profile.portfolioUrl || ''}"
                placeholder="https://yourportfolio.com"
                onchange="window.ProfileManager.updateField('portfolioUrl', this.value)"
              />
            </div>

            <div class="form-group">
              <label for="behanceUrl">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.24-.39-.64-.26-1.184-.61-1.608-1.04-.424-.43-.740-.94-.956-1.53-.21-.59-.32-1.23-.32-1.91 0-.68.11-1.31.336-1.91.225-.6.548-1.1.97-1.52.42-.42.92-.75 1.52-.98.59-.23 1.25-.35 1.96-.35.75 0 1.42.13 2.01.39.59.26 1.08.62 1.46 1.09.38.466.67 1.02.84 1.65.17.618.25 1.27.25 1.94v.44h-6.65c.01.86.29 1.56.73 1.99zm-10.24-9.7h-3.39v2.851h3.39c.406 0 .764-.043 1.076-.13.313-.088.576-.21.79-.376.215-.166.38-.376.5-.63.12-.254.18-.548.18-.88 0-.682-.23-1.22-.69-1.595-.46-.374-1.12-.56-1.97-.56l-.01.02zm13.607.81h-4.53v-1.294h4.53v1.294zm-3.68 6.7c.36.16.64.39.84.688.203.3.305.67.305 1.11 0 .43-.1.795-.305 1.096-.2.3-.48.54-.84.71-.36.165-.77.25-1.244.25-.473 0-.88-.08-1.235-.25-.36-.17-.65-.42-.88-.74-.23-.33-.35-.73-.37-1.21h-2.59c.02.64.14 1.21.37 1.71.23.5.55.93.97 1.29.42.36.92.64 1.51.83.59.19 1.25.28 1.98.28.73 0 1.41-.09 2.03-.28.62-.19 1.16-.48 1.62-.85.46-.37.82-.82 1.07-1.36.25-.54.38-1.15.38-1.84 0-.72-.13-1.33-.4-1.83-.26-.5-.63-.91-1.11-1.23-.48-.32-1.05-.56-1.69-.71-.64-.15-1.33-.23-2.07-.23-.73 0-1.41.09-2.03.28-.62.19-1.16.48-1.62.85-.46.37-.82.82-1.07 1.36-.25.54-.38 1.15-.38 1.84h2.59c.02-.54.14-.98.37-1.32.23-.34.52-.59.88-.75.36-.16.77-.24 1.244-.24.46 0 .86.08 1.22.24z"/>
                </svg>
                Behance
              </label>
              <input 
                type="url" 
                id="behanceUrl" 
                class="form-input" 
                value="${profile.behanceUrl || ''}"
                placeholder="https://behance.net/yourusername"
                onchange="window.ProfileManager.updateField('behanceUrl', this.value)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- CV Upload Section -->
      <div class="card mb-lg">
        <div class="card-header">
          <h3 class="card-title">Resume/CV Upload</h3>
        </div>
        <div class="card-content">
          <div class="upload-area">
            <input 
              type="file" 
              id="cv-upload" 
              accept=".pdf,.doc,.docx" 
              style="display: none;"
              onchange="window.ProfileManager.handleCVUpload(event)"
            />
            ${profile.cvFile 
              ? `<div class="file-preview">
                   <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
                     <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   <div class="file-info">
                     <h4>${profile.cvFile.name}</h4>
                     <p>${(profile.cvFile.size / 1024).toFixed(2)} KB</p>
                   </div>
                   <button class="btn-icon-danger" onclick="window.ProfileManager.removeCV()">
                     <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                       <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
                       <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                   </button>
                 </div>`
              : `<div class="upload-placeholder" onclick="document.getElementById('cv-upload').click()">
                   <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   <h4>Upload your Resume/CV</h4>
                   <p>PDF, DOC, or DOCX. Max size 10MB</p>
                   <button class="btn btn-primary">Choose File</button>
                 </div>`
            }
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="profile-actions">
        <button class="btn btn-primary btn-lg" onclick="window.ProfileManager.saveProfile()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="17 21 17 13 7 13 7 21" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="7 3 7 8 15 8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Save Profile
        </button>
        <button class="btn btn-outline btn-lg" onclick="window.Router.navigate('dashboard')">
          Cancel
        </button>
      </div>
    </div>
  `;
};

// ===========================
// Profile Manager Logic
// ===========================

const ProfileManager = {
  // Update single field
  updateField(field, value) {
    const state = window.AppState.state;
    if (!state.profile) state.profile = {};
    state.profile[field] = value;
    window.AppState.saveState();
  },

  // Visibility settings
  updateVisibility(visibility) {
    this.updateField('visibility', visibility);
    window.Router.renderPage();
  },

  // Avatar handling
  handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateField('avatar', e.target.result);
        window.Router.renderPage();
      };
      reader.readAsDataURL(file);
    }
  },

  removeAvatar() {
    this.updateField('avatar', null);
    window.Router.renderPage();
  },

  // Skills management
  addSkill() {
    const state = window.AppState.state;
    if (!state.profile.skills) state.profile.skills = [];
    state.profile.skills.push({ name: '', level: 'intermediate' });
    window.AppState.saveState();
    window.Router.renderPage();
  },

  updateSkill(index, field, value) {
    const state = window.AppState.state;
    if (state.profile.skills && state.profile.skills[index]) {
      state.profile.skills[index][field] = value;
      window.AppState.saveState();
    }
  },

  removeSkill(index) {
    const state = window.AppState.state;
    if (state.profile.skills) {
      state.profile.skills.splice(index, 1);
      window.AppState.saveState();
      window.Router.renderPage();
    }
  },

  // Education management
  addEducation() {
    const state = window.AppState.state;
    if (!state.profile.education) state.profile.education = [];
    state.profile.education.push({
      school: '',
      degree: '',
      field: '',
      gpa: '',
      startDate: '',
      endDate: '',
      current: false
    });
    window.AppState.saveState();
    window.Router.renderPage();
  },

  updateEducation(index, field, value) {
    const state = window.AppState.state;
    if (state.profile.education && state.profile.education[index]) {
      state.profile.education[index][field] = value;
      if (field === 'current' && value) {
        state.profile.education[index].endDate = '';
      }
      window.AppState.saveState();
    }
  },

  removeEducation(index) {
    const state = window.AppState.state;
    if (state.profile.education) {
      state.profile.education.splice(index, 1);
      window.AppState.saveState();
      window.Router.renderPage();
    }
  },

  // Experience management
  addExperience() {
    const state = window.AppState.state;
    if (!state.profile.experience) state.profile.experience = [];
    state.profile.experience.push({
      title: '',
      company: '',
      location: '',
      type: 'internship',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    window.AppState.saveState();
    window.Router.renderPage();
  },

  updateExperience(index, field, value) {
    const state = window.AppState.state;
    if (state.profile.experience && state.profile.experience[index]) {
      state.profile.experience[index][field] = value;
      if (field === 'current' && value) {
        state.profile.experience[index].endDate = '';
      }
      window.AppState.saveState();
    }
  },

  removeExperience(index) {
    const state = window.AppState.state;
    if (state.profile.experience) {
      state.profile.experience.splice(index, 1);
      window.AppState.saveState();
      window.Router.renderPage();
    }
  },

  // CV Upload handling
  handleCVUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      this.updateField('cvFile', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      window.Router.renderPage();
    }
  },

  removeCV() {
    this.updateField('cvFile', null);
    window.Router.renderPage();
  },

  // Save profile
  saveProfile() {
    window.AppState.saveState();
    alert('Profile saved successfully!');
    window.Router.navigate('dashboard');
  }
};

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.profile = renderProfilePage;
window.ProfileManager = ProfileManager;
