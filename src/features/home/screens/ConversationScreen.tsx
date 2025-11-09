import { useAuth } from "@/context/authContext";
import { useAppTheme } from "@/context/themeContext";
import { newConversation, newMessages } from "@/socket/socketEvent";
import { AvatarWithFallback } from "@/src/components/Avatar";
import { Message, messagesMock } from "@/src/mock/MessageList";
import { ResponseProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  LinearTransition,
  SlideInDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageSenderBar } from "../components/conversationScreen/MessageSenderBar";

const ConversationScreen = () => {
  const [messages, setMessages] = useState(messagesMock);
  const [text, onChangeText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    newMessages(newMessageHandler);
    return () => newMessages(newMessageHandler, true);
  }, []);

  const newMessageHandler = (res: ResponseProps) => {
    console.log("result ", res);
  };

  const sendMessage = () => {
    if (!user) {
      return;
    }
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id,
      receiverId: "user2",
      content: text,
      timestamp: new Date().toISOString(),
      type: "text",
      isRead: false,
    };
    setMessages([newMessage, ...messages]);
    newMessages({
      conversationId: "6909a932e48d472bc1f2b2b7",
      sender: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      content: text.trim(),
      attachement: ""
    });
    onChangeText("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderConversation />
      <MessagesList data={messages} />
      <MessageSenderBar
        onSendMessage={sendMessage}
        text={text}
        onChangeText={onChangeText}
      />
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
    <Animated.FlatList
      layout={LinearTransition}
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
  const mockUri = "https://randomuser.me/api/portraits/women/1.jpg";

  const avatarImage = (
    <AvatarWithFallback
      uri={mockUri}
      style={{ width: 40, height: 40, borderRadius: 100 }}
    />
  );

  return (
    <Animated.View
      entering={SlideInDown}
      style={{
        justifyContent: isMe ? "flex-end" : "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        gap: 8,
      }}
    >
      {!isMe && avatarImage}
      <View
        style={{
          backgroundColor: theme.onPrimary,
          padding: 8,
          borderRadius: 8,
          flexShrink: 1,
        }}
      >
        <View>
          <Text>Hoang</Text>
          <View style={{}}>
            <Text>{item.content}</Text>
          </View>
        </View>
      </View>
      {isMe && avatarImage}
    </Animated.View>
  );
};
export default ConversationScreen;
