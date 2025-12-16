export type ScreenshotOptionType = {
  id: string;
  key: string;
  value: string;
  createdAt: string;
};

export type AddScreenshotOptionRequest = Omit<
  ScreenshotOptionType,
  'id' | 'createdAt'
>[];

export type UpdateScreenshotOptionRequest = Omit<
  ScreenshotOptionType,
  'createdAt'
>[];
