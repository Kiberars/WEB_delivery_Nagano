import { useState, useEffect, useRef } from "react";

// ─── GLOBAL CSS ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D0D; font-family: 'Barlow', sans-serif; color: #F0EDE8; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #FF4500; border-radius: 3px; }
  input, select, textarea { outline: none; font-family: 'Barlow', sans-serif; }
  button { cursor: pointer; font-family: 'Barlow', sans-serif; border: none; }
  @keyframes slideInRight { from { transform: translateX(110%); } to { transform: translateX(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes bannerFade { 0%,100% { opacity:0; } 8%,88% { opacity:1; } }
  @keyframes flicker { 0%,100%{opacity:1;} 45%{opacity:.85;} 55%{opacity:1;} 70%{opacity:.92;} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }
  @keyframes successPop { 0%{transform:scale(0.5);opacity:0;} 70%{transform:scale(1.1);} 100%{transform:scale(1);opacity:1;} }
  .cart-slide { animation: slideInRight 0.38s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-up { animation: fadeUp 0.45s ease both; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .flicker { animation: flicker 3s ease-in-out infinite; }
  .spin { animation: spin 1s linear infinite; }
  .slide-down { animation: slideDown 0.3s ease both; }
  .success-pop { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
  .btn-press:active { transform: scale(0.96) !important; }
  .menu-card:hover .card-img-wrap img { transform: scale(1.07); }
  .menu-card:hover .card-img-wrap { transform: scale(1.04); }
  .cat-btn:hover { background: rgba(255,69,0,0.18) !important; }
  .order-row:hover { background: rgba(255,255,255,0.03) !important; }
`;

// ─── COLORS ─────────────────────────────────────────────────
const C = {
  bg: "#0D0D0D", card: "#141414", card2: "#1C1C1C", card3: "#222",
  accent: "#FF4500", accent2: "#FF6A00", gold: "#FFB347",
  text: "#F0EDE8", muted: "#808080", border: "#252525", border2: "#2E2E2E",
  green: "#22C55E", red: "#EF4444", blue: "#60A5FA", yellow: "#FBBF24", purple: "#A78BFA",
};

// ─── DATA ────────────────────────────────────────────────────
const MENU_INIT = [
  // Шашлык
  { id:1, cat:"Шашлык", name:"Шашлык из свинины", desc:"Нежная шейка в авторском маринаде, 6 часов на углях. Подаётся с луком и зеленью", weight:"300г", price:450, badge:"ХИТ", emoji:"🍖", img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80" },
  { id:2, cat:"Шашлык", name:"Шашлык из курицы", desc:"Сочное куриное филе с дымком, маринованное в специях с цитрусовыми нотами", weight:"300г", price:380, badge:null, emoji:"🍗", img:"https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=80" },
  { id:3, cat:"Шашлык", name:"Шашлык из говядины", desc:"Отборная говяжья вырезка с луком и кавказскими специями", weight:"300г", price:520, badge:null, emoji:"🥩", img:"https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80" },
  { id:4, cat:"Шашлык", name:"Шашлык из баранины", desc:"Традиционная баранина на живом огне с маринованным луком", weight:"300г", price:580, badge:null, emoji:"🍖", img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
  { id:5, cat:"Шашлык", name:"Куриные крылья", desc:"Хрустящие крылья с фирменной угольной глазурью", weight:"300г (6 шт)", price:350, badge:"НОВИНКА", emoji:"🍗", img:"https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80" },
  { id:6, cat:"Шашлык", name:"Свиные рёбрышки", desc:"Молодые свиные рёбра, томлёные в маринаде 12 часов", weight:"400г", price:520, badge:null, emoji:"🥩", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" },
  // Люля-кебаб
  { id:7, cat:"Люля-кебаб", name:"Люля из свинины", desc:"Рубленая свинина с луком и свежей зеленью на шампуре", weight:"280г", price:400, badge:"ХИТ", emoji:"🌭", img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80" },
  { id:8, cat:"Люля-кебаб", name:"Люля из курицы", desc:"Нежный куриный фарш с травами, жаренный на углях", weight:"280г", price:350, badge:null, emoji:"🌭", img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80" },
  { id:9, cat:"Люля-кебаб", name:"Люля из говядины", desc:"Говяжий фарш с восточными специями и кинзой", weight:"280г", price:430, badge:null, emoji:"🌭", img:"https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600&q=80" },
  { id:10, cat:"Люля-кебаб", name:"Ассорти люля", desc:"По одному люля из свинины, курицы и говядины — полный набор", weight:"400г", price:490, badge:"ВЫГОДА", emoji:"🌭", img:"https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80" },
  // Шаурма
  { id:11, cat:"Шаурма", name:"Шаурма классическая", desc:"Курица, свежие овощи, чесночный и томатный соусы в лаваше", weight:"400г", price:320, badge:"ХИТ", emoji:"🌯", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" },
  { id:12, cat:"Шаурма", name:"Шаурма мясная", desc:"Свинина с хрустящими овощами и фирменным острым соусом", weight:"420г", price:360, badge:null, emoji:"🌯", img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80" },
  { id:13, cat:"Шаурма", name:"Шаурма XXL", desc:"Двойная порция мяса, двойная начинка — для настоящих голодных", weight:"600г", price:480, badge:"ТОП", emoji:"🌯", img:"https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=600&q=80" },
  { id:14, cat:"Шаурма", name:"Шаурма с говядиной", desc:"Говяжья вырезка с острой аджикой и свежими овощами", weight:"420г", price:400, badge:null, emoji:"🌯", img:"https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=80" },
  // Бургеры
  { id:15, cat:"Бургеры", name:"Бургер «Мангал»", desc:"Говяжья котлета на углях, чеддер, карамельный лук, соус барбекю", weight:"350г", price:380, badge:null, emoji:"🍔", img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
  { id:16, cat:"Бургеры", name:"Бургер «Огонь»", desc:"Двойная котлета, перец халапеньо, айоли, маринованный огурец", weight:"420г", price:450, badge:"ОСТРЫЙ🌶", emoji:"🍔", img:"https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80" },
  { id:17, cat:"Бургеры", name:"Куриный бургер", desc:"Хрустящая курица в кляре, огурчик, горчичный майонез", weight:"320г", price:340, badge:null, emoji:"🍔", img:"https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80" },
  // Хот-доги
  { id:18, cat:"Хот-доги", name:"Хот-дог классический", desc:"Сочная говяжья сосиска, мягкая булочка, кетчуп и горчица", weight:"220г", price:180, badge:null, emoji:"🌭", img:"https://images.unsplash.com/photo-1612392062631-94c18a23aa78?w=600&q=80" },
  { id:19, cat:"Хот-доги", name:"Хот-дог «Чеддер»", desc:"Сосиска с плавленым чеддером, хрустящим луком и соусом", weight:"250г", price:220, badge:null, emoji:"🌭", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  { id:20, cat:"Хот-доги", name:"Хот-дог «Огонь»", desc:"Острая сосиска, jalapeño, острый соус — для смелых", weight:"250г", price:240, badge:"ОСТРЫЙ🌶", emoji:"🌭", img:"https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80" },
  // Гарниры
  { id:21, cat:"Гарниры", name:"Картофель фри", desc:"Хрустящий золотистый картофель с морской солью", weight:"200г", price:180, badge:null, emoji:"🍟", img:"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80" },
  { id:22, cat:"Гарниры", name:"Грибы на мангале", desc:"Шампиньоны с чесноком и зеленью, запечённые на живом угле", weight:"200г", price:280, badge:null, emoji:"🍄", img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { id:23, cat:"Гарниры", name:"Овощи на мангале", desc:"Перец, баклажан, кабачок с оливковым маслом и травами", weight:"250г", price:250, badge:null, emoji:"🥗", img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80" },
  { id:24, cat:"Гарниры", name:"Лаваш армянский", desc:"Тонкий свежеиспечённый армянский лаваш", weight:"100г", price:60, badge:null, emoji:"🫓", img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80" },
  { id:25, cat:"Гарниры", name:"Пахлава", desc:"Восточная сладость — хрустящее тесто с орехами и мёдом", weight:"150г", price:220, badge:null, emoji:"🍯", img:"https://images.unsplash.com/photo-1571042754022-9763dddcb6dd?w=600&q=80" },
  // Напитки
  { id:26, cat:"Напитки", name:"Кока-Кола 0.5л", desc:"Освежающий газированный напиток", weight:"500мл", price:120, badge:null, emoji:"🥤", img:"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80" },
  { id:27, cat:"Напитки", name:"Сок в ассортименте", desc:"Яблоко, апельсин или вишня на выбор", weight:"330мл", price:100, badge:null, emoji:"🧃", img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80" },
  { id:28, cat:"Напитки", name:"Вода негазированная", desc:"Чистая питьевая вода без газа", weight:"500мл", price:80, badge:null, emoji:"💧", img:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80" },
  { id:29, cat:"Напитки", name:"Айран", desc:"Традиционный кисломолочный освежающий напиток", weight:"300мл", price:150, badge:null, emoji:"🥛", img:"https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=600&q=80" },
  { id:30, cat:"Напитки", name:"Чай / Кофе", desc:"Горячий чай с чабрецом или крепкий чёрный кофе", weight:"250мл", price:120, badge:null, emoji:"☕", img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80" },
];

// ─── ADDRESS SUGGESTIONS ─────────────────────────────────────
const ADDRESS_SUGGESTIONS = [
  "ул. Ленина, д. ", "ул. Кирова, д. ", "ул. Суворова, д. ",
  "пр. Победы, д. ", "ул. Октябрьская, д. ", "ул. Строителей, д. ",
  "ул. Молодёжная, д. ", "ул. Мира, д. ", "ул. Советская, д. ",
  "ул. Горького, д. ", "пр. Металлургов, д. ", "ул. Каменская, д. ",
  "ул. Красноармейская, д. ", "ул. Пушкина, д. ", "ул. Чайковского, д. ",
  "ул. Тургенева, д. ", "ул. Гагарина, д. ", "ул. Космонавтов, д. ",
  "б-р. Радищева, д. ", "ул. Уральская, д. ",
];

// ─── DAY CONSTANTS ────────────────────────────────────────────


const CATS = ["Все", "Шашлык", "Люля-кебаб", "Шаурма", "Бургеры", "Хот-доги", "Гарниры", "Напитки"];
const CAT_ICONS = { "Все":"🔥", "Шашлык":"🍖", "Люля-кебаб":"🌭", "Шаурма":"🌯", "Бургеры":"🍔", "Хот-доги":"🌭", "Гарниры":"🍟", "Напитки":"🥤" };

const BANNERS = [
  { id:1, tag:"🔥 Акция", title:"Шашлык по\nцене мяса!", sub:"Покупай мясо у нас — жарим БЕСПЛАТНО", cta:"Выбрать мясо", bg:"radial-gradient(ellipse at 30% 50%, #3D1200 0%, #1A0600 50%, #0D0D0D 100%)" },
  { id:2, tag:"🚗 Доставка", title:"Бесплатная\nдоставка", sub:"При заказе от 1500₽ — доставляем за наш счёт", cta:"Заказать", bg:"radial-gradient(ellipse at 70% 50%, #1A0A2E 0%, #0D0820 50%, #0D0D0D 100%)" },
  { id:3, tag:"🎁 Промокод", title:"МАНГАЛ10\n— скидка 10%", sub:"Введи в корзине при первом заказе", cta:"Применить", bg:"radial-gradient(ellipse at 30% 50%, #0A2010 0%, #051A0A 50%, #0D0D0D 100%)" },
  { id:4, tag:"🥩 Новинка", title:"Ассорти\nна компанию", sub:"Набор шашлыков на 4–5 человек — от 2200₽", cta:"Смотреть", bg:"radial-gradient(ellipse at 60% 40%, #2E1A00 0%, #1A0D00 50%, #0D0D0D 100%)" },
];

const INIT_PROMOS = [
  { id:1, code:"МАНГАЛ10", type:"percent", value:10, active:true },
  { id:2, code:"ПЕРВЫЙ", type:"percent", value:15, active:true },
  { id:3, code:"СКИДКА200", type:"fixed", value:200, active:true },
  { id:4, code:"ЛЕТО30", type:"percent", value:30, active:false },
];

const INIT_ORDERS = [
  { id:1001, name:"Иван Петров", phone:"+7 912 345-67-89", address:"ул. Кирова, 15, кв. 23", comment:"", items:[{name:"Шашлык из свинины",qty:2,price:450},{name:"Картофель фри",qty:1,price:180}], total:1080, status:"Доставлен", promo:null, time:"10:32, 29 марта", date:"2026-03-29" },
  { id:1002, name:"Анна Смирнова", phone:"+7 922 111-22-33", address:"пр. Победы, 88, кв. 5", comment:"Позвонить за 10 минут", items:[{name:"Шаурма XXL",qty:1,price:480},{name:"Кока-Кола 0.5л",qty:2,price:120}], total:720, status:"Новый", promo:null, time:"13:15, 29 марта", date:"2026-03-29" },
  { id:1003, name:"Максим Козлов", phone:"+7 950 444-55-66", address:"ул. Ленина, 45, кв. 12", comment:"", items:[{name:"Шашлык из курицы",qty:3,price:380},{name:"Люля из свинины",qty:1,price:400},{name:"Овощи на мангале",qty:1,price:250}], total:1791, status:"Передан курьеру", promo:"МАНГАЛ10", time:"14:05, 28 марта", date:"2026-03-28" },
  { id:1004, name:"Елена Давыдова", phone:"+7 963 777-88-99", address:"ул. Суворова, 33, кв. 8", comment:"Оставить у двери", items:[{name:"Шаурма классическая",qty:2,price:320},{name:"Бургер «Мангал»",qty:1,price:380}], total:1020, status:"Принят", promo:null, time:"15:20, 27 марта", date:"2026-03-27" },
  { id:1005, name:"Дмитрий Орлов", phone:"+7 900 123-45-67", address:"ул. Молодёжная, 7, кв. 3", comment:"", items:[{name:"Шашлык из баранины",qty:2,price:580},{name:"Айран",qty:2,price:150}], total:1460, status:"Доставлен", promo:null, time:"12:10, 15 марта", date:"2026-03-15" },
  { id:1006, name:"Светлана Попова", phone:"+7 911 987-65-43", address:"пр. Металлургов, 22, кв. 14", comment:"Без лука", items:[{name:"Шаурма классическая",qty:3,price:320}], total:960, status:"Доставлен", promo:"ПЕРВЫЙ", time:"18:40, 10 марта", date:"2026-03-10" },
  { id:1007, name:"Алексей Новиков", phone:"+7 952 333-22-11", address:"ул. Гагарина, 5, кв. 8", comment:"", items:[{name:"Бургер «Огонь»",qty:2,price:450},{name:"Картофель фри",qty:2,price:180}], total:1260, status:"Доставлен", promo:null, time:"20:05, 5 февраля", date:"2026-02-05" },
  { id:1008, name:"Ольга Федорова", phone:"+7 960 444-55-66", address:"ул. Ленина, 88, кв. 2", comment:"", items:[{name:"Люля из свинины",qty:3,price:400}], total:1200, status:"Отменён", promo:null, time:"11:30, 20 января", date:"2026-01-20" },
];

const STATUS_META = {
  "Новый":             { color: C.blue,   bg: "#0F1E35", label: "🆕 Новый" },
  "Принят":            { color: C.green,  bg: "#0F250F", label: "✅ Принят" },
  "Передан курьеру":   { color: C.yellow, bg: "#251E00", label: "🛵 В пути" },
  "Доставлен":         { color: C.purple, bg: "#1A1530", label: "🏠 Доставлен" },
  "Отменён":           { color: C.red,    bg: "#250F0F", label: "❌ Отменён" },
};
const STATUS_LIST = ["Новый","Принят","Передан курьеру","Доставлен","Отменён"];

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]               = useState("home");
  const [cat, setCat]                 = useState("Все");
  const [cart, setCart]               = useState([]);
  const [cartOpen, setCartOpen]       = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [bannerIdx, setBannerIdx]     = useState(0);
  const [promoInput, setPromoInput]   = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMsg, setPromoMsg]       = useState({ text:"", ok:false });
  const [orderForm, setOrderForm]     = useState({ name:"",phone:"",address:"",comment:"" });
  const [orderErr, setOrderErr]       = useState("");
  const [orders, setOrders]           = useState(INIT_ORDERS);
  const [promos, setPromos]           = useState(INIT_PROMOS);
  const [adminLogin, setAdminLogin]   = useState({ user:"", pass:"", err:"" });
  const [adminTab, setAdminTab]       = useState("orders");
  const [orderFilter, setOrderFilter] = useState("Все");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [promoForm, setPromoForm]     = useState({ code:"", type:"percent", value:"", active:true });
  const [addedItem, setAddedItem]     = useState(null);
  const [menu, setMenu]               = useState(MENU_INIT);
  const [dateFilter, setDateFilter]   = useState({ mode:"all", date:"", month:"" });

  // Banner auto-rotate
  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i+1) % BANNERS.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Cart helpers
  const cartCount = cart.reduce((s,c) => s+c.qty, 0);
  const cartSubtotal = cart.reduce((s,c) => s+c.price*c.qty, 0);
  const discount = appliedPromo
    ? appliedPromo.type === "percent"
      ? Math.round(cartSubtotal * appliedPromo.value / 100)
      : Math.min(appliedPromo.value, cartSubtotal)
    : 0;
  const finalTotal = cartSubtotal - discount;

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex ? prev.map(c => c.id===item.id ? {...c,qty:c.qty+1} : c) : [...prev,{...item,qty:1}];
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 900);
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));
  const updateQty = (id, d) => setCart(prev =>
    prev.map(c => c.id===id ? {...c,qty:Math.max(1,c.qty+d)} : c)
  );

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) { setPromoMsg({ text:"Введите промокод", ok:false }); return; }
    const found = promos.find(p => p.code.toUpperCase()===code && p.active);
    if (!found) { setPromoMsg({ text:"Промокод не найден или недействителен", ok:false }); setAppliedPromo(null); return; }
    setAppliedPromo(found);
    setPromoMsg({ text:`✓ Скидка ${found.type==="percent" ? found.value+"%" : found.value+"₽"} применена!`, ok:true });
  };

  const removePromo = () => { setAppliedPromo(null); setPromoInput(""); setPromoMsg({ text:"",ok:false }); };

  const submitOrder = () => {
    if (!orderForm.name.trim()) { setOrderErr("Введите ваше имя"); return; }
    if (!orderForm.phone.trim()) { setOrderErr("Введите номер телефона"); return; }
    if (orderForm.phone.replace(/\D/g,"").length < 11) { setOrderErr("Введите полный номер телефона (+7 XXX XXX-XX-XX)"); return; }
    if (!orderForm.address.trim()) { setOrderErr("Введите адрес доставки"); return; }
    const now = new Date();
    const timeStr = now.toLocaleString("ru",{hour:"2-digit",minute:"2-digit",day:"numeric",month:"long"});
    const dateStr = now.toISOString().slice(0,10); // "YYYY-MM-DD"
    const newOrder = {
      id: 1000 + Math.floor(Math.random()*9000),
      ...orderForm,
      items: cart.map(c => ({name:c.name,qty:c.qty,price:c.price})),
      total: finalTotal,
      status: "Новый",
      promo: appliedPromo?.code || null,
      time: timeStr,
      date: dateStr,
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setAppliedPromo(null);
    setPromoInput("");
    setPromoMsg({text:"",ok:false});
    setOrderForm({name:"",phone:"",address:"",comment:""});
    setOrderErr("");
    setOrderSuccess(true);
    setTimeout(() => { setOrderSuccess(false); setCheckoutOpen(false); setCartOpen(false); }, 3500);
  };

  const doAdminLogin = () => {
    if (adminLogin.user==="admin" && adminLogin.pass==="admin") {
      setPage("admin");
      setAdminLogin(p=>({...p,err:""}));
    } else {
      setAdminLogin(p=>({...p,err:"Неверный логин или пароль"}));
    }
  };

  const changeStatus = (id, status) => setOrders(prev => prev.map(o => o.id===id ? {...o,status} : o));

  const addPromo = () => {
    if (!promoForm.code.trim() || !promoForm.value) return;
    setPromos(prev => [...prev, {
      id: Date.now(), code: promoForm.code.toUpperCase(),
      type: promoForm.type, value: Number(promoForm.value), active: promoForm.active,
    }]);
    setPromoForm({code:"",type:"percent",value:"",active:true});
  };

  const filteredMenu = menu
    .filter(m => m.available !== false)
    .filter(m => cat==="Все" || m.cat===cat);
  const filteredOrders = orders.filter(o => {
    const statusOk = orderFilter==="Все" || o.status===orderFilter;
    const dateOk = (() => {
      if (dateFilter.mode === "all") return true;
      if (dateFilter.mode === "day" && dateFilter.date) return o.date === dateFilter.date;
      if (dateFilter.mode === "month" && dateFilter.month) return (o.date||"").startsWith(dateFilter.month);
      return true;
    })();
    return statusOk && dateOk;
  });

  // ── PAGES ──
  if (page==="admin-login") return (
    <AdminLogin
      login={adminLogin} setLogin={setAdminLogin}
      onLogin={doAdminLogin} setPage={setPage}
    />
  );
  if (page==="admin") return (
    <AdminPanel
      orders={orders} filteredOrders={filteredOrders}
      orderFilter={orderFilter} setOrderFilter={setOrderFilter}
      dateFilter={dateFilter} setDateFilter={setDateFilter}
      expandedOrder={expandedOrder} setExpandedOrder={setExpandedOrder}
      changeStatus={changeStatus}
      promos={promos} setPromos={setPromos}
      promoForm={promoForm} setPromoForm={setPromoForm}
      addPromo={addPromo}
      adminTab={adminTab} setAdminTab={setAdminTab}
      setPage={setPage}
      menu={menu} setMenu={setMenu}
    />
  );

  return (
    <div style={{background:C.bg,minHeight:"100vh",position:"relative"}}>
      <style>{GLOBAL_CSS}</style>

      {/* HEADER */}
      <Header cartCount={cartCount} setCartOpen={setCartOpen} setPage={setPage} />

      {/* BANNER */}
      <BannerCarousel banners={BANNERS} idx={bannerIdx} setIdx={setBannerIdx} />

      {/* ABOUT */}
      <AboutSection />

      {/* MENU */}
      <section id="menu" style={{padding:"0 0 60px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <h2 style={{fontFamily:"Oswald",fontSize:"clamp(28px,5vw,48px)",fontWeight:700,letterSpacing:2,color:C.text}}>
              НАШЕ <span style={{color:C.accent}}>МЕНЮ</span>
            </h2>
            <div style={{width:60,height:3,background:`linear-gradient(90deg,${C.accent},${C.gold})`,margin:"12px auto 0",borderRadius:2}}/>
          </div>

          {/* Category Nav */}
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:12,marginBottom:32,scrollbarWidth:"none"}}>
            {CATS.map(c => (
              <button key={c} className="cat-btn btn-press"
                onClick={() => setCat(c)}
                style={{
                  display:"flex",alignItems:"center",gap:6,
                  padding:"10px 18px",borderRadius:8,whiteSpace:"nowrap",fontSize:14,fontWeight:600,
                  background: cat===c ? C.accent : C.card2,
                  color: cat===c ? "#fff" : C.muted,
                  border: `1px solid ${cat===c ? C.accent : C.border}`,
                  transition:"all 0.2s",letterSpacing:0.5,
                }}>
                <span>{CAT_ICONS[c]}</span> {c}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {filteredMenu.map((item,i) => (
              <MenuCard key={item.id} item={item} idx={i}
                onAdd={() => addToCart(item)}
                justAdded={addedItem===item.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* CART BUTTON (FAB) */}
      {cartCount > 0 && !cartOpen && (
        <button className="btn-press"
          onClick={() => setCartOpen(true)}
          style={{
            position:"fixed",bottom:28,right:28,zIndex:200,
            background:`linear-gradient(135deg,${C.accent},${C.accent2})`,
            color:"#fff",border:"none",borderRadius:16,
            padding:"14px 22px",fontSize:16,fontWeight:700,
            display:"flex",alignItems:"center",gap:10,
            boxShadow:`0 6px 30px rgba(255,69,0,0.5)`,
            cursor:"pointer",fontFamily:"Barlow,sans-serif",
          }}>
          🛒 Корзина
          <span style={{background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"2px 8px",fontSize:13}}>{cartCount}</span>
          <span style={{fontSize:15}}>{finalTotal.toLocaleString("ru")} ₽</span>
        </button>
      )}

      {/* CART SIDEBAR */}
      {cartOpen && (
        <CartSidebar
          cart={cart} cartCount={cartCount} cartSubtotal={cartSubtotal}
          discount={discount} finalTotal={finalTotal}
          promoInput={promoInput} setPromoInput={setPromoInput}
          promoMsg={promoMsg} appliedPromo={appliedPromo}
          applyPromo={applyPromo} removePromo={removePromo}
          updateQty={updateQty} removeFromCart={removeFromCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <CheckoutModal
          orderForm={orderForm} setOrderForm={setOrderForm}
          orderErr={orderErr} setOrderErr={setOrderErr}
          cart={cart} finalTotal={finalTotal}
          discount={discount} appliedPromo={appliedPromo}
          onSubmit={submitOrder} onClose={() => setCheckoutOpen(false)}
          orderSuccess={orderSuccess}
        />
      )}
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────
function Header({ cartCount, setCartOpen, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position:"sticky",top:0,zIndex:100,
      background: scrolled ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,0.85)",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${scrolled ? C.border : "transparent"}`,
      transition:"all 0.3s",
    }}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
          <div style={{
            width:44,height:44,borderRadius:10,
            background:`linear-gradient(135deg,${C.accent},#FF8C00)`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:24,boxShadow:`0 4px 16px rgba(255,69,0,0.4)`,
          }}>🔥</div>
          <div>
            <div style={{fontFamily:"Oswald",fontSize:20,fontWeight:700,letterSpacing:2,color:C.text}}>МАНГАЛ</div>
            <div style={{fontSize:10,color:C.muted,letterSpacing:1.5,marginTop:-2}}>КАМЕНСК-УРАЛЬСКИЙ</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{display:"flex",gap:8,alignItems:"center"}}>
          <NavLink href="#about">О нас</NavLink>
          <NavLink href="#menu">Меню</NavLink>
          <NavLink href="#contacts">Контакты</NavLink>
          <button className="btn-press"
            onClick={() => setPage("admin-login")}
            style={{
              background:"transparent",border:`1px solid ${C.border2}`,
              color:C.muted,padding:"7px 14px",borderRadius:7,fontSize:13,
              fontWeight:500,marginLeft:8,transition:"all 0.2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border2;e.currentTarget.style.color=C.muted;}}
          >Панель</button>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} style={{color:C.muted,textDecoration:"none",fontSize:14,fontWeight:500,padding:"6px 10px",
      borderRadius:6,transition:"all 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.background="rgba(255,255,255,0.06)";}}
      onMouseLeave={e=>{e.currentTarget.style.color=C.muted;e.currentTarget.style.background="transparent";}}
    >{children}</a>
  );
}

// ─── BANNER ──────────────────────────────────────────────────
function BannerCarousel({ banners, idx, setIdx }) {
  const b = banners[idx];
  return (
    <section style={{position:"relative",overflow:"hidden",marginBottom:0}}>
      <div key={idx} style={{
        minHeight:"clamp(240px,40vw,400px)",
        background:b.bg,
        display:"flex",alignItems:"center",
        padding:"40px clamp(20px,5vw,80px)",
        animation:"bannerFade 4.5s ease both",
        position:"relative",
      }}>
        {/* Decorative fire particles */}
        <div style={{position:"absolute",right:"5%",top:"10%",fontSize:"clamp(60px,12vw,160px)",opacity:0.06,
          fontFamily:"sans-serif",userSelect:"none",pointerEvents:"none",lineHeight:1}}>🔥</div>
        <div style={{position:"absolute",right:"18%",bottom:"5%",fontSize:"clamp(40px,8vw,100px)",opacity:0.04,
          fontFamily:"sans-serif",userSelect:"none",pointerEvents:"none"}}>🥩</div>

        <div style={{maxWidth:700,zIndex:1}}>
          <div style={{
            display:"inline-block",padding:"4px 12px",borderRadius:6,
            background:`rgba(255,69,0,0.2)`,border:`1px solid rgba(255,69,0,0.3)`,
            color:C.accent,fontSize:12,fontWeight:700,letterSpacing:1.5,marginBottom:16,
          }}>{b.tag}</div>

          <h1 style={{
            fontFamily:"Oswald",fontSize:"clamp(32px,6vw,72px)",fontWeight:700,
            color:C.text,lineHeight:1.05,letterSpacing:2,marginBottom:16,
            whiteSpace:"pre-line",
          }}>{b.title}</h1>
          <p style={{fontSize:"clamp(14px,2vw,18px)",color:"rgba(240,237,232,0.7)",marginBottom:28,maxWidth:480,lineHeight:1.6}}>
            {b.sub}
          </p>
          <a href="#menu">
            <button className="btn-press" style={{
              background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",
              padding:"13px 28px",borderRadius:10,fontSize:15,fontWeight:700,
              border:"none",cursor:"pointer",letterSpacing:0.5,
              boxShadow:`0 4px 20px rgba(255,69,0,0.4)`,
            }}>{b.cta} →</button>
          </a>
        </div>
      </div>

      {/* Dots */}
      <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:2}}>
        {banners.map((_,i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{
              width: i===idx ? 28 : 8, height:8,borderRadius:4,border:"none",cursor:"pointer",
              background: i===idx ? C.accent : "rgba(255,255,255,0.2)",transition:"all 0.35s",
            }}/>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    { val:"4.3★", label:"Рейтинг 2ГИС" },
    { val:"51+", label:"Отзывов" },
    { val:"9–21", label:"Доставка" },
    { val:"600₽", label:"Средний чек" },
  ];
  const features = [
    { icon:"🔥", title:"Живой огонь", text:"Только настоящие угли — никакого гриля или микроволновки" },
    { icon:"🥩", title:"Свежее мясо", text:"Мясо от проверенных поставщиков, без заморозки" },
    { icon:"🚗", title:"Быстрая доставка", text:"Доставляем горячим по всему Каменску-Уральскому" },
    { icon:"🎉", title:"Банкеты", text:"Принимаем заказы на торжества и корпоративные мероприятия" },
  ];
  return (
    <section id="about" style={{padding:"60px 20px",background:`linear-gradient(180deg, #0D0D0D 0%, #111 100%)`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",marginBottom:48,flexWrap:"wrap"}}>
          <div style={{minWidth:280}}>
            <div style={{color:C.accent,fontSize:13,fontWeight:700,letterSpacing:2,marginBottom:12}}>О НАС</div>
            <h2 style={{fontFamily:"Oswald",fontSize:"clamp(24px,4vw,42px)",fontWeight:700,lineHeight:1.1,marginBottom:20,color:C.text}}>
              Здесь жарят так,<br/><span style={{color:C.accent}}>что забудешь</span><br/>вкус других блюд
            </h2>
            <p style={{color:"rgba(240,237,232,0.65)",lineHeight:1.8,fontSize:15,marginBottom:16}}>
              Кафе «Мангал» — шашлычная с доставкой в Каменске-Уральском. Мы готовим 
              только на живом угле, используем авторские маринады и свежее мясо.
            </p>
            <p style={{color:"rgba(240,237,232,0.65)",lineHeight:1.8,fontSize:15,marginBottom:24}}>
              Наша фишка: <strong style={{color:C.gold}}>покупай мясо у нас — жарим бесплатно!</strong> 
              Идеально для тех, кто хочет настоящего мангального вкуса по цене сырья.
            </p>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <InfoChip icon="📍" text="ул. Ленина, 122" />
              <InfoChip icon="📞" text="+7 (912) 239-77-05" />
              <InfoChip icon="🕐" text="Доставка 9:00–21:00" />
              <InfoChip icon="🌙" text="Кафе — круглосуточно" />
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {features.map(f => (
              <div key={f.title} style={{
                background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
                padding:"20px 16px",transition:"all 0.3s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}
              >
                <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
                <div style={{fontFamily:"Oswald",fontSize:15,fontWeight:600,color:C.text,marginBottom:6,letterSpacing:0.5}}>{f.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,
          background:C.border,borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}`,
        }}>
          {stats.map((s,i) => (
            <div key={i} style={{background:C.card,padding:"24px 20px",textAlign:"center"}}>
              <div style={{fontFamily:"Oswald",fontSize:32,fontWeight:700,color:C.accent,letterSpacing:1}}>{s.val}</div>
              <div style={{fontSize:13,color:C.muted,marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoChip({ icon, text }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,background:C.card2,
      padding:"7px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,color:C.muted}}>
      <span>{icon}</span>{text}
    </div>
  );
}

// ─── MENU CARD ───────────────────────────────────────────────
function MenuCard({ item, onAdd, justAdded }) {
  const BADGE_COLOR = {
    "ХИТ":{ bg:"rgba(255,69,0,0.2)",color:C.accent,border:C.accent },
    "НОВИНКА":{ bg:"rgba(34,197,94,0.15)",color:C.green,border:C.green },
    "ТОП":{ bg:"rgba(167,139,250,0.15)",color:C.purple,border:C.purple },
    "ВЫГОДА":{ bg:"rgba(251,191,36,0.15)",color:C.yellow,border:C.yellow },
    "ОСТРЫЙ🌶":{ bg:"rgba(239,68,68,0.15)",color:C.red,border:C.red },
    "ТОП":{ bg:"rgba(167,139,250,0.15)",color:C.purple,border:C.purple },
  };
  const bc = item.badge ? BADGE_COLOR[item.badge] || BADGE_COLOR["ХИТ"] : null;

  return (
    <div className="menu-card fade-up" style={{
      background:C.card,border:`1px solid ${C.border}`,borderRadius:14,
      overflow:"hidden",display:"flex",flexDirection:"column",
      transition:"all 0.3s",cursor:"default",
      animationDelay:`${(item.id % 6) * 0.05}s`,
    }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 32px rgba(255,69,0,0.12)`;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
    >
      {/* Product photo */}
      <div className="card-img-wrap" style={{
        height:180,position:"relative",overflow:"hidden",
        transition:"transform 0.4s ease",flexShrink:0,background:"#1A1A1A",
      }}>
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            style={{
              width:"100%",height:"100%",objectFit:"cover",
              display:"block",transition:"transform 0.4s ease",
            }}
            onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextSibling.style.display="flex";}}
          />
        ) : null}
        {/* Fallback emoji */}
        <div style={{
          display: item.img ? "none" : "flex",
          position:"absolute",inset:0,
          alignItems:"center",justifyContent:"center",
          fontSize:64,background:`linear-gradient(135deg,#1A1A1A,#222)`,
        }}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 80%, rgba(255,69,0,0.08),transparent 70%)`}}/>
          {item.emoji}
        </div>
        {/* Gradient overlay for depth */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,
          background:"linear-gradient(to top, rgba(20,20,20,0.7), transparent)",pointerEvents:"none"}}/>
        {item.badge && bc && (
          <div style={{
            position:"absolute",top:10,left:10,
            background:bc.bg,color:bc.color,border:`1px solid ${bc.border}`,
            fontSize:10,fontWeight:700,letterSpacing:1,padding:"3px 8px",borderRadius:5,
            backdropFilter:"blur(4px)",
          }}>{item.badge}</div>
        )}
      </div>

      <div style={{padding:"16px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1}}>
          <h3 style={{fontFamily:"Oswald",fontSize:17,fontWeight:600,color:C.text,marginBottom:6,letterSpacing:0.5}}>{item.name}</h3>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.55,marginBottom:12}}>{item.desc}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto"}}>
          <div>
            <div style={{fontFamily:"Oswald",fontSize:22,fontWeight:700,color:C.accent}}>{item.price} <span style={{fontSize:16}}>₽</span></div>
            <div style={{fontSize:11,color:"rgba(128,128,128,0.7)",marginTop:1}}>{item.weight}</div>
          </div>
          <button className="btn-press" onClick={onAdd} style={{
            background: justAdded ? C.green : `linear-gradient(135deg,${C.accent},${C.accent2})`,
            color:"#fff",border:"none",borderRadius:10,
            width:44,height:44,fontSize:20,cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
            transition:"all 0.2s",boxShadow: justAdded ? `0 4px 16px rgba(34,197,94,0.4)` : `0 4px 16px rgba(255,69,0,0.3)`,
            flexShrink:0,
          }}>{justAdded ? "✓" : "+"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── CART SIDEBAR ─────────────────────────────────────────────
function CartSidebar({ cart, cartCount, cartSubtotal, discount, finalTotal, promoInput, setPromoInput, promoMsg, appliedPromo, applyPromo, removePromo, updateQty, removeFromCart, onClose, onCheckout }) {
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,backdropFilter:"blur(2px)"}} />

      {/* Sidebar */}
      <div className="cart-slide" style={{
        position:"fixed",top:0,right:0,bottom:0,zIndex:201,
        width:"min(440px,100vw)",background:"#111",
        borderLeft:`1px solid ${C.border}`,
        display:"flex",flexDirection:"column",overflowY:"auto",
      }}>
        {/* Header */}
        <div style={{
          padding:"20px 24px",borderBottom:`1px solid ${C.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:"#131313",flexShrink:0,
        }}>
          <div>
            <h2 style={{fontFamily:"Oswald",fontSize:22,fontWeight:700,letterSpacing:1,color:C.text}}>
              🛒 КОРЗИНА
            </h2>
            <div style={{fontSize:13,color:C.muted,marginTop:2}}>{cartCount} {declQty(cartCount)}</div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,
            color:C.muted,width:36,height:36,borderRadius:8,fontSize:18,cursor:"pointer",
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {cart.length === 0 ? (
            <div style={{textAlign:"center",padding:"60px 0",color:C.muted}}>
              <div style={{fontSize:48,marginBottom:16}}>🍖</div>
              <div style={{fontSize:16,color:C.muted}}>Корзина пуста</div>
              <div style={{fontSize:13,marginTop:8,color:"rgba(128,128,128,0.6)"}}>Добавьте что-нибудь вкусное</div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {cart.map(item => (
                <div key={item.id} style={{
                  background:C.card2,border:`1px solid ${C.border}`,borderRadius:12,
                  padding:"14px",display:"flex",gap:12,alignItems:"center",
                }}>
                  <div style={{
                    width:52,height:52,borderRadius:8,background:C.card3,
                    overflow:"hidden",flexShrink:0,position:"relative",
                  }}>
                    {item.img
                      ? <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                      : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{item.emoji}</div>
                    }
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:14,color:C.text,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                    <div style={{fontSize:13,color:C.accent,fontFamily:"Oswald",fontWeight:600}}>{item.price*item.qty} ₽</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                    <QtyBtn onClick={() => updateQty(item.id,-1)}>−</QtyBtn>
                    <span style={{fontWeight:700,fontSize:15,color:C.text,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                    <QtyBtn onClick={() => updateQty(item.id,+1)}>+</QtyBtn>
                    <button onClick={() => removeFromCart(item.id)} style={{
                      background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",
                      color:C.red,width:28,height:28,borderRadius:6,cursor:"pointer",fontSize:13,marginLeft:2,
                    }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promo + Total + CTA */}
        {cart.length > 0 && (
          <div style={{borderTop:`1px solid ${C.border}`,padding:"20px 24px",background:"#131313",flexShrink:0}}>
            {/* Promo */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Промокод</div>
              {!appliedPromo ? (
                <div style={{display:"flex",gap:8}}>
                  <input value={promoInput} onChange={e=>setPromoInput(e.target.value.toUpperCase())}
                    onKeyDown={e=>e.key==="Enter" && applyPromo()}
                    placeholder="Введите промокод..."
                    style={{
                      flex:1,background:C.card,border:`1px solid ${promoMsg.text && !promoMsg.ok ? C.red : C.border}`,
                      borderRadius:8,padding:"10px 12px",color:C.text,fontSize:14,letterSpacing:1,
                    }}/>
                  <button className="btn-press" onClick={applyPromo} style={{
                    background:C.accent,color:"#fff",border:"none",borderRadius:8,
                    padding:"10px 16px",fontWeight:700,fontSize:14,cursor:"pointer",flexShrink:0,
                  }}>Применить</button>
                </div>
              ) : (
                <div style={{
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",
                  borderRadius:8,padding:"10px 14px",
                }}>
                  <div style={{fontSize:14,color:C.green,fontWeight:600}}>✓ {appliedPromo.code}</div>
                  <button onClick={removePromo} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
                </div>
              )}
              {promoMsg.text && (
                <div style={{fontSize:12,marginTop:6,color:promoMsg.ok ? C.green : C.red}}>{promoMsg.text}</div>
              )}
            </div>

            {/* Totals */}
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:C.muted}}>
                <span>Подытог</span><span>{cartSubtotal.toLocaleString("ru")} ₽</span>
              </div>
              {discount > 0 && (
                <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:C.green}}>
                  <span>Скидка</span><span>−{discount.toLocaleString("ru")} ₽</span>
                </div>
              )}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:C.muted}}>
                <span>Доставка</span>
                <span style={{color: finalTotal>=1500 ? C.green : C.muted}}>
                  {finalTotal >= 1500 ? "Бесплатно 🎉" : "от 150 ₽"}
                </span>
              </div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:4,
                display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:700}}>
                <span style={{color:C.text}}>Итого</span>
                <span style={{color:C.accent,fontFamily:"Oswald",fontSize:22,letterSpacing:1}}>{finalTotal.toLocaleString("ru")} ₽</span>
              </div>
            </div>

            <button className="btn-press" onClick={onCheckout} style={{
              width:"100%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,
              color:"#fff",border:"none",borderRadius:12,padding:"15px",
              fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:0.5,
              boxShadow:`0 6px 24px rgba(255,69,0,0.4)`,
            }}>Оформить заказ →</button>

            {finalTotal < 1500 && (
              <div style={{textAlign:"center",fontSize:12,color:C.muted,marginTop:10}}>
                До бесплатной доставки: {(1500-finalTotal).toLocaleString("ru")} ₽
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function QtyBtn({ children, onClick }) {
  return (
    <button className="btn-press" onClick={onClick} style={{
      width:28,height:28,borderRadius:6,
      background:"rgba(255,255,255,0.08)",border:`1px solid ${C.border}`,
      color:C.text,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,
    }}>{children}</button>
  );
}

// ─── CHECKOUT MODAL ──────────────────────────────────────────
function CheckoutModal({ orderForm, setOrderForm, orderErr, setOrderErr, cart, finalTotal, discount, appliedPromo, onSubmit, onClose, orderSuccess }) {
  const set = (k,v) => { setOrderForm(p=>({...p,[k]:v})); setOrderErr(""); };

  if (orderSuccess) return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div className="success-pop" style={{
        background:C.card,border:`1px solid rgba(34,197,94,0.3)`,borderRadius:20,
        padding:"48px 40px",textAlign:"center",maxWidth:360,
      }}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <h3 style={{fontFamily:"Oswald",fontSize:28,fontWeight:700,color:C.green,marginBottom:12,letterSpacing:1}}>ЗАКАЗ ПРИНЯТ!</h3>
        <p style={{color:C.muted,lineHeight:1.6,fontSize:15}}>Мы уже готовим ваш заказ. Ожидайте звонка для подтверждения.</p>
        <div style={{marginTop:20,padding:"12px",background:"rgba(34,197,94,0.08)",borderRadius:10,
          color:C.green,fontSize:14,fontWeight:600}}>📞 +7 (912) 239-77-05</div>
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:300,
      display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)",
      padding:16,overflowY:"auto"}}
      onClick={e=>e.target===e.currentTarget && onClose()}
    >
      <div className="fade-up" style={{
        background:"#111",border:`1px solid ${C.border}`,borderRadius:18,
        width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",
      }}>
        <div style={{padding:"24px",borderBottom:`1px solid ${C.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style={{fontFamily:"Oswald",fontSize:22,fontWeight:700,color:C.text,letterSpacing:1}}>ОФОРМЛЕНИЕ ЗАКАЗА</h2>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,
            color:C.muted,width:36,height:36,borderRadius:8,cursor:"pointer",fontSize:18}}>✕</button>
        </div>

        <div style={{padding:"24px"}}>
          {/* Order Summary */}
          <div style={{background:C.card2,borderRadius:12,padding:"16px",marginBottom:24}}>
            <div style={{fontFamily:"Oswald",fontSize:14,color:C.muted,letterSpacing:1,marginBottom:12}}>ВАШ ЗАКАЗ</div>
            {cart.map(c => (
              <div key={c.id} style={{display:"flex",justifyContent:"space-between",fontSize:14,
                color:C.text,padding:"4px 0",borderBottom:`1px solid rgba(37,37,37,0.5)`}}>
                <span>{c.name} × {c.qty}</span>
                <span style={{color:C.muted}}>{(c.price*c.qty).toLocaleString("ru")} ₽</span>
              </div>
            ))}
            {discount > 0 && (
              <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:C.green,paddingTop:8}}>
                <span>Скидка ({appliedPromo.code})</span><span>−{discount.toLocaleString("ru")} ₽</span>
              </div>
            )}
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"Oswald",fontSize:18,
              fontWeight:700,color:C.accent,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
              <span>ИТОГО</span><span>{finalTotal.toLocaleString("ru")} ₽</span>
            </div>
          </div>

          {/* Form */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <FormField label="Ваше имя *" value={orderForm.name} onChange={v=>set("name",v)} placeholder="Иван Иванов" />
            <PhoneField label="Телефон *" value={orderForm.phone} onChange={v=>set("phone",v)} />
            <AddressField label="Адрес доставки *" value={orderForm.address} onChange={v=>set("address",v)} />
            <div>
              <div style={{fontSize:13,fontWeight:600,color:C.muted,marginBottom:6,letterSpacing:0.5}}>Комментарий к заказу</div>
              <textarea value={orderForm.comment} onChange={e=>set("comment",e.target.value)}
                placeholder="Оставить у двери, не звонить..."
                rows={3} style={{
                  width:"100%",background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:8,padding:"10px 12px",color:C.text,fontSize:14,resize:"vertical",
                  fontFamily:"Barlow,sans-serif",lineHeight:1.5,
                }}/>
            </div>
          </div>

          {orderErr && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",
              borderRadius:8,padding:"10px 14px",color:C.red,fontSize:14,marginTop:12}}>
              ⚠ {orderErr}
            </div>
          )}

          <button className="btn-press" onClick={onSubmit} style={{
            width:"100%",marginTop:20,
            background:`linear-gradient(135deg,${C.accent},${C.accent2})`,
            color:"#fff",border:"none",borderRadius:12,padding:"16px",
            fontSize:16,fontWeight:700,cursor:"pointer",
            boxShadow:`0 6px 24px rgba(255,69,0,0.4)`,letterSpacing:0.5,
          }}>🔥 Подтвердить заказ</button>
        </div>
      </div>
    </div>
  );
}

// ─── PHONE FIELD ─────────────────────────────────────────────
function PhoneField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (raw) => {
    // Strip everything except digits
    const digits = raw.replace(/\D/g, "");
    // Normalise: if starts with 8 treat as 7, prepend 7 if nothing yet
    let d = digits;
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (d.length > 11) d = d.slice(0, 11);

    // Build mask: +7 (XXX) XXX-XX-XX
    let out = "";
    if (d.length > 0) out = "+7";
    if (d.length > 1) out += " (" + d.slice(1, 4);
    if (d.length >= 4) out += ")";
    if (d.length > 4) out += " " + d.slice(4, 7);
    if (d.length > 7) out += "-" + d.slice(7, 9);
    if (d.length > 9) out += "-" + d.slice(9, 11);
    return out;
  };

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
    // Validate
    const digits = formatted.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 11) {
      setError("Введите полный номер телефона");
    } else {
      setError("");
    }
  };

  const isValid = value.replace(/\D/g, "").length === 11;
  const isEmpty = value.replace(/\D/g, "").length === 0;
  const borderColor = focused ? (error ? C.red : C.accent) : (error ? C.red : C.border);

  return (
    <div>
      <div style={{fontSize:13,fontWeight:600,color:C.muted,marginBottom:6,letterSpacing:0.5}}>{label}</div>
      <div style={{position:"relative"}}>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setFocused(true);
            if (!value) onChange("+7 (");
          }}
          onBlur={() => {
            setFocused(false);
            if (value === "+7 (" || value === "+7") onChange("");
          }}
          placeholder="+7 (___) ___-__-__"
          maxLength={18}
          style={{
            width:"100%",background:C.card,
            border:`1px solid ${borderColor}`,
            borderRadius:8,padding:"10px 40px 10px 14px",color:C.text,fontSize:14,
            transition:"border-color 0.2s",letterSpacing:0.5,
          }}
        />
        <div style={{
          position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
          fontSize:16,transition:"opacity 0.2s",
          opacity: isEmpty ? 0 : 1,
        }}>
          {isValid ? "✅" : (error ? "❌" : "📞")}
        </div>
      </div>
      {error && (
        <div style={{fontSize:12,color:C.red,marginTop:5}}>⚠ {error}</div>
      )}
    </div>
  );
}

// ─── ADDRESS FIELD ────────────────────────────────────────────
function AddressField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const suggestions = value.length >= 2
    ? ADDRESS_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : ADDRESS_SUGGESTIONS.slice(0, 6);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{position:"relative"}}>
      <div style={{fontSize:13,fontWeight:600,color:C.muted,marginBottom:6,letterSpacing:0.5}}>{label}</div>
      <input
        value={value}
        onChange={e => { onChange(e.target.value); setShowDropdown(true); }}
        onFocus={() => { setFocused(true); setShowDropdown(true); }}
        onBlur={() => setFocused(false)}
        placeholder="Начните вводить улицу..."
        style={{
          width:"100%",background:C.card,
          border:`1px solid ${focused ? C.accent : C.border}`,
          borderRadius: showDropdown && suggestions.length > 0 ? "8px 8px 0 0" : "8px",
          padding:"10px 14px",color:C.text,fontSize:14,
          transition:"border-color 0.2s",
        }}
      />
      {showDropdown && suggestions.length > 0 && (
        <div style={{
          position:"absolute",top:"100%",left:0,right:0,zIndex:500,
          background:"#1A1A1A",border:`1px solid ${C.accent}`,borderTop:"none",
          borderRadius:"0 0 8px 8px",overflow:"hidden",
          boxShadow:"0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {suggestions.map((s, i) => (
            <div key={i}
              onMouseDown={e => { e.preventDefault(); onChange(s); setShowDropdown(false); }}
              style={{
                padding:"10px 14px",fontSize:14,color:C.muted,cursor:"pointer",
                borderBottom: i < suggestions.length-1 ? `1px solid ${C.border}` : "none",
                display:"flex",alignItems:"center",gap:8,
                transition:"background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,69,0,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{color:C.accent,flexShrink:0}}>📍</span>
              <span>
                <span style={{color:C.text}}>{s}</span>
                <span style={{color:"rgba(128,128,128,0.5)",fontSize:12}}> кв. ___</span>
              </span>
            </div>
          ))}
          <div style={{padding:"7px 14px",fontSize:11,color:"rgba(128,128,128,0.4)",
            borderTop:`1px solid ${C.border}`,background:"rgba(0,0,0,0.2)"}}>
            📌 Каменск-Уральский
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type="text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div style={{fontSize:13,fontWeight:600,color:C.muted,marginBottom:6,letterSpacing:0.5}}>{label}</div>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{
          width:"100%",background:C.card,
          border:`1px solid ${focused ? C.accent : C.border}`,
          borderRadius:8,padding:"10px 14px",color:C.text,fontSize:14,
          transition:"border-color 0.2s",
        }}/>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contacts" style={{background:"#0A0A0A",borderTop:`1px solid ${C.border}`,padding:"40px 20px 30px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:32,marginBottom:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.accent},#FF8C00)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔥</div>
              <div style={{fontFamily:"Oswald",fontSize:18,fontWeight:700,color:C.text,letterSpacing:2}}>МАНГАЛ</div>
            </div>
            <p style={{fontSize:13,color:C.muted,lineHeight:1.7}}>Шашлычная с доставкой в Каменске-Уральском. Только живой огонь, только свежее мясо.</p>
          </div>
          <div>
            <div style={{fontFamily:"Oswald",fontSize:14,fontWeight:600,color:C.text,letterSpacing:1.5,marginBottom:14}}>КОНТАКТЫ</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <FooterLink icon="📍" text="ул. Ленина, 122, Каменск-Уральский" />
              <FooterLink icon="📞" text="+7 (912) 239-77-05" />
              <FooterLink icon="🌐" text="мангал-каменск.рф" />
            </div>
          </div>
          <div>
            <div style={{fontFamily:"Oswald",fontSize:14,fontWeight:600,color:C.text,letterSpacing:1.5,marginBottom:14}}>РЕЖИМ РАБОТЫ</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <WorkRow label="Кафе" val="Круглосуточно" />
              <WorkRow label="Доставка" val="9:00 — 21:00" />
              <WorkRow label="Телефон" val="Пн–Вс, 9:00–21:00" />
            </div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{fontSize:13,color:"rgba(128,128,128,0.5)"}}>© 2025 Кафе Мангал. Все права защищены.</div>
          <div style={{fontSize:13,color:"rgba(128,128,128,0.4)"}}>Сделано с 🔥</div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ icon, text }) {
  return (
    <div style={{display:"flex",gap:8,fontSize:13,color:C.muted,alignItems:"flex-start"}}>
      <span style={{flexShrink:0}}>{icon}</span><span>{text}</span>
    </div>
  );
}
function WorkRow({ label, val }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
      <span style={{color:C.muted}}>{label}</span>
      <span style={{color:C.text,fontWeight:500}}>{val}</span>
    </div>
  );
}

// ─── ADMIN LOGIN ──────────────────────────────────────────────
function AdminLogin({ login, setLogin, onLogin, setPage }) {
  const set = (k,v) => setLogin(p=>({...p,[k]:v,[k==="err"?"":"err"]:""}));
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{GLOBAL_CSS}</style>
      <div className="fade-up" style={{
        background:"#111",border:`1px solid ${C.border}`,borderRadius:20,
        padding:"40px 36px",width:"100%",maxWidth:400,
      }}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:12}}>🔐</div>
          <h1 style={{fontFamily:"Oswald",fontSize:28,fontWeight:700,color:C.text,letterSpacing:2}}>ПАНЕЛЬ МАНГАЛ</h1>
          <p style={{fontSize:14,color:C.muted,marginTop:6}}>Административный вход</p>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,letterSpacing:1,marginBottom:6}}>ЛОГИН</div>
            <input value={login.user} onChange={e=>set("user",e.target.value)}
              placeholder="admin" style={{
                width:"100%",background:C.card,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"12px 14px",color:C.text,fontSize:15,
              }}/>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.muted,letterSpacing:1,marginBottom:6}}>ПАРОЛЬ</div>
            <input type="password" value={login.pass} onChange={e=>set("pass",e.target.value)}
              onKeyDown={e=>e.key==="Enter" && onLogin()}
              placeholder="••••••" style={{
                width:"100%",background:C.card,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"12px 14px",color:C.text,fontSize:15,
              }}/>
          </div>

          {login.err && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",
              borderRadius:8,padding:"10px 14px",color:C.red,fontSize:13,textAlign:"center"}}>
              ⚠ {login.err}
            </div>
          )}

          <button className="btn-press" onClick={onLogin} style={{
            background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",
            border:"none",borderRadius:10,padding:"14px",fontSize:16,fontWeight:700,cursor:"pointer",
            boxShadow:`0 4px 20px rgba(255,69,0,0.35)`,marginTop:4,letterSpacing:0.5,
          }}>Войти</button>
        </div>

        <div style={{textAlign:"center",marginTop:20}}>
          <button onClick={() => setPage("home")} style={{
            background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,
          }}>← Вернуться на сайт</button>
        </div>
        <div style={{textAlign:"center",marginTop:12,fontSize:12,color:"rgba(128,128,128,0.4)"}}>
          Логин: admin / Пароль: admin
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────
function AdminPanel({ orders, filteredOrders, orderFilter, setOrderFilter, dateFilter, setDateFilter, expandedOrder, setExpandedOrder, changeStatus, promos, setPromos, promoForm, setPromoForm, addPromo, adminTab, setAdminTab, setPage, menu, setMenu }) {
  const orderStats = {
    total: orders.length,
    new: orders.filter(o=>o.status==="Новый").length,
    active: orders.filter(o=>["Принят","Передан курьеру"].includes(o.status)).length,
    revenue: orders.filter(o=>o.status==="Доставлен").reduce((s,o)=>s+o.total,0),
  };

  return (
    <div style={{minHeight:"100vh",background:C.bg}}>
      <style>{GLOBAL_CSS}</style>

      {/* Admin Header */}
      <div style={{
        background:"#0F0F0F",borderBottom:`1px solid ${C.border}`,
        padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",
        position:"sticky",top:0,zIndex:50,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${C.accent},#FF8C00)`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔥</div>
          <div>
            <div style={{fontFamily:"Oswald",fontSize:16,fontWeight:700,color:C.text,letterSpacing:1.5}}>МАНГАЛ ADMIN</div>
            <div style={{fontSize:11,color:C.muted}}>Панель управления</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <AdminTab label="📋 Заказы" active={adminTab==="orders"} onClick={()=>setAdminTab("orders")}
            badge={orderStats.new > 0 ? orderStats.new : null}/>
          <AdminTab label="🎟 Промокоды" active={adminTab==="promos"} onClick={()=>setAdminTab("promos")}/>
          <AdminTab label="🍖 Меню" active={adminTab==="menu"} onClick={()=>setAdminTab("menu")}/>
          <button onClick={()=>setPage("home")} className="btn-press" style={{
            background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,
            color:C.muted,padding:"7px 14px",borderRadius:8,fontSize:13,cursor:"pointer",marginLeft:8,
          }}>← Сайт</button>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 24px"}}>
        {adminTab === "orders" && (
          <OrdersTab orders={orders} filteredOrders={filteredOrders}
            orderFilter={orderFilter} setOrderFilter={setOrderFilter}
            dateFilter={dateFilter} setDateFilter={setDateFilter}
            expandedOrder={expandedOrder} setExpandedOrder={setExpandedOrder}
            changeStatus={changeStatus} stats={orderStats}
          />
        )}
        {adminTab === "promos" && (
          <PromosTab promos={promos} setPromos={setPromos}
            promoForm={promoForm} setPromoForm={setPromoForm} addPromo={addPromo}
          />
        )}
        {adminTab === "menu" && (
          <MenuTab menu={menu} setMenu={setMenu} />
        )}
      </div>
    </div>
  );
}

function AdminTab({ label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className="btn-press" style={{
      padding:"8px 16px",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",
      background: active ? C.accent : "rgba(255,255,255,0.06)",
      color: active ? "#fff" : C.muted,
      border: `1px solid ${active ? C.accent : C.border}`,
      position:"relative",display:"flex",alignItems:"center",gap:6,
    }}>
      {label}
      {badge && (
        <span style={{
          background: active ? "rgba(0,0,0,0.3)" : C.red,color:"#fff",
          borderRadius:10,fontSize:11,fontWeight:700,padding:"1px 6px",
        }}>{badge}</span>
      )}
    </button>
  );
}

// ─── ORDERS TAB ──────────────────────────────────────────────
function OrdersTab({ orders, filteredOrders, orderFilter, setOrderFilter, dateFilter, setDateFilter, expandedOrder, setExpandedOrder, changeStatus, stats }) {
  // Derive available months from all orders for the month picker
  const availableMonths = [...new Set(orders.map(o => (o.date||"").slice(0,7)).filter(Boolean))].sort().reverse();
  const MONTH_NAMES_RU = { "01":"Январь","02":"Февраль","03":"Март","04":"Апрель","05":"Май","06":"Июнь","07":"Июль","08":"Август","09":"Сентябрь","10":"Октябрь","11":"Ноябрь","12":"Декабрь" };

  const setMode = (mode) => setDateFilter({ mode, date:"", month:"" });

  const activeFiltersCount = (orderFilter !== "Все" ? 1 : 0) + (dateFilter.mode !== "all" ? 1 : 0);

  return (
    <div className="fade-up">
      {/* Stats Row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
        <StatCard icon="📋" label="Всего заказов" val={stats.total} color={C.text} />
        <StatCard icon="🆕" label="Новых" val={stats.new} color={C.blue} />
        <StatCard icon="🛵" label="Активных" val={stats.active} color={C.yellow} />
        <StatCard icon="💰" label="Выручка" val={stats.revenue.toLocaleString("ru")+" ₽"} color={C.green} />
      </div>

      {/* ── DATE FILTER BLOCK ── */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
          <div style={{fontFamily:"Oswald",fontSize:14,fontWeight:700,color:C.text,letterSpacing:1}}>
            📅 ПЕРИОД
          </div>
          {dateFilter.mode !== "all" && (
            <button onClick={()=>setMode("all")} style={{
              background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",
              color:C.red,borderRadius:6,padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer",
            }}>✕ Сбросить</button>
          )}
        </div>

        {/* Mode tabs */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[["all","Все время"],["day","По дню"],["month","По месяцу"]].map(([mode,label])=>(
            <button key={mode} onClick={()=>setMode(mode)} className="btn-press" style={{
              padding:"7px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",
              background: dateFilter.mode===mode ? C.accent : C.card2,
              color: dateFilter.mode===mode ? "#fff" : C.muted,
              border:`1px solid ${dateFilter.mode===mode ? C.accent : C.border}`,
              transition:"all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {/* Day picker */}
        {dateFilter.mode === "day" && (
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <input
              type="date"
              value={dateFilter.date}
              onChange={e => setDateFilter(p=>({...p,date:e.target.value}))}
              style={{
                background:C.card2,border:`1px solid ${dateFilter.date ? C.accent : C.border}`,
                borderRadius:8,padding:"8px 12px",color:C.text,fontSize:14,cursor:"pointer",
              }}
            />
            {/* Quick shortcuts */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[
                { label:"Сегодня",  offset:0 },
                { label:"Вчера",    offset:-1 },
                { label:"2 дня назад", offset:-2 },
              ].map(({label,offset})=>{
                const d = new Date(); d.setDate(d.getDate()+offset);
                const iso = d.toISOString().slice(0,10);
                return (
                  <button key={label} onClick={()=>setDateFilter(p=>({...p,date:iso}))} className="btn-press" style={{
                    padding:"6px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",
                    background: dateFilter.date===iso ? "rgba(255,69,0,0.2)" : C.card2,
                    color: dateFilter.date===iso ? C.accent : C.muted,
                    border:`1px solid ${dateFilter.date===iso ? C.accent : C.border}`,
                  }}>{label}</button>
                );
              })}
            </div>
            {dateFilter.date && (
              <div style={{fontSize:13,color:C.muted}}>
                Найдено: <span style={{color:C.text,fontWeight:600}}>{filteredOrders.length}</span> заказов
              </div>
            )}
          </div>
        )}

        {/* Month picker */}
        {dateFilter.mode === "month" && (
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {availableMonths.length === 0 ? (
                <span style={{fontSize:13,color:C.muted}}>Нет данных</span>
              ) : availableMonths.map(ym => {
                const [year,mon] = ym.split("-");
                const label = `${MONTH_NAMES_RU[mon]} ${year}`;
                const count = orders.filter(o=>(o.date||"").startsWith(ym)).length;
                return (
                  <button key={ym} onClick={()=>setDateFilter(p=>({...p,month:ym}))} className="btn-press" style={{
                    padding:"7px 14px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",
                    background: dateFilter.month===ym ? "rgba(255,69,0,0.2)" : C.card2,
                    color: dateFilter.month===ym ? C.accent : C.muted,
                    border:`1px solid ${dateFilter.month===ym ? C.accent : C.border}`,
                    display:"flex",alignItems:"center",gap:8,
                  }}>
                    {label}
                    <span style={{
                      background: dateFilter.month===ym ? C.accent : "rgba(255,255,255,0.1)",
                      color:"#fff",borderRadius:10,fontSize:11,fontWeight:700,padding:"1px 6px",
                    }}>{count}</span>
                  </button>
                );
              })}
            </div>
            {dateFilter.month && (
              <div style={{fontSize:13,color:C.muted}}>
                Найдено: <span style={{color:C.text,fontWeight:600}}>{filteredOrders.length}</span> заказов
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4,alignItems:"center"}}>
        <span style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,whiteSpace:"nowrap",flexShrink:0}}>СТАТУС:</span>
        {["Все",...STATUS_LIST].map(s => {
          const sm = s === "Все" ? null : STATUS_META[s];
          return (
            <button key={s} onClick={()=>setOrderFilter(s)} className="btn-press" style={{
              padding:"7px 14px",borderRadius:8,fontSize:13,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",
              background: orderFilter===s ? (sm?.bg || C.card2) : C.card2,
              color: orderFilter===s ? (sm?.color || C.text) : C.muted,
              border: `1px solid ${orderFilter===s ? (sm?.color || C.accent) : C.border}`,
            }}>{s === "Все" ? "Все статусы" : (sm?.label || s)}</button>
          );
        })}
      </div>

      {/* Results summary */}
      {activeFiltersCount > 0 && (
        <div style={{
          fontSize:13,color:C.muted,marginBottom:14,padding:"8px 14px",
          background:"rgba(255,69,0,0.05)",border:"1px solid rgba(255,69,0,0.12)",
          borderRadius:8,display:"inline-block",
        }}>
          🔍 Показано <span style={{color:C.accent,fontWeight:700}}>{filteredOrders.length}</span> из <span style={{color:C.text,fontWeight:600}}>{orders.length}</span> заказов
        </div>
      )}

      {/* Orders List */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filteredOrders.length === 0 && (
          <div style={{textAlign:"center",padding:"48px",color:C.muted,background:C.card,borderRadius:14,border:`1px solid ${C.border}`}}>
            <div style={{fontSize:36,marginBottom:12}}>📭</div>
            <div>Заказов не найдено</div>
            <div style={{fontSize:13,marginTop:8,opacity:0.6}}>Попробуйте изменить фильтры</div>
          </div>
        )}
        {filteredOrders.map(order => {
          const sm = STATUS_META[order.status];
          const isOpen = expandedOrder === order.id;
          return (
            <div key={order.id} style={{
              background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",
              transition:"all 0.2s",
            }}>
              {/* Row */}
              <div className="order-row" onClick={() => setExpandedOrder(isOpen ? null : order.id)}
                style={{
                  padding:"16px 20px",display:"flex",alignItems:"center",
                  gap:12,cursor:"pointer",transition:"background 0.2s",
                  flexWrap:"wrap",
                }}>
                <div style={{
                  background:sm?.bg,border:`1px solid rgba(${sm?.color.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(",")},0.3)`,
                  color:sm?.color,fontSize:12,fontWeight:700,padding:"4px 10px",borderRadius:6,
                  whiteSpace:"nowrap",flexShrink:0,letterSpacing:0.5,
                }}>{sm?.label}</div>
                <div style={{flex:1,minWidth:120}}>
                  <div style={{fontWeight:600,fontSize:14,color:C.text}}>{order.name}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2}}>{order.phone}</div>
                </div>
                <div style={{flex:2,minWidth:150,fontSize:13,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  📍 {order.address}
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"Oswald",fontSize:18,fontWeight:700,color:C.accent}}>{order.total.toLocaleString("ru")} ₽</div>
                  <div style={{fontSize:11,color:C.muted}}>{order.time}</div>
                </div>
                <div style={{color:C.muted,fontSize:20,flexShrink:0,transition:"transform 0.25s",transform:isOpen?"rotate(180deg)":"none"}}>⌄</div>
              </div>

              {/* Expanded */}
              {isOpen && (
                <div className="slide-down" style={{borderTop:`1px solid ${C.border}`,padding:"20px",background:"rgba(255,255,255,0.015)"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                    {/* Состав */}
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:12}}>СОСТАВ ЗАКАЗА</div>
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {order.items.map((item,i) => (
                          <div key={i} style={{display:"flex",justifyContent:"space-between",
                            fontSize:13,padding:"6px 10px",background:C.card2,borderRadius:8}}>
                            <span style={{color:C.text}}>{item.name} × {item.qty}</span>
                            <span style={{color:C.muted}}>{(item.price*item.qty).toLocaleString("ru")} ₽</span>
                          </div>
                        ))}
                        {order.promo && (
                          <div style={{fontSize:12,color:C.green,padding:"4px 10px"}}>🎟 Промокод: {order.promo}</div>
                        )}
                        {order.comment && (
                          <div style={{fontSize:12,color:C.muted,padding:"4px 10px",fontStyle:"italic"}}>💬 {order.comment}</div>
                        )}
                      </div>
                    </div>

                    {/* Изменить статус */}
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:12}}>ИЗМЕНИТЬ СТАТУС</div>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {STATUS_LIST.map(s => {
                          const sm2 = STATUS_META[s];
                          const active = order.status === s;
                          return (
                            <button key={s} onClick={()=>changeStatus(order.id,s)} className="btn-press"
                              style={{
                                padding:"9px 14px",borderRadius:8,fontSize:13,fontWeight:600,
                                cursor:"pointer",textAlign:"left",
                                background: active ? sm2.bg : "rgba(255,255,255,0.04)",
                                color: active ? sm2.color : C.muted,
                                border:`1px solid ${active ? sm2.color+"44" : C.border}`,
                              }}>
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

function StatCard({ icon, label, val, color }) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 18px"}}>
      <div style={{fontSize:24,marginBottom:10}}>{icon}</div>
      <div style={{fontFamily:"Oswald",fontSize:26,fontWeight:700,color}}>{val}</div>
      <div style={{fontSize:13,color:C.muted,marginTop:4}}>{label}</div>
    </div>
  );
}

// ─── PROMOS TAB ───────────────────────────────────────────────
function PromosTab({ promos, setPromos, promoForm, setPromoForm, addPromo }) {
  const set = (k,v) => setPromoForm(p=>({...p,[k]:v}));
  const deletePromo = (id) => setPromos(prev => prev.filter(p => p.id !== id));
  const togglePromo = (id) => setPromos(prev => prev.map(p => p.id===id ? {...p,active:!p.active} : p));

  return (
    <div className="fade-up" style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:24,alignItems:"start"}}>
      {/* List */}
      <div>
        <h3 style={{fontFamily:"Oswald",fontSize:20,fontWeight:700,color:C.text,letterSpacing:1,marginBottom:16}}>
          ПРОМОКОДЫ <span style={{fontSize:14,color:C.muted,fontWeight:400,letterSpacing:0}}>({promos.length})</span>
        </h3>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {promos.map(p => (
            <div key={p.id} style={{
              background:C.card,border:`1px solid ${p.active ? C.border : "rgba(37,37,37,0.5)"}`,
              borderRadius:12,padding:"16px 18px",
              display:"flex",alignItems:"center",gap:14,
              opacity: p.active ? 1 : 0.5,
            }}>
              <div style={{
                background:p.active?"rgba(255,69,0,0.12)":"rgba(128,128,128,0.1)",
                border:`1px solid ${p.active ? C.accent+"44" : C.border}`,
                borderRadius:8,padding:"4px 12px",
                fontFamily:"Oswald",fontSize:16,fontWeight:700,
                color: p.active ? C.accent : C.muted,letterSpacing:1.5,
                flexShrink:0,
              }}>{p.code}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>
                  {p.type==="percent" ? `Скидка ${p.value}%` : `Скидка ${p.value} ₽`}
                </div>
                <div style={{fontSize:12,color:C.muted,marginTop:3}}>
                  {p.active ? "✓ Активен" : "✗ Неактивен"}
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <button onClick={()=>togglePromo(p.id)} className="btn-press" style={{
                  padding:"7px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",
                  background: p.active ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                  color: p.active ? C.red : C.green,
                  border:`1px solid ${p.active ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
                }}>{p.active ? "Отключить" : "Включить"}</button>
                <button onClick={()=>deletePromo(p.id)} className="btn-press" style={{
                  padding:"7px 10px",borderRadius:7,fontSize:13,cursor:"pointer",
                  background:"rgba(239,68,68,0.08)",color:C.red,
                  border:"1px solid rgba(239,68,68,0.2)",
                }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Form */}
      <div style={{
        background:C.card,border:`1px solid ${C.border}`,borderRadius:16,
        padding:"24px",position:"sticky",top:80,
      }}>
        <h3 style={{fontFamily:"Oswald",fontSize:18,fontWeight:700,color:C.text,letterSpacing:1,marginBottom:20}}>
          + НОВЫЙ ПРОМОКОД
        </h3>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>КОД</div>
            <input value={promoForm.code} onChange={e=>set("code",e.target.value.toUpperCase())}
              placeholder="ЛЕТО2025" style={{
                width:"100%",background:C.card2,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"10px 12px",color:C.text,fontSize:15,
                fontFamily:"Oswald",letterSpacing:2,fontWeight:600,
              }}/>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ТИП СКИДКИ</div>
            <select value={promoForm.type} onChange={e=>set("type",e.target.value)}
              style={{
                width:"100%",background:C.card2,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"10px 12px",color:C.text,fontSize:14,
              }}>
              <option value="percent">Процент (%)</option>
              <option value="fixed">Фиксированная (₽)</option>
            </select>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>
              {promoForm.type==="percent" ? "РАЗМЕР СКИДКИ (%)" : "РАЗМЕР СКИДКИ (₽)"}
            </div>
            <input type="number" value={promoForm.value} onChange={e=>set("value",e.target.value)}
              placeholder={promoForm.type==="percent" ? "10" : "200"} min="1" max={promoForm.type==="percent"?100:10000}
              style={{
                width:"100%",background:C.card2,border:`1px solid ${C.border}`,
                borderRadius:8,padding:"10px 12px",color:C.text,fontSize:15,
              }}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0"}}>
            <div style={{fontSize:14,color:C.muted}}>Активен сразу</div>
            <div onClick={()=>set("active",!promoForm.active)}
              style={{
                width:44,height:24,borderRadius:12,position:"relative",cursor:"pointer",
                background: promoForm.active ? C.accent : C.border,transition:"background 0.25s",
              }}>
              <div style={{
                position:"absolute",top:2,width:20,height:20,borderRadius:"50%",background:"#fff",
                transition:"left 0.25s",left:promoForm.active ? "calc(100% - 22px)" : "2px",
              }}/>
            </div>
          </div>
          <button className="btn-press" onClick={addPromo}
            disabled={!promoForm.code || !promoForm.value}
            style={{
              background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",
              border:"none",borderRadius:10,padding:"13px",fontSize:15,fontWeight:700,
              cursor:"pointer",letterSpacing:0.5,
              opacity: (!promoForm.code || !promoForm.value) ? 0.5 : 1,
            }}>Создать промокод</button>
        </div>
      </div>
    </div>
  );
}

// ─── MENU TAB ────────────────────────────────────────────────
const BADGE_OPTIONS = [null, "ХИТ", "НОВИНКА", "ТОП", "ВЫГОДА", "ОСТРЫЙ🌶"];
const EMOJI_OPTIONS = ["🍖","🍗","🥩","🌭","🌯","🍔","🍟","🍄","🥗","🫓","🍯","🥤","🧃","💧","🥛","☕"];
const INIT_FORM = { name:"", cat:"Шашлык", desc:"", weight:"", price:"", badge:null, emoji:"🍖" };

function MenuTab({ menu, setMenu }) {
  const [catFilter, setCatFilter] = useState("Все");
  const [form, setForm] = useState(INIT_FORM);
  const [editId, setEditId] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const displayed = catFilter === "Все" ? menu : menu.filter(m => m.cat === catFilter);

  const saveItem = () => {
    if (!form.name.trim() || !form.price || !form.weight.trim()) return;
    if (editId !== null) {
      setMenu(prev => prev.map(m => m.id === editId
        ? { ...m, ...form, price: Number(form.price) }
        : m
      ));
      setEditId(null);
    } else {
      const maxId = menu.reduce((a, b) => Math.max(a, b.id), 0);
      setMenu(prev => [...prev, { ...form, id: maxId + 1, price: Number(form.price), available: true }]);
    }
    setForm(INIT_FORM);
  };

  const startEdit = (item) => {
    setForm({ name: item.name, cat: item.cat, desc: item.desc, weight: item.weight,
      price: String(item.price), badge: item.badge, emoji: item.emoji });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditId(null); setForm(INIT_FORM); };

  const toggleAvailable = (id) => setMenu(prev => prev.map(m => m.id===id ? {...m, available: m.available===false ? true : false} : m));

  const deleteItem = (id) => { setMenu(prev => prev.filter(m => m.id !== id)); setConfirmDel(null); };

  const inputStyle = {
    width:"100%", background:C.card2, border:`1px solid ${C.border}`,
    borderRadius:8, padding:"9px 12px", color:C.text, fontSize:14,
  };

  return (
    <div className="fade-up">
      <div style={{display:"grid", gridTemplateColumns:"1fr 380px", gap:24, alignItems:"start"}}>

        {/* ── LEFT: list ── */}
        <div>
          {/* Header + cat filter */}
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:16}}>
            <h3 style={{fontFamily:"Oswald", fontSize:20, fontWeight:700, color:C.text, letterSpacing:1}}>
              ПОЗИЦИИ МЕНЮ <span style={{fontSize:14,color:C.muted,fontWeight:400}}>({menu.length})</span>
            </h3>
            <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
              {["Все", ...CATS.filter(c=>c!=="Все")].map(c => (
                <button key={c} onClick={()=>setCatFilter(c)} className="btn-press" style={{
                  padding:"5px 12px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer",
                  background: catFilter===c ? C.accent : C.card2,
                  color: catFilter===c ? "#fff" : C.muted,
                  border:`1px solid ${catFilter===c ? C.accent : C.border}`,
                }}>{c}</button>
              ))}
            </div>
          </div>

          {/* List */}
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {displayed.map(item => {
              const unavailable = item.available === false;
              return (
                <div key={item.id} style={{
                  background:C.card, border:`1px solid ${unavailable ? "rgba(37,37,37,0.4)" : C.border}`,
                  borderRadius:12, padding:"14px 16px",
                  display:"flex", alignItems:"center", gap:12,
                  opacity: unavailable ? 0.5 : 1, transition:"opacity 0.2s",
                }}>
                  <div style={{fontSize:28, flexShrink:0}}>{item.emoji}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:2}}>
                      <span style={{fontWeight:600, fontSize:14, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{item.name}</span>
                      {item.badge && (
                        <span style={{fontSize:10, fontWeight:700, color:C.accent, background:"rgba(255,69,0,0.12)",
                          border:"1px solid rgba(255,69,0,0.25)", borderRadius:4, padding:"1px 6px", flexShrink:0}}>{item.badge}</span>
                      )}
                    </div>
                    <div style={{fontSize:12, color:C.muted, display:"flex", gap:10}}>
                      <span>{item.cat}</span>
                      <span>·</span>
                      <span>{item.weight}</span>
                      <span>·</span>
                      <span style={{color:C.accent, fontWeight:600}}>{item.price} ₽</span>
                    </div>
                  </div>
                  <div style={{display:"flex", gap:6, flexShrink:0}}>
                    {/* Visible toggle */}
                    <button onClick={()=>toggleAvailable(item.id)} className="btn-press" title={unavailable ? "Включить" : "Скрыть"} style={{
                      width:34, height:34, borderRadius:7, cursor:"pointer", fontSize:15,
                      background: unavailable ? "rgba(34,197,94,0.08)" : "rgba(128,128,128,0.08)",
                      border:`1px solid ${unavailable ? "rgba(34,197,94,0.2)" : C.border}`,
                      color: unavailable ? C.green : C.muted,
                    }}>{unavailable ? "👁" : "🚫"}</button>
                    {/* Edit */}
                    <button onClick={()=>startEdit(item)} className="btn-press" title="Редактировать" style={{
                      width:34, height:34, borderRadius:7, cursor:"pointer", fontSize:15,
                      background:"rgba(96,165,250,0.08)", border:"1px solid rgba(96,165,250,0.2)", color:C.blue,
                    }}>✏️</button>
                    {/* Delete */}
                    {confirmDel === item.id ? (
                      <div style={{display:"flex", gap:4}}>
                        <button onClick={()=>deleteItem(item.id)} className="btn-press" style={{
                          padding:"4px 10px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer",
                          background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:C.red,
                        }}>Да</button>
                        <button onClick={()=>setConfirmDel(null)} className="btn-press" style={{
                          padding:"4px 10px", borderRadius:6, fontSize:12, cursor:"pointer",
                          background:C.card2, border:`1px solid ${C.border}`, color:C.muted,
                        }}>Нет</button>
                      </div>
                    ) : (
                      <button onClick={()=>setConfirmDel(item.id)} className="btn-press" title="Удалить" style={{
                        width:34, height:34, borderRadius:7, cursor:"pointer", fontSize:15,
                        background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:C.red,
                      }}>🗑</button>
                    )}
                  </div>
                </div>
              );
            })}
            {displayed.length === 0 && (
              <div style={{textAlign:"center", padding:40, color:C.muted, background:C.card, borderRadius:12, border:`1px solid ${C.border}`}}>
                Нет позиций в этой категории
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div style={{
          background:C.card, border:`1px solid ${editId ? C.blue : C.border}`,
          borderRadius:16, padding:24, position:"sticky", top:80,
          transition:"border-color 0.3s",
        }}>
          <h3 style={{fontFamily:"Oswald", fontSize:18, fontWeight:700, color: editId ? C.blue : C.text, letterSpacing:1, marginBottom:20}}>
            {editId ? "✏️ РЕДАКТИРОВАНИЕ" : "+ НОВАЯ ПОЗИЦИЯ"}
          </h3>

          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            {/* Emoji picker */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ЭМОДЗИ</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                {EMOJI_OPTIONS.map(e => (
                  <button key={e} onClick={()=>setF("emoji",e)} style={{
                    width:36, height:36, borderRadius:7, fontSize:18, cursor:"pointer",
                    background: form.emoji===e ? "rgba(255,69,0,0.2)" : C.card2,
                    border:`1px solid ${form.emoji===e ? C.accent : C.border}`,
                  }}>{e}</button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>НАЗВАНИЕ *</div>
              <input value={form.name} onChange={e=>setF("name",e.target.value)} placeholder="Шашлык из..." style={inputStyle}/>
            </div>

            {/* Category */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>КАТЕГОРИЯ</div>
              <select value={form.cat} onChange={e=>setF("cat",e.target.value)} style={inputStyle}>
                {CATS.filter(c=>c!=="Все").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Desc */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ОПИСАНИЕ</div>
              <textarea value={form.desc} onChange={e=>setF("desc",e.target.value)}
                placeholder="Вкусное описание блюда..."
                rows={2} style={{...inputStyle, resize:"vertical", fontFamily:"Barlow,sans-serif", lineHeight:1.5}}/>
            </div>

            {/* Weight + Price */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ВЕС / ОБЪЁМ *</div>
                <input value={form.weight} onChange={e=>setF("weight",e.target.value)} placeholder="300г" style={inputStyle}/>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ЦЕНА (₽) *</div>
                <input type="number" value={form.price} onChange={e=>setF("price",e.target.value)} placeholder="450" min="1" style={inputStyle}/>
              </div>
            </div>

            {/* Badge */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:1,marginBottom:6}}>ЗНАЧОК</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                {BADGE_OPTIONS.map(b => (
                  <button key={String(b)} onClick={()=>setF("badge",b)} style={{
                    padding:"4px 10px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer",
                    background: form.badge===b ? "rgba(255,69,0,0.2)" : C.card2,
                    color: form.badge===b ? C.accent : C.muted,
                    border:`1px solid ${form.badge===b ? C.accent : C.border}`,
                  }}>{b === null ? "Нет" : b}</button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{display:"flex", gap:8, marginTop:4}}>
              {editId && (
                <button onClick={cancelEdit} className="btn-press" style={{
                  flex:1, padding:"11px", borderRadius:9, fontSize:14, fontWeight:600, cursor:"pointer",
                  background:C.card2, border:`1px solid ${C.border}`, color:C.muted,
                }}>Отмена</button>
              )}
              <button onClick={saveItem}
                disabled={!form.name.trim() || !form.price || !form.weight.trim()}
                className="btn-press" style={{
                  flex:2, padding:"11px", borderRadius:9, fontSize:14, fontWeight:700, cursor:"pointer",
                  background: editId
                    ? `linear-gradient(135deg,${C.blue},#3B82F6)`
                    : `linear-gradient(135deg,${C.accent},${C.accent2})`,
                  color:"#fff", border:"none", letterSpacing:0.5,
                  opacity: (!form.name.trim() || !form.price || !form.weight.trim()) ? 0.45 : 1,
                }}>{editId ? "Сохранить" : "Добавить позицию"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────
function declQty(n) {
  const r = Math.abs(n) % 100;
  const r1 = r % 10;
  if (r > 10 && r < 20) return "позиций";
  if (r1 === 1) return "позиция";
  if (r1 >= 2 && r1 <= 4) return "позиции";
  return "позиций";
}
