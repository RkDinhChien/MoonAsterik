// ===========================
// Landing Page Template
// ===========================

const renderLandingPage = () => `
  <div class="landing-page">
    <!-- Hero Section - Full Screen with Background Image -->
    <section class="hero-section" style="
      position: relative;
      min-height: 100vh;
      background-image: url('assets/photo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    ")
      <!-- Overlay for better text readability -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0, 188, 212, 0.4) 0%, rgba(38, 50, 56, 0.6) 100%);
      "></div>
      
      <!-- Content on top of image -->
      <div class="container" style="position: relative; z-index: 1; text-align: center; padding: 2rem;">
        <h1 style="color: #ffffff; font-size: 3.5rem; margin-bottom: 1.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
          Launch Your <span style="color: #00BCD4; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Tech Career</span>
        </h1>
        <p style="color: #ffffff; font-size: 1.5rem; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
          Moon* connects talented IT students with innovative companies looking for fresh perspectives and cutting-edge skills.
        </p>
        <div style="display: flex; flex-direction: row; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary btn-lg" onclick="app.handleStudentClick()" style="background-color: #ffffff; color: #00BCD4; min-width: 200px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
            </svg>
            I'm a Student
          </button>
          <button class="btn btn-lg" onclick="app.handleEmployerClick()" style="background-color: transparent; color: #ffffff; border: 2px solid #ffffff; min-width: 200px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
            </svg>
            I'm an Employer
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Companies -->
    <section style="background-color: white; padding: 2.5rem 0; overflow: hidden;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
        <h2 class="text-center" style="color: #263238; margin-bottom: 2rem; font-weight: 700;">
          TOP TIER EMPLOYERS
        </h2>
      </div>
      <div class="logos-slider">
        <div class="logos-track">
            ${[
              { name: "FPT Software", file: "fpt.png", url: "https://www.fpt-software.com/" },
              { name: "VNG Corporation", file: "vng.png", url: "https://www.vng.com.vn/" },
              { name: "Viettel", file: "viettel.png", url: "https://vietteltelecom.vn/" },
              { name: "VNPT", file: "vnpt.png", url: "https://www.vnpt.vn/" },
              { name: "Tiki", file: "tiki.png", url: "https://tiki.vn/" },
              { name: "Shopee", file: "shopee.png", url: "https://shopee.vn/" },
              { name: "Grab", file: "grab.png", url: "https://www.grab.com/vn/" },
              { name: "Momo", file: "momo.png", url: "https://www.momo.vn/" },
              { name: "VinGroup", file: "vingroup.png", url: "https://www.vingroup.net/" },
              { name: "CMC Corporation", file: "cmc.png", url: "https://www.cmc.com.vn/" },
              { name: "TMA Solutions", file: "tma.png", url: "https://www.tma.com.vn/" },
              { name: "NashTech", file: "nashtech.png", url: "https://www.nashtechglobal.com/" },
              { name: "Luxoft Vietnam", file: "luxoft.png", url: "https://www.luxoft.com/" },
              { name: "KMS Technology", file: "kms.png", url: "https://kms-technology.com/" },
              { name: "Gameloft", file: "gameloft.png", url: "https://www.gameloft.com/" },
              // Duplicate for seamless loop
              { name: "FPT Software", file: "fpt.png", url: "https://www.fpt-software.com/" },
              { name: "VNG Corporation", file: "vng.png", url: "https://www.vng.com.vn/" },
              { name: "Viettel", file: "viettel.png", url: "https://vietteltelecom.vn/" },
              { name: "VNPT", file: "vnpt.png", url: "https://www.vnpt.vn/" },
              { name: "Tiki", file: "tiki.png", url: "https://tiki.vn/" },
              { name: "Shopee", file: "shopee.png", url: "https://shopee.vn/" },
              { name: "Grab", file: "grab.png", url: "https://www.grab.com/vn/" },
              { name: "Momo", file: "momo.png", url: "https://www.momo.vn/" },
              { name: "VinGroup", file: "vingroup.png", url: "https://www.vingroup.net/" },
              { name: "CMC Corporation", file: "cmc.png", url: "https://www.cmc.com.vn/" },
              { name: "TMA Solutions", file: "tma.png", url: "https://www.tma.com.vn/" },
              { name: "NashTech", file: "nashtech.png", url: "https://www.nashtechglobal.com/" },
              { name: "Luxoft Vietnam", file: "luxoft.png", url: "https://www.luxoft.com/" },
              { name: "KMS Technology", file: "kms.png", url: "https://kms-technology.com/" },
              { name: "Gameloft", file: "gameloft.png", url: "https://www.gameloft.com/" },
            ]
              .map(
                (company) => `
                <a href="${company.url}" target="_blank" rel="noopener noreferrer" class="logo-item">
                  <img src="assets/logos/${company.file}" alt="${company.name}" />
                </a>
              `
              )
              .join("")}
          </div>
          </div>
        </div>
      </div>
      
      <style>
        .logos-slider {
          width: 100vw;
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
          margin-left: calc(-50vw + 50%);
        }
        
        .logos-track {
          display: flex;
          animation: scroll 40s linear infinite;
          width: fit-content;
        }
        
        .logo-item {
          flex-shrink: 0;
          width: 160px;
          height: 80px;
          margin: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 0.75rem;
          text-decoration: none;
          background-color: transparent;
        }
        
        .logo-item:hover {
          transform: scale(1.08);
          border-color: #00BCD4;
          background-color: #f8f9fa;
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
        }
        
        .logo-item:active,
        .logo-item.clicked {
          border-color: #0097A7;
          box-shadow: 0 6px 16px rgba(0, 151, 167, 0.25);
          background-color: #e3f2fd;
        }
        
        .logo-item img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .logo-item:hover img {
          opacity: 1;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .logos-slider:hover .logos-track {
          animation-play-state: paused;
        }
      </style>
      
      <script>
        // Add click effect to logo items
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(() => {
            const logoItems = document.querySelectorAll('.logo-item');
            logoItems.forEach(item => {
              item.addEventListener('click', function() {
                // Remove clicked class from all items
                logoItems.forEach(i => i.classList.remove('clicked'));
                // Add clicked class to this item
                this.classList.add('clicked');
                // Remove after 2 seconds
                setTimeout(() => {
                  this.classList.remove('clicked');
                }, 2000);
              });
            });
          }, 100);
        });
      </script>
    </section>

    <!-- Stats Section -->
    <section style="background-color: #00BCD4; padding: 2.5rem 1rem;">
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

    <!-- Features Section -->
    <section style="background-color: #ECEFF1; padding: 2.5rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238;">Why Choose Moon*?</h2>
        <p class="text-center" style="color: #78909C; max-width: 700px; margin: 0 auto 2rem;">
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
    <section style="background-color: white; padding: 2.5rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238; margin-bottom: 2rem;">How It Works</h2>
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
    <section style="background-color: #ECEFF1; padding: 2.5rem 1rem;">
      <div class="container">
        <h2 class="text-center" style="color: #263238; margin-bottom: 2rem;">Success Stories</h2>
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
