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
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  document.getElementById('app').scrollTop = 0;
  // Re-trigger reveal animations
  setTimeout(initRevealObserver, 100);
  setTimeout(() => lucide.createIcons(), 50);
  // Lazy render new pages
  if (pageId === 'outbound-semester-exchange') {
    setTimeout(() => { renderOsePartners(); }, 60);
  }
  if (pageId === 'internship') {
    setTimeout(() => { renderIndustryPartners(); renderInternshipOpportunities(); }, 60);
  }
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
const allNews = [
  { id: 'news-1', title: 'PCU Welcomes 45 Exchange Students from 12 Countries', date: 'Dec 15, 2024', tag: '#inboundstudents', color: 'from-pcu-blue to-pcu-sky', excerpt: 'Petra Christian University opens its campus to 45 incoming students from 12 partner countries for a semester of cultural exchange and academic collaboration.' },
  { id: 'news-2', title: 'New Partnership with University of Tokyo Announced', date: 'Nov 28, 2024', tag: '#partnership', color: 'from-pcu-gold to-yellow-500', excerpt: 'PCU Global signs a strategic new partnership with the University of Tokyo, expanding opportunities for joint research and student mobility.' },
  { id: 'news-3', title: 'PCU Students Win International Innovation Competition', date: 'Nov 10, 2024', tag: '#outboundstudents', color: 'from-teal-500 to-emerald-600', excerpt: 'A team of PCU students earns international recognition for creative solutions in sustainability and social innovation.' },
  { id: 'news-4', title: 'Indonesian SPECTRUM Program Opens Registration', date: 'Oct 22, 2024', tag: '#inboundstudents', color: 'from-violet-500 to-purple-600', excerpt: 'Registration is now open for Indonesian SPECTRUM, offering visiting students a curated cultural learning journey across East Java.' },
  { id: 'news-5', title: '20 PCU Students Depart for Semester Exchange in Europe', date: 'Oct 5, 2024', tag: '#outboundstudents', color: 'from-pcu-sky to-blue-400', excerpt: 'Twenty Petra Christian University students embark on semester exchange programs at partner institutions across Europe.' },
  { id: 'news-6', title: 'International Community Outreach in East Java', date: 'Sep 18, 2024', tag: '#inboundstudents', color: 'from-pcu-gold to-orange-400', excerpt: 'PCU organizes community outreach activities in East Java, connecting visitors with local culture and service projects.' },
];

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
    'Bicol University': 'Assets/Images/Logo/Philippines/Bicol University, Phillipines.png',
    'Camarines Sur Polytechnic Colleges': 'Assets/Images/Logo/Philippines/Camarines Sur Polytechnic Colleges, Philippines.png',
    'Central Bicol State University of Agriculture San Jose': 'Assets/Images/Logo/Philippines/Central Bicol State University of Agriculture San Jose, Philippines.png',
    'Central Philippine University': 'Assets/Images/Logo/Philippines/Central Philippine University, Philippines.png',
    'Iloilo Science and Technology University': 'Assets/Images/Logo/Philippines/Iloilo Science and Technology University, Philippines.png',
    'Northwest Samar State University': 'Assets/Images/Logo/Philippines/Northwest Samar State University, Philippines.png',
    'Panpacific University': 'Assets/Images/Logo/Philippines/Panpacific University, Philippines.png',
    'Philippine Christian University': 'Assets/Images/Logo/Philippines/Philippine Christian University, Philippines.png',
    'Philippine Normal University': 'Assets/Images/Logo/Philippines/Philippine Normal University, Philippines.png',
    'Samar State University': 'Assets/Images/Logo/Philippines/Samar State University, Philippines.png',
    'Siliman University': 'Assets/Images/Logo/Philippines/Siliman University, Philippines.png',
    'University of Mindanao': 'Assets/Images/Logo/Philippines/University of Mindanao, Philippines.png',
    'University of St La Salle': 'Assets/Images/Logo/Philippines/University of St La Salle.png',
    'University of the East': 'Assets/Images/Logo/Philippines/University of the East, Philippines.png',
  },
  'Malaysia': {
    'Asia Pacific University of Technology and Innovation (APU)': 'Assets/Images/Logo/Malaysia/Asia Pacific University of Technology & Innovation (APU), Malaysia.png',
    'INTI International University': 'Assets/Images/Logo/Malaysia/INTI International University, Malaysia.png',
    'Sunway University': 'Assets/Images/Logo/Malaysia/Sunway University SDN BHD.png',
    'Tunku Abdul Rahman University of Management and Technology (TARUMT)': 'Assets/Images/Logo/Malaysia/Tunku Abdul Rahman University of Management and Technology (TARUMT), Malaysia.png',
    'UCSI University': 'Assets/Images/Logo/Malaysia/UCSI University, Malaysia.png',
    'Universiti Malaysia Perlis (UniMAP)': 'Assets/Images/Logo/Malaysia/Universiti Malaysia Perlis (UniMAP), Malaysia.png',
    'Universiti Malaysia Sarawak (UNIMAS)': 'Assets/Images/Logo/Malaysia/Universiti Malaysia Sarawak (UNIMAS), Malaysia.png',
    'Universiti Sains Malaysia (USM)': 'Assets/Images/Logo/Malaysia/Universiti Sains Malaysia (USM), Malaysia.png',
    'Universiti Teknologi Mara (UiTM)': 'Assets/Images/Logo/Malaysia/Universiti Teknologi MARA (UiTM), Malaysia.png',
    'Universiti Tun Hussein Onn Malaysia (UTHM)': 'Assets/Images/Logo/Malaysia/Universiti Tun Hussein Onn Malaysia (UTHM), Malaysia.png',
    "Universiti Tunku Abdul Rahman (UTAR)": 'Assets/Images/Logo/Malaysia/Universiti Tunku Abdul Rahman (UTAR), Malaysia.png',
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

// Initialize map markers
document.addEventListener('DOMContentLoaded', function() {
  initializeCountryGrid();
  initializePartnershipData();
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

function loadPartnersLogos(suffix = '') {
  const container = document.getElementById(`partners-logos${suffix}`);
  if (!container || container.children.length > 0) return;
  const items = partnerData.slice().sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));
  container.innerHTML = items.map(partner => {
    const logoPath = getInstitutionLogoPath(partner.country, partner.name);
    return `
      <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-2xl bg-pcu-light/80 flex items-center justify-center overflow-hidden flex-shrink-0">
            ${logoPath ? `<img src="${logoPath}" alt="${partner.name} logo" class="max-h-10 max-w-full object-contain">` : `<i data-lucide="building" class="w-5 h-5 text-pcu-blue"></i>`}
          </div>
          <div class="min-w-0">
            <p class="font-semibold text-sm text-pcu-blue leading-5">${partner.name}</p>
            <p class="text-gray-500 text-[11px] mt-1">${partner.country}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
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
  el.innerHTML = items.map(n => `
    <article onclick="navigateTo('${n.id}');return false" class="program-card bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <div class="h-52 news-img ${n.color ? 'bg-gradient-to-br ' + n.color : ''} relative overflow-hidden">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-semibold rounded-full text-pcu-navy backdrop-blur">${n.tag.replace('#', '')}</div>
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
    </article>
  `).join('');
}

// ---- OUTBOUND SEMESTER EXCHANGE DATA ----
const osePartners = partnerData.map(partner => ({
  name: partner.name,
  country: partner.country,
  region: countryToContinent[partner.country] || 'all',
  programs: ["Exchange", "Study Abroad"]
}));

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

function renderOsePartners() {
  const grid = document.getElementById('ose-partner-grid');
  if (!grid) return;
  const filtered = oseCurrentRegion === 'all' ? osePartners : osePartners.filter(p => p.region === oseCurrentRegion);
  grid.innerHTML = filtered.map(p => `
    <div class="program-card bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:border-pcu-blue/30">
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="font-semibold text-pcu-blue text-base leading-snug">${p.name}</h3>
          <p class="text-sm text-gray-400 mt-0.5 flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${p.country}</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${{
          asia: 'bg-blue-50 text-blue-600',
          europe: 'bg-purple-50 text-purple-600',
          oceania: 'bg-green-50 text-green-600',
          americas: 'bg-orange-50 text-orange-600'
        }[p.region]}">${p.region}</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${p.programs.map(prog => `<span class="px-2.5 py-0.5 bg-pcu-light text-pcu-blue text-xs rounded-full">${prog}</span>`).join('')}
      </div>
    </div>
  `).join('');
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
const latestNews = allNews.slice(0, 4);

function renderNewsCarousel() {
  const container = document.getElementById('newsCarouselContainer');
  if (!container) return;
  
  const currentNews = latestNews[newsCarouselIndex];
  container.innerHTML = `
    <div class="w-full h-full bg-gradient-to-br ${currentNews.color || 'from-pcu-blue to-pcu-sky'} flex items-center justify-center cursor-pointer group" onclick="navigateTo('${currentNews.id}');return false">
      <div class="text-center text-white px-6">
        <div class="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">${currentNews.tag.replace('#', '')}</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 leading-tight">${currentNews.title}</h2>
        <p class="text-white/75 text-lg max-w-2xl mb-6">${currentNews.excerpt}</p>
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
  dotsContainer.innerHTML = latestNews.map((_, i) => `
    <div class="dot ${i === newsCarouselIndex ? 'active' : ''}" onclick="newsCarouselGo(${i})" style="cursor: pointer;"></div>
  `).join('');
}

function newsCarouselNext() {
  newsCarouselIndex = (newsCarouselIndex + 1) % latestNews.length;
  renderNewsCarousel();
}

function newsCarouselPrev() {
  newsCarouselIndex = (newsCarouselIndex - 1 + latestNews.length) % latestNews.length;
  renderNewsCarousel();
}

function newsCarouselGo(index) {
  newsCarouselIndex = Math.max(0, Math.min(index, latestNews.length - 1));
  renderNewsCarousel();
}

// ---- NEWS CATEGORIES ----
let selectedCategory = 'all';
let searchQuery = '';

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;
  
  const categories = ['all', '#inboundstudents', '#outboundstudents', '#partnership'];
  const categoryLabels = {
    'all': 'All News',
    '#inboundstudents': 'Inbound Students',
    '#outboundstudents': 'Outbound Students',
    '#partnership': 'Partnership'
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
  let filtered = allNews;
  
  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(n => n.tag === selectedCategory);
  }
  
  // Filter by search query
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