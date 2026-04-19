import { useEffect, useState } from 'react';
import { Mail, Heart, Crown, AlertTriangle } from 'lucide-react';
import { supabase, SpecialistLetter } from '../lib/supabase';

export default function AskTheSpecialist() {
  const [letters, setLetters] = useState<SpecialistLetter[]>([]);
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from('specialist_letters')
      .select('*')
      .eq('active', true)
      .neq('answer', '')
      .order('sort_order')
      .then(({ data }) => { if (data) setLetters(data); });
  }, []);

  async function handleSubmit() {
    if (!question.trim()) return;
    await supabase.from('specialist_letters').insert({
      from_location: 'Lector anonimo',
      question: question.trim(),
      answer: '',
      active: false,
    });
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
