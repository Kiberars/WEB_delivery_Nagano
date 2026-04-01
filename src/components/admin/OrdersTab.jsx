import { STATUS_META, STATUS_LIST, MONTH_NAMES_RU } from "../../data/constants";
import StatCard from "./StatCard";

export default function OrdersTab({
  orders, filteredOrders, orderFilter, setOrderFilter,
  dateFilter, setDateFilter, expandedOrder, setExpandedOrder,
  changeStatus, stats,
}) {
  const availableMonths = [
    ...new Set(orders.map((o) => (o.date || "").slice(0, 7)).filter(Boolean)),
  ].sort().reverse();

  const setMode = (mode) => setDateFilter({ mode, date: "", month: "" });
  const activeFiltersCount =
    (orderFilter !== "Все" ? 1 : 0) + (dateFilter.mode !== "all" ? 1 : 0);

  return (
    <div className="fade-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3.5 mb-7">
        <StatCard icon="📋" label="Всего заказов" val={stats.total} color="#F0EDE8" />
        <StatCard icon="🆕" label="Новых" val={stats.new} color="#60A5FA" />
        <StatCard icon="🛵" label="Активных" val={stats.active} color="#FBBF24" />
        <StatCard icon="💰" label="Выручка" val={`${stats.revenue.toLocaleString("ru")} ₽`} color="#22C55E" />
      </div>

      {/* Date Filter */}
      <div className="bg-bg-card border border-border rounded-xl p-4 md:p-5 mb-4">
        <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
          <div className="font-oswald text-sm font-bold text-text tracking-wider">
            📅 ПЕРИОД
          </div>
          {dateFilter.mode !== "all" && (
            <button
              onClick={() => setMode("all")}
              className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer"
            >
              ✕ Сбросить
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-3.5">
          {[
            ["all", "Все время"],
            ["day", "По дню"],
            ["month", "По месяцу"],
          ].map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className="btn-press px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold cursor-pointer transition-all duration-200"
              style={{
                background: dateFilter.mode === mode ? "#FF4500" : "#1C1C1C",
                color: dateFilter.mode === mode ? "#fff" : "#808080",
                border: `1px solid ${dateFilter.mode === mode ? "#FF4500" : "#252525"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {dateFilter.mode === "day" && (
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="date"
              value={dateFilter.date}
              onChange={(e) => setDateFilter((p) => ({ ...p, date: e.target.value }))}
              className="bg-bg-card2 border border-border rounded-lg px-3 py-2 text-text text-sm cursor-pointer"
              style={{
                borderColor: dateFilter.date ? "#FF4500" : "#252525",
              }}
            />
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: "Сегодня", offset: 0 },
                { label: "Вчера", offset: -1 },
                { label: "2 дня назад", offset: -2 },
              ].map(({ label, offset }) => {
                const d = new Date();
                d.setDate(d.getDate() + offset);
                const iso = d.toISOString().slice(0, 10);
                return (
                  <button
                    key={label}
                    onClick={() => setDateFilter((p) => ({ ...p, date: iso }))}
                    className="btn-press px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
                    style={{
                      background:
                        dateFilter.date === iso ? "rgba(255,69,0,0.2)" : "#1C1C1C",
                      color: dateFilter.date === iso ? "#FF4500" : "#808080",
                      border: `1px solid ${dateFilter.date === iso ? "#FF4500" : "#252525"}`,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {dateFilter.date && (
              <div className="text-sm text-muted">
                Найдено:{" "}
                <span className="text-text font-semibold">{filteredOrders.length}</span>{" "}
                заказов
              </div>
            )}
          </div>
        )}

        {dateFilter.mode === "month" && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {availableMonths.length === 0 ? (
                <span className="text-sm text-muted">Нет данных</span>
              ) : (
                availableMonths.map((ym) => {
                  const [year, mon] = ym.split("-");
                  const label = `${MONTH_NAMES_RU[mon]} ${year}`;
                  const count = orders.filter((o) => (o.date || "").startsWith(ym)).length;
                  return (
                    <button
                      key={ym}
                      onClick={() => setDateFilter((p) => ({ ...p, month: ym }))}
                      className="btn-press px-3.5 py-1.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-2"
                      style={{
                        background:
                          dateFilter.month === ym ? "rgba(255,69,0,0.2)" : "#1C1C1C",
                        color: dateFilter.month === ym ? "#FF4500" : "#808080",
                        border: `1px solid ${dateFilter.month === ym ? "#FF4500" : "#252525"}`,
                      }}
                    >
                      {label}
                      <span
                        className="text-[11px] font-bold px-1.5 py-0.5 rounded-[10px]"
                        style={{
                          background:
                            dateFilter.month === ym ? "#FF4500" : "rgba(255,255,255,0.1)",
                          color: "#fff",
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            {dateFilter.month && (
              <div className="text-sm text-muted">
                Найдено:{" "}
                <span className="text-text font-semibold">{filteredOrders.length}</span>{" "}
                заказов
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 items-center scrollbar-none">
        <span className="text-xs font-bold text-muted tracking-wider whitespace-nowrap shrink-0">
          СТАТУС:
        </span>
        {["Все", ...STATUS_LIST].map((s) => {
          const sm = s === "Все" ? null : STATUS_META[s];
          return (
            <button
              key={s}
              onClick={() => setOrderFilter(s)}
              className="btn-press px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap cursor-pointer shrink-0"
              style={{
                background: orderFilter === s ? sm?.bg || "#1C1C1C" : "#1C1C1C",
                color: orderFilter === s ? sm?.color || "#F0EDE8" : "#808080",
                border: `1px solid ${orderFilter === s ? sm?.color || "#FF4500" : "#252525"}`,
              }}
            >
              {s === "Все" ? "Все" : sm?.label || s}
            </button>
          );
        })}
      </div>

      {/* Results summary */}
      {activeFiltersCount > 0 && (
        <div className="text-sm text-muted mb-3.5 px-3.5 py-2 bg-accent/5 border border-accent/12 rounded-lg inline-block">
          🔍 Показано{" "}
          <span className="text-accent font-bold">{filteredOrders.length}</span> из{" "}
          <span className="text-text font-semibold">{orders.length}</span> заказов
        </div>
      )}

      {/* Orders List */}
      <div className="flex flex-col gap-2.5">
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted bg-bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">📭</div>
            <div>Заказов не найдено</div>
            <div className="text-sm mt-2 opacity-60">Попробуйте изменить фильтры</div>
          </div>
        )}
        {filteredOrders.map((order) => {
          const sm = STATUS_META[order.status];
          const isOpen = expandedOrder === order.id;
          return (
            <div
              key={order.id}
              className="bg-bg-card border border-border rounded-xl overflow-hidden transition-all duration-200"
            >
              <div
                className="order-row px-4 md:px-5 py-4 flex items-center gap-3 cursor-pointer transition-colors duration-200 flex-wrap"
                onClick={() => setExpandedOrder(isOpen ? null : order.id)}
              >
                <div
                  className="text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 tracking-wide"
                  style={{
                    background: sm?.bg,
                    color: sm?.color,
                    border: `1px solid rgba(${sm?.color.replace("#", "").match(/.{2}/g).map((h) => parseInt(h, 16)).join(",")},0.3)`,
                  }}
                >
                  {sm?.label}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-text truncate">{order.name}</div>
                  <div className="text-xs text-muted mt-0.5">{order.phone}</div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="font-oswald text-lg font-bold text-accent">
                    {order.total.toLocaleString("ru")} ₽
                  </div>
                  <div className="text-[11px] text-muted">{order.time}</div>
                </div>
                <div
                  className="text-muted text-xl shrink-0 transition-transform duration-250"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                >
                  ⌄
                </div>
              </div>

              {isOpen && (
                <div className="slide-down border-t border-border px-4 md:px-5 py-4 bg-white/[0.015]">
                  <div className="text-xs text-muted mb-2 truncate">📍 {order.address}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <div className="text-xs font-bold text-muted tracking-wider mb-3">
                        СОСТАВ ЗАКАЗА
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm px-2.5 py-1.5 bg-bg-card2 rounded-lg"
                          >
                            <span className="text-text">
                              {item.name} × {item.qty}
                            </span>
                            <span className="text-muted">
                              {(item.price * item.qty).toLocaleString("ru")} ₽
                            </span>
                          </div>
                        ))}
                        {order.promo && (
                          <div className="text-xs text-green-500 px-2.5 py-1">
                            🎟 Промокод: {order.promo}
                          </div>
                        )}
                        {order.comment && (
                          <div className="text-xs text-muted px-2.5 py-1 italic">
                            💬 {order.comment}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-muted tracking-wider mb-3">
                        ИЗМЕНИТЬ СТАТУС
                      </div>
                      <div className="flex flex-col gap-2">
                        {STATUS_LIST.map((s) => {
                          const sm2 = STATUS_META[s];
                          const active = order.status === s;
                          return (
                            <button
                              key={s}
                              onClick={() => changeStatus(order.id, s)}
                              className="btn-press px-3.5 py-2 rounded-lg text-sm font-semibold cursor-pointer text-left"
                              style={{
                                background: active ? sm2.bg : "rgba(255,255,255,0.04)",
                                color: active ? sm2.color : "#808080",
                                border: `1px solid ${active ? sm2.color + "44" : "#252525"}`,
                              }}
                            >
                              {sm2.label} {active && "✓"}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
