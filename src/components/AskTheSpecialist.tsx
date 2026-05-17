import { useState } from 'react';
import { Mail, Heart, Crown, AlertTriangle } from 'lucide-react';

interface SpecialistLetter {
  id: string;
  from_location: string;
  question: string;
  answer: string;
}

const letters: SpecialistLetter[] = [
  {
    id: '1',
    from_location: 'Buenos Aires, Argentina',
    question: 'Especialista, mi pareja dice que "necesita espacio". Compre un armario mas grande pero sigue igual de molesta. ¿Que hago?',
    answer: 'Su interpretacion literal del problema denota una creatividad admirable aunque contraproducente. El "espacio" que menciona su pareja es de naturaleza existencial, no volumetrica. Le recomiendo devolver el armario y escuchar. Aunque reconozco que el armario era probablemente mas util.',
  },
  {
    id: '2',
    from_location: 'Ciudad de Mexico',
    question: '¿Es normal que mi jefe llame a reunion urgente para decir que las reuniones deben ser mas cortas?',
    answer: 'No solo es normal, es el ciclo natural del ecosistema corporativo. La reunion sobre reuniones es una fase evolutiva inevitable. Sepa que en alguna empresa del mundo hay ahora mismo una reunion sobre como reducir las reuniones sobre reuniones. La cadena es infinita.',
  },
  {
    id: '3',
    from_location: 'Madrid, Espana',
    question: 'Especialista, pongo alarma a las 6am todos los dias para hacer ejercicio y la apago. Llevamos asi 4 años. ¿Tiene cura?',
    answer: 'Lo que describe no es pereza, es optimismo cronico. Cada noche usted cree genuinamente en una version mejor de si mismo que se levantara al amanecer. Ese es un rasgo hermoso. Inutilizable, pero hermoso. Mi recomendacion: ponga la alarma a las 9am y digase que es para las 6. El resultado es identico pero duerme mejor.',
  },
  {
    id: '4',
    from_location: 'Bogota, Colombia',
    question: 'Mi vecino pone reggaeton a las 11pm. Ya hable con el 7 veces. En la septima me ofrecio una cerveza y ahora somos amigos. ¿Sigo molesto?',
    answer: 'Ha descubierto usted el mecanismo de resolucion de conflictos mas antiguo de la humanidad: la cerveza compartida. No, no debe seguir molesto. Pero si le recomiendo que el proximo conflicto con el vecino lo inicie directamente con la conversacion de la cerveza y se ahorre los 6 pasos anteriores.',
  },
];

export default function AskTheSpecialist() {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!question.trim()) return;
    setQuestion('');
    setSubmitted(true);
  }

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
        <Mail size={16} style={{ color: '#cc0000' }} />
        <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>CORREO DEL CORAZON</span>
        <span className="breaking-badge text-xs">ADULTOS</span>
      </div>

      <div className="mb-5 p-3 flex items-start gap-3" style={{ background: '#0d0d0d', border: '1px solid #cc0000' }}>
        <div className="flex-shrink-0 relative">
          <div
            className="flex items-center justify-center"
            style={{ width: 56, height: 56, background: '#1a0000', border: '2px solid #cc0000' }}
          >
            <Crown size={24} style={{ color: '#cc0000' }} />
          </div>
          <span className="absolute -bottom-1 -right-1 pulse-red" style={{ width: 12, height: 12, borderRadius: '50%', display: 'block' }} />
        </div>
        <div>
          <div className="font-anton text-sm leading-tight text-white">EL ESPECIALISTA</div>
          <div className="font-oswald text-xs mt-0.5" style={{ color: '#ff6600' }}>
            Primer Ministro de un pais europeo. Doctor en Amor Propio Aplicado.
          </div>
          <div className="font-oswald text-xs mt-1 leading-tight" style={{ color: '#aaa' }}>
            Atiende consultas entre sesion y sesion de gobierno. Disponibilidad limitada por compromisos institucionales y sesiones de fotos.
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 px-3 py-2" style={{ background: '#1a0a00', border: '1px solid #e65c00' }}>
        <AlertTriangle size={12} style={{ color: '#ff6600' }} />
        <p className="font-oswald leading-tight" style={{ fontSize: '0.65rem', color: '#ccc' }}>
          AVISO: Las respuestas del especialista no constituyen asesoramiento medico ni politico. Aunque a veces es dificil distinguir la diferencia.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="p-4"
            style={{ background: '#0d0d0d', borderLeft: '3px solid #cc0000' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart size={10} style={{ color: '#cc0000' }} />
              <span className="font-oswald font-700 text-xs uppercase tracking-wider" style={{ color: '#cc0000' }}>
                {letter.from_location}
              </span>
            </div>
            <p className="font-oswald text-xs leading-relaxed mb-4 italic" style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '12px', color: '#d0d0d0' }}>
              "{letter.question}"
            </p>
            <div className="flex items-start gap-2">
              <Crown size={12} style={{ color: '#ff6600', flexShrink: 0, marginTop: 2 }} />
              <p className="font-oswald text-xs leading-relaxed" style={{ color: '#bbb' }}>
                <span className="font-700 uppercase" style={{ color: '#ff6600', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                  EL ESPECIALISTA RESPONDE:{' '}
                </span>
                {letter.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4" style={{ background: '#0d0000', border: '1px dashed #cc0000' }}>
        <p className="font-oswald font-700 text-xs uppercase tracking-wider mb-2" style={{ color: '#e0e0e0' }}>
          ENVIE SU CONSULTA
        </p>
        <p className="font-oswald text-xs mb-3 leading-relaxed" style={{ color: '#888' }}>
          El especialista responde personalmente entre el martes y el jueves, salvo que haya decreto de estado de alarma conyugal.
        </p>
        {submitted ? (
          <p className="font-oswald text-xs" style={{ color: '#7acc00' }}>
            Su tragedia fue recibida. El especialista la analizara con la seriedad que merece.
          </p>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Cuente su tragedia sentimental..."
              className="flex-1 px-3 py-2 font-oswald text-xs text-white"
              style={{ background: '#1a1a1a', border: '1px solid #333', outline: 'none' }}
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 font-oswald font-700 text-xs uppercase text-white transition-opacity hover:opacity-80"
              style={{ background: '#cc0000', flexShrink: 0 }}
            >
              ENVIAR
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
