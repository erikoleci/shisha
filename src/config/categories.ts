// Albanian display names for the category ids stored in the database.
export const CATEGORY_LABELS: Record<string, string> = {
  All: 'Të gjitha',
  'Premium Hookahs': 'Shisha premium',
  'Classic Hookahs': 'Shisha klasike',
  Flavors: 'Aroma',
  Bowls: 'Argjila',
  Accessories: 'Aksesorë',
  Hoses: 'Zorrë & doreza',
  Charcoal: 'Qymyr kokosi',
  // older category names still found in some records
  'Shisha / Hookah': 'Shisha',
  'Flavors / Shije': 'Aroma',
  'Bowls / Lule Argjile': 'Argjila',
  'Hoses & Accessories': 'Zorrë & aksesorë',
  'Spare Parts': 'Pjesë këmbimi',
};

export const categoryLabel = (id: string) => CATEGORY_LABELS[id] || id;
