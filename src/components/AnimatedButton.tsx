import { TouchableOpacityProps, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AnimatedTouchable } from "./Avatar";
import { FC, ReactNode } from "react";

interface AnimatedButtonProps extends TouchableOpacityProps {}

export const AnimatedButton: FC<AnimatedButtonProps> = ({
  children,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => (scale.value = withSpring(0.95));
  const handlePressOut = () => (scale.value = withSpring(1));
  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      {...props}
    >
      {children}
    </AnimatedTouchable>
  );
};
