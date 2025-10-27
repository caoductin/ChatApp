import { colors, radius } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps, FC } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Text,
} from "react-native";

type IconProps = ComponentProps<typeof Ionicons>;

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
  error: string | undefined;
}

export const FormField: FC<FormProps> = ({ icon, label, error, ...props }) => {
  return (
    <View>
      <TextField icon={icon} placeholder={label} {...props} />
      {error && <Text style={{ color: "red" }} children={error} />}
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
