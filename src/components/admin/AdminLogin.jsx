export default function AdminLogin({ login, setLogin, onLogin, setPage }) {
  const set = (k, v) => setLogin((p) => ({ ...p, [k]: v, [k === "err" ? "" : "err"]: "" }));
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-5">
      <div className="fade-up bg-[#111] border border-border rounded-[20px] p-8 md:p-10 w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="font-oswald text-2xl md:text-[28px] font-bold text-text tracking-widest">
            ПАНЕЛЬ МАНГАЛ
          </h1>
          <p className="text-sm text-muted mt-1.5">Административный вход</p>
        </div>

        <div className="flex flex-col gap-3.5">
          <div>
            <div className="text-xs font-semibold text-muted tracking-wider mb-1.5">ЛОГИН</div>
            <input
              value={login.user}
              onChange={(e) => set("user", e.target.value)}
              placeholder="admin"
              className="w-full bg-bg-card border border-border rounded-lg px-3.5 py-3 text-text text-base"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted tracking-wider mb-1.5">ПАРОЛЬ</div>
            <input
              type="password"
              value={login.pass}
              onChange={(e) => set("pass", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              placeholder="••••••"
              className="w-full bg-bg-card border border-border rounded-lg px-3.5 py-3 text-text text-base"
            />
          </div>

          {login.err && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-lg px-3.5 py-2.5 text-red-500 text-sm text-center">
              ⚠ {login.err}
            </div>
          )}

          <button
            className="btn-press bg-gradient-to-br from-accent to-accent2 text-white border-0 rounded-xl py-3.5 text-base font-bold cursor-pointer shadow-[0_4px_20px_rgba(255,69,0,0.35)] mt-1 tracking-wide"
            onClick={onLogin}
          >
            Войти
          </button>
        </div>

        <div className="text-center mt-5">
          <button
            onClick={() => setPage("home")}
            className="bg-none border-0 text-muted cursor-pointer text-sm"
          >
            ← Вернуться на сайт
          </button>
        </div>
        <div className="text-center mt-3 text-xs text-muted/40">
          Логин: admin / Пароль: admin
        </div>
      </div>
    </div>
  );
}
