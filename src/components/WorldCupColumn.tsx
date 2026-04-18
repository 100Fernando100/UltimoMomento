import { Trophy, Flame, Star, TrendingUp } from 'lucide-react';

const worldCupNews = [
  {
    flag: '🏆',
    kicker: 'ESCANDALO DEPORTIVO',
    kickerColor: '#cc0000',
    title: 'MUNDIAL 2026: TECNICO PROMETE "JUGAMOS PARA EL ESPECTACULO" Y SU EQUIPO EMPATA 0-0 EN 90 MINUTOS DE PURA CONTEMPLACION',
    img: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=400',
    detail: 'El partido fue calificado por expertos como "arte conceptual" y por los hinchas como "una estafa con silbato".',
    badge: 'GRUPO A',
  },
  {
    flag: '⚽',
    kicker: 'BREAKING FUTBOL',
    kickerColor: '#e65c00',
    title: 'ESTRELLA DEL MUNDIAL 2026 LLORA EN CONFERENCIA Y MARCA DE ROPA DEPORTIVA LANZA COLECCION ESPECIAL EN 48 HORAS',
    img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400',
    detail: 'La remera "Lagrimas de Campeon" ya agoto stock en 14 paises.',
    badge: 'SEMIFINAL',
  },
  {
    flag: '📺',
    kicker: 'TV & MUNDIAL',
    kickerColor: '#cc0000',
    title: 'COMENTARISTA DICE "ES UN PARTIDO DE DOS TIEMPOS" Y GANA PREMIO AL ANALISIS MAS PROFUNDO DEL TORNEO',
    img: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400',
    detail: 'Colegas lo elogiaron por "no tener miedo de decir lo que todos pensaban pero nadie se atrevia".',
    badge: 'OPINION',
  },
];

const liveScores = [
  { team1: 'ARGENTINA', score1: 3, team2: 'EL SENTIDO COMUN', score2: 0, status: 'EN JUEGO', min: "87'" },
  { team1: 'BRASIL', score1: 1, team2: 'SUS PROPIAS EXPECTATIVAS', score2: 2, status: 'FINALIZADO', min: "FT" },
  { team1: 'ESPANA', score1: 0, team2: 'UNA EXPLICACION CONVINCENTE', score2: 0, status: 'PRONTO', min: "20:00" },
];

export default function WorldCupColumn() {
  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '2px solid #e65c00' }}>
        <Trophy size={16} style={{ color: '#e65c00' }} />
        <span className="font-oswald font-700 text-white uppercase tracking-wider text-sm">MUNDIAL 2026: LA COBERTURA QUE MERECES</span>
        <span className="exclusive-badge blink text-xs">EN VIVO</span>
      </div>

      <div className="mb-5 px-3 py-2 flex items-center gap-3 flex-wrap" style={{ background: '#0d1a00', border: '1px solid #2a4a00' }}>
        <span className="font-oswald font-700 text-xs uppercase tracking-widest" style={{ color: '#7acc00' }}>SEDES:</span>
        {['🇺🇸 USA', '🇨🇦 CANADA', '🇲🇽 MEXICO'].map(s => (
          <span key={s} className="font-oswald text-xs text-gray-400">{s}</span>
        ))}
        <span className="ml-auto font-oswald text-xs blink-slow" style={{ color: '#7acc00' }}>48 EQUIPOS · 104 PARTIDOS · MAXIMA TENSION</span>
      </div>

      <div className="mb-6 p-3" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
        <div className="flex items-center gap-2 mb-3">
          <Flame size={12} style={{ color: '#ff6600' }} />
          <span className="font-oswald text-xs uppercase tracking-widest text-gray-400">Marcadores en tiempo real</span>
          <TrendingUp size={12} style={{ color: '#cc0000' }} className="blink" />
        </div>
        <div className="flex flex-col gap-2">
          {liveScores.map((s, i) => (
            <div key={i} className="flex items-center gap-2 py-2" style={{ borderBottom: '1px solid #1a1a1a' }}>
              <span
                className="font-oswald font-700 text-white flex-1 text-right text-xs uppercase"
                style={{ maxWidth: 130 }}
              >
                {s.team1}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="font-anton text-white" style={{ fontSize: '1.1rem', lineHeight: 1 }}>{s.score1}</span>
                <span
                  className="font-oswald text-xs px-1.5 py-0.5 font-700"
                  style={{
                    background: s.status === 'EN JUEGO' ? '#cc0000' : s.status === 'FINALIZADO' ? '#333' : '#1a4a00',
                    color: 'white',
                    fontSize: '0.55rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {s.status === 'EN JUEGO' ? s.min : s.status}
                </span>
                <span className="font-anton text-white" style={{ fontSize: '1.1rem', lineHeight: 1 }}>{s.score2}</span>
              </div>
              <span className="font-oswald font-700 text-white flex-1 text-left text-xs uppercase" style={{ maxWidth: 130 }}>
                {s.team2}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {worldCupNews.map((item, i) => (
          <div key={i} className="news-card cursor-pointer group">
            <div className="relative overflow-hidden" style={{ height: 160 }}>
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
              />
              <span
                className="absolute top-2 left-2 font-oswald font-700 text-white text-xs uppercase px-2 py-1"
                style={{ background: item.kickerColor, letterSpacing: '0.08em', fontSize: '0.6rem' }}
              >
                {item.badge}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span
                  className="font-oswald font-700 uppercase text-xs"
                  style={{ color: item.kickerColor, letterSpacing: '0.08em', fontSize: '0.6rem' }}
                >
                  {item.kicker}
                </span>
              </div>
            </div>
            <div className="pt-3">
              <h3 className="font-anton text-white leading-tight text-base group-hover:text-orange-400 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="font-oswald text-gray-500 text-xs leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 flex items-center gap-3" style={{ background: '#111', border: '1px solid #e65c00' }}>
        <Star size={14} style={{ color: '#e65c00' }} />
        <div>
          <p className="font-oswald font-700 text-white text-xs uppercase tracking-wider">PRONOSTICO OFICIAL</p>
          <p className="font-oswald text-gray-400 text-xs mt-0.5">
            "Va a ganar quien meta mas goles." — Nuestro analista deportivo, ex empleado de Slack.
          </p>
        </div>
      </div>
    </section>
  );
}
