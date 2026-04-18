import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CountdownWidget() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mb-6 p-4 scanline-overlay" style={{ background: '#0d0d0d', border: '1px solid #e65c00' }}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={14} style={{ color: '#ff6600' }} className="blink" />
        <span className="font-oswald font-700 uppercase text-xs tracking-widest" style={{ color: '#ff6600' }}>
          CUENTA REGRESIVA
        </span>
        <AlertTriangle size={14} style={{ color: '#ff6600' }} className="blink" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="countdown-digit">{pad(time.h)}</div>
        <span className="font-anton text-2xl" style={{ color: '#ff6600' }}>:</span>
        <div className="countdown-digit">{pad(time.m)}</div>
        <span className="font-anton text-2xl" style={{ color: '#ff6600' }}>:</span>
        <div className="countdown-digit">{pad(time.s)}</div>
      </div>
      <p className="font-oswald text-gray-400 text-xs leading-tight uppercase tracking-wide">
        Tiempo restante para que ocurra algo.<br />
        <span style={{ color: '#ff6600' }}>No sabemos el que.</span>
      </p>
    </div>
  );
}
