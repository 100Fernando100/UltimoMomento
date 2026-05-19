export type CountryCode = 'AR' | 'MX' | 'ES' | 'CO' | 'CL';

export type Locale =
  | 'es-AR'
  | 'es-MX'
  | 'es-ES'
  | 'es-CO'
  | 'es-CL';

export interface CountryProfile {
  code: CountryCode;
  locale: Locale;
  name: string;
  flag: string;

  tone: string;
  voice: string;

  idioms: string[];
  vocabulary: Array<{ neutral: string; local: string }>;

  sensitiveTopics: string[];

  kickerExamples: string[];
  headlineExamples: string[];

  writingRules: string[];
}

export interface NewsInput {
  title: string;
  description?: string;
  link?: string;
  imageUrl?: string;
  country?: string;
}

export interface BuildPromptOptions {
  extraInstructions?: string;
}
