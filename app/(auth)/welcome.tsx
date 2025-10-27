import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { colors, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper showPattern={true}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo color={colors.white} size={43} fontWeight="bold">
            Buddy
          </Typo>
        </View>
        <Animated.Image
          source={require("../../assets/images/welcome.png")}
          resizeMode={"contain"}
          style={styles.image}
        />
        <View>
          <Typo color={colors.white} size={30} fontWeight="bold">
            Welcome to
          </Typo>
          <Typo color={colors.white} size={30} fontWeight="bold">
            chat app where
          </Typo>
          <Typo color={colors.white} size={30} fontWeight="bold">
            connect with anyone
          </Typo>
        </View>
        <Button onPress={() => router.push("/(auth)/register")}>
          <Typo color={colors.white} size={24} fontWeight={"600"}>
            Get Start
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._10,
    marginVertical: spacingX._10,
  },
  image: {
    height: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
});
