/*
 * Badge visual que muestra el alcance editorial de un articulo:
 *  - GLOBAL (rojo) cuando distribution_scope === 'global'
 *  - LOCAL (azul/verde) cuando distribution_scope === 'local'
 *
 * Ademas, si hay source_country o target_countries, se renderizan como chips
 * pequenios para que el preview deje claro como funciona el ruteo multi-pais
 * antes de conectar n8n.
 */

import { EditorialArticleLike } from '../lib/editorial';

interface Props {
  article: EditorialArticleLike;
  compact?: boolean;
}

const FLAG_BY_COUNTRY: Record<string, string> = {
  AR: '🇦🇷', MX: '🇲🇽', ES: '🇪🇸', CO: '🇨🇴', CL: '🇨🇱',
  PE: '🇵🇪', VE: '🇻🇪', US: '🇺🇸', CA: '🌎', WORLD: '🌐',
};

export default function ScopeBadge({ article, compact = false }: Props) {
  const scope = (article.distribution_scope || 'local').toLowerCase();
  const source = (article.source_country || article.country || '').toUpperCase();
  const targets = (article.target_countries ?? []).map(c => c.toUpperCase());
  const isGlobal = scope === 'global';

  const scopeBg = isGlobal ? '#cc0000' : '#1f6feb';
  const fontSize = compact ? '0.55rem' : '0.6rem';
  const padY = compact ? '1px' : '2px';

  return (
    <div className="flex items-center gap-1 flex-wrap font-oswald uppercase" style={{ letterSpacing: '0.06em' }}>
      <span
        style={{
          background: scopeBg,
          color: '#fff',
          fontWeight: 700,
          fontSize,
          padding: `${padY} 6px`,
          lineHeight: 1.4,
        }}
      >
        {isGlobal ? 'GLOBAL' : 'LOCAL'}
      </span>
      {source && source !== 'WORLD' && (
        <span
          style={{
            background: '#0f0f0f',
            color: '#e0e0e0',
            border: '1px solid #2a2a2a',
            fontSize,
            padding: `${padY} 5px`,
            lineHeight: 1.4,
          }}
        >
          {FLAG_BY_COUNTRY[source] ?? ''} {source}
        </span>
      )}
      {isGlobal && targets.length > 0 && (
        <span
          style={{
            background: 'transparent',
            color: '#ff9966',
            border: '1px dashed #ff6600',
            fontSize,
            padding: `${padY} 5px`,
            lineHeight: 1.4,
          }}
          title={`Solo visible en: ${targets.join(', ')}`}
        >
          → {targets.join('/')}
        </span>
      )}
    </div>
  );
}
