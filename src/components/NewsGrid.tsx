import { Eye, MessageSquare, Clock } from 'lucide-react';

const featuredStories = [
  {
    img: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
    kicker: 'INDIGNANTE',
    kickerColor: '#cc0000',
    title: 'GERENTE ENVIA WHATSAPP A LAS 11PM "CUANDO PUEDAS" Y PRETENDE QUE ES OPCIONAL',
    excerpt: 'Testigos confirman que el mensaje fue enviado con la notificacion activada y punto de exclamacion triple.',
    time: '8 min',
    views: '892K',
    comments: 2847,
    size: 'large',
  },
  {
    img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'EXCLUSIVO',
    kickerColor: '#e65c00',
    title: 'DESCUBREN QUE "OPORTUNIDAD DE CRECIMIENTO" EN OFERTA LABORAL SIGNIFICA TRABAJAR EL DOBLE SIN AUMENTO',
    excerpt: 'La investigacion de 18 meses revela patrones sistematicos de lo que expertos llaman "basura envuelta en papel de regalo".',
    time: '19 min',
    views: '1.1M',
    comments: 5621,
    size: 'medium',
  },
  {
    img: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    kicker: 'SHOCK',
    kickerColor: '#cc0000',
    title: 'EMPLEADO PIDE AUMENTO, RECIBE "FEEDBACK CONSTRUCTIVO" DE 45 MINUTOS',
    excerpt: 'El hombre, de 34 anos, salio de la reunion con mas responsabilidades y el mismo sueldo.',
    time: '33 min',
    views: '743K',
    comments: 9182,
    size: 'medium',
  },
];

const secondaryStories = [
  {
    img: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'VIRAL',
    kickerColor: '#ff6600',
    title: 'PERSONA DICE "NO TENGO DRAMA" Y TIENE TODO EL DRAMA DEL UNIVERSO',
    time: '1 h',
    views: '2.3M',
  },
  {
    img: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'URGENTE',
    kickerColor: '#cc0000',
    title: 'EMPRESA SIN PRESUPUESTO PARA SUELDOS ANUNCIA TEAM BUILDING EN MENDOZA',
    time: '2 h',
    views: '1.8M',
  },
  {
    img: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'EXCLUSIVO',
    kickerColor: '#e65c00',
    title: 'NUEVO ESTUDIO REVELA QUE EL OPEN OFFICE "COLABORATIVO" DESTRUYE LA PRODUCTIVIDAD Y EL ALMA',
    time: '3 h',
    views: '4.1M',
  },
  {
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'CRISIS',
    kickerColor: '#cc0000',
    title: 'RRHH ORGANIZA TALLER DE MINDFULNESS MIENTRAS HACE DESPIDOS MASIVOS POR EMAIL',
    time: '4 h',
    views: '990K',
  },
  {
    img: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'INDIGNANTE',
    kickerColor: '#cc0000',
    title: 'STARTUP UNICORNIO PIDE "PASION POR EL IMPACTO" A CAMBIO DE UN 30% MENOS DEL SUELDO DE MERCADO',
    time: '5 h',
    views: '1.5M',
  },
  {
    img: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'VIRAL',
    kickerColor: '#ff6600',
    title: 'CONFERENCIA DE 3 DIAS EN CANCUN SOBRE "EFICIENCIA OPERATIVA" CUESTA MAS QUE 5 SUELDOS ANUALES',
    time: '6 h',
    views: '2.7M',
  },
];

function StoryCard({ story }: { story: typeof featuredStories[0] }) {
  return (
    <div className="news-card cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={story.img}
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
        <span
          className="exclusive-badge text-xs"
          style={{ background: story.kickerColor }}
        >
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
            {story.time}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={10} style={{ color: '#ff6600' }} />
            {story.views}
          </span>
          {story.comments && (
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

function SmallStoryCard({ story }: { story: typeof secondaryStories[0] }) {
  return (
    <div className="news-card flex gap-3 py-3 cursor-pointer group" style={{ borderBottom: '1px solid #1a1a1a' }}>
      <div className="flex-shrink-0 relative overflow-hidden" style={{ width: 90, height: 70 }}>
        <img
          src={story.img}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className="absolute bottom-0 left-0 font-oswald font-700 text-white uppercase px-1"
          style={{ fontSize: '0.55rem', background: story.kickerColor, letterSpacing: '0.05em' }}
        >
          {story.kicker}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-oswald font-600 text-xs leading-tight group-hover:text-red-400 transition-colors" style={{ fontSize: '0.78rem', lineHeight: 1.3, color: '#e0e0e0' }}>
          {story.title}
        </h4>
        <div className="flex items-center gap-3 mt-2 font-oswald" style={{ fontSize: '0.6rem', color: '#777' }}>
          <span className="flex items-center gap-1"><Clock size={8} />{story.time}</span>
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
            <StoryCard story={featuredStories[0]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '1' }}>
            <StoryCard story={featuredStories[1]} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '2' }}>
            <StoryCard story={featuredStories[2]} />
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
          {secondaryStories.map((story, i) => (
            <SmallStoryCard key={i} story={story} />
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
