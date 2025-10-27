# Webové stránky Velvyslanectví Libyjského státu

Tento projekt obsahuje profesionální vícestrankový web pro Velvyslanectví Libyjského státu v České republice. Web je vytvořen pomocí čistého HTML, CSS a JavaScriptu s moderním responzivním designem a jednotnou hlavičkou a patičkou na všech stránkách.

## Struktura webu

### 🏠 Stránky
- **index.html** - Hlavní stránka s úvodem a přehledem
- **visa.html** - Vízové služby a informace
- **services.html** - Konzulární a diplomatické služby
- **education.html** - Vzdělání a kultura
- **embassy.html** - O velvyslanectví a diplomatickém sboru
- **news.html** - Aktuality a tiskové zprávy

### 📸 Správa obrázků
- **Hero slideshow** - Konfigurováno v `hero-slides.js`
- **Fotografie budovy** - Automatické načítání z `assets/images/embassy-building.jpg`
- **Fallback systém** - Placeholder pokud se obrázky nenačtou
- **Návod**: Viz `EMBASSY-PHOTO-GUIDE.md`

### 🎯 Navigace
Hlavní menu obsahuje:
- **Domů** - Úvodní stránka
- **Víza** - Vízové služby a požadavky
- **Služby** - Konzulární a obchodní služby  
- **Vzdělání a Kultura** - Studijní programy a kulturní akce
- **Velvyslanectví** - Historie, personál a spolupráce
- **Zprávy** - Novinky a oznámení

## Kontaktní informace

### 📍 Adresa
**Nad Šárkou 781/56**  
**160 00 Praha 6**  
**Česká republika**

### 📞 Kontakt
**Telefon:** 220 515 978

## Funkce

### 🎨 Design
- **Libyjské barvy**: Použití oficiálních barev libyjské vlajky (červená, černá, zelená)
- **Responzivní design**: Optimalizováno pro všechna zařízení
- **Moderní vzhled**: Čistý a profesionální design
- **Libyjská vlajka**: Vizuální reprezentace v hlavičce

### 🌐 Jazykové verze
- Český jazyk (výchozí)
- Angličtina
- Arabština
- Lokální ukládání jazykových preferencí

### 📱 Mobilní optimalizace
- Hamburger menu pro mobilní zařízení
- Touch-friendly interface
- Optimalizované rozložení pro malé obrazovky

### 🎯 Sekce webu

#### Hlavička
- Logo velvyslanectví s libyjskou vlajkou
- Název v češtině a angličtině
- Přepínač jazyků

#### Navigace
- Domů
- O nás
- Služby
- Konzulární služby
- Zprávy
- Kontakt

#### Hlavní obsah
1. **Hero sekce**: Úvodní banner s call-to-action
2. **O velvyslanectví**: Informace o misi a účelu
3. **Služby**: 
   - Pasové služby
   - Ověřování dokumentů
   - Vízové služby
   - Konzulární pomoc
4. **Aktuality**: Nejnovější zprávy a oznámení
5. **Kontakt**: Kontaktní informace a formulář

### ⚡ Interaktivní prvky
- Plynulé scrollování mezi sekcemi
- Animace při načítání obsahu
- Kontaktní formulář s validací
- Mobilní hamburger menu
- Scroll-to-top tlačítko
- Notifikace pro uživatele

## Struktura souborů

```
web/
├── 📄 HTML stránky
│   ├── index.html                    # Hlavní stránka
│   ├── visa.html                     # Víza - přehled
│   ├── services.html                 # Konzulární služby
│   ├── education.html                # Vzdělání a kultura  
│   ├── embassy.html                  # O velvyslanectví
│   ├── news.html                     # Aktuality
│   ├── contact.html                  # Kontakt
│   ├── tourist-visa.html             # Turistické vízum
│   ├── business-visa.html            # Obchodní vízum
│   ├── transit-visa.html             # Tranzitní vízum
│   └── student-visa.html             # Studijní vízum
├── 🎨 Styly a skripty
│   ├── styles.css                    # Hlavní CSS styly
│   ├── script.js                     # Hlavní JavaScript
│   ├── translations.js               # Vícejazyčnost (CS/EN/AR)
│   ├── hero-slides.js               # Konfigurace slideshow
│   └── website-images.js            # Konfigurace obrázků
├── 🔧 Komponentový systém
│   └── components/
│       ├── component-loader.js       # Systém načítání komponent
│       ├── header.html              # Sdílená hlavička
│       └── footer.html              # Sdílená patička
├── 📁 Zdroje
│   └── assets/
│       ├── logo_flag.png            # Logo vlajky
│       ├── images/                  # Složka pro obrázky
│       └── js/
│           └── news-loader.js       # Načítání aktualit
├── 🔍 SEO
│   ├── sitemap.xml                  # Mapa webu
│   └── robots.txt                   # Pokyny pro roboty
└── 📖 Dokumentace
    ├── README.md                    # Tento soubor
    ├── EMBASSY-PHOTO-GUIDE.md       # Návod na přidání fotek
    ├── SLIDESHOW-README.md          # Návod na slideshow
    ├── SITEMAP.md                   # Mapa obsahu
    └── COMPONENT-SYSTEM-REPORT.md   # Report o komponentech
```

## Technické specifikace

### HTML
- Sémantické HTML5 značky
- Accessibility (ARIA) atributy
- Meta značky pro SEO
- Open Graph značky pro sociální sítě

### CSS
- CSS Grid a Flexbox pro layout
- CSS proměnné pro konzistentní barvy
- Keyframe animace
- Media queries pro responzivitu
- Smooth scrolling

### JavaScript
- Vanilla JavaScript (bez závislostí)
- Event listenery pro interaktivitu
- Local Storage pro jazykové preference
- Intersection Observer API pro animace
- Throttle/Debounce pro výkon

## Barvy (Libyjská vlajka)

```css
--libya-red: #E70013      /* Červená */
--libya-black: #000000    /* Černá */
--libya-green: #239E46    /* Zelená */
--libya-white: #FFFFFF    /* Bílá */
```

## Spuštění webu

1. Stáhněte všechny soubory do jedné složky
2. Otevřete `index.html` v prohlížeči
3. Web je připraven k použití

### Lokální server (doporučeno)
Pro lepší funkcionalnost doporučujeme spustit lokální server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (s nainstalovaným http-server)
npx http-server
```

## Přizpůsobení

### Změna obsahu
- Upravte text v `index.html`
- Přidejte skutečné kontaktní údaje
- Nahraďte placeholder obrázky skutečnými fotografiemi

### Změna stylů
- Upravte CSS proměnné v `:root` sekci
- Přizpůsobte layout v `styles.css`
- Přidejte vlastní animace

### Přidání funkcí
- Rozšiřte JavaScript v `script.js`
- Přidejte nové sekce do HTML
- Implementujte backend pro kontaktní formulář

## Budoucí vylepšení

### Doporučené přidání:
1. **Backend integrace**
   - API pro kontaktní formulář
   - CMS pro správu obsahu
   - Databáze pro aktuality

2. **Pokročilé funkce**
   - Vyhledávání
   - Kalendář událostí
   - Fotogalerie
   - Stahování dokumentů

3. **SEO optimalizace**
   - Meta značky pro jednotlivé stránky
   - Schema markup
   - Sitemap.xml
   - robots.txt

4. **Performance**
   - Optimalizace obrázků
   - Lazy loading
   - Service Worker pro offline funkcionalita
   - CDN integrace

## Podporované prohlížeče

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Opera 47+

## Licence

Tento template je vytvořen pro Velvyslanectví Libyjského státu v České republice.

## Kontakt pro podporu

Pro technickou podporu nebo dotazy ohledně webu kontaktujte webového vývojáře.

---

*Poslední aktualizace: Říjen 2025*