import { colors, spacingX } from "@/constants/theme";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { router, useNavigation } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterWelcome } from "./components/RegisterWelcome";
import { FormField } from "./components/TextField";
import { useLoginForm } from "./useLoginForm";
import { FC } from "react";

const Login = () => {
  const {
    email,
    setEmail,
    setPassword,
    password,
    error,
    handleLogin,
    gotoRegister,
  } = useLoginForm();
  return (
    <ScreenWrapper showPattern={false} bgOpacity={1}>
      <RegisterHeader />
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{
            gap: 32,
            paddingHorizontal: 16,
            paddingVertical: 32,
          }}
          automaticallyAdjustKeyboardInsets
        >
          <RegisterWelcome />
          <View style={styles.form}>
            <FormField
              value={email}
              onChangeText={setEmail}
              icon="at-outline"
              label="Enter the email"
              error={error?.email}
            />
            <FormField
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              label="Enter the passwrod"
              error={error?.password}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              gap: 16,
            }}
          >
            <Button onPress={handleLogin}>
              <Typo fontWeight={"700"} size={16}>
                Sign up
              </Typo>
            </Button>
            <LoginFooter gotoRegister={gotoRegister} />;
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

interface LoginFooterProps {
  gotoRegister: () => void;
}
const LoginFooter: FC<LoginFooterProps> = ({ gotoRegister }) => {
  return (
    <Typo style={{ textAlign: "center" }}>
      Already have an account?
      <Text
        onPress={gotoRegister}
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

export default Login;
