// ---- ADMIN SYSTEM ----
const API_BASE = 'https://international-office-website-production.up.railway.app';
const ADMIN_SESSION_KEY = 'pcu_admin_session';

const TAG_COLORS = {
  '#inboundstudents':  'from-pcu-blue to-pcu-sky',
  '#outboundstudents': 'from-teal-500 to-emerald-600',
  '#partnership':      'from-pcu-gold to-yellow-500',
  '#general':          'from-violet-500 to-purple-600'
};

// tracks which article is being edited (null = new article)
let editingArticleId = null;

// ---- SESSION ----
function adminGetSession() {
  try { return JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY)); } catch { return null; }
}

function isAdminLoggedIn() {
  return !!adminGetSession();
}

function authHeaders() {
  const s = adminGetSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${s ? s.token : ''}`
  };
}

async function adminLogin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) return false;
    const data = await res.json();
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      username, role: data.role, tag: data.tag, token: data.token
    }));
    return true;
  } catch { return false; }
}

function adminLogout() {
  const s = adminGetSession();
  if (s && s.token) {
    fetch(`${API_BASE}/api/admin/logout`, {
      method: 'POST',
      headers: authHeaders()
    }).catch(() => {});
  }
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  updateAdminUI();
  refreshNewsData();
}

// ---- LOGIN MODAL ----
function openAdminLoginModal() {
  document.getElementById('adminLoginModal').classList.remove('hidden');
  document.getElementById('adminLoginModal').classList.add('flex');
  document.getElementById('adminLoginError').style.display = 'none';
  document.getElementById('adminUsernameInput').value = '';
  document.getElementById('adminPasswordInput').value = '';
  setTimeout(() => document.getElementById('adminUsernameInput').focus(), 50);
}

function closeAdminLoginModal() {
  document.getElementById('adminLoginModal').classList.add('hidden');
  document.getElementById('adminLoginModal').classList.remove('flex');
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('adminUsernameInput').value.trim();
  const password = document.getElementById('adminPasswordInput').value;
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;
  const ok = await adminLogin(username, password);
  if (btn) btn.disabled = false;
  if (ok) {
    closeAdminLoginModal();
    updateAdminUI();
    await refreshNewsData();
  } else {
    document.getElementById('adminLoginError').style.display = 'block';
  }
}

// ---- IMAGE UPLOAD ----
function applyImageDataUrl(dataUrl) {
  document.getElementById('articleImageUrl').value = dataUrl;
  document.getElementById('imagePreview').src = dataUrl;
  document.getElementById('imagePreviewWrapper').classList.remove('hidden');
  document.getElementById('imageUploadLabel').classList.add('hidden');
}

function clearImageUpload() {
  document.getElementById('articleImageUrl').value = '';
  document.getElementById('articleImageFile').value = '';
  document.getElementById('imagePreview').src = '';
  document.getElementById('imagePreviewWrapper').classList.add('hidden');
  document.getElementById('imageUploadLabel').classList.remove('hidden');
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  readImageFile(file);
}

function readImageFile(file) {
  const MAX_WIDTH = 1200;
  const QUALITY   = 0.8;
  const objectUrl = URL.createObjectURL(file);
  const img = new Image();
  img.onload = function() {
    URL.revokeObjectURL(objectUrl);
    const scale  = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
    const canvas = document.createElement('canvas');
    canvas.width  = Math.round(img.width  * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    applyImageDataUrl(canvas.toDataURL('image/jpeg', QUALITY));
  };
  img.onerror = function() {
    URL.revokeObjectURL(objectUrl);
    alert('Could not read image file. Please try another.');
  };
  img.src = objectUrl;
}

// ---- DRAG & DROP ----
function handleImageDragOver(e) {
  e.preventDefault();
}

function handleImageDragEnter(e) {
  e.preventDefault();
  document.getElementById('imageUploadLabel').classList.add('border-pcu-blue', 'bg-pcu-light/40');
  document.getElementById('imageUploadLabel').classList.remove('border-gray-200', 'bg-gray-50');
}

function handleImageDragLeave(e) {
  if (!document.getElementById('imageDropZone').contains(e.relatedTarget)) {
    document.getElementById('imageUploadLabel').classList.remove('border-pcu-blue', 'bg-pcu-light/40');
    document.getElementById('imageUploadLabel').classList.add('border-gray-200', 'bg-gray-50');
  }
}

function handleImageDrop(e) {
  e.preventDefault();
  document.getElementById('imageUploadLabel').classList.remove('border-pcu-blue', 'bg-pcu-light/40');
  document.getElementById('imageUploadLabel').classList.add('border-gray-200', 'bg-gray-50');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    readImageFile(file);
  }
}

// ---- FORM HELPERS ----
function buildBodyField(index) {
  return `<div class="body-field-group flex gap-2 items-start" data-index="${index}">
    <textarea name="bodyParagraph" rows="3" placeholder="Paragraph ${index + 1}..."
      class="flex-1 px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-pcu-blue resize-none"></textarea>
    <button type="button" onclick="removeBodyField(this)" class="mt-1 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  </div>`;
}

function buildHighlightField(index) {
  return `<div class="highlight-field-group flex gap-2 items-center" data-index="${index}">
    <input type="text" name="highlight" placeholder="Highlight point ${index + 1}..."
      class="flex-1 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-pcu-blue"/>
    <button type="button" onclick="removeHighlightField(this)" class="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  </div>`;
}

function addBodyParagraph() {
  const container = document.getElementById('articleBodyFields');
  const count = container.querySelectorAll('.body-field-group').length;
  const div = document.createElement('div');
  div.innerHTML = buildBodyField(count);
  container.appendChild(div.firstElementChild);
  lucide.createIcons();
}

function removeBodyField(btn) {
  const group = btn.closest('.body-field-group');
  const container = document.getElementById('articleBodyFields');
  if (container.querySelectorAll('.body-field-group').length > 1) group.remove();
}

function addHighlight() {
  const container = document.getElementById('articleHighlightFields');
  const count = container.querySelectorAll('.highlight-field-group').length;
  const div = document.createElement('div');
  div.innerHTML = buildHighlightField(count);
  container.appendChild(div.firstElementChild);
  lucide.createIcons();
}

function removeHighlightField(btn) {
  const group = btn.closest('.highlight-field-group');
  const container = document.getElementById('articleHighlightFields');
  if (container.querySelectorAll('.highlight-field-group').length > 1) group.remove();
}

function updateTagPreview() {
  const tag = document.getElementById('articleTag').value;
  const labels = {
    '#inboundstudents': 'Inbound Students',
    '#outboundstudents': 'Outbound Students',
    '#partnership': 'Partnership',
    '#general': 'General'
  };
  document.getElementById('tagPreview').textContent = labels[tag] || tag;
}

// ---- RESET FORM ----
function resetArticleForm() {
  document.getElementById('articleForm').reset();
  document.getElementById('articleBodyFields').innerHTML = buildBodyField(0);
  document.getElementById('articleHighlightFields').innerHTML = buildHighlightField(0);
  clearImageUpload();
  updateTagPreview();
}

function setFormMode(mode) {
  const isEdit = mode === 'edit';
  document.getElementById('articleFormModalTitle').textContent = isEdit ? 'Edit Article' : 'Add New Article';
  document.getElementById('articleFormSubmitText').textContent = isEdit ? 'Update Article' : 'Publish Article';
  const icon = document.getElementById('articleFormSubmitIcon');
  icon.setAttribute('data-lucide', isEdit ? 'check' : 'send');
  lucide.createIcons();
}

// ---- ARTICLE FORM MODAL ----
function openAddArticleModal() {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }
  editingArticleId = null;
  resetArticleForm();
  setFormMode('add');
  document.getElementById('articleFormModal').classList.remove('hidden');
  document.getElementById('articleFormModal').classList.add('flex');
  setTimeout(() => { lucide.createIcons(); document.getElementById('articleTitle').focus(); }, 50);
}

function openEditArticleModal(id) {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }
  const article = (window.allNews || []).find(a => a.id === id);
  if (!article) return;

  editingArticleId = id;
  resetArticleForm();
  setFormMode('edit');

  document.getElementById('articleTitle').value = article.title || '';
  document.getElementById('articleTag').value = article.tag || '#inboundstudents';
  document.getElementById('articleExcerpt').value = article.excerpt || '';
  document.getElementById('articleQuote').value = article.quote || '';
  document.getElementById('articleContactName').value = article.contactName || '';
  document.getElementById('articleContactEmail').value = article.contactEmail || '';
  document.getElementById('articleContactPhone').value = article.contactPhone || '';

  if (article.imageUrl) applyImageDataUrl(article.imageUrl);

  const bodyContainer = document.getElementById('articleBodyFields');
  const paras = article.paragraphs && article.paragraphs.length ? article.paragraphs : [''];
  bodyContainer.innerHTML = paras.map((_, i) => buildBodyField(i)).join('');
  bodyContainer.querySelectorAll('textarea[name="bodyParagraph"]').forEach((ta, i) => {
    ta.value = paras[i] || '';
  });

  const hlContainer = document.getElementById('articleHighlightFields');
  const hls = article.highlights && article.highlights.length ? article.highlights : [''];
  hlContainer.innerHTML = hls.map((_, i) => buildHighlightField(i)).join('');
  hlContainer.querySelectorAll('input[name="highlight"]').forEach((inp, i) => {
    inp.value = hls[i] || '';
  });

  updateTagPreview();
  document.getElementById('articleFormModal').classList.remove('hidden');
  document.getElementById('articleFormModal').classList.add('flex');
  setTimeout(() => lucide.createIcons(), 50);
}

function closeAddArticleModal() {
  document.getElementById('articleFormModal').classList.add('hidden');
  document.getElementById('articleFormModal').classList.remove('flex');
  editingArticleId = null;
}

// ---- PUBLISH / UPDATE ----
async function handlePublishArticle(e) {
  e.preventDefault();
  const session = adminGetSession();
  if (!session) return;

  const form         = document.getElementById('articleForm');
  const title        = document.getElementById('articleTitle').value.trim();
  const excerpt      = document.getElementById('articleExcerpt').value.trim();
  const tag          = document.getElementById('articleTag').value;
  const imageUrl     = document.getElementById('articleImageUrl').value.trim();
  const quote        = document.getElementById('articleQuote').value.trim();
  const contactName  = document.getElementById('articleContactName').value.trim();
  const contactEmail = document.getElementById('articleContactEmail').value.trim();
  const contactPhone = document.getElementById('articleContactPhone').value.trim();

  const paragraphs = [...form.querySelectorAll('textarea[name="bodyParagraph"]')]
    .map(t => t.value.trim()).filter(Boolean);
  const highlights = [...form.querySelectorAll('input[name="highlight"]')]
    .map(i => i.value.trim()).filter(Boolean);

  if (!title || !excerpt || paragraphs.length === 0) {
    alert('Please fill in the title, summary, and at least one body paragraph.');
    return;
  }

  const payload = { title, excerpt, tag, imageUrl, paragraphs, quote, highlights, contactName, contactEmail, contactPhone };
  const submitBtn = document.getElementById('articleFormSubmitBtn');
  submitBtn.disabled = true;

  try {
    if (editingArticleId) {
      const res = await fetch(`${API_BASE}/api/articles/${editingArticleId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Server error');
      const updated = await res.json();
      closeAddArticleModal();
      await refreshNewsData();
      navigateTo(updated.id);
      showAdminToast('Article updated successfully!');
    } else {
      const res = await fetch(`${API_BASE}/api/articles`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...payload, author: session.username })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Server error');
      closeAddArticleModal();
      await refreshNewsData();
      showAdminToast('Article published successfully!');
    }
  } catch (err) {
    alert(`Could not save: ${err.message}`);
  } finally {
    submitBtn.disabled = false;
  }
}

// ---- TOAST ----
function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-2');
  }, 3000);
}

// ---- DYNAMIC NEWS REFRESH ----
async function refreshNewsData() {
  let adminArticles = [];
  try {
    const res = await fetch(`${API_BASE}/api/articles`);
    if (res.ok) adminArticles = await res.json();
  } catch {}

  window.allNews = [...adminArticles, ...window.staticNews];
  window.latestNewsData = window.allNews.slice(0, 4);
  window.newsCarouselIndex = 0;

  if (typeof renderNews === 'function') {
    renderNews('homeNews',     window.allNews.slice(0, 3));
    renderNews('newsList',     window.allNews);
    renderNews('inboundNews',  window.allNews.filter(n => n.tag === '#inboundstudents').slice(0, 3));
    renderNews('outboundNews', window.allNews.filter(n => n.tag === '#outboundstudents').slice(0, 3));
  }
  if (typeof filterAndRenderNews === 'function') filterAndRenderNews();
  if (typeof renderNewsCarousel === 'function') renderNewsCarousel();
  if (typeof renderCategories === 'function') renderCategories();
  if (typeof renderTrending === 'function') renderTrending();
  ensureAdminArticlePagesExist();
  lucide.createIcons();
}

// ---- DYNAMIC ARTICLE DETAIL PAGE ----
function renderAdminArticlePage(article) {
  const highlights = article.highlights && article.highlights.length
    ? article.highlights.map(h => `<li>• ${h}</li>`).join('') : '';

  const paragraphs = (article.paragraphs || [])
    .map(p => `<p class="text-gray-600 leading-relaxed">${p}</p>`).join('');

  const quoteHtml = article.quote
    ? `<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">"${article.quote}"</blockquote>`
    : '';

  const imageHtml = article.imageUrl
    ? `<img alt="${article.title}" class="w-full h-96 object-cover" src="${article.imageUrl}"/>`
    : '';

  const contactHtml = (article.contactEmail || article.contactPhone)
    ? `<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h2 class="font-semibold text-pcu-blue mb-4">Contact</h2>
        ${article.contactName  ? `<p class="text-gray-600 text-sm mb-2">${article.contactName}</p>`    : ''}
        ${article.contactEmail ? `<p class="text-sm text-gray-800 font-semibold">${article.contactEmail}</p>` : ''}
        ${article.contactPhone ? `<p class="text-sm text-gray-800">${article.contactPhone}</p>`        : ''}
      </div>` : '';

  const session = adminGetSession();
  const adminBtns = session ? `
    <div class="flex gap-3 flex-wrap mt-4">
      <button onclick="openEditArticleModal('${article.id}')"
        class="inline-flex items-center gap-2 px-5 py-2 bg-pcu-blue/10 text-pcu-blue text-sm font-semibold rounded-full hover:bg-pcu-blue/20 transition">
        <i data-lucide="pencil" class="w-4 h-4"></i> Edit Article
      </button>
      <button onclick="confirmDeleteArticle('${article.id}')"
        class="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-500 text-sm font-semibold rounded-full hover:bg-red-100 transition">
        <i data-lucide="trash-2" class="w-4 h-4"></i> Delete Article
      </button>
    </div>` : '';

  const headerBgStyle = article.imageUrl
    ? `style="background-image:url('${article.imageUrl}');background-size:cover;background-position:center;"` : '';
  const headerOverlay = article.imageUrl
    ? `<div class="absolute inset-0 bg-gradient-to-r ${article.color || 'from-pcu-blue to-pcu-sky'} opacity-80"></div>` : '';

  return `
<div class="page" id="page-${article.id}">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
  <div class="relative bg-gradient-to-r ${article.color || 'from-pcu-blue to-pcu-sky'} py-20 overflow-hidden" ${headerBgStyle}>
    ${headerOverlay}
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false">
        <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News
      </a>
      <div class="inline-block px-4 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">${article.tag.replace('#','')}</div>
      <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">${article.title}</h1>
      <p class="text-white/80 text-lg max-w-3xl">${article.excerpt}</p>
      <p class="text-white/50 text-sm mt-3">${article.date}</p>
    </div>
  </div>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        ${imageHtml ? `<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">${imageHtml}</div>` : ''}
        <div class="space-y-6">${paragraphs}${quoteHtml}</div>
        ${adminBtns}
      </div>
      <aside class="space-y-6">
        ${highlights ? `<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
          <h2 class="font-semibold text-pcu-blue mb-4">Key Highlights</h2>
          <ul class="space-y-3 text-gray-600">${highlights}</ul>
        </div>` : ''}
        ${contactHtml}
      </aside>
    </div>
  </div>
</div>
</div>`;
}

// ---- DELETE ----
async function confirmDeleteArticle(id) {
  if (!confirm('Delete this article? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API_BASE}/api/articles/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Server error');
    const pageEl = document.getElementById('page-' + id);
    if (pageEl) pageEl.remove();
    await refreshNewsData();
    navigateTo('news');
    showAdminToast('Article deleted.');
  } catch (err) {
    alert(`Could not delete: ${err.message}`);
  }
}

// ---- INJECT PAGE ----
function injectAdminArticlePage(article) {
  const existing  = document.getElementById('page-' + article.id);
  const container = document.getElementById('adminArticlePages');
  if (!container) return;
  const div = document.createElement('div');
  div.innerHTML = renderAdminArticlePage(article);
  const newPage = div.firstElementChild;
  if (existing) {
    existing.replaceWith(newPage);
  } else {
    container.appendChild(newPage);
  }
  lucide.createIcons();
}

function ensureAdminArticlePagesExist() {
  (window.allNews || [])
    .filter(a => a.id.startsWith('admin-news-'))
    .forEach(a => injectAdminArticlePage(a));
}

// ---- UI STATE ----
function updateAdminUI() {
  const loggedIn  = isAdminLoggedIn();
  const session   = adminGetSession();
  const fab       = document.getElementById('adminFab');
  const loginBtn  = document.getElementById('adminLoginBtn');
  const userLabel = document.getElementById('adminUserLabel');

  if (loggedIn) {
    fab.classList.remove('hidden');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (userLabel) userLabel.textContent = session.role;
  } else {
    fab.classList.add('hidden');
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (userLabel) userLabel.textContent = '';
  }

  // Show admin edit buttons in open OSE modal
  const oseAdminBtn = document.getElementById('ose-modal-admin-edit-btn');
  if (oseAdminBtn) {
    if (loggedIn) oseAdminBtn.classList.remove('hidden');
    else oseAdminBtn.classList.add('hidden');
  }

  // Show/hide OSE manager FAB on OSE page
  const oseFab = document.getElementById('oseManagerFabBtn');
  if (oseFab) {
    const osePage = document.getElementById('page-outbound-semester-exchange');
    if (loggedIn && osePage && osePage.classList.contains('active')) {
      oseFab.classList.remove('hidden');
    } else {
      oseFab.classList.add('hidden');
    }
  }

  // Show/hide Add Opportunity button on Internship page
  const internAddBtn = document.getElementById('internship-admin-add-btn');
  if (internAddBtn) {
    const internPage = document.getElementById('page-internship');
    if (loggedIn && internPage && internPage.classList.contains('active')) {
      internAddBtn.classList.remove('hidden');
    } else {
      internAddBtn.classList.add('hidden');
    }
  }
  // Re-render opportunities to show/hide edit controls when auth state changes
  const internPage = document.getElementById('page-internship');
  if (internPage && internPage.classList.contains('active') && typeof renderInternshipOpportunities === 'function') {
    renderInternshipOpportunities();
  }
}

// ---- OSE PROGRAMS MANAGEMENT ----
let oseEditingId = null;

async function openOseManagerModal() {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }
  await renderOseManagerList();
  const modal = document.getElementById('ose-manager-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => lucide.createIcons(), 30);
}

function closeOseManagerModal(event) {
  if (event && event.target !== document.getElementById('ose-manager-modal')) return;
  document.getElementById('ose-manager-modal').classList.add('hidden');
  document.getElementById('ose-manager-modal').classList.remove('flex');
}

async function renderOseManagerList() {
  const container = document.getElementById('ose-manager-list');
  if (!container) return;
  container.innerHTML = '<p class="text-gray-400 text-sm text-center py-4">Loading...</p>';

  let list = [];
  try {
    const res = await fetch(`${API_BASE}/api/ose-programs`);
    if (res.ok) list = await res.json();
  } catch (e) {}

  if (!list.length) {
    container.innerHTML = '<p class="text-gray-400 text-sm text-center py-8">No program details added yet. Click "Add University" to get started.</p>';
    return;
  }

  container.innerHTML = list.map(entry => `
    <div class="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="font-semibold text-pcu-blue text-sm">${entry.name}</p>
          ${entry.isCustom ? '<span class="px-2 py-0.5 bg-pcu-orange/10 text-pcu-orange text-xs rounded-full font-medium">Custom</span>' : ''}
        </div>
        <p class="text-xs text-gray-400 mt-0.5">${entry.country || ''}${entry.region ? ' · ' + entry.region : ''}</p>
        ${entry.description ? `<p class="text-xs text-gray-500 mt-1 line-clamp-2">${entry.description}</p>` : ''}
        <div class="flex flex-wrap gap-1 mt-2">
          ${(entry.programs || []).map(p => `<span class="px-2 py-0.5 bg-pcu-light text-pcu-blue text-xs rounded-full">${p}</span>`).join('')}
        </div>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button onclick="openOseEditForm(${JSON.stringify(entry).replace(/"/g, '&quot;')})"
          class="p-2 rounded-xl bg-pcu-blue/10 text-pcu-blue hover:bg-pcu-blue/20 transition">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
        <button onclick="confirmDeleteOseProgram('${entry.id}')"
          class="p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function openOseEditForm(entryOrNull, prefillName) {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }

  // Close manager modal if open (we'll reopen after save)
  const managerModal = document.getElementById('ose-manager-modal');
  if (managerModal) {
    managerModal.classList.add('hidden');
    managerModal.classList.remove('flex');
  }

  const entry = (entryOrNull && entryOrNull.id) ? entryOrNull : null;
  oseEditingId = entry ? entry.id : null;

  document.getElementById('ose-form-title').textContent = entry ? 'Edit University Program' : 'Add University Program';
  document.getElementById('ose-form-submit-text').textContent = entry ? 'Save Changes' : 'Add Program';
  document.getElementById('ose-form-id').value = entry ? entry.id : '';
  document.getElementById('ose-form-name').value = entry ? entry.name : (prefillName || '');
  document.getElementById('ose-form-country').value = entry ? (entry.country || '') : '';
  document.getElementById('ose-form-region').value = entry ? (entry.region || '') : '';
  document.getElementById('ose-form-programs').value = entry ? (entry.programs || []).join(', ') : 'Semester Exchange, Study Abroad';
  document.getElementById('ose-form-description').value = entry ? (entry.description || '') : '';
  document.getElementById('ose-form-duration').value = entry ? (entry.duration || '') : '';
  document.getElementById('ose-form-deadline').value = entry ? (entry.deadline || '') : '';
  document.getElementById('ose-form-requirements').value = entry ? (entry.requirements || '') : '';
  document.getElementById('ose-form-website').value = entry ? (entry.website || '') : '';
  document.getElementById('ose-form-notes').value = entry ? (entry.notes || '') : '';
  document.getElementById('ose-form-is-custom').checked = entry ? !!entry.isCustom : false;

  const modal = document.getElementById('ose-form-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => { lucide.createIcons(); document.getElementById('ose-form-name').focus(); }, 50);
}

function closeOseEditForm(event) {
  if (event && event.target !== document.getElementById('ose-form-modal')) return;
  document.getElementById('ose-form-modal').classList.add('hidden');
  document.getElementById('ose-form-modal').classList.remove('flex');
  oseEditingId = null;
}

async function handleSaveOseProgram(e) {
  e.preventDefault();
  if (!isAdminLoggedIn()) return;

  const btn = document.getElementById('ose-form-submit-btn');
  btn.disabled = true;

  const programsRaw = document.getElementById('ose-form-programs').value;
  const programs = programsRaw.split(',').map(s => s.trim()).filter(Boolean);

  const payload = {
    name:         document.getElementById('ose-form-name').value.trim(),
    country:      document.getElementById('ose-form-country').value.trim(),
    region:       document.getElementById('ose-form-region').value,
    programs,
    description:  document.getElementById('ose-form-description').value.trim(),
    duration:     document.getElementById('ose-form-duration').value.trim(),
    deadline:     document.getElementById('ose-form-deadline').value.trim(),
    requirements: document.getElementById('ose-form-requirements').value.trim(),
    website:      document.getElementById('ose-form-website').value.trim(),
    notes:        document.getElementById('ose-form-notes').value.trim(),
    isCustom:     document.getElementById('ose-form-is-custom').checked,
  };

  try {
    let res;
    if (oseEditingId) {
      res = await fetch(`${API_BASE}/api/ose-programs/${oseEditingId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API_BASE}/api/ose-programs`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    }
    if (!res.ok) throw new Error((await res.json()).error || 'Server error');

    closeOseEditForm();
    // Reload OSE program data and re-render
    if (typeof loadOsePrograms === 'function') await loadOsePrograms();
    showAdminToast(oseEditingId ? 'University program updated!' : 'University program added!');
    // Reopen manager modal
    await openOseManagerModal();
  } catch (err) {
    alert(`Could not save: ${err.message}`);
  } finally {
    btn.disabled = false;
    oseEditingId = null;
  }
}

async function confirmDeleteOseProgram(id) {
  if (!confirm('Delete this university program entry? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API_BASE}/api/ose-programs/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Server error');
    if (typeof loadOsePrograms === 'function') await loadOsePrograms();
    showAdminToast('Entry deleted.');
    await renderOseManagerList();
  } catch (err) {
    alert(`Could not delete: ${err.message}`);
  }
}

// ---- INTERNSHIP OPPORTUNITIES MANAGEMENT ----
let internEditingId = null;

function buildCompanyDatalist() {
  const dl = document.getElementById('intern-company-datalist');
  if (!dl || dl.childElementCount > 0) return;
  const intlNames = (typeof partnerData !== 'undefined' ? partnerData : []).map(p => p.name);
  const domNames  = (typeof domesticPartners !== 'undefined' ? domesticPartners : []).map(p => p.name);
  const allNames  = [...new Set([...intlNames, ...domNames])].sort((a, b) => a.localeCompare(b));
  dl.innerHTML = allNames.map(n => `<option value="${n.replace(/"/g, '&quot;')}"></option>`).join('');
}

function openInternshipOpportunityModal(id) {
  if (!isAdminLoggedIn()) { openAdminLoginModal(); return; }

  internEditingId = id || null;
  const modal = document.getElementById('intern-form-modal');
  const title = document.getElementById('intern-form-title');
  const submitText = document.getElementById('intern-form-submit-text');

  if (id) {
    title.textContent = 'Edit Internship Opportunity';
    submitText.textContent = 'Save Changes';
    // Fetch current entry to prefill
    fetch(`${API_BASE}/api/internship-opportunities`)
      .then(r => r.json())
      .then(list => {
        const entry = list.find(e => e.id === id);
        if (!entry) return;
        document.getElementById('intern-form-id').value = entry.id;
        document.getElementById('intern-form-position').value = entry.position || '';
        document.getElementById('intern-form-company').value = entry.company || '';
        document.getElementById('intern-form-link').value = entry.link || '';
      })
      .catch(() => {});
  } else {
    title.textContent = 'Add Internship Opportunity';
    submitText.textContent = 'Add Opportunity';
    document.getElementById('intern-form-id').value = '';
    document.getElementById('intern-form-position').value = '';
    document.getElementById('intern-form-company').value = '';
    document.getElementById('intern-form-link').value = '';
  }

  buildCompanyDatalist();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => { lucide.createIcons(); document.getElementById('intern-form-position').focus(); }, 50);
}

function closeInternshipOpportunityModal(event) {
  if (event && event.target !== document.getElementById('intern-form-modal')) return;
  document.getElementById('intern-form-modal').classList.add('hidden');
  document.getElementById('intern-form-modal').classList.remove('flex');
  internEditingId = null;
}

async function handleSaveInternshipOpportunity(e) {
  e.preventDefault();
  if (!isAdminLoggedIn()) return;

  const btn = document.getElementById('intern-form-submit-btn');
  btn.disabled = true;

  const payload = {
    position: document.getElementById('intern-form-position').value.trim(),
    company:  document.getElementById('intern-form-company').value.trim(),
    link:     document.getElementById('intern-form-link').value.trim(),
  };

  try {
    let res;
    if (internEditingId) {
      res = await fetch(`${API_BASE}/api/internship-opportunities/${internEditingId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API_BASE}/api/internship-opportunities`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    }
    if (!res.ok) throw new Error((await res.json()).error || 'Server error');
    document.getElementById('intern-form-modal').classList.add('hidden');
    document.getElementById('intern-form-modal').classList.remove('flex');
    if (typeof renderInternshipOpportunities === 'function') await renderInternshipOpportunities();
    showAdminToast(internEditingId ? 'Opportunity updated!' : 'Opportunity added!');
  } catch (err) {
    alert(`Could not save: ${err.message}`);
  } finally {
    btn.disabled = false;
    internEditingId = null;
  }
}

async function confirmDeleteInternshipOpportunity(id) {
  if (!confirm('Delete this internship opportunity? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API_BASE}/api/internship-opportunities/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Server error');
    if (typeof renderInternshipOpportunities === 'function') await renderInternshipOpportunities();
    showAdminToast('Opportunity deleted.');
  } catch (err) {
    alert(`Could not delete: ${err.message}`);
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', async function() {
  updateAdminUI();
  await refreshNewsData();
  // Load OSE program details in background
  if (typeof loadOsePrograms === 'function') loadOsePrograms();
});
