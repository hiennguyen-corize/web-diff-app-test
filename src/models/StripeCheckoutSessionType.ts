export type RetrieveCheckoutSessionRequest = {
  sessionId: string;
};

export type RetrieveCheckoutSessionResponse = {
  message: string;
  data: CheckoutSessionType;
};

export type CheckoutSessionType = {
  subscriptionId: string;
  status: string;
  paymentTime: string;
  product: {
    name: string;
    price: number;
    currency: string;
  };
};
