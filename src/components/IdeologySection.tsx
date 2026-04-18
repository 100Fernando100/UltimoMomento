import { ChevronRight, Flame, Snowflake } from 'lucide-react';

const leftArticles = [
  {
    title: 'ESTUDIO REVELA QUE EL CAPITALISMO ES RESPONSABLE TAMBIEN DE QUE EL CAFÉ ESTE FRIO',
    views: '1.2M',
    time: '2 h',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'EXPERTOS CONFIRMAN: SI TE QUEJASTE HOY, TECNICAMENTE ESTAS RESISTIENDO AL SISTEMA',
    views: '890K',
    time: '4 h',
    img: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'FESTIVAL SOLIDARIO COBRA ENTRADA DE $200 PARA COMBATIR LA DESIGUALDAD',
    views: '2.1M',
    time: '6 h',
    img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'INFLUENCER VEGANO LLEGA EN JET PRIVADO A CONGRESO SOBRE REDUCIR LA HUELLA DE CARBONO',
    views: '3.4M',
    time: '8 h',
    img: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'POLITICO PROGRESISTA MANDA A SUS HIJOS A COLEGIO PRIVADO Y DEFIENDE LA EDUCACION PUBLICA',
    views: '1.8M',
    time: '10 h',
    img: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const rightArticles = [
  {
    title: 'EMPRESARIO QUE "EMPEZÓ DE CERO" OMITE DETALLES SOBRE EL CAPITAL INICIAL DE SUS PADRES',
    views: '980K',
    time: '1 h',
    img: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'POLÍTICO ANTI-REGULACION EXIGE REGULACION URGENTE CUANDO AFECTA SUS INTERESES',
    views: '1.5M',
    time: '3 h',
    img: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'CANDIDATO "DE LOS VALORES TRADICIONALES" DIVORCIADO TRES VECES PIDE DEFENDER LA FAMILIA',
    views: '4.2M',
    time: '5 h',
    img: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'THINK TANK LIBERAL FINANCIADO POR MILLONARIOS CONCLUYE QUE BAJAR IMPUESTOS A MILLONARIOS ES LA SOLUCION',
    views: '2.7M',
    time: '7 h',
    img: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'PARTIDO QUE PROMETIO MENOS GASTO PUBLICO BATE RECORD DE GASTO PUBLICO',
    views: '1.1M',
    time: '9 h',
    img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

function ArticleRow({ article, rank }: { article: typeof leftArticles[0]; rank: number }) {
  return (
    <div className="flex items-center gap-3 py-2.5 cursor-pointer group" style={{ borderBottom: '1px solid #1a1a1a' }}>
      <span
        className="font-anton text-2xl flex-shrink-0 w-7 text-center leading-none"
        style={{ color: '#222', lineHeight: 1 }}
      >
        {rank}
      </span>
      <img
        src={article.img}
        alt=""
        className="flex-shrink-0 object-cover"
        style={{ width: 60, height: 48 }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-oswald text-xs leading-tight group-hover:text-red-400 transition-colors" style={{ fontSize: '0.72rem', lineHeight: 1.3, color: '#d8d8d8' }}>
          {article.title}
        </p>
        <div className="flex items-center gap-2 mt-1 font-oswald" style={{ fontSize: '0.6rem', color: '#666' }}>
          <span>{article.time}</span>
          <span>·</span>
          <span style={{ color: '#ff6600' }}>{article.views} lecturas</span>
        </div>
      </div>
      <ChevronRight size={12} style={{ color: '#444', flexShrink: 0 }} />
    </div>
  );
}

export default function IdeologySection() {
  return (
    <section className="w-full mt-12">
      <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: '2px solid #333' }}>
        <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#e0e0e0' }}>
          LO MAS LEIDO EN LAS ULTIMAS 24 HS
        </span>
        <span className="font-oswald text-xs uppercase tracking-widest px-2 py-0.5" style={{ background: '#1a1a1a', color: '#888', fontSize: '0.55rem', letterSpacing: '0.1em', border: '1px solid #333' }}>
          SEGUN TU IDEOLOGIA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: '1px solid #1a1a1a' }}>
        <div style={{ borderRight: '1px solid #1a1a1a' }}>
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: 'linear-gradient(90deg, #001a33 0%, #0a0a0a 100%)', borderBottom: '2px solid #0066cc' }}
          >
            <Snowflake size={14} style={{ color: '#4499ff' }} />
            <span className="font-oswald font-700 uppercase tracking-widest text-xs" style={{ color: '#4499ff' }}>
              SI ERES DE IZQUIERDA
            </span>
            <span className="font-oswald text-xs" style={{ color: '#555', marginLeft: 'auto' }}>Lee estos articulos</span>
          </div>
          <div className="px-4">
            {leftArticles.map((article, i) => (
              <ArticleRow key={i} article={article} rank={i + 1} />
            ))}
          </div>
          <div className="px-4 py-3">
            <button
              className="w-full py-2 font-oswald font-700 text-xs uppercase tracking-wider transition-all hover:opacity-80"
              style={{ background: '#001a33', border: '1px solid #0066cc', color: '#4499ff' }}
            >
              VER TODOS — EDICION PROGRESISTA
            </button>
          </div>
        </div>

        <div>
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: 'linear-gradient(90deg, #1a0000 0%, #0a0a0a 100%)', borderBottom: '2px solid #cc0000' }}
          >
            <Flame size={14} style={{ color: '#ff4400' }} />
            <span className="font-oswald font-700 uppercase tracking-widest text-xs" style={{ color: '#ff4400' }}>
              SI ERES DE DERECHA
            </span>
            <span className="font-oswald text-xs" style={{ color: '#555', marginLeft: 'auto' }}>Lee estos articulos</span>
          </div>
          <div className="px-4">
            {rightArticles.map((article, i) => (
              <ArticleRow key={i} article={article} rank={i + 1} />
            ))}
          </div>
          <div className="px-4 py-3">
            <button
              className="w-full py-2 font-oswald font-700 text-xs uppercase tracking-wider transition-all hover:opacity-80"
              style={{ background: '#1a0000', border: '1px solid #cc0000', color: '#ff4400' }}
            >
              VER TODOS — EDICION CONSERVADORA
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-2 py-2 mt-0"
        style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderTop: 'none' }}
      >
        <span className="font-oswald text-xs uppercase tracking-widest" style={{ color: '#444', fontSize: '0.6rem' }}>
          NOTA: Ambas columnas tienen exactamente las mismas noticias. Solo cambia el angulo del titular.
        </span>
      </div>
    </section>
  );
}
