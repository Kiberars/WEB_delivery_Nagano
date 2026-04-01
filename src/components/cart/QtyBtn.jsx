export default function QtyBtn({ children, onClick }) {
  return (
    <button
      className="btn-press w-7 h-7 rounded-md bg-white/8 border border-border text-text text-base cursor-pointer flex items-center justify-center font-bold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
