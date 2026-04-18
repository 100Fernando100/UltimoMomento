import { ChevronRight } from 'lucide-react';

const sidebarItems = [
  {
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'ESCANDALO',
    badgeColor: '#cc0000',
    title: 'El CEO que prometio "somos una familia" visto comprando su tercer yate en Puerto Madero de forma extremadamente sospechosa',
    time: '12 min',
  },
  {
    img: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'VIRAL',
    badgeColor: '#ff6600',
    title: 'Mujer come ensalada en la foto de perfil de LinkedIn y los "expertos en cultura organizacional" NO pueden creerlo',
    time: '23 min',
  },
  {
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'INDIGNANTE',
    badgeColor: '#cc0000',
    title: 'Reunion de equipo de 90 minutos que LITERALMENTE era un correo electronico. Los sobrevivientes hablan por primera vez',
    time: '31 min',
  },
  {
    img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'EXCLUSIVO',
    badgeColor: '#e65c00',
    title: 'Influencer publica foto en Paris pero los metadatos revelan que estaba en Quilmes. Expertos: "esto cambia todo"',
    time: '45 min',
  },
  {
    img: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'CRISIS',
    badgeColor: '#cc0000',
    title: 'Startup unicornio anuncia 300 despidos por "reestructuracion estrategica" tres semanas despues de party de fin de ano de $500K',
    time: '1 h',
  },
  {
    img: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'VIRAL',
    badgeColor: '#ff6600',
    title: 'Hombre pide "feedback honesto" en LinkedIn y recibe exactamente eso. Hospitalizacion fue "inesperada"',
    time: '2 h',
  },
  {
    img: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'URGENTE',
    badgeColor: '#cc0000',
    title: 'Empresa ofrece "cultura increible" y "snacks ilimitados" como compensacion por sueldo un 40% por debajo del mercado',
    time: '3 h',
  },
  {
    img: 'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'SHOCK',
    badgeColor: '#cc0000',
    title: 'Persona usa "a nivel" correctamente en oracion y el departamento de RRHH no sabe como procesarlo',
    time: '4 h',
  },
  {
    img: 'https://images.pexels.com/photos/3760137/pexels-photo-3760137.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'EXCLUSIVO',
    badgeColor: '#e65c00',
    title: 'Semaforo en rojo en Av. Corrientes dura 4 segundos mas de lo tolerable. Expertos piden renuncia del jefe de gobierno',
    time: '5 h',
  },
  {
    img: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'INDIGNANTE',
    badgeColor: '#cc0000',
    title: 'Persona en supermercado elige carrito con rueda rota por TERCERA vez consecutiva. Psicologos desconcertados',
    time: '6 h',
  },
];

export default function SidebarOfShame() {
  return (
    <aside className="w-full">
      <div className="sticky top-36">
        <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
          <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>
            LA COLUMNA DEL MORBO
          </span>
          <span className="exclusive-badge blink-slow text-xs">EN VIVO</span>
        </div>

        <div className="flex flex-col gap-0">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              className="sidebar-item flex gap-3 py-3 cursor-pointer"
              style={{ borderBottom: '1px solid #1a1a1a' }}
            >
              <div className="flex-shrink-0 relative" style={{ width: 80, height: 64 }}>
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
                <span
                  className="absolute bottom-0 left-0 font-oswald font-700 text-white uppercase px-1"
                  style={{ fontSize: '0.55rem', background: item.badgeColor, letterSpacing: '0.05em' }}
                >
                  {item.badge}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="sidebar-title font-oswald text-xs leading-tight transition-colors"
                  style={{ color: '#d8d8d8', fontSize: '0.72rem', lineHeight: '1.3' }}
                >
                  {item.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-oswald" style={{ fontSize: '0.6rem', color: '#aaa' }}>Hace {item.time}</span>
                  <ChevronRight size={8} style={{ color: '#aaa' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 mt-2 font-oswald font-700 text-sm uppercase tracking-wider transition-all hover:opacity-80" style={{ background: '#1a1a1a', border: '1px solid #333', color: '#e0e0e0' }}>
          CARGAR MAS TRAGEDIAS
        </button>
      </div>
    </aside>
  );
}
