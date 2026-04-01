export default function PromosTab({ promos, setPromos, promoForm, setPromoForm, addPromo }) {
  const set = (k, v) => setPromoForm((p) => ({ ...p, [k]: v }));
  const deletePromo = (id) => setPromos((prev) => prev.filter((p) => p.id !== id));
  const togglePromo = (id) =>
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  return (
    <div className="fade-up grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
      <div className="order-2 lg:order-1">
        <h3 className="font-oswald text-xl font-bold text-text tracking-wider mb-4">
          ПРОМОКОДЫ{" "}
          <span className="text-sm text-muted font-normal tracking-normal">
            ({promos.length})
          </span>
        </h3>
        <div className="flex flex-col gap-2.5">
          {promos.map((p) => (
            <div
              key={p.id}
              className="bg-bg-card border border-border rounded-xl p-4 flex items-center gap-3.5"
              style={{
                borderColor: p.active ? "#252525" : "rgba(37,37,37,0.5)",
                opacity: p.active ? 1 : 0.5,
              }}
            >
              <div
                className="font-oswald text-lg font-bold tracking-widest px-3 py-1 rounded-lg shrink-0"
                style={{
                  background: p.active ? "rgba(255,69,0,0.12)" : "rgba(128,128,128,0.1)",
                  border: `1px solid ${p.active ? "#FF450044" : "#252525"}`,
                  color: p.active ? "#FF4500" : "#808080",
                }}
              >
                {p.code}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-text">
                  {p.type === "percent" ? `Скидка ${p.value}%` : `Скидка ${p.value} ₽`}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {p.active ? "✓ Активен" : "✗ Неактивен"}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => togglePromo(p.id)}
                  className="btn-press px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
                  style={{
                    background: p.active ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                    color: p.active ? "#EF4444" : "#22C55E",
                    border: `1px solid ${p.active ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
                  }}
                >
                  {p.active ? "Отключить" : "Включить"}
                </button>
                <button
                  onClick={() => deletePromo(p.id)}
                  className="btn-press px-2.5 py-1.5 rounded-md text-sm cursor-pointer bg-red-500/8 text-red-500 border border-red-500/20"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="bg-bg-card border border-border rounded-xl p-5 md:p-6 order-1 lg:order-2 lg:sticky lg:top-20"
      >
        <h3 className="font-oswald text-lg font-bold text-text tracking-wider mb-5">
          + НОВЫЙ ПРОМОКОД
        </h3>
        <div className="flex flex-col gap-3.5">
          <div>
            <div className="text-xs font-bold text-muted tracking-wider mb-1.5">КОД</div>
            <input
              value={promoForm.code}
              onChange={(e) => set("code", e.target.value.toUpperCase())}
              placeholder="ЛЕТО2025"
              className="w-full bg-bg-card2 border border-border rounded-lg px-3 py-2.5 text-text text-base font-oswald tracking-[2px] font-semibold"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
              ТИП СКИДКИ
            </div>
            <select
              value={promoForm.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full bg-bg-card2 border border-border rounded-lg px-3 py-2.5 text-text text-sm"
            >
              <option value="percent">Процент (%)</option>
              <option value="fixed">Фиксированная (₽)</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
              {promoForm.type === "percent" ? "РАЗМЕР СКИДКИ (%)" : "РАЗМЕР СКИДКИ (₽)"}
            </div>
            <input
              type="number"
              value={promoForm.value}
              onChange={(e) => set("value", e.target.value)}
              placeholder={promoForm.type === "percent" ? "10" : "200"}
              min="1"
              max={promoForm.type === "percent" ? 100 : 10000}
              className="w-full bg-bg-card2 border border-border rounded-lg px-3 py-2.5 text-text text-base"
            />
          </div>
          <div className="flex items-center gap-2.5 py-2.5">
            <div className="text-sm text-muted">Активен сразу</div>
            <div
              onClick={() => set("active", !promoForm.active)}
              className="w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-250"
              style={{ background: promoForm.active ? "#FF4500" : "#252525" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-[left] duration-250"
                style={{ left: promoForm.active ? "calc(100% - 22px)" : "2px" }}
              />
            </div>
          </div>
          <button
            className="btn-press bg-gradient-to-br from-accent to-accent2 text-white border-0 rounded-xl py-3 text-sm font-bold cursor-pointer tracking-wide disabled:opacity-50"
            disabled={!promoForm.code || !promoForm.value}
            onClick={addPromo}
          >
            Создать промокод
          </button>
        </div>
      </div>
    </div>
  );
}
