import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServies";
import { storage } from "@/storage";

const AuthContext = createContext<AuthContextProps>(null as never);

export const useAuth = () => {
  const context = use(AuthContext);
  if (context == null) {
    throw new Error("AuthProvider must be provided");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const token = storage.getString("token");
  //   if (token) {
  //     setIsLogin(true);
  //   }
  // }, []); 

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      storage.set("token", token);
      const decode = jwtDecode<DecodedTokenProps>(token);
      console.log("decode", decode);
      setUser(decode.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    console.log(response);
    setIsLogin(true);
    await updateToken(response.token);
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
    setIsLogin(false);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext
      value={{ isLogin, token, user, signIn, signOut, signUp, updateToken }}
    >
      {children}
    </AuthContext>
  );
};
