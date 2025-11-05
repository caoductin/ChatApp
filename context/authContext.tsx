import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServies";
import { storage } from "@/storage";
import { connectSocket, disConnectSocket } from "@/socket/socket";

const AuthContext = createContext<AuthContextProps>(null as never);

export const Token = "Token";

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

  useEffect(() => {
    const getToken = async () => {
      const token = await storage.getItem(Token);

      if (token) {
        const decode = jwtDecode<DecodedTokenProps>(token);
        setUser(decode.user);
        await connectSocket();
        setIsLogin(true);
      }
    };
    getToken();
  }, []);

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await storage.setItem(Token, token);
      const decode = jwtDecode<DecodedTokenProps>(token);
      console.log("decode", decode);
      setUser(decode.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    console.log(response);
    await Promise.all([updateToken(response.token), connectSocket()]);
    setIsLogin(true);
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null
  ) => {
    const response = await register(email, password, name, avatar);
    await Promise.all([updateToken(response.token), connectSocket()]);
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    setIsLogin(false);
    await Promise.all([storage.removeItem(Token), disConnectSocket()]);
  };

  return (
    <AuthContext
      value={{ isLogin, token, user, signIn, signOut, signUp, updateToken }}
    >
      {children}
    </AuthContext>
  );
};
