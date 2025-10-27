// app/(main)/_layout.tsx
import { Tabs } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";

const MyTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const icon = {};
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label as string}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default function MainLayout() {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="status"
        options={{ title: "Status", headerShown: false }}
      />
      <Tabs.Screen
        name="call"
        options={{ title: "Call", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    backgroundColor: "#dedcdcff",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    borderCurve: "continuous",
    borderRadius: 32,
    shadowColor: "#393636ff",
    shadowOffset: { width: 6, height: 4 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
