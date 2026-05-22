// JS/pages/home.js
function renderHomePage() {
    return `
        <div class="page active" id="page-home">

            <!-- HERO CAROUSEL -->
            <section class="relative z-10 w-full overflow-hidden" style="height: 600px; margin-top: 0; padding-top: 80px;">
                <div class="absolute inset-0" style="top: 80px;">
                    <div class="relative w-full h-full" id="heroCarousel">

                        <!-- Slide 1 -->
                        <div class="hero-slide active" style="background: linear-gradient(135deg, #0A2F6E 0%, #1E6FD9 60%, #3B82F6 100%);">
                            <div class="slide-bg" style="background-image:url('Assets/Images/Gedung Petra/Other/KJ &amp; Torso/IMG_6863.JPG');"></div>
                            <div class="absolute inset-0 flex items-center">
                                <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                                    <div class="max-w-2xl">
                                        <span class="inline-block px-4 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
                                            Petra Christian University
                                        </span>
                                        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" id="heroTitle">
                                            Your Gateway to<br/>Global Education
                                        </h1>
                                        <p class="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg" id="heroSubtitle">
                                            Discover world-class programs, vibrant campus life, and international opportunities at PCU.
                                        </p>
                                        <div class="flex flex-wrap gap-4">
                                            <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-pcu-blue font-semibold rounded-full hover:bg-pcu-gold hover:text-white transition shadow-xl"
                                               href="#" onclick="navigateTo('explore');return false">
                                                Explore Programs <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                            </a>
                                            <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c446d] border-transparent text-white font-semibold rounded-full hover:bg-[#163553] transition"
                                               href="#" onclick="navigateTo('explore');return false">
                                                Apply Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Decorative circles -->
                            <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5"></div>
                            <div class="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-white/5"></div>
                            <div class="absolute right-60 top-20 w-40 h-40 rounded-full border-2 border-white/10"></div>
                        </div>

                        <!-- Slide 2 -->
                        <div class="hero-slide" style="background: linear-gradient(135deg, #0B1D3A 0%, #0A2F6E 50%, #1E6FD9 100%);">
                            <div class="slide-bg" style="background-image:url('Assets/Images/Student Exchange/student-exchange-1.svg');"></div>
                            <div class="absolute inset-0 flex items-center">
                                <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                                    <div class="max-w-2xl">
                                        <span class="inline-block px-6 py-2 bg-pcu-yellow/30 border border-pcu-yellow text-pcu-yellow text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
                                            Student Exchange
                                        </span>
                                        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                                            Experience the<br/>World Together
                                        </h1>
                                        <p class="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                                            Join our semester exchange programs with 80+ partner universities across the globe.
                                        </p>
                                        <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-pcu-gold text-white font-semibold rounded-full hover:bg-yellow-500 transition shadow-xl"
                                           href="#" onclick="navigateTo('semester-exchange');return false">
                                            Learn More <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="absolute -right-10 top-1/4 w-80 h-80 rounded-full bg-pcu-gold/5"></div>
                        </div>

                        <!-- Slide 3 -->
                        <div class="hero-slide" style="background: linear-gradient(135deg, #1E6FD9 0%, #3B82F6 50%, #60A5FA 100%);">
                            <div class="slide-bg" style="background-image:url('Assets/Images/ICOP/icop-1.png');"></div>
                            <div class="absolute inset-0 flex items-center">
                                <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                                    <div class="max-w-2xl">
                                        <span class="inline-block px-4 py-1.5 bg-white/15 backdrop-blur text-white text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
                                            Community Outreach
                                        </span>
                                        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                                            Make an Impact<br/>Globally
                                        </h1>
                                        <p class="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                                            Engage in meaningful community service while experiencing Indonesian culture.
                                        </p>
                                        <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-pcu-blue font-semibold rounded-full hover:bg-pcu-light transition shadow-xl"
                                           href="#" onclick="navigateTo('intl-students');return false">
                                            Discover More <i class="w-4 h-4" data-lucide="arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="absolute right-10 bottom-20 w-72 h-72 rounded-full border-2 border-white/10"></div>
                        </div>

                    </div>
                    <button aria-label="Previous slide" class="carousel-nav left" id="heroPrev">&#8249;</button>
                    <button aria-label="Next slide" class="carousel-nav right" id="heroNext">&#8250;</button>
                    <!-- Dots -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10" id="heroDots"></div>
                </div>
            </section>

            <!-- FACTS & FIGURES -->
            <section class="py-20 bg-gradient-to-b from-pcu-light/40 to-white">
                <div class="max-w-7xl mx-auto px-6 lg:px-8">
                    <div class="text-center mb-14 reveal">
                        <span class="inline-block px-6 py-3 bg-gray-200 text-pcu-navy text-xs font-semibold rounded-2xl mb-4 uppercase tracking-wider">Facts &amp; Figures</span>
                        <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-navy" id="statsHeading">PCU in Numbers</h2>
                    </div>
                    <div class="grid grid-cols-2 gap-6 reveal">

                        <!-- Top 100 -->
                        <div class="bg-pcu-yellow rounded-2xl p-8 text-center shadow-md border border-pcu-yellow/20 col-span-2 flex flex-col items-center justify-center min-h-full">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                <i class="w-8 h-8 text-white" data-lucide="award"></i>
                            </div>
                            <div class="text-3xl md:text-4xl font-bold text-white leading-tight">Top 100 University</div>
                            <div class="text-base text-white mt-2 leading-relaxed">QS South-Eastern Asia University Ranking 2026</div>
                        </div>

                        <!-- Active Students -->
                        <div class="flip-card bg-pcu-blue rounded-2xl shadow-sm border border-gray-100">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-blue rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="users"></i>
                                    </div>
                                    <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="4734">0</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Active Students</div>
                                </div>
                                <div class="flip-card-back bg-pcu-blue/10">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-white mb-3">Student Breakdown</div>
                                        <div class="text-sm text-white space-y-1">
                                            <div>4528 Bachelor students</div>
                                            <div>152 Masters students</div>
                                            <div>54 Post-Doctorate students</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- International Partners -->
                        <div class="flip-card bg-pcu-magenta rounded-2xl shadow-sm border border-gray-100" onclick="navigateTo('international-partnership')">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-magenta rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="globe"></i>
                                    </div>
                                    <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="184">0</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">International Partners</div>
                                </div>
                                <div class="flip-card-back bg-pcu-magenta/10">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-white mb-2">International Partner List</div>
                                        <div class="text-sm text-white mb-3">More about our international partnerships</div>
                                        <div class="grid grid-cols-4 gap-3 items-center justify-items-center">
                                            <img alt="Anhui University" class="w-10 h-10 object-contain" src="Assets/Images/Logo/China/Anhui University, China.jpg"/>
                                            <img alt="FPNU" class="w-10 h-10 object-contain" src="Assets/Images/Logo/China/Fujian Polytechnic Normal University (FPNU), China.jpg"/>
                                            <img alt="Sophia University" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Japan/Sophia University, Japan.png"/>
                                            <img alt="Meiji University" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Japan/Meiji University, Japan.png"/>
                                            <img alt="Fontys University" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Netherlands/Fontys University of Applied Sciences, The Netherlands.png"/>
                                            <img alt="Saxion University" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Netherlands/Saxion University of Applied Sciences, the Netherlands.png"/>
                                            <img alt="Hochschule Fresenius" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Germany/Hochschule Fresenius University of Applied Sciences, Germany.png"/>
                                            <img alt="Hochschule Mainz" class="w-10 h-10 object-contain" src="Assets/Images/Logo/Germany/Hochschule Mainz - University of Applied Sciences, Germany.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Founded -->
                        <div class="flip-card bg-pcu-green rounded-2xl shadow-sm border border-gray-100">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-green rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="calendar"></i>
                                    </div>
                                    <div class="text-3xl md:text-4xl font-bold text-white">1961</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Founded</div>
                                </div>
                                <div class="flip-card-back bg-pcu-green/10">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-white mb-1">Our History</div>
                                        <div class="text-sm text-white leading-relaxed">
                                            Petra Christian University was founded in 1961 by the Petra Foundation to serve Indonesia through faith-based education. Today it is recognized as a leading private university with strong academic excellence and Christian character.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- National Partners -->
                        <div class="flip-card bg-pcu-yellow rounded-2xl shadow-sm border border-gray-100" onclick="navigateTo('domestic-partnership')">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-yellow rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="building-2"></i>
                                    </div>
                                    <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="430">0</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">National Partners</div>
                                </div>
                                <div class="flip-card-back bg-pcu-yellow/10">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-white mb-2">Domestic Partnership</div>
                                        <div class="text-sm text-white mb-3">Click to learn more about our domestic partnerships</div>
                                        <div class="grid grid-cols-5 gap-2 items-center justify-items-center">
                                            <img alt="Tokopedia" class="w-10 h-10 object-contain" src="Assets/Images/Industries/PT Tokopedia.png"/>
                                            <img alt="GoTo Gojek" class="w-10 h-10 object-contain" src="Assets/Images/Industries/PT GoTo Gojek Tokopedia Tbk.svg"/>
                                            <img alt="Semen Indonesia" class="w-10 h-10 object-contain" src="Assets/Images/Industries/PT. Semen Indonesia (Persero) Tbk..svg"/>
                                            <img alt="JW Marriott" class="w-10 h-10 object-contain" src="Assets/Images/Industries/JW Marriott Hotel Surabaya.svg"/>
                                            <img alt="Mayapada Hospital" class="w-10 h-10 object-contain" src="Assets/Images/Industries/Mayapada Hospital.png"/>
                                            <img alt="Wings Group" class="w-10 h-10 object-contain" src="Assets/Images/Industries/Wings Group Surabaya.png"/>
                                            <img alt="Maspion Group" class="w-10 h-10 object-contain" src="Assets/Images/Industries/Maspion Group.jpg"/>
                                            <img alt="Samator Group" class="w-10 h-10 object-contain" src="Assets/Images/Industries/Samator Group.jpg"/>
                                            <img alt="Bank Jatim" class="w-10 h-10 object-contain" src="Assets/Images/Industries/PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim).jpg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Alumni -->
                        <div class="bg-pcu-purple rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                            <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                <i class="w-7 h-7 text-white" data-lucide="network"></i>
                            </div>
                            <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="52860">0</div>
                            <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Petranesian Alumni</div>
                        </div>

                        <!-- Study Programs -->
                        <div class="flip-card bg-pcu-red rounded-2xl shadow-sm border border-gray-100">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-red rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="book-open"></i>
                                    </div>
                                    <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="57">0</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Study Programs</div>
                                </div>
                                <div class="flip-card-back bg-pcu-red/10">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-white mb-2">Program Highlights</div>
                                        <div class="text-sm text-white space-y-1">
                                            <div>Engineering &amp; Technology</div>
                                            <div>Business &amp; Management</div>
                                            <div>Humanities &amp; Arts</div>
                                            <div>Health Sciences</div>
                                            <div>Social Sciences</div>
                                            <div>And many more...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Faculties -->
                        <div class="flip-card bg-pcu-blue rounded-2xl shadow-sm border border-gray-100">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-blue rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="layers"></i>
                                    </div>
                                    <div class="counter text-3xl md:text-4xl font-bold text-white" data-target="7">0</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Faculties</div>
                                </div>
                                <div class="flip-card-back bg-pcu-blue/10 overflow-y-auto p-6 justify-start">
                                    <div class="space-y-4 text-left">
                                        <div class="text-lg font-bold text-white mb-4">Our Faculties</div>
                                        <div class="space-y-4">
                                            <div class="flex items-start gap-4">
                                                <img alt="Faculty of Civil Engineering and Planning" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Faculty/Faculty of Civil Engineering and Planning.svg"/>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/faculty/ftsp" target="_blank">Faculty of Civil Engineering and Planning</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <img alt="Faculty of Industrial Technology" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Faculty/Faculty of Industrial Technology.svg"/>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/faculty/fti" target="_blank">Faculty of Industrial Technology</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <img alt="School of Business Management" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Faculty/School of Business &amp; Management.svg"/>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/faculty/sbm" target="_blank">School of Business Management</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <img alt="Faculty of Humanities and Creative Industries" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Faculty/Faculty of Humanities and Creative Industries.svg"/>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/fhik" target="_blank">Faculty of Humanities and Creative Industries</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <div class="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                                    <i class="w-6 h-6 text-gray-400" data-lucide="activity"></i>
                                                </div>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/fkg" target="_blank">Faculty of Dentistry</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <div class="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                                    <i class="w-6 h-6 text-gray-400" data-lucide="heart"></i>
                                                </div>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/fk" target="_blank">Faculty of Medicine</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <img alt="Faculty of Teacher Education" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Faculty/Faculty of Teacher Education.svg"/>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/fkip" target="_blank">Faculty of Teacher Education</a>
                                                </div>
                                            </div>
                                            <div class="flex items-start gap-4">
                                                <div class="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                                                    <i class="w-6 h-6 text-gray-400" data-lucide="briefcase"></i>
                                                </div>
                                                <div>
                                                    <a class="font-semibold text-white hover:text-white/80" href="https://petra.ac.id/pbs" target="_blank">Petra Business School</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Accreditation -->
                        <div class="flip-card bg-pcu-yellow rounded-2xl shadow-sm border border-gray-100">
                            <div class="flip-card-inner">
                                <div class="flip-card-front bg-pcu-yellow rounded-2xl p-6 text-center">
                                    <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                                        <i class="w-7 h-7 text-white" data-lucide="award"></i>
                                    </div>
                                    <div class="text-3xl md:text-4xl font-bold text-white">A</div>
                                    <div class="text-xs text-white mt-1 uppercase tracking-wider font-medium">Excellent Accreditation</div>
                                </div>
                                <div class="flip-card-back bg-pcu-yellow/10 overflow-y-auto p-6">
                                    <div class="space-y-4 text-left">
                                        <div class="flex items-start gap-4">
                                            <img alt="BAN-PT" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Accreditation/Ban-Pt_edit.png"/>
                                            <div>
                                                <div class="font-semibold text-white">Terakreditasi Unggul</div>
                                                <div class="text-sm text-white">BAN-PT</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <img alt="AQAS" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Accreditation/AQAS-02.png"/>
                                            <div>
                                                <div class="font-semibold text-white">Accreditation agency based in Germany</div>
                                                <div class="text-sm text-white">Visual Communication Design, Interior Design</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <img alt="AUN-QA" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Accreditation/aun-qa.png"/>
                                            <div>
                                                <div class="font-semibold text-white">ASEAN University Network-Quality Assurance</div>
                                                <div class="text-sm text-white">Architecture, Accounting, Management, and Communication Science</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <img alt="IABEE" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Accreditation/IABEE Logo_Acc_Program_ENG.png"/>
                                            <div>
                                                <div class="font-semibold text-white">Full signatory member of Washington Accord</div>
                                                <div class="text-sm text-white">Civil Engineering, Electrical Engineering, Mechanical Engineering, Industrial Engineering, Informatics</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <img alt="KAAB" class="w-12 h-12 object-contain rounded-lg bg-white p-2" src="Assets/Images/Accreditation/KAAB.png"/>
                                            <div>
                                                <div class="font-semibold text-white">A signatory member of Korea Architectural Accrediting Board</div>
                                                <div class="text-sm text-white">Architecture (Bachelor's and Postgraduate Programs)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- STUDY AT PCU -->
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-6 lg:px-8">
                    <div class="text-center mb-14 reveal">
                        <span class="inline-block px-6 py-3 bg-gray-200 text-pcu-navy text-xs font-semibold rounded-2xl mb-4 uppercase tracking-wider">Programs</span>
                        <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-navy" id="studyHeading">Study at PCU</h2>
                        <p class="text-gray-500 mt-3 max-w-xl mx-auto">Explore a wide range of international academic programs tailored for global learners.</p>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">

                        <div class="program-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" onclick="navigateTo('semester-exchange')">
                            <div class="h-44 bg-slate-100 overflow-hidden relative">
                                <img alt="Semester Exchange" class="w-full h-full object-cover" src="Assets/Images/Student Exchange/student-exchange-2.JPG"/>
                                <div class="absolute inset-0 bg-pcu-blue/30"></div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-semibold text-lg text-pcu-navy mb-2">Semester Exchange</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">Spend a semester at PCU and immerse yourself in Indonesian academic culture.</p>
                                <span class="inline-flex items-center gap-1 text-pcu-sky text-sm font-medium mt-4 hover:gap-2 transition-all">Learn more <i class="w-3.5 h-3.5" data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="program-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" onclick="navigateTo('intl-degree')">
                            <div class="h-44 bg-slate-100 overflow-hidden relative">
                                <img alt="International Degree Program" class="w-full h-full object-cover" src="Assets/Images/Student Exchange/student-exchange-3.jpg"/>
                                <div class="absolute inset-0 bg-pcu-sky/30"></div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-semibold text-lg text-pcu-navy mb-2">International Degree Program</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">Complete your full degree at PCU with world-class education and global perspectives.</p>
                                <span class="inline-flex items-center gap-1 text-pcu-sky text-sm font-medium mt-4 hover:gap-2 transition-all">Learn more <i class="w-3.5 h-3.5" data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="program-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" onclick="navigateTo('cop')">
                            <div class="h-44 bg-slate-100 overflow-hidden relative">
                                <img alt="International Community Outreach Program" class="w-full h-full object-cover" src="Assets/Images/ICOP/icop-1.png"/>
                                <div class="absolute inset-0 bg-pcu-yellow/30"></div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-semibold text-lg text-pcu-navy mb-2">International Community Outreach Program</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">Service learning combining academic development with social impact in rural Indonesian communities.</p>
                                <span class="inline-flex items-center gap-1 text-pcu-sky text-sm font-medium mt-4 hover:gap-2 transition-all">Learn more <i class="w-3.5 h-3.5" data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="program-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" onclick="navigateTo('joint-double-degree')">
                            <div class="h-44 bg-slate-100 overflow-hidden relative">
                                <img alt="Joint/Double Degree" class="w-full h-full object-cover" src="Assets/Images/Student Exchange/student-exchange-4.JPG"/>
                                <div class="absolute inset-0 bg-pcu-purple/30"></div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-semibold text-lg text-pcu-navy mb-2">Joint/Double Degree</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">Earn degrees from PCU and a partner university simultaneously.</p>
                                <span class="inline-flex items-center gap-1 text-pcu-sky text-sm font-medium mt-4 hover:gap-2 transition-all">Learn more <i class="w-3.5 h-3.5" data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="program-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer" onclick="navigateTo('pcu-students')">
                            <div class="h-44 bg-slate-100 overflow-hidden relative">
                                <img alt="Internship" class="w-full h-full object-cover" src="Assets/Images/Student Exchange/student-exchange-5.jpg"/>
                                <div class="absolute inset-0 bg-pcu-green/30"></div>
                            </div>
                            <div class="p-6">
                                <h3 class="font-semibold text-lg text-pcu-navy mb-2">Internship</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">Gain international work experience through our global internship network.</p>
                                <span class="inline-flex items-center gap-1 text-pcu-sky text-sm font-medium mt-4 hover:gap-2 transition-all">Learn more <i class="w-3.5 h-3.5" data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <div class="program-card rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center p-8"
                             style="background: linear-gradient(to right, #245484, #133256);"
                             onclick="navigateTo('explore')">
                            <div class="text-center text-white">
                                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                                    <i class="w-8 h-8" data-lucide="compass"></i>
                                </div>
                                <h3 class="font-semibold text-xl mb-2">Explore All Programs</h3>
                                <p class="text-white/70 text-sm">Find the right opportunity for your academic journey.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- NEWS -->
            <section class="py-20 bg-gray-50">
                <div class="max-w-7xl mx-auto px-6 lg:px-8">
                    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 reveal gap-6">
                        <div>
                            <span class="inline-block px-6 py-3 bg-gray-200 text-pcu-navy text-xs font-semibold rounded-2xl mb-4 uppercase tracking-wider">Latest Updates</span>
                            <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-navy" id="newsHeading">PCU International News</h2>
                            <p class="max-w-2xl text-gray-600 mt-3">Read the latest stories, partnership announcements, and student achievements from Petra Christian University.</p>
                        </div>
                        <a class="inline-flex items-center gap-1 text-pcu-sky font-medium text-sm hover:gap-2 transition-all"
                           href="#" onclick="navigateTo('news');return false">
                            View All News <i class="w-4 h-4" data-lucide="arrow-right"></i>
                        </a>
                    </div>
                    <div class="grid lg:grid-cols-3 gap-6 reveal" id="homeNews"></div>
                </div>
            </section>

            <!-- DOWNLOAD CENTER -->
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-6 lg:px-8">
                    <div class="text-center mb-12 reveal">
                        <span class="inline-block px-6 py-3 bg-gray-200 text-pcu-navy text-xs font-semibold rounded-2xl mb-4 uppercase tracking-wider">Resources</span>
                        <h2 class="font-display text-3xl md:text-4xl font-bold text-pcu-navy">Download Center</h2>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto reveal">

                        <a class="bg-pcu-blue/10 rounded-2xl p-8 text-center program-card block border border-pcu-blue/10 hover:shadow-lg transition-all"
                           download="" href="https://canva.link/internationalstudentsguidebookpetra">
                            <img alt="International Students Guidebook thumbnail" class="mx-auto mb-5 w-32 h-32 rounded-3xl border border-white/20 shadow-sm" src="Assets/Images/Thumbnails/International Students Guidebook.png"/>
                            <h3 class="font-semibold text-pcu-navy text-lg mb-2">International Students Guidebook</h3>
                            <p class="text-sm text-gray-500 mb-5">Everything you need to know about studying at PCU.</p>
                            <span class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-navy text-white text-sm font-medium rounded-full">
                                <i class="w-4 h-4" data-lucide="download"></i> Download PDF
                            </span>
                        </a>

                        <a class="bg-pcu-blue/10 rounded-2xl p-8 text-center program-card block border border-pcu-blue/10 hover:shadow-lg transition-all"
                           download="" href="https://canva.link/partnershipbookletpetra">
                            <img alt="PCU Global Booklet thumbnail" class="mx-auto mb-5 w-32 h-32 rounded-3xl border border-white/20 shadow-sm" src="Assets/Images/Thumbnails/PCU Global Booklet.png"/>
                            <h3 class="font-semibold text-pcu-navy text-lg mb-2">PCU Global Booklet</h3>
                            <p class="text-sm text-gray-500 mb-5">Explore our international partnerships and programs.</p>
                            <span class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-navy text-white text-sm font-medium rounded-full">
                                <i class="w-4 h-4" data-lucide="download"></i> Download PDF
                            </span>
                        </a>

                    </div>
                </div>
            </section>

        </div>
    `;
}
