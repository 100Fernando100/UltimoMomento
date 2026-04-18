import { DollarSign, Shield } from 'lucide-react';

export default function EditorialBanner() {
  return (
    <div
      className="w-full px-4 py-3 flex items-center justify-center gap-4"
      style={{
        background: 'repeating-linear-gradient(45deg, #fffbea, #fffbea 10px, #fff8d6 10px, #fff8d6 20px)',
        borderTop: '2px solid #b8860b',
        borderBottom: '2px solid #b8860b',
      }}
    >
      <Shield size={14} style={{ color: '#b8860b' }} className="flex-shrink-0" />
      <p className="font-oswald text-center leading-tight" style={{ color: '#7a5c00', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
        <span className="font-700 uppercase tracking-widest" style={{ color: '#a07800' }}>AVISO DE TRANSPARENCIA EDITORIAL:</span>
        {' '}Si notas que dejamos de satirizar a alguien en particular, es porque nos esta pagando.
        {' '}<span style={{ color: '#b8860b' }}>Consideramos esto completamente etico.</span>
      </p>
      <DollarSign size={14} style={{ color: '#b8860b' }} className="flex-shrink-0 blink-slow" />
    </div>
  );
}
