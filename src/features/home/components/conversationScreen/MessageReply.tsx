import { useAppTheme } from "@/context/themeContext";
import { MessageProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface ReplyMessageProps {
  item: MessageProps;
  onPress: () => void;
}

const MessageReply: FC<ReplyMessageProps> = ({ item, onPress }) => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        marginHorizontal: 8,
        padding: 8,
        flexDirection: "row",
        backgroundColor: theme.onPrimary,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
      }}
    >
      <View
        style={{
          backgroundColor: "blue",
          width: 4,
          height: "100%",
          borderRadius: 8,
        }}
      ></View>
      <View style={{ flex: 1 }}>
        <Text children={item.sender.name} />
        <Text lineBreakMode="tail" numberOfLines={1} children={item.content} />
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", alignContent: "center" }}
        onPress={onPress}
      >
        <Ionicons name="close" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageReply;
