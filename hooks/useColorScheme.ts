import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";
import { useEffect, useState } from "react";

export function useThemeManager() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("user-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const updateTheme = async (newTheme: "light" | "dark") => {
    await AsyncStorage.setItem("user-theme", newTheme);
    setTheme(newTheme);
  };

  const toggleTheme = () => updateTheme(theme === "light" ? "dark" : "light");

  return {
    theme,
    updateTheme,
    toggleTheme,
  };
}

export const useColorScheme = (): NonNullable<ColorSchemeName> => {
  const { theme } = useThemeManager();
  return theme;
};
