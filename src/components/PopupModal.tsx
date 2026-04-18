import { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function PopupModal() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!closed) setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [closed]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={() => { setVisible(false); setClosed(true); }}
    >
      <div
        className="modal-in relative max-w-md w-full p-8"
        style={{ background: '#ffffff', border: '2px solid #cc0000', boxShadow: '0 0 60px rgba(204,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => { setVisible(false); setClosed(true); }}
          className="absolute top-3 right-3 transition-colors hover:text-red-600"
          style={{ color: '#aaa' }}
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} style={{ color: '#cc0000' }} className="blink" />
          <span className="breaking-badge pulse-red text-xs">ALERTA DE SUSCRIPCION</span>
        </div>

        <h2 className="font-anton text-3xl leading-tight mb-4" style={{ color: '#111' }}>
          ¿TE VAS A IR SIN SUSCRIBIRTE?
        </h2>

        <p className="font-oswald text-sm mb-2 leading-relaxed" style={{ color: '#444' }}>
          Claro. Asume la ignorancia.
        </p>
        <p className="font-oswald text-sm mb-6 leading-relaxed" style={{ color: '#666' }}>
          Se uno de ellos. Uno de esos que se entera de las noticias por lo que le cuenta el cunado en un asado.
          Un ser que vive en las sombras de la desinformacion mientras nosotros te ofrecemos
          <span style={{ color: '#ff6600' }}> noticias completamente exageradas </span>
          directamente en tu casilla de correo.
        </p>

        <input
          type="email"
          placeholder="tu@email.com (si no te suscribes, lo entendemos)"
          className="w-full px-4 py-3 mb-3 font-oswald text-sm"
          style={{ background: '#f8f8f8', border: '1px solid #ddd', outline: 'none', color: '#111' }}
        />

        <button
          className="w-full py-3 font-oswald font-700 text-sm uppercase tracking-wider text-white transition-all hover:opacity-90 mb-3"
          style={{ background: '#cc0000' }}
          onClick={() => { setVisible(false); setClosed(true); }}
        >
          SUSCRIBIRME Y DEJAR DE SER UN IGNORANTE
        </button>

        <button
          className="w-full py-2 font-oswald text-xs uppercase tracking-wider transition-colors hover:text-red-600"
          style={{ color: '#999' }}
          onClick={() => { setVisible(false); setClosed(true); }}
        >
          No gracias, prefiero vivir en la oscuridad
        </button>
      </div>
    </div>
  );
}
