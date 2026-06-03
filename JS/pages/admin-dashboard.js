// JS/pages/admin-dashboard.js
// Dedicated admin dashboard page (#admin) — consolidates the existing CRUD
// (News articles, OSE university programs, Internship opportunities) plus
// editable Home content into one place. Behaviour lives in JS/admin-dashboard.js.
function renderAdminDashboard() {
    const tab = (id, icon, label) => `
        <button type="button" data-admin-tab="${id}" onclick="adminDashSwitchTab('${id}')"
            class="admin-dash-tab w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:bg-pcu-light/60 transition text-left">
            <i data-lucide="${icon}" class="w-4 h-4 flex-shrink-0"></i>
            <span>${label}</span>
        </button>`;

    return `
        <div class="page" id="page-admin">
            <div class="min-h-screen bg-gray-50" style="padding-top: 80px;">

                <!-- Header -->
                <div class="bg-gradient-to-r from-pcu-navy to-pcu-blue">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-white/90 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                                    <i data-lucide="shield" class="w-3.5 h-3.5"></i> Admin
                                </div>
                                <h1 class="font-display text-3xl md:text-4xl font-bold text-white">Content Dashboard</h1>
                                <p class="text-white/70 text-sm mt-2">Manage every dynamic section of the PCU Global site from one place.</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="#" onclick="navigateTo('home');return false"
                                    class="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition">
                                    <i data-lucide="external-link" class="w-4 h-4"></i> View Site
                                </a>
                                <button onclick="adminLogout()"
                                    class="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-pcu-blue text-sm font-semibold rounded-full hover:bg-pcu-gold hover:text-white transition">
                                    <i data-lucide="log-out" class="w-4 h-4"></i> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                    <div class="grid lg:grid-cols-[240px_1fr] gap-8">

                        <!-- Sidebar -->
                        <aside class="lg:sticky lg:top-24 self-start">
                            <nav class="bg-white rounded-3xl border border-gray-100 shadow-sm p-3 space-y-1">
                                ${tab('overview', 'layout-dashboard', 'Overview')}
                                ${tab('news', 'newspaper', 'News Articles')}
                                ${tab('ose', 'building-2', 'OSE Programs')}
                                ${tab('interns', 'briefcase', 'Internships')}
                                ${tab('home', 'home', 'Home Content')}
                            </nav>
                        </aside>

                        <!-- Panels -->
                        <div class="min-w-0">

                            <!-- Overview -->
                            <section data-admin-panel="overview" class="admin-dash-panel space-y-6">
                                <div class="grid sm:grid-cols-3 gap-4">
                                    ${['news', 'ose', 'interns'].map(k => `
                                    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                                        <p class="text-3xl font-bold text-pcu-blue" id="admin-stat-${k}">—</p>
                                        <p class="text-sm text-gray-500 mt-1">${k === 'news' ? 'News articles' : k === 'ose' ? 'University programs' : 'Internship listings'}</p>
                                    </div>`).join('')}
                                </div>
                                <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                                    <h2 class="font-semibold text-pcu-blue mb-4">Quick actions</h2>
                                    <div class="flex flex-wrap gap-3">
                                        <button onclick="openAddArticleModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-pcu-blue/10 text-pcu-blue text-sm font-semibold rounded-full hover:bg-pcu-blue/20 transition"><i data-lucide="file-plus" class="w-4 h-4"></i> New Article</button>
                                        <button onclick="openOseEditForm(null)" class="inline-flex items-center gap-2 px-4 py-2.5 bg-pcu-orange/10 text-pcu-orange text-sm font-semibold rounded-full hover:bg-pcu-orange/20 transition"><i data-lucide="building-2" class="w-4 h-4"></i> New University</button>
                                        <button onclick="openInternshipOpportunityModal()" class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full hover:bg-emerald-100 transition"><i data-lucide="briefcase" class="w-4 h-4"></i> New Internship</button>
                                    </div>
                                </div>
                            </section>

                            <!-- News -->
                            <section data-admin-panel="news" class="admin-dash-panel hidden space-y-4">
                                ${adminDashPanelHeader('News Articles', 'openAddArticleModal()', 'Add Article')}
                                <div id="admin-dash-news-list" class="space-y-3"></div>
                            </section>

                            <!-- OSE Programs -->
                            <section data-admin-panel="ose" class="admin-dash-panel hidden space-y-4">
                                ${adminDashPanelHeader('OSE University Programs', 'openOseEditForm(null)', 'Add University')}
                                <div id="admin-dash-ose-list" class="space-y-3"></div>
                            </section>

                            <!-- Internships -->
                            <section data-admin-panel="interns" class="admin-dash-panel hidden space-y-4">
                                ${adminDashPanelHeader('Internship Opportunities', 'openInternshipOpportunityModal()', 'Add Opportunity')}
                                <div id="admin-dash-interns-list" class="space-y-3"></div>
                            </section>

                            <!-- Home Content -->
                            <section data-admin-panel="home" class="admin-dash-panel hidden">
                                <form id="admin-dash-home-form" onsubmit="saveAdminHomeContent(event)"
                                    class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
                                    <div class="flex items-center justify-between">
                                        <h2 class="font-semibold text-pcu-blue">Home Page Content</h2>
                                        <button type="submit" class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-navy transition">
                                            <i data-lucide="check" class="w-4 h-4"></i> Save Changes
                                        </button>
                                    </div>

                                    <div class="grid sm:grid-cols-2 gap-4">
                                        ${adminDashTextField('hero_title', 'Hero Title')}
                                        ${adminDashTextField('hero_subtitle', 'Hero Subtitle')}
                                        ${adminDashTextField('stats_heading', 'Stats Heading')}
                                        ${adminDashTextField('study_heading', 'Study-at-PCU Heading')}
                                        ${adminDashTextField('news_heading', 'News Heading')}
                                        ${adminDashTextField('font_family', 'Font Family')}
                                    </div>

                                    <div>
                                        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Brand Colors</p>
                                        <div class="grid sm:grid-cols-3 gap-4">
                                            ${adminDashColorField('background_color', 'Background')}
                                            ${adminDashColorField('surface_color', 'Surface')}
                                            ${adminDashColorField('text_color', 'Text')}
                                            ${adminDashColorField('primary_action_color', 'Primary Action')}
                                            ${adminDashColorField('secondary_action_color', 'Secondary Action')}
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-400">Changes apply to the live site immediately and are saved to Supabase.</p>
                                </form>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// ---- Small markup helpers (shared with admin-dashboard.js render calls) ----
function adminDashPanelHeader(title, onclick, btnLabel) {
    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="font-semibold text-pcu-blue text-lg">${title}</h2>
            <button onclick="${onclick}" class="inline-flex items-center gap-2 px-4 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-navy transition flex-shrink-0">
                <i data-lucide="plus" class="w-4 h-4"></i> ${btnLabel}
            </button>
        </div>`;
}

function adminDashTextField(key, label) {
    return `
        <label class="block">
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">${label}</span>
            <input type="text" data-home-key="${key}"
                class="mt-1.5 w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-pcu-blue"/>
        </label>`;
}

function adminDashColorField(key, label) {
    return `
        <label class="flex items-center gap-3">
            <input type="color" data-home-key="${key}"
                class="h-10 w-12 rounded-xl border border-gray-200 cursor-pointer bg-white p-0.5"/>
            <span class="text-sm text-gray-600">${label}</span>
        </label>`;
}
