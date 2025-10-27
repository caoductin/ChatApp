import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  View,
} from "react-native";
const { height } = Dimensions.get("window");

const ScreenWrapper = ({
  style,
  children,
  isModal,
  showPattern,
  bgOpacity,
}: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{ opacity: showPattern ? bgOpacity : 1 }}
      source={require("../../assets/images/bgPattern.png")}
    >
      <View
        style={[
          {
            flex: 1,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
          },
          style,
        ]}
      >
        <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} />
        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenWrapper;
