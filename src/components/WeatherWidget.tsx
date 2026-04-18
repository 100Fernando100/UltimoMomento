import { Cloud, Sun, CloudRain, Wind, Thermometer, CloudLightning } from 'lucide-react';

const forecasts = [
  { day: 'HOY', icon: 'storm', high: 31, low: 18, desc: 'Tormenta de declaraciones', precip: '98%' },
  { day: 'MAÑ', icon: 'rain', high: 28, low: 17, desc: 'Lluvias de desmentidas', precip: '75%' },
  { day: 'MIÉ', icon: 'cloudy', high: 25, low: 16, desc: 'Parcialmente nublado de sospechas', precip: '40%' },
  { day: 'JUE', icon: 'sunny', high: 33, low: 20, desc: 'Soleado con posibilidad de escandalo', precip: '10%' },
  { day: 'VIE', icon: 'storm', high: 29, low: 15, desc: 'Tormenta perfecta de polemikas', precip: '88%' },
];

function WeatherIcon({ type, size = 16 }: { type: string; size?: number }) {
  const style = { flexShrink: 0 as const };
  if (type === 'storm') return <CloudLightning size={size} style={{ ...style, color: '#ffaa00' }} />;
  if (type === 'rain') return <CloudRain size={size} style={{ ...style, color: '#66aaff' }} />;
  if (type === 'sunny') return <Sun size={size} style={{ ...style, color: '#ffcc00' }} />;
  return <Cloud size={size} style={{ ...style, color: '#aaa' }} />;
}

export default function WeatherWidget() {
  return (
    <div className="mt-6 p-4" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <Cloud size={13} style={{ color: '#66aaff' }} />
        <span className="font-oswald font-700 uppercase text-xs tracking-widest" style={{ color: '#aaa' }}>
          PRONOSTICO DEL CAOS
        </span>
      </div>

      <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <CloudLightning size={36} style={{ color: '#ffaa00', flexShrink: 0 }} />
        <div>
          <div className="flex items-end gap-1">
            <span className="font-anton text-4xl leading-none" style={{ color: '#f0f0f0' }}>31°</span>
            <span className="font-oswald text-xs mb-1" style={{ color: '#666' }}>/ 18°</span>
          </div>
          <p className="font-oswald text-xs mt-1 leading-tight" style={{ color: '#aaa', fontSize: '0.7rem' }}>
            Tormenta de declaraciones<br />
            <span style={{ color: '#ffaa00' }}>Probabilidad de crisis: 98%</span>
          </p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <Wind size={10} style={{ color: '#888' }} />
            <span className="font-oswald text-xs" style={{ color: '#777', fontSize: '0.65rem' }}>24 km/h rumores</span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer size={10} style={{ color: '#cc0000' }} />
            <span className="font-oswald text-xs" style={{ color: '#777', fontSize: '0.65rem' }}>Tension: MAXIMA</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {forecasts.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 py-2 px-1 rounded"
            style={{
              background: i === 0 ? '#1a1a1a' : 'transparent',
              border: i === 0 ? '1px solid #333' : '1px solid transparent',
            }}
          >
            <span className="font-oswald font-700 text-center" style={{ fontSize: '0.58rem', color: i === 0 ? '#ff6600' : '#777', letterSpacing: '0.05em' }}>
              {day.day}
            </span>
            <WeatherIcon type={day.icon} size={14} />
            <span className="font-oswald font-700 text-center" style={{ fontSize: '0.65rem', color: '#e0e0e0' }}>{day.high}°</span>
            <span className="font-oswald text-center" style={{ fontSize: '0.58rem', color: '#555' }}>{day.low}°</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2" style={{ borderTop: '1px solid #1a1a1a' }}>
        <p className="font-oswald text-center" style={{ fontSize: '0.58rem', color: '#444', letterSpacing: '0.04em' }}>
          DATOS PROVISTOS POR METEOROLOGIA EDITORIAL S.A. · SIN RESPONSABILIDAD ALGUNA
        </p>
      </div>
    </div>
  );
}
