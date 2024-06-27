import { useContext, useEffect } from "react";
import { DataContext, ContextType } from "../context";

export const useContextHook = (): ContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useContextHook must be used within a DataProvider");
  }

  return context;
};
