// JS/pages/inbound/indonesian-spectrum.js
function renderIndonesianSpectrum() {
    return `
        <div class="page" id="page-indonesian-spectrum">
            <div style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden py-16 md:py-24" style="background: var(--pcu-red-to-yellow-gradient)">
                    <div class="absolute inset-0">
                        <img alt="Indonesian SPECTRUM" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/Student%20Exchange/student-exchange-4.JPG"
                             style="object-position: center 60%;" loading="lazy" decoding="async"/>
                    </div>
                    <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(236,0,140,0.8), rgba(255,188,0,0.8))"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Indonesian SPECTRUM</h1>
                        <p class="text-white/80 text-lg max-w-3xl">A short-term cultural and academic immersion program exploring Indonesia's rich heritage and modern landscape.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="bg-transparent">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                        <!-- Program Overview -->
                        <div class="mb-20">
                            <div class="grid md:grid-cols-3 gap-8 mb-12">
                                <div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-violet-600" data-lucide="calendar"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Duration</h3>
                                    <p class="text-gray-600">Short-term program (2-4 weeks)</p>
                                </div>
                                <div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-purple-600" data-lucide="users"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Experience</h3>
                                    <p class="text-gray-600">Cultural and academic immersion</p>
                                </div>
                                <div class="bg-pcu-light rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-gold/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-gold" data-lucide="map-pin"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Location</h3>
                                    <p class="text-gray-600">Surabaya and various sites in Indonesia</p>
                                </div>
                            </div>
                            <div class="prose prose-lg max-w-none">
                                <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Program Highlights</h2>
                                <ul class="space-y-4 text-gray-600 mb-8">
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-violet-600 shrink-0 mt-1" data-lucide="check-circle"></i> <span>Explore Indonesia's rich cultural heritage and modern development</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-violet-600 shrink-0 mt-1" data-lucide="check-circle"></i> <span>Academic courses combined with cultural excursions and activities</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-violet-600 shrink-0 mt-1" data-lucide="check-circle"></i> <span>Visit historical sites, museums, and contemporary landmarks</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-violet-600 shrink-0 mt-1" data-lucide="check-circle"></i> <span>Interact with local communities and experience Indonesian hospitality</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-violet-600 shrink-0 mt-1" data-lucide="check-circle"></i> <span>Guided by experienced faculty and cultural experts</span></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Program Components -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-red/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Program Components</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="book-open"></i> Academic Component</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Indonesian language and culture courses</li>
                                        <li>• History and contemporary society studies</li>
                                        <li>• Cross-cultural communication workshops</li>
                                        <li>• Academic lectures by PCU faculty</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="camera"></i> Cultural Experiences</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Visits to cultural heritage sites</li>
                                        <li>• Traditional art and music performances</li>
                                        <li>• Local cuisine and cooking classes</li>
                                        <li>• Community service activities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Who Can Join -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Who Can Join</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="bg-white rounded-2xl p-8 border border-gray-100">
                                    <h3 class="font-semibold text-pcu-blue mb-4">International Students</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Undergraduate students from partner universities</li>
                                        <li>• Interest in Asian studies and cultural exchange</li>
                                        <li>• Open to new experiences and cultural immersion</li>
                                        <li>• Basic English proficiency</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-2xl p-8 border border-gray-100">
                                    <h3 class="font-semibold text-pcu-blue mb-4">Requirements</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Application form and personal statement</li>
                                        <li>• Academic transcript</li>
                                        <li>• Recommendation letter</li>
                                        <li>• Health insurance coverage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Section -->
                        <div class="bg-pcu-red rounded-3xl p-12 text-white text-center">
                            <h2 class="font-display text-3xl font-bold mb-3">Experience Indonesian Culture</h2>
                            <p class="text-white/80 mb-8 max-w-2xl mx-auto">Join Indonesian SPECTRUM and discover the beauty and diversity of Indonesia through an unforgettable cultural journey.</p>
                            <div class="flex flex-wrap justify-center gap-4">
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c446d] text-white font-semibold rounded-full hover:bg-[#163553] transition shadow-lg" href="#">
                                    Apply Now <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                </a>
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#">
                                    Learn More
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
