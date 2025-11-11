import { useAppTheme } from "@/context/themeContext";
import { AvatarWithFallback } from "@/src/components/Avatar";
import { MessageProps, UserProps } from "@/types";
import { format } from "date-fns";
import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SlideInDown,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface MessageItemProps {
  item: MessageProps;
  user: UserProps;
  onSwipeToReply: (item: MessageProps) => void;
}

const SWIPE_THRESHOLD = 80;

const { width } = Dimensions.get("window");

export const MessageItem: FC<MessageItemProps> = ({
  item,
  user,
  onSwipeToReply,
}) => {
  const isMe = item.sender._id === user.id;
  const theme = useAppTheme();
  const translateX = useSharedValue(0);
  const ACTIVE_OFFSET = 10;

  const handleReplyAction = (item: MessageProps) => {
    onSwipeToReply(item);
  };

  const swipeToReplyGesture = Gesture.Pan()
    .failOffsetY([-ACTIVE_OFFSET, ACTIVE_OFFSET])
    .activeOffsetX([-ACTIVE_OFFSET, ACTIVE_OFFSET])
    .onUpdate((e) => {
      if (isMe) {
        if (e.translationX <= 0) {
          translateX.value = e.translationX;
        }
      } else {
        if (e.translationX >= 0) {
          translateX.value = e.translationX;
        }
      }
    })
    .onEnd((e) => {
      // Kiểm tra nếu vượt quá ngưỡng kéo
      if (isMe && e.translationX < SWIPE_THRESHOLD) {
        runOnJS(handleReplyAction)(item);

        // Trả tin nhắn về vị trí 0
        translateX.value = withTiming(0, { duration: 150 });
      } else if (e.translationX > SWIPE_THRESHOLD) {
        runOnJS(handleReplyAction)(item);

        // Trả tin nhắn về vị trí 0
        translateX.value = withTiming(0, { duration: 150 });
      } else {
        // Nếu không đủ, đưa tin nhắn trở lại vị trí cũ
        translateX.value = withTiming(0, { duration: 150 });
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const avatarImage = (
    <AvatarWithFallback
      uri={item.sender.avatar}
      style={{ width: 40, height: 40, borderRadius: 100 }}
    />
  );

  return (
    <Animated.View
      entering={SlideInDown}
      style={[
        {
          justifyContent: isMe ? "flex-end" : "flex-start",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          gap: 8,
        },
        animatedStyles,
      ]}
    >
      {!isMe && avatarImage}
      <GestureDetector gesture={swipeToReplyGesture}>
        <Animated.View
          style={[
            styles.containerMessage,
            {
              backgroundColor: isMe ? theme.inversePrimary : theme.onPrimary,
            },
            isMe ? styles.borderForMe : styles.borderNotMe,
          ]}
        >
          <Text style={{ fontWeight: "600" }} children={user.name} />
          <View style={{}}>
            <Text>{item.content}</Text>
          </View>
          <Animated.View
            exiting={SlideOutLeft}
            style={[
              {
                alignItems: isMe ? "flex-start" : "flex-end",
              },
              styles.bubbleText,
            ]}
          >
            <Text
              style={{ fontSize: 10, color: theme.inverseSurface }}
              children={
                item.isSending
                  ? "sending..."
                  : format(item.createdAt, "hh:mm a")
              }
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  borderForMe: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  borderNotMe: {
    borderBottomEndRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  containerItem: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  containerMessage: {
    padding: 8,
    flexShrink: 1,
    gap: 4,
    maxWidth: "70%",
    minWidth: "30%",
    transitionDuration: "500ms",
  },
  bubbleText: {
    justifyContent: "flex-end",
    transitionProperty: "alignItem",
    transitionDuration: "500ms",
  },
});
