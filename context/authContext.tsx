import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, use, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServies";

const AuthContext = createContext<AuthContextProps>(null as never);

export const useAuth = () => {
  const context = use(AuthContext);
  if (context == null) {
    throw new Error("AuthProvider must be provided");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      const decode = jwtDecode<DecodedTokenProps>(token);
      console.log("decode", decode);
      setUser(decode.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null
  ) => {
    const response = await register(email, password, name, avatar);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext value={{ token, user, signIn, signOut, signUp, updateToken }}>
      {children}
    </AuthContext>
  );
};
