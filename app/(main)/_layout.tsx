// app/(main)/_layout.tsx
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface IconMap {
  [key: string]: FeatherIconName;
}
const iconMap: IconMap = {
  home: "home",
  status: "activity",
  add: "plus",
  call: "phone",
  profile: "user",
};

const MyTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { buildHref } = useLinkBuilder();
  const theme = useAppTheme();
  const styles = createStyle(theme);
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;
        const isMiddle = route.name === "add";
        const iconName = iconMap[route.name] ?? "circle";

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

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={[styles.tabbarItem, isMiddle && styles.middleItemContainer]}
          >
            {!isMiddle && (
              <Animated.View
                style={{ alignItems: "center" }}
                layout={LinearTransition}
              >
                <Feather
                  name={iconName}
                  size={20}
                  style={[styles.textTabbar, isFocused && styles.textFocus]}
                />
                <Animated.Text
                  layout={LinearTransition}
                  style={[styles.textTabbar, isFocused && styles.textFocus]}
                >
                  {label as string}
                </Animated.Text>
              </Animated.View>
            )}

            {isMiddle && (
              <Animated.View
                style={styles.middleButton}
                layout={LinearTransition}
              >
                <Feather name={iconName} size={24} color="#fff" />
              </Animated.View>
            )}
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
      <Tabs.Screen name="add" options={{ title: "add", headerShown: false }} />
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

const createStyle = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 25,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 16,
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderCurve: "continuous",
      borderRadius: 32,
      backgroundColor: theme.surfaceBright,
      shadowColor: "#565555ff",
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      shadowOpacity: 0.3,
      elevation: 10,
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    middleItemContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    middleButton: {
      position: "absolute",
      top: -35,
      borderRadius: 35,
      width: 50,
      height: 50,
      justifyContent: "center",
      backgroundColor: theme.onPrimaryFixed,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 6,
    },
    textFocus: {
      color: theme.inverseSurface,
      fontWeight: "600",
    },
    textTabbar: {
      color: theme.onPrimaryFixedVariant,
    },
  });
