import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="mt-16 py-10" style={{ background: '#1a1a1a', borderTop: '3px solid #cc0000' }}>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-anton text-xl mb-1" style={{ color: '#fff' }}>
              ROMPE<span style={{ color: '#cc0000' }}>NOTICIAS</span>
            </div>
            <p className="font-oswald text-xs leading-relaxed mt-2 mb-4" style={{ color: '#999' }}>
              Desde 2024 exagerando la realidad para que sea mas digerible.
              Todo contenido es satirico. La realidad ya es suficientemente absurda.
            </p>
            <div className="flex flex-col gap-2">
              <span className="font-oswald text-xs uppercase tracking-widest" style={{ color: '#555', fontSize: '0.6rem' }}>SEGUINOS</span>
              <SocialIcons size="md" />
            </div>
          </div>
          {[
            { title: 'SECCIONES', items: ['Politica', 'Economia', 'Escandalo', 'Espectaculos', 'Catastrofes'] },
            { title: 'SERVICIOS', items: ['Suscripcion Premium', 'Newsletter Diario', 'Alertas de Panico', 'App Movil'] },
            { title: 'LEGAL', items: ['Todo es satira', 'Privacidad', 'Terminos', 'Contacto', 'No nos demanden'] },
          ].map(col => (
            <div key={col.title}>
              <div className="font-oswald font-700 text-xs uppercase tracking-widest mb-3 pb-2" style={{ color: '#fff', borderBottom: '1px solid #333' }}>
                {col.title}
              </div>
              <ul className="flex flex-col gap-1.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-oswald text-xs uppercase tracking-wide transition-colors hover:text-red-400" style={{ color: '#888' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #333' }}>
          <p className="font-oswald text-xs uppercase tracking-wider" style={{ color: '#666' }}>
            (C) 2026 RompeNoticias — Todo el contenido es pura satira. Cualquier semejanza con la realidad es completamente deliberada.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-oswald text-xs" style={{ color: '#666' }}>Lectores en panico ahora mismo:</span>
            <span className="font-oswald font-700 text-xs" style={{ color: '#ff6600' }}>4.247.831</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
