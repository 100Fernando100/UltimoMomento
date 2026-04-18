import { AlertTriangle, Zap, Radio, DollarSign, Flame } from 'lucide-react';
import NewsTicker from './NewsTicker';

const navItems = ['POLITICA', 'ECONOMIA', 'ESCANDALO', 'ESPECTACULOS', 'MUNDIAL 2026', 'SEXO & ALGO MAS', 'VIRAL', 'CATASTROFES', 'OPINION'];

export default function Header() {
  return (
    <header className="sticky top-0 z-50" style={{ background: '#fff' }}>
      <div style={{ borderBottom: '3px solid #cc0000', background: '#fff' }}>
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="pulse-red p-1.5 rounded">
              <AlertTriangle size={18} className="text-white" />
            </div>
            <div>
              <div className="font-anton text-3xl tracking-tight leading-none" style={{ color: '#111' }}>
                EL INFORMADOR
                <span style={{ color: '#cc0000' }}>TOTAL</span>
              </div>
              <div className="font-oswald text-xs tracking-widest uppercase" style={{ color: '#888' }}>
                La verdad duele. Nosotros la exageramos.
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-oswald uppercase tracking-wider" style={{ color: '#888' }}>
              <Radio size={12} style={{ color: '#cc0000' }} className="blink" />
              <span>En vivo: 4.2M en panico</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-oswald uppercase tracking-wider" style={{ color: '#888' }}>
              <Zap size={12} style={{ color: '#ff6600' }} />
              <span>18 Abr 2026 — 23:59</span>
            </div>
            <button
              className="font-oswald font-700 text-sm uppercase tracking-wider text-white px-4 py-2 transition-all hover:scale-105"
              style={{ background: '#cc0000' }}
            >
              SUSCRIBIRSE O ASUMIR LA IGNORANCIA
            </button>
          </div>
        </div>
      </div>

      <nav style={{ background: '#1a1a1a', borderBottom: '1px solid #333' }}>
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
          {navItems.map((item, i) => {
            const isMundial = item === 'MUNDIAL 2026';
            const isSexo = item === 'SEXO & ALGO MAS';
            const isEscandalo = i === 2;
            const isPolitica = item === 'POLITICA';
            const isEconomia = item === 'ECONOMIA';
            return (
              <button
                key={item}
                className="font-oswald text-xs font-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap transition-colors hover:bg-red-900/30 hover:text-red-400 relative flex items-center gap-1"
                style={{ color: isEscandalo ? '#ff6600' : isMundial ? '#f0c040' : isSexo ? '#ff6699' : isPolitica ? '#4ade80' : '#ccc' }}
              >
                {isEscandalo && <span style={{ color: '#ff6600' }}>*</span>}
                {isPolitica && <DollarSign size={11} style={{ color: '#4ade80', flexShrink: 0 }} />}
                {isEconomia && <Flame size={11} style={{ color: '#ccc', flexShrink: 0 }} />}
                {isMundial && <span>⚽</span>}
                {isSexo && <span>🔥</span>}
                {item}
                {(isMundial || isSexo) && (
                  <span
                    className="absolute top-1.5 right-1 blink"
                    style={{ width: 5, height: 5, borderRadius: '50%', background: isMundial ? '#f0c040' : '#ff6699', display: 'inline-block' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <NewsTicker />
    </header>
  );
}
