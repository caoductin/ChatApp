import { AnimatedButton } from "@/src/components/AnimatedButton";
import { AvatarWithFallback } from "@/src/components/Avatar";
import { ConversationProps } from "@/types";
import { formatDistance } from "date-fns";
import { router } from "expo-router";
import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface MessagesItemProps {
  name: string | undefined;
  avatar: string | undefined;
  time: string;
  lastMessage: string | undefined;
  unreadCount: number;
  onPress: () => void;
}

const MessageItem: FC<MessagesItemProps> = ({
  name = "Unknown",
  avatar,
  time,
  lastMessage = "Don't have message here",
  unreadCount,
  onPress,
}) => {
  return (
    <AnimatedButton
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <AvatarWithFallback
        uri={avatar}
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.name} children={name} />
          <Text
            style={styles.message}
            children={formatDistance(time, new Date(), {
              addSuffix: true,
            })}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[styles.message, unreadCount > 0 && styles.messageUnread]}
            children={lastMessage}
          />
          {unreadCount > 0 && (
            <View style={styles.unreadCotainer}>
              <Text style={{ color: "white", fontSize: 12 }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedButton>
  );
};

interface ListMessageProps {
  data?: ConversationProps[];
}
export const ListMessage: FC<ListMessageProps> = ({ data }) => {
  const handledPress = (conversation: ConversationProps) => {
    router.push({
      pathname: "/(home)/conversation/[id]",
      params: {
        id: conversation._id,
        chatName: conversation.name,
      },
    });
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
      keyExtractor={(item) => item._id}
      data={data}
      renderItem={({ item }) => (
        <MessageItem
          name={item.name}
          time={item.createdAt}
          lastMessage={item.lastMessage?.content}
          unreadCount={0}
          avatar={item.avatar || undefined}
          onPress={() => handledPress(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  unreadNumber: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: "#0d0df8ff",
  },
  name: {
    fontWeight: "600",
  },
  message: {
    color: "#828080ff",
  },
  messageUnread: {
    color: "#0d0df8ff",
  },
  unreadCotainer: {
    backgroundColor: "#0d0df8ff",
    borderRadius: 999,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
