import type {
  BuildPromptOptions,
  CountryCode,
  CountryProfile,
  Locale,
  NewsInput,
} from './types';
import { countryProfiles, defaultCountry, supportedCountries } from './countries';

export type { CountryCode, CountryProfile, Locale, NewsInput } from './types';
export { countryProfiles, supportedCountries, defaultCountry };

const localeToCode: Record<Locale, CountryCode> = {
  'es-AR': 'AR',
  'es-MX': 'MX',
  'es-ES': 'ES',
  'es-CO': 'CO',
  'es-CL': 'CL',
};

const domainToCode: Record<string, CountryCode> = {
  ar: 'AR',
  mx: 'MX',
  es: 'ES',
  co: 'CO',
  cl: 'CL',
};

export function normalizeCountry(input?: string | null): CountryCode {
  if (!input) return defaultCountry;
  const raw = String(input).trim();
  const upper = raw.toUpperCase();
  if ((supportedCountries as string[]).includes(upper)) {
    return upper as CountryCode;
  }
  const lower = raw.toLowerCase();
  if (lower in domainToCode) return domainToCode[lower];
  if (raw in localeToCode) return localeToCode[raw as Locale];
  return defaultCountry;
}

export function getCountryProfile(input?: string | null): CountryProfile {
  return countryProfiles[normalizeCountry(input)];
}

export function buildSystemPrompt(profile: CountryProfile): string {
  const idioms = profile.idioms.map(i => `- "${i}"`).join('\n');
  const vocab = profile.vocabulary
    .map(v => `- ${v.neutral} → ${v.local}`)
    .join('\n');
  const sensitive = profile.sensitiveTopics.map(t => `- ${t}`).join('\n');
  const rules = profile.writingRules.map(r => `- ${r}`).join('\n');
  const headlines = profile.headlineExamples.map(h => `- ${h}`).join('\n');
  const kickers = profile.kickerExamples.map(k => `"${k}"`).join(', ');

  return `Eres el redactor satírico de RompeNoticias para ${profile.name} (${profile.locale}).

TONO: ${profile.tone}
VOZ: ${profile.voice}

MODISMOS PERMITIDOS (usar 1-2 por nota, sin saturar):
${idioms}

VOCABULARIO LOCAL (preferir lo local sobre lo neutral):
${vocab}

REGLAS DE REDACCIÓN:
${rules}

TEMAS SENSIBLES (no se ironiza con víctimas; sátira al poder sí):
${sensitive}

EJEMPLOS DE TITULARES EN ESTE ESTILO:
${headlines}

KICKERS TÍPICOS: ${kickers}`;
}

export function buildPrompt(
  country: string | null | undefined,
  news: NewsInput,
  options: BuildPromptOptions = {}
): string {
  const profile = getCountryProfile(country);
  const system = buildSystemPrompt(profile);

  const title = news.title ?? '';
  const description = news.description ?? '';
  const link = news.link ?? '';

  const extra = options.extraInstructions
    ? `\n\nINSTRUCCIONES ADICIONALES:\n${options.extraInstructions}`
    : '';

  return `${system}

NOTICIA ORIGINAL:
Título: ${title}
Resumen: ${description}
País: ${profile.code}
URL: ${link}

TAREA:
1. Reescribe el título en clave satírica de RompeNoticias, con tono local de ${profile.name}.
2. Redacta un excerpt de 2-3 oraciones en el mismo tono, basado en la noticia real.
3. Elige un kicker breve en MAYÚSCULAS (idealmente de los típicos del país).
4. Devuelve UNICAMENTE un JSON válido (sin markdown, sin explicaciones) con este formato:
{
  "title": "TITULAR SATÍRICO CON TONO LOCAL",
  "excerpt": "Bajada de 2-3 oraciones en tono local apocalíptico pero basada en la noticia real.",
  "kicker": "KICKER EN MAYÚSCULAS",
  "kicker_color": "#cc0000",
  "size": "medium",
  "section": "tragedias",
  "views": "892K",
  "country": "${profile.code}",
  "locale": "${profile.locale}"
}

Restricciones de los campos:
- kicker_color ∈ ["#cc0000", "#ff6600", "#e65c00"]
- size ∈ ["large", "medium", "small"]
- section ∈ ["tragedias", "catastrofes", "exclusivos", "virales", "escandalos"]
- views: string corto tipo "892K", "1.7M", "3.3M".${extra}`;
}
