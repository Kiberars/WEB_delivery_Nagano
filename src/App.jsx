import { useState, useEffect } from "react";

import {
  Header,
  Footer,
  BannerCarousel,
  AboutSection,
  MenuCard,
  CartSidebar,
  CheckoutModal,
  AdminLogin,
  AdminPanel,
} from "./components";

import { CATS, CAT_ICONS, BANNERS, STATUS_LIST, STATUS_META } from "./data/constants";
import { MENU_INIT, INIT_PROMOS, INIT_ORDERS } from "./data/mockData";

export default function App() {
  const [page, setPage] = useState("home");
  const [cat, setCat] = useState("Все");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMsg, setPromoMsg] = useState({ text: "", ok: false });
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [orderErr, setOrderErr] = useState("");
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [promos, setPromos] = useState(INIT_PROMOS);
  const [adminLogin, setAdminLogin] = useState({ user: "", pass: "", err: "" });
  const [adminTab, setAdminTab] = useState("orders");
  const [orderFilter, setOrderFilter] = useState("Все");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [promoForm, setPromoForm] = useState({ code: "", type: "percent", value: "", active: true });
  const [addedItem, setAddedItem] = useState(null);
  const [menu, setMenu] = useState(MENU_INIT);
  const [dateFilter, setDateFilter] = useState({ mode: "all", date: "", month: "" });
  const [lastOrderTime, setLastOrderTime] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartSubtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = appliedPromo
    ? appliedPromo.type === "percent"
      ? Math.min(Math.round(cartSubtotal * appliedPromo.value / 100), cartSubtotal)
      : Math.min(appliedPromo.value, cartSubtotal)
    : 0;
  const finalTotal = Math.max(0, cartSubtotal - discount);

  const addToCart = (item) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === item.id);
      return ex ? prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)) : [...prev, { ...item, qty: 1 }];
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 900);
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const updateQty = (id, d) =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + d) } : c)));

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoMsg({ text: "Введите промокод", ok: false });
      return;
    }
    const found = promos.find((p) => p.code.toUpperCase() === code && p.active);
    if (!found) {
      setPromoMsg({ text: "Промокод не найден или недействителен", ok: false });
      setAppliedPromo(null);
      return;
    }
    setAppliedPromo(found);
    setPromoMsg({ text: `✓ Скидка ${found.type === "percent" ? found.value + "%" : found.value + "₽"} применена!`, ok: true });
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoMsg({ text: "", ok: false });
  };

  const submitOrder = () => {
    const now = Date.now();
    if (now - lastOrderTime < 10000) {
      setOrderErr("Подождите перед следующим заказом");
      return;
    }
    if (!orderForm.name.trim()) { setOrderErr("Введите ваше имя"); return; }
    if (!orderForm.phone.trim()) { setOrderErr("Введите номер телефона"); return; }
    if (orderForm.phone.replace(/\D/g, "").length < 11) { setOrderErr("Введите полный номер телефона (+7 XXX XXX-XX-XX)"); return; }
    if (!orderForm.address.trim()) { setOrderErr("Введите адрес доставки"); return; }
    const timeStr = new Date().toLocaleString("ru", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "long" });
    const dateStr = new Date().toISOString().slice(0, 10);
    const newOrder = {
      id: 1000 + Math.floor(Math.random() * 9000),
      ...orderForm,
      items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price })),
      total: finalTotal,
      status: "Новый",
      promo: appliedPromo?.code || null,
      time: timeStr,
      date: dateStr,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrderTime(now);
    setCart([]);
    setAppliedPromo(null);
    setPromoInput("");
    setPromoMsg({ text: "", ok: false });
    setOrderForm({ name: "", phone: "", address: "", comment: "" });
    setOrderErr("");
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setCheckoutOpen(false);
      setCartOpen(false);
    }, 3500);
  };

  const doAdminLogin = () => {
    if (adminLogin.user === "admin" && adminLogin.pass === "admin") {
      setPage("admin");
      setAdminLogin((p) => ({ ...p, err: "" }));
    } else {
      setAdminLogin((p) => ({ ...p, err: "Неверный логин или пароль" }));
    }
  };

  const changeStatus = (id, status) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const addPromo = () => {
    if (!promoForm.code.trim() || !promoForm.value) return;
    const val = Number(promoForm.value);
    if (promoForm.type === "percent" && (val <= 0 || val > 100)) return;
    if (promoForm.type === "fixed" && val <= 0) return;
    setPromos((prev) => [
      ...prev,
      {
        id: Date.now(),
        code: promoForm.code.toUpperCase(),
        type: promoForm.type,
        value: val,
        active: promoForm.active,
      },
    ]);
    setPromoForm({ code: "", type: "percent", value: "", active: true });
  };

  const filteredMenu = menu.filter((m) => m.available !== false).filter((m) => cat === "Все" || m.cat === cat);
  const filteredOrders = orders.filter((o) => {
    const statusOk = orderFilter === "Все" || o.status === orderFilter;
    const dateOk = (() => {
      if (dateFilter.mode === "all") return true;
      if (dateFilter.mode === "day" && dateFilter.date) return o.date === dateFilter.date;
      if (dateFilter.mode === "month" && dateFilter.month) return (o.date || "").startsWith(dateFilter.month);
      return true;
    })();
    return statusOk && dateOk;
  });

  if (page === "admin-login") return <AdminLogin login={adminLogin} setLogin={setAdminLogin} onLogin={doAdminLogin} setPage={setPage} />;
  if (page === "admin")
    return (
      <AdminPanel
        orders={orders}
        filteredOrders={filteredOrders}
        orderFilter={orderFilter}
        setOrderFilter={setOrderFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        expandedOrder={expandedOrder}
        setExpandedOrder={setExpandedOrder}
        changeStatus={changeStatus}
        promos={promos}
        setPromos={setPromos}
        promoForm={promoForm}
        setPromoForm={setPromoForm}
        addPromo={addPromo}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        setPage={setPage}
        menu={menu}
        setMenu={setMenu}
      />
    );

  return (
    <div className="bg-bg min-h-screen relative overflow-x-hidden">
      <Header cartCount={cartCount} setCartOpen={setCartOpen} setPage={setPage} />
      <BannerCarousel banners={BANNERS} idx={bannerIdx} setIdx={setBannerIdx} />
      <AboutSection />

      <section id="menu" className="pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="font-oswald text-[clamp(28px,5vw,48px)] font-bold tracking-wider text-text">
              НАШЕ <span className="text-accent">МЕНЮ</span>
            </h2>
            <div className="w-[60px] h-[3px] bg-gradient-to-r from-accent to-gold mx-auto mt-3 rounded-sm" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map((c) => (
              <button
                key={c}
                className="cat-btn btn-press flex items-center gap-1.5 px-4 py-2.5 rounded-lg whitespace-nowrap text-sm font-semibold transition-all duration-200 tracking-wide"
                onClick={() => setCat(c)}
                style={{
                  background: cat === c ? "#FF4500" : "#1C1C1C",
                  color: cat === c ? "#fff" : "#808080",
                  border: `1px solid ${cat === c ? "#FF4500" : "#252525"}`,
                }}
              >
                <span>{CAT_ICONS[c]}</span> {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMenu.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} justAdded={addedItem === item.id} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {cartCount > 0 && !cartOpen && (
        <button
          className="btn-press fixed bottom-7 right-7 z-[200] bg-gradient-to-br from-accent to-accent2 text-white border-0 rounded-xl px-5 py-3.5 text-base font-bold flex items-center gap-2.5 shadow-[0_6px_30px_rgba(255,69,0,0.5)] cursor-pointer"
          onClick={() => setCartOpen(true)}
        >
          🛒 Корзина
          <span className="bg-black/30 rounded-lg px-2 py-0.5 text-xs">{cartCount}</span>
          <span className="text-sm">{finalTotal.toLocaleString("ru")} ₽</span>
        </button>
      )}

      {cartOpen && (
        <CartSidebar
          cart={cart}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          discount={discount}
          finalTotal={finalTotal}
          promoInput={promoInput}
          setPromoInput={setPromoInput}
          promoMsg={promoMsg}
          appliedPromo={appliedPromo}
          applyPromo={applyPromo}
          removePromo={removePromo}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          orderErr={orderErr}
          setOrderErr={setOrderErr}
          cart={cart}
          finalTotal={finalTotal}
          discount={discount}
          appliedPromo={appliedPromo}
          onSubmit={submitOrder}
          onClose={() => setCheckoutOpen(false)}
          orderSuccess={orderSuccess}
        />
      )}
    </div>
  );
}
