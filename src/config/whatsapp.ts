export const WHATSAPP_CONFIG = {
  phoneNumber: '+355 69 623 4684',
  rawNumber: '355696234684',
  displayNumber: '0696234684',
  baseWaUrl: 'https://wa.me/355696234684',
  instagramUrl: 'https://instagram.com/shisha.store.al',
  instagramHandle: '@shisha.store.al',
  email: 'contact@shishastore.al',
  address: 'Tiranë, Shqipëri (Dërgesa në të gjithë Shqipërinë)',
  workingHours: 'Porosi Online 24/7 në WhatsApp'
};

/**
 * Generates direct WhatsApp message link for a specific product matching the required template
 */
export const getProductWhatsAppUrl = (product: { name: string; price: number }) => {
  const message = `Përshëndetje,

Jam i interesuar për këtë produkt:

Produkt:
${product.name}

Çmimi:
${product.price} ALL

Ju lutem më dërgoni informacion.`;

  return `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Generates general WhatsApp contact link
 */
export const getGeneralWhatsAppUrl = (customText?: string) => {
  const defaultText = customText || 'Përshëndetje, dëshiroj me dërguar pyetje në lidhje me produktet tuaja të shishës.';
  return `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(defaultText)}`;
};
