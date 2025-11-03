import { useAppTheme } from "@/context/themeContext";
import { AnimatedTouchableOpacity } from "@/src/components";
import { Feather } from "@expo/vector-icons";
import React, { FC, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TextStyle } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

interface SearchBarProps {
  label?: string;
  cancelLabel?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  onBlur?: () => void;
  onCancel?: () => void;
  onFocus?: () => void;
  isHiddenIcon?: boolean;
  textInputStyle?: TextStyle;
}

const SearchBar: FC<SearchBarProps> = ({
  label = "Search...",
  cancelLabel = "Cancel",
  value,
  onChangeText,
  onClear,
  onBlur,
  onCancel,
  onFocus,
  isHiddenIcon = false,
  textInputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const theme = useAppTheme();

  const handleClear = () => {
    onClear?.();
    onChangeText("");
  };

  const handleDismiss = () => {
    inputRef.current?.blur();
    onCancel?.();
  };

  return (
    <Animated.View
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 12,
          backgroundColor: theme.onPrimary,
          borderRadius: 100,
          borderWidth: isFocused ? 1.5 : 0,
          borderColor: "#b5b5b5ff",
          paddingVertical: isFocused ? 6.5 : 8,
          gap: 8,
          zIndex: 1,
          transitionProperty: ["borderWidth", "borderColor"],
          transitionDuration: "200ms",
        }}
      >
        {!isHiddenIcon && (
          <Feather
            name="search"
            size={20}
            color={isFocused ? "gray" : "#d6d6d6ff"}
          />
        )}
        <TextInput
          ref={inputRef}
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          style={[{ flex: 1 }, textInputStyle]}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
        />
        {!!value && (
          <AnimatedTouchableOpacity
            onPress={handleClear}
            entering={ZoomIn.duration(100)}
            exiting={ZoomOut.duration(100)}
          >
            <Feather
              name="x"
              size={20}
              color={isFocused ? "gray" : "#d6d6d6ff"}
            />
          </AnimatedTouchableOpacity>
        )}
      </Animated.View>
      {isFocused && (
        <AnimatedTouchableOpacity
          onPress={handleDismiss}
          style={{ padding: 8, borderRadius: 50 }}
          entering={FadeInRight.duration(100)}
          exiting={FadeOutRight.duration(100)}
        >
          <Text style={{ fontWeight: "600" }} children={cancelLabel} />
        </AnimatedTouchableOpacity>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
