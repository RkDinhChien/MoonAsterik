// ===========================
// Landing Page Template
// ===========================

const renderLandingPage = () => `
  <div class="landing-page">
    <!-- Hero Section - Full Screen with Background Image -->
    <section id="hero" class="hero-section">
      <!-- Overlay for better text readability -->
      <div class="hero-overlay"></div>
      
      <!-- Content on top of image -->
      <div class="container hero-content">
        <h1 class="hero-title">
          Launch Your <span class="hero-title-highlight">Tech Career</span>
        </h1>
        <p class="hero-subtitle">
          Moon* connects talented IT students with innovative companies looking for fresh perspectives and cutting-edge skills.
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary btn-lg btn-student" onclick="app.handleStudentClick()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
            </svg>
            I'm a Student
          </button>
          <button class="btn btn-primary btn-lg btn-employer" onclick="app.handleEmployerClick()">
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
    <section class="featured-companies">
      <div class="featured-companies-header">
        <h2 class="text-center featured-companies-title">
          TOP TIER EMPLOYERS
        </h2>
      </div>
      <div class="logos-slider">
        <div class="logos-track">
            ${[
							{
								name: 'FPT Software',
								file: 'fpt.png',
								url: 'https://www.fpt-software.com/',
							},
							{
								name: 'VNG Corporation',
								file: 'vng.png',
								url: 'https://www.vng.com.vn/',
							},
							{
								name: 'Viettel',
								file: 'viettel.png',
								url: 'https://vietteltelecom.vn/',
							},
							{ name: 'VNPT', file: 'vnpt.png', url: 'https://www.vnpt.vn/' },
							{ name: 'Tiki', file: 'tiki.png', url: 'https://tiki.vn/' },
							{ name: 'Shopee', file: 'shopee.png', url: 'https://shopee.vn/' },
							{
								name: 'Grab',
								file: 'grab.png',
								url: 'https://www.grab.com/vn/',
							},
							{ name: 'Momo', file: 'momo.png', url: 'https://www.momo.vn/' },
							{
								name: 'VinGroup',
								file: 'vingroup.png',
								url: 'https://www.vingroup.net/',
							},
							{
								name: 'CMC Corporation',
								file: 'cmc.png',
								url: 'https://www.cmc.com.vn/',
							},
							{
								name: 'TMA Solutions',
								file: 'tma.png',
								url: 'https://www.tma.com.vn/',
							},
							{
								name: 'NashTech',
								file: 'nashtech.png',
								url: 'https://www.nashtechglobal.com/',
							},
							{
								name: 'Luxoft Vietnam',
								file: 'luxoft.png',
								url: 'https://www.luxoft.com/',
							},
							{
								name: 'KMS Technology',
								file: 'kms.png',
								url: 'https://kms-technology.com/',
							},
							{
								name: 'Gameloft',
								file: 'gameloft.png',
								url: 'https://www.gameloft.com/',
							},
							// Duplicate for seamless loop
							{
								name: 'FPT Software',
								file: 'fpt.png',
								url: 'https://www.fpt-software.com/',
							},
							{
								name: 'VNG Corporation',
								file: 'vng.png',
								url: 'https://www.vng.com.vn/',
							},
							{
								name: 'Viettel',
								file: 'viettel.png',
								url: 'https://vietteltelecom.vn/',
							},
							{ name: 'VNPT', file: 'vnpt.png', url: 'https://www.vnpt.vn/' },
							{ name: 'Tiki', file: 'tiki.png', url: 'https://tiki.vn/' },
							{ name: 'Shopee', file: 'shopee.png', url: 'https://shopee.vn/' },
							{
								name: 'Grab',
								file: 'grab.png',
								url: 'https://www.grab.com/vn/',
							},
							{ name: 'Momo', file: 'momo.png', url: 'https://www.momo.vn/' },
							{
								name: 'VinGroup',
								file: 'vingroup.png',
								url: 'https://www.vingroup.net/',
							},
							{
								name: 'CMC Corporation',
								file: 'cmc.png',
								url: 'https://www.cmc.com.vn/',
							},
							{
								name: 'TMA Solutions',
								file: 'tma.png',
								url: 'https://www.tma.com.vn/',
							},
							{
								name: 'NashTech',
								file: 'nashtech.png',
								url: 'https://www.nashtechglobal.com/',
							},
							{
								name: 'Luxoft Vietnam',
								file: 'luxoft.png',
								url: 'https://www.luxoft.com/',
							},
							{
								name: 'KMS Technology',
								file: 'kms.png',
								url: 'https://kms-technology.com/',
							},
							{
								name: 'Gameloft',
								file: 'gameloft.png',
								url: 'https://www.gameloft.com/',
							},
						]
							.map(
								(company) => `
                <a href="${company.url}" target="_blank" rel="noopener noreferrer" class="logo-item">
                  <img src="/assets/logos/${company.file}" alt="${company.name}" />
                </a>
              `
							)
							.join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section">
      <div class="container">
        <div class="features-grid">
          
          <!-- Left Side - Image/CTA -->
          <div class="features-image-wrapper">
            <div class="features-decoration-1"></div>
            <div class="features-decoration-2"></div>
            <img src="assets/CTA_photo.png" alt="Students collaborating" class="features-image" />
          </div>
          
          <!-- Right Side - Features -->
          <div class="features-content">
            <h2 class="features-title">
              Why Choose Moon<span class="features-title-highlight">*</span>?
            </h2>
            <p class="features-subtitle">
              We've built the most comprehensive platform for connecting IT talent with opportunity
            </p>
            
            <div class="features-list">
              ${[
								{
									icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>`,
									title: 'AI-Powered Matching',
									desc: 'Our intelligent algorithm matches students with the perfect opportunities based on skills and preferences.',
									color: '#00BCD4',
								},
								{
									icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`,
									title: 'Verified Profiles',
									desc: 'All student profiles and company listings are verified to ensure authenticity and quality.',
									color: '#00ACC1',
								},
								{
									icon: `<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`,
									title: 'Direct Application Tracking',
									desc: 'Track your applications in real-time and get instant notifications on status updates.',
									color: '#4DD0E1',
								},
								{
									icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`,
									title: 'Career Growth Tools',
									desc: 'Access resources, mentorship programs, and skill assessments to accelerate your career.',
									color: '#26C6DA',
								},
							]
								.map(
									(feature) => `
                <div class="feature-item">
                  <div class="feature-icon" style="
                    background: linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%);
                    box-shadow: 0 4px 12px ${feature.color}30;
                  ">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      ${feature.icon}
                    </svg>
                  </div>
                  
                  <div class="feature-details">
                    <h3>${feature.title}</h3>
                    <p>${feature.desc}</p>
                  </div>
                </div>
              `
								)
								.join('')}
            </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <!-- Tech Decorations -->
      <div class="stats-decoration-blur-1"></div>
      <div class="stats-decoration-blur-2"></div>
      <div class="stats-decoration-grid"></div>
      <div class="stats-decoration-circle-1"></div>
      <div class="stats-decoration-circle-2"></div>
      <div class="stats-decoration-circle-3"></div>
      <div class="stats-decoration-line-1"></div>
      <div class="stats-decoration-line-2"></div>
      <div class="stats-decoration-dot-1"></div>
      <div class="stats-decoration-dot-2"></div>
      <div class="stats-decoration-dot-3"></div>
      
      <div class="container" style="position: relative; z-index: 1;">
        <div class="grid md-grid-cols-3 gap-lg">
          ${[
						{ number: '12,450+', target: 12450, label: 'Students Registered' },
						{ number: '850+', target: 850, label: 'Companies Joined' },
						{ number: '3,200+', target: 3200, label: 'Jobs Posted' },
					]
						.map(
							(stat) => `
              <div class="stat-card">
                <div class="stat-number" data-target="${stat.target}">0+</div>
                <div class="stat-label">${stat.label}</div>
              </div>
            `
						)
						.join('')}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="how-it-works-section">
      <div class="container">
        <div class="how-it-works-header">
          <h2 class="how-it-works-title">How It Works</h2>
          <p class="how-it-works-subtitle">Simple steps to connect talent with opportunity</p>
        </div>

        <!-- Timeline Layout -->
        <div class="how-it-works-content">
          
          <!-- For Students -->
          <div class="how-it-works-group">
            <h3 class="how-it-works-group-title students">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              For Students
            </h3>
            
            <div class="how-it-works-grid">
              ${[
								{
									num: '1',
									icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
									title: 'Create Profile',
									desc: 'Build your profile with skills, projects, and experience',
								},
								{
									num: '2',
									icon: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
									title: 'Get Matched',
									desc: 'AI finds perfect opportunities for your skills',
								},
								{
									num: '3',
									icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
									title: 'Apply Easily',
									desc: 'One-click apply and track applications',
								},
								{
									num: '4',
									icon: 'M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z',
									title: 'Start Career',
									desc: 'Interview and launch your tech career',
								},
							]
								.map(
									(item) => `
                <div class="how-it-works-card students">
                  <div class="how-it-works-card-header">
                    <div class="how-it-works-number students">${item.num}</div>
                    <h4>${item.title}</h4>
                  </div>
                  <p>${item.desc}</p>
                </div>
              `
								)
								.join('')}
            </div>
          </div>

          <!-- For Companies -->
          <div class="how-it-works-group">
            <h3 class="how-it-works-group-title companies">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
              For Companies
            </h3>
            
            <div class="how-it-works-grid">
              ${[
								{
									num: '1',
									title: 'Post Jobs',
									desc: 'Create detailed listings to attract top talent',
								},
								{
									num: '2',
									title: 'Review Candidates',
									desc: 'Get AI-matched profiles based on requirements',
								},
								{
									num: '3',
									title: 'Schedule Interviews',
									desc: 'Connect and interview with ease',
								},
								{
									num: '4',
									title: 'Build Your Team',
									desc: 'Hire and grow with fresh talent',
								},
							]
								.map(
									(item) => `
                <div class="how-it-works-card companies">
                  <div class="how-it-works-card-header">
                    <div class="how-it-works-number companies">${item.num}</div>
                    <h4>${item.title}</h4>
                  </div>
                  <p>${item.desc}</p>
                </div>
              `
								)
								.join('')}
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Success Stories / News Section -->
    <section id="success-stories" class="success-stories-section">
      <div class="container">
        <div class="success-stories-header">
          <h2>Success Stories</h2>
          <p>Real stories from our Moon* community</p>
        </div>
        
        <!-- News Grid -->
        <div class="grid md-grid-cols-3 gap-lg success-stories-grid">
          ${[
						{
							id: 1,
							category: 'Student Success',
							title: "From Bootcamp to Big Tech: Sarah's Journey",
							excerpt:
								'How a CS student landed her dream internship at a Fortune 500 company through Moon*',
							image:
								'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop',
							date: 'Oct 25, 2025',
							readTime: '3 min read',
							author: 'Sarah Chen',
							authorRole: 'Software Engineering Intern at TechCorp',
							fullStory:
								"When I started my computer science degree, I never imagined I'd be interning at one of the biggest tech companies in the world. Moon* changed everything for me.<br><br>The platform made it incredibly easy to showcase my projects and skills. I uploaded my GitHub portfolio, highlighted my coursework, and within days, I started receiving interview requests.<br><br>What impressed me most was the quality of companies on the platform. These weren't just any jobs - they were opportunities at companies I'd only dreamed of working for.<br><br>The interview process was smooth, and the Moon* team provided great resources to help me prepare. Three months later, I'm now working on real products used by millions of people.<br><br>My advice to other students: Don't wait until graduation. Start building your profile on Moon* now. You never know where it might lead!",
						},
						{
							id: 2,
							category: 'Company Impact',
							title: 'How StartupHub Found Their Dream Team',
							excerpt:
								'A growing startup shares how they hired 5 exceptional developers in just 2 months',
							image:
								'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
							date: 'Oct 22, 2025',
							readTime: '4 min read',
							author: 'Marcus Rodriguez',
							authorRole: 'HR Manager at StartupHub',
							fullStory:
								'As a fast-growing startup, finding talented junior developers was always our biggest challenge. Traditional recruiting was expensive and time-consuming.<br><br>Then we discovered Moon*. The difference was immediate. Instead of sifting through hundreds of generic resumes, we could see real portfolios, actual projects, and genuine passion for technology.<br><br>In just two months, we hired five incredible developers. Each one brought fresh perspectives, strong technical skills, and enthusiasm that energized our entire team.<br><br>What sets Moon* apart is the quality of candidates. These students are motivated, well-prepared, and ready to contribute from day one.<br><br>The platform also made our hiring process more efficient. We could quickly schedule interviews, track candidates, and make offers - all in one place.<br><br>For any company looking to build their tech team, especially startups, Moon* is an absolute game-changer.',
						},
						{
							id: 3,
							category: 'Career Growth',
							title: "Breaking Into Tech: A Self-Taught Developer's Story",
							excerpt:
								"Michael's journey from online courses to his first software engineering role",
							image:
								'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
							date: 'Oct 18, 2025',
							readTime: '5 min read',
							author: 'Michael Nguyen',
							authorRole: 'Junior Developer at InnovateTech',
							fullStory:
								"I didn't have a traditional CS degree. Everything I learned came from online courses, YouTube tutorials, and countless hours of practice. But breaking into the industry felt impossible.<br><br>Companies wanted experience, but how could I get experience without a job? Moon* solved this chicken-and-egg problem.<br><br>The platform let me showcase my self-taught skills through real projects. I built a portfolio of web applications, contributed to open source, and documented everything on my Moon* profile.<br><br>Employers on Moon* actually looked at what I could do, not just where I went to school. That made all the difference.<br><br>After applying to several positions, I got interviews from three different companies. The questions focused on my projects and problem-solving approach - exactly what I was prepared for.<br><br>Today, I'm a junior developer at InnovateTech, working on exciting projects and learning from experienced mentors. Moon* proved that if you have the skills and passion, you can make it in tech.<br><br>To all self-taught developers out there: your path is valid. Platforms like Moon* are creating opportunities for people like us.",
						},
					]
						.map(
							(story) => `
            <article class="story-article" onclick="app.openStoryModal(${story.id})">
              <!-- Article Image -->
              <div class="story-image-wrapper">
                <img src="${story.image}" alt="${story.title}" class="story-image" onerror="this.style.display='none'" />
                <div class="story-category">${story.category}</div>
              </div>
              
              <!-- Article Content -->
              <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-excerpt">${story.excerpt}</p>
                
                <!-- Meta Info -->
                <div class="story-meta">
                  <span>${story.date}</span>
                  <span class="story-read-more">Read More →</span>
                </div>
              </div>
            </article>
          `
						)
						.join('')}
        </div>
        
        <!-- View More Button -->
        <div class="view-more-container">
          <button class="view-more-button" onclick="window.location.href='blogs.html'">
            More Success Stories
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container cta-content">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of students and companies already using Moon*
        </p>
        <button class="btn btn-lg btn-join" onclick="app.openSignUpModal()">
          Join Moon* Today
        </button>
      </div>
    </section>
  </div>
`;

// Stats counter animation function
function initStatsAnimation() {
	console.log('Stats animation initialized');
	const statNumbers = document.querySelectorAll('.stat-number');
	console.log('Found stat numbers:', statNumbers.length);

	const animateNumber = (element) => {
		const target = parseInt(element.getAttribute('data-target'));
		console.log('Animating to:', target);
		const duration = 2500; // 2.5 seconds total
		const scrambleDuration = 2000; // 2 seconds of random numbers
		const finalCountDuration = 500; // 0.5 seconds to final number
		const startTime = Date.now();

		const scrambleInterval = setInterval(() => {
			const elapsed = Date.now() - startTime;

			if (elapsed < scrambleDuration) {
				// Phase 1: Random scrambling (like lottery machine)
				const randomNum = Math.floor(Math.random() * target * 2.5);
				element.textContent = randomNum.toLocaleString() + '+';
			} else if (elapsed < duration) {
				// Phase 2: Count up to target smoothly
				const progress = (elapsed - scrambleDuration) / finalCountDuration;
				const current = Math.floor(progress * target);
				element.textContent = current.toLocaleString() + '+';
			} else {
				// Phase 3: Show final number
				element.textContent = target.toLocaleString() + '+';
				clearInterval(scrambleInterval);
			}
		}, 50); // Update every 50ms
	};

	// Intersection Observer to trigger when stats section is visible
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log('Stats section is visible, starting animation');
					statNumbers.forEach(animateNumber);
					observer.disconnect(); // Only animate once
				}
			});
		},
		{ threshold: 0.3 }
	);

	const statsSection = document.querySelector('.stats-section');
	console.log('Stats section found:', !!statsSection);
	if (statsSection) {
		observer.observe(statsSection);
	}
}

// Logo click effect initialization
function initLogoClickEffect() {
	const logoItems = document.querySelectorAll('.logo-item');
	logoItems.forEach((item) => {
		item.addEventListener('click', function () {
			// Remove clicked class from all items
			logoItems.forEach((i) => i.classList.remove('clicked'));
			// Add clicked class to this item
			this.classList.add('clicked');
			// Remove after 2 seconds
			setTimeout(() => {
				this.classList.remove('clicked');
			}, 2000);
		});
	});
}

// Export for use in other modules
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.landing = renderLandingPage;
window.PageTemplates.initStatsAnimation = initStatsAnimation;
window.PageTemplates.initLogoClickEffect = initLogoClickEffect;

// Success Stories Data
window.successStories = [
	{
		id: 1,
		category: 'Student Success',
		title: "From Bootcamp to Big Tech: Sarah's Journey",
		excerpt:
			'How a CS student landed her dream internship at a Fortune 500 company through Moon*',
		image:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop',
		date: 'Oct 25, 2025',
		readTime: '3 min read',
		author: 'Sarah Chen',
		authorRole: 'Software Engineering Intern at TechCorp',
		fullStory:
			"When I started my computer science degree, I never imagined I'd be interning at one of the biggest tech companies in the world. Moon* changed everything for me.<br><br>The platform made it incredibly easy to showcase my projects and skills. I uploaded my GitHub portfolio, highlighted my coursework, and within days, I started receiving interview requests.<br><br>What impressed me most was the quality of companies on the platform. These weren't just any jobs - they were opportunities at companies I'd only dreamed of working for.<br><br>The interview process was smooth, and the Moon* team provided great resources to help me prepare. Three months later, I'm now working on real products used by millions of people.<br><br>My advice to other students: Don't wait until graduation. Start building your profile on Moon* now. You never know where it might lead!",
	},
	{
		id: 2,
		category: 'Company Impact',
		title: 'How StartupHub Found Their Dream Team',
		excerpt:
			'A growing startup shares how they hired 5 exceptional developers in just 2 months',
		image:
			'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
		date: 'Oct 22, 2025',
		readTime: '4 min read',
		author: 'Marcus Rodriguez',
		authorRole: 'HR Manager at StartupHub',
		fullStory:
			'As a fast-growing startup, finding talented junior developers was always our biggest challenge. Traditional recruiting was expensive and time-consuming.<br><br>Then we discovered Moon*. The difference was immediate. Instead of sifting through hundreds of generic resumes, we could see real portfolios, actual projects, and genuine passion for technology.<br><br>In just two months, we hired five incredible developers. Each one brought fresh perspectives, strong technical skills, and enthusiasm that energized our entire team.<br><br>What sets Moon* apart is the quality of candidates. These students are motivated, well-prepared, and ready to contribute from day one.<br><br>The platform also made our hiring process more efficient. We could quickly schedule interviews, track candidates, and make offers - all in one place.<br><br>For any company looking to build their tech team, especially startups, Moon* is an absolute game-changer.',
	},
	{
		id: 3,
		category: 'Career Growth',
		title: "Breaking Into Tech: A Self-Taught Developer's Story",
		excerpt:
			"Michael's journey from online courses to his first software engineering role",
		image:
			'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
		date: 'Oct 18, 2025',
		readTime: '5 min read',
		author: 'Michael Nguyen',
		authorRole: 'Junior Developer at InnovateTech',
		fullStory:
			"I didn't have a traditional CS degree. Everything I learned came from online courses, YouTube tutorials, and countless hours of practice. But breaking into the industry felt impossible.<br><br>Companies wanted experience, but how could I get experience without a job? Moon* solved this chicken-and-egg problem.<br><br>The platform let me showcase my self-taught skills through real projects. I built a portfolio of web applications, contributed to open source, and documented everything on my Moon* profile.<br><br>Employers on Moon* actually looked at what I could do, not just where I went to school. That made all the difference.<br><br>After applying to several positions, I got interviews from three different companies. The questions focused on my projects and problem-solving approach - exactly what I was prepared for.<br><br>Today, I'm a junior developer at InnovateTech, working on exciting projects and learning from experienced mentors. Moon* proved that if you have the skills and passion, you can make it in tech.<br><br>To all self-taught developers out there: your path is valid. Platforms like Moon* are creating opportunities for people like us.",
	},
];
