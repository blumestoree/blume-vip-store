export interface InputCreatePaymentFacadeDto {
  amount: number;
  userId: string;
  productId: string[];
}

export interface OutputCreatePaymentFacadeDto {
  id: string;
  amount: number;
  userId: string;
  productId: string[];
}
export default interface PaymentFacadeInterface {
  createPayment(input: InputCreatePaymentFacadeDto): Promise<OutputCreatePaymentFacadeDto>;
}
