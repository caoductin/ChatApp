import { ThemeType, useAppTheme } from "@/context/themeContext";
import { FC } from "react";
import {
  Image,
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

export const EditProfileScreen: FC = () => {
  const theme = useAppTheme();
  const mockUri = "https://randomuser.me/api/portraits/women/2.jpg";
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Animated.View style={{ alignItems: "center" }}>
        <Avatar uri={mockUri} />
      </Animated.View>
      <View style={{ flex: 1, gap: 16 }}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontWeight: "600" }}>Account Infomation</Text>
          <AcountInfoView />
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ fontWeight: "600" }}>Password Infomation</Text>
          <PasswordView />
        </View>
        <FooterProfile onpress={() => {}} theme={theme} />
      </View>
    </View>
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface AvatarProps {
  uri: string;
  onpress?: () => void;
}
const Avatar: FC<AvatarProps> = ({ uri, onpress }) => {
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
      onPress={onpress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
    >
      <View
        style={{
          borderColor: theme.onPrimary,
          borderWidth: 8,
          borderRadius: 100,
        }}
      >
        <Image
          source={{ uri: uri }}
          defaultSource={require("../../../assets/images/defaultAvatar.png")}
          style={styles.avatar}
        />
      </View>
    </AnimatedTouchable>
  );
};

interface LabelInputProps {
  label: string;
  value?: string;
  onChange?: (text: string) => void;
  viewStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const LabelInput: FC<LabelInputProps> = ({
  label,
  value,
  onChange,
  viewStyle,
  inputStyle,
}) => {
  return (
    <View style={[{ gap: 8 }, viewStyle]}>
      <Text>{label}</Text>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const AcountInfoView: FC = () => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        gap: 8,
        backgroundColor: theme.onSecondary,
        padding: 16,
        borderCurve: "continuous",
        borderRadius: 24,
      }}
    >
      <LabelInput label={"User name"} />
      <LabelInput label={"Email"} />
    </View>
  );
};

const PasswordView: FC = () => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        gap: 8,
        backgroundColor: theme.onSecondary,
        padding: 16,
        borderCurve: "continuous",
        borderRadius: 24,
      }}
    >
      <LabelInput label={"Passwrord"} />
      <LabelInput label={"Confirm passwrod"} />
    </View>
  );
};

const FooterProfile: FC<{ onpress: () => void; theme: ThemeType }> = ({
  onpress,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        backgroundColor: theme.tertiaryFixedDim,
        alignItems: "center",
        padding: 12,
        borderRadius: 100,
      }}
    >
      <Text style={{ fontWeight: 600 }} children={"Update"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textInput: {
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: "#7b7b7bff",
    shadowRadius: 10,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: "#363636ff",
    shadowOpacity: 20,
    elevation: 8,
  },
});
