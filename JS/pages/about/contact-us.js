// JS/pages/about/contact-us.js
function renderContactUs() {
    return `
        <div class="page" id="page-contact-us">
            <div class="pt-24 pb-20 min-h-screen bg-gradient-to-b from-pcu-light/40 to-white">
                <div class="max-w-4xl mx-auto px-6 lg:px-8">

                    <!-- Header -->
                    <div class="text-center mb-14 reveal">
                        <span class="inline-block px-4 py-1.5 bg-pcu-navy/10 text-pcu-navy text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">International Office</span>
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-pcu-navy mb-5">Contact Us</h1>
                        <p class="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">For more information, please contact us here:</p>
                        <div class="w-16 h-1 bg-pcu-gold rounded-full mx-auto mt-6"></div>
                    </div>

                    <!-- Contact Cards -->
                    <div class="space-y-5 reveal">

                        <!-- Director -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-md hover:border-pcu-blue/20 transition">
                            <div class="w-14 h-14 rounded-2xl bg-pcu-blue flex items-center justify-center shrink-0">
                                <i class="w-7 h-7 text-white" data-lucide="crown"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-semibold text-pcu-gold uppercase tracking-wider mb-1">Director of International Office</p>
                                <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Dr. Leenawaty Limantara, Ph.D.</h3>
                            </div>
                            <a class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-sky transition whitespace-nowrap shrink-0"
                               href="mailto:io-director@petra.ac.id">
                                <i class="w-4 h-4" data-lucide="mail"></i> Email Me
                            </a>
                        </div>

                        <!-- Head of International Mobility -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-md hover:border-pcu-blue/20 transition">
                            <div class="w-14 h-14 rounded-2xl bg-pcu-sky flex items-center justify-center shrink-0">
                                <i class="w-7 h-7 text-white" data-lucide="users"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-semibold text-pcu-sky uppercase tracking-wider mb-1">Head of International Mobility &amp; Engagement</p>
                                <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Ms. Reny Novemsy Dese</h3>
                            </div>
                            <a class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-sky transition whitespace-nowrap shrink-0"
                               href="mailto:head-intprograms@petra.ac.id">
                                <i class="w-4 h-4" data-lucide="mail"></i> Email Me
                            </a>
                        </div>

                        <!-- Staff Inbound -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-md hover:border-pcu-blue/20 transition">
                            <div class="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0">
                                <i class="w-7 h-7 text-white" data-lucide="arrow-down-circle"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Staff for Inbound Programs</p>
                                <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Ms. Sylvie Chandra</h3>
                            </div>
                            <a class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-sky transition whitespace-nowrap shrink-0"
                               href="mailto:head-mobility@petra.ac.id">
                                <i class="w-4 h-4" data-lucide="mail"></i> Email Me
                            </a>
                        </div>

                        <!-- Staff Outbound -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-md hover:border-pcu-blue/20 transition">
                            <div class="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center shrink-0">
                                <i class="w-7 h-7 text-white" data-lucide="arrow-up-circle"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Staff for Outbound Programs</p>
                                <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Ms. Asti Kusumaningtyas</h3>
                            </div>
                            <a class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-sky transition whitespace-nowrap shrink-0"
                               href="mailto:staff-outbound@petra.ac.id">
                                <i class="w-4 h-4" data-lucide="mail"></i> Email Me
                            </a>
                        </div>

                        <!-- Staff Partnership -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-pcu-blue/20 transition">
                            <div class="flex flex-col sm:flex-row sm:items-start gap-5">
                                <div class="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0">
                                    <i class="w-7 h-7 text-white" data-lucide="handshake"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3">Staff for Partnership</p>
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                        <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Ms. Kezia Gloria Setiawati</h3>
                                    </div>
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <h3 class="font-semibold text-pcu-blue text-lg leading-tight">Mr. Zefanya Kharisma Nugroho</h3>
                                        <a class="inline-flex items-center gap-2 px-5 py-2.5 bg-pcu-blue text-white text-sm font-semibold rounded-full hover:bg-pcu-sky transition whitespace-nowrap shrink-0"
                                           href="mailto:staff-partnership@petra.ac.id">
                                            <i class="w-4 h-4" data-lucide="mail"></i> Email Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- General Contact Note -->
                    <div class="mt-10 text-center reveal">
                        <p class="text-gray-400 text-sm">
                            You can also reach our general office at
                            <a class="text-pcu-sky font-medium hover:underline" href="mailto:io@petra.ac.id">io@petra.ac.id</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    `;
}
