// JS/pages/inbound/semester-exchange.js
function renderSemesterExchange() {
    return `
        <div class="page" id="page-semester-exchange">
            <div style="padding-top: 80px;">

                <!-- Hero Section -->
                <div class="relative overflow-hidden bg-gradient-to-r from-pcu-sky to-cyan-400 py-16 md:py-24">
                    <div class="absolute inset-0">
                        <img alt="Gedung Petra" class="w-full h-full object-cover opacity-60"
                             src="Assets/Images/Student%20Exchange/student-exchange-1.svg"
                             style="object-position: center 5%;"/>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-pcu-sky/80 to-cyan-400/80"></div>
                    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition"
                           href="#" onclick="navigateTo('home');return false">
                            <i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home
                        </a>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Semester Exchange Program</h1>
                        <p class="text-white/80 text-lg max-w-3xl">Experience global education by spending a semester at Petra Christian University. Immerse yourself in Indonesian culture while earning academic credits.</p>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="bg-transparent">
                    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

                        <!-- Program Overview -->
                        <div class="mb-20">
                            <div class="grid md:grid-cols-3 gap-8 mb-12">
                                <div class="bg-pcu-blue/10 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-blue/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-blue" data-lucide="calendar"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Duration</h3>
                                    <p class="text-gray-600">One full semester (approximately 4-5 months)</p>
                                </div>
                                <div class="bg-pcu-blue/10 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-sky/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-sky" data-lucide="book-open"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Credits</h3>
                                    <p class="text-gray-600">Transfer credits back to your home university</p>
                                </div>
                                <div class="bg-pcu-blue/10 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="w-12 h-12 rounded-xl bg-pcu-gold/20 flex items-center justify-center mb-4">
                                        <i class="w-6 h-6 text-pcu-gold" data-lucide="globe"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg text-pcu-blue mb-2">Location</h3>
                                    <p class="text-gray-600">Surabaya, Indonesia - a vibrant coastal city</p>
                                </div>
                            </div>
                            <div class="prose prose-lg max-w-none">
                                <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Program Highlights</h2>
                                <ul class="space-y-4 text-gray-600 mb-8">
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span>Choose from courses across 8 faculties with English-taught options</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span>Access to world-class facilities including library, sports, and lab facilities</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span>Accommodation assistance and networking with international student community</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span>Cultural activities and weekend excursions exploring Indonesia</span></li>
                                    <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-blue shrink-0 mt-1" data-lucide="check-circle"></i> <span>Dedicated support from the International Office</span></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Eligibility Section -->
                        <div class="mb-20 bg-gradient-to-br from-pcu-sky/10 to-white rounded-3xl p-12 border border-pcu-sky/10">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">Eligibility Requirements</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="user-check"></i> Academic</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• Currently enrolled student at partner university</li>
                                        <li>• Minimum GPA of 2.7 or equivalent</li>
                                        <li>• Completed at least 1 year of studies</li>
                                        <li>• Good standing with home institution</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4 flex items-center gap-2"><i class="w-5 h-5" data-lucide="language"></i> English Proficiency</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li>• TOEFL iBT: 60+ or equivalent</li>
                                        <li>• IELTS: 5.5+ or equivalent</li>
                                        <li>• Assessed during application if needed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Application Process -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Application Process</h2>
                            <div class="grid md:grid-cols-5 gap-4 md:gap-2">
                                <div class="bg-white border-2 border-pcu-blue rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-4 mx-auto">1</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Submit Application</h3>
                                    <p class="text-sm text-gray-500">Complete online form</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-blue"></div>
                                </div>
                                <div class="bg-white border-2 border-pcu-blue rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-4 mx-auto">2</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Submit Documents</h3>
                                    <p class="text-sm text-gray-500">Transcript &amp; passport copy</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-blue"></div>
                                </div>
                                <div class="bg-white border-2 border-pcu-blue rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-4 mx-auto">3</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Admission Review</h3>
                                    <p class="text-sm text-gray-500">2-4 weeks processing</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-blue"></div>
                                </div>
                                <div class="bg-white border-2 border-pcu-blue rounded-2xl p-6 text-center relative">
                                    <div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-4 mx-auto">4</div>
                                    <h3 class="font-semibold text-pcu-blue mb-2">Acceptance Letter</h3>
                                    <p class="text-sm text-gray-500">Receive official offer</p>
                                    <div class="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-r-2 border-b-2 border-pcu-blue"></div>
                                </div>
                                <div class="bg-pcu-blue text-white rounded-2xl p-6 text-center">
                                    <div class="w-10 h-10 rounded-full bg-white text-pcu-blue flex items-center justify-center font-bold mb-4 mx-auto">
                                        <i class="w-5 h-5" data-lucide="plane"></i>
                                    </div>
                                    <h3 class="font-semibold mb-2">Arrive at PCU</h3>
                                    <p class="text-sm text-white/70">Begin your journey</p>
                                </div>
                            </div>
                        </div>

                        <!-- Costs Section -->
                        <div class="mb-20 bg-white border-2 border-pcu-blue rounded-3xl p-12">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Costs &amp; Fees</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4">What's Included</h3>
                                    <ul class="space-y-3 text-gray-600">
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-sky shrink-0 mt-0.5" data-lucide="check"></i> <span>Tuition for all courses</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-sky shrink-0 mt-0.5" data-lucide="check"></i> <span>Access to library &amp; facilities</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-sky shrink-0 mt-0.5" data-lucide="check"></i> <span>Student ID &amp; transcript</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-sky shrink-0 mt-0.5" data-lucide="check"></i> <span>Cultural orientation program</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-pcu-blue mb-4">Student Responsibility</h3>
                                    <ul class="space-y-3 text-gray-600">
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-0.5" data-lucide="info"></i> <span>Accommodation &amp; meals</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-0.5" data-lucide="info"></i> <span>Flight &amp; visa costs</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-0.5" data-lucide="info"></i> <span>Travel insurance</span></li>
                                        <li class="flex items-start gap-3"><i class="w-5 h-5 text-pcu-gold shrink-0 mt-0.5" data-lucide="info"></i> <span>Personal expenses</span></li>
                                    </ul>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-xl"><strong>Note:</strong> Please contact the International Office for current tuition rates and detailed cost breakdown for your specific exchange period.</p>
                        </div>

                        <!-- Student Testimonials -->
                        <div class="mb-20">
                            <h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Student Experiences</h2>
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="bg-blue/10 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="flex gap-1 mb-4">
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                    </div>
                                    <p class="text-gray-700 mb-4 italic">"My semester at PCU was transformative. The faculty was supportive, and I made lifelong friends from around the world. Indonesian hospitality is real!"</p>
                                    <p class="font-semibold text-pcu-blue">Emma Rodriguez</p>
                                    <p class="text-sm text-gray-500">University of Madrid, Spain</p>
                                </div>
                                <div class="bg-blue/10 rounded-2xl p-8 border border-pcu-blue/10">
                                    <div class="flex gap-1 mb-4">
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                        <i class="w-4 h-4 text-pcu-gold fill-pcu-gold" data-lucide="star"></i>
                                    </div>
                                    <p class="text-gray-700 mb-4 italic">"The International Office was incredibly helpful with everything from visa issues to finding accommodation. I felt welcomed from day one."</p>
                                    <p class="font-semibold text-pcu-blue">Michael Chen</p>
                                    <p class="text-sm text-gray-500">National Taiwan University</p>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Section -->
                        <div class="bg-gradient-to-r from-pcu-sky to-cyan-400 rounded-3xl p-12 text-white text-center">
                            <h2 class="font-display text-3xl font-bold mb-3">Ready to Start Your Journey?</h2>
                            <p class="text-white/80 mb-8 max-w-2xl mx-auto">Join hundreds of students from around the world who have experienced transformative semesters at Petra Christian University.</p>
                            <div class="flex flex-wrap justify-center gap-4">
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c446d] text-white font-semibold rounded-full hover:bg-[#163553] transition shadow-lg" href="#">
                                    Apply Now <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                </a>
                                <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#">
                                    Contact Us
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}
