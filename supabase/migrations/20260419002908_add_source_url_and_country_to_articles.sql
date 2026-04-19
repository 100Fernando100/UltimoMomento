/*
  # Agregar source_url y country a articles

  ## Cambios
  - `source_url` (text) — URL original del articulo de Infobae, usado para deduplicacion en n8n
  - `country` (text) — pais de origen del feed RSS: AR, ES o MX
  - Index en source_url para busquedas rapidas de deduplicacion

  ## Notas
  - source_url permite al nodo "Supabase — get recent URLs" de n8n chequear si un articulo ya fue procesado
  - country permite filtrar y mostrar noticias por region
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'source_url'
  ) THEN
    ALTER TABLE articles ADD COLUMN source_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'country'
  ) THEN
    ALTER TABLE articles ADD COLUMN country text DEFAULT '';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS articles_source_url_idx ON articles(source_url);
CREATE INDEX IF NOT EXISTS articles_country_idx ON articles(country);
