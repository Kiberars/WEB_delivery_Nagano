export default function Footer() {
  return (
    <footer id="contacts" className="bg-[#0A0A0A] border-t border-border py-10 px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-[#FF8C00] flex items-center justify-center text-xl">
                🔥
              </div>
              <div className="font-oswald text-lg font-bold text-text tracking-widest">
                МАНГАЛ
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Шашлычная с доставкой в Каменске-Уральском. Только живой огонь, только свежее мясо.
            </p>
          </div>

          <div>
            <div className="font-oswald text-sm font-semibold text-text tracking-wider mb-3.5">
              КОНТАКТЫ
            </div>
            <div className="flex flex-col gap-2.5">
              <FooterLink icon="📍" text="ул. Ленина, 122, Каменск-Уральский" />
              <FooterLink icon="📞" text="+7 (912) 239-77-05" />
              <FooterLink icon="🌐" text="мангал-каменск.рф" />
            </div>
          </div>

          <div>
            <div className="font-oswald text-sm font-semibold text-text tracking-wider mb-3.5">
              РЕЖИМ РАБОТЫ
            </div>
            <div className="flex flex-col gap-2">
              <WorkRow label="Кафе" val="Круглосуточно" />
              <WorkRow label="Доставка" val="9:00 — 21:00" />
              <WorkRow label="Телефон" val="Пн–Вс, 9:00–21:00" />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted/50">
            © 2025 Кафе Мангал. Все права защищены.
          </div>
          <div className="text-sm text-muted/40">Сделано с 🔥</div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ icon, text }) {
  return (
    <div className="flex gap-2 text-sm text-muted items-start">
      <span className="shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function WorkRow({ label, val }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-text font-medium">{val}</span>
    </div>
  );
}
