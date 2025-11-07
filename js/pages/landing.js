// ===========================
// Landing Page Template
// ===========================

const renderLandingPage = () => `
  <div class="landing-page">
    <!-- Hero Section - Full Screen with Background Image -->
    <section id="hero" class="hero-section" style="
      position: relative;
      min-height: 100vh;
      background-image: url('assets/photo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
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
              {
                name: "FPT Software",
                file: "fpt.png",
                url: "https://www.fpt-software.com/",
              },
              {
                name: "VNG Corporation",
                file: "vng.png",
                url: "https://www.vng.com.vn/",
              },
              {
                name: "Viettel",
                file: "viettel.png",
                url: "https://vietteltelecom.vn/",
              },
              { name: "VNPT", file: "vnpt.png", url: "https://www.vnpt.vn/" },
              { name: "Tiki", file: "tiki.png", url: "https://tiki.vn/" },
              { name: "Shopee", file: "shopee.png", url: "https://shopee.vn/" },
              {
                name: "Grab",
                file: "grab.png",
                url: "https://www.grab.com/vn/",
              },
              { name: "Momo", file: "momo.png", url: "https://www.momo.vn/" },
              {
                name: "VinGroup",
                file: "vingroup.png",
                url: "https://www.vingroup.net/",
              },
              {
                name: "CMC Corporation",
                file: "cmc.png",
                url: "https://www.cmc.com.vn/",
              },
              {
                name: "TMA Solutions",
                file: "tma.png",
                url: "https://www.tma.com.vn/",
              },
              {
                name: "NashTech",
                file: "nashtech.png",
                url: "https://www.nashtechglobal.com/",
              },
              {
                name: "Luxoft Vietnam",
                file: "luxoft.png",
                url: "https://www.luxoft.com/",
              },
              {
                name: "KMS Technology",
                file: "kms.png",
                url: "https://kms-technology.com/",
              },
              {
                name: "Gameloft",
                file: "gameloft.png",
                url: "https://www.gameloft.com/",
              },
              // Duplicate for seamless loop
              {
                name: "FPT Software",
                file: "fpt.png",
                url: "https://www.fpt-software.com/",
              },
              {
                name: "VNG Corporation",
                file: "vng.png",
                url: "https://www.vng.com.vn/",
              },
              {
                name: "Viettel",
                file: "viettel.png",
                url: "https://vietteltelecom.vn/",
              },
              { name: "VNPT", file: "vnpt.png", url: "https://www.vnpt.vn/" },
              { name: "Tiki", file: "tiki.png", url: "https://tiki.vn/" },
              { name: "Shopee", file: "shopee.png", url: "https://shopee.vn/" },
              {
                name: "Grab",
                file: "grab.png",
                url: "https://www.grab.com/vn/",
              },
              { name: "Momo", file: "momo.png", url: "https://www.momo.vn/" },
              {
                name: "VinGroup",
                file: "vingroup.png",
                url: "https://www.vingroup.net/",
              },
              {
                name: "CMC Corporation",
                file: "cmc.png",
                url: "https://www.cmc.com.vn/",
              },
              {
                name: "TMA Solutions",
                file: "tma.png",
                url: "https://www.tma.com.vn/",
              },
              {
                name: "NashTech",
                file: "nashtech.png",
                url: "https://www.nashtechglobal.com/",
              },
              {
                name: "Luxoft Vietnam",
                file: "luxoft.png",
                url: "https://www.luxoft.com/",
              },
              {
                name: "KMS Technology",
                file: "kms.png",
                url: "https://kms-technology.com/",
              },
              {
                name: "Gameloft",
                file: "gameloft.png",
                url: "https://www.gameloft.com/",
              },
            ]
              .map(
                (company) => `
                <a href="${company.url}" target="_blank" rel="noopener noreferrer" class="logo-item">
                  <img src="/assets/logos/${company.file}" alt="${company.name}" />
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

    <!-- Features Section -->
    <section id="features" style="background: linear-gradient(to bottom, #ffffff 0%, #f0f9ff 100%); padding: 4rem 1rem;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 4rem; align-items: center; max-width: 1300px; margin: 0 auto;">
          
          <!-- Left Side - Image/CTA -->
          <div style="position: relative;">
            <div style="
              position: absolute;
              top: -20px;
              right: -20px;
              width: 150px;
              height: 150px;
              background: linear-gradient(135deg, #00BCD4 0%, #00ACC1 100%);
              border-radius: 50%;
              opacity: 0.1;
              z-index: 0;
            "></div>
            <div style="
              position: absolute;
              bottom: -30px;
              left: -30px;
              width: 200px;
              height: 200px;
              background: linear-gradient(135deg, #4DD0E1 0%, #00BCD4 100%);
              border-radius: 50%;
              opacity: 0.08;
              z-index: 0;
            "></div>
            <img src="assets/CTA_photo.png" alt="Students collaborating" style="
              width: 115%;
              height: auto;
              display: block;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 188, 212, 0.2);
              position: relative;
              z-index: 1;
              transform: perspective(1000px) rotateY(-5deg);
              transition: transform 0.3s ease;
              margin-left: -7.5%;
            " onmouseover="this.style.transform='perspective(1000px) rotateY(0deg) scale(1.02)'" onmouseout="this.style.transform='perspective(1000px) rotateY(-5deg)'" />
          </div>
          
          <!-- Right Side - Features -->
          <div>
            <h2 style="color: #1a1a1a; font-size: 2.5rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.2;">
              Why Choose Moon<span style="background: linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">*</span>?
            </h2>
            <p style="color: #64748b; margin-bottom: 2.5rem; font-size: 1rem; line-height: 1.7;">
              We've built the most comprehensive platform for connecting IT talent with opportunity
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 1.75rem;">
              ${[
                {
                  icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>`,
                  title: "AI-Powered Matching",
                  desc: "Our intelligent algorithm matches students with the perfect opportunities based on skills and preferences.",
                  color: "#00BCD4",
                },
                {
                  icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`,
                  title: "Verified Profiles",
                  desc: "All student profiles and company listings are verified to ensure authenticity and quality.",
                  color: "#00ACC1",
                },
                {
                  icon: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`,
                  title: "Direct Application Tracking",
                  desc: "Track your applications in real-time and get instant notifications on status updates.",
                  color: "#4DD0E1",
                },
                {
                  icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
                  title: "Career Growth Tools",
                  desc: "Access resources, mentorship programs, and skill assessments to accelerate your career.",
                  color: "#26C6DA",
                },
              ]
                .map(
                  (feature) => `
                <div style="display: flex; gap: 1.25rem; transition: transform 0.2s ease;" onmouseover="this.style.transform='translateX(8px)'" onmouseout="this.style.transform='translateX(0)'">
                  <div style="
                    width: 52px;
                    height: 52px;
                    background: linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px ${feature.color}30;
                  ">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 26px; height: 26px;">
                      ${feature.icon}
                    </svg>
                  </div>
                  
                  <div>
                    <h3 style="
                      color: #1a1a1a;
                      font-size: 1.125rem;
                      font-weight: 700;
                      margin-bottom: 0.375rem;
                    ">${feature.title}</h3>
                    
                    <p style="
                      color: #64748b;
                      margin: 0;
                      line-height: 1.6;
                      font-size: 0.9375rem;
                    ">${feature.desc}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          
        </div>
        
        <!-- Mobile Responsive -->
        <style>
          @media (max-width: 768px) {
            .container > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        </style>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section" style="
      background: linear-gradient(135deg, #26C6DA 0%, #4DD0E1 100%);
      padding: 3rem 1rem;
      position: relative;
      overflow: hidden;
    ">
      <!-- Tech Decorations -->
      <!-- Blur circles -->
      <div style="
        position: absolute;
        top: -80px;
        right: 10%;
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        filter: blur(50px);
      "></div>
      <div style="
        position: absolute;
        bottom: -60px;
        left: 5%;
        width: 150px;
        height: 150px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 50%;
        filter: blur(40px);
      "></div>
      
      <!-- Tech grid pattern -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        opacity: 0.5;
      "></div>
      
      <!-- Circles -->
      <div style="
        position: absolute;
        top: 50%;
        left: -50px;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        top: 20%;
        right: -30px;
        width: 80px;
        height: 80px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        bottom: 30%;
        right: 15%;
        width: 60px;
        height: 60px;
        border: 2px solid rgba(255, 255, 255, 0.12);
        border-radius: 50%;
      "></div>
      
      <!-- Tech lines -->
      <div style="
        position: absolute;
        top: 25%;
        left: 8%;
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transform: rotate(-30deg);
      "></div>
      <div style="
        position: absolute;
        bottom: 35%;
        right: 10%;
        width: 120px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
        transform: rotate(25deg);
      "></div>
      
      <!-- Small dots -->
      <div style="
        position: absolute;
        top: 15%;
        left: 20%;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        top: 70%;
        left: 75%;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        top: 40%;
        right: 25%;
        width: 6px;
        height: 6px;
        background: rgba(255, 255, 255, 0.35);
        border-radius: 50%;
      "></div>
      
      <div class="container" style="position: relative; z-index: 1;">
        <div class="grid md-grid-cols-3 gap-lg">
          ${[
            { number: "12,450+", target: 12450, label: "Students Registered" },
            { number: "850+", target: 850, label: "Companies Joined" },
            { number: "3,200+", target: 3200, label: "Jobs Posted" },
          ]
            .map(
              (stat) => `
              <div style="
                text-align: center;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                transition: all 0.3s ease;
              " onmouseover="this.style.transform='translateY(-5px)'; this.style.background='rgba(255, 255, 255, 0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.background='rgba(255, 255, 255, 0.1)'">
                <div class="stat-number" data-target="${stat.target}" style="
                  font-size: 3.25rem;
                  color: #ffffff;
                  font-weight: 800;
                  margin-bottom: 0.5rem;
                  line-height: 1;
                ">0+</div>
                <div style="
                  color: rgba(255, 255, 255, 0.95);
                  font-size: 1.0625rem;
                  font-weight: 500;
                ">${stat.label}</div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" style="background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%); padding: 5rem 1rem;">
      <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="color: #263238; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">How It Works</h2>
          <p style="color: #546E7A; font-size: 1.125rem;">Simple steps to connect talent with opportunity</p>
        </div>

        <!-- Timeline Layout -->
        <div style="max-width: 1200px; margin: 0 auto;">
          
          <!-- For Students -->
          <div style="margin-bottom: 4rem;">
            <h3 style="
              color: #00BCD4;
              font-size: 1.5rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
            ">
              <svg style="width: 28px; height: 28px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              For Students
            </h3>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 2rem;
            ">
              ${[
                {
                  num: "1",
                  icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
                  title: "Create Profile",
                  desc: "Build your profile with skills, projects, and experience",
                },
                {
                  num: "2",
                  icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
                  title: "Get Matched",
                  desc: "AI finds perfect opportunities for your skills",
                },
                {
                  num: "3",
                  icon: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
                  title: "Apply Easily",
                  desc: "One-click apply and track applications",
                },
                {
                  num: "4",
                  icon: "M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z",
                  title: "Start Career",
                  desc: "Interview and launch your tech career",
                },
              ]
                .map(
                  (item) => `
                <div style="
                  background: white;
                  padding: 2rem 1.5rem;
                  border-radius: 12px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                  transition: all 0.3s ease;
                  position: relative;
                  border-left: 4px solid #00BCD4;
                "
                onmouseover="this.style.boxShadow='0 8px 24px rgba(0,188,212,0.15)'; this.style.transform='translateY(-4px)'"
                onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'"
                >
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                  ">
                    <div style="
                      width: 48px;
                      height: 48px;
                      background: linear-gradient(135deg, #00BCD4, #0097A7);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-weight: 700;
                      font-size: 1.25rem;
                      flex-shrink: 0;
                    ">${item.num}</div>
                    <h4 style="
                      color: #263238;
                      font-size: 1.125rem;
                      font-weight: 700;
                      margin: 0;
                    ">${item.title}</h4>
                  </div>
                  <p style="
                    color: #546E7A;
                    font-size: 0.9375rem;
                    line-height: 1.6;
                    margin: 0;
                  ">${item.desc}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- For Companies -->
          <div>
            <h3 style="
              color: #FF6B6B;
              font-size: 1.5rem;
              font-weight: 700;
              margin-bottom: 2rem;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
            ">
              <svg style="width: 28px; height: 28px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
              For Companies
            </h3>
            
            <div style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 2rem;
            ">
              ${[
                {
                  num: "1",
                  title: "Post Jobs",
                  desc: "Create detailed listings to attract top talent",
                },
                {
                  num: "2",
                  title: "Review Candidates",
                  desc: "Get AI-matched profiles based on requirements",
                },
                {
                  num: "3",
                  title: "Schedule Interviews",
                  desc: "Connect and interview with ease",
                },
                {
                  num: "4",
                  title: "Build Your Team",
                  desc: "Hire and grow with fresh talent",
                },
              ]
                .map(
                  (item) => `
                <div style="
                  background: white;
                  padding: 2rem 1.5rem;
                  border-radius: 12px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                  transition: all 0.3s ease;
                  position: relative;
                  border-left: 4px solid #FF6B6B;
                "
                onmouseover="this.style.boxShadow='0 8px 24px rgba(255,107,107,0.15)'; this.style.transform='translateY(-4px)'"
                onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'"
                >
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                  ">
                    <div style="
                      width: 48px;
                      height: 48px;
                      background: linear-gradient(135deg, #FF6B6B, #EE5A6F);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-weight: 700;
                      font-size: 1.25rem;
                      flex-shrink: 0;
                    ">${item.num}</div>
                    <h4 style="
                      color: #263238;
                      font-size: 1.125rem;
                      font-weight: 700;
                      margin: 0;
                    ">${item.title}</h4>
                  </div>
                  <p style="
                    color: #546E7A;
                    font-size: 0.9375rem;
                    line-height: 1.6;
                    margin: 0;
                  ">${item.desc}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Success Stories / News Section -->
    <section id="success-stories" style="background-color: #ECEFF1; padding: 3rem 1rem;">
      <div class="container">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <h2 style="color: #263238; margin-bottom: 0.5rem;">Success Stories</h2>
          <p style="color: #78909C; font-size: 1.125rem;">Real stories from our Moon* community</p>
        </div>
        
        <!-- News Grid -->
        <div class="grid md-grid-cols-3 gap-lg" style="max-width: 1200px; margin: 0 auto;">
          ${[
            {
              id: 1,
              category: "Student Success",
              title: "From Bootcamp to Big Tech: Sarah's Journey",
              excerpt:
                "How a CS student landed her dream internship at a Fortune 500 company through Moon*",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
              date: "Oct 25, 2025",
              readTime: "3 min read",
              author: "Sarah Chen",
              authorRole: "Software Engineering Intern at TechCorp",
              fullStory:
                "When I started my computer science degree, I never imagined I'd be interning at one of the biggest tech companies in the world. Moon* changed everything for me.<br><br>The platform made it incredibly easy to showcase my projects and skills. I uploaded my GitHub portfolio, highlighted my coursework, and within days, I started receiving interview requests.<br><br>What impressed me most was the quality of companies on the platform. These weren't just any jobs - they were opportunities at companies I'd only dreamed of working for.<br><br>The interview process was smooth, and the Moon* team provided great resources to help me prepare. Three months later, I'm now working on real products used by millions of people.<br><br>My advice to other students: Don't wait until graduation. Start building your profile on Moon* now. You never know where it might lead!",
            },
            {
              id: 2,
              category: "Company Impact",
              title: "How StartupHub Found Their Dream Team",
              excerpt:
                "A growing startup shares how they hired 5 exceptional developers in just 2 months",
              image:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
              date: "Oct 22, 2025",
              readTime: "4 min read",
              author: "Marcus Rodriguez",
              authorRole: "HR Manager at StartupHub",
              fullStory:
                "As a fast-growing startup, finding talented junior developers was always our biggest challenge. Traditional recruiting was expensive and time-consuming.<br><br>Then we discovered Moon*. The difference was immediate. Instead of sifting through hundreds of generic resumes, we could see real portfolios, actual projects, and genuine passion for technology.<br><br>In just two months, we hired five incredible developers. Each one brought fresh perspectives, strong technical skills, and enthusiasm that energized our entire team.<br><br>What sets Moon* apart is the quality of candidates. These students are motivated, well-prepared, and ready to contribute from day one.<br><br>The platform also made our hiring process more efficient. We could quickly schedule interviews, track candidates, and make offers - all in one place.<br><br>For any company looking to build their tech team, especially startups, Moon* is an absolute game-changer.",
            },
            {
              id: 3,
              category: "Career Growth",
              title: "Breaking Into Tech: A Self-Taught Developer's Story",
              excerpt:
                "Michael's journey from online courses to his first software engineering role",
              image:
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
              date: "Oct 18, 2025",
              readTime: "5 min read",
              author: "Michael Nguyen",
              authorRole: "Junior Developer at InnovateTech",
              fullStory:
                "I didn't have a traditional CS degree. Everything I learned came from online courses, YouTube tutorials, and countless hours of practice. But breaking into the industry felt impossible.<br><br>Companies wanted experience, but how could I get experience without a job? Moon* solved this chicken-and-egg problem.<br><br>The platform let me showcase my self-taught skills through real projects. I built a portfolio of web applications, contributed to open source, and documented everything on my Moon* profile.<br><br>Employers on Moon* actually looked at what I could do, not just where I went to school. That made all the difference.<br><br>After applying to several positions, I got interviews from three different companies. The questions focused on my projects and problem-solving approach - exactly what I was prepared for.<br><br>Today, I'm a junior developer at InnovateTech, working on exciting projects and learning from experienced mentors. Moon* proved that if you have the skills and passion, you can make it in tech.<br><br>To all self-taught developers out there: your path is valid. Platforms like Moon* are creating opportunities for people like us.",
            },
          ]
            .map(
              (story) => `
            <article 
              onclick="app.openStoryModal(${story.id})" 
              style="
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                cursor: pointer;
                height: 100%;
                display: flex;
                flex-direction: column;
              "
              onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'"
            >
              <!-- Article Image -->
              <div style="
                width: 100%;
                height: 200px;
                background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
                position: relative;
                overflow: hidden;
              ">
                <img 
                  src="${story.image}" 
                  alt="${story.title}"
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.9;
                  "
                  onerror="this.style.display='none'"
                />
                <div style="
                  position: absolute;
                  top: 12px;
                  left: 12px;
                  background: rgba(0, 188, 212, 0.95);
                  color: white;
                  padding: 0.375rem 0.75rem;
                  border-radius: 6px;
                  font-size: 0.75rem;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">${story.category}</div>
              </div>
              
              <!-- Article Content -->
              <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                <h3 style="
                  color: #263238;
                  font-size: 1.25rem;
                  font-weight: 700;
                  margin-bottom: 0.75rem;
                  line-height: 1.4;
                ">${story.title}</h3>
                
                <p style="
                  color: #546E7A;
                  font-size: 0.9375rem;
                  line-height: 1.6;
                  margin-bottom: 1rem;
                  flex-grow: 1;
                ">${story.excerpt}</p>
                
                <!-- Meta Info -->
                <div style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding-top: 1rem;
                  border-top: 1px solid #ECEFF1;
                  font-size: 0.8125rem;
                  color: #78909C;
                ">
                  <span>${story.date}</span>
                  <span style="
                    color: #00BCD4;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                  ">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
        
        <!-- View More Button -->
        <div style="text-align: center; margin-top: 3rem;">
          <button 
            onclick="window.location.href='blogs.html'" 
            style="
              background: #00BCD4;
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            "
            onmouseover="this.style.background='#0097A7'; this.style.transform='translateY(-2px)'"
            onmouseout="this.style.background='#00BCD4'; this.style.transform='translateY(0)'"
          >
            More Success Stories
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
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

// Stats counter animation function
function initStatsAnimation() {
  console.log("Stats animation initialized");
  const statNumbers = document.querySelectorAll(".stat-number");
  console.log("Found stat numbers:", statNumbers.length);

  const animateNumber = (element) => {
    const target = parseInt(element.getAttribute("data-target"));
    console.log("Animating to:", target);
    const duration = 2500; // 2.5 seconds total
    const scrambleDuration = 2000; // 2 seconds of random numbers
    const finalCountDuration = 500; // 0.5 seconds to final number
    const startTime = Date.now();

    const scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed < scrambleDuration) {
        // Phase 1: Random scrambling (like lottery machine)
        const randomNum = Math.floor(Math.random() * target * 2.5);
        element.textContent = randomNum.toLocaleString() + "+";
      } else if (elapsed < duration) {
        // Phase 2: Count up to target smoothly
        const progress = (elapsed - scrambleDuration) / finalCountDuration;
        const current = Math.floor(progress * target);
        element.textContent = current.toLocaleString() + "+";
      } else {
        // Phase 3: Show final number
        element.textContent = target.toLocaleString() + "+";
        clearInterval(scrambleInterval);
      }
    }, 50); // Update every 50ms
  };

  // Intersection Observer to trigger when stats section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Stats section is visible, starting animation");
          statNumbers.forEach(animateNumber);
          observer.disconnect(); // Only animate once
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".stats-section");
  console.log("Stats section found:", !!statsSection);
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.landing = renderLandingPage;
window.PageTemplates.initStatsAnimation = initStatsAnimation;

// Success Stories Data
window.successStories = [
  {
    id: 1,
    category: "Student Success",
    title: "From Bootcamp to Big Tech: Sarah's Journey",
    excerpt:
      "How a CS student landed her dream internship at a Fortune 500 company through Moon*",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
    date: "Oct 25, 2025",
    readTime: "3 min read",
    author: "Sarah Chen",
    authorRole: "Software Engineering Intern at TechCorp",
    fullStory:
      "When I started my computer science degree, I never imagined I'd be interning at one of the biggest tech companies in the world. Moon* changed everything for me.<br><br>The platform made it incredibly easy to showcase my projects and skills. I uploaded my GitHub portfolio, highlighted my coursework, and within days, I started receiving interview requests.<br><br>What impressed me most was the quality of companies on the platform. These weren't just any jobs - they were opportunities at companies I'd only dreamed of working for.<br><br>The interview process was smooth, and the Moon* team provided great resources to help me prepare. Three months later, I'm now working on real products used by millions of people.<br><br>My advice to other students: Don't wait until graduation. Start building your profile on Moon* now. You never know where it might lead!",
  },
  {
    id: 2,
    category: "Company Impact",
    title: "How StartupHub Found Their Dream Team",
    excerpt:
      "A growing startup shares how they hired 5 exceptional developers in just 2 months",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
    date: "Oct 22, 2025",
    readTime: "4 min read",
    author: "Marcus Rodriguez",
    authorRole: "HR Manager at StartupHub",
    fullStory:
      "As a fast-growing startup, finding talented junior developers was always our biggest challenge. Traditional recruiting was expensive and time-consuming.<br><br>Then we discovered Moon*. The difference was immediate. Instead of sifting through hundreds of generic resumes, we could see real portfolios, actual projects, and genuine passion for technology.<br><br>In just two months, we hired five incredible developers. Each one brought fresh perspectives, strong technical skills, and enthusiasm that energized our entire team.<br><br>What sets Moon* apart is the quality of candidates. These students are motivated, well-prepared, and ready to contribute from day one.<br><br>The platform also made our hiring process more efficient. We could quickly schedule interviews, track candidates, and make offers - all in one place.<br><br>For any company looking to build their tech team, especially startups, Moon* is an absolute game-changer.",
  },
  {
    id: 3,
    category: "Career Growth",
    title: "Breaking Into Tech: A Self-Taught Developer's Story",
    excerpt:
      "Michael's journey from online courses to his first software engineering role",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    date: "Oct 18, 2025",
    readTime: "5 min read",
    author: "Michael Nguyen",
    authorRole: "Junior Developer at InnovateTech",
    fullStory:
      "I didn't have a traditional CS degree. Everything I learned came from online courses, YouTube tutorials, and countless hours of practice. But breaking into the industry felt impossible.<br><br>Companies wanted experience, but how could I get experience without a job? Moon* solved this chicken-and-egg problem.<br><br>The platform let me showcase my self-taught skills through real projects. I built a portfolio of web applications, contributed to open source, and documented everything on my Moon* profile.<br><br>Employers on Moon* actually looked at what I could do, not just where I went to school. That made all the difference.<br><br>After applying to several positions, I got interviews from three different companies. The questions focused on my projects and problem-solving approach - exactly what I was prepared for.<br><br>Today, I'm a junior developer at InnovateTech, working on exciting projects and learning from experienced mentors. Moon* proved that if you have the skills and passion, you can make it in tech.<br><br>To all self-taught developers out there: your path is valid. Platforms like Moon* are creating opportunities for people like us.",
  },
];
