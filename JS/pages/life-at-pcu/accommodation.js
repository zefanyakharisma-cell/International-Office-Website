// JS/pages/life at pcu/accommodation.js
function renderAccommodation() {
    return `
        <div class="page" id="page-accommodation">
            <div class="min-h-screen bg-gradient-to-b from-pcu-light/50 to-white" style="padding-top: 80px;">
                <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                    <div class="text-center mb-12 reveal">
                        <span class="inline-block px-4 py-1.5 bg-pcu-green/10 text-pcu-green text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Life at PCU</span>
                        <h1 class="font-display text-3xl md:text-5xl font-bold text-pcu-green mb-4">Accommodation</h1>
                        <p class="text-gray-500 text-lg max-w-3xl mx-auto">Information about student accommodation at Petra Christian University will be available soon. For now, this page gives an overview of the types of housing options international students can expect.</p>
                    </div>

                    <div class="grid lg:grid-cols-3 gap-6">
                        <div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
                            <h2 class="font-semibold text-pcu-green text-xl mb-3">Student Dorms</h2>
                            <p class="text-gray-600">On-campus or near-campus dormitories may be available for international students depending on availability.</p>
                        </div>
                        <div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
                            <h2 class="font-semibold text-pcu-green text-xl mb-3">Apartments</h2>
                            <p class="text-gray-600">Many students choose shared apartments close to campus and shopping centers for convenience.</p>
                        </div>
                        <div class="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
                            <h2 class="font-semibold text-pcu-green text-xl mb-3">Homestay</h2>
                            <p class="text-gray-600">Homestay options allow students to live with local families and experience Indonesian culture firsthand.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}
