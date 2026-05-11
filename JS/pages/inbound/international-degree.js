// JS/pages/inbound/international-degree.js
function renderIntlDegree() {
    return `
        <div class="page" id="page-intl-degree">
            <div style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-gradient-to-r from-pcu-sky to-cyan-400 py-16 md:py-24">
                    <div class="absolute inset-0">
                        <img alt="International Degree Program" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/Student%20Exchange/student-exchange-3.jpg"
                             style="object-position: center 50%;"/>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-pcu-sky/80 to-cyan-400/80"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">International Degree Program</h1>
                        <p class="text-white/80 text-lg max-w-3xl">Pursue your complete undergraduate degree at Petra Christian University with world-class education and global perspectives across 9 specialized departments.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="bg-transparent">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                        <!-- Overview Cards -->
                        <div class="mb-20">
                            <div class="grid md:grid-cols-3 gap-8 mb-12">
                                <div class="bg-pcu-purple/20 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-blue/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-blue" data-lucide="book-open"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Full Bachelor's Degree</h3>
                                    <p class="text-gray-600">Complete a comprehensive 4-year program with internationally recognized credentials.</p>
                                </div>
                                <div class="bg-pcu-purple/20 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-blue/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-blue" data-lucide="globe"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">9 Departments</h3>
                                    <p class="text-gray-600">Choose from specialized programs across multiple faculties and schools.</p>
                                </div>
                                <div class="bg-pcu-purple/20 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-blue/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-blue" data-lucide="sparkles"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">English-Taught</h3>
                                    <p class="text-gray-600">Curriculum delivered in English for international student accessibility.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Available Programs -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">9 Departments Ready to Host You</h2>
                            <div class="space-y-6">

                                <!-- Faculty of Industrial Technology -->
                                <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="bg-gradient-to-r from-indigo-600 to-pcu-blue p-6 text-white">
                                        <h3 class="font-semibold text-lg flex items-center gap-2"><i class="w-5 h-5" data-lucide="wrench"></i> Faculty of Industrial Technology</h3>
                                    </div>
                                    <div class="p-6">
                                        <div class="space-y-3">
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-blue mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Business Engineering</strong> — Combines engineering principles with global business perspectives</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Faculty of Humanities and Creative Industries -->
                                <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="bg-gradient-to-r from-pcu-sky to-blue-400 p-6 text-white">
                                        <h3 class="font-semibold text-lg flex items-center gap-2"><i class="w-5 h-5" data-lucide="palette"></i> Faculty of Humanities &amp; Creative Industries</h3>
                                    </div>
                                    <div class="p-6">
                                        <div class="space-y-3">
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-sky mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>English for Creative Industry</strong> — Language skills for creative professionals</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-sky mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>English for Business</strong> — Business communication and global commerce</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-sky mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>Chinese</strong> — Mandarin language and cross-cultural studies</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-sky mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Program in Digital Media</strong> — Digital content creation and multimedia</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- School of Business and Management -->
                                <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div class="bg-gradient-to-r from-pcu-gold to-yellow-500 p-6 text-white">
                                        <h3 class="font-semibold text-lg flex items-center gap-2"><i class="w-5 h-5" data-lucide="briefcase"></i> School of Business &amp; Management (Petra Business School)</h3>
                                    </div>
                                    <div class="p-6">
                                        <div class="space-y-3">
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-gold mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Business Accounting</strong> — Global accounting standards and practices</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-gold mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Trade &amp; Finance</strong> — International commerce and financial systems</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-gold mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Business Management</strong> — Strategic business leadership</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-gold mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>International Digital Accounting &amp; Fraud Detection</strong> — Modern accounting with forensic focus</span>
                                            </div>
                                            <div class="flex items-start gap-3">
                                                <span class="inline-block w-2 h-2 rounded-full bg-pcu-gold mt-2 shrink-0"></span>
                                                <span class="text-gray-700"><strong>Global Entrepreneurship &amp; Innovation</strong> — Startup creation and business development</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Program Highlights -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-sky/10 to-white rounded-3xl p-12 border border-pcu-sky/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Program Highlights</h2>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="space-y-4">
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Rigorous 4-year curriculum with internationally recognized standards</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Immersion in Indonesian culture and society</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Access to state-of-the-art facilities and laboratories</span></div>
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Networking with international student community</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Support from dedicated International Office team</span></div>
                                    <div class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span class="text-gray-700">Internship opportunities with local and international organizations</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Admission Requirements -->
                        <div class="mb-20 bg-white border-2 border-pcu-blue rounded-3xl p-12">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Admission Requirements</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="user-check"></i> Academic</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• High school diploma or equivalent</li>
                                        <li>• Minimum GPA: 2.75 or equivalent</li>
                                        <li>• Strong academic record in core subjects</li>
                                        <li>• Proof of graduation from accredited institution</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="language"></i> English Proficiency</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• TOEFL iBT: 70+ or equivalent</li>
                                        <li>• IELTS: 6.0+ or equivalent</li>
                                        <li>• English language interview may be required</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Section -->
                        <div class="bg-gradient-to-r from-pcu-sky to-cyan-400 rounded-3xl p-12 text-white text-center">
                            <h2 class="font-display text-3xl font-bold mb-3">Begin Your Degree at PCU</h2>
                            <p class="text-white/80 mb-8 max-w-2xl mx-auto">Join our diverse community of international students and earn your degree from one of Indonesia's premier universities.</p>
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
