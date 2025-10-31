import { AuthProvider, useAuth } from "@/context/authContext";
import { ThemeProvider, useAppTheme } from "@/context/themeContext";
import { login } from "@/services/authServies";
import { Stack } from "expo-router";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import "../src/localize/i18next";

const StackLayout = () => {
  const { isLogin } = useAuth();
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.surfaceBright,
        },
        contentStyle: {
          backgroundColor: theme.surfaceBright,
        },
      }}
    >
      <Stack.Protected guard={isLogin}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLogin}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/welcome" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
};

const AppBackground: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useAppTheme();
  return <View style={{ flex: 1, backgroundColor: "blue" }}>{children}</View>;
};

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StackLayout />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
