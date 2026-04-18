import { Youtube, Play, TrendingUp } from 'lucide-react';

const videos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'EL VIDEO QUE EL GOBIERNO NO QUIERE QUE VEAS (PERO LO SUBIMOS IGUAL)',
    views: '2.1M vistas',
    label: 'EXCLUSIVO',
    labelColor: '#cc0000',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'ENTREVISTA HISTORICA: PREGUNTAMOS LO QUE NADIE SE ATREVIA',
    views: '890K vistas',
    label: 'VIRAL',
    labelColor: '#e65c00',
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'ESPECIAL MUNDIAL 2026: ANALIZAMOS TODO LO QUE AUN NO PASO',
    views: '1.4M vistas',
    label: 'MUNDIAL 2026',
    labelColor: '#c8a000',
  },
];

export default function YouTubeColumn() {
  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '2px solid #cc0000' }}>
        <Youtube size={16} style={{ color: '#cc0000' }} />
        <span className="font-oswald font-700 uppercase tracking-wider text-sm" style={{ color: '#111' }}>CANAL OFICIAL</span>
        <span className="font-oswald text-xs uppercase tracking-widest px-2 py-0.5" style={{ background: '#cc0000', color: 'white', fontSize: '0.55rem', letterSpacing: '0.1em' }}>
          YOUTUBE
        </span>
        <TrendingUp size={12} style={{ color: '#cc0000' }} className="blink ml-auto" />
      </div>

      <div className="flex flex-col gap-6">
        {videos.map((video, i) => (
          <div key={video.id} className="group">
            {i === 0 ? (
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%', background: '#f0f0f0' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            ) : (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden cursor-pointer"
                style={{ paddingBottom: '56.25%', background: '#eee' }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-80"
                  style={{ background: 'rgba(0,0,0,0.45)' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ width: 48, height: 48, background: '#cc0000' }}
                  >
                    <Play size={20} fill="white" className="text-white ml-1" />
                  </div>
                </div>
                <span
                  className="absolute top-2 left-2 font-oswald font-700 text-white text-xs uppercase px-2 py-0.5"
                  style={{ background: video.labelColor, fontSize: '0.6rem', letterSpacing: '0.08em' }}
                >
                  {video.label}
                </span>
              </a>
            )}
            <div className="pt-2">
              {i === 0 && (
                <span
                  className="inline-block font-oswald font-700 text-white text-xs uppercase px-2 py-0.5 mb-1"
                  style={{ background: video.labelColor, fontSize: '0.6rem', letterSpacing: '0.08em' }}
                >
                  {video.label}
                </span>
              )}
              <h3 className="font-anton text-sm leading-tight group-hover:text-red-600 transition-colors" style={{ color: '#111' }}>
                {video.title}
              </h3>
              <p className="font-oswald text-xs mt-1 uppercase tracking-wider" style={{ color: '#888' }}>{video.views}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 py-3 font-oswald font-700 text-white text-xs uppercase tracking-widest transition-all hover:opacity-80"
        style={{ background: '#cc0000' }}
      >
        <Youtube size={14} />
        VER TODOS LOS VIDEOS
      </a>
    </section>
  );
}
