import QtyBtn from "./QtyBtn";
import { declQty } from "../../data/constants";

export default function CartSidebar({
  cart, cartCount, cartSubtotal, discount, finalTotal,
  promoInput, setPromoInput, promoMsg, appliedPromo,
  applyPromo, removePromo, updateQty, removeFromCart,
  onClose, onCheckout,
}) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
      />
      <div
        className="cart-slide fixed top-0 right-0 bottom-0 z-[201] w-full sm:w-[440px] max-w-full bg-[#111] border-l border-border flex flex-col overflow-y-auto"
      >
        <div className="px-6 py-5 border-b border-border bg-[#131313] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-oswald text-xl font-bold tracking-wider text-text">
              🛒 КОРЗИНА
            </h2>
            <div className="text-sm text-muted mt-0.5">
              {cartCount} {declQty(cartCount)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/6 border border-border text-muted w-9 h-9 rounded-lg text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-[60px] text-muted">
              <div className="text-5xl mb-4">🍖</div>
              <div className="text-base">Корзина пуста</div>
              <div className="text-sm mt-2 text-muted/60">
                Добавьте что-нибудь вкусное
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-bg-card2 border border-border rounded-xl p-3.5 flex gap-3 items-center"
                >
                  <div className="w-[52px] h-[52px] rounded-lg bg-bg-card3 overflow-hidden shrink-0 relative">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover block"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {item.emoji}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-text mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                    </div>
                    <div className="text-sm text-accent font-oswald font-semibold">
                      {item.price * item.qty} ₽
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <QtyBtn onClick={() => updateQty(item.id, -1)}>−</QtyBtn>
                    <span className="font-bold text-base text-text min-w-5 text-center">
                      {item.qty}
                    </span>
                    <QtyBtn onClick={() => updateQty(item.id, +1)}>+</QtyBtn>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 w-7 h-7 rounded-md cursor-pointer text-sm ml-0.5"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border px-6 py-5 bg-[#131313] shrink-0">
            <div className="mb-4">
              <div className="text-sm font-semibold text-text mb-2">Промокод</div>
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="Введите промокод..."
                    className={`flex-1 bg-bg-card border rounded-lg px-3 py-2.5 text-text text-sm tracking-wider ${
                      promoMsg.text && !promoMsg.ok
                        ? "border-red-500"
                        : "border-border"
                    }`}
                  />
                  <button
                    className="btn-press bg-accent text-white border-0 rounded-lg px-4 py-2.5 font-bold text-sm cursor-pointer shrink-0"
                    onClick={applyPromo}
                  >
                    Применить
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/25 rounded-lg px-3.5 py-2.5">
                  <div className="text-sm text-green-500 font-semibold">
                    ✓ {appliedPromo.code}
                  </div>
                  <button
                    onClick={removePromo}
                    className="bg-none border-0 text-muted cursor-pointer text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
              )}
              {promoMsg.text && (
                <div
                  className={`text-xs mt-1.5 ${
                    promoMsg.ok ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {promoMsg.text}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex justify-between text-sm text-muted">
                <span>Подытог</span>
                <span>{cartSubtotal.toLocaleString("ru")} ₽</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-500">
                  <span>Скидка</span>
                  <span>−{discount.toLocaleString("ru")} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted">
                <span>Доставка</span>
                <span className={finalTotal >= 1500 ? "text-green-500" : "text-muted"}>
                  {finalTotal >= 1500 ? "Бесплатно 🎉" : "от 150 ₽"}
                </span>
              </div>
              <div className="border-t border-border pt-2.5 mt-1 flex justify-between text-base font-bold">
                <span className="text-text">Итого</span>
                <span className="text-accent font-oswald text-xl tracking-wider">
                  {finalTotal.toLocaleString("ru")} ₽
                </span>
              </div>
            </div>

            <button
              className="btn-press w-full bg-gradient-to-br from-accent to-accent2 text-white border-0 rounded-xl py-4 text-base font-bold cursor-pointer tracking-wide shadow-[0_6px_24px_rgba(255,69,0,0.4)]"
              onClick={onCheckout}
            >
              Оформить заказ →
            </button>

            {finalTotal < 1500 && (
              <div className="text-center text-xs text-muted mt-2.5">
                До бесплатной доставки: {(1500 - finalTotal).toLocaleString("ru")} ₽
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
