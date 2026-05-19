/*
 * Logica editorial multi-pais.
 *
 * Cada edicion (pais) muestra:
 *  - Articulos globales (distribution_scope === 'global') que no excluyen ese pais
 *    via target_countries no vacio sin incluirlo.
 *  - Articulos locales de ese pais (distribution_scope === 'local' y source_country === country),
 *    con fallback al campo legacy `country`.
 */

export type CountryCode = 'AR' | 'MX' | 'ES' | 'CO' | 'CL' | 'PE' | 'VE' | 'US' | 'CA' | 'WORLD' | 'AMERICA';

export const SUPPORTED_COUNTRIES: CountryCode[] = [
  'AR', 'MX', 'ES', 'CO', 'CL', 'PE', 'VE', 'US', 'CA', 'WORLD', 'AMERICA',
];

// Mapa entre el "domain" usado por CountryBar y el codigo editorial.
const DOMAIN_TO_COUNTRY: Record<string, CountryCode> = {
  ar: 'AR',
  mx: 'MX',
  es: 'ES',
  co: 'CO',
  cl: 'CL',
  pe: 'PE',
  ve: 'VE',
  us: 'US',
  ca: 'CA',
  world: 'WORLD',
  america: 'AMERICA',
};

const COUNTRY_TO_DOMAIN: Record<CountryCode, string> = {
  AR: 'ar', MX: 'mx', ES: 'es', CO: 'co', CL: 'cl', PE: 'pe',
  VE: 've', US: 'us', CA: 'ca', WORLD: 'world', AMERICA: 'america',
};

export function domainToCountry(domain: string): CountryCode {
  return DOMAIN_TO_COUNTRY[domain.toLowerCase()] ?? 'AMERICA';
}

export function countryToDomain(country: CountryCode): string {
  return COUNTRY_TO_DOMAIN[country] ?? 'america';
}

/**
 * Detecta el pais activo a partir del path o el hostname. Se usa como default
 * inicial cuando el usuario aterriza en la pagina.
 *
 * Reglas:
 *  - /ar, /mx, /es, /co, /cl, /pe, /ve, /us, /ca -> pais correspondiente
 *  - /mundo -> WORLD
 *  - /america o sin segmento -> AMERICA
 *  - subdominio ar.rompenoticias.com -> AR (futuro)
 */
export function detectCountryFromLocation(loc?: { pathname?: string; hostname?: string }): CountryCode {
  const pathname = loc?.pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const hostname = loc?.hostname ?? (typeof window !== 'undefined' ? window.location.hostname : '');

  const firstSeg = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';
  if (firstSeg === 'mundo') return 'WORLD';
  if (firstSeg in DOMAIN_TO_COUNTRY) return DOMAIN_TO_COUNTRY[firstSeg];

  const sub = hostname.split('.')[0]?.toLowerCase() ?? '';
  if (sub in DOMAIN_TO_COUNTRY) return DOMAIN_TO_COUNTRY[sub];

  return 'AMERICA';
}

// Forma minima de articulo que necesita el filtro editorial. Compatible con
// la tabla `articles` extendida pero tolerante con datos legacy (sin scope).
export interface EditorialArticleLike {
  distribution_scope?: string | null;
  source_country?: string | null;
  target_countries?: string[] | null;
  country?: string | null;
}

/**
 * Determina si un articulo es visible en la edicion del pais dado.
 *
 * Compatibilidad legacy:
 *  - Si el articulo no tiene `distribution_scope`, se asume 'local' y se usa
 *    el campo `country` como source_country.
 *  - 'WORLD' y 'AMERICA' son ediciones agregadoras: ven todos los globales y
 *    todos los locales (no se les filtra por pais).
 */
export function isArticleVisibleInCountry(article: EditorialArticleLike, country: CountryCode): boolean {
  const scope = (article.distribution_scope || 'local').toLowerCase();
  const source = (article.source_country || article.country || '').toUpperCase();
  const targets = (article.target_countries ?? []).map(c => c.toUpperCase());

  if (country === 'WORLD' || country === 'AMERICA') {
    return true;
  }

  if (scope === 'global') {
    if (targets.length === 0) return true;
    return targets.includes(country);
  }

  // local
  return source === country;
}

export function filterArticlesForCountry<T extends EditorialArticleLike>(
  articles: T[],
  country: CountryCode,
): T[] {
  return articles.filter(a => isArticleVisibleInCountry(a, country));
}
