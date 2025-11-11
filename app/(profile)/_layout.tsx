import { useAppTheme } from "@/context/themeContext";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

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
        headerBackVisible: true,
      }}
    >
      <Stack.Screen name="edit-info" options={{ headerShown: false }} />
      <Stack.Screen name="language" />
    </Stack>
  );
}
