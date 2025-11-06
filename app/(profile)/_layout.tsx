import { useAppTheme } from "@/context/themeContext";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function ProfileLayout() {
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
      <Stack.Screen name="edit-info" />
      <Stack.Screen name="language" />
    </Stack>
  );
}
