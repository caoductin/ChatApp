import { useAppTheme } from "@/context/themeContext";
import { AnimatedButton } from "@/src/components/AnimatedButton";
import { Ionicons } from "@expo/vector-icons";
import { FC, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";

import Animated, { LinearTransition } from "react-native-reanimated";
import { MessageInputAction } from "./MessageInputAction";

interface MessageSenderBarProps extends TextInputProps {
  text: string;
  onChangeText: (value: string) => void;
  onSendMessage: () => void;
}

export const MessageSenderBar: FC<MessageSenderBarProps> = ({
  text,
  onChangeText,
  onSendMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = useAppTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.input}
    >
      <Animated.View
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <MessageInputAction
          isFocused={collapsed}
          chevronPress={() => {
            setCollapsed(false);
          }}
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Animated.View
            layout={LinearTransition}
            onLayout={(e) => {
              console.log("this ", e.nativeEvent.layout);
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              borderWidth: 0.5,
              backgroundColor: `${theme.primaryContainer}40`,
              borderRadius: 22,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <TextInput
              ref={inputRef}
              style={{
                flex: 1,
                paddingVertical: 6,
                alignItems: "center",
                alignContent: "center",
                marginRight: 25,
                textAlignVertical: "center",
              }}
              placeholder="Messages"
              multiline
              numberOfLines={3}
              value={text}
              onChangeText={(text) => {
                onChangeText(text);
                setCollapsed(true);
                if (text.length === 0) {
                  setCollapsed(false);
                  return;
                }
              }}
              onFocus={() => {
                setCollapsed(true);
                setIsFocused(true);
              }}
              onBlur={(e) => {
                setCollapsed(false);
                setIsFocused(false);
              }}
            />
          </Animated.View>

          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 0,
              paddingHorizontal: 8,
              top: 0,
              bottom: 0,
            }}
            layout={LinearTransition}
          >
            <Ionicons name="happy-outline" size={24} color="green" />
          </Animated.View>
        </View>
        {text.length !== 0 && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <AnimatedButton onPress={onSendMessage}>
              <Ionicons name="send" size={25} color={"blue"} />
            </AnimatedButton>
          </Animated.View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    padding: 8,
  },
});
