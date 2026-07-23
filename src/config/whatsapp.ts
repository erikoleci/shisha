export const WHATSAPP_CONFIG = {
  phoneNumber: '+355 67 493 3622',
  rawNumber: '355674933622',
  displayNumber: '0674933622',
  baseWaUrl: 'https://wa.me/355674933622',
  instagramUrl: 'https://www.instagram.com/mra_shisha?igsh=MTk3eWRqOG52Mzc5Ng==',
  instagramHandle: '@mra_shisha',
  email: 'contact@mrashisha.al',
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
