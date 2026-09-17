import type { ReactNode } from 'react';

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
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string[];
  icon: ReactNode;
}