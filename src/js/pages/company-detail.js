// js/pages/company-detail.js
(function () {
  async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("Fetch "+p); return r.json(); }
  function getParam(params,k,d=""){ return (params && params[k]) || d; }

  async function render(container, params={}){
    const id = getParam(params,"id");
    const [companies, jobs] = await Promise.all([
      loadJSON("assets/data/companies.json"),
      loadJSON("assets/data/jobs.json"),
    ]);
    const c = companies.find(x=>x.id===id);
    if(!c){ container.innerHTML = `<p>Company not found.</p>`; return; }

    const openJobs = jobs.filter(j=>j.companyId===c.id && j.status==="published");

    container.innerHTML = `
      <div class="card" style="padding:1rem;">
        <button class="btn btn-outline" onclick="history.back()">← Back</button>
        <h2 style="margin:.5rem 0">${c.name}</h2>
        <p class="muted">${(c.locations||[]).join(" • ")} • Founded ${c.foundedYear} • Size ${c.size}</p>
        <p style="margin:.5rem 0">${c.about||""}</p>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem;">
          ${(c.techStack||[]).map(t=>`<span class="badge">${t}</span>`).join("")}
        </div>
        <div style="margin-top:1rem;display:flex;gap:.5rem;">
          <a class="btn btn-ghost" href="${c.website}" target="_blank">Website</a>
          <a class="btn btn-ghost" href="${c.socials?.linkedin||'#'}" target="_blank">LinkedIn</a>
        </div>
      </div>

      <div class="card" style="padding:1rem;margin-top:1rem;">
        <h3>Open Jobs (${openJobs.length})</h3>
        <div class="col" style="gap:1rem;margin-top:.75rem;">
          ${openJobs.map(j=>`
            <div class="card" style="padding:1rem;border:1px solid #eee;">
              <h4 style="margin:.25rem 0">${j.title}</h4>
              <p class="muted">${j.location.city} • ${j.experienceLevel}</p>
              <div style="margin:.5rem 0;display:flex;gap:.5rem;flex-wrap:wrap;">
                ${(j.tags||[]).slice(0,6).map(t=>`<span class="badge">${t}</span>`).join("")}
              </div>
              <button class="btn btn-outline" onclick="app.navigate('job-detail&id=${j.id}')">View</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  window.Pages = window.Pages || {};
  window.Pages["company-detail"] = render;
})();
