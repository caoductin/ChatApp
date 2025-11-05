import { colors, spacingX } from "@/constants/theme";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { RegisterHeader } from "../components/RegisterHeader";
import { RegisterWelcome } from "../components/RegisterWelcome";
import { FormField } from "../components/TextField";
import useRegisterForm from "../useRegisterForm";

const Register = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSignup,
    navigateToLogin,
  } = useRegisterForm();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper showPattern={false} bgOpacity={1}>
        <RegisterHeader />
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={{
              gap: 32,
              paddingHorizontal: 16,
              paddingVertical: 32,
            }}
          >
            <RegisterWelcome />
            <View style={styles.form}>
              <FormField
                value={name}
                onChangeText={setName}
                icon={"person-outline"}
                label={"Enter the name"}
                error={error.name}
              />
              <FormField
                value={email}
                onChangeText={setEmail}
                icon="at-outline"
                label="Enter the email"
                error={error.email}
              />
              <FormField
                value={password}
                onChangeText={setPassword}
                icon="lock-closed-outline"
                label="Enter the password"
                error={error.password}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                gap: 16,
              }}
            >
              <Button onPress={handleSignup}>
                <Typo fontWeight={"700"} size={16}>
                  Sign up
                </Typo>
              </Button>
              <Animated.View
                style={{
                  animationDuration: 2000,
                  animationName: {
                    "0%": {
                      transform: [{ rotateX: "0deg" }, { perspective: 600 }],
                    },
                    "100%": {
                      transform: [{ rotateX: "180deg" }, { perspective: 600 }],
                    },
                  },
                  animationIterationCount: "infinite",
                  animationTimingFunction: "ease-in-out",
                  animationDirection: "alternate",
                }}
              >
                <RegisterFooter onLoginPress={navigateToLogin} />
              </Animated.View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

interface RegisterFooterProps {
  onLoginPress: () => void;
}

const RegisterFooter: FC<RegisterFooterProps> = ({ onLoginPress }) => {
  return (
    <Typo style={{ textAlign: "center" }}>
      Already have an account?{" "}
      <Text
        onPress={onLoginPress}
        style={{ color: colors.primaryDark, fontWeight: "bold" }}
      >
        Login
      </Text>
    </Typo>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: spacingX._40,
    borderTopRightRadius: spacingX._40,
    marginTop: spacingX._10,
  },
  form: {
    gap: 16,
  },
});

export default Register;
