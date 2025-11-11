// js/pages/company-list.js
(function () {
  async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("Fetch "+p); return r.json(); }
  function getParam(params,k,d=""){ return (params && params[k]) || d; }

  function renderFilters(el, params, companies){
    const cities = [...new Set(companies.flatMap(c=>c.locations||[]))].sort();
    el.innerHTML = `
      <div class="card" style="padding:1rem;margin-bottom:1rem;">
        <div class="grid" style="grid-template-columns: 1fr 200px 100px; gap:.5rem;">
          <input id="cl-q" placeholder="Company or tech..." value="${getParam(params,"q","")}"/>
          <select id="cl-city"><option value="">All cities</option>${cities.map(c=>`<option ${getParam(params,"city")==c?"selected":""}>${c}</option>`).join("")}</select>
          <button id="cl-apply" class="btn">Filter</button>
        </div>
      </div>
    `;
    el.querySelector("#cl-apply").onclick = ()=>{
      const q = el.querySelector("#cl-q").value.trim();
      const city = el.querySelector("#cl-city").value;
      const qs = new URLSearchParams({ q, city }).toString();
      app.navigate("company-list&"+qs);
    };
  }

  function card(c){
    return `
      <div class="card" style="padding:1rem;border:1px solid #eee;border-radius:10px;">
        <h3 style="margin:.25rem 0">${c.name}</h3>
        <p class="muted">${(c.locations||[]).join(" • ")}</p>
        <div style="margin:.5rem 0;display:flex;gap:.5rem;flex-wrap:wrap;">
          ${(c.techStack||[]).slice(0,8).map(t=>`<span class="badge">${t}</span>`).join("")}
        </div>
        <div style="display:flex;gap:.5rem;">
          <button class="btn btn-outline" onclick="app.navigate('company-detail&id=${c.id}')">View</button>
          <button class="btn" onclick="app.navigate('job-listings&q=${encodeURIComponent(c.name)}')">Open Jobs</button>
        </div>
      </div>
    `;
  }

  async function render(container, params={}){
    const companies = await loadJSON("assets/data/companies.json");
    container.innerHTML = `<h2>Companies</h2>`;
    const filters = document.createElement("div");
    container.appendChild(filters);
    renderFilters(filters, params, companies);

    const q = (getParam(params,"q")||"").toLowerCase();
    const city = getParam(params,"city");

    const filtered = companies.filter(c=>{
      const okQ = !q || c.name.toLowerCase().includes(q) || (c.techStack||[]).some(t=>(t||"").toLowerCase().includes(q));
      const okC = !city || (c.locations||[]).includes(city);
      return okQ && okC;
    });

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(320px, 1fr))";
    grid.style.gap = "1rem";
    grid.innerHTML = filtered.map(card).join("");
    container.appendChild(grid);
  }

  window.Pages = window.Pages || {};
  window.Pages["company-list"] = render;
})();
