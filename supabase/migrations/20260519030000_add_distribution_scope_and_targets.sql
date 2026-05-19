/*
  # Distribucion editorial multi-pais (global / local)

  ## Cambios
  - `distribution_scope` (text): 'global' | 'local' (default 'local').
    - 'global' -> articulo central que aparece en todas las ediciones (o en `target_countries` si esta seteado).
    - 'local'  -> articulo de un pais especifico, solo visible en su edicion.
  - `source_country` (text): pais editorial de origen (AR/MX/ES/CO/CL/...). Se inicializa desde `country` por compatibilidad.
  - `target_countries` (text[]): lista opcional de paises objetivo. Si esta vacia y el scope es 'global', se considera visible en todas las ediciones.

  ## Notas de compatibilidad
  - Columnas antiguas (`country`) se mantienen y se siguen leyendo.
  - Backfill no destructivo: registros existentes quedan como 'local' con `source_country = country`.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'distribution_scope'
  ) THEN
    ALTER TABLE articles ADD COLUMN distribution_scope text DEFAULT 'local';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'source_country'
  ) THEN
    ALTER TABLE articles ADD COLUMN source_country text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'target_countries'
  ) THEN
    ALTER TABLE articles ADD COLUMN target_countries text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;

-- Backfill: source_country <- country cuando este vacio
UPDATE articles
SET source_country = country
WHERE (source_country IS NULL OR source_country = '')
  AND country IS NOT NULL
  AND country <> '';

-- Indices para filtrado por edicion
CREATE INDEX IF NOT EXISTS articles_distribution_scope_idx ON articles(distribution_scope);
CREATE INDEX IF NOT EXISTS articles_source_country_idx ON articles(source_country);
CREATE INDEX IF NOT EXISTS articles_target_countries_gin_idx ON articles USING GIN (target_countries);
