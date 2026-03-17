// "use client";

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="h-10 w-10 rounded-full border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]" />
//     );
//   }

//   const isDark = resolvedTheme === "dark";

//   return (
//     <button
//   aria-label="Toggle theme"
//   onClick={() => setTheme(isDark ? "light" : "dark")}
//   className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-slate-700 transition hover:scale-[1.03] hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:text-white/80 dark:hover:bg-white/[0.06]"
// >
//   {isDark ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4" />}
// </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// ─── ThemeToggle ──────────────────────────────────────────────────────────────
// Drop-in replacement for any existing ThemeToggle component.
//
// How it works:
//  1. On mount, reads the current theme from the <html> class  (which was
//     already set by the blocking script in layout.tsx).
//  2. On click, flips the class on <html> AND writes the new preference to
//     localStorage so it persists across page reloads.
//
// This component does NOT depend on next-themes or any other library.

export default function ThemeToggle() {
  // Initialise to null so we don't render the wrong icon during SSR.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  // Sync state with whatever the blocking script already applied to <html>.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  // Render nothing on the server to avoid hydration mismatch.
  if (isDark === null) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-slate-700 transition hover:border-black/20 hover:text-slate-900 dark:border-white/10 dark:text-white/70 dark:hover:border-white/20 dark:hover:text-white"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}