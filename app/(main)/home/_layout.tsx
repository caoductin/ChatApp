import { useAppTheme } from "@/context/themeContext";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  const theme = useAppTheme();
  return (
    <Stack
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: theme.surfaceBright,
        },
        contentStyle: {
          backgroundColor: theme.surfaceBright,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="newGroupModal"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
