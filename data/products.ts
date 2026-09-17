import type { Product } from '../types';
import { jewellery, teaTowel, cap, monsteraPrint, netBag, orangeVase } from '../src/assets/images';

// Prices retained from the original Merchandise page, the agreed source of truth.
export const products: Product[] = [
  {
    id: '1', name: "Pomona's Jewellery", price: '£55.00',
    image: jewellery.src, imageWidth: jewellery.width, imageHeight: jewellery.height,
    imageAlt: 'Hands wearing rings and holding a slender dried stem against a brown background',
    description: 'A small detail for everyday wear.', featured: false,
  },
  {
    id: '2', name: 'Citrus Tea Towel', price: '£18.00',
    image: teaTowel.src, imageWidth: teaTowel.width, imageHeight: teaTowel.height,
    imageAlt: 'Green tea towel printed with colourful citrus fruit on a yellow background',
    description: 'Cotton kitchen towel.', featured: true,
  },
  {
    id: '3', name: "Pomona's Green Cap", price: '£18.00',
    image: cap.src, imageWidth: cap.width, imageHeight: cap.height,
    imageAlt: "Dark green cap embroidered with the Pomona's wordmark",
    description: 'Embroidered cotton cap.', featured: true,
  },
  {
    id: '4', name: 'Monstera Art Print', price: '£45.00',
    image: monsteraPrint.src, imageWidth: monsteraPrint.width, imageHeight: monsteraPrint.height,
    imageAlt: 'A single green monstera leaf on a pink background',
    description: 'Botanical minimalist decor.', featured: false,
  },
  {
    id: '5', name: 'Market Net Bag', price: '£15.00',
    image: netBag.src, imageWidth: netBag.width, imageHeight: netBag.height,
    imageAlt: 'Cream mesh bag holding bread rolls on a pale surface',
    description: 'Expandable cotton mesh.', featured: true,
  },
  {
    id: '6', name: 'Ceramic Vase', price: '£73.00',
    image: orangeVase.src, imageWidth: orangeVase.width, imageHeight: orangeVase.height,
    imageAlt: 'Orange ring-shaped vase holding an orange flower against a peach background',
    description: 'Hand-thrown speckled clay.', featured: true,
  },
];
