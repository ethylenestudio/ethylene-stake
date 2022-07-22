import { TabState } from "components/Lock/Lock.react";
import React, { useContext } from "react";

export const LockContext = React.createContext<{
  isStaking: boolean;
  setIsStaking: (to: boolean) => void;
  isEarning: boolean;
  setIsEarning: (to: boolean) => void;
  value: string;
  setValue: (to: string) => void;
  tab: TabState | string;
}>({
  isStaking: false,
  setIsStaking: () => undefined,
  isEarning: false,
  setIsEarning: () => undefined,
  value: "",
  setValue: () => undefined,
  tab: "LOCK",
});

export const useLockContext = () => {
  return useContext(LockContext);
};
