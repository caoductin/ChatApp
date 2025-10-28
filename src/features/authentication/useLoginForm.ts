import { useAuth } from "@/context/authContext";
import { router, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface LoginProps {
  email?: string;
  password?: string;
}

export const useLoginForm = () => {
  const { signIn, isLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginProps>();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validateLogin = useCallback(() => {
    const newError: Record<string, string> = {};
    if (!email.trim()) {
      newError.email = "Please enter the email";
    }
    if (!password.trim()) {
      newError.password = "Please enter the password";
    }
    setError(newError);
    return error && Object.keys(error).length === 0;
  }, [email, password]);

  const handleLogin = async () => {
    // if (validateLogin()) {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (er: any) {
      Alert.alert("Login failed", er.message);
    } finally {
      setLoading(false);
    }
    // }
  };

  const gotoRegister = () => {
    const routeName = navigation.getState()?.routeNames;
    if (routeName?.includes("(auth)/register")) {
      navigation.goBack();
    } else {
      router.push("/(auth)/register");
    }
  };

  return {
    error,
    isLoading,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    gotoRegister,
  };
};
