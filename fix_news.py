#!/usr/bin/env python3
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the gradient banner with carousel
old_banner = r'''     <div class="bg-gradient-to-r from-pcu-blue to-pcu-sky py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
       <a href="#" onclick="navigateTo('home');return false" class="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white transition"><i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Home</a>
       <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">News & Updates Carousel</h1>
       <p class="text-white/75 text-lg max-w-3xl">Stay informed about PCU Global's latest announcements, events, and international activities.</p>
      </div>
     </div>'''

new_carousel = '''     <!-- NEWS CAROUSEL HERO -->
     <div class="relative w-full h-96 bg-pcu-blue overflow-hidden">
      <div id="newsCarouselContainer" class="relative w-full h-full"></div>
      <button id="newsCarouselPrev" class="carousel-nav left" aria-label="Previous news"><span class="text-2xl">‹</span></button>
      <button id="newsCarouselNext" class="carousel-nav right" aria-label="Next news"><span class="text-2xl">›</span></button>
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10" id="carouselDots"></div>
     </div>'''

content = content.replace(old_banner, new_carousel)

# Write back the file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Fixed the News & Updates page!")
