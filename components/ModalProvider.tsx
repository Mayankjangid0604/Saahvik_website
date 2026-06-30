"use client";

import { createContext, useCallback, useContext, useState } from "react";
import FeatureModal from "./FeatureModal";

export type ModalMode = "suggest" | "requirements";

type ModalContextValue = {
  isOpen: boolean;
  mode: ModalMode;
  open: (mode?: ModalMode) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("suggest");

  const open = useCallback((m: ModalMode = "suggest") => {
    setMode(m);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isOpen, mode, open, close }}>
      {children}
      <FeatureModal />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
