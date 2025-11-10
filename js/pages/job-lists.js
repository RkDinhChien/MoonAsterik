// js/pages/job-listings.js
(function () {
  async function loadJSON(p) {
    const r = await fetch(p);
    if (!r.ok) throw new Error("Fetch failed " + p);
    return r.json();
  }
  const NV = (x) => (x == null ? "" : String(x));
  const getParam = (params, k, d = "") => (params && params[k]) || d;

  function paginate(arr, page = 1, per = 20) {
    const total = arr.length;
    const pages = Math.max(1, Math.ceil(total / per));
    const p = Math.min(Math.max(1, page), pages);
    const start = (p - 1) * per;
    return { list: arr.slice(start, start + per), total, pages, page: p, per };
  }

  // ------- CARD TEMPLATE -------
  function tplJobCard(j, idx = 0) {
    const salary =
      j.salary && j.salary.min
        ? `${j.salary.min.toLocaleString()} - ${j.salary.max.toLocaleString()} ${j.salary.currency}/mo`
        : "Negotiable";
    return `
      <div class="card fade-in" style="padding:1rem;border:1px solid #eee;border-radius:10px;animation-delay:${Math.min(idx,12) * 60}ms;">
        <div class="flex" style="gap:.75rem;align-items:center;">
          <div style="width:48px;height:48px;border-radius:10px;background:#f4f6f8;"></div>
          <div>
            <h3 style="margin:.25rem 0;font-size:1.05rem">${NV(j.title)}</h3>
            <p class="muted" style="margin:.1rem 0">${NV(j.companyName)} • ${NV(j.location?.city)}</p>
            <p class="muted" style="margin:.1rem 0">${salary}</p>
          </div>
        </div>
        <div style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap;">
          ${(j.tags || []).slice(0, 6).map(t => `<span class="badge">${t}</span>`).join("")}
        </div>
        <div style="margin-top:.75rem;display:flex;gap:.5rem;">
          <button class="btn btn-outline" data-action="view" data-id="${j.id}">View</button>
          <button class="btn" data-action="apply" data-id="${j.id}">Apply</button>
        </div>
      </div>
    `;
  }

  // ------- FILTER BAR -------
  function renderFilters(container, params, jobs) {
    const unique = (arr) => [...new Set(arr)];
    const cities = unique(jobs.map(j => j.location?.city).filter(Boolean)).sort();
    const levels = unique(jobs.map(j => j.experienceLevel).filter(Boolean)).sort();

    container.innerHTML = `
      <div class="card" style="padding:1rem;margin-bottom:1rem;">
        <div class="filters" style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;">
          <input id="jl-q" placeholder="Search title, company or tag..." value="${getParam(params,"q","")}"
                 style="flex:1;min-width:180px;padding:.6rem;border:1px solid #cfd8dc;border-radius:8px;"/>
          <select id="jl-city" style="width:160px;padding:.6rem;border:1px solid #cfd8dc;border-radius:8px;">
            <option value="">All cities</option>
            ${cities.map(c=>`<option ${getParam(params,"city")==c?"selected":""}>${c}</option>`).join("")}
          </select>
          <select id="jl-level" style="width:160px;padding:.6rem;border:1px solid #cfd8dc;border-radius:8px;">
            <option value="">All levels</option>
            ${levels.map(l=>`<option ${getParam(params,"level")==l?"selected":""}>${l}</option>`).join("")}
          </select>
          <button id="jl-apply" class="btn" style="min-width:110px;padding:.6rem;">Filter</button>
        </div>
        <div id="jl-count" class="muted" style="margin-top:.5rem;"></div>
      </div>
    `;

    const navigateWith = (extra = {}) => {
      const q = container.querySelector("#jl-q").value.trim();
      const city = container.querySelector("#jl-city").value;
      const level = container.querySelector("#jl-level").value;
      const query = new URLSearchParams({ q, city, level, ...extra }).toString();
      if (window.Router) Router.navigate("job-listings&" + query);
      else if (window.app) app.navigate("job-listings&" + query);
    };

    // nút Filter
    container.querySelector("#jl-apply").onclick = () => navigateWith({ page: 1 });

    // Enter để apply
    container.querySelector("#jl-q").addEventListener("keydown", (e) => {
      if (e.key === "Enter") navigateWith({ page: 1 });
    });

    // debounce 250ms
    let to;
    container.querySelector("#jl-q").addEventListener("input", () => {
      clearTimeout(to);
      to = setTimeout(() => navigateWith({ page: 1 }), 250);
    });
  }

  function applyFilter(all, params) {
    const q = (getParam(params, "q") || "").toLowerCase();
    const city = getParam(params, "city");
    const level = getParam(params, "level");
    let out = all;
    if (q) {
      out = out.filter(j =>
        (NV(j.title)).toLowerCase().includes(q) ||
        (NV(j.companyName)).toLowerCase().includes(q) ||
        (j.tags||[]).some(t => NV(t).toLowerCase().includes(q))
      );
    }
    if (city) out = out.filter(j => NV(j.location?.city) === city);
    if (level) out = out.filter(j => NV(j.experienceLevel) === level);
    return out;
  }

  function renderPager(container, params, pages, cur) {
    const wrap = document.createElement("div");
    wrap.style.margin = "1rem 0";
    wrap.style.display = "flex";
    wrap.style.gap = ".4rem";
    wrap.style.overflowX = "auto";
    wrap.style.paddingBottom = "6px";
    const btn = (label, targetPage, disabled=false, primary=false) => {
      const cls = ["btn"];
      if (primary) cls.push("btn-primary");
      return `<button class="${cls.join(" ")}" data-page="${targetPage}" ${disabled?"disabled":""} style="display:inline-block;">${label}</button>`;
    };
    const go = (p) => {
      const next = Math.min(Math.max(1, p), pages);
      const query = new URLSearchParams({ ...params, page: next }).toString();
      if (window.Router) Router.navigate("job-listings&" + query);
      else if (window.app) app.navigate("job-listings&" + query);
    };

    // Prev
    wrap.innerHTML += btn("Previous", cur - 1, cur <= 1, false);

    // window 3 số quanh current
    const from = Math.max(1, cur - 1);
    const to = Math.min(pages, cur + 1);
    for (let p = from; p <= to; p++) {
      wrap.innerHTML += btn(String(p), p, false, p === cur);
    }

    // Next
    wrap.innerHTML += btn("Next", cur + 1, cur >= pages, false);

    container.appendChild(wrap);

    // delegate click
    wrap.addEventListener("click", (e) => {
      const t = e.target.closest("button[data-page]");
      if (!t || t.disabled) return;
      const target = Number(t.getAttribute("data-page"));
      go(target);
    });
  }

  async function render(container, params = {}) {
    const jobs = await loadJSON("assets/data/jobs.json");

    // header
    container.innerHTML = `<h2>Job Listings</h2>`;

    // filters
    const filters = document.createElement("div");
    container.appendChild(filters);
    renderFilters(filters, params, jobs);

    // data
    const filtered = applyFilter(jobs, params);
    const page = Number(getParam(params, "page", 1)) || 1;
    const { list, pages, page: cur, total } = (() => {
      const p = paginate(filtered, page, 20);
      return { ...p, total: filtered.length };
    })();

    // update count
    const countEl = filters.querySelector("#jl-count");
    if (countEl) countEl.textContent = `${total} kết quả`;

    // grid
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(320px, 1fr))";
    grid.style.gap = "1rem";
    grid.innerHTML = list.map((t, i) => tplJobCard(t, i)).join("");
    container.appendChild(grid);

    // card actions (view/apply)
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      const action = btn.getAttribute("data-action");
      if (action === "view") {
        if (window.Router) Router.navigate(`job-detail&id=${id}`);
        else if (window.app) app.navigate(`job-detail&id=${id}`);
      } else if (action === "apply") {
        // ở demo, mở detail để apply
        if (window.Router) Router.navigate(`job-detail&id=${id}`);
        else if (window.app) app.navigate(`job-detail&id=${id}`);
      }
    });

    // pager
    renderPager(container, params, pages, cur);

    // accessibility: scroll to top on page change
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.Pages = window.Pages || {};
  window.Pages["job-listings"] = render;
})();
