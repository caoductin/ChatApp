import { useAppTheme } from "@/context/themeContext";
import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  appearanceSettings,
  SectionSetting,
  settingsConfig,
  systemSetting,
} from "./components/settingSection";
import { useAuth } from "@/context/authContext";

export const ProfileScreen: FC = () => {
  const { signOut } = useAuth();
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        gap: 10,
      }}
    >
      <View style={{}}>
        <HeaderProfile />
      </View>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <SectionSetting
          label="Setting"
          itemSetting={settingsConfig}
          handlers={{
            settingPress: () => console.log("Setting"),
            emailPress: () => console.log("Email"),
            languagePress: () => console.log("Language"),
            privacyPress: () => console.log("Privacy"),
          }}
        />

        <SectionSetting
          label="Appearance and exprience"
          itemSetting={appearanceSettings}
          handlers={{
            settingPress: () => console.log("Setting"),
            emailPress: () => console.log("Email"),
            languagePress: () => console.log("Language"),
            privacyPress: () => console.log("Privacy"),
          }}
        />
        <SectionSetting
          label="Another"
          itemSetting={systemSetting}
          handlers={{
            deletePress: () => console.log("Setting"),
            termServicesPress: () => console.log("tempServicesPress"),
          }}
        />
        <FooterProfile onpress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
};

const HeaderProfile: FC = () => {
  const theme = useAppTheme();
  return (
    <View style={{ alignItems: "center", gap: 6 }}>
      <Image
        src="https://randomuser.me/api/portraits/women/2.jpg"
        width={48}
        height={48}
        style={{ borderRadius: 100 }}
      />
      <Text style={{ color: theme.inverseSurface, fontWeight: "500" }}>
        CoffeesStores
      </Text>
      <Text
        style={{ color: theme.inverseSurface, fontWeight: "500" }}
        children={"caoductintin@gmail.com"}
      />
      <TouchableOpacity>
        <View
          style={{
            padding: 8,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "white" }} children={"Edit profile"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FooterProfile: FC<{ onpress: () => void }> = ({ onpress }) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        backgroundColor: theme.tertiaryFixedDim,
        alignItems: "center",
        padding: 12,
        borderRadius: 100,
      }}
    >
      <Text style={{ fontWeight: 600 }} children={"Logout"} />
    </TouchableOpacity>
  );
};

const createStyles