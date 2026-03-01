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
import { getMinistriesForCurrentUserAction } from "@web/lib/ministry/actions";

export type MinistryOption = {
  id: string;
  name: string;
  slug: string;
};

type MinistryContextValue = {
  ministries: MinistryOption[];
  selectedMinistryId: string | null;
  selectedMinistry: MinistryOption | null;
  setSelectedMinistryId: (id: string) => void;
  refetchMinistries: () => Promise<void>;
};

const MinistryContext = createContext<MinistryContextValue | null>(null);

type MinistryProviderProps = {
  ministries: MinistryOption[];
  children: ReactNode;
};

export const MinistryProvider = ({
  ministries: initialMinistries,
  children
}: MinistryProviderProps): JSX.Element => {
  const [ministries, setMinistries] = useState<MinistryOption[]>(initialMinistries);
  const [selectedMinistryId, setSelectedMinistryIdState] = useState<string | null>(
    () => initialMinistries[0]?.id ?? null
  );

  useEffect(() => {
    setMinistries(initialMinistries);
  }, [initialMinistries]);

  useEffect(() => {
    setSelectedMinistryIdState((prev) => {
      const stillValid = prev && ministries.some((m) => m.id === prev);
      return stillValid ? prev : ministries[0]?.id ?? null;
    });
  }, [ministries]);

  const refetchMinistries = useCallback(async (): Promise<void> => {
    const list = await getMinistriesForCurrentUserAction();
    setMinistries(list);
    setSelectedMinistryIdState((prev) => {
      const stillValid = prev && list.some((m) => m.id === prev);
      return stillValid ? prev : list[0]?.id ?? null;
    });
  }, []);

  const setSelectedMinistryId = useCallback((id: string) => {
    setSelectedMinistryIdState(id);
  }, []);

  const selectedMinistry = useMemo(
    () =>
      ministries.find((m) => m.id === selectedMinistryId) ?? ministries[0] ?? null,
    [ministries, selectedMinistryId]
  );

  const value = useMemo<MinistryContextValue>(
    () => ({
      ministries,
      selectedMinistryId,
      selectedMinistry,
      setSelectedMinistryId,
      refetchMinistries
    }),
    [ministries, selectedMinistryId, selectedMinistry, setSelectedMinistryId, refetchMinistries]
  );

  return (
    <MinistryContext.Provider value={value}>{children}</MinistryContext.Provider>
  );
};

export function useMinistries(): MinistryContextValue {
  const ctx = useContext(MinistryContext);
  if (!ctx) {
    throw new Error("useMinistries must be used within MinistryProvider");
  }
  return ctx;
}

export default MinistryProvider;
