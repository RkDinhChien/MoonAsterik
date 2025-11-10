// js/pages/job-detail.js
(function () {
  async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("Fetch "+p); return r.json(); }
  function getParam(params,k,d=""){ return (params && params[k]) || d; }

  function kv(label, val){
    return `<div style="display:flex;gap:.5rem;"><strong style="min-width:120px">${label}</strong><span>${val||"-"}</span></div>`;
  }

  async function render(container, params={}){
    const id = Number(getParam(params,"id"));
    const [jobs, companies] = await Promise.all([
      loadJSON("assets/data/jobs.json"),
      loadJSON("assets/data/companies.json"),
    ]);
    const job = jobs.find(j=>j.id===id);
    if(!job){ container.innerHTML = `<p>Job not found.</p>`; return; }
    const company = companies.find(c=>c.id===job.companyId);

    container.innerHTML = `
      <div class="card" style="padding:1rem;">
        <button class="btn btn-outline" onclick="history.back()">← Back</button>
        <h2 style="margin:.5rem 0">${job.title}</h2>
        <p class="muted">${job.companyName} • ${job.location.city} • ${job.experienceLevel}</p>
        <div style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap;">
          ${(job.tags||[]).map(t=>`<span class="badge">${t}</span>`).join("")}
        </div>
        <hr style="margin:1rem 0"/>
        ${kv("Type", job.type)}
        ${kv("Remote", job.remotePolicy)}
        ${kv("Salary", job.salary ? `${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency}/mo` : "Negotiable")}
        ${kv("Posted", job.postedAt)}
        ${kv("Expires", job.expiresAt)}
        <hr style="margin:1rem 0"/>
        <h3>Description</h3>
        <p>${(job.description && job.description.summary) || ""}</p>
        <h4>Responsibilities</h4>
        <ul>${(job.description?.responsibilities||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
        <h4>Requirements</h4>
        <ul>${(job.description?.requirements||[]).map(x=>`<li>${x}</li>`).join("")}</ul>
        <h4>Benefits</h4>
        <ul>${(job.description?.benefits||[]).map(x=>`<li>${x}</li>`).join("")}</ul>

        <div style="margin-top:1rem;display:flex;gap:.5rem;">
          <a class="btn" href="${job.apply?.applyLink||'#'}" target="_blank">Apply</a>
          <button class="btn btn-outline" onclick="alert('Saved!')">Save</button>
        </div>
      </div>

      <div class="card" style="padding:1rem;margin-top:1rem;">
        <h3>Company</h3>
        <p><strong>${company?.name||job.companyName}</strong></p>
        <p>${company?.about||""}</p>
  <a class="btn btn-ghost" href="#/company-detail&id=${job.companyId}">View company</a>
      </div>
    `;
  }

  window.Pages = window.Pages || {};
  window.Pages["job-detail"] = render;
})();
