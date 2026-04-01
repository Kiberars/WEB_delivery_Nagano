import { useState } from "react";
import AdminTab from "./AdminTab";
import OrdersTab from "./OrdersTab";
import PromosTab from "./PromosTab";
import MenuTab from "./MenuTab";

export default function AdminPanel({
  orders, filteredOrders, orderFilter, setOrderFilter,
  dateFilter, setDateFilter, expandedOrder, setExpandedOrder,
  changeStatus, promos, setPromos, promoForm, setPromoForm,
  addPromo, adminTab, setAdminTab, setPage, menu, setMenu,
}) {
  const orderStats = {
    total: orders.length,
    new: orders.filter((o) => o.status === "Новый").length,
    active: orders.filter((o) => ["Принят", "Передан курьеру"].includes(o.status)).length,
    revenue: orders
      .filter((o) => o.status === "Доставлен")
      .reduce((s, o) => s + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-[#0F0F0F] border-b border-border sticky top-0 z-[50]">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-[#FF8C00] flex items-center justify-center text-xl">
              🔥
            </div>
            <div className="min-w-0">
              <div className="font-oswald text-base font-bold text-text tracking-widest truncate">
                МАНГАЛ ADMIN
              </div>
              <div className="text-[11px] text-muted hidden sm:block">Панель управления</div>
            </div>
          </div>
          <button
            onClick={() => setPage("home")}
            className="btn-press bg-white/6 border border-border text-muted px-3 py-1.5 rounded-lg text-xs cursor-pointer shrink-0"
          >
            ← Сайт
          </button>
        </div>
        <div className="px-4 md:px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
          <AdminTab
            label="📋 Заказы"
            active={adminTab === "orders"}
            onClick={() => setAdminTab("orders")}
            badge={orderStats.new > 0 ? orderStats.new : null}
          />
          <AdminTab
            label="🎟 Промокоды"
            active={adminTab === "promos"}
            onClick={() => setAdminTab("promos")}
          />
          <AdminTab
            label="🍖 Меню"
            active={adminTab === "menu"}
            onClick={() => setAdminTab("menu")}
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-7">
        {adminTab === "orders" && (
          <OrdersTab
            orders={orders}
            filteredOrders={filteredOrders}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            expandedOrder={expandedOrder}
            setExpandedOrder={setExpandedOrder}
            changeStatus={changeStatus}
            stats={orderStats}
          />
        )}
        {adminTab === "promos" && (
          <PromosTab
            promos={promos}
            setPromos={setPromos}
            promoForm={promoForm}
            setPromoForm={setPromoForm}
            addPromo={addPromo}
          />
        )}
        {adminTab === "menu" && (
          <MenuTab menu={menu} setMenu={setMenu} />
        )}
      </div>
    </div>
  );
}
