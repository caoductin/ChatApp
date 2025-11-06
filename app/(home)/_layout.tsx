import { useAppTheme } from "@/context/themeContext";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function HomeLayout() {
  const theme = useAppTheme();
  return (
    <Stack
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: theme.surfaceBright,
        },
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.surfaceBright,
        },
      }}
    >
      <Stack.Screen name="conversation"  />
    </Stack>
  );
}
