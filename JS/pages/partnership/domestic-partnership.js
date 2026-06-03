// JS/pages/partnership/domestic-partnership.js
function renderDomesticPartnership() {
    return `
<div class="page" id="page-domestic-partnership">
<div style="padding-top: 80px;"><!-- Hero Section -->
<div class="relative overflow-hidden py-16 md:py-24" style="background: linear-gradient(to right, #166534, #0d9488);">
<div class="absolute inset-0">
<img alt="PCU Campus Partnership" class="w-full h-full object-cover opacity-50" src="Assets/Images/Partnership/partnership-1.JPG" style="object-position: center 50%;" loading="lazy" decoding="async"/>
</div>
<div class="absolute inset-0" style="background: linear-gradient(to right, rgba(22,101,52,0.7), rgba(13,148,136,0.7));"></div>
<div class="relative max-w-7xl mx-auto px-6 lg:px-8"><a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Domestic Partnership</h1>
<p class="text-white/80 text-lg max-w-3xl">Discover our extensive network of domestic partnerships spanning industries, education institutions, government agencies, and regional organizations across Indonesia.</p>
</div>
</div><!-- Content Section -->
<div class="bg-transparent">
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
<section class="mb-20 bg-gradient-to-b from-white to-pcu-light/20 rounded-3xl p-8 border border-gray-100 shadow-sm reveal">
<div class="text-center mb-10">
<span class="inline-block px-4 py-1.5 bg-pcu-green/10 text-pcu-green text-xs font-semibold rounded-full uppercase tracking-wider">Domestic Partnerships</span>
<h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-blue mt-4">List of our Domestic Partners</h2>
<p class="text-gray-600 mt-3 max-w-2xl mx-auto">Explore our extensive network of domestic partners across cities throughout Indonesia. Click any card to explore.</p>
</div>
<div class="grid md:grid-cols-3 gap-6">
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 transition" onclick="toggleDomesticBox('total')">
<div class="text-4xl font-bold text-pcu-blue mb-2">321</div>
<p class="text-gray-600 text-sm font-medium">Total</p>
</div>
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 transition" onclick="toggleDomesticBox('cities')">
<div class="text-4xl font-bold text-pcu-blue mb-2">52</div>
<p class="text-gray-600 text-sm font-medium">Cities</p>
</div>
<div class="text-center cursor-pointer p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-300 transition" onclick="toggleDomesticBox('type')">
<div class="text-4xl font-bold text-pcu-blue mb-2">5</div>
<p class="text-gray-600 text-sm font-medium">Type</p>
</div>
</div>
<div class="mt-10 hidden bg-white rounded-3xl p-8 border border-gray-100" id="dp-total-box">
<h3 class="font-display text-2xl font-bold text-pcu-blue mb-6">Our Domestic Partners</h3>
<div class="dp-carousel-wrapper py-2">
<div class="dp-carousel-track" id="dp-logos-grid"></div>
</div>
</div>
</section>
<div class="mb-20 reveal">
<div class="text-center mb-12">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-4">Partnership Support &amp; Agreements</h2>
<p class="text-gray-600 max-w-2xl mx-auto">Download meeting request forms, explore our agreement support services, and engage with PCU's domestic partnership team.</p>
</div>
<div class="grid gap-6 lg:grid-cols-3">
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-pcu-blue/10 text-pcu-blue text-xs font-semibold rounded-full uppercase tracking-wide">Agreement Support</span>
<h3 class="font-display text-2xl text-pcu-blue font-bold mt-6 mb-4">Domestic Agreements</h3>
<p class="text-gray-600 mb-6">PCU supports MoU, MoA, IA/IR, and strategic collaboration frameworks for industry-wide internships, research projects, and student placement programs.</p>
<ul class="space-y-3 text-gray-600 text-sm">
<li>• Partnership agreement drafting</li>
<li>• Renewal and review coordination</li>
<li>• Academic and industry collaboration planning</li>
</ul>
</div>
<div class="rounded-3xl bg-gradient-to-br from-pcu-purple to-violet-500 text-white p-8 shadow-lg">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 text-white text-xs font-semibold rounded-full uppercase tracking-wide">Meeting Request</span>
<h3 class="font-display text-2xl text-white font-bold mt-6 mb-4">Request a Partnership Meeting</h3>
<p class="text-white/80 mb-6">Organize a bilateral meeting with PCU's partnership team for program planning, campus visits, or virtual consultation.</p>
<button class="inline-flex items-center gap-2 px-5 py-3 bg-white text-pcu-purple font-semibold rounded-full shadow-lg hover:bg-white/90 transition" onclick="openMeetingRequestModal()">Download Request Form</button>
<p class="text-white/75 text-sm mt-5">Or email <a class="underline text-white/90" href="mailto:head-partnership@petra.ac.id">head-partnership@petra.ac.id</a></p>
</div>
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-pcu-gold/10 text-pcu-gold text-xs font-semibold rounded-full uppercase tracking-wide">Strategic Initiatives</span>
<h3 class="font-display text-2xl text-pcu-blue font-bold mt-6 mb-4">Domestic Partnership Planning</h3>
<p class="text-gray-600 mb-6">Support for agenda setting, joint program development, and domestic mobility operations for partner organizations.</p>
<div class="grid gap-3 text-sm text-gray-600">
<div class="rounded-2xl bg-pcu-light p-4">On-site visit coordination</div>
<div class="rounded-2xl bg-pcu-light p-4">Agreement timeline management</div>
<div class="rounded-2xl bg-pcu-light p-4">Partner engagement planning</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div><!-- Domestic Partnership Modal -->
<div id="dp-modal" class="fixed inset-0 z-50 items-center justify-center p-4" style="display:none; background: rgba(0,0,0,0.5);" onclick="if(event.target===this)closeDomesticModal()">
<div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col" style="max-height: 80vh;">
<div class="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
<span class="font-semibold text-gray-400 text-sm uppercase tracking-wider">Domestic Partners</span>
<button class="p-2 rounded-lg hover:bg-gray-100 transition" onclick="closeDomesticModal()"><i class="w-5 h-5 text-gray-600" data-lucide="x"></i></button>
</div>
<div class="p-6 overflow-y-auto flex-1" id="dp-modal-body"></div>
</div>
</div>
</div>
    `;
}
