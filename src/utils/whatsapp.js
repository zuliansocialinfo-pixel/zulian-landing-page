// WhatsApp integration utility
const MARCO_WHATSAPP = '393927950038';

export const getWhatsAppLink = (message = 'Ciao Marco, mi interessa avere più informazioni sui vostri servizi.') => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${MARCO_WHATSAPP}?text=${encoded}`;
};

export const whatsappMessages = {
  consultation: 'Ciao Marco! Vorrei una consulenza gratuita per parlare della mia crescita digitale.',
  quote: (service = '') => `Ciao Marco! Vorrei un preventivo${service ? ` per ${service}` : ''}. Quali sono i tuoi tempi e disponibilità?`,
  service: (serviceName = '') => `Ciao Marco! Sono interessato a: ${serviceName}. Raccontami di più.`,
};
