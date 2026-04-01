export default function StatCard({ icon, label, val, color }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 md:p-5">
      <div className="text-2xl mb-2.5">{icon}</div>
      <div className="font-oswald text-xl md:text-2xl font-bold" style={{ color }}>
        {val}
      </div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  );
}
