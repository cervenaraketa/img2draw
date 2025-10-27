# Hero Slideshow - Kompletní návod pro správu

## ✨ Rychlé spuštění

**Chcete změnit slideshow? Stačí upravit pouze jeden soubor: `hero-slides.js`**

## 🔧 Jak upravit slideshow na hlavní stránce

### 1. Základní úprava obsahu

Otevřete soubor `hero-slides.js` a upravte data:

```javascript
const heroSlides = [
    {
        id: 1,
        backgroundImage: 'assets/images/vas-obrazek.jpg', // Cesta k obrázku
        title: 'Váš nový nadpis',                         // Hlavní nadpis  
        subtitle: 'Váš nový popis služby nebo akce.',     // Popisný text
        ctaText: 'Vaše tlačítko',                         // Text tlačítka
        ctaLink: 'odkaz.html',                            // Kam tlačítko vede
        important: true,                                  // true = ikona vykřičníku, false = žádná ikona
        showNavButtons: true                              // true = zobrazí šipky, false = skryje šipky
    }
    // Přidejte více slidů zde...
];
```

### 2. 📸 Práce s obrázky

#### Přidání nových obrázků:
1. Nahrajte obrázky do složky `assets/images/`
2. **Doporučené parametry:**
   - Rozlišení: 1920×1080 px nebo vyšší
   - Formát: JPG, PNG, WebP
   - Velikost: maximálně 500 KB
   - Poměr stran: 16:9

#### Bez obrázků:
Pokud nemáte obrázky, slideshow automaticky použije barevné gradienty v libyjských barvách.

### 3. ➕ Přidání nového slidu

```javascript
const heroSlides = [
    // ...existující slidy...
    {
        id: 5, // Nové unikátní ID
        backgroundImage: 'assets/images/nova-akce.jpg',
        title: 'Nová akce velvyslanectví',
        subtitle: 'Připojte se k našemu novému programu kulturní výměny.',
        ctaText: 'Více informací',
        ctaLink: 'education.html'
    }
];
```

### 4. ❌ Odstranění slidu

Prostě smažte odpovídající objekt `{...}` z pole `heroSlides`.

### 5. 🔄 Změna pořadí

Přesuňte objekty v poli `heroSlides` do požadovaného pořadí.

### 6. ⚠️ Důležité zprávy

Pro označení důležité zprávy ikonou vykřičníku:

```javascript
{
    id: 1,
    // ... ostatní vlastnosti
    important: true  // Zobrazí červenou ikonu s vykřičníkem
}
```

- **`important: true`** = Zobrazí červenou ikonu s vykřičníkem v záložce
- **`important: false`** = Žádná ikona (standardní záložka)
- Ikona bliká jemnou animací pro upoutání pozornosti

### 7. 🔘 Ovládání navigačních šipek

Pro skrytí/zobrazení navigačních šipek u konkrétního slidu:

```javascript
{
    id: 1,
    // ... ostatní vlastnosti
    showNavButtons: false  // Skryje navigační šipky pro tento slid
}
```

- **`showNavButtons: true`** = Zobrazí navigační šipky (←/→)
- **`showNavButtons: false`** = Skryje navigační šipky pro tento slid
- **Užitečné pro**: Důležité oznámení kde nechcete rozptylovat uživatele
- **Záložky zůstávají aktivní** - uživatel stále může přepínat mezi slidy

## 🎮 Ovládání slideshow

- **🖱️ Myš**: Kliknutí na šipky nebo záložky s textem
- **⌨️ Klávesnice**: Šipky ←/→ pro navigaci, Tab + Enter/Space pro záložky
- **📱 Mobil/Tablet**: Gesta swipe vlevo/vpravo
- **♿ Accessibility**: Plná podpora čteček obrazovky s ARIA labels
- **📊 Záložky**: Obdélníkové záložky dole zobrazují náhled textu z každého slidu

## 📋 Příklady použití

### Letní kampaň:
```javascript
{
    id: 1,
    backgroundImage: 'assets/images/libya-summer.jpg',
    title: 'Objevte léto v Libyi',
    subtitle: 'Naplánujte si dovolenou snů v kolébce civilizace.',
    ctaText: 'Turistická víza',
    ctaLink: 'visa.html'
}
```

### Obchodní akce:
```javascript
{
    id: 2,
    backgroundImage: 'assets/images/business-libya.jpg',
    title: 'Investiční příležitosti',
    subtitle: 'Rozvíjejte podnikání v dynamické libyjské ekonomice.',
    ctaText: 'Obchodní služby',
    ctaLink: 'services.html#business'
}
```

### Naléhavé oznámení:
```javascript
{
    id: 3,
    backgroundImage: 'assets/images/important-notice.jpg',
    title: 'Důležité oznámení',
    subtitle: 'Změna úředních hodin během státních svátků.',
    ctaText: 'Více informací',
    ctaLink: 'embassy.html#hours'
}
```

## ⚙️ Pokročilé nastavení

### Vlastní CSS styly pro speciální slidy:

1. V `hero-slides.js` přidejte vlastnost `className`:
```javascript
{
    id: 1,
    className: 'special-slide', // Vlastní CSS třída
    backgroundImage: '...',
    // ...
}
```

2. V `styles.css` definujte styly:
```css
.slide.special-slide {
    /* Speciální styly */
    border: 5px solid gold;
}

.slide.special-slide .slide-content h2 {
    color: #FFD700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
```

### Odkazy s parametry:
```javascript
ctaLink: 'visa.html?type=business&urgent=true'
```

### Externí odkazy:
```javascript
ctaLink: 'https://external-website.com'
```

## 🔧 Řešení problémů

### ❌ Slideshow se nezobrazuje
1. Otevřete Developer Tools (F12) → Console
2. Zkontrolujte chyby (červené zprávy)
3. Ověřte, že `hero-slides.js` je načten
4. Zkontrolujte syntax v `hero-slides.js` (závorky, čárky)

### 🖼️ Obrázek se nezobrazuje
- ✅ Kontrola: Soubor existuje v `assets/images/`
- ✅ Kontrola: Správný název (včetně .jpg/.png)
- ✅ Kontrola: Cesta v `backgroundImage` je správná
- 💡 Fallback: Automaticky se použije barevný gradient

### 📱 Špatná responzivita
- Zkontrolujte rozlišení obrázků (min. 1920px šířka)
- Pro mobilní zařízení optimalizujte velikost souborů

### 🔗 Nefunkční odkazy
- Ověřte existenci cílových stránek
- Zkontrolujte syntax odkazů v `ctaLink`

## 📁 Struktura souborů

```
web/
├── hero-slides.js          ← HLAVNÍ SOUBOR PRO ÚPRAVY
├── index.html              ← Obsahuje slideshow strukturu
├── styles.css              ← Styly slideshow
├── script.js               ← JavaScript funkce
├── assets/
│   ├── images/             ← Sem nahrávejte obrázky
│   └── placeholder-styles.css ← Fallback styly
└── SLIDESHOW-README.md     ← Tento návod
```

## 🚀 Nasazení změn

1. Upravte `hero-slides.js`
2. Nahrajte nové obrázky (pokud máte)
3. Obnovte stránku v prohlížeči
4. ✅ Hotovo!

---

**💡 Tip**: Pro rychlé testování změn otevřete Developer Tools (F12) a obnovte stránku kombinací Ctrl+Shift+R pro vymazání cache.