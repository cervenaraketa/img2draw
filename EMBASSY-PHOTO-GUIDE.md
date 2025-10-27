# Návod: Jak přidat fotografii budovy velvyslanectví

## 🏢 Rychlý návod

### 1. **Nahrajte fotografii**
- Uložte fotografii budovy do složky: `assets/images/`
- Název souboru: `embassy-building.jpg` (nebo `.png`)
- **Doporučené parametry:**
  - Rozlišení: minimálně 800×600 px
  - Formát: JPG, PNG, WebP
  - Velikost: maximálně 2 MB

### 2. **Automatické zobrazení**
- Fotografie se **automaticky zobrazí** místo placeholder ikony
- Pokud se fotografie nenačte, zůstane původní placeholder

## ⚙️ Pokročilé nastavení

### Změna názvu souboru
Pokud chcete použít jiný název, upravte soubor `website-images.js`:

```javascript
embassyBuilding: {
    src: 'assets/images/vas-nazev-souboru.jpg', // ← Změňte zde
    alt: 'Budova Velvyslanectví Libyjského státu v Praze',
    fallbackIcon: 'fas fa-building',
    fallbackText: 'Budova velvyslanectví'
}
```

### Změna textu a ikony fallback
```javascript
embassyBuilding: {
    src: 'assets/images/embassy-building.jpg',
    alt: 'Váš vlastní popis obrázku',
    fallbackIcon: 'fas fa-university', // ← Jiná ikona
    fallbackText: 'Váš vlastní text'   // ← Jiný text
}
```

## 📸 Tipy pro fotografii

### **Ideální fotografie:**
- **Zorný úhel**: Celý pohled na budovu
- **Světlo**: Denní světlo, bez stínů
- **Pozadí**: Čisté, bez rušivých elementů
- **Kvalita**: Ostrá, bez rozmazání

### **Technické doporučení:**
- **Rozměry**: 4:3 nebo 16:9 poměr stran
- **Rozlišení**: 1200×900 px nebo vyšší
- **Optimalizace**: Komprimujte pro web (max 500 KB)

## 🔧 Řešení problémů

### **Fotografie se nezobrazuje:**
1. **Zkontrolujte cestu**: Je soubor v `assets/images/`?
2. **Zkontrolujte název**: Shoduje se s `website-images.js`?
3. **Zkontrolujte formát**: JPG/PNG/WebP jsou podporované
4. **Otevřete Developer Tools** (F12) → Console pro chybové zprávy

### **Fotografie je příliš velká/malá:**
1. **Rozměry**: Upravte v `styles.css` sekci `.image-container`
2. **Poměr stran**: Změňte `object-fit: cover` na `object-fit: contain`

### **Chcete přidat více fotografií:**
Upravte `website-images.js` a přidejte nové sekce pro další obrázky.

## 🎯 Testování

1. **Nahrajte fotografii** do `assets/images/embassy-building.jpg`
2. **Obnovte stránku** (F5)
3. **Zkontrolujte sekci "O velvyslanectví"**
4. **Placeholder by se měl nahradit** vaší fotografií

## 📋 Příklad správné struktury souborů

```
c:\web\
├── assets/
│   └── images/
│       └── embassy-building.jpg  ← Vaše fotografie zde
├── website-images.js             ← Konfigurace
├── index.html                    ← Hlavní stránka
└── styles.css                    ← Styly
```

Nyní stačí nahrát fotografii a automaticky se zobrazí! 🎉