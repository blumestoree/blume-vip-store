export interface InputPaymentFacadeDto {
  id?: string;
  amount: number;
}

export interface OutputPaymentFacadeDto {
  id: string;
  amount: number;
}

export default interface PaymentFacadeInterface {
  process(input: InputPaymentFacadeDto): Promise<OutputPaymentFacadeDto>;
}
