// js/pages/applicants.js
(function () {
  async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("Fetch "+p); return r.json(); }
  function getParam(params,k,d=""){ return (params && params[k]) || d; }
  function user(){ return (window.AppState && window.AppState.state && window.AppState.state.user) || {companyId:""}; }

  function row(a){
    return `
      <tr>
        <td>${a.applicationId}</td>
        <td>${a.studentId}</td>
        <td>${a.jobId}</td>
        <td>${a.status}</td>
        <td><a href="${a.cvUrl}" target="_blank">CV</a></td>
        <td>${new Date(a.submittedAt).toLocaleString()}</td>
      </tr>
    `;
  }

  async function render(container, params={}){
    const me = user();
    const jobId = Number(getParam(params,"jobId", 0));
    const [apps] = await Promise.all([loadJSON("assets/data/applications.json")]);

    const filtered = apps.filter(a => jobId ? a.jobId===jobId : a.companyId===me.companyId);

    container.innerHTML = `
      <div class="flex-between" style="margin-bottom:1rem;">
        <h2>Applicants ${jobId?`for Job #${jobId}`:""}</h2>
        <div class="flex" style="gap:.5rem;">
          <button class="btn btn-outline" onclick="history.back()">Back</button>
        </div>
      </div>
      <div class="card" style="padding:1rem;">
        <div style="overflow:auto;">
          <table class="table">
            <thead>
              <tr><th>ID</th><th>Student</th><th>Job</th><th>Status</th><th>CV</th><th>Submitted</th></tr>
            </thead>
            <tbody>${filtered.map(row).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.Pages = window.Pages || {};
  window.Pages["applicants"] = render;
})();
