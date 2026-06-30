"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Read the theme the inline boot script already applied to <html>.
  useEffect(() => {
    const stored = localStorage.getItem("saahvik-theme") as Theme | null;
    const initial =
      stored ??
      (document.documentElement.classList.contains("light") ? "light" : "dark");
    setThemeState(initial);
    setMounted(true);
  }, []);

  const apply = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    root.classList.toggle("light", t === "light");
    root.style.colorScheme = t;
    try {
      localStorage.setItem("saahvik-theme", t);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (mounted) apply(theme);
  }, [theme, mounted, apply]);

  const toggle = useCallback(
    () => setThemeState((p) => (p === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
