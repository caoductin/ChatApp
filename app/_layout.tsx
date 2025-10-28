import { AuthProvider, useAuth } from "@/context/authContext";
import { ThemeProvider } from "@/context/themeContext";
import { login } from "@/services/authServies";
import { Stack } from "expo-router";

const StackLayout = () => {
  const { isLogin } = useAuth();
  // const isLogin = true;
  console.log("this is log inb", isLogin);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLogin}>
        <Stack.Screen name="(main)/home" />
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
