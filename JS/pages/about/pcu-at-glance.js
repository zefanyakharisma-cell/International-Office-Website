// JS/pages/about/pcu-at-glance.js
function renderPcuAtGlance() {
    return `
        <div class="page" id="page-pcu-at-glance">
            <div style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-gradient-to-r from-[#0d2137] to-pcu-navy py-16 md:py-24">
                    <div class="absolute inset-0">
                        <img alt="Gedung Petra" class="w-full h-full object-cover opacity-40"
                             src="Assets/Images/Gedung%20Petra/gedung-petra-1.png"
                             style="object-position: center 75%;"/>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#0d2137]/70 to-pcu-navy/70"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">PCU at Glance</h1>
                        <p class="text-white/80 text-lg max-w-3xl">Transforming the Society for the Glory of God.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="bg-transparent">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                        <!-- Introduction -->
                        <div class="mb-20 text-center">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">About Petra Christian University</h2>
                            <p class="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
                                Petra is where global socioleaders are made and forged in Christian values. We invite you to become a part of a global and caring university, studying under accomplished and experienced faculty with fellow scholars who share the same vision to make a lasting impact on the world.
                            </p>
                        </div>

                        <!-- PCU in Numbers -->
                        <div class="mb-20">
                            <div class="text-center mb-14 reveal">
                                <span class="inline-block px-4 py-1.5 bg-pcu-blue/10 text-pcu-blue text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Facts &amp; Figures</span>
                                <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-blue" id="statsHeading">PCU in Numbers</h2>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                <div class="bg-gradient-to-br from-pcu-gold to-yellow-500 rounded-2xl p-8 text-center shadow-md border border-pcu-gold/20">
                                    <div class="text-4xl font-bold text-white mb-2">100</div>
                                    <p class="text-white/90 text-sm">QS South-Eastern Asia University Ranking 2026</p>
                                </div>
                                <div class="bg-gradient-to-br from-pcu-blue to-pcu-sky rounded-2xl p-8 text-center shadow-md border border-pcu-blue/20">
                                    <div class="text-4xl font-bold text-white mb-2">1961</div>
                                    <p class="text-white/90 text-sm">Founded</p>
                                </div>
                                <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-center shadow-md border border-indigo-600/20">
                                    <div class="text-4xl font-bold text-white mb-2">4,734</div>
                                    <p class="text-white/90 text-sm">Students studying at PCU</p>
                                </div>
                                <div class="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-8 text-center shadow-md border border-teal-500/20">
                                    <div class="text-4xl font-bold text-white mb-2">184</div>
                                    <p class="text-white/90 text-sm">International Partners</p>
                                </div>
                                <div class="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-center shadow-md border border-orange-500/20">
                                    <div class="text-4xl font-bold text-white mb-2">430+</div>
                                    <p class="text-white/90 text-sm">National Partners</p>
                                </div>
                                <div class="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-center shadow-md border border-pink-500/20">
                                    <div class="text-4xl font-bold text-white mb-2">53,080</div>
                                    <p class="text-white/90 text-sm">Alumni worldwide</p>
                                </div>
                                <div class="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-8 text-center shadow-md border border-cyan-500/20">
                                    <div class="text-4xl font-bold text-white mb-2">7</div>
                                    <p class="text-white/90 text-sm">Faculties</p>
                                </div>
                                <div class="bg-gradient-to-br from-lime-500 to-green-500 rounded-2xl p-8 text-center shadow-md border border-lime-500/20">
                                    <div class="text-4xl font-bold text-white mb-2">57</div>
                                    <p class="text-white/90 text-sm">Programs</p>
                                </div>
                            </div>
                        </div>

                        <!-- Vision and Mission -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-blue/10">
                            <div class="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Vision</h2>
                                    <p class="text-gray-600 leading-relaxed">To become a leading Christian university in the world that transforms society for God's Glory.</p>
                                </div>
                                <div>
                                    <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Mission</h2>
                                    <ul class="space-y-3 text-gray-600">
                                        <li>• Maintain the INTEGRITY of UK Petra as a Christian higher education institution.</li>
                                        <li>• Increase the CREDIBILITY of UK Petra to become a world-class higher education institution.</li>
                                        <li>• Build CIVILITY of life at UK Petra in the context of forming, developing and strengthening Civil Society.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Rector's Message -->
                        <div class="mb-20">
                            <div class="mb-8">
                                <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-blue">Rector's Message</h2>
                            </div>
                            <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
                                <div class="md:flex">
                                    <div class="md:w-1/3 overflow-hidden">
                                        <div class="relative h-80 md:h-full">
                                            <img alt="Prof. Dr. (H.C.) Ir. Rolly Intan" class="w-full h-full object-cover object-center"
                                                 src="Assets/Images/Foto%20Rektorat/00%20-%20Pak%20Rolly/DSC09547.JPG"/>
                                            <div class="absolute inset-x-0 bottom-0 bg-black/80 p-4 text-white text-sm font-semibold leading-tight">
                                                Prof. Dr. (H.C.) Ir. Rolly Intan, M.A.Sc., Dr.Eng. - Rector of Petra Christian University
                                            </div>
                                        </div>
                                    </div>
                                    <div class="md:w-2/3 p-8">
                                        <p class="text-pcu-blue font-semibold mb-2">Prof. Dr. (H.C.) Ir. Rolly Intan, M.A.Sc., Dr.Eng.</p>
                                        <p class="text-gray-600 text-sm mb-6">Rector of Petra Christian University</p>
                                        <p class="text-gray-600 leading-relaxed mb-4">
                                            Welcome to the UK Petra campus! For more than 64 years, as one of the oldest and most prominent private universities in East Java, UK Petra has continued to demonstrate its commitment to shaping excellent generations who are distinguished, full of integrity, and impactful.
                                        </p>
                                        <p class="text-gray-600 leading-relaxed mb-4">
                                            With more than 55,000 alumni who have worked professionally in 55 countries across 6 continents, UK Petra proves that the quality of education built over decades has made a global impact.
                                        </p>
                                        <p class="text-gray-600 leading-relaxed">
                                            UK Petra's curriculum applies a holistic education approach that attends to the academic, emotional, social, moral, and spiritual development of students. This support continues from orientation through graduation with personal mentoring, student organizations, and international programs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Leadership Team -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8 text-center">Leadership Team</h2>
                            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md">
                                    <div class="h-48 overflow-hidden">
                                        <img alt="Dra. Leenawaty Limantara" class="w-full h-full object-cover"
                                             src="Assets/Images/Foto%20Rektorat/01%20-%20Bu%20Shinta/IMG_9575.JPG"
                                             style="object-position: center 27%;"/>
                                    </div>
                                    <div class="p-6 text-center">
                                        <h3 class="font-semibold text-lg text-pcu-blue mb-2">Dra. Leenawaty Limantara, M.Sc., Ph.D.</h3>
                                        <p class="text-gray-600 text-sm">Vice Rector for Academic Affairs</p>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md">
                                    <div class="h-48 overflow-hidden">
                                        <img alt="Liem Pei Fun" class="w-full h-full object-cover"
                                             src="Assets/Images/Foto%20Rektorat/02%20-%20Bu%20Pei%20Fun/IMG_9613.JPG"
                                             style="object-position: center 20%;"/>
                                    </div>
                                    <div class="p-6 text-center">
                                        <h3 class="font-semibold text-lg text-pcu-blue mb-2">Liem Pei Fun, S.E., M.Com., Ph.D.</h3>
                                        <p class="text-gray-600 text-sm">Vice Rector for Human Resources</p>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md">
                                    <div class="h-48 overflow-hidden">
                                        <img alt="Dr. Rudy Setiawan" class="w-full h-full object-cover"
                                             src="Assets/Images/Foto%20Rektorat/03%20-%20Pak%20Rudy/DSCF8768.jpg"
                                             style="object-position: center 25%;"/>
                                    </div>
                                    <div class="p-6 text-center">
                                        <h3 class="font-semibold text-lg text-pcu-blue mb-2">Dr. Rudy Setiawan, S.T., M.T.</h3>
                                        <p class="text-gray-600 text-sm">Vice Rector for Student Affairs</p>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md">
                                    <div class="h-48 overflow-hidden">
                                        <img alt="Dr. Dra. Gan Shu San" class="w-full h-full object-cover"
                                             src="Assets/Images/Foto%20Rektorat/04%20-%20Bu%20Gan%20Shu%20San/DSCF8999.jpg"
                                             style="object-position: center 20%;"/>
                                    </div>
                                    <div class="p-6 text-center">
                                        <h3 class="font-semibold text-lg text-pcu-blue mb-2">Dr. Dra. Gan Shu San, M.Sc.</h3>
                                        <p class="text-gray-600 text-sm">Vice Rector for Development and Information Systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Partners -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8 text-center">Our Partners</h2>
                            <div class="grid md:grid-cols-2 gap-8 mb-8">

                                <!-- Domestic Partners -->
                                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 p-8 shadow-sm">
                                    <div class="flex items-start gap-4 mb-6">
                                        <div class="p-3 bg-blue-100 rounded-2xl">
                                            <i class="w-6 h-6 text-blue-600" data-lucide="building-2"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-blue-700 mb-2">Domestic Partners</h3>
                                            <p class="text-gray-600 text-sm">UK Petra collaborates with leading national institutions and corporations to open golden opportunities for Petranesians to gain real-world experience.</p>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">Bank Rakyat Indonesia</div>
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">Bank Mandiri</div>
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">Bank Central Asia</div>
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">McDonald's</div>
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">Wings Group</div>
                                        <div class="bg-white rounded-lg p-3 text-center text-xs font-medium text-pcu-blue border border-gray-100">SPS Corporate</div>
                                    </div>
                                    <a class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-md w-full justify-center"
                                       href="#" onclick="navigateTo('domestic-partnership');return false">
                                        Learn More <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                    </a>
                                </div>

                                <!-- International Partners -->
                                <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl border border-green-200 p-8 shadow-sm">
                                    <div class="flex items-start gap-4 mb-6">
                                        <div class="p-3 bg-green-100 rounded-2xl">
                                            <i class="w-6 h-6 text-green-600" data-lucide="globe"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-green-700 mb-2">International Partnerships</h3>
                                            <p class="text-gray-600 text-sm">Petra's global network spans 184 institutions across 32 countries and 4 continents, connecting us with leading universities worldwide and opening pathways for student mobility, research collaboration, and cultural exchange.</p>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-3 gap-4 mb-6">
                                        <div class="text-center p-4 bg-white/60 rounded-2xl border border-green-100">
                                            <div class="text-2xl font-bold text-green-600 mb-1">184</div>
                                            <p class="text-xs font-medium text-gray-600">International Partners</p>
                                        </div>
                                        <div class="text-center p-4 bg-white/60 rounded-2xl border border-green-100">
                                            <div class="text-2xl font-bold text-green-600 mb-1">32</div>
                                            <p class="text-xs font-medium text-gray-600">Countries</p>
                                        </div>
                                        <div class="text-center p-4 bg-white/60 rounded-2xl border border-green-100">
                                            <div class="text-2xl font-bold text-green-600 mb-1">4</div>
                                            <p class="text-xs font-medium text-gray-600">Continents</p>
                                        </div>
                                    </div>
                                    <a class="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition shadow-md w-full justify-center"
                                       href="#" onclick="navigateTo('international-partnership');return false">
                                        Learn More <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <!-- CTA Section -->
                        <div class="bg-gradient-to-r from-[#0d2137] to-pcu-navy rounded-3xl p-12 text-white text-center">
                            <h2 class="font-display text-3xl font-bold mb-3">Join the PCU Community</h2>
                            <p class="text-white/80 mb-8 max-w-2xl mx-auto">Become part of a university that transforms society for God's glory and prepares you to be a global leader.</p>
                            <div class="flex flex-wrap justify-center gap-4">
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-pcu-blue font-semibold rounded-full hover:bg-pcu-light transition shadow-lg" href="#">
                                    Learn More <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                </a>
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#">
                                    Visit Campus
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
