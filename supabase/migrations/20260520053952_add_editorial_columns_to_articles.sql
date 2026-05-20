/*
  # Add editorial multi-country columns to articles

  Adds three columns needed by the editorial routing system:
  - distribution_scope: 'global' | 'local' — whether the article is shown to all editions or only its source country
  - source_country: the country code that produced the article (AR, MX, ES, CO, CL, WORLD, etc.)
  - target_countries: array of country codes for targeted global articles (empty = all countries)

  Existing rows default to distribution_scope='local' and source_country = their existing `country` value.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'distribution_scope'
  ) THEN
    ALTER TABLE articles ADD COLUMN distribution_scope text DEFAULT 'local';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'source_country'
  ) THEN
    ALTER TABLE articles ADD COLUMN source_country text DEFAULT NULL;
    UPDATE articles SET source_country = country WHERE source_country IS NULL AND country IS NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'target_countries'
  ) THEN
    ALTER TABLE articles ADD COLUMN target_countries text[] DEFAULT '{}';
  END IF;
END $$;
