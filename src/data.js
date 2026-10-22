import { assetUrl } from './assets.js';

// Dati non confermati: nessun recapito, orario o evento fittizio.
export const siteData = {
  name: 'Hollywood Bar',
  street: 'Corso Giovane Italia, 9',
  city: '15033 Casale Monferrato (AL)',
  address: 'Corso Giovane Italia, 9, 15033 Casale Monferrato (AL)',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hollywood+Bar+Corso+Giovane+Italia+9+Casale+Monferrato',
  facebookUrl: 'https://www.facebook.com/HOLLYWOOD.CASALE/',
  phone: null,
  email: null,
  openingHours: null,
  menuPdf: null,
  menuConfirmed: false,
  upcomingEvents: [],
};

// Racconto editoriale, non menu o formula commerciale confermati.
export const menuCategories = [
  {
    id: 'apericena', label: 'Apericena', title: 'Qualcosa da condividere.\nUna serata da vivere.',
    description: 'Si appoggiano i bicchieri, si avvicinano i piatti, cominciano le chiacchiere. L’apericena è un buon motivo per ritrovarsi attorno allo stesso tavolo.',
    detail: 'Assaggi e proposte possono cambiare: chiedi al locale la formula del giorno e i prezzi.',
    image: assetUrl('/images/real/tagliere.webp'), imageAlt: 'Tagliere con salumi, formaggi, olive e assaggi fotografato da un cliente di Hollywood',
    imageLabel: 'Un apericena da Hollywood · foto da una recensione del 2026', width: 679, height: 900, items: [],
  },
  {
    id: 'cocktail', label: 'Da bere', title: 'Il tuo drink.\nIl nostro punto d’incontro.',
    description: 'Un aperitivo al bancone o un brindisi al tavolo. Scegli cosa bere e prenditi il tempo di stare con chi vuoi.',
    detail: 'Per cocktail, bevande e disponibilità, chiedi la selezione attuale al locale.',
    image: assetUrl('/images/interno-hollywood.jpg'), imageAlt: 'Il bancone di Hollywood illuminato di lilla, fotografia storica di riferimento',
    imageLabel: 'Il bancone e la sala · fotografia storica di riferimento', width: 720, height: 480, items: [],
  },
  {
    id: 'giorno', label: 'Di giorno', title: 'Prima della sera,\nc’è tutta una giornata.',
    description: 'Il primo caffè, una colazione con calma, la pausa pranzo. Hollywood è anche il bar delle abitudini quotidiane, quelle che diventano un appuntamento.',
    detail: 'Scopri direttamente al locale le proposte disponibili per colazione e pranzo.',
    image: assetUrl('/images/real/insegna-storica.webp'), imageAlt: 'L’insegna storica Hollywood con lettering cinematografico e una stella scura',
    imageLabel: 'Un’insegna di Casale · fotografia storica di riferimento', width: 844, height: 900, items: [],
  },
];

export const galleryItems = [
  { id: 'sala', src: assetUrl('/images/interno-hollywood.jpg'), title: 'La sala', label: 'La sala e il bancone', alt: 'La sala di Hollywood Bar con archi, soffitto luminoso e bancone lilla', caption: 'La sala e il bancone · fotografia storica di riferimento; allestimento attuale da confermare.', illustrative: false, width: 720, height: 480 },
  { id: 'tavola', src: assetUrl('/images/real/apericena-festa.webp'), title: 'In compagnia', label: 'A tavola, in compagnia', alt: 'Vassoio di piccoli panini e assaggi durante un apericena da Hollywood', caption: 'Foto associata alla recensione Tripadvisor di Romana M, pubblicata il 1 marzo 2025. Formula attuale e data di scatto non certificate.', illustrative: false, width: 1200, height: 900 },
  { id: 'tagliere', src: assetUrl('/images/real/tagliere.webp'), title: 'L’apericena', label: 'Il momento apericena', alt: 'Salumi, formaggi, olive e assaggi su un tagliere da condividere', caption: 'Foto associata alla recensione Tripadvisor di Monica B, pubblicata il 10 gennaio 2026. Formula attuale e data di scatto non certificate.', illustrative: false, width: 679, height: 900 },
];
