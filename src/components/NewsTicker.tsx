const tickerItems = [
  'ULTIMO MOMENTO: Hombre lleva 3 años diciendo "empiezo el lunes" y los lunes siguen existiendo',
  'ALERTA MAXIMA: El cafe de la oficina se acabo y nadie compro mas. Fuentes confirman "situacion insostenible"',
  'BREAKING: Influencer publica foto comiendo ensalada. Expertos advierten que en su nevera solo hay champagne',
  'EXCLUSIVO: Estudio revela que el 94% de las reuniones podrian haber sido un correo. El 6% restante tampoco era necesario',
  'URGENTE: Vecino pone musica a todo volumen a las 11pm. Victimas reportan haber escuchado "Macarena" en bucle',
  'ALERTA: Persona llega puntual a una cita y no sabe que hacer con el tiempo que le sobra. Especialistas preocupados',
  'NUEVO: Hombre convencido de que el semaforo cambia mas rapido si presiona el boton repetidamente. La ciencia no lo respalda',
  'ULTIMA HORA: Trabajador remoto confiesa que en las videollamadas lleva traje arriba y pijama abajo desde 2020',
];

export default function NewsTicker() {
  const fullText = tickerItems.join('   |||   ');

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
