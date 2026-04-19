import { useEffect, useState } from 'react';
import { Trophy, Flame, Star, TrendingUp } from 'lucide-react';
import { supabase, WorldCupMatch, WorldCupNews } from '../lib/supabase';

export default function WorldCupColumn() {
  const [scores, setScores] = useState<WorldCupMatch[]>([]);
  const [news, setNews] = useState<WorldCupNews[]>([]);

  useEffect(() => {
    supabase
      .from('world_cup_matches')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => { if (data) setScores(data); });

    supabase
      .from('world_cup_news')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => { if (data) setNews(data); });
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '2px solid #e65c00' }}>
        <Trophy size={16} style={{ color: '#e65c00' }} />
        <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>MUNDIAL 2026: LA COBERTURA QUE MERECES</span>
        <span className="exclusive-badge blink text-xs">EN VIVO</span>
      </div>

      <div className="mb-5 px-3 py-2 flex items-center gap-3 flex-wrap" style={{ background: '#0d1a00', border: '1px solid #2a4a00' }}>
        <span className="font-oswald font-700 text-xs uppercase tracking-widest" style={{ color: '#7acc00' }}>SEDES:</span>
        {['🇺🇸 USA', '🇨🇦 CANADA', '🇲🇽 MEXICO'].map(s => (
          <span key={s} className="font-oswald text-xs" style={{ color: '#aaa' }}>{s}</span>
        ))}
        <span className="ml-auto font-oswald text-xs blink-slow" style={{ color: '#7acc00' }}>48 EQUIPOS · 104 PARTIDOS · MAXIMA TENSION</span>
      </div>

      <div className="mb-6 p-3" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center gap-2 mb-3">
          <Flame size={12} style={{ color: '#ff6600' }} />
          <span className="font-oswald text-xs uppercase tracking-widest" style={{ color: '#888' }}>Marcadores en tiempo real</span>
          <TrendingUp size={12} style={{ color: '#cc0000' }} className="blink" />
        </div>
        <div className="flex flex-col gap-2">
          {scores.map((s) => (
            <div key={s.id} className="flex items-center gap-2 py-2" style={{ borderBottom: '1px solid #1a1a1a' }}>
              <span className="font-oswald font-700 flex-1 text-right text-xs uppercase" style={{ maxWidth: 130, color: '#e0e0e0' }}>
                {s.team1}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="font-anton" style={{ fontSize: '1.1rem', lineHeight: 1, color: '#fff' }}>{s.score1}</span>
                <span
                  className="font-oswald text-xs px-1.5 py-0.5 font-700"
                  style={{
                    background: s.status === 'EN JUEGO' ? '#cc0000' : s.status === 'FINALIZADO' ? '#333' : '#1a4a00',
                    color: 'white',
                    fontSize: '0.55rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {s.status === 'EN JUEGO' ? s.minute : s.status}
                </span>
                <span className="font-anton" style={{ fontSize: '1.1rem', lineHeight: 1, color: '#fff' }}>{s.score2}</span>
              </div>
              <span className="font-oswald font-700 flex-1 text-left text-xs uppercase" style={{ maxWidth: 130, color: '#e0e0e0' }}>
                {s.team2}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {news.map((item) => (
          <div key={item.id} className="news-card cursor-pointer group">
            <div className="relative overflow-hidden" style={{ height: 160 }}>
              <img
                src={item.image_url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
              />
              <span
                className="absolute top-2 left-2 font-oswald font-700 text-white text-xs uppercase px-2 py-1"
                style={{ background: item.kicker_color, letterSpacing: '0.08em', fontSize: '0.6rem' }}
              >
                {item.badge}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span
                  className="font-oswald font-700 uppercase text-xs"
                  style={{ color: item.kicker_color, letterSpacing: '0.08em', fontSize: '0.6rem' }}
                >
                  {item.kicker}
                </span>
              </div>
            </div>
            <div className="pt-3">
              <h3 className="font-anton leading-tight text-base group-hover:text-orange-400 transition-colors mb-2" style={{ color: '#f0f0f0' }}>
                {item.title}
              </h3>
              <p className="font-oswald text-xs leading-relaxed" style={{ color: '#aaa' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 flex items-center gap-3" style={{ background: '#111', border: '1px solid #e65c00' }}>
        <Star size={14} style={{ color: '#e65c00' }} />
        <div>
          <p className="font-oswald font-700 text-xs uppercase tracking-wider" style={{ color: '#e0e0e0' }}>PRONOSTICO OFICIAL</p>
          <p className="font-oswald text-xs mt-0.5" style={{ color: '#aaa' }}>
            "Va a ganar quien meta mas goles." — Nuestro analista deportivo, ex empleado de Slack.
          </p>
        </div>
      </div>
    </section>
  );
}
