import { AuthProvider, useAuth } from "@/context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { Stack, Tabs } from "expo-router";

const StackLayout = () => {
  // const { isLogin } = useAuth();
  // console.log("this is login", isLogin);
  const isLogin = true;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLogin}>
        <Stack.Screen name="(main)/home" />
        {/* <Tabs>
          <Tabs.Screen name="(main)/home" options={{ title: "Home" }} />
          <Tabs.Screen name="(main)/call" options={{ title: "call" }} />
        </Tabs> */}
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
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;
