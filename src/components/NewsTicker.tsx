import { useEffect, useState } from 'react';
import { supabase, TickerItem } from '../lib/supabase';

const fallbackItems = [
  'ULTIMO MOMENTO: Alguien en marketing uso la palabra "sinergia" de forma no ironica y fue elogiado por ello',
  'ALERTA MAXIMA: El cafe de la oficina se acabo y nadie compro mas. Fuentes confirman "situacion insostenible"',
  'BREAKING: Influencer publica foto comiendo ensalada. Expertos advierten: "esto no refleja la realidad"',
];

export default function NewsTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    supabase
      .from('ticker_items')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setItems(data);
      });
  }, []);

  const texts = items.length > 0 ? items.map(i => i.text) : fallbackItems;
  const fullText = texts.join('   |||   ');

  return (
    <div className="bg-black border-b border-red-900 flex items-stretch overflow-hidden" style={{ height: '36px' }}>
      <div className="pulse-red flex-shrink-0 flex items-center px-4 z-10" style={{ minWidth: '160px' }}>
        <span className="font-oswald font-700 text-white text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'inline-block' }}></span>
          ULTIMO MOMENTO
        </span>
      </div>
      <div className="flex-1 overflow-hidden relative flex items-center bg-black">
        <div
          className="ticker-text font-oswald text-sm text-gray-200"
          style={{ animationDuration: '45s' }}
        >
          {fullText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fullText}
        </div>
      </div>
    </div>
  );
}
