export type ShowNotification = {
  type: string;
  message: string;
};

export type SignalPayloadType = {
  signal: AbortSignal;
};
