
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src/data/product-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const productCategoryMap = {
    // INSECTICIDE
    'CCS NEEM 100': 'INSECTICIDE',
    'HUKUMAT': 'INSECTICIDE',
    'PLATINUM-5': 'INSECTICIDE',
    'ATTACK-505': 'INSECTICIDE',
    'LASKAR': 'INSECTICIDE',
    'NOVA-404': 'INSECTICIDE',
    'BHISMA GOLD': 'INSECTICIDE',
    'ATTACK-20': 'INSECTICIDE',
    'CHITGOR': 'INSECTICIDE',
    'BENZO FIRE': 'INSECTICIDE',
    'CRETA SUPER': 'INSECTICIDE',
    'C-IMIDA': 'INSECTICIDE',
    'C-IMIDA SUPER': 'INSECTICIDE',
    'AGNEEPATH SC': 'INSECTICIDE',
    'CHITARA': 'INSECTICIDE',
    'BENZO KILL': 'INSECTICIDE',
    'MONOSIL': 'INSECTICIDE',
    'AGNEEPATH GR': 'INSECTICIDE',
    'FEURADON-3G': 'INSECTICIDE',
    'FIMIDA-40': 'INSECTICIDE',
    'FENDOL-DP': 'INSECTICIDE',
    'ATTACK-10 G': 'INSECTICIDE',
    'DUALSTRIKE GR': 'INSECTICIDE',
    'CHIT PRIDE': 'INSECTICIDE',
    'QUEENPHOS': 'INSECTICIDE',
    'CHITRA PYRAD': 'INSECTICIDE',
    'ABACHIT': 'INSECTICIDE',
    'ATTACK-50': 'INSECTICIDE',
    'BENZO NIL': 'INSECTICIDE',
    'AAKRAMAN': 'INSECTICIDE',
    'PRIDEZOLE': 'INSECTICIDE',
    'CHITARA GOLD': 'INSECTICIDE',
    'KILL-LARVA': 'INSECTICIDE',
    'CYQ-320': 'INSECTICIDE',
    'MORPHIS': 'INSECTICIDE',
    'CHIT FIGHTER': 'INSECTICIDE',

    // FUNGICIDE
    'CYMO PLUS': 'FUNGICIDE',
    'KRANTIKARI': 'FUNGICIDE',
    'JORAWAR': 'FUNGICIDE',
    'SHAKTIMAN': 'FUNGICIDE',
    'PRO-VALIDA': 'FUNGICIDE',
    'VANDAN': 'FUNGICIDE',
    'TEBU SF': 'FUNGICIDE',
    'CHITRA M-45': 'FUNGICIDE',
    'VITARA GOLD': 'FUNGICIDE',
    'CHITRA-COC': 'FUNGICIDE',
    'FUNGASTIN': 'FUNGICIDE',
    'MR.THANKS': 'FUNGICIDE',
    'KARGIL-75': 'FUNGICIDE',
    'METMAX': 'FUNGICIDE',
    'SEED MAX PRO': 'FUNGICIDE',
    'CHITRA DEFEND': 'FUNGICIDE',
    'CAPHEXA': 'FUNGICIDE',
    'CHITRACOL': 'FUNGICIDE',
    'SAFE COVER': 'FUNGICIDE',
    'CHITHEXA GOLD': 'FUNGICIDE',
    'HARIYALI SULF-80': 'FUNGICIDE',
    'TEBU TRY': 'FUNGICIDE',
    'AZOTRI PLUS': 'FUNGICIDE',
    'CHIT HEXA': 'FUNGICIDE',
    'SEED MAX': 'FUNGICIDE',
    'AZTRIX': 'FUNGICIDE',
    'AZOTECH': 'FUNGICIDE',
    'DIFINE-25': 'FUNGICIDE',
    'PICOXY ZOLE': 'FUNGICIDE',
    'PYRAMET': 'FUNGICIDE',
    'TEBUZOLE SUPER': 'FUNGICIDE',

    // HERBICIDE
    'HIT-WICKET': 'HERBICIDE',
    'KILL-41': 'HERBICIDE',
    'PENDI-STOP': 'HERBICIDE',
    'TEBUZOLE': 'HERBICIDE',
    'KILL-71': 'HERBICIDE',
    'CHITRAZINE': 'HERBICIDE',
    'CHIT-OXY': 'HERBICIDE',
    'QUIZFOP-10': 'HERBICIDE',
    'CHITWEED': 'HERBICIDE',
    'CHITWEED SUPER': 'HERBICIDE',
    'JODIDAR': 'HERBICIDE',
    'PENDI-STOP EXTRA': 'HERBICIDE',
    'BATALIYAN': 'HERBICIDE',
    'CHITMIZA': 'HERBICIDE',
    'SULFO-ON': 'HERBICIDE',
    'TEMBA': 'HERBICIDE',
    'CHITMIZA-10': 'HERBICIDE',
    'BHAGAO': 'HERBICIDE',
    'CHITRA MSM': 'HERBICIDE',

    // PGR / BIO STIMULANT
    'ACTIVE 100': 'PGR / BIO STIMULANT',
    'SUPPORTER': 'PGR / BIO STIMULANT',
    'FLOWER PLUS': 'PGR / BIO STIMULANT',
    'HARIYALI GOLD PLUS': 'PGR / BIO STIMULANT',
    'HAMLAVAR': 'PGR / BIO STIMULANT',
    'CCS-303': 'PGR / BIO STIMULANT',
    'CCS-CARB': 'PGR / BIO STIMULANT',
    'CCS-CARB ULTRA': 'PGR / BIO STIMULANT',
    'MULTI POWER 55': 'PGR / BIO STIMULANT',
    'FLO-JEET': 'PGR / BIO STIMULANT',
    'WELCOME HONEY BEE': 'PGR / BIO STIMULANT',
    'STORAGE': 'PGR / BIO STIMULANT',
    'AMITRA 80': 'PGR / BIO STIMULANT',
    'CHIT BRIGHT': 'PGR / BIO STIMULANT',
    'DHARTI RATAN': 'PGR / BIO STIMULANT',
    'ROOT RATAN': 'PGR / BIO STIMULANT',
    'DR ROOT RAJA': 'PGR / BIO STIMULANT',
    'ROOT RAJA': 'PGR / BIO STIMULANT',
    'FLO-AVTAR': 'PGR / BIO STIMULANT',
    'CRAGIBB': 'PGR / BIO STIMULANT',
    'MENTED SUPER': 'PGR / BIO STIMULANT',
    'ON SPOT': 'PGR / BIO STIMULANT',
    'CHITRA BOOST': 'PGR / BIO STIMULANT',
    'CHITRA PACLO': 'PGR / BIO STIMULANT',
    'CCS BOOSTER': 'PGR / BIO STIMULANT',
    'CHITGIBB EZY': 'PGR / BIO STIMULANT',

    // FERTILIZER
    'CHITRA CN': 'FERTILIZER',
    'CHITRA MEG': 'FERTILIZER',
    'CHITRA SONITE': 'FERTILIZER',
    'CHITRA AMS': 'FERTILIZER',
    'CHITRA FE': 'FERTILIZER',
    'CHITRA CALBO': 'FERTILIZER',
    'CHITRA ZINC': 'FERTILIZER',
    'CHITRA NPK 19-19-19': 'FERTILIZER',
    'CHITRA NPK 13-40-13': 'FERTILIZER',
    'CHITRA NPK 00-52-34': 'FERTILIZER',
    'CHITRA NPK 12-61-00': 'FERTILIZER',
    'CHITRA NPK 13-00-45': 'FERTILIZER',
    'CHITRA NPK 00-00-50': 'FERTILIZER',
    'CHITRA NPK NP': 'FERTILIZER',
    'CHITRA NKP NPK': 'FERTILIZER',
    'CHITRA PKA NPK': 'FERTILIZER',
    'CHITRA 888': 'FERTILIZER',
    'CHITRA CAL-11': 'FERTILIZER',
    'CHITRA ZINCOOX': 'FERTILIZER',
    'CHITRA SOP': 'FERTILIZER',

    // MICRONUTRIENT / SPECIALTY NUTRITION (let's assign any left over here)
};

// Update catalog
const updatedCatalog = catalog.map(product => {
    const productName = product.name.toUpperCase().trim();
    let category = product.category;

    // Find in the map
    for (const [name, cat] of Object.entries(productCategoryMap)) {
        if (productName.includes(name.toUpperCase().replace(/[- ]/g, '')) ||
            productName === name.toUpperCase() ||
            product.name.toUpperCase() === name.toUpperCase()) {
            category = cat;
            break;
        }
    }

    return { ...product, category };
});

// Write back
fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2));
console.log('Catalog updated successfully!');
