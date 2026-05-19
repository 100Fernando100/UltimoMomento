import { Eye, MessageSquare, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCountry } from '../lib/useCountry';
import { Article, selectArticlesForCountry, supabaseConfigured } from '../lib/supabase';
import { filterArticlesForCountry } from '../lib/editorial';
import { MOCK_ARTICLES } from '../lib/mockArticles';
import ScopeBadge from './ScopeBadge';

function StoryCard({ story }: { story: Article }) {
  return (
    <div className="news-card cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={story.image_url}
          alt=""
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ height: story.size === 'large' ? 240 : 180 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 65%)' }}
        />
        <div className="absolute top-2 left-2">
          <ScopeBadge article={story} />
        </div>
      </div>
      <div className="pt-3 pb-2">
        <span className="exclusive-badge text-xs" style={{ background: story.kicker_color }}>
          {story.kicker}
        </span>
        <h3
          className="font-anton mt-2 leading-tight group-hover:text-red-400 transition-colors"
          style={{ fontSize: story.size === 'large' ? '1.25rem' : '1rem', color: '#f0f0f0' }}
        >
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-xs mt-2 leading-relaxed font-oswald" style={{ color: '#b0b0b0' }}>{story.excerpt}</p>
        )}
        <div className="flex items-center gap-4 mt-3 font-oswald uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em', color: '#888' }}>
          <span className="flex items-center gap-1">
            <Clock size={10} style={{ color: '#cc0000' }} />
            {new Date(story.published_at).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={10} style={{ color: '#ff6600' }} />
            {story.views}
          </span>
          {story.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare size={10} />
              {story.comments.toLocaleString()} en crisis
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SmallStoryCard({ story }: { story: Article }) {
  return (
    <div className="news-card flex gap-3 py-3 cursor-pointer group" style={{ borderBottom: '1px solid #2a2a32' }}>
      <div className="flex-shrink-0 relative overflow-hidden" style={{ width: 90, height: 70 }}>
        <img
          src={story.image_url}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className="absolute bottom-0 left-0 font-oswald font-700 text-white uppercase px-1"
          style={{ fontSize: '0.55rem', background: story.kicker_color, letterSpacing: '0.05em' }}
        >
          {story.kicker}
        </span>
      </div>
      <div className="flex-1">
        <div className="mb-1"><ScopeBadge article={story} compact /></div>
        <h4 className="font-oswald font-600 text-xs leading-tight group-hover:text-red-400 transition-colors" style={{ fontSize: '0.78rem', lineHeight: 1.3, color: '#e0e0e0' }}>
          {story.title}
        </h4>
        <div className="flex items-center gap-3 mt-2 font-oswald" style={{ fontSize: '0.6rem', color: '#777' }}>
          <span className="flex items-center gap-1"><Clock size={8} />{new Date(story.published_at).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="flex items-center gap-1"><Eye size={8} style={{ color: '#ff6600' }} />{story.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function NewsGrid() {
  const { country } = useCountry();
  const [articles, setArticles] = useState<Article[]>(() => filterArticlesForCountry(MOCK_ARTICLES, country));
  const [usingFallback, setUsingFallback] = useState<boolean>(!supabaseConfigured);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!supabaseConfigured) {
        setArticles(filterArticlesForCountry(MOCK_ARTICLES, country));
        setUsingFallback(true);
        return;
      }
      const data = await selectArticlesForCountry(country, { limit: 50 });
      if (cancelled) return;
      if (data && data.length > 0) {
        setArticles(data);
        setUsingFallback(false);
      } else {
        // Fallback no destructivo si no hay datos en DB o falla la query.
        setArticles(filterArticlesForCountry(MOCK_ARTICLES, country));
        setUsingFallback(true);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [country]);

  // Asegura tener placeholders aunque la lista venga corta.
  const featured = articles.filter(a => a.size === 'large').concat(
    articles.filter(a => a.size !== 'large'),
  );
  const featuredArticles = featured.slice(0, 3);
  const secondaryArticles = featured.slice(3, 7);

  if (featuredArticles.length === 0) {
    return (
      <div className="p-6 text-center font-oswald" style={{ color: '#888' }}>
        No hay noticias para esta edicion todavia.
      </div>
    );
  }

  const globalCount = articles.filter(a => (a.distribution_scope || 'local').toLowerCase() === 'global').length;
  const localCount = articles.length - globalCount;

  return (
    <div className="flex flex-col gap-8">
      {usingFallback && (
        <div className="px-3 py-2 font-oswald text-xs uppercase tracking-wider flex flex-wrap items-center gap-3" style={{ background: '#23232a', color: '#cfcfd6', borderLeft: '3px solid #cc0000' }}>
          <span>Modo demo · edicion <span style={{ color: '#fff', fontWeight: 700 }}>{country}</span></span>
          <span style={{ background: '#cc0000', color: '#fff', padding: '1px 6px', fontWeight: 700 }}>GLOBAL × {globalCount}</span>
          <span style={{ background: '#1f6feb', color: '#fff', padding: '1px 6px', fontWeight: 700 }}>LOCAL × {localCount}</span>
          <span style={{ color: '#666' }}>Datos de ejemplo · temas reales, redaccion satirica</span>
        </div>
      )}
      <div id="seccion-politica">
        <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
          <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>TRAGEDIAS DESTACADAS</span>
          <span className="breaking-badge blink text-xs">NUEVO</span>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <StoryCard story={featuredArticles[0]} />
          </div>
          {featuredArticles[1] && (
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              <StoryCard story={featuredArticles[1]} />
            </div>
          )}
          {featuredArticles[2] && (
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              <StoryCard story={featuredArticles[2]} />
            </div>
          )}
        </div>
      </div>

      {secondaryArticles.length > 0 && (
        <div id="seccion-catastrofes">
          <div
            className="flex items-center justify-between mb-4 pb-3"
            style={{ borderBottom: '2px solid #e65c00' }}
          >
            <div className="flex items-center gap-3">
              <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>MAS CATASTROFES</span>
              <span className="exclusive-badge text-xs">HOY</span>
            </div>
            <button className="font-oswald text-xs uppercase tracking-wider transition-colors hover:text-red-400" style={{ color: '#777' }}>
              Ver todas las desgracias
            </button>
          </div>
          <div className="flex flex-col">
            {secondaryArticles.map((story) => (
              <SmallStoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}

      <div className="p-4" style={{ background: '#1d1d22', border: '2px solid #cc0000' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="breaking-badge pulse-red text-xs">EXCLUSIVO</span>
          <span className="font-oswald text-xs uppercase tracking-wider" style={{ color: '#888' }}>Investigacion especial de 18 meses</span>
        </div>
        <h3 className="font-anton text-xl leading-tight mb-2" style={{ color: '#f0f0f0' }}>
          EL INFORME QUE LOS PODEROSOS NO QUIEREN QUE LEAS:
          <span style={{ color: '#ff6600' }}> POR QUE EL CAFE DE LA OFICINA SIEMPRE ESTA VACIO CUANDO MAS LO NECESITAS</span>
        </h3>
        <p className="font-oswald text-xs leading-relaxed mb-3" style={{ color: '#b0b0b0' }}>
          Tras 18 meses de investigacion periodistica de alto riesgo, nuestro equipo descubrio que existe
          un patron sistematico e imperdonable. Los datos son devastadores.
        </p>
        <button
          className="font-oswald font-700 text-sm uppercase tracking-wider text-white px-6 py-2 transition-all hover:opacity-80"
          style={{ background: '#cc0000' }}
        >
          LEER EL INFORME COMPLETO (si te atreves)
        </button>
      </div>
    </div>
  );
}
