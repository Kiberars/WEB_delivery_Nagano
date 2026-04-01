export default function AboutSection() {
  const stats = [
    { val: "4.3★", label: "Рейтинг 2ГИС" },
    { val: "51+", label: "Отзывов" },
    { val: "9–21", label: "Доставка" },
    { val: "600₽", label: "Средний чек" },
  ];
  const features = [
    { icon: "🔥", title: "Живой огонь", text: "Только настоящие угли — никакого гриля или микроволновки" },
    { icon: "🥩", title: "Свежее мясо", text: "Мясо от проверенных поставщиков, без заморозки" },
    { icon: "🚗", title: "Быстрая доставка", text: "Доставляем горячим по всему Каменску-Уральскому" },
    { icon: "🎉", title: "Банкеты", text: "Принимаем заказы на торжества и корпоративные мероприятия" },
  ];

  return (
    <section id="about" className="py-[60px] px-5 bg-gradient-to-b from-bg to-[#111]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="min-w-0">
            <div className="text-accent text-xs font-bold tracking-widest mb-3">О НАС</div>
            <h2 className="font-oswald text-[clamp(24px,4vw,42px)] font-bold leading-tight mb-5 text-text">
              Здесь жарят так,<br />
              <span className="text-accent">что забудешь</span>
              <br />
              вкус других блюд
            </h2>
            <p className="text-text/65 leading-relaxed text-sm mb-4">
              Кафе «Мангал» — шашлычная с доставкой в Каменске-Уральском. Мы готовим
              только на живом угле, используем авторские маринады и свежее мясо.
            </p>
            <p className="text-text/65 leading-relaxed text-sm mb-6">
              Наша фишка:{" "}
              <strong className="text-gold">
                покупай мясо у нас — жарим бесплатно!
              </strong>{" "}
              Идеально для тех, кто хочет настоящего мангального вкуса по цене сырья.
            </p>
            <div className="flex flex-wrap gap-4">
              <InfoChip icon="📍" text="ул. Ленина, 122" />
              <InfoChip icon="📞" text="+7 (912) 239-77-05" />
              <InfoChip icon="🕐" text="Доставка 9:00–21:00" />
              <InfoChip icon="🌙" text="Кафе — круглосуточно" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-bg-card border border-border rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-accent hover:-translate-y-1"
              >
                <div className="text-2xl mb-2.5">{f.icon}</div>
                <div className="font-oswald text-sm font-semibold text-text mb-1.5 tracking-wide">
                  {f.title}
                </div>
                <div className="text-xs text-muted leading-relaxed">{f.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {stats.map((s, i) => (
            <div key={i} className="bg-bg-card p-5 md:p-6 text-center">
              <div className="font-oswald text-2xl md:text-[32px] font-bold text-accent tracking-wide">
                {s.val}
              </div>
              <div className="text-xs md:text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoChip({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 bg-bg-card2 border border-border px-3 py-1.5 rounded-lg text-sm text-muted">
      <span>{icon}</span>
      {text}
    </div>
  );
}
