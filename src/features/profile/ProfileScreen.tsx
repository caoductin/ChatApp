import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  appearanceSettings,
  SectionSetting,
  settingsConfig,
  systemSetting,
} from "./components/settingSection";

export const ProfileScreen: FC = () => {
  const { signOut } = useAuth();
  const theme = useAppTheme();

  const handleSignOut = () => {
    Alert.alert("Infomation", "Are you sure to want logout", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel logout"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: signOut,
        style: "destructive",
      },
    ]);
  };

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
        <FooterProfile onPress={handleSignOut} theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
};

const HeaderProfile: FC = () => {
  const theme = useAppTheme();
  const router = useRouter();
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
      <TouchableOpacity
        onPress={() => {
          router.navigate("/profile/edit-info");
        }}
      >
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

interface FooterProfileProps {
  onPress: () => void;
  theme: ThemeType;
}

const FooterProfile: FC<FooterProfileProps> = ({ onPress, theme }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
