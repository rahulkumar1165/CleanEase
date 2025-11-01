import { PlaceHolderImages } from './placeholder-images';

export type Service = {
  id: string;
  category: 'Cleaning' | 'Pest Control';
  name: string;
  description: string;
  base_price: number;
  rating: number;
  reviews: number;
  image_url: string;
  image_hint: string;
  features: string[];
};

export type Category = {
  id: 'cleaning' | 'pest-control';
  name: 'Cleaning' | 'Pest Control';
  description: string;
};

export const categories: Category[] = [
  {
    id: 'cleaning',
    name: 'Cleaning',
    description: 'Comprehensive cleaning services for a spotless home.',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    description: 'Effective solutions to keep your home pest-free.',
  },
];

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image || { imageUrl: 'https://picsum.photos/seed/error/600/400', imageHint: 'placeholder' };
};

export const services: Service[] = [
  {
    id: 'bathroom-cleaning',
    category: 'Cleaning',
    name: 'Bathroom Cleaning',
    description: 'Deep cleaning of your bathroom, including tiles, fittings, and fixtures.',
    base_price: 499,
    rating: 4.8,
    reviews: 112000,
    image_url: getImage('bathroom-cleaning').imageUrl,
    image_hint: getImage('bathroom-cleaning').imageHint,
    features: [
      'Stain and spot removal from toilet, tiles, and basin',
      'Hard water stain removal',
      'Disinfection of surfaces',
    ],
  },
  {
    id: 'kitchen-cleaning',
    category: 'Cleaning',
    name: 'Kitchen Cleaning',
    description: 'Thorough cleaning of your kitchen, including appliances and cabinets.',
    base_price: 799,
    rating: 4.9,
    reviews: 98000,
    image_url: getImage('kitchen-cleaning').imageUrl,
    image_hint: getImage('kitchen-cleaning').imageHint,
    features: [
      'Oil and grease stain removal',
      'Appliance exterior cleaning (fridge, microwave)',
      'Cabinet and countertop cleaning',
    ],
  },
  {
    id: 'full-home-cleaning',
    category: 'Cleaning',
    name: 'Full Home / Move-in Cleaning',
    description: 'Complete top-to-bottom cleaning for your entire home.',
    base_price: 2499,
    rating: 4.9,
    reviews: 150000,
    image_url: getImage('full-home-cleaning').imageUrl,
    image_hint: getImage('full-home-cleaning').imageHint,
    features: [
      'Includes all rooms, kitchen, and bathrooms',
      'Dusting, vacuuming, and mopping',
      'Perfect for moving in or out',
    ],
  },
  {
    id: 'sofa-carpet-cleaning',
    category: 'Cleaning',
    name: 'Sofa & Carpet Cleaning',
    description: 'Professional cleaning to remove dust, stains, and allergens.',
    base_price: 399,
    rating: 4.7,
    reviews: 85000,
    image_url: getImage('sofa-carpet-cleaning').imageUrl,
    image_hint: getImage('sofa-carpet-cleaning').imageHint,
    features: [
      'Dry vacuuming to remove crumbs & dirt',
      'Wet shampooing & vacuuming for tough stains',
      'Safe for all fabric types',
    ],
  },
  {
    id: 'floor-tile-cleaning',
    category: 'Cleaning',
    name: 'Floor & Tile Cleaning',
    description: 'Restore the shine of your floors with professional scrubbing and polishing.',
    base_price: 599,
    rating: 4.8,
    reviews: 62000,
    image_url: getImage('floor-tile-cleaning').imageUrl,
    image_hint: getImage('floor-tile-cleaning').imageHint,
    features: [
      'Machine-assisted scrubbing',
      'Grout cleaning',
      'Suitable for marble, tiles, and wood',
    ],
  },
  {
    id: 'balcony-window-cleaning',
    category: 'Cleaning',
    name: 'Balcony / Window Cleaning',
    description: 'Streak-free cleaning for all your windows and glass surfaces.',
    base_price: 349,
    rating: 4.6,
    reviews: 45000,
    image_url: getImage('balcony-window-cleaning').imageUrl,
    image_hint: getImage('balcony-window-cleaning').imageHint,
    features: [
      'Interior and exterior window cleaning',
      'Grill and channel cleaning',
      'Safe and efficient process',
    ],
  },
  {
    id: 'mattress-cleaning',
    category: 'Cleaning',
    name: 'Mattress Cleaning',
    description: 'Sanitize your mattress and remove dust mites, allergens, and stains.',
    base_price: 499,
    rating: 4.7,
    reviews: 51000,
    image_url: getImage('mattress-cleaning').imageUrl,
    image_hint: getImage('mattress-cleaning').imageHint,
    features: [
      'Deep vacuuming and shampooing',
      'Stain and odor removal',
      'Kills bacteria and allergens',
    ],
  },
  {
    id: 'general-pest-control',
    category: 'Pest Control',
    name: 'Cockroach, Ant & General',
    description: 'Comprehensive treatment for common household pests.',
    base_price: 699,
    rating: 4.9,
    reviews: 210000,
    image_url: getImage('general-pest-control').imageUrl,
    image_hint: getImage('general-pest-control').imageHint,
    features: [
      'Herbal, low-odor gel application',
      'Targets hiding and breeding spots',
      'Safe for children and pets',
    ],
  },
  {
    id: 'bed-bugs-control',
    category: 'Pest Control',
    name: 'Bed Bugs Control',
    description: 'Intensive treatment to eradicate bed bugs from your home.',
    base_price: 899,
    rating: 4.8,
    reviews: 75000,
    image_url: getImage('bed-bugs-control').imageUrl,
    image_hint: getImage('bed-bugs-control').imageHint,
    features: [
      'Thorough inspection of furniture',
      'Advanced chemical spray treatment',
      'Follow-up visit included',
    ],
  },
  {
    id: 'termite-control',
    category: 'Pest Control',
    name: 'Termite Control',
    description: 'Protect your furniture and property from termite damage.',
    base_price: 1299,
    rating: 4.9,
    reviews: 95000,
    image_url: getImage('termite-control').imageUrl,
    image_hint: getImage('termite-control').imageHint,
    features: [
      'Drill-fill-seal technique',
      'Creates a chemical barrier',
      'Long-lasting protection',
    ],
  },
  {
    id: 'mosquito-control',
    category: 'Pest Control',
    name: 'Mosquito Control',
    description: 'Effective mosquito control for your home and surroundings.',
    base_price: 599,
    rating: 4.7,
    reviews: 68000,
    image_url: getImage('mosquito-control').imageUrl,
    image_hint: getImage('mosquito-control').imageHint,
    features: [
      'Indoor residual spray',
      'Outdoor fogging treatment',
      'Larvicidal treatment for stagnant water',
    ],
  },
];
