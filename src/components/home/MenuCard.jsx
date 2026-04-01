export default function MenuCard({ item, onAdd, justAdded }) {
  const BADGE_COLOR = {
    "ХИТ": { bg: "rgba(255,69,0,0.2)", color: "#FF4500", border: "#FF4500" },
    "НОВИНКА": { bg: "rgba(34,197,94,0.15)", color: "#22C55E", border: "#22C55E" },
    "ТОП": { bg: "rgba(167,139,250,0.15)", color: "#A78BFA", border: "#A78BFA" },
    "ВЫГОДА": { bg: "rgba(251,191,36,0.15)", color: "#FBBF24", border: "#FBBF24" },
    "ОСТРЫЙ🌶": { bg: "rgba(239,68,68,0.15)", color: "#EF4444", border: "#EF4444" },
  };
  const bc = item.badge ? BADGE_COLOR[item.badge] || BADGE_COLOR["ХИТ"] : null;

  return (
    <div
      className="menu-card fade-up bg-bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-300 cursor-default hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,69,0,0.12)]"
      style={{ animationDelay: `${(item.id % 6) * 0.05}s` }}
    >
      <div className="card-img-wrap h-[180px] relative overflow-hidden transition-transform duration-[400ms] ease shrink-0 bg-[#1A1A1A]">
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-[400ms] ease"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={!item.img ? "flex" : "hidden"}
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            background: "linear-gradient(135deg,#1A1A1A,#222)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 80%, rgba(255,69,0,0.08), transparent 70%)",
            }}
          />
          {item.emoji}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(20,20,20,0.7), transparent)",
          }}
        />
        {item.badge && bc && (
          <div
            className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wider px-2 py-1 rounded-md backdrop-blur-sm"
            style={{
              background: bc.bg,
              color: bc.color,
              border: `1px solid ${bc.border}`,
            }}
          >
            {item.badge}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-oswald text-base font-semibold text-text mb-1.5 tracking-wide">
            {item.name}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-3">{item.desc}</p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="font-oswald text-xl font-bold text-accent">
              {item.price}{" "}
              <span className="text-base">₽</span>
            </div>
            <div className="text-[11px] text-muted/70 mt-0.5">{item.weight}</div>
          </div>
          <button
            className="btn-press text-white border-0 rounded-xl w-11 h-11 text-xl cursor-pointer flex items-center justify-center transition-all duration-200 shrink-0"
            style={{
              background: justAdded
                ? "#22C55E"
                : "linear-gradient(135deg, #FF4500, #FF6A00)",
              boxShadow: justAdded
                ? "0 4px 16px rgba(34,197,94,0.4)"
                : "0 4px 16px rgba(255,69,0,0.3)",
            }}
            onClick={onAdd}
          >
            {justAdded ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
