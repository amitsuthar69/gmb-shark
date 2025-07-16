import React from "react";
import { useThemeManager } from "@/hooks/useColorScheme";

export const ThemeContext = React.createContext<ReturnType<
  typeof useThemeManager
> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeManager = useThemeManager();
  return (
    <ThemeContext.Provider value={themeManager}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
