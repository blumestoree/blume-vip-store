export interface InputProcessPaymentDto {
  items: {
    amount: number;
    description: string;
    quantity: number;
    code: string;
  }[];

  customer: {
    name: string;
    email: string;
  };
  payments: {
    payment_method: 'credit_card' | 'debit_card';
    credit_card: {
      recurrence: boolean;
      installments: number;
      card: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
      };
    };
  }[];
}

export default interface ProcessPaymentInterface {
  userPurchase(input: InputProcessPaymentDto): Promise<void>;
}
