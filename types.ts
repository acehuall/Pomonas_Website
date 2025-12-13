export interface NavItem {
  label: string;
  path: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string[];
  icon: React.ReactNode;
}