import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { LoginProps } from "./useLoginForm";

interface RegisterProps extends LoginProps {
  name?: string;
}

const useRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<RegisterProps>({});
  const router = useRouter();

  const validDate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Name not empty";
    }
    if (!email.trim()) {
      newErrors.email = "Email not empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password not empty";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, password]);

  const handleSignup = () => {
    if (validDate()) {
      Alert.alert("Success", "You have been login");
    }
  };

  const navigateToLogin = () => {
    router.navigate("/login");
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSignup,
    navigateToLogin,
  };
};

export default useRegisterForm;
