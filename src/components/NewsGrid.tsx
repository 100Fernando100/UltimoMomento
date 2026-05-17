import { Eye, MessageSquare, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  kicker: string;
  kicker_color: string;
  size: 'large' | 'small';
  views: string;
  comments: number;
  published_at: string;
}

const featuredArticles: Article[] = [
  {
    id: '1',
    title: 'HOMBRE DESCUBRE QUE LLEVAR PARAGUAS GARANTIZA QUE NO LLUEVE: METEOROLOGOS ATERRADOS',
    excerpt: 'El fenomeno, conocido en la ciencia como "efecto paraguas", ha desafiado todos los modelos climaticos conocidos. La ONU convoca reunion de emergencia.',
    image_url: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800',
    kicker: 'CIENCIA',
    kicker_color: '#cc0000',
    size: 'large',
    views: '3.2M',
    comments: 847,
    published_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'EXPERTOS CONFIRMAN QUE EL BOTON "CERRAR PUERTAS" DEL ASCENSOR NO HACE NADA',
    excerpt: 'Estudio de 20 años revela que solo existe para dar la ilusion de control. Los fabricantes se niegan a comentar.',
    image_url: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800',
    kicker: 'INVESTIGACION',
    kicker_color: '#e65c00',
    size: 'small',
    views: '1.8M',
    comments: 412,
    published_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '3',
    title: 'MUJER DICE "LLEGARE EN 5 MINUTOS" POR VIGESIMA VEZ CONSECUTIVA',
    excerpt: 'Testigos reportan que los 5 minutos llevan acumulando desde el martes. Familiares piden una investigacion.',
    image_url: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800',
    kicker: 'SOCIEDAD',
    kicker_color: '#cc0000',
    size: 'small',
    views: '2.1M',
    comments: 633,
    published_at: new Date(Date.now() - 10800000).toISOString(),
  },
];

const secondaryArticles: Article[] = [
  {
    id: '4',
    title: 'HOMBRE PONE ALARMA A LAS 6AM "PARA MADRUGAR" Y LA APAGA 11 VECES SIN REMORDIMIENTO',
    excerpt: '',
    image_url: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'TRAGEDIA',
    kicker_color: '#cc0000',
    size: 'small',
    views: '980K',
    comments: 289,
    published_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: '5',
    title: 'REUNION QUE PODRIA HABER SIDO UN EMAIL DURA 3 HORAS: HAY HERIDOS',
    excerpt: '',
    image_url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'LABORAL',
    kicker_color: '#e65c00',
    size: 'small',
    views: '1.4M',
    comments: 521,
    published_at: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: '6',
    title: 'PERSONA DICE "NO TENGO HAMBRE" Y DEVORA TODA LA NEVERA A LAS 2AM',
    excerpt: '',
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'SALUD',
    kicker_color: '#7acc00',
    size: 'small',
    views: '760K',
    comments: 198,
    published_at: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: '7',
    title: 'HOMBRE ABRE NETFLIX A LAS 10PM Y PASA 2 HORAS BUSCANDO QUE VER SIN ENCONTRAR NADA',
    excerpt: '',
    image_url: 'https://images.pexels.com/photos/1457912/pexels-photo-1457912.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'CULTURA',
    kicker_color: '#cc0000',
    size: 'small',
    views: '2.3M',
    comments: 874,
    published_at: new Date(Date.now() - 25200000).toISOString(),
  },
];

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
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
        />
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
    <div className="news-card flex gap-3 py-3 cursor-pointer group" style={{ borderBottom: '1px solid #1a1a1a' }}>
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
  return (
    <div className="flex flex-col gap-8">
      <div id="seccion-politica">
        <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
          <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>TRAGEDIAS DESTACADAS</span>
          <span className="breaking-badge blink text-xs">NUEVO</span>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <StoryCard story={featuredArticles[0]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '1' }}>
            <StoryCard story={featuredArticles[1]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '2' }}>
            <StoryCard story={featuredArticles[2]} />
          </div>
        </div>
      </div>

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

      <div className="p-4" style={{ background: '#111', border: '2px solid #cc0000' }}>
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
