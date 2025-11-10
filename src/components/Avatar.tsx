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

interface AvatarWithFallbackProps
  extends Omit<ImageProps, "source" | "onError"> {
  uri?: string| null;
}

export const AvatarWithFallback: FC<AvatarWithFallbackProps> = ({
  uri,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const defaultAvatar = require("@/assets/images/defaultAvatar.png");
  return (
    <Image
      source={error || !uri || uri.trim() === "" ? defaultAvatar : { uri }}
      onError={() => setError(true)}
      {...rest}
    />
  );
};

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
            borderRadius: 100,
            borderWidth: 8,
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
