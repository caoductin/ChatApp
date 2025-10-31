import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { uploadFileToCloudinary } from "@/services/imageService";
import { updateProfile } from "@/socket/socketEvent";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { FC, useEffect, useReducer } from "react";
import {
  Alert,
  Image,
  ImageProps,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface AvatarProps {
  style: ViewStyle;
  imageProps: ImageProps;
  onPress?: () => void;
}

export const AnimatedTouchable =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Avatar: FC<AvatarProps> = ({ onPress, style, imageProps }) => {
  const theme = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
    >
      <View
        style={[
          {
            borderColor: theme.onPrimary,
            borderWidth: 8,
            borderRadius: 100,
          },
          style,
        ]}
      >
        <Image {...imageProps} />
      </View>
    </AnimatedTouchable>
  );
};
