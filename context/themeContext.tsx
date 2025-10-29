import { createContext, ReactNode, useContext } from "react";
import theme from "../constants/material-theme.json";
import { useColorScheme, View } from "react-native";

const ThemeContext = createContext(theme.schemes.light);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const scheme = theme.schemes[colorScheme || "light"];
  return (
    <ThemeContext.Provider value={scheme}>
      <View style={{ flex: 1, backgroundColor: "blue" }}>{children}</View>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

export type ThemeType = ReturnType<typeof useAppTheme>;
