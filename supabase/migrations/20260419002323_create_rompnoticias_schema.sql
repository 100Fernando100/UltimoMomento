/*
  # RompeNoticias - Schema Completo

  ## Tablas Nuevas

  1. `articles` - Noticias principales y secundarias
     - id, title, excerpt, image_url, kicker, kicker_color, size (large/medium/small/secondary)
     - section (tragedias/catastrofes/mundial/sidebar), views, comments, published_at
     - featured (boolean para la investigacion especial)

  2. `ticker_items` - Titulares del banner de noticias en tiempo real
     - id, text, active, sort_order, created_at

  3. `world_cup_matches` - Marcadores del Mundial 2026
     - id, team1, team2, score1, score2, status (EN JUEGO / FINALIZADO / PRONTO), minute

  4. `world_cup_news` - Noticias del Mundial
     - id, title, detail, image_url, kicker, kicker_color, badge, published_at

  5. `specialist_letters` - Cartas al Especialista (Correo del Corazon)
     - id, from_location, question, answer, published_at, featured

  ## Seguridad
  - RLS habilitado en todas las tablas
  - Lectura publica para el contenido del sitio
  - Escritura solo para service_role (para n8n y administracion)
*/

-- ============================================================
-- ARTICLES (noticias principales, secundarias y sidebar)
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  excerpt text DEFAULT '',
  image_url text DEFAULT '',
  kicker text DEFAULT '',
  kicker_color text DEFAULT '#cc0000',
  size text DEFAULT 'medium',
  section text DEFAULT 'tragedias',
  views text DEFAULT '0',
  comments integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Service role can insert articles"
  ON articles FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update articles"
  ON articles FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete articles"
  ON articles FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- TICKER ITEMS (titulares del banner)
-- ============================================================
CREATE TABLE IF NOT EXISTS ticker_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL DEFAULT '',
  active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ticker_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active ticker items"
  ON ticker_items FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Service role can insert ticker items"
  ON ticker_items FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update ticker items"
  ON ticker_items FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete ticker items"
  ON ticker_items FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- WORLD CUP MATCHES (marcadores en vivo)
-- ============================================================
CREATE TABLE IF NOT EXISTS world_cup_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team1 text NOT NULL DEFAULT '',
  team2 text NOT NULL DEFAULT '',
  score1 integer DEFAULT 0,
  score2 integer DEFAULT 0,
  status text DEFAULT 'PRONTO',
  minute text DEFAULT '',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE world_cup_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active matches"
  ON world_cup_matches FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Service role can insert matches"
  ON world_cup_matches FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update matches"
  ON world_cup_matches FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete matches"
  ON world_cup_matches FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- WORLD CUP NEWS (noticias del mundial)
-- ============================================================
CREATE TABLE IF NOT EXISTS world_cup_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  detail text DEFAULT '',
  image_url text DEFAULT '',
  kicker text DEFAULT '',
  kicker_color text DEFAULT '#cc0000',
  badge text DEFAULT '',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE world_cup_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active world cup news"
  ON world_cup_news FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Service role can insert world cup news"
  ON world_cup_news FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update world cup news"
  ON world_cup_news FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete world cup news"
  ON world_cup_news FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- SPECIALIST LETTERS (correo del corazon)
-- ============================================================
CREATE TABLE IF NOT EXISTS specialist_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_location text NOT NULL DEFAULT '',
  question text NOT NULL DEFAULT '',
  answer text DEFAULT '',
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE specialist_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active letters"
  ON specialist_letters FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public can submit new letters"
  ON specialist_letters FOR INSERT
  TO anon, authenticated
  WITH CHECK (answer = '' OR answer IS NULL);

CREATE POLICY "Service role can insert letters"
  ON specialist_letters FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update letters"
  ON specialist_letters FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete letters"
  ON specialist_letters FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS articles_section_idx ON articles(section, active, sort_order);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS ticker_items_sort_idx ON ticker_items(active, sort_order);
CREATE INDEX IF NOT EXISTS matches_sort_idx ON world_cup_matches(active, sort_order);
CREATE INDEX IF NOT EXISTS wc_news_sort_idx ON world_cup_news(active, sort_order);
CREATE INDEX IF NOT EXISTS letters_sort_idx ON specialist_letters(active, sort_order);
