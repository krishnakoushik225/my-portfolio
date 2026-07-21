"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={15} className="text-slate-300" />
      ) : (
        <Moon size={15} className="text-slate-300" />
      )}
    </button>
  );
}
