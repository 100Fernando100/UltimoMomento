import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
