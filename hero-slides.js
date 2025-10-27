// Hero Slideshow Data Configuration
// Snadno upravitelný soubor pro správu slideshow obsahu

const heroSlides = [
    {
        id: 1,
        backgroundImage: 'assets/images/020.jpg', // Cesta k obrázku pozadí
        title: 'Státní svátek',
        subtitle: 'Velvyslanectví bude od 1. července do 3. července uzavřeno z důvodu státního svátku.',
        ctaText: 'Naše služby',
        ctaLink: 'services.html',
        important: true, // Nastavte na true pro zobrazení ikony vykřičníku
        showCtaButton: false // true = zobrazí CTA tlačítko (Služby, Víza atd.), false = skryje tlačítko
    },
    {
        id: 2,
        backgroundImage: 'assets/images/023.jpg',
        title: 'Dny NATO',
        subtitle: 'Velvyslanectví libyjského státu v České republice se připojuje k oslavám Dnů NATO.',
        ctaText: 'Služby',
        ctaLink: 'services.html',
        important: false, // Důležitá zpráva - zobrazí ikonu vykřičníku
        showCtaButton: false // true = zobrazí CTA tlačítko (Služby, Víza atd.), false = skryje tlačítko
    },
    {
        id: 3,
        backgroundImage: 'assets/images/006.jpg',
        title: 'Kulturní výměna',
        subtitle: 'Podporujeme vzdělávací programy, kulturní akce a posilujeme přátelské vztahy mezi našimi národy.',
        ctaText: 'Vzdělání a kultura',
        ctaLink: 'education.html',
        important: false,
        showCtaButton: true
    },
    {
        id: 4,
        backgroundImage: 'assets/images/021.jpg',
        title: 'Vízové služby',
        subtitle: 'Kompletní informace o vízových požadavcích a postupech pro vstup do Libyjského státu.',
        ctaText: 'Víza',
        ctaLink: 'visa.html',
        important: false,
        showCtaButton: true
    }
];

// Export pro použití v hlavním skriptu
if (typeof module !== 'undefined' && module.exports) {
    module.exports = heroSlides;
}