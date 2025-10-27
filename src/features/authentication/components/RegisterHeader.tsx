import BackButton from "@/src/components/BackButton";
import Typo from "@/src/components/Typo";
import { FC } from "react";
import { View, StyleSheet } from "react-native";

export const RegisterHeader: FC = () => {
  return (
    <View style={styles.header}>
      <BackButton iconSize={30} />
      <Typo color="white">Need some help?</Typo>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
  },
});
