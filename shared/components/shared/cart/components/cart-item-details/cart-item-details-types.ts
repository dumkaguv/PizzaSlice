export interface CartItemProps {
  id: number;
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  disabled?: boolean;
}
