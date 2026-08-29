export const HOME_SEO = {
  title: "Porta Mascotas para Perros y Gatos | Hecho a Mano en Chile — Candy's Pet",
  description:
    'Porta mascotas tipo banano en Chile y bolsos manos libres para perros y gatos. Porta mascotas de tela artesanales, cómodos y seguros. Envíos a todo Chile.',
  path: '/',
};

type SeoConfig = {
  title: string;
  description: string;
  path: string;
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function applySeo({ title, description, path }: SeoConfig) {
  document.title = title;

  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', `https://candyspet.cl${path}`);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `https://candyspet.cl${path}`;
}