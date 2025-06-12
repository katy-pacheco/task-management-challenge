import { createContext, useContext, useState } from "react";

type ViewModeContextType = {
  viewMode: number;
  setViewMode: (mode: number) => void;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined,
);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState(0);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context)
    throw new Error("useViewMode must be used within ViewModeProvider");
  return context;
}
