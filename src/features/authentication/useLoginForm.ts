import { router, useNavigation } from "expo-router";
import { useCallback, useState } from "react";

export interface LoginProps {
  email?: string;
  password?: string;
}

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginProps>();
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

  const handleLogin = () => {
    if (validateLogin()) {
      router.navigate("/(main)/home");
    }
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
    setError,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    gotoRegister,
  };
};
