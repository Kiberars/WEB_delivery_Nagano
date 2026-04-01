export default function InfoChip({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 bg-bg-card2 border border-border px-3 py-1.5 rounded-lg text-sm text-muted">
      <span>{icon}</span>
      {text}
    </div>
  );
}
