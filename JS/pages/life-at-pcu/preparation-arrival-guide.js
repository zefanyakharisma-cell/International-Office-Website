// JS/pages/life at pcu/preparation-arrival-guide.js
function renderPreparationArrival() {
    return `
        <div class="page" id="page-preparation-arrival">
            <div class="min-h-screen bg-white" style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-gradient-to-r from-pcu-green to-emerald-500 py-20">
                    <div class="absolute inset-0">
                        <img alt="Life at PCU" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/Student%20Exchange/student-exchange-2.JPG"
                             style="object-position: center 50%;" loading="lazy" decoding="async"/>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-pcu-green/80 to-emerald-500/80"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Preparation &amp; Arrival Guide</h1>
                                <p class="text-white/75 text-lg max-w-3xl">Everything you need before departure and during arrival in Surabaya.</p>
                            </div>
                            <a class="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-pcu-green font-semibold rounded-full shadow-lg hover:bg-white/90 transition"
                               download="" href="Files/Downloads/International Students Guidebook (1).pdf">
                                <i class="w-4 h-4" data-lucide="download"></i> Download Guidebook
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div class="grid lg:grid-cols-2 gap-10">

                        <!-- Left Column -->
                        <div class="space-y-8">
                            <div class="rounded-3xl border border-gray-100 bg-pcu-light p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Pre-Departure Checklist</h2>
                                <ul class="space-y-4 text-gray-600">
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="check-circle"></i> Confirm your student visa and travel documents.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="check-circle"></i> Arrange airport transfer and arrival logistics.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="check-circle"></i> Pack essentials, local SIM card, and currency for initial expenses.</li>
                                </ul>
                            </div>
                            <div class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Arrival Guide</h2>
                                <ul class="space-y-4 text-gray-600">
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="map-pin"></i> Arrive at Juanda International Airport and use a trusted ride service to PCU.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="users"></i> Check in with the International Office upon arrival for orientation support.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="home"></i> Confirm your accommodation arrangements before leaving the airport.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="space-y-8">
                            <div class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">Health Insurance</h2>
                                <p class="text-gray-600 mb-4">We recommend students have either Health &amp; Travel Insurance from their home country before arriving in Indonesia. This is the preferred coverage for international students during the exchange period.</p>
                                <p class="text-gray-600">Make sure your plan includes medical evacuation, emergency care, and COVID-19 coverage if available.</p>
                            </div>
                            <div class="rounded-3xl border border-gray-100 bg-pcu-light p-8 shadow-sm">
                                <h2 class="font-semibold text-pcu-green text-2xl mb-4">First Week Checklist</h2>
                                <ul class="space-y-4 text-gray-600">
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="check-circle"></i> Register at the International Office and attend orientation events.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="file-text"></i> Confirm your class schedule and campus facilities tour.</li>
                                    <li class="flex gap-3"><i class="w-5 h-5 text-pcu-green mt-1" data-lucide="credit-card"></i> Open a local bank account if needed and get a local SIM card.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
