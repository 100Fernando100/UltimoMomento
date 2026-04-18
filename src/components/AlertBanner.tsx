import { Zap } from 'lucide-react';

const alerts = [
  { color: '#cc0000', text: 'REDES SOCIALES ARDEN: Persona usa "literal" de forma no literal en tweet y expertos temen el fin de la comunicacion humana' },
  { color: '#e65c00', text: 'ECONOMIA: Precio del cafe en coworkings sube un 400%. Economistas: "tecnicamente es para cubrir los costos del ping pong"' },
];

export default function AlertBanner() {
  return (
    <div id="seccion-sexo" className="flex flex-col gap-px my-6">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-3"
          style={{ background: alert.color + '18', borderLeft: `4px solid ${alert.color}` }}
        >
          <div className="flex-shrink-0 flex items-center gap-2">
            <Zap size={14} style={{ color: alert.color }} className={i === 0 ? 'blink' : ''} />
            <span
              className="font-oswald font-700 uppercase text-xs tracking-widest"
              style={{ color: alert.color }}
            >
              ULTIMO MOMENTO
            </span>
          </div>
          <p className="font-oswald text-xs leading-tight flex-1" style={{ color: '#d0d0d0' }}>{alert.text}</p>
        </div>
      ))}
    </div>
  );
}
