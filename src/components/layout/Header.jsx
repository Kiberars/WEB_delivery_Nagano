import { useState, useEffect } from "react";
import NavLink from "./NavLink";

export default function Header({ cartCount, setCartOpen, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

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
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); closeMenu(); }}
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

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center">
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

        {/* Burger button (mobile/tablet) */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-[110] relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[24px] h-[2px] bg-text transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-[24px] h-[2px] bg-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[24px] h-[2px] bg-text transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 bg-bg/98 backdrop-blur-xl z-[105] flex flex-col items-center justify-center gap-6 transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <a href="#about" className="text-text text-2xl font-oswald font-semibold tracking-wider" onClick={closeMenu}>О нас</a>
        <a href="#menu" className="text-text text-2xl font-oswald font-semibold tracking-wider" onClick={closeMenu}>Меню</a>
        <a href="#contacts" className="text-text text-2xl font-oswald font-semibold tracking-wider" onClick={closeMenu}>Контакты</a>
        <button
          className="btn-press bg-transparent border border-border2 text-text px-6 py-3 rounded-lg text-lg font-medium mt-2 transition-all duration-200 hover:border-accent hover:text-accent"
          onClick={() => { setPage("admin-login"); closeMenu(); }}
        >
          Панель
        </button>
      </div>
    </header>
  );
}
