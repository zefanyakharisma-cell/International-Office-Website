// ---- ADMIN DASHBOARD ----
// Logic for the dedicated #admin page (markup in JS/pages/admin-dashboard.js).
// Reuses the existing CRUD modals/handlers defined in admin.js and the Supabase
// client (window._supabase) initialised in main.js.

let adminDashActiveTab = 'overview';

const ADMIN_TAG_LABELS = {
  '#inboundstudents': 'Inbound Students',
  '#outboundstudents': 'Outbound Students',
  '#partnership': 'Partnership',
  '#general': 'General',
};

function adminDashEscape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---- ENTRY POINT ----
function openAdminDashboard() {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }
  navigateTo('admin');
}

// ---- TAB SWITCHING ----
function adminDashSwitchTab(tab) {
  adminDashActiveTab = tab;
  document.querySelectorAll('.admin-dash-panel').forEach(p => {
    p.classList.toggle('hidden', p.getAttribute('data-admin-panel') !== tab);
  });
  document.querySelectorAll('.admin-dash-tab').forEach(b => {
    const active = b.getAttribute('data-admin-tab') === tab;
    b.classList.toggle('bg-pcu-blue', active);
    b.classList.toggle('text-white', active);
    b.classList.toggle('text-gray-600', !active);
    b.classList.toggle('shadow-sm', active);
  });
  renderAdminDashboardTab(tab);
  setTimeout(() => lucide.createIcons(), 30);
}

// ---- RENDER A SINGLE TAB ----
async function renderAdminDashboardTab(tab) {
  if (tab === 'overview') return renderAdminDashOverview();
  if (tab === 'news')     return renderAdminDashNews();
  if (tab === 'ose')      return renderAdminDashOse();
  if (tab === 'interns')  return renderAdminDashInterns();
  if (tab === 'home')     return loadAdminHomeForm();
}

// Re-render whatever tab is currently visible (called by data-change hooks).
function adminDashRefresh() {
  const page = document.getElementById('page-admin');
  if (!page || !page.classList.contains('active')) return;
  renderAdminDashboardTab(adminDashActiveTab);
}

// Called by navigateTo when the #admin page becomes active.
function onAdminDashboardOpened() {
  if (!isAdminLoggedIn()) { navigateTo('home'); openAdminLoginModal(); return; }
  adminDashSwitchTab(adminDashActiveTab || 'overview');
}

// ---- OVERVIEW ----
async function renderAdminDashOverview() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const countRows = async (table) => {
    try {
      const { count } = await window._supabase.from(table).select('*', { count: 'exact', head: true });
      return count ?? 0;
    } catch { return '—'; }
  };
  set('admin-stat-news', await countRows('articles'));
  set('admin-stat-ose', await countRows('ose_programs'));
  set('admin-stat-interns', await countRows('internship_opportunities'));
}

// ---- NEWS LIST ----
async function renderAdminDashNews() {
  const container = document.getElementById('admin-dash-news-list');
  if (!container) return;
  container.innerHTML = adminDashLoading();

  let list = [];
  try {
    const { data } = await window._supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) list = data.map(normalizeArticle);
  } catch {}

  if (!list.length) {
    container.innerHTML = adminDashEmpty('No articles yet. Click “Add Article” to publish one.');
    return;
  }

  container.innerHTML = list.map(a => adminDashRow({
    title: adminDashEscape(a.title),
    badge: ADMIN_TAG_LABELS[a.tag] || a.tag || '',
    meta: `${adminDashEscape(a.date || '')}${a.author ? ' · ' + adminDashEscape(a.author) : ''} · ${a.visits || 0} views`,
    sub: adminDashEscape(a.excerpt || ''),
    onEdit: `openEditArticleModal('${a.id}')`,
    onDelete: `confirmDeleteArticle('${a.id}')`,
    onOpen: `navigateTo('${a.id}')`,
  })).join('');
  lucide.createIcons();
}

// ---- OSE LIST ----
async function renderAdminDashOse() {
  const container = document.getElementById('admin-dash-ose-list');
  if (!container) return;
  container.innerHTML = adminDashLoading();

  let list = [];
  try {
    const { data } = await window._supabase.from('ose_programs').select('*').order('name');
    if (data) list = data.map(normalizeOseProgram);
  } catch {}

  if (!list.length) {
    container.innerHTML = adminDashEmpty('No university programs yet. Click “Add University” to create one.');
    return;
  }

  container.innerHTML = list.map(e => adminDashRow({
    title: adminDashEscape(e.name),
    badge: e.isCustom ? 'Custom' : (e.region || ''),
    meta: `${adminDashEscape(e.country || '')}${e.region ? ' · ' + adminDashEscape(e.region) : ''}`,
    sub: (e.programs || []).map(adminDashEscape).join(' · '),
    onEdit: `openOseEditForm(${adminDashEscape(JSON.stringify(e))})`,
    onDelete: `confirmDeleteOseProgram('${e.id}')`,
  })).join('');
  lucide.createIcons();
}

// ---- INTERNSHIPS LIST ----
async function renderAdminDashInterns() {
  const container = document.getElementById('admin-dash-interns-list');
  if (!container) return;
  container.innerHTML = adminDashLoading();

  let list = [];
  try {
    const { data } = await window._supabase.from('internship_opportunities').select('*').order('created_at', { ascending: false });
    if (data) list = data.map(normalizeInternship);
  } catch {}

  if (!list.length) {
    container.innerHTML = adminDashEmpty('No internship opportunities yet. Click “Add Opportunity” to create one.');
    return;
  }

  container.innerHTML = list.map(o => adminDashRow({
    title: adminDashEscape(o.position),
    badge: adminDashEscape(o.company),
    meta: o.link ? adminDashEscape(o.link) : 'No link',
    onEdit: `openInternshipOpportunityModal('${o.id}')`,
    onDelete: `confirmDeleteInternshipOpportunity('${o.id}')`,
  })).join('');
  lucide.createIcons();
}

// ---- SHARED ROW / STATE MARKUP ----
function adminDashLoading() {
  return '<p class="text-gray-400 text-sm text-center py-8">Loading…</p>';
}
function adminDashEmpty(msg) {
  return `<div class="bg-white rounded-3xl border border-dashed border-gray-200 p-10 text-center text-gray-400 text-sm">${msg}</div>`;
}

function adminDashRow({ title, badge, meta, sub, onEdit, onDelete, onOpen }) {
  const openAttr = onOpen ? `onclick="${onOpen}"` : '';
  const titleCls = onOpen ? 'cursor-pointer hover:text-pcu-blue' : '';
  return `
    <div class="flex items-start justify-between gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="font-semibold text-gray-800 text-sm ${titleCls}" ${openAttr}>${title}</p>
          ${badge ? `<span class="px-2 py-0.5 bg-pcu-light text-pcu-blue text-xs rounded-full font-medium">${badge}</span>` : ''}
        </div>
        ${meta ? `<p class="text-xs text-gray-400 mt-1 truncate">${meta}</p>` : ''}
        ${sub ? `<p class="text-xs text-gray-500 mt-1 line-clamp-2">${sub}</p>` : ''}
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button onclick="${onEdit}" class="p-2 rounded-xl bg-pcu-blue/10 text-pcu-blue hover:bg-pcu-blue/20 transition" title="Edit">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
        <button onclick="${onDelete}" class="p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition" title="Delete">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>`;
}

// ---- HOME CONTENT ----
function adminDashCurrentConfig() {
  return Object.assign({}, (typeof defaultConfig !== 'undefined' ? defaultConfig : {}), window.siteConfig || {});
}

function loadAdminHomeForm() {
  const config = adminDashCurrentConfig();
  document.querySelectorAll('#admin-dash-home-form [data-home-key]').forEach(input => {
    const key = input.getAttribute('data-home-key');
    if (config[key] != null) input.value = config[key];
  });
}

async function saveAdminHomeContent(e) {
  e.preventDefault();
  if (!isAdminLoggedIn()) return;

  const form = document.getElementById('admin-dash-home-form');
  const btn = form.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;

  const config = adminDashCurrentConfig();
  form.querySelectorAll('[data-home-key]').forEach(input => {
    config[input.getAttribute('data-home-key')] = input.value;
  });

  try {
    const { error } = await window._supabase
      .from('site_config')
      .upsert({ id: 1, config, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if (error) throw new Error(error.message);

    window.siteConfig = config;
    if (typeof applyConfig === 'function') applyConfig(config);
    showAdminToast('Home content saved!');
  } catch (err) {
    alert(`Could not save: ${err.message}`);
  } finally {
    if (btn) btn.disabled = false;
  }
}
