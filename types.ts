export interface NavItem {
  label: string;
  path: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  featured: boolean;
  description: string;
}
