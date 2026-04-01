export default function BannerCarousel({ banners, idx, setIdx }) {
  const b = banners[idx];
  return (
    <section className="relative overflow-hidden mb-0">
      <div
        key={idx}
        className="min-h-[240px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[400px] flex items-center px-5 sm:px-8 md:px-12 lg:px-20 py-10 animate-[bannerFade_4.5s_ease_both] relative"
        style={{ background: b.bg }}
      >
        <div className="absolute right-[5%] top-[10%] text-[clamp(60px,12vw,160px)] opacity-[0.06] select-none pointer-events-none leading-none">
          🔥
        </div>
        <div className="absolute right-[18%] bottom-[5%] text-[clamp(40px,8vw,100px)] opacity-[0.04] select-none pointer-events-none">
          🥩
        </div>

        <div className="max-w-[700px] z-10">
          <div className="inline-block px-3 py-1 rounded-md bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest mb-4">
            {b.tag}
          </div>

          <h1 className="font-oswald text-[clamp(32px,6vw,72px)] font-bold text-text leading-[1.05] tracking-widest mb-4 whitespace-pre-line">
            {b.title}
          </h1>
          <p className="text-[clamp(14px,2vw,18px)] text-text/70 mb-7 max-w-[480px] leading-relaxed">
            {b.sub}
          </p>
          <a href="#menu">
            <button className="btn-press bg-gradient-to-br from-accent to-accent2 text-white px-7 py-3.5 rounded-xl text-sm font-bold border-0 cursor-pointer tracking-wide shadow-[0_4px_20px_rgba(255,69,0,0.4)]">
              {b.cta} →
            </button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`border-0 cursor-pointer transition-all duration-[350ms] rounded-sm ${
              i === idx ? "w-7 bg-accent" : "w-2 bg-white/20"
            } h-2`}
          />
        ))}
      </div>
    </section>
  );
}
