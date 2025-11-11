import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { uploadFileToCloudinary } from "@/services/imageService";
import { updateProfile } from "@/socket/socketEvent";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useRouter } from "expo-router";
import { FC, useEffect, useReducer } from "react";
import { useEditProfile } from "./hooks/useEditProfile";
import {
  Alert,
  Image,
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
import { SafeAreaView } from "react-native-safe-area-context";

const formReducer = (state: any, action: any) => {
  return { ...state, [action.field]: action.value };
};

export const EditProfileScreen: FC = () => {
  const { user, updateToken } = useAuth();
  const theme = useAppTheme();
  const { formState, handleChange, handleSubmitProfile, pickImage } =
    useEditProfile(user, updateToken);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderProfile />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScrollView>
          <Animated.View style={{ alignItems: "center" }}>
            <Avatar uri={formState.avatar} onPress={pickImage} />
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
                oldPassword={formState.oldPassword}
                newPassword={formState.newPassword}
                onChange={handleChange}
              />
            </View>
            <FooterProfile onpress={handleSubmitProfile} theme={theme} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const HeaderProfile: FC = () => {
  return (
    <View>
      <TouchableOpacity onPress={router.back}>
        <Feather name="chevron-left" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface AvatarProps {
  uri: string;
  onPress?: () => void;
}

const Avatar: FC<AvatarProps> = ({ uri, onPress }) => {
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
  editable?: boolean;
}

const LabelInput: FC<LabelInputProps> = ({
  label,
  value,
  onChange,
  viewStyle,
  inputStyle,
  editable = true,
}) => {
  return (
    <View style={[{ gap: 8 }, viewStyle]}>
      <Text>{label}</Text>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={value}
        onChangeText={onChange}
        editable={editable}
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
        editable={false}
      />
    </View>
  );
};

interface PasswordProps {
  oldPassword: string;
  newPassword: string;
  onChange: (field: string, value: string) => void;
}

const PasswordView: FC<PasswordProps> = ({
  oldPassword,
  newPassword,
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
        value={oldPassword}
        onChange={(text) => onChange("oldPassword", text)}
      />
      <LabelInput
        label={"New passwrod"}
        value={newPassword}
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
