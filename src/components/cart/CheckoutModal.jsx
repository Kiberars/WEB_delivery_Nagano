import FormField from "../forms/FormField";
import PhoneField from "../forms/PhoneField";
import AddressField from "../forms/AddressField";

export default function CheckoutModal({
  orderForm, setOrderForm, orderErr, setOrderErr,
  cart, finalTotal, discount, appliedPromo,
  onSubmit, onClose, orderSuccess,
}) {
  const set = (k, v) => {
    setOrderForm((p) => ({ ...p, [k]: v }));
    setOrderErr("");
  };

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black/85 z-[400] flex items-center justify-center backdrop-blur-sm">
        <div className="success-pop bg-bg-card border border-green-500/30 rounded-[20px] p-10 md:p-12 text-center max-w-[360px] mx-4">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="font-oswald text-2xl md:text-[28px] font-bold text-green-500 mb-3 tracking-wider">
            ЗАКАЗ ПРИНЯТ!
          </h3>
          <p className="text-muted leading-relaxed text-sm md:text-base">
            Мы уже готовим ваш заказ. Ожидайте звонка для подтверждения.
          </p>
          <div className="mt-5 px-3 py-3 bg-green-500/8 rounded-xl text-green-500 text-sm font-semibold">
            📞 +7 (912) 239-77-05
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="fade-up bg-[#111] border border-border rounded-[18px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 className="font-oswald text-xl font-bold text-text tracking-wider">
            ОФОРМЛЕНИЕ ЗАКАЗА
          </h2>
          <button
            onClick={onClose}
            className="bg-white/6 border border-border text-muted w-9 h-9 rounded-lg cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="bg-bg-card2 rounded-xl p-4 mb-6">
            <div className="font-oswald text-xs text-muted tracking-wider mb-3">
              ВАШ ЗАКАЗ
            </div>
            {cart.map((c) => (
              <div
                key={c.id}
                className="flex justify-between text-sm text-text py-1 border-b border-border/50"
              >
                <span>
                  {c.name} × {c.qty}
                </span>
                <span className="text-muted">
                  {(c.price * c.qty).toLocaleString("ru")} ₽
                </span>
              </div>
            ))}
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-500 pt-2">
                <span>
                  Скидка ({appliedPromo.code})
                </span>
                <span>
                  −{discount.toLocaleString("ru")} ₽
                </span>
              </div>
            )}
            <div className="flex justify-between font-oswald text-lg font-bold text-accent mt-2.5 pt-2.5 border-t border-border">
              <span>ИТОГО</span>
              <span>{finalTotal.toLocaleString("ru")} ₽</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <FormField
              label="Ваше имя *"
              value={orderForm.name}
              onChange={(v) => set("name", v)}
              placeholder="Иван Иванов"
            />
            <PhoneField
              label="Телефон *"
              value={orderForm.phone}
              onChange={(v) => set("phone", v)}
            />
            <AddressField
              label="Адрес доставки *"
              value={orderForm.address}
              onChange={(v) => set("address", v)}
            />
            <div>
              <div className="text-sm font-semibold text-muted mb-1.5 tracking-wide">
                Комментарий к заказу
              </div>
              <textarea
                value={orderForm.comment}
                onChange={(e) => set("comment", e.target.value)}
                placeholder="Оставить у двери, не звонить..."
                rows={3}
                className="w-full bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text text-sm resize-y font-barlow leading-relaxed"
              />
            </div>
          </div>

          {orderErr && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-lg px-3.5 py-2.5 text-red-500 text-sm mt-3">
              ⚠ {orderErr}
            </div>
          )}

          <button
            className="btn-press w-full mt-5 bg-gradient-to-br from-accent to-accent2 text-white border-0 rounded-xl py-4 text-base font-bold cursor-pointer shadow-[0_6px_24px_rgba(255,69,0,0.4)] tracking-wide"
            onClick={onSubmit}
          >
            🔥 Подтвердить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
