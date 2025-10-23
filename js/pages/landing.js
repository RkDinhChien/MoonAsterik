// ===========================
// Landing Page Template
// ===========================

const renderLandingPage = () => `
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section" style="background-color: #ECEFF1; padding: 5rem 1rem;">
      <div class="container">
        <div class="grid md-grid-cols-2 gap-lg items-center">
          <div>
            <h1 style="color: #263238;">
              Launch Your <span style="color: #00BCD4;">Tech Career</span>
            </h1>
            <p style="color: #78909C; font-size: 1.25rem; margin-bottom: 2rem;">
              Moon* connects talented IT students with innovative companies looking for fresh perspectives and cutting-edge skills.
            </p>
            <div class="flex flex-col gap-md" style="max-width: 400px;">
              <button class="btn btn-primary btn-lg" onclick="app.handleStudentClick()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
                </svg>
                I'm a Student
              </button>
              <button class="btn btn-outline btn-lg" onclick="app.handleEmployerClick()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                </svg>
                I'm an Employer
              </button>
            </div>
          </div>
          <div style="height: 400px; border-radius: 0.75rem; overflow: hidden; box-shadow: var(--shadow-xl);">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                 alt="Students working" 
                 style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section style="background-color: #00BCD4; padding: 4rem 1rem;">
      <div class="container">
        <div class="grid md-grid-cols-3 gap-lg">
          <div class="text-center">
            <div style="font-size: 2.5rem; color: #ffffff; font-weight: 700;">12,450</div>
            <div style="color: #ECEFF1; font-size: 1.125rem;">Students Registered</div>
          </div>
          <div class="text-center">
            <div style="font-size: 2.5rem; color: #ffffff; font-weight: 700;">850</div>
            <div style="color: #ECEFF1; font-size: 1.125rem;">Companies Joined</div>
          </div>
          <div class="text-center">
            <div style="font-size: 2.5rem; color: #ffffff; font-weight: 700;">3,200</div>
            <div style="color: #ECEFF1; font-size: 1.125rem;">Jobs Posted</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Companies -->
    <section style="background-color: white; padding: 4rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238; margin-bottom: 3rem;">
          Companies Hiring Now
        </h2>
        <div class="grid grid-cols-2 md-grid-cols-4 gap-lg">
          ${[
            "Google",
            "Microsoft",
            "Amazon",
            "Meta",
            "Apple",
            "Netflix",
            "Spotify",
            "Airbnb",
          ]
            .map(
              (company) => `
              <div class="card text-center" style="padding: 1.5rem;">
                <span style="color: #78909C; font-weight: 500;">${company}</span>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section style="background-color: #ECEFF1; padding: 4rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238;">Why Choose Moon*?</h2>
        <p class="text-center" style="color: #78909C; max-width: 700px; margin: 0 auto 3rem;">
          We've built the most comprehensive platform for connecting IT talent with opportunity
        </p>
        <div class="grid md-grid-cols-2 lg-grid-cols-4 gap-lg">
          ${[
            {
              icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>`,
              title: "AI-Powered Matching",
              desc: "Our intelligent algorithm matches students with the perfect opportunities based on skills and preferences.",
            },
            {
              icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`,
              title: "Verified Profiles",
              desc: "All student profiles and company listings are verified to ensure authenticity and quality.",
            },
            {
              icon: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`,
              title: "Direct Application Tracking",
              desc: "Track your applications in real-time and get instant notifications on status updates.",
            },
            {
              icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
              title: "Career Growth Tools",
              desc: "Access resources, mentorship programs, and skill assessments to accelerate your career.",
            },
          ]
            .map(
              (feature) => `
            <div class="card">
              <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="#00BCD4" style="margin-bottom: 1rem;">
                ${feature.icon}
              </svg>
              <h3 style="color: #263238;">${feature.title}</h3>
              <p style="color: #78909C; margin: 0;">${feature.desc}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section style="background-color: white; padding: 4rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238; margin-bottom: 3rem;">How It Works</h2>
        <div class="grid md-grid-cols-2 gap-lg" style="max-width: 1000px; margin: 0 auto;">
          <!-- For Students -->
          <div>
            <h3 class="text-center" style="color: #00BCD4; margin-bottom: 2rem;">For Students</h3>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${[
                {
                  step: "1",
                  title: "Create Your Profile",
                  desc: "Build a comprehensive profile showcasing your skills, projects, and experience",
                },
                {
                  step: "2",
                  title: "Get Matched",
                  desc: "Our AI algorithm finds the perfect job opportunities for you",
                },
                {
                  step: "3",
                  title: "Apply & Track",
                  desc: "Apply with one click and track your applications in real-time",
                },
                {
                  step: "4",
                  title: "Start Your Career",
                  desc: "Interview with top companies and launch your tech career",
                },
              ]
                .map(
                  (item) => `
                <div style="display: flex; gap: 1rem;">
                  <div style="flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background-color: #00BCD4; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem;">
                    ${item.step}
                  </div>
                  <div>
                    <h4 style="color: #263238; margin-bottom: 0.5rem;">${item.title}</h4>
                    <p style="color: #78909C; margin: 0;">${item.desc}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- For Companies -->
          <div>
            <h3 class="text-center" style="color: #4DD0E1; margin-bottom: 2rem;">For Companies</h3>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${[
                {
                  step: "1",
                  title: "Post Your Jobs",
                  desc: "Create detailed job listings to attract the right talent",
                },
                {
                  step: "2",
                  title: "Review Applicants",
                  desc: "Get AI-matched candidates that fit your requirements",
                },
                {
                  step: "3",
                  title: "Hire Talent",
                  desc: "Connect with students and schedule interviews seamlessly",
                },
                {
                  step: "4",
                  title: "Build Your Team",
                  desc: "Bring fresh perspectives and skills to your organization",
                },
              ]
                .map(
                  (item) => `
                <div style="display: flex; gap: 1rem;">
                  <div style="flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background-color: #4DD0E1; color: #263238; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem;">
                    ${item.step}
                  </div>
                  <div>
                    <h4 style="color: #263238; margin-bottom: 0.5rem;">${item.title}</h4>
                    <p style="color: #78909C; margin: 0;">${item.desc}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section style="background-color: #ECEFF1; padding: 4rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238; margin-bottom: 3rem;">Success Stories</h2>
        <div class="grid md-grid-cols-2 gap-lg" style="max-width: 900px; margin: 0 auto;">
          ${[
            {
              name: "Sarah Chen",
              role: "Software Engineering Intern at TechCorp",
              quote:
                "Moon* helped me land my dream internship! The platform made it so easy to showcase my projects and connect with amazing companies.",
            },
            {
              name: "Marcus Rodriguez",
              role: "HR Manager at StartupHub",
              quote:
                "We've hired 5 incredible junior developers through Moon*. The quality of candidates is exceptional, and the platform makes hiring seamless.",
            },
          ]
            .map(
              (testimonial) => `
            <div class="card">
              <p style="color: #263238; font-style: italic; margin-bottom: 1.5rem;">"${testimonial.quote}"</p>
              <div>
                <div style="font-weight: 600; color: #263238;">${testimonial.name}</div>
                <div style="color: #78909C; font-size: 0.875rem;">${testimonial.role}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section style="background-color: #00BCD4; padding: 5rem 1rem;">
      <div class="container text-center">
        <h2 style="color: white; margin-bottom: 1rem;">Ready to Get Started?</h2>
        <p style="color: #ECEFF1; font-size: 1.25rem; margin-bottom: 2rem;">
          Join thousands of students and companies already using Moon*
        </p>
        <button class="btn btn-lg" onclick="app.openSignUpModal()" style="background-color: white; color: #00BCD4; font-weight: 600;">
          Join Moon* Today
        </button>
      </div>
    </section>
  </div>
`;

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.landing = renderLandingPage;
