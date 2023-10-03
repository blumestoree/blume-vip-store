export interface InputCreatePaymentDto {
  id: string;
  price: number;
  userId: string;
  productId: string;
}

export interface OutputCreatePaymentDto {
  id: string;
  amount: number;
  userId: string;
  productId: string;
}
