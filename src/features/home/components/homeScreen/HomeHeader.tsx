import { ThemeType, useAppTheme } from "@/context/themeContext";
import { FeatherType } from "@/src/components";
import { Feather } from "@expo/vector-icons";
import { FC, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderHomeProps {}

const HeaderHome: FC = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 16, fontWeight: "bold" }}
        children={"Messages"}
      />
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View
          style={{
            padding: 8,
            backgroundColor: "#e8e5e5ff",
            borderRadius: 100,
          }}
        >
          <Feather name="facebook" size={20} color={"#1b1a1aff"} />
        </View>
        <IconView theme={theme} name="facebook" size={20} color={"#1b1a1aff"} />
        {/* <View
          style={{
            padding: 8,
            backgroundColor: "#e8e5e5ff",
            borderRadius: 100,
          }}
        >
          <Feather name="facebook" size={20} color={"#1b1a1aff"} />
        </View> */}
      </View>
    </View>
  );
};

interface IconViewProps extends FeatherType {
  theme: ThemeType;
}

const IconView: FC<IconViewProps> = ({ theme, ...featherProps }) => {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: theme.inverseSurface,
        borderRadius: 100,
      }}
    >
      <Feather {...featherProps} />
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.background,
    },
  });

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });

export default HeaderHome;
