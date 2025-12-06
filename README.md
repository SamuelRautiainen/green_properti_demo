# GreenProperty

Selainpohjainen sovellus kiinteistöjen tilamuutosten CO₂-laskentaan, materiaalien uudelleenkäyttöön ja varaston optimointiin.

## 🚀 Käynnistys

```bash
# Asenna riippuvuudet
npm install

# Käynnistä kehityspalvelin
npm run dev

# Avaa selaimessa
http://localhost:3000
```

## 📁 Projektirakenne

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, MobileNav
│   ├── dashboard/       # KPI-kortit, listat, yhteenvedot
│   └── charts/          # Chart.js -kaaviot
├── pages/
│   ├── Dashboard.jsx    # Portfolio-yleiskatsaus
│   ├── Properties.jsx   # Kiinteistölista
│   ├── PropertyDetail.jsx
│   ├── Projects.jsx     # Projektilista
│   ├── ProjectDetail.jsx
│   ├── Inventory.jsx    # Varastonäkymä
│   └── AddInventory.jsx # Lisää varastoon -lomake
├── mock/                # JSON-mockdata
│   ├── dashboard.json
│   ├── properties.json
│   ├── projects.json
│   ├── inventory.json
│   └── co2Factors.json
├── theme.js             # MUI dark green -teema
└── App.jsx              # Reititys
```

## 🎨 Ominaisuudet

### Dashboard
- KPI-kortit: CO₂/m², CO₂ muutos, uudelleenkäyttö-%, kustannukset
- Laskurikortit: kiinteistöt, projektit, asiakkaat, varasto
- CO₂-trendikaavio
- Top 5 kiinteistöt & projektit
- Hälytykset & toimenpiteet

### Kiinteistöt
- Yhteenvetotaulukko kaikista kiinteistöistä
- Remonttikustannukset, uudelleenkäyttö-%, hiilijalanjälki
- Yksittäisen kiinteistön tiedot, projektit ja varasto

### Projektit
- Käynnissä, suunnitteilla ja valmiit projektit
- Pohjapiirustusvisualisointi
- Elementtilista ja purkamisen CO₂-arvio
- Varastosta sopivat tuotteet

### Varasto
- Yhteenvetokortit kategorioittain
- Suodatus kiinteistön ja tyypin mukaan
- Lisää varastoon -lomake (3-vaiheinen)
- CO₂-säästölaskuri

## 🛠️ Teknologiat

- **React 18** + Vite
- **MUI (Material-UI)** - komponenttikirjasto
- **Chart.js** + react-chartjs-2 - kaaviot
- **React Router v6** - reititys

## 📊 Mockdata

Sovellus käyttää JSON-tiedostoja mockdatana:

- `dashboard.json` - KPI-arvot, trendit, top-listat
- `properties.json` - 6 esimerkkikiinteistöä
- `projects.json` - 5 esimerkkiprojektia
- `inventory.json` - 10 varastotuotetta
- `co2Factors.json` - CO₂-kertoimet materiaaleille

## 🎯 CO₂-kertoimet

| Materiaali | CO₂-kerroin |
|------------|-------------|
| Gyproc-seinä | 20 kg/m² |
| MOVIA-väliseinä | 5 kg/m² |
| Lasiseinä | 30 kg/m² |
| Ovi | 25 kg/kpl |
| Lattia | 10 kg/m² |

## 📱 Responsiivisuus

- **Desktop**: Täysi sivupalkki, monisarakkeinen ruudukko
- **Tablet**: Pienennetty sivupalkki
- **Mobiili**: Pohjanavigaatio, korttinäkymät


