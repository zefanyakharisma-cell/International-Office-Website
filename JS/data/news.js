// JS/data/news.js
function renderNewsPage() {
    return `
<div class="page" id="page-news">
<div class="min-h-screen bg-gray-50" style="padding-top: 80px;">
<div class="relative w-full overflow-hidden" style="height: 380px;">
<div class="w-full h-full" id="newsCarouselContainer"></div>
<button aria-label="Previous news" class="carousel-nav left" id="newsCarouselPrev"><span class="text-2xl">‹</span></button>
<button aria-label="Next news" class="carousel-nav right" id="newsCarouselNext"><span class="text-2xl">›</span></button>
<div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20" id="carouselDots"></div>
</div>
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
<div class="grid lg:grid-cols-[1fr_300px] gap-10">
<div class="space-y-8">
<!-- SEARCH BAR -->
<div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
<div class="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
<i class="w-5 h-5 text-gray-400" data-lucide="search"></i>
<input class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400" id="newsSearchInput" placeholder="Search news &amp; updates..." type="text"/>
</div>
</div>
<!-- NEWS LIST -->
<div class="grid lg:grid-cols-2 gap-8" id="newsList"></div>
</div>
<aside class="space-y-6">
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue text-xl mb-4">Categories</h2>
<div class="space-y-3 text-sm text-gray-600" id="categoriesContainer"></div>
</div>
<div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
<h2 class="font-semibold text-pcu-blue text-xl mb-4">Trending</h2>
<ul class="space-y-4 text-sm" id="trendingContainer"></ul>
</div>
</aside>
</div>
</div>
</div>
</div>
    `;
}


