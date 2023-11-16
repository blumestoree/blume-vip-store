export interface InputCreatePaymentDto {
  userId: string;
  productId: string[];
  installments: number;
  cardInfos: {
    cardNumber: string;
    holderName: string;
    expMonth: number;
    expYear: number;
    cvv: string;
  };
  token: string;
  function: string;
  gameUserId: string;
  gameItemName: string;
}

export interface OutputCreatePaymentDto {
  id: string;
  amount: number;
  userId: string;
  productId: string[];
}
