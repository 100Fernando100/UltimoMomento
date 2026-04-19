import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase, Article } from '../lib/supabase';

export default function SidebarOfShame() {
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('active', true)
      .eq('section', 'sidebar')
      .order('sort_order')
      .then(({ data }) => { if (data) setItems(data); });
  }, []);

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
          {items.map((item) => (
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
