export const WA_NUMBER = '56936693300';
export const CUSTOM_WA_NUMBER = '56990504762';
export const IG_URL = 'https://www.instagram.com/candys_pets1/';

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function customProductWaLink(text: string): string {
  return `https://wa.me/${CUSTOM_WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Smooth-scroll to any element by id */
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
