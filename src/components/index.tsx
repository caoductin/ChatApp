import { Feather, Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

export type FeatherType = ComponentProps<typeof Feather>;
export type IconProps = ComponentProps<typeof Ionicons>;

// animation
export const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
