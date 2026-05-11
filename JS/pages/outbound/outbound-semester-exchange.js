// JS/pages/outbound/outbound-semester-exchange.js
function renderOutboundSemesterExchange() {
    return `
<div class="page" id="page-outbound-semester-exchange">
<div style="padding-top: 80px;">
<div class="relative overflow-hidden bg-gradient-to-r from-pcu-orange to-amber-400 py-16 md:py-24">
<div class="absolute inset-0">
<img alt="Gedung Petra" class="w-full h-full object-cover opacity-60" src="Assets/Images/Student%20Exchange/student-exchange-6.JPG" style="object-position: center 50%;"/>
</div>
<div class="absolute inset-0 bg-gradient-to-r from-pcu-orange/70 to-amber-400/70"></div>
<div class="relative max-w-7xl mx-auto px-6 lg:px-8"><a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-4 hover:text-white transition" href="#" onclick="navigateTo('pcu-students');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Local Students</a>
<span class="inline-block px-4 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">Outbound Programs</span>
<h1 class="font-display text-3xl md:text-5xl font-bold text-white mb-3">Outbound Semester Exchange</h1>
<p class="text-white/80 text-lg max-w-2xl">Explore the world through PCU's wide network of partner universities. Study abroad for one semester and earn transferable credits.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
<!-- Quick Stats -->
<div class="grid sm:grid-cols-3 gap-6 mb-16">
<div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10 text-center">
<div class="w-12 h-12 rounded-xl bg-pcu-blue/20 flex items-center justify-center mb-4 mx-auto">
<i class="w-6 h-6 text-pcu-blue" data-lucide="globe"></i>
</div>
<p class="text-3xl font-bold text-pcu-blue mb-1">80+</p>
<p class="text-gray-600 text-sm">Partner Universities</p>
</div>
<div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10 text-center">
<div class="w-12 h-12 rounded-xl bg-pcu-sky/20 flex items-center justify-center mb-4 mx-auto">
<i class="w-6 h-6 text-pcu-sky" data-lucide="map-pin"></i>
</div>
<p class="text-3xl font-bold text-pcu-blue mb-1">30+</p>
<p class="text-gray-600 text-sm">Countries Available</p>
</div>
<div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10 text-center">
<div class="w-12 h-12 rounded-xl bg-pcu-gold/20 flex items-center justify-center mb-4 mx-auto">
<i class="w-6 h-6 text-pcu-gold" data-lucide="calendar"></i>
</div>
<p class="text-3xl font-bold text-pcu-blue mb-1">1 Sem</p>
<p class="text-gray-600 text-sm">Duration (4–5 months)</p>
</div>
</div>
<!-- Partner List Section -->
<div class="mb-16">
<div class="flex items-end justify-between mb-8">
<div>
<span class="inline-block px-3 py-1 bg-pcu-light text-pcu-blue text-xs font-semibold rounded-full mb-3">Destinations</span>
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue">Semester Exchange &amp; Study Abroad Possibilities</h2>
<p class="text-gray-500 mt-2 max-w-2xl">Browse our partner universities by region. Click a region to see available destinations.</p>
</div>
</div>
<!-- Region Tabs -->
<div class="flex flex-wrap gap-2 mb-8" id="ose-region-tabs">
<button class="ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-pcu-blue text-white transition" data-region="all" onclick="oseShowRegion('all')">All Regions</button>
<button class="ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-pcu-blue hover:text-pcu-blue transition" data-region="asia" onclick="oseShowRegion('asia')">Asia</button>
<button class="ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-pcu-blue hover:text-pcu-blue transition" data-region="europe" onclick="oseShowRegion('europe')">Europe</button>
<button class="ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-pcu-blue hover:text-pcu-blue transition" data-region="oceania" onclick="oseShowRegion('oceania')">Oceania</button>
<button class="ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-pcu-blue hover:text-pcu-blue transition" data-region="americas" onclick="oseShowRegion('americas')">Americas</button>
</div>
<!-- Partner Grid -->
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="ose-partner-grid"></div>
</div>
<!-- How to Apply -->
<div class="bg-gradient-to-br from-pcu-orange/5 to-white rounded-3xl p-10 border border-pcu-orange/10 mb-16">
<h2 class="font-display text-2xl font-bold text-pcu-blue mb-8">How to Apply</h2>
<div class="grid md:grid-cols-4 gap-6">
<div class="text-center">
<div class="w-12 h-12 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold text-lg mb-4 mx-auto">1</div>
<h3 class="font-semibold text-pcu-blue mb-2">Check Eligibility</h3>
<p class="text-sm text-gray-500">Minimum GPA 3.0, active student, passed 2 semesters</p>
</div>
<div class="text-center">
<div class="w-12 h-12 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold text-lg mb-4 mx-auto">2</div>
<h3 class="font-semibold text-pcu-blue mb-2">Choose Destination</h3>
<p class="text-sm text-gray-500">Select up to 3 partner universities from the list above</p>
</div>
<div class="text-center">
<div class="w-12 h-12 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold text-lg mb-4 mx-auto">3</div>
<h3 class="font-semibold text-pcu-blue mb-2">Submit Documents</h3>
<p class="text-sm text-gray-500">Transcript, language certificate, motivation letter, passport</p>
</div>
<div class="text-center">
<div class="w-12 h-12 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold text-lg mb-4 mx-auto">4</div>
<h3 class="font-semibold text-pcu-blue mb-2">Depart &amp; Study</h3>
<p class="text-sm text-gray-500">Attend orientation and begin your exchange journey</p>
</div>
</div>
</div>
<!-- CTA -->
<div class="text-center">
<h3 class="font-display text-2xl font-bold text-pcu-blue mb-3">Ready to Go Global?</h3>
<p class="text-gray-500 mb-6">Contact the International Office to start your application.</p>
<a class="inline-flex items-center gap-2 px-8 py-3.5 bg-pcu-blue text-white font-semibold rounded-full hover:bg-pcu-sky transition shadow-lg shadow-pcu-blue/20" href="mailto:io@petra.ac.id">
<i class="w-4 h-4" data-lucide="mail"></i> Contact Us
       </a>
</div>
</div>
</div>
</div>
    `;
}
