import { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DISMISS_KEY = 'rn_popup_dismissed';

export default function PopupModal() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  });

  useEffect(() => {
    if (closed) return;
    // Delay mas largo (12s) para que el preview tenga tiempo de mostrar
    // el ruteo multi-pais antes de que aparezca el modal.
    const timer = setTimeout(() => setVisible(true), 12_000);
    return () => clearTimeout(timer);
  }, [closed]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    setClosed(true);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Alerta de suscripcion"
    >
      <div
        className="modal-in relative max-w-md w-full p-8"
        style={{ background: '#0a0a0a', border: '2px solid #cc0000', boxShadow: '0 0 60px rgba(204,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute top-3 right-3 transition-colors hover:text-red-600"
          style={{ color: '#aaa' }}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} style={{ color: '#cc0000' }} className="blink" />
          <span className="breaking-badge pulse-red text-xs">ALERTA DE SUSCRIPCION</span>
        </div>

        <h2 className="font-anton text-3xl leading-tight mb-4 text-white">
          ¿TE VAS A IR SIN SUSCRIBIRTE?
        </h2>

        <p className="font-oswald text-sm mb-2 leading-relaxed" style={{ color: '#d0d0d0' }}>
          Claro. Asume la ignorancia.
        </p>
        <p className="font-oswald text-sm mb-6 leading-relaxed" style={{ color: '#aaa' }}>
          Se uno de ellos. Uno de esos que se entera de las noticias por lo que le cuenta el cunado en un asado.
          Un ser que vive en las sombras de la desinformacion mientras nosotros te ofrecemos
          <span style={{ color: '#ff6600' }}> noticias completamente exageradas </span>
          directamente en tu casilla de correo.
        </p>

        <input
          type="email"
          placeholder="tu@email.com (si no te suscribes, lo entendemos)"
          className="w-full px-4 py-3 mb-3 font-oswald text-sm"
          style={{ background: '#1a1a1a', border: '1px solid #333', outline: 'none', color: '#fff' }}
        />

        <button
          className="w-full py-3 font-oswald font-700 text-sm uppercase tracking-wider text-white transition-all hover:opacity-90 mb-3"
          style={{ background: '#cc0000' }}
          onClick={dismiss}
        >
          SUSCRIBIRME Y DEJAR DE SER UN IGNORANTE
        </button>

        <button
          className="w-full py-2 font-oswald text-xs uppercase tracking-wider transition-colors hover:text-red-600"
          style={{ color: '#999' }}
          onClick={dismiss}
        >
          No gracias, prefiero vivir en la oscuridad (Esc)
        </button>
      </div>
    </div>
  );
}
