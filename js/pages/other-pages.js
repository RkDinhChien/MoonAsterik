// ===========================
// Other Page Templates
// ===========================

const renderProfilePage = () => {
  const user = window.AppState.getUserInfo?.() || {};
  const val = (v) => (v && String(v).trim() ? v : "—");
  // Demo datasets (can be replaced by real data later)
  const education = user.education || [
    {
      university: user.university || "Đại học Công nghệ Thông tin",
      faculty: user.faculty || "Khoa OEP",
      studentCode: user.studentCode || user.studentId || "—",
      year: user.year || "3 năm",
      graduation: user.graduation || "—",
      gpa: user.gpa || "—",
    },
  ];
  const certificates = user.certificates || [
    { name: "JLPT", value: user.jlpt || "—", date: "2024/12/01" },
    { name: "IELTS", value: user.ielts || "—", date: "2025/01/12" },
  ];
  const awards = user.awards || [
    { title: "FPT Software Go Japan 2025", date: "2025/07/31" },
  ];
  const highlights = user.highlights || [
    "Có thái độ chủ động, thích nghi nhanh, sẵn sàng làm việc trong nhiều môi trường.",
  ];
  const skills = user.skills || [
    { name: "C++", months: 8 },
    { name: "Python", months: 4 },
    { name: "JavaScript", months: 2 },
    { name: "HTML", months: 3 },
    { name: "SQL", months: 4 },
  ];

  return `
    <div class="profile-page" style="padding: 1.25rem 1rem;">
      <div class="container" style="max-width: 1200px;">
        <!-- Header Card -->
        <div class="card page-header">
          <div class="avatar-lg">
            <img src="${
              user.avatar || "https://api.dicebear.com/8.x/thumbs/svg?seed=Moon"
            }" alt="Avatar" />
          </div>
          <div style="flex:1">
            <h2>${val(user.fullName) || "Hồ sơ của bạn"}</h2>
            <div class="subtitle">
              <div>ID <strong style="margin-left:.4rem">${val(
                user.studentId
              )}</strong></div>
              <div>Tháng tốt nghiệp <strong style="margin-left:.4rem">${val(
                user.graduation
              )}</strong></div>
              <div>Mạng xã hội <a href="${
                user.github || "#"
              }" target="_blank" rel="noopener" style="color:#00BCD4">${
    user.github ? "GitHub" : "Thêm GitHub"
  }</a></div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
        </div>

        <!-- Body Grid -->
        <div class="page-grid" style="margin-top:1rem;">
          <!-- Left: Sections -->
          <div class="profile-sections" style="display:flex; flex-direction:column; gap:1rem;">
            <!-- Basic -->
            <section id="sec-basic" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header"><h3 style="margin:0;">Thông tin cơ bản</h3></div>
              <div style="display:grid; grid-template-columns: 220px 1fr; row-gap:.75rem; column-gap:1rem;">
                <div style="color:#607D8B;">Họ và tên</div><div>${val(
                  user.fullName
                )}</div>
                <div style="color:#607D8B;">Ngày sinh</div><div>${val(
                  user.birthday
                )}</div>
                <div style="color:#607D8B;">Giới tính</div><div>${val(
                  user.gender
                )}</div>
                <div style="color:#607D8B;">Số điện thoại</div><div>${val(
                  user.phone
                )}</div>
                <div style="color:#607D8B;">Email</div><div>${val(
                  user.email
                )}</div>
                <div style="color:#607D8B;">Quốc gia</div><div>${val(
                  user.country
                )}</div>
              </div>
            </section>

            <!-- Education -->
            <section id="sec-edu" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header">
                <h3 style="margin:0;">Học vấn</h3>
                <button class="btn btn-outline" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
              </div>
              <div style="display:grid; grid-template-columns: 220px 1fr; row-gap:.75rem; column-gap:1rem;">
                <div style="color:#607D8B;">Đại học</div><div>${val(
                  education[0].university
                )}</div>
                <div style="color:#607D8B;">Khoa</div><div>${val(
                  education[0].faculty
                )}</div>
                <div style="color:#607D8B;">Mã số sinh viên</div><div>${val(
                  education[0].studentCode
                )}</div>
                <div style="color:#607D8B;">Niên khóa</div><div>${val(
                  education[0].year
                )}</div>
                <div style="color:#607D8B;">Dự kiến tốt nghiệp</div><div>${val(
                  education[0].graduation
                )}</div>
                <div style="color:#607D8B;">GPA</div><div>${val(
                  education[0].gpa
                )}</div>
              </div>
            </section>

            <!-- Certificates -->
            <section id="sec-cert" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header">
                <h3 style="margin:0;">Chứng chỉ</h3>
                <button class="btn btn-outline" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 200px; row-gap:.5rem; column-gap:1rem;">
                ${certificates
                  .map(
                    (c) => `
                  <div><strong>${c.name}</strong> ${val(c.value)}</div>
                  <div style="color:#607D8B;">${val(c.date)}</div>
                `
                  )
                  .join("")}
              </div>
            </section>

            <!-- Awards -->
            <section id="sec-award" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header">
                <h3 style="margin:0;">Giải thưởng</h3>
                <button class="btn btn-outline" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 200px; row-gap:.5rem; column-gap:1rem;">
                ${awards
                  .map(
                    (a) => `
                  <div>${a.title}</div>
                  <div style="color:#607D8B;">${a.date}</div>
                `
                  )
                  .join("")}
              </div>
            </section>

            <!-- Highlights -->
            <section id="sec-highlight" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header">
                <h3 style="margin:0;">Điểm nổi bật</h3>
                <button class="btn btn-outline" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
              </div>
              <ul style="margin-left:1rem; color:#455A64; display:flex; flex-direction:column; gap:.5rem;">
                ${highlights.map((h) => `<li>${h}</li>`).join("")}
              </ul>
            </section>

            <!-- Skills -->
            <section id="sec-skill" class="card profile-section" style="scroll-margin-top: 90px;">
              <div class="section-header">
                <h3 style="margin:0;">Kỹ năng chuyên môn</h3>
                <button class="btn btn-outline" onclick="Router.navigate('profile-setup')">Chỉnh sửa</button>
              </div>
              <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
                ${skills
                  .map(
                    (s) =>
                      `<span style="font-size:.9rem; padding:.35rem .6rem; border:1px solid #e0e6ea; border-radius:999px; color:#607D8B; background:#fafcfe;">${s.name} <span style='opacity:.7'>${s.months} tháng</span></span>`
                  )
                  .join("")}
              </div>
            </section>
          </div>

          <!-- Right: Sections index -->
          <aside class="card profile-sidebar" style="height:fit-content; position: sticky; top: 80px;">
            <h4 style="margin-bottom:.75rem;">Hồ sơ</h4>
            <ul id="profile-nav" style="display:flex; flex-direction:column; gap:.5rem; color:#546E7A;">
              <li><a href="#sec-basic" data-target="sec-basic" class="profile-nav-link active">Thông tin cơ bản</a></li>
              <li><a href="#sec-edu" data-target="sec-edu" class="profile-nav-link">Học vấn</a></li>
              <li><a href="#sec-cert" data-target="sec-cert" class="profile-nav-link">Chứng chỉ</a></li>
              <li><a href="#sec-award" data-target="sec-award" class="profile-nav-link">Giải thưởng</a></li>
              <li><a href="#sec-highlight" data-target="sec-highlight" class="profile-nav-link">Điểm nổi bật</a></li>
              <li style="margin-top:.75rem; font-weight:700; color:#263238;">Kỹ năng</li>
              <li><a href="#sec-skill" data-target="sec-skill" class="profile-nav-link">Kỹ năng chuyên môn</a></li>
            </ul>
          </aside>
        </div>
      </div>

      <script>
        (function(){
          // Smooth scroll on click
          document.querySelectorAll('.profile-nav-link').forEach(a=>{
            a.addEventListener('click', function(e){
              e.preventDefault();
              const id = this.getAttribute('data-target');
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
            });
          });

          // Observe sections to highlight active item
          const navLinks = Array.from(document.querySelectorAll('.profile-nav-link'));
          const byId = (id) => navLinks.find(l=>l.getAttribute('data-target')===id);
          const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
              if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('data-target')===id));
              }
            });
          }, {rootMargin: '-40% 0px -55% 0px', threshold: 0.01});
          document.querySelectorAll('.profile-section').forEach(sec=>observer.observe(sec));
        })();
      </script>
    </div>
  `;
};

const renderJobsPage = () => `
  <div class="jobs-page" style="padding: 1.25rem 1rem;">
    <div class="container" style="max-width: 1200px;">
      <div class="card" style="margin-bottom:1rem;">
        <h3 style="margin-bottom: .75rem;">Tìm việc</h3>
        <div style="display:grid; grid-template-columns: 1.8fr 1fr 160px; gap:.75rem;">
          <input id="job-q" class="form-input" placeholder="Từ khóa, vị trí, kỹ năng (vd: Frontend React, Java)"/>
          <input id="job-loc" class="form-input" placeholder="Địa điểm (vd: Hà Nội, HCM, Remote)"/>
          <button class="btn btn-primary" onclick="app.searchJobs()">Tìm kiếm</button>
        </div>
      </div>

      <div id="jobs-list" class="grid md-grid-cols-3 gap-lg">
        ${[
          {
            title: "Frontend Developer (React)",
            company: "TechStart",
            loc: "TP.HCM",
            type: "Intern",
            tags: ["React", "JS", "HTML/CSS"],
          },
          {
            title: "Backend Developer (Node.js)",
            company: "FinHub",
            loc: "Hà Nội",
            type: "Fresher",
            tags: ["Node", "Express", "MongoDB"],
          },
          {
            title: "QA Engineer",
            company: "HealthPlus",
            loc: "Remote",
            type: "Intern",
            tags: ["Test", "Automation", "Jest"],
          },
        ]
          .map(
            (j) => `
          <div class="card">
            <h4 style="margin-bottom:.25rem;">${j.title}</h4>
            <div style="color:#607D8B; margin-bottom:.5rem;">${j.company} • ${
              j.loc
            } • ${j.type}</div>
            <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:.75rem;">
              ${j.tags
                .map(
                  (t) =>
                    `<span style="font-size:.85rem; padding:.25rem .5rem; border:1px solid #e0e6ea; border-radius:999px; color:#607D8B;">${t}</span>`
                )
                .join("")}
            </div>
            <div style="display:flex; gap:.5rem;">
              <button class="btn btn-outline">Lưu</button>
              <button class="btn btn-primary">Ứng tuyển</button>
            </div>
          </div>
        `
          )
          .join("")}
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
