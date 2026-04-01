import { useState } from "react";

export default function FormField({ label, value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div className="text-sm font-semibold text-muted mb-1.5 tracking-wide">
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-bg-card border rounded-lg px-3.5 py-2.5 text-text text-sm transition-colors duration-200 ${
          focused ? "border-accent" : "border-border"
        }`}
      />
    </div>
  );
}
