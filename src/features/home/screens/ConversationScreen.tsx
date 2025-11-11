import { useAuth } from "@/context/authContext";
import { useAppTheme } from "@/context/themeContext";
import { AvatarWithFallback } from "@/src/components/Avatar";
import { MessageProps, UserProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideOutLeft,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageSenderBar } from "../components/conversationScreen/MessageSenderBar";
import { useConversationMessages } from "../hooks/useConversationMessages";

const ConversationScreen = () => {
  // const [messages, setMessages] = useState<MessageProps[]>([]);
  // const [text, onChangeText] = useState("");
  const { user } = useAuth();
  const { conversation, chatName } = useLocalSearchParams<{
    conversation: string;
    chatName: string;
  }>();
  const { messages, onChangeText, text, sendMessage } = useConversationMessages(
    user,
    conversation as string
  );

  // useEffect(() => {
  //   console.log("this is conversation", conversation);
  // }, []);

  // useEffect(() => {
  //   newMessages(newMessageHandler);
  //   getMessages(getMessageHandler);
  //   getMessages({ conversationId: conversation });
  //   return () => {
  //     newMessages(newMessageHandler, true);
  //     getMessages(getMessageHandler, true);
  //   };
  // }, []);

  // const getMessageHandler = (res: ResponseProps) => {
  //   setMessages(res.data);
  //   if (res.success) {
  //     setMessages(res.data);
  //   }
  // };

  // const newMessageHandler = (res: ResponseProps) => {
  //   if (res.success) {
  //     const { tempId, createdAt } = res.data;
  //     if (res.data.sender.id === user!.id) {
  //       setMessages((prev) => {
  //         const index = prev.findIndex((m) => m.tempId === tempId);
  //         if (index !== -1) {
  //           const updated = [...prev];
  //           updated[index] = {
  //             ...updated[index],
  //             createdAt: createdAt,
  //             isSending: false,
  //           };
  //           return updated;
  //         }
  //         return [...prev];
  //       });
  //       return;
  //     }
  //     if (res.data.conversationId == conversation) {
  //       setMessages((prev) => [res.data, ...prev]);
  //     }
  //   }
  // };

  // const sendMessage = () => {
  //   if (!user) {
  //     return;
  //   }
  //   const tempId = uuid.v4();
  //   const newMessage: MessageProps = {
  //     id: Date.now().toString(),
  //     sender: {
  //       _id: user.id,
  //       name: user.name,
  //       avatar: user.avatar ?? "",
  //     },
  //     content: text,
  //     attachement: null,
  //     isMe: true,
  //     createdAt: new Date().toISOString(),
  //     isSending: true,
  //     tempId: tempId,
  //   };
  //   setMessages((prev) => [newMessage, ...prev]);
  //   newMessages({
  //     conversationId: conversation,
  //     sender: {
  //       id: user.id,
  //       name: user.name,
  //       avatar: user.avatar,
  //     },
  //     content: text.trim(),
  //     attachement: "",
  //     tempId: tempId,
  //   });
  //   onChangeText("");
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderConversation chatName={chatName} />
      <MessagesList data={messages} />
      <MessageSenderBar
        onSendMessage={sendMessage}
        text={text}
        onChangeText={onChangeText}
      />
    </SafeAreaView>
  );
};

const HeaderConversation: FC<{ chatName: string }> = ({ chatName }) => {
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
      <TouchableOpacity
        onPress={router.back}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Feather name="chevron-left" size={25} />
        <Text children={chatName} />
      </TouchableOpacity>
      <Feather name="phone-call" size={20} />
    </View>
  );
};

interface MessagesListProps {
  data: MessageProps[];
}

const MessagesList: FC<MessagesListProps> = ({ data }) => {
  const { user } = useAuth();
  if (!user) {
    return <View></View>;
  }
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
      renderItem={({ item }) => <MessageItem item={item} user={user} />}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const ListEmptyComponent = () => {
  return (
    <View>
      <Text>The list is empty</Text>
    </View>
  );
};

interface MessageItemProps {
  item: MessageProps;
  user: UserProps;
}

const MessageItem: FC<MessageItemProps> = ({ item, user }) => {
  const isMe = item.sender._id === user.id;
  const theme = useAppTheme();

  const avatarImage = (
    <AvatarWithFallback
      uri={user.avatar}
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
      <Animated.View
        style={{
          backgroundColor: isMe ? theme.inversePrimary : theme.onPrimary,
          padding: 8,
          borderBottomLeftRadius: 12,
          borderBottomEndRadius: 12,
          borderTopLeftRadius: 12,
          flexShrink: 1,
          maxWidth: "70%",
          minWidth: "30%",
          transitionDuration: "500ms",
        }}
      >
        <Text children={user.name} />
        <View style={{}}>
          <Text>{item.content}</Text>
        </View>
        <Animated.View
          exiting={SlideOutLeft}
          style={{
            justifyContent: "flex-end",
            alignItems: isMe ? "flex-start" : "flex-end",
            transitionProperty: "alignItem",
            transitionDuration: "500ms",
            transitionBehavior: "normal",
          }}
        >
          <Text
            style={{ fontSize: 10, color: theme.inverseSurface }}
            children={
              item.isSending ? "sending..." : format(item.createdAt, "hh:mm a")
            }
          />
        </Animated.View>
      </Animated.View>
      {isMe && avatarImage}
    </Animated.View>
  );
};
export default ConversationScreen;
