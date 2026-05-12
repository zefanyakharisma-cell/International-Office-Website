// Main Application Script
// ---- CONFIG & SDK ----
const defaultConfig = {
  hero_title: 'Your Gateway to Global Education',
  hero_subtitle: 'Discover world-class programs, vibrant campus life, and international opportunities at PCU.',
  stats_heading: 'PCU in Numbers',
  study_heading: 'Study at PCU',
  news_heading: 'PCU International News',
  background_color: '#FFFFFF',
  surface_color: '#E8F0FE',
  text_color: '#0A2F6E',
  primary_action_color: '#1E6FD9',
  secondary_action_color: '#D4A843',
  font_family: 'DM Sans',
  font_size: 16
};

function applyConfig(config) {
  const el = (id) => document.getElementById(id);
  if (el('heroTitle')) el('heroTitle').textContent = config.hero_title || defaultConfig.hero_title;
  if (el('statsHeading')) el('statsHeading').textContent = config.stats_heading || defaultConfig.stats_heading;
  if (el('studyHeading')) el('studyHeading').textContent = config.study_heading || defaultConfig.study_heading;
  if (el('newsHeading')) el('newsHeading').textContent = config.news_heading || defaultConfig.news_heading;

  const bg = config.background_color || defaultConfig.background_color;
  const surface = config.surface_color || defaultConfig.surface_color;
  const text = config.text_color || defaultConfig.text_color;
  const primary = config.primary_action_color || defaultConfig.primary_action_color;
  const secondary = config.secondary_action_color || defaultConfig.secondary_action_color;
  const font = config.font_family || defaultConfig.font_family;
  const size = config.font_size || defaultConfig.font_size;

  document.documentElement.style.setProperty('--bg', bg);
  document.body.style.fontFamily = `${font}, DM Sans, sans-serif`;
  document.body.style.fontSize = `${size}px`;

  document.querySelectorAll('.font-display').forEach(el => {
    el.style.fontFamily = `Playfair Display, ${font}, serif`;
  });
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_title', config.hero_title || defaultConfig.hero_title],
      ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
      ['stats_heading', config.stats_heading || defaultConfig.stats_heading],
      ['study_heading', config.study_heading || defaultConfig.study_heading],
      ['news_heading', config.news_heading || defaultConfig.news_heading]
    ])
  });
}

// ---- NAVIGATION ----
function navigateTo(pageId, { updateHash = true } = {}) {
  // Inject admin article page on-demand if not yet in DOM
  if (pageId.startsWith('admin-news-') && typeof injectAdminArticlePage === 'function') {
    const article = (window.allNews || []).find(a => a.id === pageId);
    if (article) injectAdminArticlePage(article);
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  } else {
    document.getElementById('page-home')?.classList.add('active');
    pageId = 'home';
  }
  document.getElementById('app').scrollTop = 0;
  if (updateHash) {
    history.pushState(null, '', '#' + pageId);
  }
  // Track visits for article pages
  if (pageId.startsWith('news-') || pageId.startsWith('admin-news-')) {
    trackArticleVisit(pageId);
  }
  // Refresh trending list whenever the news page is opened
  if (pageId === 'news') {
    setTimeout(renderTrending, 60);
  }
  // Re-trigger reveal animations
  setTimeout(initRevealObserver, 100);
  setTimeout(() => lucide.createIcons(), 50);
  // Lazy render new pages
  if (pageId === 'outbound-semester-exchange') {
    setTimeout(() => { loadOsePrograms(); }, 60);
  }
  // Show/hide OSE manager FAB
  const oseFab = document.getElementById('oseManagerFabBtn');
  if (oseFab) {
    if (pageId === 'outbound-semester-exchange' && typeof isAdminLoggedIn === 'function' && isAdminLoggedIn()) {
      oseFab.classList.remove('hidden');
    } else {
      oseFab.classList.add('hidden');
    }
  }
  if (pageId === 'internship') {
    setTimeout(() => { renderIndustryPartners(); renderInternshipOpportunities(); }, 60);
  }
}

window.addEventListener('hashchange', () => {
  const pageId = window.location.hash.slice(1) || 'home';
  navigateTo(pageId, { updateHash: false });
});

// ---- ARTICLE VISIT TRACKING ----
function trackArticleVisit(id) {
  if (!id.startsWith('news-') && !id.startsWith('admin-news-')) return;
  // Fire-and-forget; optimistically update local count for instant trending refresh
  fetch(`https://international-office-website-production.up.railway.app/api/articles/${id}/visit`, { method: 'POST' }).catch(() => {});
  const article = (window.allNews || []).find(a => a.id === id);
  if (article) {
    article.visits = (article.visits || 0) + 1;
    renderTrending();
  }
}

function renderTrending() {
  const container = document.getElementById('trendingContainer');
  if (!container) return;

  const ranked = [...(window.allNews || [])]
    .sort((a, b) => (b.visits || 0) - (a.visits || 0))
    .slice(0, 5);

  if (ranked.length === 0) {
    container.innerHTML = '<li class="text-gray-400 italic">No articles yet.</li>';
    return;
  }

  container.innerHTML = ranked.map((a, i) => `
    <li>
      <a href="#" onclick="navigateTo('${a.id}');return false;"
         class="flex items-start gap-3 group hover:text-pcu-blue transition">
        <span class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-pcu-blue/10 text-pcu-blue text-xs font-bold flex items-center justify-center">${i + 1}</span>
        <span class="text-gray-600 group-hover:text-pcu-blue leading-snug">${a.title}</span>
      </a>
    </li>`).join('');
}

// ---- PROGRAM TYPE SELECTION ----
function showProgramType(type) {
  const programContent = document.getElementById('programContent');
  const jointContent = document.getElementById('jointContent');
  const doubleContent = document.getElementById('doubleContent');
  const jointCard = document.getElementById('jointCard');
  const doubleCard = document.getElementById('doubleCard');
  const selectionDiv = document.getElementById('selectionDiv');
  
  // Slide out the cards
  jointCard.classList.add('slide-out');
  doubleCard.classList.add('slide-out');
  
  // Hide selection div and show content after animation
  setTimeout(() => {
    selectionDiv.style.display = 'none';
    programContent.classList.remove('hidden');
    programContent.classList.add('slide-in');
    
    if (type === 'joint') {
      jointContent.classList.remove('hidden');
      doubleContent.classList.add('hidden');
    } else if (type === 'double') {
      doubleContent.classList.remove('hidden');
      jointContent.classList.add('hidden');
    }
    
    // Scroll to content
    programContent.scrollIntoView({ behavior: 'smooth' });
    lucide.createIcons();
  }, 600);
}

function backToSelection() {
  const programContent = document.getElementById('programContent');
  const jointContent = document.getElementById('jointContent');
  const doubleContent = document.getElementById('doubleContent');
  const jointCard = document.getElementById('jointCard');
  const doubleCard = document.getElementById('doubleCard');
  const selectionDiv = document.getElementById('selectionDiv');
  
  // Slide out content
  programContent.classList.add('slide-out');
  
  // Show selection div and slide in the cards
  selectionDiv.style.display = 'block';
  jointCard.classList.remove('slide-out');
  doubleCard.classList.remove('slide-out');
  
  // Hide content after animation
  setTimeout(() => {
    programContent.classList.add('hidden');
    programContent.classList.remove('slide-in', 'slide-out');
    jointContent.classList.add('hidden');
    doubleContent.classList.add('hidden');
    selectionDiv.scrollIntoView({ behavior: 'smooth' });
  }, 600);
}

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ---- HERO CAROUSEL ----
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('heroDots');
const prevBtn = document.getElementById('heroPrev');
const nextBtn = document.getElementById('heroNext');
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  currentSlide = n;
  slides[n].classList.add('active');
  dotsContainer.children[n].classList.add('active');
}

prevBtn.onclick = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);
nextBtn.onclick = () => goToSlide((currentSlide + 1) % slides.length);

setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (!target || el.dataset.done) return;
    el.dataset.done = '1';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current + (target > 50 ? '+' : '');
    }, 25);
  });
}

// ---- SCROLL REVEAL ----
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.querySelector('.counter')) animateCounters();
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ---- NAV SCROLL SHADOW ----
document.getElementById('app').addEventListener('scroll', function() {
  document.getElementById('mainNav').classList.toggle('nav-scrolled', this.scrollTop > 10);
});

// ---- NEWS DATA ----
// staticNews holds the built-in articles; allNews is rebuilt dynamically by admin.js
window.staticNews = [];
// allNews starts as staticNews; admin.js refreshNewsData() updates window.allNews at runtime
window.allNews = [...window.staticNews];
var allNews = window.allNews; // alias for legacy references below

// Country to flag mapping
const countryFlags = {
  'Australia': 'australia-flag.svg',
  'Bangladesh': 'bangladesh-flag.svg',
  'Cambodia': 'cambodia-flag.svg',
  'Canada': 'canada-flag.svg',
  'China': 'china-flag.svg',
  'France': 'france-flag.svg',
  'Germany': 'germany-flag.svg',
  'Hong Kong': 'hongkong-flag.svg',
  'Hungary': 'hungary-flag.svg',
  'India': 'india-flag.svg',
  'Ireland': 'ireland-flag.svg',
  'Japan': 'japan-flag.svg',
  'Latvia': 'latvia-flag.svg',
  'Lithuania': 'lithuania-flag.svg',
  'Macau': 'macau-flag.svg',
  'Malaysia': 'malaysia-flag.svg',
  'Mongolia': 'mongolia-flag.svg',
  'Netherlands': 'netherlands-flag.svg',
  'New Zealand': 'new zealand-flag.svg',
  'Philippines': 'philippines-flag.svg',
  'Poland': 'poland-flag.svg',
  'Portugal': 'portugal-flag.svg',
  'Romania': 'romania-flag.svg',
  'Singapore': 'singapore-flag.svg',
  'South Korea': 'south korea-flag.svg',
  'Switzerland': 'switzerland-flag.svg',
  'Taiwan': 'taiwan-flag.svg',
  'Thailand': 'thailand-flag.svg',
  'Timor Leste': 'timor-leste-flag.svg',
  'United Arab Emirates': 'united arab emirates-flag.svg',
  'United Kingdom': 'united kingdom--flag.svg',
  'United States': 'united states of america-flag.svg',
  'United States of America': 'united states of america-flag.svg'
};

const institutionLogos = {
  'Philippines': {
    'Bicol University': 'Assets/Images/Logo/Philippines/Bicol University, Phillipines.jpg',
    'Camarines Sur Polytechnic Colleges': 'Assets/Images/Logo/Philippines/Camarines Sur Polytechnic Colleges, Philippines.png',
    'Central Bicol State University of Agriculture San Jose': 'Assets/Images/Logo/Philippines/Central Bicol State University of Agriculture San Jose, Philippines.png',
    'Central Philippine University': 'Assets/Images/Logo/Philippines/Central Philippine University, Philippines.png',
    'Iloilo Science and Technolgy University': 'Assets/Images/Logo/Philippines/Iloilo Science and Technolgy University, Philippines.png',
    'Northwest Samar State University': 'Assets/Images/Logo/Philippines/Northwest Samar State University, Philippines.jpg',
    'Panpacific University': 'Assets/Images/Logo/Philippines/Panpacific University, Philippines.png',
    'Philippine Christian University': 'Assets/Images/Logo/Philippines/Philippine Christian University, Philippine.png',
    'Philippine Normal University': 'Assets/Images/Logo/Philippines/Philippine Normal University, Philippines.png',
    'Samar State University': 'Assets/Images/Logo/Philippines/Samar State University, Philippines.jpg',
    'Silliman University': 'Assets/Images/Logo/Philippines/Silliman University, Philippines.png',
    'University of Mindanao': 'Assets/Images/Logo/Philippines/University of Mindanao, Philippines.png',
    'University of St. La Salle': 'Assets/Images/Logo/Philippines/University of St. La Salle.png',
    'University of the East': 'Assets/Images/Logo/Philippines/University of the East.png',
  },
  'Malaysia': {
    'Asia Pacific University of Technology & Innovation (APU)': 'Assets/Images/Logo/Malaysia/Asia Pacific University of Technology & Innovation (APU), Malaysia.png',
    'Holiday Inn Melaka': 'Assets/Images/Logo/Malaysia/Holiday Inn Melaka.jpg',
    'INTI International University': 'Assets/Images/Logo/Malaysia/INTI International University, Malaysia.jpg',
    'Sunway University': 'Assets/Images/Logo/Malaysia/Sunway University SDN BHD.jpg',
    'Tunku Abdul Rahman University of Management and Technology (TARUMT)': 'Assets/Images/Logo/Malaysia/Tunku Abdul Rahman University of Management and Technology (TARUMT), Malaysia.png',
    'UCSI University': 'Assets/Images/Logo/Malaysia/UCSI University, Malaysia.jpg',
    'Universiti Malaysia Perlis (UniMAP)': 'Assets/Images/Logo/Malaysia/Universiti Malaysia Perlis (UniMAP), Malaysia.png',
    'Universiti Malaysia Sarawak (UNIMAS)': 'Assets/Images/Logo/Malaysia/Universiti Malaysia Sarawak (UNIMAS), Malaysia.png',
    'Universiti Sains Malaysia (USM)': 'Assets/Images/Logo/Malaysia/Universiti Sains Malaysia (USM), Malaysia.jpg',
    'Universiti Teknologi MARA (UiTM)': 'Assets/Images/Logo/Malaysia/Universiti Teknologi MARA (UiTM), Malaysia.png',
    'Universiti Tun Hussein Onn Malaysia (UTHM)': 'Assets/Images/Logo/Malaysia/Universiti Tun Hussein Onn Malaysia (UTHM), Malaysia.png',
    'Universiti Tunku Abdul Rahman (UTAR)': 'Assets/Images/Logo/Malaysia/Universiti Tunku Abdul Rahman (UTAR), Malaysia.jpg',
  },
  'China': {
    'Anhui University': "Assets/Images/Logo/China/Anhui University, China.jpg",
    'Beijing University of Posts and Telecommunication (School of Humanities) (BUPT)': 'Assets/Images/Logo/China/Beijing University of Posts and Telecommunication (School of Humanities) (BUPT), Beijing.png',
    'Chaoshan Vocational and Technical College': 'Assets/Images/Logo/China/Chaoshan Vocational and Technical College, China.jpg',
    'Fujian Polytechnic Normal University (FPNU)': 'Assets/Images/Logo/China/Fujian Polytechnic Normal University (FPNU), China.jpg',
    'Guangdong University of Foreign Studies (GDUFS)': 'Assets/Images/Logo/China/Guangdong University of Foreign Studies (GDUFS), China.png',
    'Guangdong University of Science and Technology (GDUT)': 'Assets/Images/Logo/China/Guangdong University of Science and Technology (GDUT), China.png',
    'Guangxi Normal University': 'Assets/Images/Logo/China/Guangxi Normal University, P. R. China.png',
    'Guangzhou College of Commerce, (GCC)': 'Assets/Images/Logo/China/Guangzhou College of Commerce, (GCC), China.jpg',
    'Guangzhou Huanan Business College': 'Assets/Images/Logo/China/Guangzhou Huanan Business College, China.jpg',
    'Guangzhou Nanyang Polytechnic College': 'Assets/Images/Logo/China/Guangzhou Nanyang Polytechnic College, China.jpg',
    'Hua Qiao University': 'Assets/Images/Logo/China/Hua Qiao University, Quanzhou, P. R. China.jpg',
    'Hunan City University': 'Assets/Images/Logo/China/Hunan City University, China.png',
    'Nanjing University of Aeronautics and Astronautics (NUAA)': 'Assets/Images/Logo/China/Nanjing University of Aeronautics and Astronautics (NUAA), China.png',
    'School of Economics, Fudan University': 'Assets/Images/Logo/China/School of Economics, Fudan University, China.png',
    'Tianjin Foreign Studies University (TFSU)': 'Assets/Images/Logo/China/Tianjin Foreign Studies University (TFSU), China.jpg',
    'University of Saint Joseph': 'Assets/Images/Logo/China/University of Saint Joseph, Macau.jpg',
    'Xi\'an Jiaotong-Liverpool University (XJTLU)': 'Assets/Images/Logo/China/Xi\'an Jiaotong-Liverpool University (XJTLU), China.png',
    'Yangzhou University': 'Assets/Images/Logo/China/Yangzhou University, China.png',
    'Zhejiang Yuexiu University of Foreign Languages': 'Assets/Images/Logo/China/Zhejiang Yuexiu University of Foreign Languages, China.jpg'
  },
  'South Korea': {
    'Yonsei University': 'Assets/Images/Logo/South Korea/Yonsei University, Korea.png',
    'Dankook University': 'Assets/Images/Logo/South Korea/Dankook University (DKU), Korea.png',
    'Woosong University': 'Assets/Images/Logo/South Korea/Woosong University, Rep. of Korea.png',
    'Busan University of Foreign Studies': 'Assets/Images/Logo/South Korea/Busan University of Foreign Studies, Korea.jpg',
    'Hankuk University of Foreign Studies': 'Assets/Images/Logo/South Korea/Hankuk University of Foreign Studies, Korea.png',
    'Hannam University': 'Assets/Images/Logo/South Korea/Hannam University, Korea.jpg',
    'Keimyung University': 'Assets/Images/Logo/South Korea/Keimyung University, Korea.jpg',
    'Soongsil University': 'Assets/Images/Logo/South Korea/Soongsil University, Seoul, Korea.png',
    'Myongji University': 'Assets/Images/Logo/South Korea/Myongji University, Korea.png',
    'Solbridge International School of Business': 'Assets/Images/Logo/South Korea/SolBridge International School of Business (Woosong University), Korea.png'
  },
  'Japan': {
    'Asia University': 'Assets/Images/Logo/Japan/Asia University, Japan.png',
    'Clark Memorial International High School': 'Assets/Images/Logo/Japan/Clark Memorial International High School, Japan.png',
    'International Christian University (ICU)': 'Assets/Images/Logo/Japan/International Christian University (ICU), Japan.jpg',
    'Josai International University': 'Assets/Images/Logo/Japan/Josai International University, Japan.jpg',
    'International Pacific University (IPU)': 'Assets/Images/Logo/Japan/International Pacific University (IPU), Japan.png',
    'Kaichi International University': 'Assets/Images/Logo/Japan/Kaichi International University, Japan.png',
    'Kansai Gaidai University': 'Assets/Images/Logo/Japan/Kansai Gaidai University, Japan.jpg',
    'Kansai University of International Studies': 'Assets/Images/Logo/Japan/Kansai University of International Studies, Japan.png',
    'Kwansei Gakuin University': 'Assets/Images/Logo/Japan/Kwansei Gakuin University, Japan.png',
    'Meiji University': 'Assets/Images/Logo/Japan/Meiji University, Japan.png',
    'Momoyama Gakuin University': 'Assets/Images/Logo/Japan/Momoyama Gakuin University, Japan.png',
    'Nihon University': 'Assets/Images/Logo/Japan/Nihon University, Japan.jpg',
    'Shizuoka University': 'Assets/Images/Logo/Japan/Shizuoka University, Japan.jpeg',
    'Sophia University': 'Assets/Images/Logo/Japan/Sophia University, Japan.png',
    'University of Niigata Prefecture': 'Assets/Images/Logo/Japan/University of Niigata Perfecture, Japan.jpeg'
  },
  'Australia': {
    'Macquarie University': 'Assets/Images/Logo/Australia/Macquarie University, Australia.png',
    'Monash University': 'Assets/Images/Logo/Australia/Monash University, Australia.png',
    'Queensland University of Technology': 'Assets/Images/Logo/Australia/Queensland University of Technology (QUT), Australia.jpg',
    'University of Tasmania': 'Assets/Images/Logo/Australia/University of Tasmania, Australia.png'
  },
  'Bangladesh': {
    'Daffodil International University': 'Assets/Images/Logo/Bangladesh/Daffodil International University, Bangladesh.png',
    'Southern University Bangladesh': 'Assets/Images/Logo/Bangladesh/Southern University Bangladesh.jpg'
  },
  'Cambodia': {
    'Cambodian University for Specialties (CUS)': 'Assets/Images/Logo/Cambodia/Cambodian University for Specialties (CUS), Cambodia.png',
    'National University of Management (NUM)': 'Assets/Images/Logo/Cambodia/National University of Management (NUM), Cambodia.jpg',
    'Royal University of Phnom Penh (RUPP)': 'Assets/Images/Logo/Cambodia/Royal University of Phnom Penh (RUPP), Cambodia.png',
    'University of Puthisastra': 'Assets/Images/Logo/Cambodia/University of Puthisastra, Cambodia.jpg'
  },
  'Canada': {
    'University of the Fraser Valley (UFV)': 'Assets/Images/Logo/Canada/University of the Fraser Valley (UFV), Canada.png'
  },
  'France': {
    'Rennes School of Business': 'Assets/Images/Logo/France/Rennes School of Business, France.jpg'
  },
  'Germany': {
    'Hochschule Fresenius University of Applied Sciences': 'Assets/Images/Logo/Germany/Hochschule Fresenius University of Applied Sciences, Germany.png',
    'Hochschule Mainz - University of Applied Sciences': 'Assets/Images/Logo/Germany/Hochschule Mainz - University of Applied Sciences, Germany.png',
    'Osnabrück University of Applied Sciences': 'Assets/Images/Logo/Germany/Osnabru╠êck University of Applied Sciences, Germany (Faculty of Business Management and Social Sciences).png',
    'Univeristy of Applied Sciences Darmstadt': 'Assets/Images/Logo/Germany/Univeristy of Applied Sciences Darmstadt (Hochschule Darmstadt) (h_da), Germany.png'
  },
  'Hong Kong': {
    'Centennial College': 'Assets/Images/Logo/Hong Kong/Centennial College, Hong Kong.jpg',
    'City University of Hong Kong (CityU)': 'Assets/Images/Logo/Hong Kong/City University of Hong Kong (CityU), Hong Kong.jpg',
    'Lingnan University': 'Assets/Images/Logo/Hong Kong/Lingnan University, Hongkong.png',
    'The Education University of Hongkong': 'Assets/Images/Logo/Hong Kong/The Education University of Hongkong, Hongkong.png'
  },
  'Hungary': {
    'Budapest University of Technology and Economics': 'Assets/Images/Logo/Hungary/Budapest University of Technology and Economics, Hungary.jpg'
  },
  'India': {
    'Assam Down Town University': 'Assets/Images/Logo/India/Assam Down Town University, India.png',
    'Lady Doak College': 'Assets/Images/Logo/India/Lady Doak College, India.jpg',
    'Vellore Institute of Technology (VIT)': 'Assets/Images/Logo/India/Vellore Institute of Technology (VIT), India.png',
    'VIT Bhopal University': 'Assets/Images/Logo/India/VIT Bhopal University, India.png',
    'VIT-AP University': 'Assets/Images/Logo/India/VIT-AP University, India.png'
  },
  'Ireland': {
    'Athlone Institute of Technology': 'Assets/Images/Logo/Ireland/Athlone Institute of Technology, Irlandia.jpg'
  },
  'Lithuania': {
    'Mykolas Romeris University': 'Assets/Images/Logo/Lithuania/Mykolas Romeris University, Lithuania.png'
  },
  'Macau': {
    'Macau Millennium College (MMC)': 'Assets/Images/Logo/Macau/Macau Millennium College (MMC), Macau.png',
    'Macau University of Science and Technology': 'Assets/Images/Logo/Macau/Macau University of Science and Technology, Macau.png'
  },
  'Mongolia': {
    'German-Mongolian Institute for Resources and Technology (GMIT)': 'Assets/Images/Logo/Mongolia/German-Mongolian Institute for Resources and Technology (GMIT), Mongolia.png',
    'Huree University of Information and Communication Technology': 'Assets/Images/Logo/Mongolia/Huree University of Information and Communication Technology, Mongolia.jpg'
  },
  'Netherlands': {
    'Fontys University of Applied Sciences': 'Assets/Images/Logo/Netherlands/Fontys University of Applied Sciences, The Netherlands.png',
    'Saxion University of Applied Sciences': 'Assets/Images/Logo/Netherlands/Saxion University of Applied Sciences, the Netherlands.png'
  },
  'New Zealand': {
    'Massey University': 'Assets/Images/Logo/New Zealand/Massey University, New Zealand.png'
  },
  'Poland': {
    'AGH University of Science and Technology': 'Assets/Images/Logo/Poland/AGH University of Science and Technology, Poland.png'
  },
  'Portugal': {
    'Lusofona University of Humanitites and Technologies': 'Assets/Images/Logo/Portugal/Lusofona University of Humanitites and Technologies (Universidade Lusofona de Humanidades e Tecnologias), Portugal.png'
  },
  'Romania': {
    'Stefan Cel Mare University of Suceava': 'Assets/Images/Logo/Romania/Stefan Cel Mare University of Suceava, Romania.png'
  },
  'Singapore': {
    'James Cook University (JCU)': 'Assets/Images/Logo/Singapore/James Cook University (JCU), Singapore.png',
    'National University of Singapore (NUS)': 'Assets/Images/Logo/Singapore/National University of Singapore (NUS),  Singapore.jpg',
    'Ngee Ann Polytechnic (NP)': 'Assets/Images/Logo/Singapore/Ngee Ann Polytechnic (NP), Singapore.png',
    'Singapore University of Technology and Design (SUTD)': 'Assets/Images/Logo/Singapore/Singapore University of Technology and Design (SUTD), Singapore.jpg'
  },
  'Switzerland': {
    'International Hotel Management Institute': 'Assets/Images/Logo/Switzerland/International Hotel Management Institute (IMI Partners AG Switzerland), Switzerland.jpg'
  },
  'Taiwan': {
    'Chang Jung Christian University': 'Assets/Images/Logo/Taiwan/Chang Jung Christian University, Taiwan.png',
    'Chung Yuan Christian University': 'Assets/Images/Logo/Taiwan/Chung Yuan Christian University, Taiwan.png',
    'Fu Jen Catholic University': 'Assets/Images/Logo/Taiwan/Fu Jen Catholic University, Taiwan.png',
    'I-Shou University': 'Assets/Images/Logo/Taiwan/I-Shou University, Taiwan.jpg',
    'Kun Shan University': 'Assets/Images/Logo/Taiwan/Kun Shan University, Taiwan.png',
    'Ming Chuan University': 'Assets/Images/Logo/Taiwan/Ming Chuan University, Taiwan.png',
    'National Central University': 'Assets/Images/Logo/Taiwan/National Central University, Taiwan.png',
    'National Chi Nan University': 'Assets/Images/Logo/Taiwan/National Chi Nan University, Taiwan.jpg',
    'National Ilan University': 'Assets/Images/Logo/Taiwan/National Ilan University, Taiwan.png',
    'National Kaohsiung University of Science and Technology (NKUST)': 'Assets/Images/Logo/Taiwan/National Kaohsiung University of Science and Technology (NKUST), Taiwan.jpg',
    'National Sun Yat Sen University (NSYSU)': 'Assets/Images/Logo/Taiwan/National Sun Yat Sen University (NSYSU), Taiwan.png',
    'National Taiwan University of Science and Technology (NTUST)': 'Assets/Images/Logo/Taiwan/National Taiwan University of Science and Technology (NTUST), Taiwan.png',
    'Tunghai University': 'Assets/Images/Logo/Taiwan/Tunghai University, Taiwan.jpg',
    'Wenzao Ursuline University of Languages': 'Assets/Images/Logo/Taiwan/Wenzao Ursuline University of Languages, Taiwan.jpg',
    'Yuan Ze University Taoyuan': 'Assets/Images/Logo/Taiwan/Yuan Ze University Taoyuan, Taiwan.png'
  },
  'Thailand': {
    'Bangkok University': 'Assets/Images/Logo/Thailand/Bangkok University, Thailand.jpg',
    'Naresuan University': 'Assets/Images/Logo/Thailand/Naresuan University, Thailand.jpg',
    'Siam University': 'Assets/Images/Logo/Thailand/Siam University, Thailand.png',
    'Silpakorn University': 'Assets/Images/Logo/Thailand/Silpakorn University, Thailand.png',
    'Srinakharinwirot University (SWU)': 'Assets/Images/Logo/Thailand/Srinakharinwirot University (SWU), Thailand.png',
    'Thai-Nichi Institute of Technology': 'Assets/Images/Logo/Thailand/Thai-Nichi Institute of Technology, Thailand.png'
  },
  'Timor Leste': {
    "Universidade Nacional Timor Lorosa'e (UNTL)": "Assets/Images/Logo/Timor Leste/Universidade Nacional Timor Lorosa'e (UNTL), Timor-Leste.png"
  },
  'United Arab Emirates': {
    'The Emirates Academy of Hospitality Management': 'Assets/Images/Logo/United Arab Emirates/The Emirates Academy of Hospitality Management, United Arab Emirates.jpg'
  },
  'United Kingdom': {
    'Coventry University': 'Assets/Images/Logo/United Kingdom/Coventry University, UK.png',
    'Loughborough University': 'Assets/Images/Logo/United Kingdom/Loughborough University, UK.png',
    'University of Chichester': 'Assets/Images/Logo/United Kingdom/University of Chichester, UK.png'
  },
  'United States of America': {
    'California Baptist University': 'Assets/Images/Logo/United States of America/California Baptist University, USA.png',
    'Dallas Baptist University': 'Assets/Images/Logo/United States of America/Dallas Baptist University, USA.jpg',
    'Iowa State University of Science and Technology (ISU)': 'Assets/Images/Logo/United States of America/Iowa State University of Science and Technology (ISU), USA.png',
    'Valparaiso University (Valpo)': 'Assets/Images/Logo/United States of America/Valparaiso University (Valpo), USA.jpg'
  }
};

const partnerData = [
  {
    "name": "Daffodil International University",
    "country": "Bangladesh"
  },
  {
    "name": "Southern University Bangladesh",
    "country": "Bangladesh"
  },
  {
    "name": "Beijing University of Posts and Telecommunication (School of Humanities) (BUPT)",
    "country": "China"
  },
  {
    "name": "Hua Qiao University",
    "country": "China"
  },
  {
    "name": "Yangzhou University",
    "country": "China"
  },
  {
    "name": "Zhejiang Yuexiu University of Foreign Languages",
    "country": "China"
  },
  {
    "name": "Centennial College",
    "country": "Hong Kong"
  },
  {
    "name": "International Christian University (ICU)",
    "country": "Japan"
  },
  {
    "name": "Josai International University",
    "country": "Japan"
  },
  {
    "name": "Kwansei Gakuin University",
    "country": "Japan"
  },
  {
    "name": "Meiji University",
    "country": "Japan"
  },
  {
    "name": "Momoyama Gakuin University",
    "country": "Japan"
  },
  {
    "name": "Sophia University",
    "country": "Japan"
  },
  {
    "name": "Busan University of Foreign Studies",
    "country": "South Korea"
  },
  {
    "name": "Changwon National University",
    "country": "South Korea"
  },
  {
    "name": "Dankook University (DKU)",
    "country": "South Korea"
  },
  {
    "name": "Hankuk University of Foreign Studies",
    "country": "South Korea"
  },
  {
    "name": "Hannam University",
    "country": "South Korea"
  },
  {
    "name": "Sogang Business School Sogang University",
    "country": "South Korea"
  },
  {
    "name": "SolBridge International School of Business (Woosong University)",
    "country": "South Korea"
  },
  {
    "name": "Soongsil University",
    "country": "South Korea"
  },
  {
    "name": "Woosong University",
    "country": "South Korea"
  },
  {
    "name": "UCSI University",
    "country": "Malaysia"
  },
  {
    "name": "Universiti Malaysia Perlis (UniMAP)",
    "country": "Malaysia"
  },
  {
    "name": "Universiti Tunku Abdul Rahman (UTAR)",
    "country": "Malaysia"
  },
  {
    "name": "Huree University of Information and Communication Technology",
    "country": "Mongolia"
  },
  {
    "name": "Camarines Sur Polytechnic Colleges",
    "country": "Philippines"
  },
  {
    "name": "Central Bicol State University of Agriculture San Jose",
    "country": "Philippines"
  },
  {
    "name": "Central Philippine University",
    "country": "Philippines"
  },
  {
    "name": "Iloilo Science and Technolgy University",
    "country": "Philippines"
  },
  {
    "name": "Northwest Samar State University",
    "country": "Philippines"
  },
  {
    "name": "Philippine Christian University",
    "country": "Philippines"
  },
  {
    "name": "Chang Jung Christian University",
    "country": "Taiwan"
  },
  {
    "name": "Chung Yuan Christian University",
    "country": "Taiwan"
  },
  {
    "name": "I-Shou University",
    "country": "Taiwan"
  },
  {
    "name": "Kun Shan University",
    "country": "Taiwan"
  },
  {
    "name": "Ming Chuan University",
    "country": "Taiwan"
  },
  {
    "name": "National Chi Nan University",
    "country": "Taiwan"
  },
  {
    "name": "National Sun Yat Sen University (NSYSU)",
    "country": "Taiwan"
  },
  {
    "name": "Tunghai University",
    "country": "Taiwan"
  },
  {
    "name": "Wenzao Ursuline University of Languages",
    "country": "Taiwan"
  },
  {
    "name": "Yuan Ze University Taoyuan",
    "country": "Taiwan"
  },
  {
    "name": "Bangkok University",
    "country": "Thailand"
  },
  {
    "name": "Naresuan University",
    "country": "Thailand"
  },
  {
    "name": "Kaichi International University",
    "country": "Japan"
  },
  {
    "name": "University of St. La Salle",
    "country": "Philippines"
  },
  {
    "name": "Holiday Inn Melaka",
    "country": "Malaysia"
  },
  {
    "name": "Silpakorn University",
    "country": "Thailand"
  },
  {
    "name": "Nanjing University of Aeronautics and Astronautics (NUAA)",
    "country": "China"
  },
  {
    "name": "INTI International University",
    "country": "Malaysia"
  },
  {
    "name": "Keimyung University",
    "country": "South Korea"
  },
  {
    "name": "Lingnan University",
    "country": "Hong Kong"
  },
  {
    "name": "National Central University",
    "country": "Taiwan"
  },
  {
    "name": "National Taiwan University of Science and Technology (NTUST)",
    "country": "Taiwan"
  },
  {
    "name": "Nihon University",
    "country": "Japan"
  },
  {
    "name": "James Cook University (JCU)",
    "country": "Singapore"
  },
  {
    "name": "Tunku Abdul Rahman University of Management and Technology (TARUMT)",
    "country": "Malaysia"
  },
  {
    "name": "Guangdong University of Foreign Studies (GDUFS)",
    "country": "China"
  },
  {
    "name": "Guangxi Normal University",
    "country": "China"
  },
  {
    "name": "Dongseo University",
    "country": "South Korea"
  },
  {
    "name": "University of Mindanao",
    "country": "Philippines"
  },
  {
    "name": "Fu Jen Catholic University",
    "country": "Taiwan"
  },
  {
    "name": "Myongji University",
    "country": "South Korea"
  },
  {
    "name": "Silliman University",
    "country": "Philippines"
  },
  {
    "name": "Anhui University",
    "country": "China"
  },
  {
    "name": "Panpacific University",
    "country": "Philippines"
  },
  {
    "name": "Siam University",
    "country": "Thailand"
  },
  {
    "name": "Cambodian University for Specialties (CUS)",
    "country": "Cambodia"
  },
  {
    "name": "Vellore Institute of Technology (VIT)",
    "country": "India"
  },
  {
    "name": "VIT Bhopal University",
    "country": "India"
  },
  {
    "name": "VIT-AP University",
    "country": "India"
  },
  {
    "name": "National Ilan University",
    "country": "Taiwan"
  },
  {
    "name": "Lady Doak College",
    "country": "India"
  },
  {
    "name": "Assam Down Town University",
    "country": "India"
  },
  {
    "name": "Singapore University of Technology and Design (SUTD)",
    "country": "Singapore"
  },
  {
    "name": "Universiti Tun Hussein Onn Malaysia (UTHM)",
    "country": "Malaysia"
  },
  {
    "name": "School of Economics, Fudan University",
    "country": "China"
  },
  {
    "name": "Sunway University",
    "country": "Malaysia"
  },
  {
    "name": "Universiti Teknologi MARA (UiTM)",
    "country": "Malaysia"
  },
  {
    "name": "National Kaohsiung University of Science and Technology (NKUST)",
    "country": "Taiwan"
  },
  {
    "name": "City University of Hong Kong (CityU)",
    "country": "Hong Kong"
  },
  {
    "name": "The Emirates Academy of Hospitality Management",
    "country": "United Arab Emirates"
  },
  {
    "name": "Universidade Nacional Timor Lorosa'e (UNTL)",
    "country": "Timor Leste"
  },
  {
    "name": "Samar State University",
    "country": "Philippines"
  },
  {
    "name": "Asia University",
    "country": "Japan"
  },
  {
    "name": "National University of Management (NUM)",
    "country": "Cambodia"
  },
  {
    "name": "Asia Pacific University of Technology & Innovation (APU)",
    "country": "Malaysia"
  },
  {
    "name": "Kansai Gaidai University",
    "country": "Japan"
  },
  {
    "name": "Busan Digital University (BDU)",
    "country": "South Korea"
  },
  {
    "name": "Guangdong University of Science and Technology (GDUT)",
    "country": "China"
  },
  {
    "name": "Guangzhou Huanan Business College",
    "country": "China"
  },
  {
    "name": "Kansai University of International Studies",
    "country": "Japan"
  },
  {
    "name": "German-Mongolian Institute for Resources and Technology (GMIT)",
    "country": "Mongolia"
  },
  {
    "name": "Chaoshan Vocational and Technical College",
    "country": "China"
  },
  {
    "name": "Guangzhou Nanyang Polytechnic College",
    "country": "China"
  },
  {
    "name": "International Pacific University (IPU)",
    "country": "Japan"
  },
  {
    "name": "Macau Millennium College (MMC)",
    "country": "Macau"
  },
  {
    "name": "Macau University of Science and Technology",
    "country": "Macau"
  },
  {
    "name": "Ngee Ann Polytechnic (NP)",
    "country": "Singapore"
  },
  {
    "name": "Fujian Polytechnic Normal University (FPNU)",
    "country": "China"
  },
  {
    "name": "Bicol University",
    "country": "Philippines"
  },
  {
    "name": "Hunan City University",
    "country": "China"
  },
  {
    "name": "Clark Memorial International High School",
    "country": "Japan"
  },
  {
    "name": "Yonsei University",
    "country": "South Korea"
  },
  {
    "name": "Chodang University",
    "country": "South Korea"
  },
  {
    "name": "Philippine Normal University",
    "country": "Philippines"
  },
  {
    "name": "University of Niigata Prefecture",
    "country": "Japan"
  },
  {
    "name": "Pusan National University",
    "country": "South Korea"
  },
  {
    "name": "Universiti Malaysia Sarawak (UNIMAS)",
    "country": "Malaysia"
  },
  {
    "name": "Universiti Sains Malaysia (USM)",
    "country": "Malaysia"
  },
  {
    "name": "Guangzhou College of Commerce, (GCC)",
    "country": "China"
  },
  {
    "name": "Tianjin Foreign Studies University (TFSU)",
    "country": "China"
  },
  {
    "name": "University of Saint Joseph",
    "country": "China"
  },
  {
    "name": "Royal University of Phnom Penh (RUPP)",
    "country": "Cambodia"
  },
  {
    "name": "Srinakharinwirot University (SWU)",
    "country": "Thailand"
  },
  {
    "name": "Thai-Nichi Institute of Technology",
    "country": "Thailand"
  },
  {
    "name": "Xi'an Jiatong-Liverpool University (XJTLU)",
    "country": "China"
  },
  {
    "name": "University of the East",
    "country": "Philippines"
  },
  {
    "name": "National University of Singapore (NUS)",
    "country": "Singapore"
  },
  {
    "name": "University of Puthisastra",
    "country": "Cambodia"
  },
  {
    "name": "Shizuoka University",
    "country": "Japan"
  },
  {
    "name": "The Education University of Hongkong",
    "country": "Hong Kong"
  },
  {
    "name": "Athlone Institute of Technology",
    "country": "Ireland"
  },
  {
    "name": "Mykolas Romeris University",
    "country": "Lithuania"
  },
  {
    "name": "Fontys University of Applied Sciences",
    "country": "Netherlands"
  },
  {
    "name": "Inholland University of Applied Sciences",
    "country": "Netherlands"
  },
  {
    "name": "Saxion University of Applied Sciences",
    "country": "Netherlands"
  },
  {
    "name": "AGH University of Science and Technology",
    "country": "Poland"
  },
  {
    "name": "Lusofona University of Humanitites and Technologies",
    "country": "Portugal"
  },
  {
    "name": "International Hotel Management Institute",
    "country": "Switzerland"
  },
  {
    "name": "Coventry University",
    "country": "United Kingdom"
  },
  {
    "name": "Hochschule Fresenius University of Applied Sciences",
    "country": "Germany"
  },
  {
    "name": "Hochschule Mainz - University of Applied Sciences",
    "country": "Germany"
  },
  {
    "name": "Budapest University of Technology and Economics",
    "country": "Hungary"
  },
  {
    "name": "Osnabrück University of Applied Sciences",
    "country": "Germany"
  },
  {
    "name": "Univeristy of Applied Sciences Darmstadt",
    "country": "Germany"
  },
  {
    "name": "Poznań University of Life Science",
    "country": "Poland"
  },
  {
    "name": "University of Chichester",
    "country": "United Kingdom"
  },
  {
    "name": "Stefan Cel Mare University of Suceava",
    "country": "Romania"
  },
  {
    "name": "Rennes School of Business",
    "country": "France"
  },
  {
    "name": "Loughborough University",
    "country": "United Kingdom"
  },
  {
    "name": "FH Münster University of Applied Sciences",
    "country": "Germany"
  },
  {
    "name": "Macquarie University",
    "country": "Australia"
  },
  {
    "name": "University of Tasmania",
    "country": "Australia"
  },
  {
    "name": "Monash University",
    "country": "Australia"
  },
  {
    "name": "Queensland University of Technology",
    "country": "Australia"
  },
  {
    "name": "Massey University",
    "country": "New Zealand"
  },
  {
    "name": "RMIT University, Australia",
    "country": "Australia"
  },
  {
    "name": "University of New South Wales (UNSW)",
    "country": "Australia"
  },
  {
    "name": "California Baptist University",
    "country": "United States of America"
  },
  {
    "name": "Dallas Baptist University",
    "country": "United States of America"
  },
  {
    "name": "Valparaiso University (Valpo)",
    "country": "United States of America"
  },
  {
    "name": "Iowa State University of Science and Technology (ISU)",
    "country": "United States of America"
  },
  {
    "name": "University of the Fraser Valley (UFV)",
    "country": "Canada"
  }
];

const uniqueCountries = Array.from(new Set(partnerData.map(p => p.country))).sort((a, b) => a.localeCompare(b));

const partnersByCountry = partnerData.reduce((acc, partner) => {
  if (!acc[partner.country]) acc[partner.country] = [];
  acc[partner.country].push(partner.name);
  return acc;
}, {});

Object.values(partnersByCountry).forEach(list => list.sort((a, b) => a.localeCompare(b)));

const countryToContinent = {
  'Japan': 'asia',
  'South Korea': 'asia',
  'China': 'asia',
  'Taiwan': 'asia',
  'Malaysia': 'asia',
  'Thailand': 'asia',
  'Philippines': 'asia',
  'Singapore': 'asia',
  'Bangladesh': 'asia',
  'Hong Kong': 'asia',
  'India': 'asia',
  'Macau': 'asia',
  'Mongolia': 'asia',
  'Cambodia': 'asia',
  'Timor Leste': 'asia',
  'United Arab Emirates': 'asia',
  'Netherlands': 'europe',
  'United Kingdom': 'europe',
  'Germany': 'europe',
  'France': 'europe',
  'Hungary': 'europe',
  'Ireland': 'europe',
  'Latvia': 'europe',
  'Lithuania': 'europe',
  'Poland': 'europe',
  'Portugal': 'europe',
  'Romania': 'europe',
  'Switzerland': 'europe',
  'United States of America': 'americas',
  'Canada': 'americas',
  'Australia': 'oceania',
  'New Zealand': 'oceania'
};

// ---- MAP INTERACTION FUNCTIONS ----
function getFlagPath(country) {
  const flagFile = countryFlags[country];
  return flagFile ? `Assets/Images/Flag/${flagFile}` : null;
}

function getInstitutionLogoPath(country, institution) {
  if (institutionLogos[country] && institutionLogos[country][institution]) {
    return institutionLogos[country][institution];
  }
  return null;
}

function displaySelectedCountry(country, institutions) {
  const section = document.getElementById('selectedCountrySection');
  const title = document.getElementById('selectedCountryTitle');
  const institutionsList = document.getElementById('selectedCountryInstitutions');
  
  const flagPath = getFlagPath(country);
  
  // Build title with flag
  let titleHTML = '';
  if (flagPath) {
    titleHTML = `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded mr-3"> ${country} — Partner Institutions`;
  } else {
    titleHTML = `${country} — Partner Institutions`;
  }
  title.innerHTML = titleHTML;
  title.className = 'font-display text-2xl md:text-3xl font-bold text-pcu-blue flex items-center';
  
  const institutionArray = Array.isArray(institutions) ? institutions : institutions.split(', ');
  institutionsList.innerHTML = institutionArray.map(inst => {
    const logoPath = getInstitutionLogoPath(country, inst);
    return `
      <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-pcu-light/80 flex items-center justify-center overflow-hidden">
            ${logoPath ? `<img src="${logoPath}" alt="${inst} logo" class="max-h-12 max-w-full object-contain">` : `<i data-lucide="building" class="w-6 h-6 text-pcu-blue"></i>`}
          </div>
          <h3 class="font-semibold text-pcu-blue leading-tight">${inst}</h3>
        </div>
      </div>
    `;
  }).join('');
  
  section.classList.remove('hidden');
  
  // Scroll to the section
  setTimeout(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function clearSelectedCountry() {
  document.getElementById('selectedCountrySection').classList.add('hidden');
}

// Initialize map markers and handle initial hash routing
document.addEventListener('DOMContentLoaded', function() {
  initializeCountryGrid();
  initializePartnershipData();
  const pageId = window.location.hash.slice(1) || 'home';
  navigateTo(pageId, { updateHash: false });
});

// ---- PARTNERSHIP FUNCTIONS ----
function togglePartnershipBox(boxId, suffix = '') {
  const boxes = [`partners-box${suffix}`, `countries-box${suffix}`, `continents-box${suffix}`];
  boxes.forEach(id => {
    const box = document.getElementById(id);
    if (!box) return;
    if (id === `${boxId}-box${suffix}`) {
      box.classList.toggle('hidden');
      if (!box.classList.contains('hidden')) {
        if (boxId === 'partners') loadPartnersLogos(suffix);
        if (boxId === 'countries') loadCountries(suffix);
      }
    } else {
      box.classList.add('hidden');
    }
  });
}

const intlLogoFiles = ["Australia/Bethany Christian School, Adelaide, Australia.png", "Australia/CPA Australia.png", "Australia/Macquarie University, Australia.png", "Australia/Monash University, Australia.png", "Australia/Queensland University of Technology (QUT), Australia.jpg", "Australia/University of Tasmania, Australia.png", "Bangladesh/Daffodil International University, Bangladesh.png", "Bangladesh/Southern University Bangladesh.jpg", "Cambodia/Cambodian University for Specialties (CUS), Cambodia.png", "Cambodia/National University of Management (NUM), Cambodia.jpg", "Cambodia/Royal University of Phnom Penh (RUPP), Cambodia.png", "Cambodia/University of Puthisastra, Cambodia.jpg", "Canada/University of the Fraser Valley (UFV), Canada.png", "China/Anhui University, China.jpg", "China/Beijing University of Posts and Telecommunication (School of Humanities) (BUPT), Beijing.png", "China/Chaoshan Vocational and Technical College, China.jpg", "China/Fujian Polytechnic Normal University (FPNU), China.jpg", "China/Guangdong University of Foreign Studies (GDUFS), China.png", "China/Guangdong University of Science and Technology (GDUT), China.png", "China/Guangxi Normal University, P. R. China.png", "China/Guangzhou College of Commerce, (GCC), China.jpg", "China/Guangzhou Huanan Business College, China.jpg", "China/Guangzhou Nanyang Polytechnic College, China.jpg", "China/Hua Qiao University, Quanzhou, P. R. China.jpg", "China/Hunan City University, China.png", "China/Nanjing University of Aeronautics and Astronautics (NUAA), China.png", "China/School of Economics, Fudan University, China.png", "China/The Westin Sanya Haitang Bay Resort, China.jpg", "China/Tianjin Foreign Studies University (TFSU), China.jpg", "China/Xi'an Jiatong-Liverpool University (XJTLU), China.jpg", "China/Yangzhou University, China.png", "China/Zhejiang Yuexiu University of Foreign Languages, China.jpg", "France/Rennes School of Business, France.jpg", "Germany/Hochschule Fresenius University of Applied Sciences, Germany.png", "Germany/Hochschule Mainz - University of Applied Sciences, Germany.png", "Germany/Osnabru╠êck University of Applied Sciences, Germany (Faculty of Business Management and Social Sciences).png", "Germany/Univeristy of Applied Sciences Darmstadt (Hochschule Darmstadt) (h_da), Germany.png", "Hong Kong/Centennial College, Hong Kong.jpg", "Hong Kong/City University of Hong Kong (CityU), Hong Kong.jpg", "Hong Kong/Hong Kong Baptist University.png", "Hong Kong/Lingnan University, Hongkong.png", "Hong Kong/The Education University of Hongkong, Hongkong.png", "Hungary/Budapest University of Technology and Economics, Hungary.jpg", "India/Assam Down Town University, India.png", "India/Lady Doak College, India.jpg", "India/VIT Bhopal University, India.png", "India/VIT-AP University, India.png", "India/Vellore Institute of Technology (VIT), India.png", "Ireland/Athlone Institute of Technology, Irlandia.jpg", "Japan/Asia University, Japan.png", "Japan/Clark Memorial International High School, Japan.png", "Japan/International Christian University (ICU), Japan.jpg", "Japan/International Pacific University (IPU), Japan.png", "Japan/Josai International University, Japan.jpg", "Japan/Kaichi International University, Japan.png", "Japan/Kansai Gaidai University, Japan.jpg", "Japan/Kansai University of International Studies, Japan.png", "Japan/Kwansei Gakuin University, Japan.png", "Japan/Meiji University, Japan.png", "Japan/Momoyama Gakuin University, Japan.png", "Japan/Nihon University, Japan.jpg", "Japan/Shizuoka University, Japan.jpeg", "Japan/Sophia University, Japan.png", "Japan/University of Niigata Perfecture, Japan.jpeg", "Lithuania/Mykolas Romeris University, Lithuania.png", "Macau/Macau Millennium College (MMC), Macau.png", "Macau/Macau University of Science and Technology, Macau.png", "Macau/University of Saint Joseph, Macau.jpg", "Malaysia/Aloft Kuala Lumpur.jpg", "Malaysia/Asia Pacific University of Technology & Innovation (APU), Malaysia.png", "Malaysia/Holiday Inn Melaka.jpg", "Malaysia/INTI International University, Malaysia.jpg", "Malaysia/Pullman Kuala Lumpur, Malaysia.png", "Malaysia/Shangri La Hotel, Kuala Lumpur, Malaysia.png", "Malaysia/Shangri-La Hotel Kuala Lumpur.png", "Malaysia/Sheraton Hotels and Resorts (Malaysia & Taipei).png", "Malaysia/Sheraton Petaling Jaya Hotel.jpg", "Malaysia/Sofitel Kuala Lumpur.png", "Malaysia/Sunway University SDN BHD.jpg", "Malaysia/Tunku Abdul Rahman University of Management and Technology (TARUMT), Malaysia.png", "Malaysia/UCSI University, Malaysia.jpg", "Malaysia/Universiti Malaya.png", "Malaysia/Universiti Malaysia Perlis (UniMAP), Malaysia.png", "Malaysia/Universiti Malaysia Sarawak (UNIMAS), Malaysia.png", "Malaysia/Universiti Sains Malaysia (USM), Malaysia.jpg", "Malaysia/Universiti Teknologi MARA (UiTM), Malaysia.png", "Malaysia/Universiti Tun Hussein Onn Malaysia (UTHM), Malaysia.png", "Malaysia/Universiti Tunku Abdul Rahman (UTAR), Malaysia.jpg", "Malaysia/University of Nottingham Malaysia.jpg", "Malaysia/World Skills Academy SDN BHD.jpg", "Mongolia/German-Mongolian Institute for Resources and Technology (GMIT), Mongolia.png", "Mongolia/Huree University of Information and Communication Technology, Mongolia.jpg", "Netherlands/Fontys University of Applied Sciences, The Netherlands.png", "Netherlands/Saxion University of Applied Sciences, the Netherlands.png", "New Zealand/Massey University, New Zealand.png", "Philippines/Bicol University, Phillipines.jpg", "Philippines/Camarines Sur Polytechnic Colleges, Philippines.png", "Philippines/Central Bicol State University of Agriculture San Jose, Philippines.png", "Philippines/Central Philippine University, Philippines.png", "Philippines/Iloilo Science and Technolgy University, Philippines.png", "Philippines/Northwest Samar State University, Philippines.jpg", "Philippines/Panpacific University, Philippines.png", "Philippines/Philippine Christian University, Philippine.png", "Philippines/Philippine Normal University, Philippines.png", "Philippines/Samar State University, Philippines.jpg", "Philippines/Silliman University, Philippines.png", "Philippines/University of Mindanao, Philippines.png", "Philippines/University of St. La Salle.png", "Philippines/University of the East.png", "Poland/AGH University of Science and Technology, Poland.png", "Portugal/Lusofona University of Humanitites and Technologies (Universidade Lusofona de Humanidades e Tecnologias), Portugal.png", "Romania/Stefan Cel Mare University of Suceava, Romania.png", "Singapore/James Cook University (JCU), Singapore.png", "Singapore/National University of Singapore (NUS),  Singapore.jpg", "Singapore/Ngee Ann Polytechnic (NP), Singapore.png", "Singapore/Singapore University of Technology and Design (SUTD), Singapore.jpg", "Singapore/singapore university of technology.jpg", "South Korea/Busan Digital University (BDU), Korea.png", "South Korea/Busan University of Foreign Studies, Korea.jpg", "South Korea/Changwon National University, Korea.jpg", "South Korea/Chodang University, Korea.png", "South Korea/Dankook University (DKU), Korea.png", "South Korea/Dongseo University, Korea.jpg", "South Korea/Hankuk University of Foreign Studies, Korea.png", "South Korea/Hannam University, Korea.jpg", "South Korea/Keimyung University, Korea.jpg", "South Korea/Myongji University, Korea.png", "South Korea/Pusan National University, Korea.png", "South Korea/Sogang Business School Sogang University, Korea.png", "South Korea/SolBridge International School of Business (Woosong University), Korea.png", "South Korea/Soongsil University, Seoul, Korea.png", "South Korea/Woosong University, Rep. of Korea.png", "South Korea/Yonsei University, Korea.png", "Switzerland/International Hotel Management Institute (IMI Partners AG Switzerland), Switzerland.jpg", "Taiwan/Chang Jung Christian University, Taiwan.png", "Taiwan/Chung Yuan Christian University, Taiwan.png", "Taiwan/Fu Jen Catholic University, Taiwan.png", "Taiwan/I-Shou University, Taiwan.jpg", "Taiwan/Kun Shan University, Taiwan.png", "Taiwan/Le Me╠üridien Taipei, Taiwan.jpg", "Taiwan/Ming Chuan University, Taiwan.png", "Taiwan/National Central University, Taiwan.png", "Taiwan/National Chi Nan University, Taiwan.jpg", "Taiwan/National Ilan University, Taiwan.png", "Taiwan/National Kaohsiung University of Science and Technology (NKUST), Taiwan.jpg", "Taiwan/National Sun Yat Sen University (NSYSU), Taiwan.png", "Taiwan/National Taiwan University of Science and Technology (NTUST), Taiwan.png", "Taiwan/New Palace Taichung Beitun Dist., Taiwan.jpg", "Taiwan/Tunghai University, Taiwan.jpg", "Taiwan/Wenzao Ursuline University of Languages, Taiwan.jpg", "Taiwan/Yuan Ze University Taoyuan, Taiwan.png", "Taiwan/national taiwan university logo.png", "Thailand/Bangkok University, Thailand.jpg", "Thailand/Naresuan University, Thailand.jpg", "Thailand/Siam University, Thailand.png", "Thailand/Silpakorn University, Thailand.png", "Thailand/Srinakharinwirot University (SWU), Thailand.png", "Thailand/Thai-Nichi Institute of Technology, Thailand.png", "The Education University of Hongkong, Hongkong.svg", "Timor Leste/Universidade Nacional Timor Lorosa'e (UNTL), Timor-Leste.png", "United Arab Emirates/The Emirates Academy of Hospitality Management, United Arab Emirates.jpg", "United Kingdom/Coventry University, UK.png", "United Kingdom/Loughborough University, UK.png", "United Kingdom/University of Chichester, UK.png", "United States of America/California Baptist University, USA.png", "United States of America/Dallas Baptist University, USA.jpg", "United States of America/Four Season Atlanta, USA.png", "United States of America/Gaylord Hotels, Nashville, USA.jpg", "United States of America/Iowa State University of Science and Technology (ISU), USA.png", "United States of America/Valparaiso University (Valpo), USA.jpg"];

function loadPartnersLogos(suffix = '') {
  const container = document.getElementById('partners-logos' + suffix);
  if (!container || container.children.length > 0) return;
  const makeItem = (file) => {
    const name = file.replace(/^[^/]+\//, '').replace(/\.[^.]+$/, '');
    const src = 'Assets/Images/Logo/' + file.split('/').map(encodeURIComponent).join('/');
    return '<div class="flex flex-col items-center gap-2 flex-shrink-0" style="width:80px;">' +
      '<div class="w-16 h-16 rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center overflow-hidden hover:shadow-lg hover:border-pcu-blue/30 transition" style="flex-shrink:0;">' +
      '<img src="' + src + '" alt="' + name.replace(/"/g, '&quot;') + '" class="max-h-12 max-w-full object-contain p-1" loading="lazy">' +
      '</div>' +
    '</div>';
  };
  const items = [...intlLogoFiles, ...intlLogoFiles];
  container.innerHTML = items.map(makeItem).join('');
}

function loadCountries(suffix = '') {
  const container = document.getElementById(`countries-list${suffix}`);
  if (!container || container.children.length > 0) return;
  container.innerHTML = uniqueCountries.map(country => {
    const flagPath = getFlagPath(country);
    return `
      <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition cursor-pointer" onclick="showCountryUniversities('${country}')">
        <div class="flex items-center gap-3">
          ${flagPath ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded">` : ''}
          <span class="font-semibold text-pcu-blue">${country}</span>
        </div>
      </div>
    `;
  }).join('');
}

function showContinent(continent, suffix = '') {
  const container = document.getElementById(`continent-countries${suffix}`);
  if (!container) return;
  container.classList.remove('hidden');
  const countries = Object.entries(countryToContinent).filter(([name, group]) => group === continent).map(([name]) => name).sort((a, b) => a.localeCompare(b));
  container.innerHTML = `
    <h4 class="font-semibold text-lg text-pcu-blue mb-4 capitalize">${continent.replace('-', ' ')} Countries</h4>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${countries.map(country => {
        const flagPath = getFlagPath(country);
        return `
          <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition cursor-pointer" onclick="showCountryUniversities('${country}')">
            <div class="flex items-center gap-3">
              ${flagPath ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded">` : ''}
              <span class="font-semibold text-pcu-blue">${country}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function showCountryUniversities(country) {
  const institutions = partnersByCountry[country] || [];
  displaySelectedCountry(country, institutions);
}

function getInstitutionsForCountry(country) {
  return (partnersByCountry[country] || []).join(', ') || 'No institutions listed';
}

function initializePartnershipData() {
  // No-op for now. Partnership data is preloaded from the Excel source and used on demand.
}

// ---- PARTNERSHIP MODAL ----
let _modalBackType = 'countries';

function openPartnershipModal(type) {
  const modal = document.getElementById('partnership-modal');
  const title = document.getElementById('partnership-modal-title');
  const content = document.getElementById('partnership-modal-content');

  _modalBackType = type;

  if (type === 'countries') {
    title.textContent = 'Partner Countries';
    content.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        ${uniqueCountries.map(country => {
          const flagPath = getFlagPath(country);
          return `
            <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition cursor-pointer" onclick="showCountryInModal('${country.replace(/'/g,"\\'")}')">
              <div class="flex items-center gap-3">
                ${flagPath ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded shrink-0">` : ''}
                <span class="font-semibold text-pcu-blue text-sm">${country}</span>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  } else if (type === 'continents') {
    title.textContent = 'Partner Continents';
    const continentItems = [
      ['asia', 'Asia'],
      ['europe', 'Europe'],
      ['americas', 'Americas'],
      ['oceania', 'Oceania']
    ];
    content.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        ${continentItems.map(([key, label]) => `
          <div class="text-center cursor-pointer p-5 bg-pcu-light rounded-2xl hover:bg-pcu-blue hover:text-white transition" onclick="showContinentInModal('${key}')">
            <i data-lucide="globe" class="w-8 h-8 mb-2 mx-auto block"></i>
            <p class="font-semibold">${label}</p>
          </div>`).join('')}
      </div>
      <div id="modal-continent-countries" class="hidden"></div>`;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.scrollTop = 0;
  lucide.createIcons();
}

function showContinentInModal(continent) {
  const container = document.getElementById('modal-continent-countries');
  if (!container) return;
  container.classList.remove('hidden');
  const label = { asia: 'Asia', europe: 'Europe', americas: 'Americas', oceania: 'Oceania' }[continent] || continent;
  const countries = Object.entries(countryToContinent)
    .filter(([, group]) => group === continent)
    .map(([name]) => name)
    .sort((a, b) => a.localeCompare(b));
  container.innerHTML = `
    <h4 class="font-semibold text-lg text-pcu-blue mb-4">${label} Countries</h4>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${countries.map(country => {
        const flagPath = getFlagPath(country);
        return `
          <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition cursor-pointer" onclick="showCountryInModal('${country.replace(/'/g,"\\'")}')">
            <div class="flex items-center gap-3">
              ${flagPath ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded shrink-0">` : ''}
              <span class="font-semibold text-pcu-blue text-sm">${country}</span>
            </div>
          </div>`;
      }).join('')}
    </div>`;
  lucide.createIcons();
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showCountryInModal(country) {
  const title = document.getElementById('partnership-modal-title');
  const content = document.getElementById('partnership-modal-content');
  const institutions = partnersByCountry[country] || [];
  const flagPath = getFlagPath(country);

  title.innerHTML = flagPath
    ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded mr-3 inline-block align-middle"> ${country}`
    : country;
  title.className = 'font-display text-2xl font-bold text-pcu-blue flex items-center';

  content.innerHTML = `
    <button class="inline-flex items-center gap-2 text-pcu-blue text-sm font-medium mb-6 hover:underline" onclick="openPartnershipModal('${_modalBackType}')">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
    </button>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${institutions.map(inst => {
        const logoPath = getInstitutionLogoPath(country, inst);
        return `
          <div class="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-pcu-light/80 flex items-center justify-center overflow-hidden shrink-0">
                ${logoPath ? `<img src="${logoPath}" alt="${inst} logo" class="max-h-10 max-w-full object-contain">` : `<i data-lucide="building" class="w-6 h-6 text-pcu-blue"></i>`}
              </div>
              <h3 class="font-semibold text-pcu-blue leading-tight text-sm">${inst}</h3>
            </div>
          </div>`;
      }).join('')}
    </div>`;
  lucide.createIcons();
  document.getElementById('partnership-modal').scrollTop = 0;
}

function closePartnershipModal(event) {
  if (event && event.target !== document.getElementById('partnership-modal')) return;
  const modal = document.getElementById('partnership-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePartnershipModal();
});

function initializeCountryGrid() {
  const mapContainer = document.getElementById('worldMap');
  if (!mapContainer) return;
  uniqueCountries.forEach(country => {
    const flagPath = getFlagPath(country);
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pcu-blue/30 transition cursor-pointer';
    card.onclick = () => showCountryUniversities(country);
    card.innerHTML = `
      <div class="flex items-center gap-3">
        ${flagPath ? `<img src="${flagPath}" alt="${country}" class="w-8 h-6 object-cover rounded">` : ''}
        <span class="font-semibold text-pcu-blue">${country}</span>
      </div>
    `;
    mapContainer.appendChild(card);
  });
}

function renderNews(container, items) {
  const el = document.getElementById(container);
  if (!el) return;
  const isAdmin = typeof isAdminLoggedIn === 'function' && isAdminLoggedIn();
  el.innerHTML = items.map(n => {
    const isDynamic = n.id && n.id.startsWith('admin-news-');
    const adminOverlay = (isAdmin && isDynamic) ? `
      <div class="absolute top-3 right-3 flex gap-1.5 z-10">
        <button onclick="event.stopPropagation();openEditArticleModal('${n.id}')"
          class="p-1.5 bg-white/90 text-pcu-blue rounded-full shadow hover:bg-pcu-light transition" title="Edit article">
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
        </button>
        <button onclick="event.stopPropagation();confirmDeleteArticle('${n.id}')"
          class="p-1.5 bg-white/90 text-red-500 rounded-full shadow hover:bg-red-50 transition" title="Delete article">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>` : '';
    const thumbBg = n.imageUrl
      ? `style="background-image:url('${n.imageUrl}');background-size:cover;background-position:center;"` : '';
    const gradClass = n.imageUrl ? '' : (n.color ? 'bg-gradient-to-br ' + n.color : '');
    return `
    <article onclick="navigateTo('${n.id}');return false" class="program-card bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer relative">
      <div class="h-52 news-img ${gradClass} relative overflow-hidden" ${thumbBg}>
        <div class="absolute inset-0 ${n.imageUrl ? 'bg-black/15' : 'bg-black/10'}"></div>
        <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-semibold rounded-full text-pcu-navy backdrop-blur">${n.tag.replace('#', '')}</div>
        ${adminOverlay}
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span>${n.date}</span>
          <span class="uppercase tracking-[0.2em] text-pcu-navy font-semibold">${n.tag.replace('#', '')}</span>
        </div>
        <h3 class="font-semibold text-xl text-pcu-blue mb-3 leading-snug">${n.title}</h3>
        <p class="text-gray-600 text-sm mb-5">${n.excerpt || 'Read more about this latest update from PCU Global.'}</p>
        <span class="inline-flex items-center gap-2 text-pcu-sky font-semibold">Read more <i data-lucide="arrow-right" class="w-3 h-3"></i></span>
      </div>
    </article>`;
  }).join('');
}

// ---- OUTBOUND SEMESTER EXCHANGE DATA ----
const oseBasePartners = partnerData.map(partner => ({
  name: partner.name,
  country: partner.country,
  region: countryToContinent[partner.country] || 'all',
  programs: ["Exchange", "Study Abroad"]
}));

// Populated from backend by loadOsePrograms()
window.oseProgramData = {};
window.oseCustomUniversities = [];

// Combined list used for rendering (base + custom)
let osePartners = [...oseBasePartners];

async function loadOsePrograms() {
  const base = typeof API_BASE !== 'undefined' ? API_BASE : 'https://international-office-website-production.up.railway.app';
  try {
    const res = await fetch(`${base}/api/ose-programs`);
    if (!res.ok) return;
    const list = await res.json();
    window.oseProgramData = {};
    window.oseCustomUniversities = [];
    list.forEach(entry => {
      window.oseProgramData[entry.name] = entry;
      if (entry.isCustom) {
        window.oseCustomUniversities.push({
          name: entry.name,
          country: entry.country || '',
          region: entry.region || 'all',
          programs: entry.programs || ['Semester Exchange']
        });
      }
    });
    // Rebuild combined list
    const baseNames = new Set(oseBasePartners.map(p => p.name));
    osePartners = [
      ...oseBasePartners,
      ...window.oseCustomUniversities.filter(c => !baseNames.has(c.name))
    ];
    renderOsePartners();
  } catch (e) {}
}

let oseCurrentRegion = 'all';

function oseShowRegion(region) {
  oseCurrentRegion = region;
  document.querySelectorAll('.ose-tab').forEach(t => {
    if (t.dataset.region === region) {
      t.className = 'ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-pcu-blue text-white transition';
    } else {
      t.className = 'ose-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-pcu-blue hover:text-pcu-blue transition';
    }
  });
  renderOsePartners();
}

const OSE_REGION_BADGE = {
  asia:     'bg-blue-50 text-blue-600',
  europe:   'bg-purple-50 text-purple-600',
  oceania:  'bg-green-50 text-green-600',
  americas: 'bg-orange-50 text-orange-600'
};

function renderOsePartners() {
  const grid = document.getElementById('ose-partner-grid');
  if (!grid) return;
  const filtered = oseCurrentRegion === 'all'
    ? osePartners
    : osePartners.filter(p => p.region === oseCurrentRegion);

  grid.innerHTML = filtered.map(p => {
    const extra = window.oseProgramData[p.name] || {};
    const programs = (extra.programs && extra.programs.length) ? extra.programs : p.programs;
    const hasDetails = !!(extra.description || extra.requirements || extra.deadline || extra.website);
    const badgeClass = OSE_REGION_BADGE[p.region] || 'bg-gray-50 text-gray-500';
    return `
    <div class="program-card bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:border-pcu-orange/40 hover:shadow-md transition cursor-pointer group"
         onclick="openOseUniversityModal(this.dataset.name)" data-name="${p.name.replace(/"/g, '&quot;')}">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1 min-w-0 pr-2">
          <h3 class="font-semibold text-pcu-blue text-base leading-snug group-hover:text-pcu-orange transition">${p.name}</h3>
          <p class="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 flex-shrink-0"></i> ${p.country}
          </p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${badgeClass}">${p.region || '—'}</span>
      </div>
      <div class="flex flex-wrap gap-1.5 mb-3">
        ${programs.map(prog => `<span class="px-2.5 py-0.5 bg-pcu-light text-pcu-blue text-xs rounded-full">${prog}</span>`).join('')}
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-pcu-orange font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          View details <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </span>
        ${hasDetails ? '<span class="w-2 h-2 rounded-full bg-pcu-orange flex-shrink-0" title="Program info available"></span>' : ''}
      </div>
    </div>`;
  }).join('');
  lucide.createIcons();
}

// ---- OSE UNIVERSITY DETAIL MODAL ----
let oseModalCurrentName = null;

function openOseUniversityModal(name) {
  oseModalCurrentName = name;
  const partner = osePartners.find(p => p.name === name) || { name, country: '', region: '' };
  const extra = window.oseProgramData[name] || {};
  const programs = (extra.programs && extra.programs.length) ? extra.programs : (partner.programs || ['Semester Exchange', 'Study Abroad']);
  const region = extra.region || partner.region || '';

  // Header
  document.getElementById('ose-modal-name').textContent = name;
  document.getElementById('ose-modal-country').querySelector('span').textContent = extra.country || partner.country || '';

  const badge = document.getElementById('ose-modal-region-badge');
  badge.textContent = region || 'International';
  badge.className = 'inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 capitalize ' + (OSE_REGION_BADGE[region] || 'bg-gray-100 text-gray-600');

  // Programs
  document.getElementById('ose-modal-programs').innerHTML = programs.map(
    prog => `<span class="px-3 py-1 bg-pcu-light text-pcu-blue text-sm rounded-full font-medium">${prog}</span>`
  ).join('');

  // Description
  const descWrap = document.getElementById('ose-modal-description-wrap');
  if (extra.description) {
    descWrap.classList.remove('hidden');
    document.getElementById('ose-modal-description').textContent = extra.description;
  } else {
    descWrap.classList.add('hidden');
  }

  // Duration
  const durWrap = document.getElementById('ose-modal-duration-wrap');
  if (extra.duration) {
    durWrap.classList.remove('hidden');
    document.getElementById('ose-modal-duration').textContent = extra.duration;
  } else {
    durWrap.classList.add('hidden');
  }

  // Deadline
  const dlWrap = document.getElementById('ose-modal-deadline-wrap');
  if (extra.deadline) {
    dlWrap.classList.remove('hidden');
    document.getElementById('ose-modal-deadline').textContent = extra.deadline;
  } else {
    dlWrap.classList.add('hidden');
  }

  // Requirements
  const reqWrap = document.getElementById('ose-modal-requirements-wrap');
  if (extra.requirements) {
    reqWrap.classList.remove('hidden');
    document.getElementById('ose-modal-requirements').textContent = extra.requirements;
  } else {
    reqWrap.classList.add('hidden');
  }

  // Notes
  const notesWrap = document.getElementById('ose-modal-notes-wrap');
  if (extra.notes) {
    notesWrap.classList.remove('hidden');
    document.getElementById('ose-modal-notes').textContent = extra.notes;
  } else {
    notesWrap.classList.add('hidden');
  }

  // Website
  const websiteBtn = document.getElementById('ose-modal-website');
  if (extra.website) {
    websiteBtn.href = extra.website;
    websiteBtn.classList.remove('hidden');
  } else {
    websiteBtn.classList.add('hidden');
  }

  // Admin edit button
  const adminBtn = document.getElementById('ose-modal-admin-edit-btn');
  if (typeof isAdminLoggedIn === 'function' && isAdminLoggedIn()) {
    adminBtn.classList.remove('hidden');
  } else {
    adminBtn.classList.add('hidden');
  }

  const modal = document.getElementById('ose-university-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => lucide.createIcons(), 30);
}

function openOseEditFormFromModal() {
  if (!oseModalCurrentName) return;
  closeOseUniversityModal();
  const raw = window.oseProgramData[oseModalCurrentName];
  const extra = (raw && raw.id) ? raw : null;
  if (typeof openOseEditForm === 'function') openOseEditForm(extra, oseModalCurrentName);
}

function closeOseUniversityModal(event) {
  if (event && event.target !== document.getElementById('ose-university-modal')) return;
  const modal = document.getElementById('ose-university-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  oseModalCurrentName = null;
}

// ---- DOMESTIC PARTNERSHIP DATA ----
const domesticPartners = [{"name": "Four Points By Sheraton Surabaya", "city": "Surabaya", "type": "International", "tier": "Iconic", "image": "Four Points By Sheraton Surabaya.jpg"}, {"name": "Hotel Double Tree by Hilton Surabaya", "city": "Surabaya", "type": "International", "tier": "Iconic", "image": "Hotel Double Tree by Hilton Surabaya.png"}, {"name": "JW Marriott Hotel Surabaya", "city": "Surabaya", "type": "International", "tier": "Iconic", "image": "JW Marriott Hotel Surabaya.svg"}, {"name": "PT GoTo Gojek Tokopedia Tbk", "city": "Jakarta", "type": "National", "tier": "Iconic", "image": "PT GoTo Gojek Tokopedia Tbk.svg"}, {"name": "PT Rekso Nasional Food (McDonald's)", "city": "Jakarta", "type": "International", "tier": "Iconic", "image": null}, {"name": "PT Tokopedia", "city": "Jakarta", "type": "National", "tier": "Iconic", "image": "PT Tokopedia.png"}, {"name": "PT. Graha Alam Lestari (The Apurva Kempinski Bali)", "city": "Denpasar", "type": "International", "tier": "Iconic", "image": "PT. Graha Alam Lestari (The Apurva Kempinski Bali).png"}, {"name": "Sheraton Surabaya Hotel", "city": "Surabaya", "type": "International", "tier": "Iconic", "image": "Sheraton Surabaya Hotel.png"}, {"name": "German Academic Exchange Service (DAAD) Indonesia", "city": "Jakarta", "type": "International", "tier": "Major", "image": "German Academic Exchange Service (DAAD) Indonesia.png"}, {"name": "ICAEW Indonesia", "city": "Jakarta", "type": "International", "tier": "Major", "image": "ICAEW Indonesia.png"}, {"name": "Indoprima Group", "city": "Surabaya", "type": "National", "tier": "Major", "image": "Indoprima Group.jpg"}, {"name": "Institut Pertanian Bogor (IPB)", "city": "Bogor", "type": "Education", "tier": "Major", "image": null}, {"name": "Maspion Group", "city": "Surabaya", "type": "National", "tier": "Major", "image": "Maspion Group.jpg"}, {"name": "PT Astra Sedaya Finance", "city": "Jakarta", "type": "National", "tier": "Major", "image": "PT Astra Sedaya Finance.png"}, {"name": "PT Astra Sedaya Finance (2nd agreement)", "city": "Jakarta", "type": "National", "tier": "Major", "image": null}, {"name": "PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim)", "city": "Surabaya", "type": "National", "tier": "Major", "image": "PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim).jpg"}, {"name": "PT Erajaya Swasembada Tbk", "city": "Jakarta", "type": "National", "tier": "Major", "image": "PT Erajaya Swasembada Tbk.svg"}, {"name": "PT Global Digital Niaga (Blibli)", "city": "Jakarta", "type": "National", "tier": "Major", "image": "PT Global Digital Niaga (Blibli).jpg"}, {"name": "PT Ishizuka Maspion Indonesia (Maspion Group)", "city": "Surabaya", "type": "National", "tier": "Major", "image": "PT Ishizuka Maspion Indonesia (Maspion Group).png"}, {"name": "PT. Bosch Rexroth", "city": "Jakarta", "type": "International", "tier": "Major", "image": "PT. Bosch Rexroth.png"}, {"name": "PT. Charoen Popkphand Indonesia Tbk - Jawa Timur", "city": "Sidoarjo", "type": "International", "tier": "Major", "image": "PT. Charoen Popkphand Indonesia Tbk - Jawa Timur.png"}, {"name": "PT. Semen Indonesia (Persero) Tbk.", "city": "Jakarta", "type": "National", "tier": "Major", "image": "PT. Semen Indonesia (Persero) Tbk..svg"}, {"name": "Samator Group", "city": "Surabaya", "type": "National", "tier": "Major", "image": "Samator Group.jpg"}, {"name": "Universitas Airlangga", "city": "Surabaya", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Andalas", "city": "Sumatera", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Hasanuddin (Fak. Kedokteran Gigi)", "city": "Makassar", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Indonesia (Fak. Kedokteran Gigi)", "city": "Jakarta", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Muhammadiyah Malang", "city": "Malang", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Negeri Surabaya (UNESA)", "city": "Surabaya", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Padjadjaran", "city": "Sumedang", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Padjajaran (Fak. Kedokteran Gigi)", "city": "Sumedang", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Sebelas Maret", "city": "Surakarta", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Sriwijaya (Fak. Kedokteran Gigi)", "city": "Palembang", "type": "Education", "tier": "Major", "image": null}, {"name": "Universitas Sumatera Utara (Fak. Kedokteran Gigi)", "city": "Medan", "type": "Education", "tier": "Major", "image": null}, {"name": "Wings Group Surabaya", "city": "Surabaya", "type": "National", "tier": "Major", "image": "Wings Group Surabaya.png"}, {"name": "Badan Pengembangan SDM Industri Kemenperin (PIDI)", "city": "Jakarta", "type": "Government", "tier": "Well-known", "image": "Badan Pengembangan SDM Industri Kemenperin (PIDI).png"}, {"name": "Kementrian Pendayagunaan Aparatur Negara dan RB", "city": "Jakarta", "type": "Government", "tier": "Well-known", "image": "Kementrian Pendayagunaan Aparatur Negara dan RB.png"}, {"name": "Komisi Nasional Disabilitas Republik Indonesia", "city": "Jakarta", "type": "Government", "tier": "Well-known", "image": "Komisi Nasional Disabilitas Republik Indonesia.png"}, {"name": "Mayapada Hospital", "city": "Surabaya", "type": "National", "tier": "Well-known", "image": "Mayapada Hospital.png"}, {"name": "Politeknik Negeri Malang", "city": "Malang", "type": "Education", "tier": "Well-known", "image": null}, {"name": "PT Grant Thornton Indonesia", "city": "Jakarta", "type": "International", "tier": "Well-known", "image": "PT Grant Thornton Indonesia.jpg"}, {"name": "PT Martina Berto Tbk (Marta Tilaar)", "city": "Jakarta", "type": "National", "tier": "Well-known", "image": "PT Martina Berto Tbk (Marta Tilaar).png"}, {"name": "PT Rembaka (La Tulipe)", "city": "Surabaya", "type": "National", "tier": "Well-known", "image": "PT Rembaka (La Tulipe).png"}, {"name": "PT Sinarmas Sekuritas", "city": "Jakarta", "type": "National", "tier": "Well-known", "image": "PT Sinarmas Sekuritas.png"}, {"name": "PT. Kosmetika Global Indonesia", "city": "Surabaya", "type": "National", "tier": "Well-known", "image": "PT. Kosmetika Global Indonesia.svg"}, {"name": "PT. Mitra Pinasthika Mulia (MPM)", "city": "Surabaya", "type": "National", "tier": "Well-known", "image": "PT. Mitra Pinasthika Mulia (MPM).jpg"}, {"name": "PT. Transforma Oto Prima (Mercedes-Benz)", "city": "Surabaya", "type": "International", "tier": "Well-known", "image": "PT. Transforma Oto Prima (Mercedes-Benz).jpg"}, {"name": "PT. Wahana Kosmetika Indonesia", "city": "Sidoarjo", "type": "National", "tier": "Well-known", "image": "PT. Wahana Kosmetika Indonesia.png"}, {"name": "RSM Indonesia", "city": "Jakarta", "type": "International", "tier": "Well-known", "image": "RSM Indonesia.png"}, {"name": "Sekretariat Jenderal Kementerian Sosial", "city": "Jakarta", "type": "Government", "tier": "Well-known", "image": "Sekretariat Jenderal Kementerian Sosial.png"}, {"name": "Tentara Nasional Indonesia AL (STTAL)", "city": "Surabaya", "type": "Government", "tier": "Well-known", "image": "Tentara Nasional Indonesia AL (STTAL).png"}, {"name": "Universitas Atma Jaya Yogyakarta", "city": "Yogyakarta", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Bina Nusantara", "city": "Jakarta", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Islam Indonesia", "city": "Yogyakarta", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Islam Sultan Agung", "city": "Semarang", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Jember (Fak. Kedokteran Gigi)", "city": "Jember", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Jenderal Ahmad Yani (Fak. Kedokteran Gigi)", "city": "Cimahi", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Jenderal Soedirman (Fak. Kedokteran Gigi)", "city": "Banyumas", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Lambung Mangkurat (Fak. Kedokteran Gigi)", "city": "Banjarmasin", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Muhammadiyah Semarang (Fak. Kedokteran Gigi)", "city": "Semarang", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Muhammadiyah Surabaya (Fak. Kedokteran Gigi)", "city": "Surabaya", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Muhammadiyah Yogyakarta (Fak. Kedokteran Gigi)", "city": "Yogyakarta", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Mulawarman (Fak. Kedokteran Gigi)", "city": "Samarinda", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Multimedia Nusantara", "city": "Banten", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Muslim Indonesia (Fak. Kedokteran Gigi)", "city": "Makassar", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Universitas Sanata Dharma", "city": "Yogyakarta", "type": "Education", "tier": "Well-known", "image": null}, {"name": "Yayasan Monash University Indonesia", "city": "Tangerang", "type": "International", "tier": "Well-known", "image": "Yayasan Monash University Indonesia.jpg"}, {"name": "Academy Computer Security Incident Response Team (ACAD CSIRT)", "city": "Jakarta", "type": "National", "tier": "Known", "image": "Academy Computer Security Incident Response Team (ACAD CSIRT).jpg"}, {"name": "Asosiasi Eksportir dan Produsen Handicraft Indonesia (ASEPHI)", "city": "Jakarta", "type": "National", "tier": "Known", "image": "Asosiasi Eksportir dan Produsen Handicraft Indonesia (ASEPHI).jpg"}, {"name": "Bebras Indonesia", "city": "Bandung", "type": "National", "tier": "Known", "image": "Bebras Indonesia.jpg"}, {"name": "Federation Internationale Du Beton Indonesia (FIB)", "city": "Semarang", "type": "International", "tier": "Known", "image": "Federation Internationale Du Beton Indonesia (FIB).png"}, {"name": "Foreign Policy Community of Indonesia (FPCI)", "city": "Jakarta", "type": "National", "tier": "Known", "image": "Foreign Policy Community of Indonesia (FPCI).jpg"}, {"name": "IDP South Jakarta", "city": "Jakarta", "type": "International", "tier": "Known", "image": "IDP South Jakarta.jpg"}, {"name": "Ikatan Akuntan Indonesia (IAI) Jatim", "city": "Surabaya", "type": "National", "tier": "Known", "image": "Ikatan Akuntan Indonesia (IAI) Jatim.png"}, {"name": "Institut Bisnis & Multimedia Asmi", "city": "Jakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Institut Kesehatan Helvetia", "city": "Medan", "type": "Education", "tier": "Known", "image": null}, {"name": "Institut Pertanian Bogor (IPB)", "city": "Bogor", "type": "Education", "tier": "Known", "image": null}, {"name": "Institut Teknologi dan Bisnis Asia Malang", "city": "Malang", "type": "Education", "tier": "Known", "image": null}, {"name": "Institut Teknologi Nasional Bandung (ITENAS)", "city": "Bandung", "type": "Education", "tier": "Known", "image": null}, {"name": "International Test Center (ITC)", "city": "Jakarta", "type": "International", "tier": "Known", "image": "International Test Center (ITC).png"}, {"name": "Jakarta International University (JIU)", "city": "Jakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Perkumpulan Project Management Indonesia (PMIIC)", "city": "Jakarta", "type": "National", "tier": "Known", "image": "Perkumpulan Project Management Indonesia (PMIIC).png"}, {"name": "Persatuan Dokter Gigi Indonesia Wilayah Jatim (PDGI)", "city": "Surabaya", "type": "National", "tier": "Known", "image": "Persatuan Dokter Gigi Indonesia Wilayah Jatim (PDGI).jpg"}, {"name": "PT Multi Spunindo Jaya", "city": "Sidoarjo", "type": "National", "tier": "Known", "image": "PT Multi Spunindo Jaya.png"}, {"name": "PT Odoo Software Indonesia", "city": "Tangerang", "type": "International", "tier": "Known", "image": "PT Odoo Software Indonesia.jpg"}, {"name": "PT Semen Imasco Asiatic", "city": "Jember", "type": "National", "tier": "Known", "image": "PT Semen Imasco Asiatic.png"}, {"name": "PT Surabaya Wire", "city": "Gresik", "type": "National", "tier": "Known", "image": "PT Surabaya Wire.png"}, {"name": "PT. Bosch Rexroth", "city": "Jakarta", "type": "International", "tier": "Known", "image": "PT. Bosch Rexroth.png"}, {"name": "PT. PathGen Diagnostik Teknologi", "city": "Jakarta", "type": "National", "tier": "Known", "image": "PT. PathGen Diagnostik Teknologi.png"}, {"name": "PT. Piaget Indonesia", "city": "Jakarta", "type": "International", "tier": "Known", "image": "PT. Piaget Indonesia.png"}, {"name": "PT. Saraswanti Indo Genetech Surabaya (SIG)", "city": "Surabaya", "type": "National", "tier": "Known", "image": "PT. Saraswanti Indo Genetech Surabaya (SIG).png"}, {"name": "PT. Sentra Vidya Utama (Sevima)", "city": "Surabaya", "type": "National", "tier": "Known", "image": "PT. Sentra Vidya Utama (Sevima).jpg"}, {"name": "STIKES Bethesda Yakkum", "city": "Yogyakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Abdurachman Saleh Situbondo (UNARS)", "city": "Situbondo", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Alma Ata", "city": "Yogyakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Almuslim", "city": "Bireuen", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Anwar Medika", "city": "Sidoarjo", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Baiturrahmah (Fak. Kedokteran Gigi)", "city": "Padang", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Dr. Soetomo", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Hamzanwadi", "city": "Lombok", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Hang Tuah", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Hayam Wuruk Perbanas", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas HKBP Nommensen Medan", "city": "Medan", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Islam Darul Ulum Lamongan", "city": "Lamongan", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Islam Sultan Agung (Fak. Kedokteran Gigi)", "city": "Semarang", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Kadiri (Fak. Kedokteran Gigi)", "city": "Kediri", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Kristen Indonesia Maluku (UKIM)", "city": "Ambon", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Kristen Indonesia Paulus (UKIP) Makassar", "city": "Makassar", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Kristen Papua (UKIP Sorong)", "city": "Sorong", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Mahasaraswati (UNMAS)", "city": "Denpasar", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Mega Buana Palopo", "city": "Palopo", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Merdeka Pasuruan", "city": "Pasuruan", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Muhammadiyah Sidoarjo", "city": "Sidoarjo", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Muhammadiyah Surakarta (Fak. Teknik)", "city": "Surakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Nahdlatul Ulama Surabaya", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Narotama", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Nasional (Fak. Ekonomi dan Bisnis)", "city": "Jakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Ottow Geissler Papua", "city": "Jayapura", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Pendidikan Ganesha (Undiksha)", "city": "Bali", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas PGRI Adi Buana Surabaya", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas PGRI Kanjuruhan Malang", "city": "Malang", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Prima Nusantara Bukittinggi", "city": "Bukittinggi", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Prof. Dr. Moestopo (Fak. Kedokteran Gigi)", "city": "Jakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Riau Kepulauan (UNRIKA)", "city": "Batam", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Syah Kuala (Fak. Kedokteran Gigi)", "city": "Aceh", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Triatma Mulya (UNTRIM)", "city": "Bali", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Tribhuwana Tunggadewi", "city": "Malang", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Widya Kartika (UWIKA)", "city": "Surabaya", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Widyatama", "city": "Bandung", "type": "Education", "tier": "Known", "image": null}, {"name": "Universitas Yarsi (Fak. Kedokteran Gigi)", "city": "Jakarta", "type": "Education", "tier": "Known", "image": null}, {"name": "Asosiasi Dosen Pengabdian Kepada Masyarakat Indonesia", "city": "Padang", "type": "National", "tier": "Regional", "image": "Asosiasi Dosen Pengabdian Kepada Masyarakat Indonesia.png"}, {"name": "Badan Arsip dan Perpustakaan Kota Surabaya", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "Badan Arsip dan Perpustakaan Kota Surabaya.jpg"}, {"name": "Badan Musyawarah Antar Gereja (BAMAG) Kota Surabaya", "city": "Surabaya", "type": "National", "tier": "Regional", "image": "Badan Musyawarah Antar Gereja (BAMAG) Kota Surabaya.jpg"}, {"name": "BPK PENABUR Bandung", "city": "Bandung", "type": "National", "tier": "Regional", "image": null}, {"name": "Forum Perpustakaan PT Indonesia (FPPTI) Jawa Tengah", "city": "Yogyakarta", "type": "National", "tier": "Regional", "image": null}, {"name": "Ikatan Citra Alumni Taiwan Indonesia (ICATI) Jatim", "city": "Surabaya", "type": "National", "tier": "Regional", "image": null}, {"name": "Junior Chamber International (JCI) East Java", "city": "Surabaya", "type": "International", "tier": "Regional", "image": null}, {"name": "PB Taxand", "city": "Surabaya", "type": "National", "tier": "Regional", "image": null}, {"name": "Pemerintah Desa Jarak Kec. Wonosalam Kab. Jombang", "city": "Jombang", "type": "Government", "tier": "Regional", "image": "Pemerintah Desa Jarak Kec. Wonosalam Kab. Jombang.png"}, {"name": "Pemerintah Desa Mojotrisno", "city": "Jombang", "type": "Government", "tier": "Regional", "image": "Pemerintah Desa Mojotrisno.jpg"}, {"name": "Pemerintah Kabupaten Sumba Barat Daya", "city": "NTT", "type": "Government", "tier": "Regional", "image": "Pemerintah Kabupaten Sumba Barat Daya.jpg"}, {"name": "Pemerintah Kabupaten Sumba Timur", "city": "NTT", "type": "Government", "tier": "Regional", "image": null}, {"name": "Pemerintahan Kabupaten Kaimana", "city": "Papua", "type": "Government", "tier": "Regional", "image": "Pemerintahan Kabupaten Kaimana.png"}, {"name": "Perserikatan Kurator dan Pengurus Indonesia (PKPI)", "city": "Surabaya", "type": "National", "tier": "Regional", "image": null}, {"name": "PT Centurion Perkasa Iman (Hotel Royal Tulip)", "city": "Surabaya", "type": "National", "tier": "Regional", "image": null}, {"name": "PT. Puri Padma Management (Padma Hotels)", "city": "Surabaya", "type": "National", "tier": "Regional", "image": null}, {"name": "RS Bhayangkara HS. Samsoeri Mertojoso", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "RS Bhayangkara HS. Samsoeri Mertojoso.png"}, {"name": "RS Bhayangkara Pusdik Sabhara Porong", "city": "Sidoarjo", "type": "Government", "tier": "Regional", "image": "RS Bhayangkara Pusdik Sabhara Porong.png"}, {"name": "RSUD Bhakti Dharma Husada", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "RSUD Bhakti Dharma Husada.jpg"}, {"name": "RSUD dr. Mohamad Soewandhie", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "RSUD dr. Mohamad Soewandhie.jpg"}, {"name": "RSUD Haji Provinsi Jawa Timur", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "RSUD Haji Provinsi Jawa Timur.jpg"}, {"name": "Rumah Sakit Jiwa Menur (RSJ Menur)", "city": "Surabaya", "type": "Government", "tier": "Regional", "image": "Rumah Sakit Jiwa Menur (RSJ Menur).png"}, {"name": "Sekolah Tinggi Ilmu Ekonomi (STIE) Malangkucecwara", "city": "Malang", "type": "Education", "tier": "Regional", "image": null}, {"name": "STISIP Widuri", "city": "Jakarta", "type": "Education", "tier": "Regional", "image": null}, {"name": "STITEK Dharma Yadi Makassar", "city": "Makassar", "type": "Education", "tier": "Regional", "image": null}, {"name": "STMIK Widuri", "city": "Jakarta", "type": "Education", "tier": "Regional", "image": null}, {"name": "Universitas Baiturahman (Fak. Kedokteran Gigi)", "city": "Padang", "type": "Education", "tier": "Regional", "image": null}, {"name": "Universitas Sains Dan Teknologi Komputer (STEKOM)", "city": "Semarang", "type": "Education", "tier": "Regional", "image": null}, {"name": "Universitas Syah Kuala (Fak. Kedokteran Gigi)", "city": "Aceh", "type": "Education", "tier": "Regional", "image": null}, {"name": "Wisma Jerman", "city": "Surabaya", "type": "International", "tier": "Regional", "image": "Wisma Jerman.jpg"}, {"name": "Artax", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Business Number Consulting (BNC)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Chung Chung Christian School", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "CV Agatha Management (AM Models)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "CV C PLUS C Desain Komunikasi (C+C&Co)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "CV Zentax Consulting", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "CV. Jalan Cerita Kesuksesan (JCK Enterprise)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "CV. Mycon Indonesia", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Elyon Christian School", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "GENARTA Collection", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Gereja Kristen Jawi Wetan (GKJW)", "city": "Malang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Gereja Kristen Kalam Kudus (GKKK) Nanga Pinoh", "city": "Melawi", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Gereja Sidang Jemaat Allah Eben Haezer (GSJA)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "GII Commerce", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Handyman Smart Home", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Indonesia Cyber Education Institute (ICE Institute)", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Indonesian Fashion Chamber", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Komunitas Surabaya Tempo Dulu", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Kumpulan Alumni Teknik Sipil 1979", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Lembaga Alkitab Indonesia (LAI)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Lembaga Konseling Keluarga Kreatif (LK3)", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "M.E. Social Media Management", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Mari Works", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "MMA Center", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Nuadu", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Ob Anggen School", "city": "Papua", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Ozora Yatrapaktaja", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Perhimpunan INDONESIA TIONGHOA Jawa Timur (INTI)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Perkumpulan HWIE TIAUW KA SURABAYA", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Poshana", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PPPK Petra Surabaya", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Agro Mitra Alimentare (AMA)", "city": "Malang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Aruna Veda Kreasi", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Asia Bina Parama (English 1 Swara Group)", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Asuransi Mega Pratama", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Ayena Mandiri Sinema (Ayena Studio)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Bakels Indonesia", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Berca Hardayaperkasa", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Berpikir Revolusioner Indonesia (Narasio)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Biochem Technology", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Bukit Vista Nusantara", "city": "Bali", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Creosis International", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Cross Network Indonesia", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Deus Digital Tranformasi Universal", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Dinamika Manajemen Investama (Duo Dinamika)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Dora Bisnis Konsultindo", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Dunia Bayar Indonesia (AiYO)", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Elefante Infradiji Solusi", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT ePac Flexibles Indonesia", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Graha Inti Jaya", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Gree Electric Appliances Indonesia", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Hatsonsurya Electric (Hartono)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Havanna Teguh Sadana", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT IDNFT Menuju Bulan", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Indo Ceria Plastik dan Printing", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Industrial Robotic Automation (IRA)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Insan Sejahtera Engineering", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Intidaya Dinamika Sejati", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Kawan Main Bersama (Tabletoys Indonesia)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Kuncie Pintar Nusantara", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Lanius", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Layo Seng Fong", "city": "Jombang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Lentera Edukasi Global (LEG)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Lingkar Indonesia Unggul (ISCEA Indonesia)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Mahaghora", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Mentari Mas Multimoda", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Mitra Akademi Perkasa", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Mitra Akselerasi Bersama (MAB Consulting)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Murni Solusindo Nusantara", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Nusatama Properta Panbil", "city": "Batam", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Pasagung Anthrakia Semesta", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Perkumpulan Prakarsa Jaringan Cerdas Indonesia (PJCI)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Populix Informasi Teknologi", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Purindo Solusi Prosper (DPO&Co)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Samaya Multikarya Sentosa", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Surya Multi Cemerlang", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Surya Sarana Dinamika (SSD)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Surya Sukses Abadi Prima", "city": "—", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Tancorp Abadi Nusantara", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Taranium Rantai Blok Indonesia", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Tiga Dinamika Solusi Indonesia (3DS)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Tribelio Digital Global", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT ValuePlus Indoraya", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Visiniaga Mitra Kreasindo", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Wahana Kemalaniaga Makmur (WAKENI)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Yayasan Sosial Kristen Salib Putih", "city": "Salatiga", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Berawal Dari Media (Socioworks)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Bintang Sempurna", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Bosch Rexroth", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": "PT. Bosch Rexroth.png"}, {"name": "PT. Ceria Belajar Edukasi Indonesia (Wondermind)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Damai Sejagtera Abadi Tbk (UFOE)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Fuboru Indonesia", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Global Industri Teknologi Solusi (GITS)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Himalaya Sinar Abadi", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Kresna Karya Teknologi", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Mataram Paint", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Mikatasa Agung", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Riliv Psikologi Indonesia", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Satoria Agro Industri", "city": "Pasuruan", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Silverstream Indonesia Sehat", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Sinko Prima Alloy", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Sosial Berkat Kreatif Indonesia (Social Bread)", "city": "Tangerang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. SRC Indonesia Sembilan", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Suparma Tbk", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Tata Rapika Globalindo", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Wiralab Analitika Solusindo", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Revolt Industry", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Riza & Yenny Family", "city": "Australia", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Rumah Sakit William Booth", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "SD Negeri Siwalankerto II/419", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Betzata", "city": "Minahasa", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Buin Batu", "city": "NTB", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Dasar Kristen Anugerah", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Kristen Anak Bangsa", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Kristen Kalam Kudus (SKKK) Pematang Siantar", "city": "Pematang Siantar", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Luar Biasa (SLB) Siswa Budhi", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Teologi Kristen Pelangi Kristus", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Tinggi Teologi (STT) Amadeus", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Tinggi Teologi (STT) Tawangmangu", "city": "Karanganyar", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Tinggi Teologi (STT) Torsina", "city": "Karanganyar", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sekolah Tinggi Teologi Reformed Indonesia (STTRI)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Sending WEC Indonesia", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "SMALB Siswa Budhi", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "SMP Negeri 57 Surabaya", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "SMPLB-A YPAB Surabaya", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Surya Megah Expertindo", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Tanda Seru", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Universitas Pradita", "city": "Jakarta", "type": "Education", "tier": "Local", "image": null}, {"name": "Visualcast Designology (CV Signum Prospera)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Vooya", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Atedia Sumber Damai", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Bersatu Membangun Bangsa", "city": "Pontianak", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Caraka Mulia", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Cinta Baca", "city": "Bogor", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Eben Haezar", "city": "Manado", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Edukasi Inti Pratama (IDS College)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Exodus (REC)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Habitat Kemanusiaan Indonesia (YHKI)", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Haggai Indonesia", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Harapan Cerah", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Indonesia Sejahtera Barokah (YISB)", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan K-Pact Nusantara", "city": "Kupang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Kalam Kudus Indonesia (YKKI) Ambon", "city": "Ambon", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Kalam Kudus Indonesia (YKKI) Medan", "city": "Medan", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Mawar Sharon Peduli", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Medicom Charity", "city": "Malang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Monash University Indonesia", "city": "Tangerang", "type": "International", "tier": "Local", "image": "Yayasan Monash University Indonesia.jpg"}, {"name": "Yayasan Pakta Peduli Indonesia", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Pendidikan Kristen (YPK) Jawa Timur", "city": "Malang", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Pendidikan Kristen Gloria", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Pendidikan Kristen Sunodia", "city": "Samarinda", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yayasan Reformasi Injili Millennium", "city": "Jakarta", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Yong Chun Chinese Language Center", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "Perkumpulan Talenta Karya Sentosa", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Biochem Technology", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Elefante Infradiji Solusi", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Starr Panel Industri", "city": "Pasuruan", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT Wahana Kosmetika Indonesia", "city": "Sidoarjo", "type": "Regional / local", "tier": "Local", "image": null}, {"name": "PT. Kosmetika Global Indonesia", "city": "Surabaya", "type": "Regional / local", "tier": "Local", "image": "PT. Kosmetika Global Indonesia.svg"}, {"name": "Sekolah Tinggi Informatika & Komputer Indonesia (STIKI)", "city": "Malang", "type": "Education", "tier": "Local", "image": null}, {"name": "Universitas Katolik Indonesia Santu Paulus Ruteng", "city": "NTT", "type": "Education", "tier": "Local", "image": null}];

function toggleDomesticBox(boxId) {
  if (boxId === 'cities' || boxId === 'type') {
    openDomesticModal(boxId);
    return;
  }
  const box = document.getElementById('dp-total-box');
  if (box) {
    const wasHidden = box.classList.contains('hidden');
    box.classList.toggle('hidden');
    if (wasHidden) loadDomesticLogos();
  }
}

const domesticLogoFiles = [
  "PT Multi Spunindo Jaya.png","IDP South Jakarta.jpg","Four Points By Sheraton Surabaya.jpg",
  "Pemerintah Kabupaten Sumba Timur logo.jpg","Pemerintah Desa Jarak Kec. Wonosalam Kab. Jombang.png",
  "PT Surabaya Wire.png","Federation Internationale Du Beton Indonesia (FIB).png",
  "Badan Pengembangan SDM Industri Kemenperin (PIDI).png","PT. Mitra Pinasthika Mulia (MPM).jpg",
  "Sheraton Surabaya Hotel.png","Asosiasi Dosen Pengabdian Kepada Masyarakat Indonesia.png",
  "Perkumpulan Project Management Indonesia (PMIIC).png","PT Tokopedia.png",
  "PT Astra Sedaya Finance.png","Badan Musyawarah Antar Gereja (BAMAG) Kota Surabaya.jpg",
  "PT Sinarmas Sekuritas.png","Komisi Nasional Disabilitas Republik Indonesia.png",
  "PT. Bosch Rexroth.png","PT Bank Pembangunan Daerah Jawa Timur Tbk (Bank Jatim).jpg",
  "RS Bhayangkara HS. Samsoeri Mertojoso.png","PT. Semen Indonesia (Persero) Tbk..svg",
  "PT. PathGen Diagnostik Teknologi.png","Foreign Policy Community of Indonesia (FPCI).jpg",
  "Academy Computer Security Incident Response Team (ACAD CSIRT).jpg",
  "RS Bhayangkara Pusdik Sabhara Porong.png","Sekretariat Jenderal Kementerian Sosial.png",
  "PT Ishizuka Maspion Indonesia (Maspion Group).png","PT. Sentra Vidya Utama (Sevima).jpg",
  "PT Semen Imasco Asiatic.png","Maspion Group.jpg","Bebras Indonesia.jpg",
  "Yayasan Monash University Indonesia.jpg","Pemerintahan Kabupaten Kaimana.png",
  "Mayapada Hospital.png","PT Martina Berto Tbk (Marta Tilaar).png",
  "Tentara Nasional Indonesia AL (STTAL).png","PT. Wahana Kosmetika Indonesia.png",
  "PT Rekso Nasional Food (McDonald_s).png","PT Erajaya Swasembada Tbk.svg",
  "PT Rembaka (La Tulipe).png","Kementrian Pendayagunaan Aparatur Negara dan RB.png",
  "Badan Arsip dan Perpustakaan Kota Surabaya.jpg","German Academic Exchange Service (DAAD) Indonesia.png",
  "Indoprima Group.jpg","International Test Center (ITC).png",
  "Pemerintah Kabupaten Sumba Barat Daya.jpg","Wisma Jerman.jpg","Samator Group.jpg",
  "JW Marriott Hotel Surabaya.svg","Hotel Double Tree by Hilton Surabaya.png","ICAEW Indonesia.png",
  "PT Odoo Software Indonesia.jpg","PT. Piaget Indonesia.png","Pemerintah Desa Mojotrisno.jpg",
  "Persatuan Dokter Gigi Indonesia Wilayah Jatim (PDGI).jpg",
  "PT. Charoen Popkphand Indonesia Tbk - Jawa Timur.png",
  "Asosiasi Eksportir dan Produsen Handicraft Indonesia (ASEPHI).jpg",
  "RSUD Haji Provinsi Jawa Timur.jpg","RSUD dr. Mohamad Soewandhie.jpg",
  "Rumah Sakit Jiwa Menur (RSJ Menur).png","PT. Graha Alam Lestari (The Apurva Kempinski Bali).png",
  "PT. Transforma Oto Prima (Mercedes-Benz).jpg","PT Grant Thornton Indonesia.jpg",
  "PT GoTo Gojek Tokopedia Tbk.svg","PT Global Digital Niaga (Blibli).jpg",
  "PT. Kosmetika Global Indonesia.svg","PT. Saraswanti Indo Genetech Surabaya (SIG).png",
  "Ikatan Akuntan Indonesia (IAI) Jatim.png","RSM Indonesia.png",
  "RSUD Bhakti Dharma Husada.jpg","Wings Group Surabaya.png"
];

function loadDomesticLogos() {
  const container = document.getElementById('dp-logos-grid');
  if (!container || container.children.length > 0) return;
  const makeItem = (file) => {
    const name = file.replace(/\.[^.]+$/, '');
    const src = 'Assets/Images/Industries/' + encodeURIComponent(file);
    return '<div class="flex flex-col items-center gap-2 flex-shrink-0" style="width:80px;">' +
      '<div class="w-16 h-16 rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center overflow-hidden hover:shadow-lg hover:border-pcu-blue/30 transition" style="flex-shrink:0;">' +
      '<img src="' + src + '" alt="' + name.replace(/"/g, '&quot;') + '" class="max-h-12 max-w-full object-contain p-1" loading="lazy">' +
      '</div>' +
    '</div>';
  };
  const items = [...domesticLogoFiles, ...domesticLogoFiles];
  container.innerHTML = items.map(makeItem).join('');
}

function openDomesticModal(view) {
  const modal = document.getElementById('dp-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('app').style.overflow = 'hidden';
  renderDomesticModalContent(view);
}

function closeDomesticModal() {
  const modal = document.getElementById('dp-modal');
  if (modal) modal.style.display = 'none';
  document.getElementById('app').style.overflow = '';
}

window._dpView = null;

function renderDomesticModalContent(view, selected) {
  window._dpView = view;
  const modalBody = document.getElementById('dp-modal-body');
  if (!modalBody) return;

  const typeIcons = { 'Education': 'graduation-cap', 'Government': 'landmark', 'International': 'globe', 'National': 'flag', 'Regional / local': 'map-pin' };
  const typeColors = { 'Education': 'bg-blue-50 text-blue-600', 'Government': 'bg-purple-50 text-purple-600', 'International': 'bg-teal-50 text-teal-600', 'National': 'bg-orange-50 text-orange-600', 'Regional / local': 'bg-green-50 text-green-600' };

  if (view === 'cities') {
    if (selected !== undefined) {
      const pts = domesticPartners.filter(p => p.city === selected);
      modalBody.innerHTML = '<div class="flex items-center gap-3 mb-6">' +
        '<button onclick="renderDomesticModalContent(\'cities\')" class="p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"><i data-lucide="arrow-left" class="w-5 h-5 text-gray-600"></i></button>' +
        '<div><h3 class="font-display text-xl font-bold text-pcu-blue">' + selected + '</h3>' +
        '<p class="text-gray-500 text-sm">' + pts.length + ' partner' + (pts.length !== 1 ? 's' : '') + '</p></div>' +
        '</div>' +
        '<div class="space-y-2">' +
        pts.map((p, i) =>
          '<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">' +
          '<span class="text-xs font-bold text-gray-400 w-6 text-right flex-shrink-0">' + (i+1) + '</span>' +
          '<span class="font-medium text-gray-800 text-sm flex-1">' + p.name + '</span>' +
          '<span class="ml-auto px-2 py-0.5 text-xs rounded-full bg-pcu-blue/10 text-pcu-blue flex-shrink-0">' + p.type + '</span>' +
          '</div>'
        ).join('') +
        '</div>';
    } else {
      const counts = {};
      domesticPartners.forEach(p => { counts[p.city] = (counts[p.city] || 0) + 1; });
      const cities = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      modalBody.innerHTML = '<h3 class="font-display text-xl font-bold text-pcu-blue mb-5">Partner Cities</h3>' +
        '<div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="dp-cities-grid"></div>';
      const grid = modalBody.querySelector('#dp-cities-grid');
      cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-pcu-blue hover:text-white transition text-left group';
        btn.innerHTML = '<span class="font-semibold text-sm text-gray-700 group-hover:text-white truncate pr-2">' + city + '</span>' +
          '<span class="text-xs font-bold text-gray-400 group-hover:text-white/80 flex-shrink-0">' + counts[city] + '</span>';
        btn.addEventListener('click', () => renderDomesticModalContent('cities', city));
        grid.appendChild(btn);
      });
    }
  } else {
    if (selected !== undefined) {
      const pts = domesticPartners.filter(p => p.type === selected);
      modalBody.innerHTML = '<div class="flex items-center gap-3 mb-6">' +
        '<button onclick="renderDomesticModalContent(\'type\')" class="p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"><i data-lucide="arrow-left" class="w-5 h-5 text-gray-600"></i></button>' +
        '<div><h3 class="font-display text-xl font-bold text-pcu-blue">' + selected + '</h3>' +
        '<p class="text-gray-500 text-sm">' + pts.length + ' partner' + (pts.length !== 1 ? 's' : '') + '</p></div>' +
        '</div>' +
        '<div class="space-y-2">' +
        pts.map((p, i) =>
          '<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">' +
          '<span class="text-xs font-bold text-gray-400 w-6 text-right flex-shrink-0">' + (i+1) + '</span>' +
          '<span class="font-medium text-gray-800 text-sm flex-1">' + p.name + '</span>' +
          '<span class="ml-auto px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500 flex-shrink-0">' + p.city + '</span>' +
          '</div>'
        ).join('') +
        '</div>';
    } else {
      const counts = {};
      domesticPartners.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
      const types = Object.keys(counts).sort();
      modalBody.innerHTML = '<h3 class="font-display text-xl font-bold text-pcu-blue mb-5">Partner Types</h3>' +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="dp-types-grid"></div>';
      const grid = modalBody.querySelector('#dp-types-grid');
      types.forEach(type => {
        const btn = document.createElement('button');
        btn.className = 'flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-pcu-blue hover:text-white transition text-left group';
        const colorClass = typeColors[type] || 'bg-gray-100 text-gray-500';
        const iconName = typeIcons[type] || 'building';
        btn.innerHTML = '<div class="w-10 h-10 rounded-xl ' + colorClass + ' flex items-center justify-center flex-shrink-0 group-hover:bg-white/20"><i data-lucide="' + iconName + '" class="w-5 h-5"></i></div>' +
          '<div><p class="font-semibold text-gray-800 group-hover:text-white">' + type + '</p>' +
          '<p class="text-sm text-gray-400 group-hover:text-white/70">' + counts[type] + ' partners</p></div>';
        btn.addEventListener('click', () => renderDomesticModalContent('type', type));
        grid.appendChild(btn);
      });
    }
  }
  lucide.createIcons();
}


// ---- INTERNSHIP DATA ----
const industryPartners = [
  { name: "Ciputra Group", sector: "manufacturing", desc: "Leading property developer with offices across Indonesia and Southeast Asia.", location: "Surabaya, Indonesia" },
  { name: "Tokopedia", sector: "technology", desc: "Indonesia's largest e-commerce platform offering tech and business internships.", location: "Jakarta, Indonesia" },
  { name: "Gojek", sector: "technology", desc: "Super-app providing ride-hailing, logistics, payments, and more.", location: "Jakarta, Indonesia" },
  { name: "Bank Central Asia (BCA)", sector: "finance", desc: "One of Indonesia's largest private banks with robust internship programs.", location: "Jakarta, Indonesia" },
  { name: "Mandiri Bank", sector: "finance", desc: "State-owned bank offering finance, risk management, and IT internships.", location: "Jakarta, Indonesia" },
  { name: "Deloitte Indonesia", sector: "finance", desc: "Global audit and consulting firm with structured internship tracks.", location: "Surabaya / Jakarta" },
  { name: "Ogilvy Indonesia", sector: "creative", desc: "Global advertising agency offering creative, strategy, and digital internships.", location: "Jakarta, Indonesia" },
  { name: "KompasGramedia", sector: "creative", desc: "Indonesia's largest media group covering print, digital, and broadcasting.", location: "Jakarta, Indonesia" },
  { name: "Shangri-La Hotels", sector: "hospitality", desc: "Luxury hotel chain offering internships in hospitality management.", location: "Surabaya, Indonesia" },
  { name: "Sheraton Hotels & Resorts", sector: "hospitality", desc: "International hotel chain with guest experience and event management tracks.", location: "Surabaya, Indonesia" },
  { name: "Samsung Electronics", sector: "technology", desc: "Global tech company offering engineering and marketing internships.", location: "Jakarta, Indonesia" },
  { name: "Astra International", sector: "manufacturing", desc: "Diversified conglomerate in automotive, agribusiness, and infrastructure.", location: "Jakarta, Indonesia" },
];

const internshipOpportunities = [
  { title: "UI/UX Design Intern", company: "Tokopedia", sector: "technology", duration: "3 months", deadline: "31 July 2025", type: "Paid", description: "Work with the product team to design user-friendly interfaces for Tokopedia's mobile and web platforms." },
  { title: "Finance & Accounting Intern", company: "Deloitte Indonesia", sector: "finance", duration: "6 months", deadline: "15 August 2025", type: "Paid", description: "Support audit teams with financial data analysis, documentation, and client presentations." },
  { title: "Digital Marketing Intern", company: "Ogilvy Indonesia", sector: "creative", duration: "3 months", deadline: "20 July 2025", type: "Paid", description: "Assist with social media campaigns, content strategy, and performance analytics for top brands." },
  { title: "Software Engineering Intern", company: "Gojek", sector: "technology", duration: "3 months", deadline: "10 August 2025", type: "Paid", description: "Contribute to backend or frontend features used by millions of daily active users." },
  { title: "Front Office & Guest Relations Intern", company: "Shangri-La Hotels", sector: "hospitality", duration: "6 months", deadline: "1 September 2025", type: "Paid + Housing", description: "Gain hands-on hospitality management experience in a 5-star international hotel environment." },
  { title: "Business Development Intern", company: "Astra International", sector: "manufacturing", duration: "3 months", deadline: "25 July 2025", type: "Paid", description: "Support the strategic growth team with market research, partner outreach, and proposal preparation." },
];

let ipCurrentSector = 'all';

function filterPartners(sector) {
  ipCurrentSector = sector;
  document.querySelectorAll('.ip-tab').forEach(t => {
    if (t.dataset.sector === sector) {
      t.className = 'ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-teal-600 text-white transition';
    } else {
      t.className = 'ip-tab px-5 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600 transition';
    }
  });
  renderIndustryPartners();
}

function renderIndustryPartners() {
  const grid = document.getElementById('industry-partners-grid');
  if (!grid) return;
  const filtered = ipCurrentSector === 'all' ? industryPartners : industryPartners.filter(p => p.sector === ipCurrentSector);
  const sectorColors = {
    technology: 'bg-blue-50 text-blue-700 border-blue-100',
    finance: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    manufacturing: 'bg-orange-50 text-orange-700 border-orange-100',
    creative: 'bg-purple-50 text-purple-700 border-purple-100',
    hospitality: 'bg-pink-50 text-pink-700 border-pink-100',
  };
  const sectorIcons = {
    technology: 'cpu', finance: 'landmark', manufacturing: 'factory', creative: 'palette', hospitality: 'utensils'
  };
  grid.innerHTML = filtered.map(p => `
    <div class="program-card bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:border-teal-300">
      <div class="flex items-start gap-3 mb-3">
        <div class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
          <i data-lucide="${sectorIcons[p.sector] || 'building'}" class="w-5 h-5 text-teal-600"></i>
        </div>
        <div>
          <h3 class="font-semibold text-pcu-blue leading-snug">${p.name}</h3>
          <p class="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><i data-lucide="map-pin" class="w-3 h-3"></i> ${p.location}</p>
        </div>
      </div>
      <p class="text-sm text-gray-500 leading-relaxed mb-3">${p.desc}</p>
      <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border capitalize ${sectorColors[p.sector] || 'bg-gray-50 text-gray-600'}">${p.sector.replace('_',' ')}</span>
    </div>
  `).join('');
  lucide.createIcons();
}

function renderInternshipOpportunities() {
  const list = document.getElementById('internship-opportunities-list');
  if (!list) return;
  list.innerHTML = internshipOpportunities.map(op => `
    <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <h3 class="font-semibold text-pcu-blue text-lg">${op.title}</h3>
            <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-100">${op.type}</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1.5"><i data-lucide="building-2" class="w-3.5 h-3.5 text-teal-500"></i> ${op.company}</p>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">${op.description}</p>
          <div class="flex flex-wrap gap-4 text-xs text-gray-400">
            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-teal-500"></i> Duration: <strong class="text-gray-600">${op.duration}</strong></span>
            <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-500"></i> Deadline: <strong class="text-red-500">${op.deadline}</strong></span>
          </div>
        </div>
        <div class="sm:shrink-0">
          <a href="mailto:io@petra.ac.id" class="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-full hover:bg-teal-700 transition whitespace-nowrap">
            Apply Now <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// ---- NEWS CAROUSEL ----
let newsCarouselIndex = 0;
// latestNewsData is kept in sync by admin.js refreshNewsData(); starts from allNews
window.latestNewsData = allNews.slice(0, 4);

function renderNewsCarousel() {
  const container = document.getElementById('newsCarouselContainer');
  if (!container) return;
  const latest = window.latestNewsData || allNews.slice(0, 4);
  if (newsCarouselIndex >= latest.length) newsCarouselIndex = 0;
  const currentNews = latest[newsCarouselIndex];
  const bgStyle = currentNews.imageUrl
    ? `background-image:url('${currentNews.imageUrl}');background-size:cover;background-position:center;`
    : '';
  const gradientClass = currentNews.imageUrl ? '' : `bg-gradient-to-br ${currentNews.color || 'from-pcu-blue to-pcu-sky'}`;
  container.innerHTML = `
    <div class="w-full h-full ${gradientClass} relative overflow-hidden cursor-pointer group" style="${bgStyle}" onclick="navigateTo('${currentNews.id}');return false">
      ${currentNews.imageUrl ? '<div class="absolute inset-0 bg-black/50"></div>' : '<div class="absolute inset-0 bg-black/20"></div>'}
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8">
        <div class="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">${currentNews.tag.replace('#', '')}</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-3 leading-tight max-w-3xl">${currentNews.title}</h2>
        <p class="text-white/80 text-base max-w-2xl mb-5 line-clamp-2">${currentNews.excerpt}</p>
        <span class="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">Read Full Article <i data-lucide="arrow-right" class="w-5 h-5"></i></span>
      </div>
    </div>
  `;
  updateCarouselDots();
  lucide.createIcons();
}

function updateCarouselDots() {
  const dotsContainer = document.getElementById('carouselDots');
  if (!dotsContainer) return;
  const latest = window.latestNewsData || allNews.slice(0, 4);
  dotsContainer.innerHTML = latest.map((_, i) => `
    <div class="dot ${i === newsCarouselIndex ? 'active' : ''}" onclick="newsCarouselGo(${i})" style="cursor: pointer;"></div>
  `).join('');
}

function newsCarouselNext() {
  const latest = window.latestNewsData || allNews.slice(0, 4);
  newsCarouselIndex = (newsCarouselIndex + 1) % latest.length;
  renderNewsCarousel();
}

function newsCarouselPrev() {
  const latest = window.latestNewsData || allNews.slice(0, 4);
  newsCarouselIndex = (newsCarouselIndex - 1 + latest.length) % latest.length;
  renderNewsCarousel();
}

function newsCarouselGo(index) {
  const latest = window.latestNewsData || allNews.slice(0, 4);
  newsCarouselIndex = Math.max(0, Math.min(index, latest.length - 1));
  renderNewsCarousel();
}

// ---- NEWS CATEGORIES ----
let selectedCategory = 'all';
let searchQuery = '';

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;
  
  const categories = ['all', '#inboundstudents', '#outboundstudents', '#partnership', '#general'];
  const categoryLabels = {
    'all': 'All News',
    '#inboundstudents': 'Inbound Students',
    '#outboundstudents': 'Outbound Students',
    '#partnership': 'Partnership',
    '#general': 'General'
  };
  
  container.innerHTML = categories.map(cat => `
    <span class="news-category inline-flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer transition ${selectedCategory === cat ? 'bg-pcu-light text-pcu-blue' : 'bg-white border border-gray-200 hover:bg-pcu-light'}" onclick="filterNewsByCategory('${cat}');return false">${categoryLabels[cat]}</span>
  `).join('');
}

function filterNewsByCategory(category) {
  selectedCategory = category;
  renderCategories();
  filterAndRenderNews();
}

// ---- NEWS SEARCH ----
function filterAndRenderNews() {
  let filtered = window.allNews || allNews;

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(n => n.tag === selectedCategory);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(query) ||
      n.excerpt.toLowerCase().includes(query) ||
      n.tag.toLowerCase().includes(query)
    );
  }

  renderNews('newsList', filtered);
}

// ---- INIT ----
renderNews('homeNews', allNews.slice(0, 3));
renderNews('newsList', allNews);
renderNews('inboundNews', allNews.filter(n => n.tag === '#inboundstudents').slice(0, 3));
renderNews('outboundNews', allNews.filter(n => n.tag === '#outboundstudents').slice(0, 3));

// Initialize news carousel and controls
renderNewsCarousel();
renderCategories();

// Add carousel navigation listeners
document.getElementById('newsCarouselPrev')?.addEventListener('click', newsCarouselPrev);
document.getElementById('newsCarouselNext')?.addEventListener('click', newsCarouselNext);

// Add search functionality
document.getElementById('newsSearchInput')?.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  filterAndRenderNews();
});

lucide.createIcons();
initRevealObserver();
applyConfig(defaultConfig);

// ---- MEETING REQUEST FORM MODAL ----
function openMeetingRequestModal() {
  const modal = document.getElementById('meeting-request-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeMeetingRequestModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('meeting-request-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !document.getElementById('meeting-request-modal').classList.contains('hidden')) {
    closeMeetingRequestModal();
  }
});

document.getElementById('meetingRequestForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const raw = Object.fromEntries(new FormData(form));

  const payload = {
    institutionName: raw.institutionName,
    address:         raw.address,
    country:         raw.country,
    website:         raw.website,
    fields:          [...form.querySelectorAll('input[name="field"]:checked')].map(el => el.value),
    fieldOtherText:  document.getElementById('fieldOtherCheck').checked ? raw.fieldOtherText : '',
    date1: raw.date1, time1: raw.time1, duration1: raw.duration1,
    date2: raw.date2, time2: raw.time2, duration2: raw.duration2,
    objectives:  [1,2,3,4,5].map(i => raw['objective'+i]).filter(Boolean),
    departments: [...form.querySelectorAll('input[name="dept"]:checked')].map(el => el.value),
    pic: {
      title:      raw.picTitle,
      givenName:  raw.picGivenName,
      familyName: raw.picFamilyName,
      position:   raw.picPosition,
      division:   raw.picDivision,
      email:      raw.picEmail,
      phone:      raw.picPhone,
    },
    participants: [1,2,3,4,5].map(i => ({
      title:      raw['p'+i+'Title'],
      givenName:  raw['p'+i+'Given'],
      familyName: raw['p'+i+'Family'],
      position:   raw['p'+i+'Position'],
      division:   raw['p'+i+'Division'],
    })).filter(p => p.givenName || p.familyName),
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';

  try {
    const res = await fetch('https://international-office-website-production.up.railway.app/api/submit-meeting-request', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Server error ' + res.status);
    showMeetingRequestSuccess();
    form.reset();
  } catch (err) {
    console.error('Submission failed:', err);
    alert('Could not submit the form. Please make sure the backend server is running, or email us directly at head-partnership@petra.ac.id');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

function showMeetingRequestSuccess() {
  const modal = document.getElementById('meeting-request-modal');
  const form  = document.getElementById('meetingRequestForm');
  form.style.display = 'none';

  const success = document.createElement('div');
  success.id = 'meetingSuccessMsg';
  success.className = 'px-8 py-16 flex flex-col items-center text-center';
  success.innerHTML = `
    <div class="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-6">
      <i data-lucide="check-circle" class="w-8 h-8 text-pcu-purple"></i>
    </div>
    <h3 class="font-display text-2xl font-bold text-pcu-purple mb-3">Request Submitted!</h3>
    <p class="text-gray-500 max-w-sm mb-8">Your meeting request has been received and saved. We'll get back to you at <strong>${document.getElementById('meetingRequestForm').picEmail?.value || 'your email'}</strong> soon.</p>
    <button onclick="closeMeetingRequestAfterSuccess()" class="px-8 py-2.5 bg-pcu-purple text-white text-sm font-semibold rounded-full hover:bg-violet-600 transition">Close</button>
  `;
  modal.querySelector('.bg-white').appendChild(success);
  lucide.createIcons();
}

function closeMeetingRequestAfterSuccess() {
  const success = document.getElementById('meetingSuccessMsg');
  if (success) success.remove();
  document.getElementById('meetingRequestForm').style.display = '';
  closeMeetingRequestModal();
}