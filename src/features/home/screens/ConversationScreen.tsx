import { useAppTheme } from "@/context/themeContext";
import { AvatarWithFallback } from "@/src/components/Avatar";
import { Message, messagesMock } from "@/src/mock/MessageList";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageSenderBar } from "../components/conversationScreen/MessageSenderBar";

const ConversationScreen = () => {
  const [messages, setMessages] = useState(messagesMock);
  const [text, onChangeText] = useState(null);
  const sendMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "user1",
      receiverId: "user2",
      content: "hello you ",
      timestamp: new Date().toISOString(),
      type: "text",
      isRead: false,
    };
    setMessages([newMessage, ...messages]);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderConversation />
      <MessagesList data={messages} />
      <MessageSenderBar onSendMessage={sendMessage} />
    </SafeAreaView>
  );
};

const HeaderConversation: FC = () => {
  const router = useRouter();
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.background,
        paddingHorizontal: 8,
      }}
    >
      <TouchableOpacity onPress={router.back}>
        <Feather name="chevron-left" size={25} />
      </TouchableOpacity>
      <Feather name="phone-call" size={20} />
    </View>
  );
};

interface MessagesListProps {
  data: Message[];
}

const MessagesList: FC<MessagesListProps> = ({ data }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      inverted
      contentContainerStyle={{
        gap: 20,
        paddingBottom: 40,
        paddingHorizontal: 8,
      }}
      keyExtractor={(item) => item.id}
      data={data}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      renderItem={({ item }) => <MessageItem item={item} />}
    />
  );
};

interface MessageItemProps {
  item: Message;
}

const MessageItem: FC<MessageItemProps> = ({ item }) => {
  const isMe = item.senderId == "user1";
  const theme = useAppTheme();
  console.log("this is is me", isMe);
  const mockUri = "https://randomuser.me/api/portraits/women/1.jpg";

  const avatarImage = (
    <AvatarWithFallback
      uri={mockUri}
      style={{ width: 40, height: 40, borderRadius: 100 }}
    />
  );

  return (
    <View
      style={{
        justifyContent: isMe ? "flex-end" : "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
      }}
    >
      {!isMe && avatarImage}
      <View
        style={{
          backgroundColor: theme.onPrimary,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <View>
          <Text>Hoang</Text>
          <Text>{item.content}</Text>
        </View>
      </View>
      {isMe && avatarImage}
    </View>
  );
};
export default ConversationScreen;
