export interface ProductType {
  _id: string;
  name: string;
  price: number;
  sizes: {
    size: string;
    stock: number;
  }[];
  description: string;
  category: string;
  image: string[];
  createdAt: string;
}
