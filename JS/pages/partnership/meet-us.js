// JS/pages/partnership/meet-us.js
function renderMeetUs() {
    return `
<div class="page" id="page-partnership-meet-us">
<div class="min-h-screen bg-white" style="padding-top: 80px;">
<div class="bg-gradient-to-r from-pcu-purple to-violet-500 py-20">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<a class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition" href="#" onclick="navigateTo('home');return false"><i class="w-4 h-4" data-lucide="arrow-left"></i> Back to Home</a>
<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
<div>
<h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Meet Us</h1>
<p class="text-white/75 text-lg max-w-3xl">Get to know Petra Christian University's partnership team and learn how we collaborate with international institutions.</p>
</div>
<a class="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-pcu-purple font-semibold rounded-full shadow-lg hover:bg-white/90 transition" href="mailto:head-partnership@petra.ac.id">Email Partnership Team</a>
</div>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
<div class="grid gap-6 lg:grid-cols-2 mb-16">
<div class="rounded-3xl border border-gray-100 bg-pcu-light p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue text-2xl mb-4">Partnership Office</h2>
<p class="text-gray-600 mb-4">The Partnership Office at Petra Christian University supports institutional collaboration, student mobility, academic exchange, and joint research projects with international partners.</p>
<p class="text-gray-600">If your institution is interested in working with PCU, our team is ready to help you explore opportunities in education, research, and community engagement.</p>
</div>
<div class="grid gap-6">
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<h3 class="font-semibold text-pcu-blue text-xl mb-4">Head of Partnership</h3>
<p class="text-gray-600 mb-3">For strategic partnership inquiries and institutional agreements.</p>
<p class="text-gray-700 font-medium">head-partnership@petra.ac.id</p>
</div>
<div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
<h3 class="font-semibold text-pcu-blue text-xl mb-4">Partnership Staff</h3>
<p class="text-gray-600 mb-3">For operational support, program coordination, and relationship management.</p>
<p class="text-gray-700 font-medium">staff-partnership@petra.ac.id</p>
</div>
</div>
</div>
<div class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm mb-16">
<h2 class="font-display text-3xl text-pcu-blue mb-4">Why Partner with Petra Christian University?</h2>
<div class="grid gap-6 md:grid-cols-3">
<div class="rounded-3xl bg-pcu-light p-6">
<h3 class="font-semibold text-pcu-blue mb-3">Academic Excellence</h3>
<p class="text-gray-600">PCU delivers internationally-minded education with strong academic and research programs.</p>
</div>
<div class="rounded-3xl bg-pcu-light p-6">
<h3 class="font-semibold text-pcu-blue mb-3">Global Network</h3>
<p class="text-gray-600">We collaborate with institutions across Asia and beyond to strengthen global mobility.</p>
</div>
<div class="rounded-3xl bg-pcu-light p-6">
<h3 class="font-semibold text-pcu-blue mb-3">Student Engagement</h3>
<p class="text-gray-600">Our partnerships support meaningful student exchange, internships, and service learning.</p>
</div>
</div>
</div>
<div class="grid gap-8 lg:grid-cols-2">
<div class="rounded-3xl border border-gray-100 bg-pcu-light p-8 shadow-sm">
<h2 class="font-display text-3xl text-pcu-blue mb-4">Partnership Types</h2>
<ul class="space-y-4 text-gray-600">
<li class="flex gap-3"><i class="w-5 h-5 text-pcu-blue mt-1" data-lucide="check-circle"></i> Academic exchange and curriculum collaboration</li>
<li class="flex gap-3"><i class="w-5 h-5 text-pcu-blue mt-1" data-lucide="check-circle"></i> Research partnerships and faculty mobility</li>
<li class="flex gap-3"><i class="w-5 h-5 text-pcu-blue mt-1" data-lucide="check-circle"></i> Internship cooperation and community engagement</li>
</ul>
</div>
<div class="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
<h2 class="font-display text-3xl text-pcu-blue mb-4">Partnership Information</h2>
<p class="text-gray-600 mb-4">Petra Christian University welcomes collaboration with universities, research institutions, and industry partners. Our mission is to create mutually beneficial programs that advance education, innovation, and global citizenship.</p>
<p class="text-gray-600">We are committed to building long-term relationships that support academic quality, intercultural learning, and social impact.</p>
</div>
</div>
</div>
</div>
</div>
    `;
}
