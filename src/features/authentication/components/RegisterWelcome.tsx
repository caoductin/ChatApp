import BackButton from "@/src/components/BackButton";
import Typo from "@/src/components/Typo";
import { FC } from "react";
import { View, StyleSheet } from "react-native";

export const RegisterWelcome: FC = () => {
  return (
    <View style={{ gap: 8 }}>
      <Typo size={30} fontWeight={"600"}>
        Welcome back
      </Typo>
      <Typo size={16} fontWeight={"600"}>
        We are happy to see you!
      </Typo>
    </View>
  );
};
