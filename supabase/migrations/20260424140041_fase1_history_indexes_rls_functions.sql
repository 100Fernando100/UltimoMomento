-- ============================================================
-- Rompenoticias - Schema Supabase - FASE 1
-- Agrega:
--   - Tabla articles_history (dedupe cross-run)
--   - Índices de performance
--   - Función helper insert_article_if_new (dedupe por source_url)
--   - RLS policies
--   - Función de limpieza cleanup_old_data
-- ============================================================

-- 1. Tabla de historia para dedupe cross-run
CREATE TABLE IF NOT EXISTS public.articles_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url text NOT NULL UNIQUE,
  source_name text NOT NULL,
  title_original text NOT NULL,
  hash_titulo text NOT NULL,
  seen_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_history_hash ON public.articles_history (hash_titulo);
CREATE INDEX IF NOT EXISTS idx_history_seen ON public.articles_history (seen_at DESC);

-- 2. Índices de performance sobre articles existente
CREATE INDEX IF NOT EXISTS idx_articles_active_published
  ON public.articles (active, published_at DESC)
  WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_articles_section
  ON public.articles (section);

CREATE INDEX IF NOT EXISTS idx_articles_featured
  ON public.articles (featured)
  WHERE featured = true;

-- 3. RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticker_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active articles" ON public.articles;
DROP POLICY IF EXISTS "Service role full access articles" ON public.articles;
DROP POLICY IF EXISTS "Service role full access history" ON public.articles_history;
DROP POLICY IF EXISTS "Public read active ticker" ON public.ticker_items;
DROP POLICY IF EXISTS "Service role full access ticker" ON public.ticker_items;

CREATE POLICY "Public read active articles"
  ON public.articles FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public read active ticker"
  ON public.ticker_items FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Service role full access articles"
  ON public.articles FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access history"
  ON public.articles_history FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access ticker"
  ON public.ticker_items FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- 4. Función helper: upsert con dedupe por source_url (últimas 48h)
CREATE OR REPLACE FUNCTION public.insert_article_if_new(
  p_title text,
  p_excerpt text,
  p_kicker text,
  p_kicker_color text,
  p_size text,
  p_section text,
  p_image_url text,
  p_source_url text,
  p_source_name text,
  p_country text,
  p_featured boolean,
  p_hash text
) RETURNS uuid AS $$
DECLARE
  v_existing uuid;
  v_new_id uuid;
BEGIN
  SELECT id INTO v_existing
  FROM public.articles_history
  WHERE source_url = p_source_url
    AND seen_at > now() - interval '48 hours'
  LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN null;
  END IF;

  INSERT INTO public.articles (
    title, excerpt, kicker, kicker_color, size, section,
    image_url, featured, active, published_at, source_url, country
  ) VALUES (
    p_title, p_excerpt, p_kicker, p_kicker_color, p_size, p_section,
    p_image_url, p_featured, true, now(), p_source_url, p_country
  )
  RETURNING id INTO v_new_id;

  INSERT INTO public.articles_history (source_url, source_name, title_original, hash_titulo)
  VALUES (p_source_url, p_source_name, p_title, p_hash)
  ON CONFLICT (source_url) DO UPDATE SET seen_at = now();

  RETURN v_new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Función de limpieza (correr 1x/día desde n8n)
CREATE OR REPLACE FUNCTION public.cleanup_old_data()
RETURNS void AS $$
BEGIN
  DELETE FROM public.articles_history
  WHERE seen_at < now() - interval '7 days';

  UPDATE public.articles
  SET active = false
  WHERE published_at < now() - interval '30 days'
    AND active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
