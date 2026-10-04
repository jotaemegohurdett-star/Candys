import blueExpressLogo from '@assets/blue-express-logo.svg';
import starkenLogo from '@assets/starken-logo.png';
import chilexpressLogo from '@assets/chilexpress-logo.svg';
import paketLogo from '@assets/logo_1791147632345.png';

export const SHIPPING_COST = 3500;
export const FREE_SHIPPING_THRESHOLD = 49900;

export type ShippingProviderId = 'blue-express' | 'starken' | 'chilexpress' | 'paket';

export const SHIPPING_PROVIDERS: {
  id: ShippingProviderId;
  name: string;
  logo: string;
  logoClassName: string;
  coverage: string;
}[] = [
  {
    id: 'blue-express',
    name: 'Blue Express',
    logo: blueExpressLogo,
    logoClassName: 'h-7 max-w-[112px]',
    coverage: 'Despacho nacional',
  },
  {
    id: 'starken',
    name: 'Starken',
    logo: starkenLogo,
    logoClassName: 'h-8 w-8',
    coverage: 'Despacho nacional',
  },
  {
    id: 'chilexpress',
    name: 'Chilexpress',
    logo: chilexpressLogo,
    logoClassName: 'h-7 max-w-[120px]',
    coverage: 'Despacho nacional',
  },
  {
    id: 'paket',
    name: 'Paket',
    logo: paketLogo,
    logoClassName: 'h-8 w-[92px] object-cover object-center',
    coverage: 'Región Metropolitana a VI Región',
  },
];