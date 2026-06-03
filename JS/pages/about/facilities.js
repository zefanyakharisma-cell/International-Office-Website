// JS/pages/about/facilities.js
function renderFacilities() {
    return `
        <div class="page" id="page-facilities">
            <div class="min-h-screen bg-transparent" style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="bg-gradient-to-r from-[#0d2137] to-pcu-navy py-20"
                     style="background-image: linear-gradient(rgba(13,33,55,0.60), rgba(29,68,110,0.60)), url('Assets/Images/Gedung Petra/gedung-q-1.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Facilities</h1>
                        <p class="text-white/75 text-lg max-w-3xl">Discover Petra Christian University's campus facilities designed to support academic excellence, student wellbeing, and international engagement.</p>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20 space-y-12">

                    <!-- Facility Cards -->
                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <a class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:border-pcu-blue transition"
                           href="http://library.petra.ac.id/" target="_blank">
                            <div class="mb-6 overflow-hidden rounded-3xl bg-slate-50 h-40">
                                <img alt="Library" class="w-full h-full object-cover object-center" src="Assets/Images/Facilities/library-1.svg" loading="lazy" decoding="async"/>
                            </div>
                            <h3 class="font-semibold text-pcu-blue text-xl mb-3">Library</h3>
                            <p class="text-gray-600 mb-6">Access one of East Java's largest academic libraries with digital collections, e-resources, and study spaces.</p>
                            <span class="inline-flex items-center gap-2 text-pcu-blue font-semibold">Visit Library <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
                        </a>

                        <a class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:border-pcu-blue transition"
                           href="http://poliklinik.petra.ac.id/" target="_blank">
                            <div class="mb-6 overflow-hidden rounded-3xl bg-slate-50 h-40">
                                <img alt="Health Services" class="w-full h-full object-cover object-center" src="Assets/Images/Facilities/health-services-1.svg" loading="lazy" decoding="async"/>
                            </div>
                            <h3 class="font-semibold text-pcu-blue text-xl mb-3">Health Services</h3>
                            <p class="text-gray-600 mb-6">Klinik Pratama UK Petra offers general and dental care with free and self-pay services for the campus community.</p>
                            <span class="inline-flex items-center gap-2 text-pcu-blue font-semibold">View Health Services <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
                        </a>

                        <a class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:border-pcu-blue transition"
                           href="http://ptik.petra.ac.id/" target="_blank">
                            <div class="mb-6 overflow-hidden rounded-3xl bg-slate-50 h-40">
                                <img alt="PTIK" class="w-full h-full object-cover object-center" src="Assets/Images/Facilities/ptik-1.svg" loading="lazy" decoding="async"/>
                            </div>
                            <h3 class="font-semibold text-pcu-blue text-xl mb-3">PTIK</h3>
                            <p class="text-gray-600 mb-6">IT services and Microsoft software support for learning, teaching, and research at UK Petra.</p>
                            <span class="inline-flex items-center gap-2 text-pcu-blue font-semibold">Explore PTIK <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
                        </a>

                        <a class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:border-pcu-blue transition"
                           href="https://alumni.petra.ac.id/" target="_blank">
                            <div class="mb-6 overflow-hidden rounded-3xl bg-slate-50 h-40">
                                <img alt="Petra Career Center" class="w-full h-full object-cover object-center" src="Assets/Images/Facilities/baka-1.svg" loading="lazy" decoding="async"/>
                            </div>
                            <h3 class="font-semibold text-pcu-blue text-xl mb-3">Petra Career Center</h3>
                            <p class="text-gray-600 mb-6">Supporting students and alumni with career preparation, recruitment events, and professional networking.</p>
                            <span class="inline-flex items-center gap-2 text-pcu-blue font-semibold">Open Career Center <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
                        </a>
                    </div>

                    <!-- BAKA & Contact Support -->
                    <div class="grid gap-8 lg:grid-cols-2">
                        <div class="rounded-3xl bg-pcu-blue/10 border border-gray-100 p-8 shadow-sm">
                            <h3 class="font-semibold text-pcu-blue text-2xl mb-4">BAKA</h3>
                            <p class="text-gray-600 mb-4">Biro Administrasi Kemahasiswaan dan Alumni handles student administration, financial assistance, student organization support, and alumni records.</p>
                            <a class="inline-flex items-center gap-2 text-pcu-blue font-semibold"
                               href="http://sportfolio.petra.ac.id/" target="_blank">
                                Visit BAKA <i class="w-4 h-4" data-lucide="arrow-right"></i>
                            </a>
                        </div>
                        <div class="rounded-3xl bg-pcu-blue/10 border border-gray-100 p-8 shadow-sm">
                            <h3 class="font-semibold text-pcu-blue text-2xl mb-4">Contact &amp; Support</h3>
                            <ul class="space-y-3 text-gray-600">
                                <li><span class="font-semibold text-pcu-blue">Library:</span> library@petra.ac.id</li>
                                <li><span class="font-semibold text-pcu-blue">Health:</span> poliklinik@petra.ac.id</li>
                                <li><span class="font-semibold text-pcu-blue">Career Center:</span> careercenter@petra.ac.id</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Dining & Worship -->
                    <div class="grid gap-8 lg:grid-cols-2">
                        <div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
                            <h3 class="font-semibold text-pcu-blue text-2xl mb-4">Campus Dining &amp; Stores</h3>
                            <p class="text-gray-600 mb-4">Enjoy campus dining options at several kantins, plus Petra Book Store, swalayan, and retail outlets for student essentials.</p>
                            <p class="text-gray-600">Locations: Main Campus, East Campus, West Campus.</p>
                        </div>
                        <div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
                            <h3 class="font-semibold text-pcu-blue text-2xl mb-4">Worship Center</h3>
                            <p class="text-gray-600 mb-4">Pusat Kerohanian (Pusroh) provides spiritual care, Christian worldview programs, and worship services for students, faculty, and staff.</p>
                            <p class="text-gray-600">Learn more about campus spiritual life and community support.</p>
                        </div>
                    </div>

                    <!-- Facility Highlights -->
                    <div class="rounded-3xl border border-gray-100 bg-pcu-blue/10 p-8 shadow-sm">
                        <h2 class="font-display text-3xl text-pcu-blue mb-4">Facility Highlights</h2>
                        <p class="text-gray-600 mb-6">UK Petra facilities deliver integrated academic, health, technology, and student life support for every Petranesian.</p>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="rounded-3xl bg-white p-5 border border-gray-100">
                                <p class="font-semibold text-pcu-blue">Extensive e-resource library access</p>
                            </div>
                            <div class="rounded-3xl bg-white p-5 border border-gray-100">
                                <p class="font-semibold text-pcu-blue">General and dental clinic services</p>
                            </div>
                            <div class="rounded-3xl bg-white p-5 border border-gray-100">
                                <p class="font-semibold text-pcu-blue">IT support and software for teaching and research</p>
                            </div>
                            <div class="rounded-3xl bg-white p-5 border border-gray-100">
                                <p class="font-semibold text-pcu-blue">Career guidance, alumni networks, and student administration</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}
