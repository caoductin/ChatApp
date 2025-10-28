import { useAppTheme } from "@/context/themeContext";
import { Feather } from "@expo/vector-icons";
import React, { ComponentProps, FC } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

type FeatherIcon = React.ComponentProps<typeof Feather>;

interface ItemSettingProps extends FeatherIcon {
  label: string;
  viewStyle?: ViewStyle;
  onPress?: () => void;
}

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface SettingConfigProps {
  label: string;
  icon: FeatherIconName;
  onPressKey: string;
}

export const settingsConfig: SettingConfigProps[] = [
  { label: "Setting", icon: "settings", onPressKey: "settingPress" },
  { label: "Email", icon: "mail", onPressKey: "emailPress" },
  { label: "Language", icon: "globe", onPressKey: "languagePress" },
  { label: "Privacy", icon: "file-plus", onPressKey: "privacyPress" },
];

export const appearanceSettings: SettingConfigProps[] = [
  { label: "Theme", icon: "sun", onPressKey: "themePress" },
  { label: "Notification", icon: "bell", onPressKey: "notificationPress" },
];

export const systemSetting: SettingConfigProps[] = [
  { label: "Delete account", icon: "delete", onPressKey: "deletePress" },
  { label: "Terms of Service", icon: "book", onPressKey: "termServicesPress" },
];

// interface SectionSettingHandlers {
//   settingPress?: () => void;
//   emailPress?: () => void;
//   languagePress?: () => void;
//   privacyPress?: () => void;
// }

const allSettings = [
  ...appearanceSettings,
  ...systemSetting,
  ...settingsConfig,
];

type SectionSettingHandlers = {
  [K in (typeof allSettings)[number]["onPressKey"]]?: () => void;
};
interface SectionSettingProps {
  label: string;
  itemSetting: SettingConfigProps[];
  handlers: SectionSettingHandlers;
}

export const SectionSetting: FC<SectionSettingProps> = ({
  label,
  itemSetting,
  handlers,
}) => {
  const theme = useAppTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: theme.onPrimaryFixedVariant }} children={label} />
      <View
        style={{
          gap: 24,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: theme.onPrimary,
          borderRadius: 32,
        }}
      >
        {itemSetting.map((item, index) => {
          const key = item.onPressKey as keyof SectionSettingHandlers;
          const handler = handlers[key];
          return (
            <ItemSetting
              key={index}
              label={item.label}
              name={item.icon}
              size={20}
              onPress={handler}
            />
          );
        })}
      </View>
    </View>
  );
};

const ItemSetting: FC<ItemSettingProps> = ({
  label,
  onPress,
  viewStyle,
  ...props
}) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[{ flexDirection: "row", gap: 8 }, viewStyle]}>
        <Feather {...props} color={theme.onSecondaryFixedVariant} />
        <Text
          style={{ flex: 1, color: theme.onSecondaryFixedVariant }}
          children={label}
        />
        <Feather name={"chevron-right"} size={20} />
      </View>
    </TouchableOpacity>
  );
};
