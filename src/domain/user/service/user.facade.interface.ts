export interface InputUserPurchaseDto {
  items: {
    amount: number;
    description: string;
    quantity: number;
    code: string;
  }[];

  customer: {
    name: string;
    type: string;
    email: string;
    document: string;
    document_type: string;
    phones: {
      mobile_phone: {
        country_code: string;
        area_code: string;
        number: string;
      };
    };
  };
  payments: {
    payment_method: string;
    credit_card: {
      recurrence: boolean;
      installments: number;
      statement_descriptor: string;
      card: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
      };
    };
    capture: boolean;
  }[];
}

export default interface UserServiceInterface {
  userPurchase(input: InputUserPurchaseDto): Promise<void>;
}
