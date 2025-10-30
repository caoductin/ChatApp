import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { UserDataProps } from "@/types";
import { FC, useEffect, useReducer, useState } from "react";
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

const formReducer = (state: any, action: any) => {
  return { ...state, [action.field]: action.value };
};

export const EditProfileScreen: FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    dispatch({ field, value });
  };

  const { user } = useAuth();
  const [userData, setUserData] = useState<UserDataProps>({
    name: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
      dispatch({ field: "username", value: user.name || "" });
      dispatch({ field: "email", value: user.email || "" });
      console.log("this is form state 1 ", formState);
    }
    console.log("this is user", user);
  }, [user]);

  useEffect(() => {
    console.log("formState changed: ", formState);
  }, [formState]);

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
          <AcountInfoView
            name={formState.name}
            email={formState.email}
            onChange={handleChange}
          />
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ fontWeight: "600" }}>Password Infomation</Text>
          <PasswordView
            password={formState.password}
            confirmPassword={formState.confirmPassword}
            onChange={handleChange}
          />
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

interface AccountInfoProps {
  name: string;
  email: string;
  onChange: (field: string, value: string) => void;
}

const AcountInfoView: FC<AccountInfoProps> = ({ name, email, onChange }) => {
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
      <LabelInput
        label={"User name"}
        value={name}
        onChange={(text: string) => onChange("name", text)}
      />
      <LabelInput
        label={"Email"}
        value={email}
        onChange={(text: string) => onChange("email", text)}
      />
    </View>
  );
};

interface PasswordProps {
  password: string;
  confirmPassword: string;
  onChange: (field: string, value: string) => void;
}

const PasswordView: FC<PasswordProps> = ({
  password,
  confirmPassword,
  onChange,
}) => {
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
      <LabelInput
        label={"Old Password"}
        value={password}
        onChange={(text) => onChange("password", text)}
      />
      <LabelInput
        label={"New passwrod"}
        value={confirmPassword}
        onChange={(text) => onChange("newPassword", text)}
      />
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
