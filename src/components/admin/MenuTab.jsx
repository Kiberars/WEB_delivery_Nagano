import { useState } from "react";
import { CATS, BADGE_OPTIONS, EMOJI_OPTIONS, INIT_FORM } from "../../data/constants";

export default function MenuTab({ menu, setMenu }) {
  const [catFilter, setCatFilter] = useState("Все");
  const [form, setForm] = useState(INIT_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const setF = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const displayed = catFilter === "Все" ? menu : menu.filter((m) => m.cat === catFilter);

  const saveItem = () => {
    if (!form.name.trim() || !form.price || !form.weight.trim()) return;
    if (editId !== null) {
      setMenu((prev) =>
        prev.map((m) =>
          m.id === editId ? { ...m, ...form, price: Number(form.price) } : m
        )
      );
      setEditId(null);
    } else {
      const maxId = menu.reduce((a, b) => Math.max(a, b.id), 0);
      setMenu((prev) => [
        ...prev,
        { ...form, id: maxId + 1, price: Number(form.price), available: true },
      ]);
    }
    setForm(INIT_FORM);
  };

  const startEdit = (item) => {
    setForm({
      name: item.name,
      cat: item.cat,
      desc: item.desc,
      weight: item.weight,
      price: String(item.price),
      badge: item.badge,
      emoji: item.emoji,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(INIT_FORM);
  };

  const toggleAvailable = (id) =>
    setMenu((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, available: m.available === false ? true : false } : m
      )
    );

  const deleteItem = (id) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
    setConfirmDel(null);
  };

  const inputStyle =
    "w-full bg-bg-card2 border border-border rounded-lg px-3 py-2 text-text text-sm";

  return (
    <div className="fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* LEFT: list */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h3 className="font-oswald text-xl font-bold text-text tracking-wider">
              ПОЗИЦИИ МЕНЮ{" "}
              <span className="text-sm text-muted font-normal">({menu.length})</span>
            </h3>
            <div className="flex gap-1.5 flex-wrap">
              {["Все", ...CATS.filter((c) => c !== "Все")].map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className="btn-press px-3 py-1 rounded-md text-xs font-semibold cursor-pointer"
                  style={{
                    background: catFilter === c ? "#FF4500" : "#1C1C1C",
                    color: catFilter === c ? "#fff" : "#808080",
                    border: `1px solid ${catFilter === c ? "#FF4500" : "#252525"}`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {displayed.map((item) => {
              const unavailable = item.available === false;
              return (
                <div
                  key={item.id}
                  className="bg-bg-card border border-border rounded-xl p-3.5 flex items-center gap-3 transition-opacity duration-200"
                  style={{
                    borderColor: unavailable ? "rgba(37,37,37,0.4)" : "#252525",
                    opacity: unavailable ? 0.5 : 1,
                  }}
                >
                  <div className="text-2xl shrink-0">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-text overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-bold text-accent bg-accent/12 border border-accent/25 rounded-sm px-1.5 py-0.5 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted flex gap-2.5">
                      <span>{item.cat}</span>
                      <span>·</span>
                      <span>{item.weight}</span>
                      <span>·</span>
                      <span className="text-accent font-semibold">{item.price} ₽</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleAvailable(item.id)}
                      className="btn-press w-[34px] h-[34px] rounded-md cursor-pointer text-base"
                      title={unavailable ? "Включить" : "Скрыть"}
                      style={{
                        background: unavailable
                          ? "rgba(34,197,94,0.08)"
                          : "rgba(128,128,128,0.08)",
                        border: `1px solid ${unavailable ? "rgba(34,197,94,0.2)" : "#252525"}`,
                        color: unavailable ? "#22C55E" : "#808080",
                      }}
                    >
                      {unavailable ? "👁" : "🚫"}
                    </button>
                    <button
                      onClick={() => startEdit(item)}
                      className="btn-press w-[34px] h-[34px] rounded-md cursor-pointer text-base bg-blue-500/8 border border-blue-500/20 text-blue-400"
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    {confirmDel === item.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="btn-press px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer bg-red-500/15 border border-red-500/30 text-red-500"
                        >
                          Да
                        </button>
                        <button
                          onClick={() => setConfirmDel(null)}
                          className="btn-press px-2.5 py-1 rounded-md text-xs cursor-pointer bg-bg-card2 border border-border text-muted"
                        >
                          Нет
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDel(item.id)}
                        className="btn-press w-[34px] h-[34px] rounded-md cursor-pointer text-base bg-red-500/8 border border-red-500/20 text-red-500"
                        title="Удалить"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {displayed.length === 0 && (
              <div className="text-center py-10 text-muted bg-bg-card rounded-xl border border-border">
                Нет позиций в этой категории
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: form */}
        <div
          className="bg-bg-card border border-border rounded-xl p-6 sticky top-20 transition-colors duration-300"
          style={{ borderColor: editId ? "#60A5FA" : "#252525" }}
        >
          <h3
            className="font-oswald text-lg font-bold tracking-wider mb-5"
            style={{ color: editId ? "#60A5FA" : "#F0EDE8" }}
          >
            {editId ? "✏️ РЕДАКТИРОВАНИЕ" : "+ НОВАЯ ПОЗИЦИЯ"}
          </h3>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                ЭМОДЗИ
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setF("emoji", e)}
                    className="w-9 h-9 rounded-md text-lg cursor-pointer"
                    style={{
                      background: form.emoji === e ? "rgba(255,69,0,0.2)" : "#1C1C1C",
                      border: `1px solid ${form.emoji === e ? "#FF4500" : "#252525"}`,
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                НАЗВАНИЕ *
              </div>
              <input
                value={form.name}
                onChange={(e) => setF("name", e.target.value)}
                placeholder="Шашлык из..."
                className={inputStyle}
              />
            </div>

            <div>
              <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                КАТЕГОРИЯ
              </div>
              <select
                value={form.cat}
                onChange={(e) => setF("cat", e.target.value)}
                className={inputStyle}
              >
                {CATS.filter((c) => c !== "Все").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                ОПИСАНИЕ
              </div>
              <textarea
                value={form.desc}
                onChange={(e) => setF("desc", e.target.value)}
                placeholder="Вкусное описание блюда..."
                rows={2}
                className={`${inputStyle} resize-y font-barlow leading-relaxed`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                  ВЕС / ОБЪЁМ *
                </div>
                <input
                  value={form.weight}
                  onChange={(e) => setF("weight", e.target.value)}
                  placeholder="300г"
                  className={inputStyle}
                />
              </div>
              <div>
                <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                  ЦЕНА (₽) *
                </div>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setF("price", e.target.value)}
                  placeholder="450"
                  min="1"
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-muted tracking-wider mb-1.5">
                ЗНАЧОК
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BADGE_OPTIONS.map((b) => (
                  <button
                    key={String(b)}
                    onClick={() => setF("badge", b)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer"
                    style={{
                      background: form.badge === b ? "rgba(255,69,0,0.2)" : "#1C1C1C",
                      color: form.badge === b ? "#FF4500" : "#808080",
                      border: `1px solid ${form.badge === b ? "#FF4500" : "#252525"}`,
                    }}
                  >
                    {b === null ? "Нет" : b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-1">
              {editId && (
                <button
                  onClick={cancelEdit}
                  className="btn-press flex-1 py-2.5 rounded-lg text-sm font-semibold cursor-pointer bg-bg-card2 border border-border text-muted"
                >
                  Отмена
                </button>
              )}
              <button
                onClick={saveItem}
                disabled={!form.name.trim() || !form.price || !form.weight.trim()}
                className="btn-press flex-[2] py-2.5 rounded-lg text-sm font-bold cursor-pointer text-white border-0 tracking-wide disabled:opacity-45"
                style={{
                  background: editId
                    ? "linear-gradient(135deg, #60A5FA, #3B82F6)"
                    : "linear-gradient(135deg, #FF4500, #FF6A00)",
                }}
              >
                {editId ? "Сохранить" : "Добавить позицию"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
