// ---- ADMIN SYSTEM ----
const ADMIN_ACCOUNTS = {
  'admin_inbound':     { password: 'inbound2026',     role: 'Inbound', tag: '#inboundstudents' },
  'admin_outbound':    { password: 'outbound2026',    role: 'Outbound', tag: '#outboundstudents' },
  'admin_partnership': { password: 'partnership2026', role: 'Partnership', tag: '#partnership' },
  'admin_head':        { password: 'inthead2026',     role: 'Head', tag: null }
};

const ADMIN_NEWS_KEY = 'pcu_admin_news';
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

function adminLogin(username, password) {
  const account = ADMIN_ACCOUNTS[username];
  if (!account || account.password !== password) return false;
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ username, role: account.role, tag: account.tag }));
  return true;
}

function adminLogout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  updateAdminUI();
  refreshNewsData();
}

// ---- STORAGE ----
function getAdminArticles() {
  try { return JSON.parse(localStorage.getItem(ADMIN_NEWS_KEY)) || []; } catch { return []; }
}

function saveAdminArticles(articles) {
  localStorage.setItem(ADMIN_NEWS_KEY, JSON.stringify(articles));
}

function deleteAdminArticle(id) {
  saveAdminArticles(getAdminArticles().filter(a => a.id !== id));
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

function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('adminUsernameInput').value.trim();
  const password = document.getElementById('adminPasswordInput').value;
  if (adminLogin(username, password)) {
    closeAdminLoginModal();
    updateAdminUI();
    refreshNewsData();
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
  // Only reset if leaving the drop zone entirely
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
  // mode: 'add' | 'edit'
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
  const article = getAdminArticles().find(a => a.id === id);
  if (!article) return;

  editingArticleId = id;
  resetArticleForm();
  setFormMode('edit');

  // Pre-fill all fields
  document.getElementById('articleTitle').value = article.title || '';
  document.getElementById('articleTag').value = article.tag || '#inboundstudents';
  document.getElementById('articleExcerpt').value = article.excerpt || '';
  document.getElementById('articleQuote').value = article.quote || '';
  document.getElementById('articleContactName').value = article.contactName || '';
  document.getElementById('articleContactEmail').value = article.contactEmail || '';
  document.getElementById('articleContactPhone').value = article.contactPhone || '';

  // Image
  if (article.imageUrl) {
    applyImageDataUrl(article.imageUrl);
  }

  // Body paragraphs
  const bodyContainer = document.getElementById('articleBodyFields');
  const paras = article.paragraphs && article.paragraphs.length ? article.paragraphs : [''];
  bodyContainer.innerHTML = paras.map((_, i) => buildBodyField(i)).join('');
  bodyContainer.querySelectorAll('textarea[name="bodyParagraph"]').forEach((ta, i) => {
    ta.value = paras[i] || '';
  });

  // Highlights
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
function handlePublishArticle(e) {
  e.preventDefault();
  const session = adminGetSession();
  if (!session) return;

  const form = document.getElementById('articleForm');
  const title       = document.getElementById('articleTitle').value.trim();
  const excerpt     = document.getElementById('articleExcerpt').value.trim();
  const tag         = document.getElementById('articleTag').value;
  const imageUrl    = document.getElementById('articleImageUrl').value.trim();
  const quote       = document.getElementById('articleQuote').value.trim();
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

  if (editingArticleId) {
    // ---- UPDATE ----
    const articles = getAdminArticles();
    const idx = articles.findIndex(a => a.id === editingArticleId);
    if (idx === -1) {
      showAdminToast('Error: article not found. Try refreshing.');
      return;
    }
    const updated = {
      ...articles[idx],
      title, excerpt, tag,
      color: TAG_COLORS[tag] || articles[idx].color,
      imageUrl, paragraphs, quote, highlights,
      contactName, contactEmail, contactPhone,
      updatedAt: new Date().toISOString()
    };
    articles[idx] = updated;
    try {
      saveAdminArticles(articles);
    } catch (err) {
      alert('Could not save: storage may be full. Try removing the image or clearing old articles.');
      return;
    }
    const targetId = updated.id;
    closeAddArticleModal();
    refreshNewsData();
    // Navigate to the updated article — this re-injects the page AND correctly sets .active
    navigateTo(targetId);
    showAdminToast('Article updated successfully!');
    return;
  } else {
    // ---- CREATE ----
    const now = new Date();
    const article = {
      id: 'admin-news-' + Date.now(),
      title, excerpt, tag,
      color: TAG_COLORS[tag] || 'from-pcu-blue to-pcu-sky',
      date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      imageUrl, paragraphs, quote, highlights,
      contactName, contactEmail, contactPhone,
      author: session.username,
      createdAt: now.toISOString()
    };
    const existing = getAdminArticles();
    existing.unshift(article);
    try {
      saveAdminArticles(existing);
    } catch (err) {
      alert('Could not save: storage may be full. Try removing the image or using a smaller photo.');
      return;
    }
    closeAddArticleModal();
    refreshNewsData();
    showAdminToast('Article published successfully!');
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
function refreshNewsData() {
  const adminArticles = getAdminArticles();
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
function confirmDeleteArticle(id) {
  if (confirm('Delete this article? This cannot be undone.')) {
    const pageEl = document.getElementById('page-' + id);
    if (pageEl) pageEl.remove();
    deleteAdminArticle(id);
    navigateTo('news');
    showAdminToast('Article deleted.');
  }
}

// ---- INJECT PAGE ----
function injectAdminArticlePage(article) {
  const existing = document.getElementById('page-' + article.id);
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
  getAdminArticles().forEach(a => injectAdminArticlePage(a));
}

// ---- UI STATE ----
function updateAdminUI() {
  const loggedIn = isAdminLoggedIn();
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
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function() {
  updateAdminUI();
  ensureAdminArticlePagesExist();
  refreshNewsData();
});
