// JS/pages/life at pcu/how-to-get-to-pcu.js
function renderHowToGet() {
    return `
        <div class="page" id="page-how-to-get">
            <div class="min-h-screen bg-white" style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-gradient-to-r from-pcu-green to-emerald-500 py-20">
                    <div class="absolute inset-0">
                        <img alt="Life at PCU" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/Student%20Exchange/student-exchange-2.JPG"
                             style="object-position: center 50%;"/>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-pcu-green/80 to-emerald-500/80"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">How to Get to PCU</h1>
                        <p class="text-white/75 text-lg max-w-3xl">Find Petra Christian University in Surabaya with a map, transport tips, and nearby city and mall locations.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div class="grid lg:grid-cols-2 gap-10">

                        <!-- Map & Address -->
                        <div class="space-y-6">
                            <div class="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                                <iframe allowfullscreen="" class="w-full h-96" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"
                                        src="https://maps.google.com/maps?q=Petra%20Christian%20University%20Surabaya&amp;output=embed"></iframe>
                            </div>
                            <div class="bg-pcu-light rounded-3xl border border-gray-100 p-8">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Petra Christian University</h2>
                                <p class="text-gray-600 mb-4">Petra Christian University (PCU) is located at Jl. Siwalankerto 121-131, Surabaya 60236, Indonesia. The campus sits in a central area of western Surabaya with easy access to major roads and local transport.</p>
                                <div class="grid gap-4 sm:grid-cols-2">
                                    <div class="rounded-3xl bg-white p-5 border border-gray-100 shadow-sm">
                                        <h3 class="font-semibold text-pcu-green mb-2">City Center</h3>
                                        <p class="text-gray-600">Approximately 20 minutes from Surabaya city center and the business district.</p>
                                    </div>
                                    <div class="rounded-3xl bg-white p-5 border border-gray-100 shadow-sm">
                                        <h3 class="font-semibold text-pcu-green mb-2">Airport</h3>
                                        <p class="text-gray-600">Around 30 minutes from Juanda International Airport by taxi or ride share.</p>
                                    </div>
                                    <div class="rounded-3xl bg-white p-5 border border-gray-100 shadow-sm">
                                        <h3 class="font-semibold text-pcu-green mb-2">Shopping &amp; Malls</h3>
                                        <p class="text-gray-600">Close to Tunjungan Plaza, Pakuwon Mall, and BG Junction, all within 30-40 minutes.</p>
                                    </div>
                                    <div class="rounded-3xl bg-white p-5 border border-gray-100 shadow-sm">
                                        <h3 class="font-semibold text-pcu-green mb-2">Transport</h3>
                                        <p class="text-gray-600">Accessible by Grab, Blue Bird taxi, and local bus services across Surabaya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Landmarks & Tips -->
                        <div class="space-y-6">
                            <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Nearby Landmarks</h2>
                                <ul class="space-y-4 text-gray-600">
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="map-pin"></i> PCU is within easy reach of Surabaya's Western Corridor.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="shopping-bag"></i> Tunjungan Plaza and Pakuwon Mall are the closest major shopping centers.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="train"></i> Surabaya's major train stations are 20-30 minutes away by car.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="clock"></i> Peak travel time around the campus is typically 25-35 minutes during rush hour.</li>
                                </ul>
                            </div>
                            <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Travel Tips</h2>
                                <p class="text-gray-600 mb-4">For first-time visitors, use ride-hailing apps or a trusted taxi from Juanda Airport. Ask your driver to use the campus address and verify with the university's official address.</p>
                                <p class="text-gray-600">If you plan to explore the city, Surabaya offers easy access to restaurants, malls, and cultural areas from the area around PCU.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
