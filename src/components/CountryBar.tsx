import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const countries = [
  { name: 'América', domain: 'america', flag: '🌎' },
  { name: 'Argentina', domain: 'ar', flag: '🇦🇷' },
  { name: 'Colombia', domain: 'co', flag: '🇨🇴' },
  { name: 'España', domain: 'es', flag: '🇪🇸' },
  { name: 'México', domain: 'mx', flag: '🇲🇽' },
  { name: 'Perú', domain: 'pe', flag: '🇵🇪' },
  { name: 'Venezuela', domain: 've', flag: '🇻🇪' },
  { name: 'Chile', domain: 'cl', flag: '🇨🇱' },
  { name: 'Centroamérica', domain: 'ca', flag: '🌎' },
  { name: 'Estados Unidos', domain: 'us', flag: '🇺🇸' },
  { name: 'Mundo', domain: 'world', flag: '🌐' },
];

function getDomainLabel(domain: string) {
  if (domain === 'america') return 'rompenoticias.com/america';
  if (domain === 'world') return 'rompenoticias.com/mundo';
  return `rompenoticias.com/${domain}`;
}

function getCountryUrl(domain: string) {
  if (domain === 'world') return 'https://rompenoticias.com/mundo';
  return `https://rompenoticias.com/${domain}`;
}

export default function CountryBar() {
  const [active, setActive] = useState('america');
  const [showAll, setShowAll] = useState(false);

  const visibleCountries = showAll ? countries : countries.slice(0, 9);

  return (
    <div style={{ background: '#050505', borderBottom: '1px solid #1a1a1a' }}>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-1.5 flex-shrink-0 pr-4 mr-3" style={{ borderRight: '1px solid #222' }}>
            <Globe size={11} style={{ color: '#cc0000' }} />
            <span className="font-oswald text-xs uppercase tracking-widest" style={{ color: '#666', fontSize: '0.6rem' }}>
              EDICION
            </span>
          </div>

          {visibleCountries.map(country => (
            <a
              key={country.domain}
              href={getCountryUrl(country.domain)}
              onClick={(e) => { e.preventDefault(); setActive(country.domain); }}
              className="flex items-center gap-1.5 px-3 py-2.5 flex-shrink-0 transition-all no-underline"
              style={{
                borderBottom: active === country.domain ? '2px solid #cc0000' : '2px solid transparent',
                color: active === country.domain ? '#ffffff' : '#888',
                background: 'none',
                fontSize: '0.7rem',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: active === country.domain ? 700 : 400,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>{country.flag}</span>
              {country.name}
            </a>
          ))}

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1 px-3 py-2.5 flex-shrink-0 transition-all hover:opacity-80"
              style={{ color: '#666', fontSize: '0.65rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              <span>Mas</span>
              <ChevronDown size={10} />
            </button>
          )}

          <div className="ml-auto flex-shrink-0 pl-4 hidden md:flex items-center gap-2" style={{ borderLeft: '1px solid #222' }}>
            <span className="font-oswald text-xs" style={{ color: '#555', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Edicion activa:
            </span>
            <span className="font-oswald font-700 text-xs" style={{ color: '#cc0000', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              {getDomainLabel(active)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
