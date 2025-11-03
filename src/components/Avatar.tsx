// import defaultAvatar from "@/assets/defaultAvatar.png";
import { useAppTheme } from "@/context/themeContext";
import { FC, useState } from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface AvatarProps extends ImageProps {
  viewStyle?: ViewStyle;
  onPress?: () => void;
}

// export const AvatarWithFallback = ({ uri }: { uri?: string }) => {
//   const [error, setError] = useState(false);

//   return (
//     <Image
//       source={error || !uri || uri.trim() === "" ? defaultAvatar : { uri }}
//       onError={() => setError(true)}
//       style={{ width: 48, height: 48, borderRadius: 100 }}
//       resizeMode="cover"
//     />
//   );
// };

export const AnimatedTouchable =
  Animated.createAnimatedComponent(TouchableOpacity);

interface AvatarProps extends Omit<ImageProps, "source"> {
  source?: ImageSourcePropType;
  viewStyle?: ViewStyle;
  onPress?: () => void;
}

export const Avatar: FC<AvatarProps> = ({
  source,
  viewStyle,
  onPress,
  style,
  ...rest
}) => {
  const theme = useAppTheme();
  const scale = useSharedValue(1);
  const [error, setError] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => (scale.value = withSpring(0.9));
  const handlePressOut = () => (scale.value = withSpring(1));

  const finalSource =
    error || !source || (source as any)?.uri?.trim() === ""
      ? require("@/assets/images/defaultAvatar.png")
      : source;

  return (
    <AnimatedTouchable
      style={[viewStyle, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View
        style={[
          {
            borderColor: theme.onPrimary,
            borderWidth: 8,
            borderRadius: 100,
            overflow: "hidden",
          },
          viewStyle,
        ]}
      >
        <Image
          source={finalSource}
          onError={() => setError(true)}
          style={[{ width: 48, height: 48, borderRadius: 100 }, style]}
          resizeMode="cover"
          {...rest}
        />
      </View>
    </AnimatedTouchable>
  );
};
