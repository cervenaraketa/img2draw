// News data structure
const newsData = [
    {
        id: 1,
        title: "Velvyslanec Al-Sharif jednal s ministrem zahraničí",
        excerpt: "Rozhovory se zaměřily na posílení bilaterálních vztahů a připravovanou návštěvu české delegace v Libyi na jaře 2026.",
        image: "assets/images/011.jpg",
        date: "2025-10-22",
        badge: "NOVÉ",
        category: "diplomacie"
    },
    {
        id: 2,
        title: "Otevření Libyjsko-českého kulturního centra",
        excerpt: "V Praze bylo slavnostně otevřeno nové kulturní centrum, které bude pořádat výstavy, koncerty a vzdělávací akce.",
        image: "assets/images/012.jpg",
        date: "2025-10-19",
        badge: "KULTURA",
        category: "kultura"
    },
    {
        id: 3,
        title: "Podpis smlouvy o dodávkách libyjské ropy",
        excerpt: "České rafinerské společnosti podepsaly významnou smlouvu na dodávky kvalitní libyjské ropy v objemu 500 tisíc tun ročně.",
        image: "assets/images/013.jpg",
        date: "2025-10-17",
        badge: "EKONOMIKA",
        category: "ekonomika"
    },
    {
        id: 4,
        title: "Nový program studentských výměn",
        excerpt: "Univerzita Karlova a Tripolská univerzita podepsaly dohodu o výměnných pobytech studentů technických oborů.",
        image: "assets/images/014.jpg",
        date: "2025-10-15",
        badge: "VZDĚLÁNÍ",
        category: "vzdelavani"
    },
    {
        id: 5,
        title: "Nové konzulární hodiny",
        excerpt: "Od 1. listopadu 2025 budou platit nové úřední hodiny pro konzulární služby. Nové hodiny umožní občanům lepší přístup k našim službám.",
        image: "assets/images/019.jpg",
        date: "2025-10-15",
        badge: "NOVÉ",
        category: "konzularni"
    },
    {
        id: 6,
        title: "Výstava libyjské kultury a tradice",
        excerpt: "Velvyslanectví organizuje výstavu libyjské kultury a tradice. Návštěvníci se mohou seznámit s bohatým kulturním dědictvím Libye.",
        image: "assets/images/018.jpg",
        date: "2025-10-08",
        badge: "KULTURA",
        category: "kultura"
    },
    {
        id: 7,
        title: "Posílení diplomatických vztahů",
        excerpt: "Setkání velvyslance s představiteli českých institucí. Jednání se zaměřila na rozvoj obchodních a kulturních vztahů mezi oběma zeměmi.",
        image: "assets/images/017.jpg",
        date: "2025-10-01",
        badge: "DIPLOMACIE",
        category: "diplomacie"
    },
    {
        id: 8,
        title: "Zjednodušení vízového procesu pro podnikatele",
        excerpt: "Od prosince budou moci čeští podnikatelé získat víza do Libye prostřednictvím rychlého online procesu do 5 pracovních dnů.",
        image: "assets/images/017.jpg",
        date: "2025-10-08",
        badge: "VÍZA",
        category: "konzularni"
    },
    {
        id: 9,
        title: "Partnerství v oblasti obnovitelných zdrojů",
        excerpt: "České firmy budou dodávat solární technologie pro velké libyjské projekty čisté energie v saharských oblastech.",
        image: "assets/images/018.jpg",
        date: "2025-10-05",
        badge: "ENERGETIKA",
        category: "ekonomika"
    }
];

// Function to format date
function formatDate(dateString) {
    const months = [
        'ledna', 'února', 'března', 'dubna', 'května', 'června',
        'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
    ];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}. ${month} ${year}`;
}

// Function to get latest news
function getLatestNews(count = 3) {
    return newsData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}

// Function to render news cards
function renderNewsCard(newsItem) {
    return `
        <article class="news-card">
            <div class="card-image">
                <img src="${newsItem.image}" alt="${newsItem.title}" class="news-img">
                <div class="card-badge">${newsItem.badge}</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${newsItem.title}</h3>
                <p class="card-excerpt">${newsItem.excerpt}</p>
                <div class="card-meta">
                    <span class="card-date"><i class="fas fa-calendar"></i> ${formatDate(newsItem.date)}</span>
                </div>
            </div>
        </article>
    `;
}

// Function to load latest news on homepage
function loadLatestNewsOnHomepage() {
    const newsGrid = document.querySelector('#news .news-grid');
    if (newsGrid) {
        const latestNews = getLatestNews(3);
        newsGrid.innerHTML = latestNews.map(renderNewsCard).join('');
    }
}

// Function to load all news on news page
function loadAllNews() {
    const newsGrid = document.querySelector('.news-grid');
    console.log('Loading all news. NewsGrid found:', !!newsGrid);
    if (newsGrid) {
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('Rendering', sortedNews.length, 'news items');
        newsGrid.innerHTML = sortedNews.map(renderNewsCard).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, current path:', window.location.pathname);
    
    // Check if we're on homepage (has #news section)
    const homepageNewsGrid = document.querySelector('#news .news-grid');
    if (homepageNewsGrid) {
        console.log('Loading homepage news');
        const latestNews = getLatestNews(3);
        homepageNewsGrid.innerHTML = latestNews.map(renderNewsCard).join('');
    }
    
    // Check if we're on news page (has .news-grid but not in #news)
    const newsPageGrid = document.querySelector('.news-grid');
    if (newsPageGrid && !document.querySelector('#news')) {
        console.log('Loading all news for news page');
        const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        newsPageGrid.innerHTML = sortedNews.map(renderNewsCard).join('');
    }
});