// JS/data/news.js
function renderNewsPage() {
    return `
<div class="page" id="page-news">
<div class="min-h-screen bg-gray-50" style="padding-top: 80px;">
<div class="relative w-full overflow-hidden" style="height: 380px;">
<div class="w-full h-full" id="newsCarouselContainer"></div>
<button aria-label="Previous news" class="carousel-nav left" id="newsCarouselPrev"><span class="text-2xl">‹</span></button>
<button aria-label="Next news" class="carousel-nav right" id="newsCarouselNext"><span class="text-2xl">›</span></button>
<div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20" id="carouselDots"></div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
<div class="grid lg:grid-cols-[1fr_300px] gap-10">
<div class="space-y-8">
<!-- SEARCH BAR -->
<div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
<div class="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
<i class="w-5 h-5 text-gray-400" data-lucide="search"></i>
<input class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400" id="newsSearchInput" placeholder="Search news &amp; updates..." type="text"/>
</div>
</div>
<!-- NEWS LIST -->
<div class="grid lg:grid-cols-2 gap-8" id="newsList"></div>
</div>
<aside class="space-y-6">
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue text-xl mb-4">Categories</h2>
<div class="space-y-3 text-sm text-gray-600" id="categoriesContainer"></div>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue text-xl mb-4">Trending</h2>
<ul class="space-y-4 text-gray-600 text-sm">
<li>• PCU Welcomes 45 Exchange Students</li>
<li>• New Partnership with University of Tokyo</li>
<li>• Indonesian SPECTRUM Registration Opens</li>
</ul>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage1() {
    return `
<div class="page" id="page-news-1">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">PCU Welcomes 45 Exchange Students from 12 Countries</h1>
<p class="text-white/75 text-lg max-w-3xl">Petra Christian University opens its campus to 45 incoming students from 12 partner countries for a semester of cultural exchange and academic collaboration.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="Exchange students at PCU" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">This semester, PCU welcomes a vibrant cohort of 45 exchange students from 12 countries, including Japan, South Korea, China, Malaysia, and Australia. The students will join academic classes, cultural immersion programs, and campus life activities designed to deepen their understanding of Indonesian culture.</p>
<p class="text-gray-600 leading-relaxed">Participants will engage in collaborative research, language workshops, and community service initiatives while building friendships with local students and faculty from Petra Christian University.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“We are excited to welcome our international partners to PCU and create meaningful exchanges that support global learning and cross-cultural understanding.”</blockquote>
<p class="text-gray-600 leading-relaxed">The welcome program includes campus tours, orientation sessions, Indonesian language classes, and excursions throughout East Java, ensuring a well-rounded and memorable global education experience.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Key Highlights</h2>
<ul class="space-y-3 text-gray-600">
<li>• 45 exchange students from 12 countries</li>
<li>• Academic and cultural immersion activities</li>
<li>• Campus tours and community engagement</li>
<li>• Indonesian language workshops</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Contact the International Office</h2>
<p class="text-gray-600 text-sm">For more information about incoming exchange programs, contact our international office at:</p>
<p class="text-sm text-gray-800 font-semibold mt-4">io@petra.ac.id</p>
<p class="text-sm text-gray-800">+62 31 298 3139</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage2() {
    return `
<div class="page" id="page-news-2">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">New Partnership with University of Tokyo Announced</h1>
<p class="text-white/75 text-lg max-w-3xl">PCU Global signs a strategic new partnership with the University of Tokyo, expanding opportunities for joint research and student mobility.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="University partnership announcement" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">Petra Christian University and the University of Tokyo have entered a new strategic partnership to support academic collaboration, student exchange, and research initiatives. This cooperation will create new pathways for joint programs in science, technology, and cultural studies.</p>
<p class="text-gray-600 leading-relaxed">Both institutions will explore dual degree frameworks, collaborative workshops, and faculty exchange opportunities that strengthen global academic networks and student mobility.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“This partnership marks an important milestone for PCU Global as we deepen our collaboration with top-tier institutions in Asia.”</blockquote>
<p class="text-gray-600 leading-relaxed">Students can look forward to interdisciplinary projects, joint seminars, and expanded access to research facilities through this partnership.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Partnership Benefits</h2>
<ul class="space-y-3 text-gray-600">
<li>• Expanded research collaborations</li>
<li>• Student exchange pathways</li>
<li>• Faculty and curriculum development</li>
<li>• Shared academic events</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Learn more</h2>
<p class="text-gray-600 text-sm">Contact our partnership team to explore exchange and research collaboration options.</p>
<p class="text-sm text-gray-800 font-semibold mt-4">head-partnership@petra.ac.id</p>
<p class="text-sm text-gray-800">staff-partnership@petra.ac.id</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage3() {
    return `
<div class="page" id="page-news-3">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">PCU Students Win International Innovation Competition</h1>
<p class="text-white/75 text-lg max-w-3xl">A team of PCU students earns international recognition for creative solutions in sustainability and social innovation.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="Student innovation competition" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">PCU students have been honored at an international innovation competition for their project in sustainability and social entrepreneurship. Their work showcased practical, community-centered solutions with measurable impact.</p>
<p class="text-gray-600 leading-relaxed">The team collaborated across disciplines to develop a prototype that integrates local insights and global best practices, earning praise from judges and partner institutions.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“This achievement highlights the creativity and global readiness of our students.”</blockquote>
<p class="text-gray-600 leading-relaxed">PCU continues to support student innovation through mentorship, industry partnerships, and opportunities to present work internationally.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Achievement Snapshot</h2>
<ul class="space-y-3 text-gray-600">
<li>• International innovation award</li>
<li>• Focus on sustainability</li>
<li>• Cross-disciplinary student team</li>
<li>• Mentorship from faculty advisors</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Support for innovators</h2>
<p class="text-gray-600 text-sm">Learn how PCU supports student innovation through programs, labs, and global exposure.</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage4() {
    return `
<div class="page" id="page-news-4">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Indonesian SPECTRUM Program Opens Registration</h1>
<p class="text-white/75 text-lg max-w-3xl">Registration is now open for Indonesian SPECTRUM, offering visiting students a curated cultural learning journey across East Java.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="Cultural program registration" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">The Indonesian SPECTRUM program is now accepting registrations for international students seeking a rich cultural and academic experience. The program features site visits, language classes, and expert-led cultural activities.</p>
<p class="text-gray-600 leading-relaxed">Students will explore local traditions, arts, food, and community life while studying Indonesian history and society in depth.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“Indonesian SPECTRUM is designed to immerse students in the heart of Indonesia’s culture and education.”</blockquote>
<p class="text-gray-600 leading-relaxed">The registration process is streamlined for international applicants, with support from the PCU International Office every step of the way.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Program Highlights</h2>
<ul class="space-y-3 text-gray-600">
<li>• Cultural learning in East Java</li>
<li>• Indonesian language classes</li>
<li>• Community and educational visits</li>
<li>• Support for international students</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Register Now</h2>
<p class="text-gray-600 text-sm">Reach out to the international office for assistance with your application.</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage5() {
    return `
<div class="page" id="page-news-5">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">20 PCU Students Depart for Semester Exchange in Europe</h1>
<p class="text-white/75 text-lg max-w-3xl">Twenty Petra Christian University students embark on semester exchange programs at partner institutions across Europe.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="Students departing for exchange" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">Twenty PCU students are leaving for semester exchange programs at partner institutions across Europe, including universities in the Netherlands, the United Kingdom, and Germany. This opportunity supports academic growth, cultural understanding, and global networking.</p>
<p class="text-gray-600 leading-relaxed">Each student will participate in local campus life, academic courses, and cultural events while representing PCU on an international stage.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“Semester exchange is one of the best ways to grow academically and personally in a global environment.”</blockquote>
<p class="text-gray-600 leading-relaxed">Students receive ongoing guidance from PCU advisors to ensure a seamless transition and successful exchange experience.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Exchange Benefits</h2>
<ul class="space-y-3 text-gray-600">
<li>• International academic exposure</li>
<li>• Cultural immersion in Europe</li>
<li>• New academic credits and credits transfer support</li>
<li>• Personal development opportunities</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Need help?</h2>
<p class="text-gray-600 text-sm">Contact the student mobility team for guidance on exchange preparation.</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

function renderNewsPage6() {
    return `
<div class="page" id="page-news-6">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('news');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to News</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">International Community Outreach in East Java</h1>
<p class="text-white/75 text-lg max-w-3xl">PCU organizes community outreach activities in East Java, connecting visitors with local culture and service projects.</p>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-10">
<div class="grid lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 space-y-6">
<div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
<img alt="Community outreach program" class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;w=1200&amp;q=80"/>
</div>
<div class="space-y-6">
<p class="text-gray-600 leading-relaxed">The PCU International Office led community outreach programs in East Java that brought students together with local residents, non-profit organizations, and cultural institutions.</p>
<p class="text-gray-600 leading-relaxed">The activities focused on sustainable development, education, and cultural exchange, ensuring participants gained meaningful insight into Indonesian community life.</p>
<blockquote class="border-l-4 border-pcu-blue pl-6 py-4 bg-pcu-light text-gray-700">“Our outreach programs are designed to create positive impact and deepen mutual understanding.”</blockquote>
<p class="text-gray-600 leading-relaxed">Participation included volunteer projects, local workshops, and collaborative events that enriched the student experience while supporting community partners.</p>
</div>
</div>
<aside class="space-y-6">
<div class="bg-pcu-blue/5 rounded-3xl p-8 border border-pcu-blue/10">
<h2 class="font-semibold text-pcu-blue mb-4">Community Focus</h2>
<ul class="space-y-3 text-gray-600">
<li>• Volunteer and service learning</li>
<li>• Cultural exchange events</li>
<li>• Local partnership collaboration</li>
<li>• Sustainable community projects</li>
</ul>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue mb-4">Get involved</h2>
<p class="text-gray-600 text-sm">Reach out to learn about upcoming international community programs with PCU Global.</p>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}

