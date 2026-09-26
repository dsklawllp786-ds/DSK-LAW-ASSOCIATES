"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  if (!mounted) {
    return (
      <div
        className="h-7 w-14 rounded-full bg-muted"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-7 w-14 shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        isDark
          ? "border-gold/30 bg-navy"
          : "border-border bg-muted"
      )}
    >
      <Sun
        className={cn(
          "absolute left-1.5 h-3.5 w-3.5 transition-colors",
          isDark ? "text-white/40" : "text-gold"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute right-1.5 h-3.5 w-3.5 transition-colors",
          isDark ? "text-gold" : "text-muted-foreground/50"
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute top-0.5 h-6 w-6 rounded-full bg-gradient-to-br from-gold to-gold-light shadow-md transition-transform duration-200 ease-in-out",
          isDark ? "translate-x-7" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
