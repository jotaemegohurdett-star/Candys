import blueExpressLogo from '@assets/blue-express-logo.svg';
import starkenLogo from '@assets/starken-logo.png';
import chilexpressLogo from '@assets/chilexpress-logo.svg';

export const SHIPPING_COST = 3500;
export const FREE_SHIPPING_THRESHOLD = 49900;

export type ShippingProviderId = 'blue-express' | 'starken' | 'chilexpress';

export const SHIPPING_PROVIDERS: {
  id: ShippingProviderId;
  name: string;
  logo: string;
  logoClassName: string;
}[] = [
  {
    id: 'blue-express',
    name: 'Blue Express',
    logo: blueExpressLogo,
    logoClassName: 'h-7 max-w-[112px]',
  },
  {
    id: 'starken',
    name: 'Starken',
    logo: starkenLogo,
    logoClassName: 'h-8 w-8',
  },
  {
    id: 'chilexpress',
    name: 'Chilexpress',
    logo: chilexpressLogo,
    logoClassName: 'h-7 max-w-[120px]',
  },
];