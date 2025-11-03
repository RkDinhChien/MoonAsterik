// ===========================
// Student Profile Setup Page
// ===========================

const renderStudentProfileSetup = () => {
  const user = window.AppState.getUserInfo?.() || {};
  return `
  <div class="container" style="padding: 1.5rem 1rem 2rem 1rem; max-width: 1200px;">
    <!-- Header -->
    <div class="card page-header">
      <div class="avatar-lg">
        <img id="avatar-preview" src="${user.avatar || 'https://api.dicebear.com/8.x/thumbs/svg?seed=Moon'}" alt="Avatar"/>
        <label for="avatar-upload" title="Upload" class="avatar-action">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="color:#607D8B"><path d="M5 20h14a2 2 0 0 0 2-2v-7h-4l-2-3H9L7 11H3v7a2 2 0 0 0 2 2zM5 7h4V5h6v2h4V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2z"/></svg>
        </label>
        <input id="avatar-upload" type="file" accept="image/*" style="display:none" onchange="app.handleAvatarChange(event)" />
      </div>
      <div style="flex:1">
        <h2>${user.fullName || 'Tên của bạn'}</h2>
        <div class="subtitle">
          <div>ID <strong style="margin-left:.4rem">${user.studentId || '—'}</strong></div>
          <div>Tốt nghiệp <strong style="margin-left:.4rem">${user.graduation || '—'}</strong></div>
          <div>Mạng xã hội <a href="${user.github || '#'}" target="_blank" rel="noopener" style="color:#00BCD4">${user.github ? user.github : 'Thêm GitHub'}</a></div>
          ${user.jlpt ? `<span class="chip">JLPT ${user.jlpt}</span>` : ''}
        </div>
      </div>
  <button class="btn btn-outline btn-sm" onclick="Router.navigate('dashboard')">Bỏ qua</button>
    </div>

    <div class="page-grid" style="margin-top:1.25rem;">
      <!-- Left: Form -->
      <div class="card">
        
        <div class="section-header"><h3 style="margin:0;">Thông tin cơ bản</h3></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div class="form-group input-with-icon">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/></svg>
            <input id="pf-fullname" class="form-input" type="text" placeholder="Họ và tên" value="${user.fullName || ''}" />
          </div>
          
          <div class="form-group input-with-icon">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-4l-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/></svg>
            <input id="pf-student-id" class="form-input" type="text" placeholder="Mã sinh viên" value="${user.studentId || ''}" />
          </div>
          <div class="form-group input-with-icon">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11h10M7 15h7M3 4h18v16H3z"/></svg>
            <input id="pf-graduation" class="form-input" type="month" placeholder="Tháng tốt nghiệp" value="${user.graduation || ''}" />
          </div>
          <div class="form-group input-with-icon">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/></svg>
            <select id="pf-gender" class="form-input" style="padding-right:2.25rem;">
              <option value="">Giới tính</option>
              <option ${user.gender==='male'?'selected':''} value="male">Nam</option>
              <option ${user.gender==='female'?'selected':''} value="female">Nữ</option>
              <option ${user.gender==='other'?'selected':''} value="other">Khác</option>
            </select>
          </div>
          <div class="form-group input-with-icon">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01z"/></svg>
            <input id="pf-phone" class="form-input" type="tel" placeholder="Số điện thoại" value="${user.phone || ''}" />
          </div>
          <div class="form-group input-with-icon" style="grid-column: span 2;">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v1l-10 7L2 7V6a2 2 0 0 1 2-2z"/></svg>
            <input id="pf-email" class="form-input" type="email" placeholder="Email" value="${user.email || ''}" />
          </div>
          <div class="form-group input-with-icon" style="grid-column: span 2;">
            <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/></svg>
            <input id="pf-country" class="form-input" type="text" placeholder="Quốc gia" value="${user.country || ''}" />
          </div>
        </div>

  <div class="section-header" style="margin-top:1.25rem;"><h3 style="margin:0;">Liên kết</h3></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div class="form-group input-with-icon"><svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 0 0 0 6h3v2h-3a5 5 0 0 1-5-5zm6.2 1h3a3 3 0 0 0 0-6h-3v2h3a1 1 0 0 1 0 2h-3v2z"/></svg><input id="pf-github" class="form-input" type="url" placeholder="GitHub URL" value="${user.github || ''}" /></div>
          <div class="form-group input-with-icon"><svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg><input id="pf-viblo" class="form-input" type="url" placeholder="Viblo URL" value="${user.viblo || ''}" /></div>
          <div class="form-group input-with-icon"><svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H7.9v-2.9h2.6V9.5c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.4.1v2.7h-1.7c-1.3 0-1.6.8-1.6 1.6v2.1h3.1l-.5 2.9h-2.6v7C18.3 21.1 22 17 22 12z"/></svg><input id="pf-facebook" class="form-input" type="url" placeholder="Facebook URL" value="${user.facebook || ''}" /></div>
          <div class="form-group input-with-icon"><svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92V7.08A2.09 2.09 0 0 0 19.91 5H4.09A2.09 2.09 0 0 0 2 7.08v9.84A2.09 2.09 0 0 0 4.09 19h15.82A2.09 2.09 0 0 0 22 16.92zM7 8h10v2H7zm0 4h10v2H7z"/></svg><input id="pf-slack" class="form-input" type="url" placeholder="Slack URL" value="${user.slack || ''}" /></div>
        </div>

        <div style="display:flex; gap:.75rem; justify-content:flex-end; margin-top:1.5rem;">
          <button class="btn btn-outline" onclick="Router.navigate('dashboard')">Hủy</button>
          <button class="btn btn-primary" onclick="app.saveStudentProfile()">Lưu và tiếp tục</button>
        </div>
      </div>

      <!-- Education -->
      <div class="card">
        <div class="section-header">
          <h3 style="margin:0;">Học vấn</h3>
          <button class="btn btn-outline btn-sm" onclick="app.resetEdu()">Xóa/Reset</button>
        </div>
        <div class="list-rows">
          <div class="row grid-2">
            <div class="form-group input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v6H3zM3 12h18v8H3z"/></svg>
              <input id="pf-edu-university" class="form-input" type="text" placeholder="Đại học" value="${user.university || ''}" />
            </div>
            <div class="form-group input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v4H4zM4 10h10v4H4z"/></svg>
              <input id="pf-edu-faculty" class="form-input" type="text" placeholder="Khoa" value="${user.faculty || ''}" />
            </div>
          </div>
          <div class="row grid-3">
            <div class="form-group input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-4l-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/></svg>
              <input id="pf-edu-code" class="form-input" type="text" placeholder="Mã số sinh viên" value="${user.studentCode || user.studentId || ''}" />
            </div>
            <div class="form-group input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11h10M7 15h7M3 4h18v16H3z"/></svg>
              <input id="pf-edu-graduation" class="form-input" type="month" placeholder="Dự kiến tốt nghiệp" value="${user.graduation || ''}" />
            </div>
            <div class="form-group input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
              <input id="pf-edu-gpa" class="form-input" type="text" placeholder="GPA" value="${user.gpa || ''}" />
            </div>
          </div>
        </div>
      </div>

      <!-- Certificates -->
      <div class="card">
        <div class="section-header">
          <h3 style="margin:0;">Chứng chỉ</h3>
          <button class="btn btn-primary btn-sm" onclick="app.addCertRow()">Thêm chứng chỉ</button>
        </div>
        <div id="cert-list" class="list-rows">
          ${(user.certificates || []).map(c=>`
            <div class="row grid-cert row-cert">
              <input class="form-input cert-name" placeholder="Tên chứng chỉ (vd: JLPT, IELTS)" value="${c.name||''}" />
              <input class="form-input cert-value" placeholder="Giá trị (vd: N4, 6.0)" value="${c.value||''}" />
              <input class="form-input cert-date" type="date" value="${(c.date||'').replaceAll('/','-')}" />
              <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Awards -->
      <div class="card">
        <div class="section-header">
          <h3 style="margin:0;">Giải thưởng</h3>
          <button class="btn btn-primary btn-sm" onclick="app.addAwardRow()">Thêm giải thưởng</button>
        </div>
        <div id="award-list" class="list-rows">
          ${(user.awards || []).map(a=>`
            <div class="row grid-award row-award">
              <input class="form-input award-title" placeholder="Tên giải thưởng" value="${a.title||''}" />
              <input class="form-input award-date" type="date" value="${(a.date||'').replaceAll('/','-')}" />
              <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Highlights -->
      <div class="card">
        <div class="section-header">
          <h3 style="margin:0;">Điểm nổi bật</h3>
          <button class="btn btn-primary btn-sm" onclick="app.addHighlightRow()">Thêm dòng</button>
        </div>
        <div id="highlight-list" class="list-rows">
          ${(user.highlights || []).map(h=>`
            <div class="row row-highlight">
              <input class="form-input highlight-text" placeholder="Mô tả ngắn điểm mạnh / thành tích" value="${h||''}" />
              <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Skills -->
      <div class="card">
        <div class="section-header">
          <h3 style="margin:0;">Kỹ năng chuyên môn</h3>
          <button class="btn btn-primary btn-sm" onclick="app.addSkillRow()">Thêm kỹ năng</button>
        </div>
        <div id="skill-list" class="list-rows">
          ${(user.skills || []).map(s=>`
            <div class="row grid-skill row-skill">
              <input class="form-input skill-name" placeholder="Tên kỹ năng (vd: React, Node.js)" value="${s.name||''}" />
              <input class="form-input skill-months" type="number" min="0" placeholder="Số tháng kinh nghiệm" value="${s.months||''}" />
              <button class="btn btn-outline btn-icon" onclick="this.parentElement.remove()">Xóa</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Section Nav -->
      <aside class="card" style="height: fit-content;">
        <h4 style="margin-bottom:.75rem;">Hồ sơ</h4>
        <ul style="display:flex; flex-direction:column; gap:.5rem; color:#546E7A;">
          <li>Thông tin cơ bản</li>
          <li>Học vấn</li>
          <li>Chứng chỉ</li>
          <li>Giải thưởng</li>
          <li>Điểm nổi bật</li>
          <li style="margin-top:.75rem; font-weight:700; color:#263238;">Kỹ năng</li>
          <li>Kỹ năng chuyên môn</li>
          <li>Sản phẩm/Portfolio</li>
          <li>Kinh nghiệm thực tập</li>
          <li style="margin-top:.75rem; font-weight:700; color:#263238;">Giới thiệu bản thân</li>
          <li>Phỏng vấn / Slide / Video</li>
        </ul>
      </aside>
    </div>
  </div>
  `;
};

window.PageTemplates = window.PageTemplates || {};
window.PageTemplates["profile-setup"] = renderStudentProfileSetup;
