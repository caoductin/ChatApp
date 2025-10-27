import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { LoginProps } from "./useLoginForm";
import { useAuth } from "@/context/authContext";

interface RegisterProps extends LoginProps {
  name?: string;
}

const useRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<RegisterProps>({});
  const [isloading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

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

  const handleSignup = async () => {
    if (validDate()) {
      try {
        setLoading(true);
        await signUp(email, password, name);
      } catch (err: any) {
        Alert.alert("Faild", err.message);
      } finally {
        setLoading(false);
      }
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
