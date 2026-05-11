// JS/pages/outbound/internship.js
function renderInternship() {
    return `
<div class="page" id="page-internship">
<div style="padding-top: 80px;">
<div class="relative overflow-hidden bg-gradient-to-r from-pcu-orange to-amber-400 py-16 md:py-24">
<div class="absolute inset-0">
<img alt="Gedung Petra" class="w-full h-full object-cover opacity-60" src="Assets/Images/Student%20Exchange/internship-1.JPG" style="object-position: center 50%;"/>
</div>
<div class="absolute inset-0 bg-gradient-to-r from-pcu-orange/70 to-amber-400/70"></div>
<div class="relative max-w-7xl mx-auto px-6 lg:px-8"><a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-4 hover:text-white transition" href="#" onclick="navigateTo('pcu-students');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Local Students</a>
<span class="inline-block px-4 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">Outbound Programs</span>
<h1 class="font-display text-3xl md:text-5xl font-bold text-white mb-3">Internship</h1>
<p class="text-white/80 text-lg max-w-2xl">Kick-start your career with real-world experience. Explore our industry partners and available internship opportunities.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
<!-- Section 1: Industry Partners -->
<div class="mb-20">
<div class="mb-8">
<span class="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-3 border border-teal-200">Section 1</span>
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue">List of Industry Partners</h2>
<p class="text-gray-500 mt-2 max-w-2xl">PCU collaborates with leading companies and organizations across various industries to provide students with meaningful internship experiences.</p>
</div>
<!-- Filter Tabs -->
<div class="flex flex-wrap gap-2 mb-8">
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-teal-600 text-white transition" data-sector="all" onclick="filterPartners('all')">All Sectors</button>
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition" data-sector="technology" onclick="filterPartners('technology')">Technology</button>
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition" data-sector="finance" onclick="filterPartners('finance')">Finance</button>
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition" data-sector="manufacturing" onclick="filterPartners('manufacturing')">Manufacturing</button>
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition" data-sector="creative" onclick="filterPartners('creative')">Creative &amp; Media</button>
<button class="ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition" data-sector="hospitality" onclick="filterPartners('hospitality')">Hospitality</button>
</div>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" id="industry-partners-grid"></div>
</div>
<!-- Divider -->
<div class="border-t border-gray-100 mb-20"></div>
<!-- Section 2: Internship Opportunities -->
<div class="mb-16">
<div class="mb-8">
<span class="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-3 border border-teal-200">Section 2</span>
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue">Internship Opportunities</h2>
<p class="text-gray-500 mt-2 max-w-2xl">Browse current internship openings available exclusively for PCU students. New opportunities are added regularly.</p>
</div>
<div class="space-y-5" id="internship-opportunities-list"></div>
</div>
<!-- Apply CTA -->
<div class="bg-gradient-to-br from-pcu-orange to-amber-400 rounded-3xl p-10 text-white text-center">
<i class="w-12 h-12 mx-auto mb-4 text-white/80" data-lucide="briefcase"></i>
<h3 class="font-display text-2xl font-bold mb-3">Don't See a Fit?</h3>
<p class="text-white/80 mb-6 max-w-xl mx-auto">Reach out to the International Office — we can help connect you with the right opportunity based on your interests and major.</p>
<a class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-pcu-orange font-semibold rounded-full hover:bg-orange-50 transition shadow-lg" href="mailto:io@petra.ac.id">
<i class="w-4 h-4" data-lucide="mail"></i> Contact International Office
       </a>
</div>
</div>
</div>
</div>
    `;
}
