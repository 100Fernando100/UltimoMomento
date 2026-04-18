import { AlertTriangle, Zap, Radio } from 'lucide-react';
import NewsTicker from './NewsTicker';

const navItems = ['POLITICA', 'ECONOMIA', 'ESCANDALO', 'ESPECTACULOS', 'VIRAL', 'CATASTROFES', 'OPINION'];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="border-b border-red-900" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)' }}>
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="pulse-red p-1.5 rounded">
              <AlertTriangle size={18} className="text-white" />
            </div>
            <div>
              <div className="font-anton text-3xl text-white tracking-tight leading-none">
                EL INFORMADOR
                <span style={{ color: '#cc0000' }}>TOTAL</span>
              </div>
              <div className="font-oswald text-xs tracking-widest text-gray-400 uppercase">
                La verdad duele. Nosotros la exageramos.
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-oswald text-gray-400 uppercase tracking-wider">
              <Radio size={12} style={{ color: '#cc0000' }} className="blink" />
              <span>En vivo: 4.2M en panico</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-oswald text-gray-400 uppercase tracking-wider">
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

      <nav className="border-b border-gray-900" style={{ background: '#111' }}>
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
          {navItems.map((item, i) => (
            <button
              key={item}
              className="font-oswald text-xs font-600 uppercase tracking-wider px-4 py-3 whitespace-nowrap transition-colors hover:bg-red-900/30 hover:text-red-400"
              style={{ color: i === 2 ? '#ff6600' : '#aaa' }}
            >
              {i === 2 && <span className="mr-1" style={{ color: '#ff6600' }}>*</span>}
              {item}
            </button>
          ))}
        </div>
      </nav>

      <NewsTicker />
    </header>
  );
}
