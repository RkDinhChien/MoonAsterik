// js/pages/post-job.js
(function () {
  function input(id, label, type="text", placeholder=""){
    return `
      <label class="field">
        <div class="label">${label}</div>
        <input id="${id}" type="${type}" placeholder="${placeholder}"/>
      </label>`;
  }

  async function render(container){
    container.innerHTML = `
      <div class="card" style="padding:1rem;max-width:720px;margin:0 auto;">
        <h2>Post a Job</h2>
        ${input("pj-title","Title")}
        ${input("pj-city","City")}
        ${input("pj-level","Experience Level (Intern/Junior/Mid/Senior/Lead)")}
        ${input("pj-tags","Tags (comma separated)","text","React, Node.js")}
        <div class="grid" style="grid-template-columns:1fr 1fr; gap:.5rem;">
          ${input("pj-smin","Salary Min (VND)","number","15000000")}
          ${input("pj-smax","Salary Max (VND)","number","30000000")}
        </div>
        <label class="field">
          <div class="label">Summary</div>
          <textarea id="pj-summary" rows="4" placeholder="Short description"></textarea>
        </label>
        <div class="flex" style="gap:.5rem;margin-top:.5rem;">
          <button class="btn btn-primary" id="pj-submit">Publish</button>
          <button class="btn btn-outline" onclick="history.back()">Cancel</button>
        </div>
        <p class="muted" style="margin-top:.5rem;">* Demo: ghi nhận trên client và chuyển sang Manage Listings</p>
      </div>
    `;

    container.querySelector("#pj-submit").onclick = () => {
      // Ở bản thật: gọi API POST; đây demo điều hướng
      alert("Job created (demo). Redirect to Manage Listings.");
      app.navigate("manage-listings");
    };
  }

  window.Pages = window.Pages || {};
  window.Pages["post-job"] = render;
})();
