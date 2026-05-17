import { ChevronRight } from 'lucide-react';

interface SidebarItem {
  id: string;
  title: string;
  image_url: string;
  kicker: string;
  kicker_color: string;
  published_at: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: '1',
    title: 'VECINO SUBE FOTO DE SU DESAYUNO Y CONSIGUE 3 LIKES: DOS SON SUYOS',
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'MORBO',
    kicker_color: '#cc0000',
    published_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '2',
    title: 'JEFE DICE "TENEMOS QUE HABLAR" Y RESULTA QUE SOLO QUERIA CAFE',
    image_url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'LABORAL',
    kicker_color: '#e65c00',
    published_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'HOMBRE ORDENA HABITACION ANTES DE LLAMADA DE VIDEO Y LA VUELCA TODO DESPUES',
    image_url: 'https://images.pexels.com/photos/1457912/pexels-photo-1457912.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'ESCANDALO',
    kicker_color: '#cc0000',
    published_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    title: 'PERSONA PONE "MUSICA PARA CONCENTRARSE" Y LLEVA 3 HORAS BAILANDO',
    image_url: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'CULTURA',
    kicker_color: '#7acc00',
    published_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: '5',
    title: 'MUJER ABRE TWITTER "SOLO UN MINUTO" Y EMERGE 4 HORAS DESPUES',
    image_url: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'TECNOLOGIA',
    kicker_color: '#cc0000',
    published_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: '6',
    title: 'HOMBRE COMPRA FRUTA SANA Y LA VE PODRIR CON DIGNIDAD EN EL FRUTERO',
    image_url: 'https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=300',
    kicker: 'SALUD',
    kicker_color: '#e65c00',
    published_at: new Date(Date.now() - 18000000).toISOString(),
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
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className="sidebar-item flex gap-3 py-3 cursor-pointer"
              style={{ borderBottom: '1px solid #1a1a1a' }}
            >
              <div className="flex-shrink-0 relative" style={{ width: 80, height: 64 }}>
                <img
                  src={item.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
                <span
                  className="absolute bottom-0 left-0 font-oswald font-700 text-white uppercase px-1"
                  style={{ fontSize: '0.55rem', background: item.kicker_color, letterSpacing: '0.05em' }}
                >
                  {item.kicker}
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
                  <span className="font-oswald" style={{ fontSize: '0.6rem', color: '#aaa' }}>
                    Hace {new Date(item.published_at).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                  </span>
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
