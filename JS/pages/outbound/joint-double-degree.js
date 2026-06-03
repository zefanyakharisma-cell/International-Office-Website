// JS/pages/outbound/joint-double-degree.js
function renderJointDoubleDegree() {
    return `
<div class="page" id="page-joint-double-degree">
<div style="padding-top: 80px;"><!-- Hero Section -->
<div class="relative overflow-hidden bg-gradient-to-r from-pcu-orange to-amber-400 py-16 md:py-24">
<div class="absolute inset-0">
<img alt="Gedung Petra" class="w-full h-full object-cover opacity-60" src="Assets/Images/Student%20Exchange/student-exchange-4.JPG" style="object-position: center 50%;" loading="lazy" decoding="async"/>
</div>
<div class="absolute inset-0 bg-gradient-to-r from-pcu-orange/70 to-amber-400/70"></div>
<div class="relative max-w-7xl mx-auto px-6 lg:px-8"><a class="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-4 hover:text-white transition" href="#" onclick="navigateTo('pcu-students');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Local Students</a>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Joint &amp; Double Degree Programs</h1>
<p class="text-white/80 text-lg max-w-3xl">Explore dual degree pathways that combine the best of PCU and leading international universities.</p>
</div>
</div><!-- Content Section -->
<div class="bg-transparent">
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-20"><!-- Program Type Selection -->
<div class="mb-20" id="selectionDiv">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12 text-center">Choose Your Path</h2>
<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
<!-- Joint Degree Option -->
<div class="program-card bg-white rounded-3xl overflow-hidden border-2 border-pcu-orange cursor-pointer group hover:shadow-xl transition" id="jointCard" onclick="showProgramType('joint')">
<div class="h-56 bg-gradient-to-br from-pcu-orange to-amber-400 flex items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div><i class="w-24 h-24 text-white/70 group-hover:scale-110 transition-transform duration-500" data-lucide="link"></i>
</div>
<div class="p-8">
<h2 class="font-display text-2xl font-bold text-pcu-blue mb-3">Joint Degree</h2>
<p class="text-gray-600 leading-relaxed mb-6">Earn one recognized degree awarded jointly by PCU and an international partner university. Complete part of your studies in Indonesia and part abroad.</p><span class="inline-flex items-center gap-2 px-6 py-3 bg-pcu-orange text-white font-semibold rounded-full group-hover:bg-amber-500 transition">Explore <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
</div>
</div><!-- Double Degree Option -->
<div class="program-card bg-white rounded-3xl overflow-hidden border-2 border-amber-400 cursor-pointer group hover:shadow-xl transition" id="doubleCard" onclick="showProgramType('double')">
<div class="h-56 bg-gradient-to-br from-pcu-orange to-amber-500 flex items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent)]"></div><i class="w-24 h-24 text-white/70 group-hover:scale-110 transition-transform duration-500" data-lucide="graduation-cap"></i>
</div>
<div class="p-8">
<h2 class="font-display text-2xl font-bold text-pcu-blue mb-3">Double Degree</h2>
<p class="text-gray-600 leading-relaxed mb-6">Earn two separate degrees: one from PCU and one from your partner university. Complete full programs at both institutions for dual credentials.</p><span class="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-white font-semibold rounded-full group-hover:bg-amber-500 transition">Explore <i class="w-4 h-4" data-lucide="arrow-right"></i></span>
</div>
</div>
</div>
</div><!-- Program Type Content -->
<div class="hidden" id="programContent">
<!-- Joint Degree Content -->
<div class="hidden" id="jointContent">
<!-- Back Button -->
<div class="mb-8"><button class="inline-flex items-center gap-1 text-pcu-blue text-sm font-medium hover:gap-2 transition-all" onclick="backToSelection()"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Selection</button>
</div><!-- Definition Section -->
<div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-blue/10">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">What is a Joint Degree?</h2>
<p class="text-gray-700 leading-relaxed mb-6">A Joint Degree is a single degree awarded by two universities (PCU and an international partner) to a student who has completed an integrated program of study. The degree recognizes the student's successful completion of requirements at both institutions and is officially conferred by both universities.</p>
<div class="grid md:grid-cols-2 gap-6 mt-8">
<div class="bg-white rounded-xl p-6 border border-pcu-blue/20">
<h3 class="font-semibold text-pcu-blue mb-3 flex items-center gap-2"><i class="w-5 h-5 text-pcu-gold" data-lucide="check"></i> Key Features</h3>
<ul class="space-y-2 text-sm text-gray-600">
<li>• One jointly awarded degree</li>
<li>• Integrated curriculum</li>
<li>• Study split between institutions</li>
<li>• Recognized by both universities</li>
<li>• Single graduation ceremony</li>
</ul>
</div>
<div class="bg-white rounded-xl p-6 border border-pcu-blue/20">
<h3 class="font-semibold text-pcu-blue mb-3 flex items-center gap-2"><i class="w-5 h-5 text-pcu-gold" data-lucide="award"></i> Benefits</h3>
<ul class="space-y-2 text-sm text-gray-600">
<li>• Streamlined program duration</li>
<li>• Dual academic perspectives</li>
<li>• International recognition</li>
<li>• Cost-effective pathway</li>
<li>• Enhanced global credentials</li>
</ul>
</div>
</div>
</div><!-- Joint Degree Programs -->
<div class="mb-20">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Joint Degree Programs Available</h2><!-- Dongseo University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Dongseo University</h3>
<p class="text-white/80">Busan, South Korea</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-red-600" data-lucide="book"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">English Department</h4>
<p class="text-sm text-gray-600">Study English language and literature with emphasis on cross-cultural communication and creative writing through both Indonesian and Korean perspectives.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">Language &amp; Literature</span> <span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-pink-600" data-lucide="microphone"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Communication Science</h4>
<p class="text-sm text-gray-600">Explore media, public relations, and communication strategies in a global context with hands-on experience in both Asian and Indonesian media landscapes.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-full font-medium">Media &amp; PR</span> <span class="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-orange-600" data-lucide="palette"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Interior Design</h4>
<p class="text-sm text-gray-600">Master interior design principles combining Indonesian aesthetic traditions with modern Korean design innovation and sustainable practices.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">Design &amp; Aesthetics</span> <span class="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-purple-600" data-lucide="pen-tool"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Visual Communication Design</h4>
<p class="text-sm text-gray-600">Develop expertise in graphic design, branding, and digital visual communication informed by both Indonesian and Korean creative industries.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium">Graphic Design</span> <span class="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- National Taiwan University of Science & Technology Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">National Taiwan University of Science &amp; Technology</h3>
<p class="text-white/80">Taipei, Taiwan</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-blue-600" data-lucide="building-2"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Civil Engineering</h4>
<p class="text-sm text-gray-600">Master structural design, construction management, and infrastructure development with emphasis on sustainable engineering practices in Asia-Pacific context.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">Undergraduate &amp; Master</span> <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">4+2 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Shanghai Normal University & Yangzhou University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-600 to-rose-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Shanghai Normal University &amp; Yangzhou University</h3>
<p class="text-white/80">Shanghai &amp; Yangzhou, China</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-red-600" data-lucide="book"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Chinese Department</h4>
<p class="text-sm text-gray-600">Study Mandarin language, Chinese culture, literature, and contemporary China through immersion in both Shanghai and Yangzhou cultural contexts.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">Language &amp; Culture</span> <span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- I-Shou University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">I-Shou University</h3>
<p class="text-white/80">Kaohsiung, Taiwan</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-purple-600" data-lucide="briefcase"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Master of Management</h4>
<p class="text-sm text-gray-600">Advanced business management program covering strategic planning, organizational behavior, and international business operations in the Asia-Pacific region.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium">Graduate Program</span> <span class="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium">2 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Saxion University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Saxion University</h3>
<p class="text-white/80">Enschede, Netherlands</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-green-600" data-lucide="handshake"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">International Business Management</h4>
<p class="text-sm text-gray-600">Develop global business leadership skills combining Indonesian business practices with Dutch innovation and European market perspectives.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">Business &amp; Management</span> <span class="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Nanjing University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Nanjing University of Aeronautics &amp; Astronautics</h3>
<p class="text-white/80">Nanjing, China</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-blue-600" data-lucide="zap"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Electrical Engineering</h4>
<p class="text-sm text-gray-600">Study electrical systems and power engineering with cutting-edge Chinese aerospace industry exposure and advanced laboratory facilities.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">Engineering</span> <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-teal-600" data-lucide="wrench"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Mechanical Engineering</h4>
<p class="text-sm text-gray-600">Master mechanical engineering design and manufacturing with emphasis on aerospace applications and sustainable engineering practices.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium">Engineering</span> <span class="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-indigo-600" data-lucide="cpu"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Informatics (Computer Science)</h4>
<p class="text-sm text-gray-600">Develop software engineering and computer systems expertise with access to China's tech innovation ecosystem and global software development practices.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">IT &amp; Software</span> <span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div><!-- Program Structure -->
<div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-blue/10">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Typical Joint Degree Structure</h2>
<div class="space-y-4">
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-2">
              1
             </div>
<div class="w-0.5 h-20 bg-gradient-to-b from-pcu-orange to-gray-300"></div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Year 1-2: Foundation at PCU</h3>
<p class="text-gray-600">Complete core curriculum and foundational courses at PCU in Surabaya. Develop language skills and cultural understanding.</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-2">
              2
             </div>
<div class="w-0.5 h-20 bg-gradient-to-b from-pcu-orange to-gray-300"></div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Year 3-4: Specialization at Partner University</h3>
<p class="text-gray-600">Complete specialized courses at Dongseo University or Nanjing University. Apply foundational knowledge in new context.</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-blue text-white flex items-center justify-center font-bold mb-2">
              ✓
             </div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Graduation with Joint Degree</h3>
<p class="text-gray-600">Receive single degree officially awarded by both PCU and partner university. Recognized globally.</p>
</div>
</div>
</div>
</div><!-- CTA -->
<div class="bg-gradient-to-r from-pcu-orange to-amber-400 rounded-3xl p-12 text-white text-center">
<h2 class="font-display text-3xl font-bold mb-3">Ready to Pursue a Joint Degree?</h2>
<p class="text-white/80 mb-8 max-w-2xl mx-auto">Combine the best of two worlds and earn an internationally recognized degree from PCU and our esteemed partners.</p>
<div class="flex flex-wrap justify-center gap-4"><a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5179d6] text-white font-semibold rounded-full hover:bg-[#3a5fb0] transition shadow-lg" href="#"> Apply Now <i class="w-4 h-4" data-lucide="arrow-right"></i> </a> <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#"> Get More Info </a>
</div>
</div>
</div><!-- Double Degree Content -->
<div class="hidden" id="doubleContent">
<!-- Back Button -->
<div class="mb-8"><button class="inline-flex items-center gap-1 text-pcu-blue text-sm font-medium hover:gap-2 transition-all" onclick="backToSelection()"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Selection</button>
</div><!-- Definition Section -->
<div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-blue/10">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-6">What is a Double Degree?</h2>
<p class="text-gray-700 leading-relaxed mb-6">A Double Degree program allows students to earn two separate but related degrees from two institutions. Students complete full degree requirements at both PCU and an international partner university, receiving two distinct diplomas recognized by each institution.</p>
<div class="grid md:grid-cols-2 gap-6 mt-8">
<div class="bg-white rounded-xl p-6 border border-pcu-sky/20">
<h3 class="font-semibold text-pcu-blue mb-3 flex items-center gap-2"><i class="w-5 h-5 text-pcu-sky" data-lucide="check"></i> Key Features</h3>
<ul class="space-y-2 text-sm text-gray-600">
<li>• Two separate degrees awarded</li>
<li>• Independent curriculums</li>
<li>• Extended study period</li>
<li>• Study time at both institutions</li>
<li>• Two graduation ceremonies</li>
</ul>
</div>
<div class="bg-white rounded-xl p-6 border border-pcu-sky/20">
<h3 class="font-semibold text-pcu-blue mb-3 flex items-center gap-2"><i class="w-5 h-5 text-pcu-sky" data-lucide="award"></i> Benefits</h3>
<ul class="space-y-2 text-sm text-gray-600">
<li>• Two internationally recognized credentials</li>
<li>• Deep expertise in two institutions</li>
<li>• Enhanced career opportunities</li>
<li>• Global professional network</li>
<li>• Maximum academic flexibility</li>
</ul>
</div>
</div>
</div><!-- Double Degree Programs -->
<div class="mb-20">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-12">Double Degree Programs Available</h2><!-- Dongseo University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Dongseo University</h3>
<p class="text-white/80">Busan, South Korea</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-pink-600" data-lucide="palette"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">International Program in Digital Media</h4>
<p class="text-sm text-gray-600">Comprehensive training in digital content creation, multimedia production, and creative storytelling combining Korean creative industry expertise with Indonesian market perspectives.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-full font-medium">Media &amp; Digital</span> <span class="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Nanjing University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Nanjing University of Aeronautics &amp; Astronautics</h3>
<p class="text-white/80">Nanjing, China</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-orange-600" data-lucide="wrench"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Industrial Engineering</h4>
<p class="text-sm text-gray-600">Master industrial systems, manufacturing optimization, and production management with exposure to advanced Chinese aerospace and manufacturing sectors.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">Engineering</span> <span class="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Fontys University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Fontys University of Applied Sciences</h3>
<p class="text-white/80">Eindhoven, Netherlands</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-blue-600" data-lucide="cpu"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Informatics (Computer Science)</h4>
<p class="text-sm text-gray-600">Advanced software engineering and IT systems combining Dutch innovation culture with practical application development in both Eastern and Western tech ecosystems.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">IT &amp; Software</span> <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- International Hotel Management Institute Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">International Hotel Management Institute</h3>
<p class="text-white/80">Switzerland</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-amber-600" data-lucide="building"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Hotel Management</h4>
<p class="text-sm text-gray-600">Prestigious hospitality management program combining Swiss hospitality excellence with international business practices and hands-on hotel operations experience.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">Hospitality</span> <span class="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">3-4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div><!-- Iowa State University Partnership -->
<div class="mb-12">
<div class="bg-gradient-to-r from-red-700 to-amber-700 rounded-2xl p-8 text-white mb-6">
<div class="flex items-center justify-between">
<div>
<h3 class="font-display text-2xl font-bold mb-2">Iowa State University</h3>
<p class="text-white/80">Ames, Iowa, United States</p>
</div><i class="w-12 h-12 text-white/50" data-lucide="globe"></i>
</div>
</div>
<div class="space-y-4">
<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
<i class="w-5 h-5 text-red-700" data-lucide="building-2"></i>
</div>
<div>
<h4 class="font-semibold text-pcu-blue mb-1">Civil Engineering</h4>
<p class="text-sm text-gray-600">Comprehensive civil engineering program combining American engineering standards with sustainable infrastructure development practices for tropical and developing regions.</p>
<div class="flex flex-wrap gap-2 mt-3">
<span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">Engineering</span> <span class="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium">4 Years</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div><!-- Program Structure -->
<div class="mb-20 bg-gradient-to-br from-pcu-light/50 to-white rounded-3xl p-12 border border-pcu-blue/10">
<h2 class="font-display text-2xl md:text-3xl font-bold text-pcu-blue mb-8">Typical Double Degree Structure</h2>
<div class="space-y-4">
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-sky text-white flex items-center justify-center font-bold mb-2">
              1
             </div>
<div class="w-0.5 h-20 bg-gradient-to-b from-pcu-orange to-gray-300"></div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Year 1-2: Foundation at PCU</h3>
<p class="text-gray-600">Complete core curriculum and foundational courses at PCU in Surabaya. Build strong academic foundation.</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-sky text-white flex items-center justify-center font-bold mb-2">
              2
             </div>
<div class="w-0.5 h-20 bg-gradient-to-b from-pcu-orange to-gray-300"></div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Year 3-4: Full Program at Partner University</h3>
<p class="text-gray-600">Complete remaining degree requirements at international partner. Earn independent degree from partner institution.</p>
</div>
</div>
<div class="flex gap-4">
<div class="flex flex-col items-center">
<div class="w-10 h-10 rounded-full bg-pcu-sky text-white flex items-center justify-center font-bold mb-2">
              ✓
             </div>
</div>
<div>
<h3 class="font-semibold text-pcu-blue text-lg mb-1">Two Separate Degrees Awarded</h3>
<p class="text-gray-600">Receive diplomas from both PCU and partner university. Distinct credentials for global opportunity.</p>
</div>
</div>
</div>
</div><!-- CTA -->
<div class="bg-gradient-to-r from-pcu-orange to-amber-400 rounded-3xl p-12 text-white text-center">
<h2 class="font-display text-3xl font-bold mb-3">Earn Two Degrees, Double Your Opportunities</h2>
<p class="text-white/80 mb-8 max-w-2xl mx-auto">Complete your double degree and gain credentials from two world-class institutions across different continents.</p>
<div class="flex flex-wrap justify-center gap-4"><a class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5179d6] text-white font-semibold rounded-full hover:bg-[#3a5fb0] transition shadow-lg" href="#"> Apply Now <i class="w-4 h-4" data-lucide="arrow-right"></i> </a> <a class="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition" href="#"> Get More Info </a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
    `;
}
