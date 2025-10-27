import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { useContext } from "react";

const isLogin = false;

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={false}>
        <Stack.Screen name="(main)/home" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="(auth)/register" />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;
