// Website Images Configuration
// Konfigurační soubor pro snadnou správu obrázků na webu

const websiteImages = {
    // Budova velvyslanectví
    embassyBuilding: {
        src: 'assets/images/006.jpg',
        alt: 'Budova Velvyslanectví Libyjského státu v Praze',
        fallbackIcon: 'fas fa-building',
        fallbackText: 'Budova velvyslanectví'
    },
    
    // Další obrázky pro budoucí použití
    ambassador: {
        src: 'assets/images/ambassador.jpg',
        alt: 'Velvyslanec Libyjského státu',
        fallbackIcon: 'fas fa-user-tie',
        fallbackText: 'Velvyslanec'
    },
    
    staff: {
        src: 'assets/images/embassy-staff.jpg',
        alt: 'Zaměstnanci velvyslanectví',
        fallbackIcon: 'fas fa-users',
        fallbackText: 'Zaměstnanci'
    },
    
    ceremonies: {
        src: 'assets/images/ceremonies.jpg',
        alt: 'Oficiální ceremonie',
        fallbackIcon: 'fas fa-flag',
        fallbackText: 'Ceremonie'
    },
    
    culturalEvents: {
        src: 'assets/images/cultural-events.jpg',
        alt: 'Kulturní akce',
        fallbackIcon: 'fas fa-calendar-alt',
        fallbackText: 'Kulturní akce'
    }
};

// Export pro použití v hlavním skriptu
if (typeof module !== 'undefined' && module.exports) {
    module.exports = websiteImages;
}