"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ModalProvider } from "./ModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  );
}
