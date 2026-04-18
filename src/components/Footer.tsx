export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-900 py-10" style={{ background: '#050505' }}>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-anton text-xl text-white mb-1">
              EL INFORMADOR<span style={{ color: '#cc0000' }}>TOTAL</span>
            </div>
            <p className="font-oswald text-gray-500 text-xs leading-relaxed mt-2">
              Desde 2024 exagerando la realidad para que sea mas digerible.
              Todo contenido es satirico. La realidad ya es suficientemente absurda.
            </p>
          </div>
          {[
            { title: 'SECCIONES', items: ['Politica', 'Economia', 'Escandalo', 'Espectaculos', 'Catastrofes'] },
            { title: 'SERVICIOS', items: ['Suscripcion Premium', 'Newsletter Diario', 'Alertas de Panico', 'App Movil'] },
            { title: 'LEGAL', items: ['Todo es satira', 'Privacidad', 'Terminos', 'Contacto', 'No nos demanden'] },
          ].map(col => (
            <div key={col.title}>
              <div className="font-oswald font-700 text-white text-xs uppercase tracking-widest mb-3 pb-2" style={{ borderBottom: '1px solid #333' }}>
                {col.title}
              </div>
              <ul className="flex flex-col gap-1.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-oswald text-gray-500 text-xs uppercase tracking-wide hover:text-red-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #1a1a1a' }}>
          <p className="font-oswald text-gray-600 text-xs uppercase tracking-wider">
            (C) 2026 El Informador Total — Todo el contenido es pura satira. Cualquier semejanza con la realidad es completamente deliberada.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-oswald text-gray-600 text-xs">Lectores en panico ahora mismo:</span>
            <span className="font-oswald font-700 text-xs" style={{ color: '#ff6600' }}>4.247.831</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
