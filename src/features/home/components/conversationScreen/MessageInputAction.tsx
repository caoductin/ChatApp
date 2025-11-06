import { AnimatedButton } from "@/src/components/AnimatedButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

interface MessageInputActionProps {
  isFocused: boolean;
  chevronPress?: () => void;
}

export const MessageInputAction: FC<MessageInputActionProps> = ({
  isFocused,
  chevronPress,
}) => {
  return (
    <Animated.View
      style={{ flexDirection: "row" }}
      entering={SlideInRight}
      exiting={SlideInLeft}
    >
      {!isFocused ? (
        <Animated.View
          style={{ flexDirection: "row", gap: 8 }}
          entering={SlideInLeft}
          exiting={SlideOutLeft}
        >
          <AnimatedButton>
            <Ionicons name="camera" size={28} />
          </AnimatedButton>
          <AnimatedButton>
            <Ionicons name="image" size={28} />
          </AnimatedButton>
          <AnimatedButton>
            <Ionicons name="mic" size={28} />
          </AnimatedButton>
        </Animated.View>
      ) : (
        <AnimatedButton
          onPress={chevronPress}
          hitSlop={{ top: 4, bottom: 4, right: 4, left: 4 }}
        >
          <Feather name="chevron-right" size={25} />
        </AnimatedButton>
      )}
    </Animated.View>
  );
};
