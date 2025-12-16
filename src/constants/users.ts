import { USER_PLANS_TYPE, USER_PLAN_PRICE_TYPE } from '@/types';

export type UserPrice = {
  type: number;
  title: string;
  price: number;
  description: string;
  isRecommend: boolean;
  advantages: string[];
};

export const USER_PLAN = {
  [USER_PLANS_TYPE.PREMIUM]: 'Account Paying',
  [USER_PLANS_TYPE.ENTERPRISE]: 'Enterprise',
};

export const dataUserPrices: UserPrice[] = [
  {
    type: USER_PLANS_TYPE.PREMIUM,
    title: 'Account Paying',
    description: 'Perfect for personal websites.',
    price: USER_PLAN_PRICE_TYPE.PREMIUM,
    isRecommend: true,
    advantages: [
      '100 Trang Web',
      'Managed WordPress',
      '100 GB Dung Lượng Đĩa SSD',
      'Website Builder Hostinger',
      'Miễn phí tự động chuyển dịch trang web',
      'CDN miễn phí',
    ],
  },
  {
    type: USER_PLANS_TYPE.ENTERPRISE,
    title: 'Enterprise',
    description: 'Perfect for enterprise websites.',
    price: USER_PLAN_PRICE_TYPE.ENTERPRISE,
    isRecommend: false,
    advantages: [
      '100 Trang Web',
      'Managed WordPress',
      '100 GB Dung Lượng Đĩa SSD',
      'Website Builder Hostinger',
      'Miễn phí tự động chuyển dịch trang web',
    ],
  },
];
