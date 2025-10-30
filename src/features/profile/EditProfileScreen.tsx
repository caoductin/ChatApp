import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { updateProfile } from "@/socket/socketEvent";
import { useRouter } from "expo-router";
import { FC, useEffect, useReducer, useState } from "react";
// import * as ImagePicker from "expoz-image-picker";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
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
  const { user, updateToken } = useAuth();
  const theme = useAppTheme();
  const router = useRouter();
  const mockUri = "https://randomuser.me/api/portraits/women/2.jpg";
  const [formState, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    dispatch({ field, value });
  };

  useEffect(() => {
    if (user) {
      console.log("this is user", user);
      dispatch({ field: "name", value: user.name || "" });
      dispatch({ field: "avatar", value: user.avatar || "" });
      dispatch({ field: "email", value: user.email || "" });
    }
  }, [user]);

  useEffect(() => {
    updateProfile(processUpdateProfile);
    return () => {
      updateProfile(processUpdateProfile, true);
    };
  }, []);

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ["images"],
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 0.5,
    // });
    // if (!result.canceled) {
    //   console.log(result.assets[0].uri);
    //   dispatch({ field: "avatar", value: result.assets[0].uri });
    // }
  };

  const processUpdateProfile = (res: any) => {
    console.log("this is res from socket", res);
    if (res.success) {
      updateToken(res.data.newToken);
      router.back();
    } else {
      Alert.alert("Failed", res.msg);
    }
  };

  const hanleSubmitProfile = () => {
    if (!formState.name.trim()) {
      Alert.alert("Error", "Please enter the name");
      return;
    }
    console.log(formState);
    updateProfile(formState);
  };

  return (
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
          <FooterProfile onpress={hanleSubmitProfile} theme={theme} />
        </View>
      </ScrollView>
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
