export type ProductCategory = 'Care' | 'Repair' | 'Accessories';

export type Product = {
  id: string;
  itemNumber: string;
  name: string;
  brand: string;
  category: ProductCategory;
  wholesale: number;
  price: number;
  unit: string;
  inventory: number | null;
  description: string;
};

const markup = (price: number) => Number((price * 1.1).toFixed(2));

export const products: Product[] = [
  {
    id: '39187',
    itemNumber: '39187',
    name: 'Griffin Authentic Western Boot Leather Conditioner, 8 oz',
    brand: 'Griffin',
    category: 'Care',
    wholesale: 5,
    price: markup(5),
    unit: 'EA',
    inventory: 15,
    description: 'Leather conditioner selected for cowboy boot care supply orders.'
  },
  {
    id: '39188',
    itemNumber: '39188',
    name: 'Griffin Authentic Western Boot Water & Stain Repellent Spray, 8 oz',
    brand: 'Griffin',
    category: 'Care',
    wholesale: 5,
    price: markup(5),
    unit: 'EA',
    inventory: 16,
    description: 'Water and stain repellent spray for western boot care.'
  },
  {
    id: '39189',
    itemNumber: '39189',
    name: 'Griffin Authentic Western Boot Oil, 8 oz',
    brand: 'Griffin',
    category: 'Care',
    wholesale: 5,
    price: markup(5),
    unit: 'EA',
    inventory: 35,
    description: 'Boot oil for leather conditioning and maintenance.'
  },
  {
    id: '02031',
    itemNumber: '02031',
    name: 'Ralyn C100D Professional Shine Brush Black',
    brand: 'Ralyn',
    category: 'Care',
    wholesale: 8.1,
    price: markup(8.1),
    unit: 'EA',
    inventory: null,
    description: 'Professional shine brush for boot and shoe care.'
  },
  {
    id: '02033',
    itemNumber: '02033',
    name: 'Ralyn C100L Professional Shine Brush White',
    brand: 'Ralyn',
    category: 'Care',
    wholesale: 8.1,
    price: markup(8.1),
    unit: 'EA',
    inventory: null,
    description: 'Professional shine brush for boot and shoe care.'
  },
  {
    id: '02035',
    itemNumber: '02035',
    name: 'Ralyn C12 Brush Dauber Dark Bristles',
    brand: 'Ralyn',
    category: 'Care',
    wholesale: 2.05,
    price: markup(2.05),
    unit: 'EA',
    inventory: null,
    description: 'Brush dauber for polish and leather-care application.'
  },
  {
    id: '02036',
    itemNumber: '02036',
    name: 'Ralyn C12 Brush Dauber Light Bristles',
    brand: 'Ralyn',
    category: 'Care',
    wholesale: 2.05,
    price: markup(2.05),
    unit: 'EA',
    inventory: null,
    description: 'Brush dauber for polish and leather-care application.'
  },
  {
    id: '12033',
    itemNumber: '12033',
    name: "Kelly's Lynn Easy Cleaner, 8 oz",
    brand: "Kelly's",
    category: 'Care',
    wholesale: 3,
    price: markup(3),
    unit: 'EA',
    inventory: 40,
    description: 'Cleaner for leather goods.'
  },
  {
    id: '12658',
    itemNumber: '12658',
    name: "Kelly's Color Spray, Black, LG",
    brand: "Kelly's",
    category: 'Care',
    wholesale: 12,
    price: markup(12),
    unit: 'EA',
    inventory: 107,
    description: 'Color spray for leather refinishing.'
  },
  {
    id: '26935',
    itemNumber: '26935',
    name: "Kelly's Paste Wax Shoe Polish Black",
    brand: "Kelly's",
    category: 'Care',
    wholesale: 3.25,
    price: markup(3.25),
    unit: 'EA',
    inventory: 61,
    description: 'Paste wax polish.'
  },
  {
    id: '27830',
    itemNumber: '27830',
    name: 'BootRescue All-Natural Boot Cleaning Wipes, 10 Individually Wrapped Wipes',
    brand: 'BootRescue',
    category: 'Care',
    wholesale: 4,
    price: markup(4),
    unit: 'EA',
    inventory: 3168,
    description: 'Boot cleaning wipes.'
  },
  {
    id: '27831',
    itemNumber: '27831',
    name: 'BootRescue All-Natural Boot Cleaning Wipes, 15 Wipes Pouch',
    brand: 'BootRescue',
    category: 'Care',
    wholesale: 4,
    price: markup(4),
    unit: 'EA',
    inventory: 7546,
    description: 'Boot cleaning wipes in resealable pouch.'
  },
  {
    id: '27886',
    itemNumber: '27886',
    name: 'BootRescue All-Natural Protector Spray, 6 oz',
    brand: 'BootRescue',
    category: 'Care',
    wholesale: 8.5,
    price: markup(8.5),
    unit: 'EA',
    inventory: 1244,
    description: 'Protector spray for boots.'
  },
  {
    id: '17799',
    itemNumber: '17799',
    name: "Fiebing's Sole & Heel Dressing, Black, 4 oz",
    brand: "Fiebing's",
    category: 'Repair',
    wholesale: 3.6,
    price: markup(3.6),
    unit: 'EA',
    inventory: 54,
    description: 'Sole and heel dressing.'
  },
  {
    id: '17800',
    itemNumber: '17800',
    name: "Fiebing's Sole & Heel Dressing, Brown, 4 oz",
    brand: "Fiebing's",
    category: 'Repair',
    wholesale: 3.6,
    price: markup(3.6),
    unit: 'EA',
    inventory: 22,
    description: 'Sole and heel dressing.'
  },
  {
    id: '16830',
    itemNumber: '16830',
    name: "Fiebing's Deglazer, 4 oz",
    brand: "Fiebing's",
    category: 'Repair',
    wholesale: 5,
    price: markup(5),
    unit: 'EA',
    inventory: 24,
    description: 'Deglazer for leather preparation.'
  },
  {
    id: '26950',
    itemNumber: '26950',
    name: "Fiebing's Resolene Neutral, 4 oz",
    brand: "Fiebing's",
    category: 'Repair',
    wholesale: 6.05,
    price: markup(6.05),
    unit: 'EA',
    inventory: 23,
    description: 'Neutral finish for leather work.'
  },
  {
    id: '39155',
    itemNumber: '39155',
    name: 'Boot Shaper with Handle, Gold',
    brand: 'Justin Blair',
    category: 'Accessories',
    wholesale: 16,
    price: markup(16),
    unit: 'PR',
    inventory: 41,
    description: 'Boot shaper with handle.'
  },
  {
    id: '126029',
    itemNumber: '126029',
    name: 'Boot Weights - 1 lb, Case of 12',
    brand: 'Justin Blair',
    category: 'Accessories',
    wholesale: 43.2,
    price: markup(43.2),
    unit: 'CS',
    inventory: 472,
    description: 'Boot weights sold by case.'
  },
  {
    id: '17928',
    itemNumber: '17928',
    name: 'Boot Roll Up, Clear, 26 inch, Sold by the Dozen',
    brand: 'Justin Blair',
    category: 'Accessories',
    wholesale: 110,
    price: markup(110),
    unit: 'CS',
    inventory: 6,
    description: 'Clear boot roll up.'
  },
  {
    id: '09139',
    itemNumber: '09139',
    name: 'Boot Hook Long Pair',
    brand: 'Justin Blair',
    category: 'Accessories',
    wholesale: 9,
    price: markup(9),
    unit: 'PR',
    inventory: null,
    description: 'Long boot hooks sold by the pair.'
  },
  {
    id: '09140',
    itemNumber: '09140',
    name: 'Boot Hook Short Pair',
    brand: 'Justin Blair',
    category: 'Accessories',
    wholesale: 8.3,
    price: markup(8.3),
    unit: 'PR',
    inventory: null,
    description: 'Short boot hooks sold by the pair.'
  }
];
