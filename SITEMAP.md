# Mapa stránek - Velvyslanectví Libyjského státu

## Struktura webu

### Hlavní stránky
- **Domů** (`index.html`) - Úvodní stránka s hero slideshow a rychlým přístupem
- **Víza** (`visa.html`) - Přehled všech typů víz a obecné informace
- **Služby** (`services.html`) - Konzulární služby pro občany Libye
- **Vzdělání a Kultura** (`education.html`) - Vzdělávací programy a kulturní výměna
- **Velvyslanectví** (`embassy.html`) - Informace o budově a historii
- **Zprávy** (`news.html`) - Aktuality a oznámení
- **Kontakt** (`contact.html`) - Kontaktní informace a formulář

### Typy víz (detailní stránky)
- **Turistické vízum** (`tourist-visa.html`) 
  - Pro turistické účely a návštěvy příbuzných
  - Doba platnosti: 30 dnů
  - Poplatek: 2,500 Kč
  
- **Obchodní vízum** (`business-visa.html`)
  - Pro obchodní účely a pracovní cesty
  - Doba platnosti: 90 dnů, vícenásobný vstup
  - Poplatek: 4,000 Kč
  
- **Tranzitní vízum** (`transit-visa.html`)
  - Pro tranzit přes libyjské území
  - Doba platnosti: 7 dnů
  - Poplatek: 1,500 Kč
  
- **Studijní vízum** (`student-visa.html`)
  - Pro studium na libyjských univerzitách
  - Doba platnosti: 1 rok s možností prodloužení
  - Poplatek: 5,000 Kč

### Navigační struktura
```
Domů
├── Víza
│   ├── Turistické vízum
│   ├── Obchodní vízum
│   ├── Tranzitní vízum
│   └── Studijní vízum
├── Služby
├── Vzdělání a Kultura
├── Velvyslanectví
├── Zprávy
└── Kontakt
```

### Jazykové verze
Všechny stránky jsou dostupné ve třech jazycích:
- 🇨🇿 **Čeština** (výchozí)
- 🇬🇧 **English**
- 🇱🇾 **العربية** (Arabic, RTL layout)

### Technické soubory
- `styles.css` - Hlavní CSS styly
- `script.js` - JavaScript funkcionalita
- `translations.js` - Vícejazyčné překlady
- `website-images.js` - Konfigurace obrázků
- `assets/` - Složka s obrázky a zdrojovými soubory

## URL struktura

### Hlavní stránky
- `/` nebo `/index.html` - Úvodní stránka
- `/visa.html` - Víza (přehled)
- `/services.html` - Služby
- `/education.html` - Vzdělání a Kultura
- `/embassy.html` - Velvyslanectví
- `/news.html` - Zprávy
- `/contact.html` - Kontakt

### Stránky víz
- `/tourist-visa.html` - Turistické vízum
- `/business-visa.html` - Obchodní vízum
- `/transit-visa.html` - Tranzitní vízum
- `/student-visa.html` - Studijní vízum

## Funkcionality

### Vícejazyčnost
- Automatická detekce jazyka z URL parametru nebo localStorage
- Plynulé přepínání mezi jazyky bez obnovení stránky
- RTL podpora pro arabštinu
- Konzistentní názvy jazykových tlačítek

### Interaktivní prvky
- Hero slideshow s automatickým přepínáním
- Accordion sekce na stránkách
- Responsivní navigační menu
- Kontaktní formulář s validací
- Newsletter přihlášení

### Responsivní design
- Mobilní-první přístup
- Breakpointy: 480px, 768px, 1024px
- Přizpůsobený layout pro všechna zařízení
- Touch-friendly navigace

## Obsah stránek víz

### Turistické vízum
- Základní informace (platnost, vstupy, poplatek)
- Požadované dokumenty
- Postup podání žádosti
- Důležité upozornění

### Obchodní vízum
- Rozšířené informace pro business cestování
- Specifické obchodní dokumenty
- Obchodní příležitosti v Libyi
- Kontakty na libyjské firmy

### Tranzitní vízum
- Typy tranzitu (letištní vs. městský)
- Minimální požadavky na dokumenty
- Rychlé zpracování
- Omezení a podmínky

### Studijní vízum
- Informace o libyjských univerzitách
- Akademické požadavky
- Práva a povinnosti studentů
- Stipendia a podpora

## SEO a přístupnost

### Meta informace
- Unikátní title a description pro každou stránku
- Strukturované nadpisy (H1-H6)
- Alt texty pro obrázky
- Semantic HTML elementy

### Přístupnost
- ARIA labels pro interaktivní prvky
- Keyboard navigace
- Vysoký kontrast textu
- Čitelné fonty a velikosti

## Údržba

### Pravidelné aktualizace
- Kontrola aktuálnosti víz a poplatků
- Aktualizace zpráv a oznámení
- Ověření kontaktních údajů
- Testování všech formulářů

### Technická údržba
- Kontrola funkčnosti na všech zařízeních
- Aktualizace bezpečnostních prvků
- Optimalizace rychlosti načítání
- Zálohování obsahu