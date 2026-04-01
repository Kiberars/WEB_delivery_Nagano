import { useState, useEffect } from "react";

export default function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-muted text-sm font-medium px-2.5 py-1.5 rounded-md transition-all duration-200 hover:text-text hover:bg-white/6 no-underline"
    >
      {children}
    </a>
  );
}
