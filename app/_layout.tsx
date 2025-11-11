import { AuthProvider, useAuth } from "@/context/authContext";
import { ThemeProvider, useAppTheme } from "@/context/themeContext";
import { Stack } from "expo-router";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import "../src/localize/i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StackLayout = () => {
  const { isLogin } = useAuth();
  const theme = useAppTheme();

  return (
    <GestureHandlerRootView>
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

          <Stack.Screen
            name="(home)"
            options={{ title: "Cuộc trò chuyện", headerShown: false }}
          />
          <Stack.Screen name="(profile)" options={{ title: "Ngôn ngữ" }} />
          <Stack.Screen
            name="newGroupModal"
            options={{ presentation: "modal" }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isLogin}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)/welcome" />
          <Stack.Screen name="(auth)/register" />
          <Stack.Screen name="(auth)/login" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
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
