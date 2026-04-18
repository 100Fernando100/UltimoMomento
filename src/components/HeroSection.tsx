import { Eye, Clock, Share2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="seccion-economia" className="relative w-full scanline-overlay" style={{ minHeight: '520px' }}>
      <img
        src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="breaking news"
        className="w-full object-cover"
        style={{ height: '520px' }}
      />
      <div className="hero-gradient absolute inset-0" />

      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
        <span className="breaking-badge pulse-red">COLAPSO TOTAL</span>
        <span className="exclusive-badge">EXCLUSIVO</span>
        <span className="breaking-badge blink">ALERTA MAXIMA</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <div className="max-w-3xl">
          <div className="font-oswald text-sm uppercase tracking-widest mb-2" style={{ color: '#ff6600' }}>
            LAS IMAGENES QUE NO QUERIAN QUE VIERAS
          </div>
          <h1 className="font-anton text-white leading-none mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            EMPLEADO SE DESCONECTA DE SLACK A LAS 5:00 PM Y DESATA EL PANICO EN LA EMPRESA:
            <span style={{ color: '#ff6600' }}> IMAGENES DE LA TRAGEDIA</span>
          </h1>
          <p className="font-oswald text-gray-300 text-sm mb-4 max-w-2xl leading-relaxed">
            En un acto que expertos califican de "impensable y moralmente cuestionable", el empleado apago su computadora
            exactamente al finalizar su jornada laboral. El CEO, visible y profundamente herido, convoco reuniones de emergencia.
            Fuentes internas revelan que el mensaje de Teams enviado a las 5:02 PM sigue sin leer.
          </p>
          <div className="flex items-center gap-6 text-xs font-oswald text-gray-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Clock size={12} style={{ color: '#cc0000' }} />
              Hace 4 minutos
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={12} style={{ color: '#ff6600' }} />
              4.2M en panico
            </span>
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Share2 size={12} />
              Compartir el horror
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-black/80 border border-red-900 px-3 py-2 text-right">
        <div className="font-oswald text-xs text-gray-400 uppercase tracking-wider">Tambien en panico</div>
        <div className="font-oswald font-700 text-white text-sm">89% de los lectores</div>
        <div className="w-full bg-gray-800 mt-1" style={{ height: '4px' }}>
          <div className="pulse-red" style={{ width: '89%', height: '4px' }} />
        </div>
      </div>
    </section>
  );
}
