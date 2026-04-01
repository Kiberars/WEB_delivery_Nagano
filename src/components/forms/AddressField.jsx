import { useState, useEffect, useRef } from "react";
import { ADDRESS_SUGGESTIONS } from "../../data/constants";

export default function AddressField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const suggestions =
    value.length >= 2
      ? ADDRESS_SUGGESTIONS.filter((s) =>
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
    <div ref={ref} className="relative">
      <div className="text-sm font-semibold text-muted mb-1.5 tracking-wide">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => {
          setFocused(true);
          setShowDropdown(true);
        }}
        onBlur={() => setFocused(false)}
        placeholder="Начните вводить улицу..."
        className={`w-full bg-bg-card border rounded-lg px-3.5 py-2.5 text-text text-sm transition-colors duration-200 ${
          focused ? "border-accent" : "border-border"
        } ${
          showDropdown && suggestions.length > 0 ? "rounded-b-none" : ""
        }`}
      />
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-[500] bg-[#1A1A1A] border border-accent border-t-0 rounded-b-lg overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(s);
                setShowDropdown(false);
              }}
              className="px-3.5 py-2.5 text-sm text-muted cursor-pointer transition-colors duration-150 flex items-center gap-2 hover:bg-accent/10"
              style={{
                borderBottom:
                  i < suggestions.length - 1 ? `1px solid #252525` : "none",
              }}
            >
              <span className="text-accent shrink-0">📍</span>
              <span>
                <span className="text-text">{s}</span>
                <span className="text-muted/50 text-xs"> кв. ___</span>
              </span>
            </div>
          ))}
          <div className="px-3.5 py-1.5 text-[11px] text-muted/40 border-t border-border bg-black/20">
            📌 Каменск-Уральский
          </div>
        </div>
      )}
    </div>
  );
}
