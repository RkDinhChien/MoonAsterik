// js/pages/manage-listings.js
(function () {
  async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("Fetch "+p); return r.json(); }
  function user(){ return (window.AppState && window.AppState.state && window.AppState.state.user) || {companyId:""}; }

  async function render(container){
    const me = user();
    const [jobs] = await Promise.all([loadJSON("assets/data/jobs.json")]);
    const myJobs = jobs.filter(j=>j.companyId===me.companyId);

    container.innerHTML = `
      <div class="flex-between" style="margin-bottom:1rem;">
        <h2>Manage Listings</h2>
        <button class="btn btn-primary" onclick="app.navigate('post-job')">Post New Job</button>
      </div>
      <div class="col" style="gap:1rem;">
        ${myJobs.map(j=>`
          <div class="card" style="padding:1rem;border:1px solid #eee;">
            <div class="flex-between" style="gap:1rem;flex-wrap:wrap;">
              <div>
                <h3 style="margin:.25rem 0">${j.title}</h3>
                <p class="muted">${j.location.city} • ${j.experienceLevel} • ${j.status}</p>
              </div>
              <div class="flex" style="gap:.5rem;">
                <button class="btn btn-outline" onclick="app.navigate('applicants&jobId=${j.id}')">Applicants</button>
                <button class="btn btn-outline" onclick="alert('Edit form TBD')">Edit</button>
                <button class="btn btn-ghost" onclick="alert('Archive TBD')">Archive</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  window.Pages = window.Pages || {};
  window.Pages["manage-listings"] = render;
})();
