import { colors, radius } from "@/constants/theme";
import { ThemeType } from "@/context/themeContext";
import { IconProps } from "@/src/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export const TextField: FC<TextInputProps & { icon: IconProps["name"] }> = ({
  icon,
  style,
  ...props
}) => {
  return (
    <View style={styles.textField}>
      <Ionicons name={icon} size={20} color={colors.neutral600} />
      <TextInput style={[styles.textInput, style]} {...props} />
    </View>
  );
};

interface FormProps extends TextInputProps {
  icon: IconProps["name"];
  label: string;
  theme: ThemeType;
  error: string | undefined;
}

export const FormField: FC<FormProps> = ({
  icon,
  theme,
  label,
  error,
  ...props
}) => {
  return (
    <View>
      <TextField icon={icon} placeholder={label} {...props} />
      {error && <Text style={{ color: theme.error }} children={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.neutral200,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    paddingVertical: 16,
  },
});
