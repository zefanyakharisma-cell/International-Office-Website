// JS/pages/inbound/international-community-outreach-program.js
function renderCop() {
    return `
        <div class="page" id="page-cop">
            <div style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden py-16 md:py-24" style="background: var(--pcu-red-to-yellow-gradient)">
                    <div class="absolute inset-0">
                        <img alt="ICOP" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/ICOP/icop-1.png"
                             style="object-position: center 50%;" loading="lazy" decoding="async"/>
                    </div>
                    <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(236,0,140,0.8), rgba(255,188,0,0.8))"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">International Community Outreach Program</h1>
                        <p class="text-white/80 text-lg max-w-3xl">Transform communities while transforming yourself through meaningful service learning in rural Indonesia.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="bg-transparent">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                        <!-- Program Overview -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-red/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Program Overview</h2>
                            <p class="text-gray-700 leading-relaxed mb-6">The International Community Outreach Program (COP) is an integrated service-learning program that combines academic study with meaningful community engagement. Students partner with local communities across rural Java to address real social challenges while developing cross-cultural competence, leadership skills, and global citizenship.</p>
                            <div class="grid md:grid-cols-3 gap-6 mt-8">
                                <div class="bg-white rounded-xl p-6 border border-pcu-gold/20">
                                    <div class="w-10 h-10 rounded-lg bg-pcu-gold/10 flex items-center justify-center mb-3">
                                        <i class="w-5 h-5 text-pcu-gold" data-lucide="calendar"></i>
                                    </div>
                                    <h3 class="font-semibold text-pcu-blue mb-1">Duration</h3>
                                    <p class="text-sm text-gray-600">2-8 weeks intensive immersion</p>
                                </div>
                                <div class="bg-white rounded-xl p-6 border border-pcu-gold/20">
                                    <div class="w-10 h-10 rounded-lg bg-pcu-gold/10 flex items-center justify-center mb-3">
                                        <i class="w-5 h-5 text-pcu-gold" data-lucide="map-pin"></i>
                                    </div>
                                    <h3 class="font-semibold text-pcu-blue mb-1">Location</h3>
                                    <p class="text-sm text-gray-600">Rural villages across East Java</p>
                                </div>
                                <div class="bg-white rounded-xl p-6 border border-pcu-gold/20">
                                    <div class="w-10 h-10 rounded-lg bg-pcu-gold/10 flex items-center justify-center mb-3">
                                        <i class="w-5 h-5 text-pcu-gold" data-lucide="users"></i>
                                    </div>
                                    <h3 class="font-semibold text-pcu-blue mb-1">Community Focus</h3>
                                    <p class="text-sm text-gray-600">Education, health, environment, livelihoods</p>
                                </div>
                            </div>
                        </div>

                        <!-- Program Pillars -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Four Pillars of COP</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="bg-white rounded-2xl p-8 border-l-4 border-pcu-blue">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-pcu-blue/10 flex items-center justify-center shrink-0">
                                            <i class="w-6 h-6 text-pcu-blue" data-lucide="brain"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-pcu-blue mb-2">Academic Learning</h3>
                                            <p class="text-gray-600">Interdisciplinary classroom study exploring development issues, cultural studies, and social entrepreneurship before field placement.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-8 border-l-4 border-pcu-red">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-pcu-red/10 flex items-center justify-center shrink-0">
                                            <i class="w-6 h-6 text-pcu-red" data-lucide="heart-handshake"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-pcu-blue mb-2">Service &amp; Social Action</h3>
                                            <p class="text-gray-600">Direct engagement with community partners on high-impact projects addressing local needs—education, health, environmental sustainability.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-8 border-l-4 border-pcu-gold">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-pcu-gold/10 flex items-center justify-center shrink-0">
                                            <i class="w-6 h-6 text-pcu-gold" data-lucide="globe"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-pcu-blue mb-2">Cultural Immersion</h3>
                                            <p class="text-gray-600">Live alongside Indonesian host families, learn the language, and deepen understanding of local values, traditions, and worldviews.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-8 border-l-4 border-teal-500">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                                            <i class="w-6 h-6 text-teal-600" data-lucide="zap"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-lg text-pcu-blue mb-2">Reflection &amp; Growth</h3>
                                            <p class="text-gray-600">Regular guided reflection on personal transformation, ethical leadership, and commitment to global social responsibility.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Focus Areas -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Focus Areas of Community Engagement</h2>
                            <div class="space-y-4">
                                <div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                            <i class="w-5 h-5 text-pcu-blue" data-lucide="book"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-pcu-blue mb-1">Education &amp; Youth Development</h3>
                                            <p class="text-gray-600">English language support, STEM mentoring, scholarship assistance, and skills training for underserved youth.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                            <i class="w-5 h-5 text-green-600" data-lucide="leaf"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-pcu-blue mb-1">Environmental Sustainability</h3>
                                            <p class="text-gray-600">Community-led conservation initiatives, waste management education, sustainable agriculture practices, and climate adaptation projects.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                                            <i class="w-5 h-5 text-red-600" data-lucide="heart"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-pcu-blue mb-1">Health &amp; Wellness</h3>
                                            <p class="text-gray-600">Health awareness campaigns, maternal and child health initiatives, nutrition education, and community health worker training.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                                            <i class="w-5 h-5 text-purple-600" data-lucide="briefcase"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-pcu-blue mb-1">Economic Empowerment &amp; Livelihoods</h3>
                                            <p class="text-gray-600">Microenterprise development, vocational training, women's economic cooperatives, and sustainable income generation initiatives.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="flex items-start gap-4">
                                        <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                            <i class="w-5 h-5 text-indigo-600" data-lucide="users"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-pcu-blue mb-1">Social Justice &amp; Rights</h3>
                                            <p class="text-gray-600">Advocacy for vulnerable populations, gender equality initiatives, and community empowerment for marginalized groups.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Program Timeline -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-red/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Typical Program Flow</h2>
                            <div class="space-y-6">
                                <div class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-2">1</div>
                                        <div class="w-0.5 h-16 bg-gradient-to-b from-pcu-sky to-gray-300"></div>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-pcu-blue text-lg mb-1">Pre-Departure Preparation (1-2 weeks)</h3>
                                        <p class="text-gray-600">Orientation on cultural sensitivity, Indonesian language basics, program objectives, and expectations. Team building and partner briefing.</p>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-2">2</div>
                                        <div class="w-0.5 h-16 bg-gradient-to-b from-pcu-sky to-gray-300"></div>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-pcu-blue text-lg mb-1">Community Integration (Days 1-3)</h3>
                                        <p class="text-gray-600">Arrival in host village, meet host family, community welcomes and orientation. Begin casual language practice and cultural learning.</p>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-2">3</div>
                                        <div class="w-0.5 h-16 bg-gradient-to-b from-pcu-sky to-gray-300"></div>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-pcu-blue text-lg mb-1">Active Service &amp; Learning (Days 4-End)</h3>
                                        <p class="text-gray-600">Daily project work with community partners. Regular classroom sessions with facilitated reflection. Evening cultural exchanges and language practice.</p>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-2">4</div>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-pcu-blue text-lg mb-1">Closing &amp; Reflection</h3>
                                        <p class="text-gray-600">Community celebration honoring partnership and friendships. Final reflection on personal transformation and commitments to continued impact.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- What You'll Gain -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">What You'll Gain</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="space-y-4">
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Cross-cultural competence</strong> — Deep understanding of Indonesian culture, values, and development context</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Leadership &amp; resilience</strong> — Navigate challenges, lead teams, adapt to new environments</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Practical skills</strong> — Project management, community engagement, language proficiency</span></div>
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Global citizenship</strong> — Commitment to social justice and sustainable development</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Meaningful relationships</strong> — Lasting friendships with Indonesian peers and global community partners</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700"><strong>Real impact</strong> — Contribute to sustainable development in partner communities</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Who Can Participate -->
                        <div class="mb-20 bg-white border-2 border-pcu-gold rounded-3xl p-12">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Who Can Participate?</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="user-check"></i> Requirements</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Currently enrolled student or recent graduate</li>
                                        <li>• Minimum age: 18 years old</li>
                                        <li>• Good physical and mental health</li>
                                        <li>• Commitment to service-learning principles</li>
                                        <li>• Flexibility and openness to new experiences</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="star"></i> Ideal Participants</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Passionate about social impact and development</li>
                                        <li>• Interested in cross-cultural learning</li>
                                        <li>• Problem solvers with adaptability</li>
                                        <li>• Team players with cultural sensitivity</li>
                                        <li>• Motivated by making a difference</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- How to Apply -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">How to Apply</h2>
                            <div class="grid md:grid-cols-4 gap-4 md:gap-2">
                                <div class="bg-white border-2 border-pcu-gold rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-4 mx-auto">1</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Complete Form</h3>
                                    <p class="text-sm text-gray-500">Submit COP application</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-gold"></div>
                                </div>
                                <div class="bg-white border-2 border-pcu-gold rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-4 mx-auto">2</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Essay &amp; References</h3>
                                    <p class="text-sm text-gray-500">Share your motivation</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-gold"></div>
                                </div>
                                <div class="bg-white border-2 border-pcu-gold rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-gold text-white flex items-center justify-center font-bold mb-4 mx-auto">3</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Interview</h3>
                                    <p class="text-sm text-gray-500">Meet with COP team</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-gold"></div>
                                </div>
                                <div class="bg-pcu-gold text-white rounded-2xl p-6 text-center">
                                    <div class="w-10 h-10 rounded-full bg-white text-pcu-gold flex items-center justify-center font-bold mb-4 mx-auto">
                                        <i class="w-5 h-5" data-lucide="check"></i>
                                    </div>
                                    <h3 class="font-semibold mb-2">Accepted!</h3>
                                    <p class="text-sm text-white/70">Begin your journey</p>
                                </div>
                            </div>
                        </div>

                        <!-- Program Costs -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-red/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Program Costs &amp; Support</h2>
                            <p class="text-gray-600 mb-8">COP offers flexible pricing based on program length and background of participants. Scholarships and financial aid available for eligible candidates.</p>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="bg-white rounded-2xl p-6 border border-pcu-gold/20">
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5 text-pcu-gold" data-lucide="check"></i> Included in Program Fee</h3>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• Accommodation with host family</li>
                                        <li>• All meals in community</li>
                                        <li>• Classroom instruction &amp; materials</li>
                                        <li>• Project supplies &amp; activities</li>
                                        <li>• Local transportation</li>
                                        <li>• Program staff support</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-2xl p-6 border border-pcu-gold/20">
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5 text-pcu-gold" data-lucide="info"></i> Your Responsibility</h3>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• International flights</li>
                                        <li>• Travel visa &amp; documents</li>
                                        <li>• Travel insurance</li>
                                        <li>• Personal items &amp; expenses</li>
                                        <li>• Optional cultural trips</li>
                                    </ul>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-8 p-4 bg-white rounded-xl border border-pcu-gold/10"><strong>Contact the International Office:</strong> io@petra.ac.id for current pricing, scholarship opportunities, and payment plans.</p>
                        </div>

                        <!-- CTA Section -->
                        <div class="bg-pcu-red rounded-3xl p-12 text-white text-center">
                            <h2 class="font-display text-3xl font-bold mb-3">Ready to Make a Difference?</h2>
                            <p class="text-white/80 mb-8 max-w-2xl mx-auto">Join the International Community Outreach Program and become part of a global movement toward sustainable development and social justice.</p>
                            <div class="flex flex-wrap justify-center gap-4">
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c446d] text-white font-semibold rounded-full hover:bg-[#163553] transition shadow-lg" href="#">
                                    Apply Now <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                </a>
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#">
                                    Get More Info
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
