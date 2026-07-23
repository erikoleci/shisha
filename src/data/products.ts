import { Product } from '../types';

export const CATEGORIES = [
  'All',
  'Shisha / Hookah',
  'Flavors / Shije',
  'Bowls / Lule Argjile',
  'Hoses & Accessories',
  'Spare Parts'
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Luxury Crystal Hookah El-Badia",
    category: "Shisha / Hookah",
    image_url: "/src/assets/images/crystal_hookah_1784792487325.jpg",
    price: 350,
    description: "Shishe shisha luksoze e punuar me dorë nga kristali i pastër Bohemian dhe çelik inox me gdhendje të arta. Përfshin zorrë silikoni mat, mbrojtëse nxehtësie dhe kuti transporti premium.",
    available: true,
    featured: true,
    badge: "Bestseller",
    gallery: [
      "/src/assets/images/crystal_hookah_1784792487325.jpg",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Lartësia": "72 cm",
      "Materiali": "Kristal Bohemian & Çelik Inox",
      "Përfshin": "Difuzor i heshtur, zorrë silikoni, shufër alumini gold"
    }
  },
  {
    id: '2',
    name: "Premium Hookah Black Gold El-Badia",
    category: "Shisha / Hookah",
    image_url: "/src/assets/images/black_gold_hookah_1784792500549.jpg",
    price: 250,
    description: "Shishe moderne me dizajn elegant të zi me ar. Ndërtuar me material karboni dhe konduktivitet termik ideal për tym të dendur dhe të freskët.",
    available: true,
    featured: true,
    badge: "VIP Choice",
    gallery: [
      "/src/assets/images/black_gold_hookah_1784792500549.jpg"
    ],
    specs: {
      "Lartësia": "65 cm",
      "Materiali": "Alumin Anodizuar & Fibër Karboni"
    }
  },
  {
    id: '3',
    name: "Shisha Flavor - Double Apple Royal",
    category: "Flavors / Shije",
    image_url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop",
    price: 20,
    description: "Aromë ushqimore premium me shije molla e dyfishtë klasike me nuanca anisi të pasur. Prodhim origjinal me prerje të imët.",
    available: true,
    featured: true,
    badge: "Popular",
    specs: {
      "Sasia": "250g",
      "Aroma": "Mollë e Dyfishtë me Anis"
    }
  },
  {
    id: '4',
    name: "HC Phunnel Glazed Clay Bowl",
    category: "Bowls / Lule Argjile",
    image_url: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=800&auto=format&fit=crop",
    price: 18,
    description: "Lule/argjilë phunnel me smalt luksoz. Ruan lëngun e duhanit brenda dhe siguron shpërndarje uniforme të nxehtësisë.",
    available: true,
    badge: "Argjilë e Pjekur",
    specs: {
      "Materiali": "Argjilë e bardhë me smalt",
      "Kapaciteti": "18 - 22 gram"
    }
  },
  {
    id: '5',
    name: "Kaloud Lotus I+ Heat Management System",
    category: "Hoses & Accessories",
    image_url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop",
    price: 45,
    description: "Pajisje rregulluese e nxehtësisë prej alumini luksoz. Shmang djegien e duhanit dhe zgjat seancën e shishës.",
    available: true,
    badge: "Must Have",
    specs: {
      "Materiali": "Alumin i Shkallës Aeronautike Gold/Silver"
    }
  },
  {
    id: '6',
    name: "Premium Gold Silicone Hose",
    category: "Hoses & Accessories",
    image_url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop",
    price: 25,
    description: "Zorrë silikoni higjienike me kontakt ushqimor me dorezë alumini goditës të artë.",
    available: true,
    specs: {
      "Gjatësia": "1.5 Metra",
      "Doreza": "Alumin 38cm"
    }
  },
  {
    id: '7',
    name: "Replacement Glass Vase - Gold Diamond",
    category: "Spare Parts",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    price: 60,
    description: "Vazë qelqi rezervë e prerë si diamant me fletë ari 24k. Përshtatet me shumicën e shisheve luksoze El-Badia.",
    available: true,
    specs: {
      "Diametri i fytit": "4.5 cm",
      "Përmasat": "26 cm lartësi"
    }
  }
];
