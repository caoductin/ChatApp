import { colors, radius } from "@/constants/theme";
import { ButtonProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";
import Loading from "./Loading";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const pulse: CSSAnimationKeyframes = {
  from: {
    justifyContent: "space-around",
    transform: [{ scale: 0.98 }],
  },
  to: {
    justifyContent: "center",
    transform: [{ scale: 1.01 }],
  },
};

const Button = ({ style, onPress, loading, children }: ButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style]}>
        <Loading />
      </View>
    );
  }
  return (
    <AnimatedTouchableOpacity
      style={[
        styles.button,
        style,
        {
          animationName: pulse,
          animationDuration: "3s",
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
          flexDirection: "row",
          animationDirection: "alternate",
        },
      ]}
      onPress={onPress}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: verticalScale(46),
    borderCurve: "continuous",
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
