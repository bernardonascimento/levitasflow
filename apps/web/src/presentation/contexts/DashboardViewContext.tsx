"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

export type DashboardView =
  | "overview"
  | "calendar"
  | "notices"
  | "repertoire"
  | "unavailability"
  | "teams"
  | "plans";

const STORAGE_KEY = "levitasflow.dashboard.view";

const VIEW_VALID: Set<DashboardView> = new Set([
  "overview",
  "calendar",
  "notices",
  "repertoire",
  "unavailability",
  "teams",
  "plans"
]);

function readStoredView(): DashboardView {
  if (typeof window === "undefined") return "overview";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && VIEW_VALID.has(raw as DashboardView)) return raw as DashboardView;
  } catch {
    // ignore
  }
  return "overview";
}

type DashboardViewContextValue = {
  view: DashboardView;
  setView: (view: DashboardView) => void;
};

const DashboardViewContext = createContext<DashboardViewContextValue | null>(null);

type DashboardViewProviderProps = {
  children: ReactNode;
};

export function DashboardViewProvider({ children }: DashboardViewProviderProps): JSX.Element {
  const [view, setViewState] = useState<DashboardView>("overview");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setViewState(readStoredView());
    setHydrated(true);
  }, []);

  const setView = useCallback((next: DashboardView) => {
    setViewState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<DashboardViewContextValue>(
    () => ({ view: hydrated ? view : "overview", setView }),
    [view, setView, hydrated]
  );

  return (
    <DashboardViewContext.Provider value={value}>{children}</DashboardViewContext.Provider>
  );
}

export function useDashboardView(): DashboardViewContextValue {
  const ctx = useContext(DashboardViewContext);
  if (!ctx) {
    throw new Error("useDashboardView must be used within DashboardViewProvider");
  }
  return ctx;
}
