export interface CartSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}
