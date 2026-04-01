export default function AdminTab({ label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="btn-press px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer relative flex items-center gap-1.5 transition-all duration-200"
      style={{
        background: active ? "#FF4500" : "rgba(255,255,255,0.06)",
        color: active ? "#fff" : "#808080",
        border: `1px solid ${active ? "#FF4500" : "#252525"}`,
      }}
    >
      {label}
      {badge && (
        <span
          className="text-[11px] font-bold px-1.5 py-0.5 rounded-[10px]"
          style={{
            background: active ? "rgba(0,0,0,0.3)" : "#EF4444",
            color: "#fff",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
