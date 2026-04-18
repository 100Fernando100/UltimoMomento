import { Mail, Heart, Crown, AlertTriangle } from 'lucide-react';

const letters = [
  {
    from: 'Desesperada en Guadalajara',
    question: 'Especialista, mi pareja siempre llega tarde a la cama, dice que estaba "resolviendo la crisis" y luego quiere hablar de reformas estructurales. ¿Como lo manejo?',
    answer: 'Querida lectora, la clave es la comunicacion asertiva. Yo mismo he aprendido que cuando llegas tarde, lo mejor es presentar un plan quinquenal de reencuentro conyugal, preferiblemente con infografia y un decreto firmado. La pasion, como el PIB, necesita sus propios indicadores de gestion.',
  },
  {
    from: 'Confundido en Sevilla',
    question: 'Doctor, ¿es normal que mi pareja quiera que yo le hable solo de sus logros durante el momento de maxima intimidad? Dice que le "activa".',
    answer: 'Absolutamente normal y estadisticamente comprobado. Segun datos que no puedo compartir por razones de confidencialidad, el 73% de las personas con alta responsabilidad institucional encuentran que enumerar los logros propios es un estimulante de primera categoria. Se llama "foreplay ejecutivo".',
  },
  {
    from: 'Angustiada en Valencia',
    question: 'Le escribo porque mi novio cada vez que algo va mal en nuestra relacion dice que es "culpa de la herencia recibida". Llevamos juntos 6 anos.',
    answer: 'Senora mia, eso que describe no es un problema de pareja sino un mecanismo de defensa institucionalizado. Le recomiendo lo siguiente: exijale un informe de auditoria de la relacion, que especifique con precision en que ano exactamente comenzo la crisis y quien la genero. La responsabilidad afectiva, como la presupuestaria, requiere trazabilidad.',
  },
  {
    from: 'Intrigada en Bilbao',
    question: 'Mi compañero pide "mas dialogo" pero cuando dialogo no escucha. ¿Que hago?',
    answer: 'Senora, lo que describe es un fenomeno bien documentado que yo llamo "consulta sin vinculacion". Es cuando se convoca el debate pero el resultado ya esta decidido. Mi consejo: cambie de interlocutor. O de pais. Cualquiera de las dos opciones es valida segun jurisprudencia comparada.',
  },
  {
    from: 'Frustrada en Madrid',
    question: 'Especialista: ¿es posible que alguien disfrute mas de la foto que del momento?',
    answer: 'Querida lectora, bienvenida al siglo XXI. Lo que describe se llama "hiperestimulacion narrativa de la propia imagen". Lo conozco bien. A veces uno vive para el portazo de la foto de familia en el tejado del Palacio de la Moncloa mas que para la familia en si. Es un efecto secundario del poder bien gestionado.',
  },
];

export default function AskTheSpecialist() {
  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
        <Mail size={16} style={{ color: '#cc0000' }} />
        <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#111' }}>CORREO DEL CORAZON</span>
        <span className="breaking-badge text-xs">ADULTOS</span>
      </div>

      <div className="mb-5 p-3 flex items-start gap-3" style={{ background: '#fff8f8', border: '1px solid #cc0000' }}>
        <div className="flex-shrink-0 relative">
          <div
            className="flex items-center justify-center"
            style={{ width: 56, height: 56, background: '#ffe8e8', border: '2px solid #cc0000' }}
          >
            <Crown size={24} style={{ color: '#cc0000' }} />
          </div>
          <span className="absolute -bottom-1 -right-1 pulse-red" style={{ width: 12, height: 12, borderRadius: '50%', display: 'block' }} />
        </div>
        <div>
          <div className="font-anton text-sm leading-tight" style={{ color: '#111' }}>EL ESPECIALISTA</div>
          <div className="font-oswald text-xs mt-0.5" style={{ color: '#ff6600' }}>
            Primer Ministro de un pais europeo. Doctor en Amor Propio Aplicado.
          </div>
          <div className="font-oswald text-xs mt-1 leading-tight" style={{ color: '#888' }}>
            Atiende consultas entre sesion y sesion de gobierno. Disponibilidad limitada por compromisos institucionales y sesiones de fotos.
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 px-3 py-2" style={{ background: '#fff8f0', border: '1px solid #e65c00' }}>
        <AlertTriangle size={12} style={{ color: '#ff6600' }} />
        <p className="font-oswald leading-tight" style={{ fontSize: '0.65rem', color: '#777' }}>
          AVISO: Las respuestas del especialista no constituyen asesoramiento medico ni politico. Aunque a veces es dificil distinguir la diferencia.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {letters.map((letter, i) => (
          <div
            key={i}
            className="p-4"
            style={{ background: '#fff8f8', borderLeft: '3px solid #cc0000' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart size={10} style={{ color: '#cc0000' }} />
              <span className="font-oswald font-700 text-xs uppercase tracking-wider" style={{ color: '#cc0000' }}>
                {letter.from}
              </span>
            </div>
            <p className="font-oswald text-xs leading-relaxed mb-4 italic" style={{ borderBottom: '1px solid #e8d0d0', paddingBottom: '12px', color: '#444' }}>
              "{letter.question}"
            </p>
            <div className="flex items-start gap-2">
              <Crown size={12} style={{ color: '#ff6600', flexShrink: 0, marginTop: 2 }} />
              <p className="font-oswald text-xs leading-relaxed" style={{ color: '#555' }}>
                <span className="font-700 uppercase" style={{ color: '#ff6600', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                  EL ESPECIALISTA RESPONDE:{' '}
                </span>
                {letter.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4" style={{ background: '#fff8f8', border: '1px dashed #cc0000' }}>
        <p className="font-oswald font-700 text-xs uppercase tracking-wider mb-2" style={{ color: '#111' }}>
          ENVIE SU CONSULTA
        </p>
        <p className="font-oswald text-xs mb-3 leading-relaxed" style={{ color: '#888' }}>
          El especialista responde personalmente entre el martes y el jueves, salvo que haya decreto de estado de alarma conyugal.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cuente su tragedia sentimental..."
            className="flex-1 px-3 py-2 font-oswald text-xs"
            style={{ background: '#fff', border: '1px solid #ddd', outline: 'none', color: '#111' }}
          />
          <button
            className="px-4 py-2 font-oswald font-700 text-xs uppercase text-white transition-opacity hover:opacity-80"
            style={{ background: '#cc0000', flexShrink: 0 }}
          >
            ENVIAR
          </button>
        </div>
      </div>
    </section>
  );
}
