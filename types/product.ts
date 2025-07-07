export interface ProductType {
  _id: string;
  name: string;
  price: number;
  sizes: {
    _id: string;
    size: string;
    stock: number;
  }[];
  description: string;
  category: string;
  image: string[];
  createdAt: string;
}
