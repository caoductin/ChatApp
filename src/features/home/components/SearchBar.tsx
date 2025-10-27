import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const AnimatedTouableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    setTextSearch("");
  };

  const handleDismiss = () => {
    inputRef.current?.blur();
  };

  return (
    <Animated.View
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    >
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: isFocused ? 10.5 : 12,
          backgroundColor: "#ffffffff",
          borderRadius: 100,
          borderWidth: isFocused ? 1.5 : 0,
          borderColor: "#b5b5b5ff",
          gap: 8,
        }}
        layout={LinearTransition}
      >
        <Feather
          name="search"
          size={20}
          color={isFocused ? "gray" : "#d6d6d6ff"}
        />
        <TextInput
          ref={inputRef}
          placeholder="Seach..."
          value={textSearch}
          onChangeText={setTextSearch}
          style={{ flex: 1 }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {!!textSearch && (
          <AnimatedTouableOpacity
            onPress={handleClear}
            entering={ZoomIn.duration(100)}
            exiting={ZoomOut.duration(100)}
          >
            <Feather
              name="x"
              size={20}
              color={isFocused ? "gray" : "#d6d6d6ff"}
            />
          </AnimatedTouableOpacity>
        )}
      </Animated.View>
      {isFocused && (
        <AnimatedTouableOpacity
          onPress={handleDismiss}
          style={{ padding: 8, borderRadius: 50 }}
          entering={FadeInRight.duration(100)}
          exiting={FadeOutRight.duration(100)}
        >
          <Text style={{ fontWeight: "600" }} children={"Cancel"} />
        </AnimatedTouableOpacity>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
