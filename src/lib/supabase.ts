import { createClient } from '@supabase/supabase-js';
import {
  CountryCode,
  filterArticlesForCountry,
  EditorialArticleLike,
} from './editorial';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Si las env vars no estan, exportamos un client placeholder para no romper
// la build. Los consumidores deben chequear `supabaseConfigured` antes de
// hacer queries reales.
export const supabase = createClient(
  supabaseUrl ?? 'http://localhost:54321',
  supabaseAnonKey ?? 'public-anon-key',
);

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  kicker: string;
  kicker_color: string;
  size: string;
  section: string;
  views: string;
  comments: number;
  published_at: string;
  featured: boolean;
  sort_order: number;
  active: boolean;
  // Campos legacy (compatibles)
  country?: string;
  source_url?: string;
  // Nuevos campos editoriales multi-pais
  distribution_scope?: 'global' | 'local' | string;
  source_country?: string;
  target_countries?: string[];
}

export interface TickerItem {
  id: string;
  text: string;
  active: boolean;
  sort_order: number;
}

export interface WorldCupMatch {
  id: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status: string;
  minute: string;
  sort_order: number;
}

export interface WorldCupNews {
  id: string;
  title: string;
  detail: string;
  image_url: string;
  kicker: string;
  kicker_color: string;
  badge: string;
  sort_order: number;
}

export interface SpecialistLetter {
  id: string;
  from_location: string;
  question: string;
  answer: string;
  featured: boolean;
  sort_order: number;
  active: boolean;
}

/**
 * Consulta articulos activos para una edicion (pais) determinada.
 *
 * Estrategia:
 *  1. Pedimos a Supabase los articulos candidatos: globales O del pais
 *     (via source_country o country legacy). Esto reduce payload.
 *  2. Aplicamos `filterArticlesForCountry` localmente para respetar
 *     `target_countries` y reglas WORLD/AMERICA.
 *
 * Si Supabase no esta configurado o falla, retorna `null` para que el caller
 * use su mock/fallback.
 */
export async function selectArticlesForCountry(
  country: CountryCode,
  opts: { limit?: number; section?: string } = {},
): Promise<Article[] | null> {
  if (!supabaseConfigured) return null;

  const { limit = 50, section } = opts;

  let query = supabase
    .from('articles')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false })
    .limit(limit);

  if (section) query = query.eq('section', section);

  // Filtrado server-side conservador: globales OR del pais (legacy + nuevo).
  // Las ediciones agregadoras (WORLD/AMERICA) no filtran.
  if (country !== 'WORLD' && country !== 'AMERICA') {
    const c = country;
    query = query.or(
      [
        'distribution_scope.eq.global',
        `source_country.eq.${c}`,
        `country.eq.${c}`,
      ].join(','),
    );
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[selectArticlesForCountry] supabase error:', error.message);
    return null;
  }
  if (!data) return [];

  // Refinamos con target_countries en cliente (no expresable trivialmente en .or()).
  return filterArticlesForCountry(data as Article[], country);
}

// Re-export para que callers no necesiten importar editorial directamente.
export type { CountryCode, EditorialArticleLike };
