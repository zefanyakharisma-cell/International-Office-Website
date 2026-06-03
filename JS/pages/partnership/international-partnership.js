// JS/pages/partnership/international-partnership.js
function renderInternationalPartnership() {
    return `
<div class="page" id="page-international-partnership">
<div style="padding-top: 80px;"><!-- Hero Section -->
<div class="relative overflow-hidden bg-gradient-to-r from-pcu-purple to-violet-500 py-16 md:py-24">
<div class="absolute inset-0">
<img alt="Gedung Petra" class="w-full h-full object-cover opacity-60" src="Assets/Images/Partnership/partnership-1.JPG" style="object-position: center 50%;" loading="lazy" decoding="async"/>
</div>
<div class="absolute inset-0 bg-gradient-to-r from-pcu-purple/70 to-violet-500/70"></div>
<div class="relative max-w-7xl mx-auto px-6 lg:px-8"><a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-4 hover:text-white transition" href="#" onclick="navigateTo('pcu-students');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Local Students</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">International Partnership</h1>
<p class="text-white/80 text-lg max-w-3xl">Explore our global network of partnerships spanning 6 continents and 55 countries, connecting PCU with leading institutions worldwide.</p>
</div>
</div><!-- Content Section -->
<div class="bg-transparent">
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
<section class="mb-20 bg-gradient-to-b from-white to-pcu-light/20 rounded-3xl p-8 border border-gray-100 shadow-sm reveal">
<div class="text-center mb-10">
<span class="inline-block px-4 py-1.5 bg-pcu-blue/10 text-pcu-blue text-xs font-semibold rounded-full uppercase tracking-wider">Global Partnerships</span>
<h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-blue mt-4">Partnership Impact</h2>
<p class="text-gray-600 mt-3 max-w-2xl mx-auto">Explore our extensive network of international partners across 184 institutions, 32 countries, and 4 continents.</p>
</div>
<div class="grid md:grid-cols-3 gap-6">
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition" onclick="togglePartnershipBox('partners','-ip')">
<div class="text-4xl font-bold text-pcu-blue mb-2">184</div>
<p class="text-gray-600 text-sm font-medium">International Partners</p>
</div>
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition" onclick="openPartnershipModal('countries')">
<div class="text-4xl font-bold text-pcu-blue mb-2">32</div>
<p class="text-gray-600 text-sm font-medium">Countries</p>
</div>
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition" onclick="openPartnershipModal('continents')">
<div class="text-4xl font-bold text-pcu-blue mb-2">4</div>
<p class="text-gray-600 text-sm font-medium">Continents</p>
</div>
</div>
<div class="mt-10 hidden bg-white rounded-3xl p-8 border border-gray-100" id="partners-box-ip">
<h3 class="font-display text-2xl font-bold text-pcu-blue mb-6">Our International Partners</h3>
<div class="dp-carousel-wrapper py-2">
<div class="dp-carousel-track" id="partners-logos-ip"></div>
</div>
</div>
<div class="mt-10 hidden bg-white rounded-3xl p-8 border border-gray-100" id="countries-box-ip">
<h3 class="font-display text-2xl font-bold text-pcu-blue mb-6">Partner Countries</h3>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="countries-list-ip"></div>
</div>
<div class="mt-10 hidden bg-white rounded-3xl p-8 border border-gray-100" id="continents-box-ip">
<h3 class="font-display text-2xl font-bold text-pcu-blue mb-6">By Continents</h3>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
<div class="text-center cursor-pointer p-4 bg-pcu-light rounded-2xl hover:bg-pcu-blue hover:text-white transition" onclick="showContinent('asia','-ip')">
<i class="w-8 h-8 text-pcu-blue mb-2" data-lucide="globe"></i>
<p class="font-semibold">Asia</p>
</div>
<div class="text-center cursor-pointer p-4 bg-pcu-light rounded-2xl hover:bg-pcu-blue hover:text-white transition" onclick="showContinent('europe','-ip')">
<i class="w-8 h-8 text-pcu-blue mb-2" data-lucide="globe"></i>
<p class="font-semibold">Europe</p>
</div>
<div class="text-center cursor-pointer p-4 bg-pcu-light rounded-2xl hover:bg-pcu-blue hover:text-white transition" onclick="showContinent('north-america','-ip')">
<i class="w-8 h-8 text-pcu-blue mb-2" data-lucide="globe"></i>
<p class="font-semibold">North America</p>
</div>
<div class="text-center cursor-pointer p-4 bg-pcu-light rounded-2xl hover:bg-pcu-blue hover:text-white transition" onclick="showContinent('australia','-ip')">
<i class="w-8 h-8 text-pcu-blue mb-2" data-lucide="globe"></i>
<p class="font-semibold">Australia</p>
</div>
</div>
<div class="hidden" id="continent-countries-ip"></div>
</div>
</section>
<div class="mb-20 reveal">
<div class="text-center mb-12">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-4">Partnership Support &amp; Agreements</h2>
<p class="text-gray-600 max-w-2xl mx-auto">Download meeting request forms, explore our agreement support services, and engage with PCU’s international partnership team.</p>
</div>
<div class="grid gap-6 lg:grid-cols-3">
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-pcu-blue/10 text-pcu-blue text-xs font-semibold rounded-full uppercase tracking-wide">Agreement Support</span>
<h3 class="font-display text-2xl text-pcu-blue font-bold mt-6 mb-4">International Agreements</h3>
<p class="text-gray-600 mb-6">PCU supports MoU, MoA, IA/IR, and strategic collaboration frameworks for university-wide exchange, research projects, and student mobility.</p>
<ul class="space-y-3 text-gray-600 text-sm">
<li>• Partnership agreement drafting</li>
<li>• Renewal and review coordination</li>
<li>• Academic and research collaboration planning</li>
</ul>
</div>
<div class="rounded-3xl bg-gradient-to-br from-pcu-purple to-violet-500 text-white p-8 shadow-lg">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 text-white text-xs font-semibold rounded-full uppercase tracking-wide">Meeting Request</span>
<h3 class="font-display text-2xl text-white font-bold mt-6 mb-4">Request a Partnership Meeting</h3>
<p class="text-white/80 mb-6">Organize a bilateral meeting with PCU’s partnership team for program planning, campus visits, or virtual consultation.</p>
<button class="inline-flex items-center gap-2 px-5 py-3 bg-white text-pcu-purple font-semibold rounded-full shadow-lg hover:bg-white/90 transition" onclick="openMeetingRequestModal()">Download Request Form</button>
<p class="text-white/75 text-sm mt-5">Or email <a class="underline text-white/90" href="mailto:head-partnership@petra.ac.id">head-partnership@petra.ac.id</a></p>
</div>
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-pcu-gold/10 text-pcu-gold text-xs font-semibold rounded-full uppercase tracking-wide">Strategic Initiatives</span>
<h3 class="font-display text-2xl text-pcu-blue font-bold mt-6 mb-4">Global Partnership Planning</h3>
<p class="text-gray-600 mb-6">Support for agenda setting, joint program development, and international mobility operations for partner institutions.</p>
<div class="grid gap-3 text-sm text-gray-600">
<div class="rounded-2xl bg-pcu-light p-4">Virtual meeting coordination</div>
<div class="rounded-2xl bg-pcu-light p-4">Agreement timeline management</div>
<div class="rounded-2xl bg-pcu-light p-4">Partner engagement planning</div>
</div>
</div>
</div>
</div><!-- Selected Country Institutions -->
<div class="mb-20 hidden" id="selectedCountrySection">
<div class="bg-gradient-to-br from-pcu-purple/5 to-violet-50 rounded-2xl border border-pcu-purple/20 p-8">
<div class="flex items-center justify-between mb-6">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue" id="selectedCountryTitle">Partner Institutions</h2>
<button class="text-gray-400 hover:text-gray-600 transition" onclick="clearSelectedCountry()">
<i class="w-6 h-6" data-lucide="x"></i>
</button>
</div>
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="selectedCountryInstitutions"></div>
</div>
</div><!-- Partnership Types -->
<div class="mb-20">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8 text-center">Types of Partnerships</h2>
<div class="grid md:grid-cols-3 gap-6">
<div class="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-md">
<div class="w-12 h-12 bg-pcu-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
<i class="w-6 h-6 text-pcu-blue" data-lucide="graduation-cap"></i>
</div>
<h3 class="font-semibold text-lg text-pcu-blue mb-2">Academic Partnerships</h3>
<p class="text-gray-600 text-sm">Student exchange programs, joint degrees, research collaborations, and academic mobility initiatives.</p>
</div>
<div class="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-md">
<div class="w-12 h-12 bg-pcu-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
<i class="w-6 h-6 text-pcu-gold" data-lucide="briefcase"></i>
</div>
<h3 class="font-semibold text-lg text-pcu-blue mb-2">Industry Partnerships</h3>
<p class="text-gray-600 text-sm">Internship opportunities, industry-sponsored research, and professional development programs.</p>
</div>
<div class="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-md">
<div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
<i class="w-6 h-6 text-green-600" data-lucide="users"></i>
</div>
<h3 class="font-semibold text-lg text-pcu-blue mb-2">Institutional Alliances</h3>
<p class="text-gray-600 text-sm">Strategic partnerships with universities, research institutions, and international organizations.</p>
</div>
</div>
</div><!-- Statistics -->
</div>
</div>
</div>
    `;
}
