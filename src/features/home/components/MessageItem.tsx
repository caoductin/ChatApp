import { FC } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { mockMessages } from "../../mockData";

interface MessagesItemProps {
  name: string;
  avatar?: string;
  time: string;
  lastMessage: string;
  unreadCount: number;
}

const MessageItem: FC<MessagesItemProps> = ({
  name,
  avatar,
  time,
  lastMessage,
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
      <Image
        source={{ uri: avatar }}
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
          <Text style={styles.message} children={time} />
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

export const ListMessage: FC = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
      data={mockMessages}
      renderItem={({ item }) => (
        <MessageItem
          name={item.name}
          time={item.time}
          lastMessage={item.lastMessage}
          unreadCount={item.unreadCount}
          avatar={item.avatar}
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
