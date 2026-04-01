import { useState } from "react";

export default function PhoneField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, "");
    let d = digits;
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (d.length > 11) d = d.slice(0, 11);

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
    const digits = formatted.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 11) {
      setError("Введите полный номер телефона");
    } else {
      setError("");
    }
  };

  const isValid = value.replace(/\D/g, "").length === 11;
  const isEmpty = value.replace(/\D/g, "").length === 0;
  const borderColor = focused
    ? error
      ? "border-red-500"
      : "border-accent"
    : error
    ? "border-red-500"
    : "border-border";

  return (
    <div>
      <div className="text-sm font-semibold text-muted mb-1.5 tracking-wide">
        {label}
      </div>
      <div className="relative">
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
          className={`w-full bg-bg-card border ${borderColor} rounded-lg px-3.5 py-2.5 pr-10 text-text text-sm transition-colors duration-200 tracking-wide`}
        />
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-base transition-opacity duration-200 ${
            isEmpty ? "opacity-0" : "opacity-100"
          }`}
        >
          {isValid ? "✅" : error ? "❌" : "📞"}
        </div>
      </div>
      {error && (
        <div className="text-xs text-red-500 mt-1">⚠ {error}</div>
      )}
    </div>
  );
}
