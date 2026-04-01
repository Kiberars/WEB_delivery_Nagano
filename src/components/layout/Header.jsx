import { useState, useEffect } from "react";
import NavLink from "./NavLink";

export default function Header({ cartCount, setCartOpen, setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-bg/97 border-b border-border"
          : "bg-bg/[0.85] border-b border-transparent"
      } backdrop-blur-md`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[68px]">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-[#FF8C00] flex items-center justify-center text-2xl shadow-[0_4px_16px_rgba(255,69,0,0.4)]"
          >
            🔥
          </div>
          <div>
            <div className="font-oswald text-xl font-bold tracking-widest text-text">
              МАНГАЛ
            </div>
            <div className="text-[10px] text-muted tracking-widest -mt-0.5">
              КАМЕНСК-УРАЛЬСКИЙ
            </div>
          </div>
        </div>

        <nav className="flex gap-2 items-center">
          <NavLink href="#about">О нас</NavLink>
          <NavLink href="#menu">Меню</NavLink>
          <NavLink href="#contacts">Контакты</NavLink>
          <button
            className="btn-press bg-transparent border border-border2 text-muted px-3.5 py-2 rounded-lg text-sm font-medium ml-2 transition-all duration-200 hover:border-accent hover:text-accent"
            onClick={() => setPage("admin-login")}
          >
            Панель
          </button>
        </nav>
      </div>
    </header>
  );
}
