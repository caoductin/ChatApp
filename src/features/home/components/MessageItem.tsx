import { FC } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { mockMessages } from "../../mockData";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { ConversationProps } from "@/types";
import { Avatar, AvatarWithFallback } from "@/src/components/Avatar";

interface MessagesItemProps {
  name: string | undefined;
  avatar: string | undefined;
  time: string;
  lastMessage: string | undefined;
  unreadCount: number;
}

const MessageItem: FC<MessagesItemProps> = ({
  name = "Unknown",
  avatar,
  time,
  lastMessage = "Don't have message here",
  unreadCount,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
      }}
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
    </View>
  );
};

interface ListMessageProps {
  data?: ConversationProps[];
}
export const ListMessage: FC<ListMessageProps> = ({ data }) => {
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
