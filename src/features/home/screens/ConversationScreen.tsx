import { useAuth } from "@/context/authContext";
import { useAppTheme } from "@/context/themeContext";
import { MessageProps } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageItem } from "../components/conversationScreen/MessageItem";
import { MessageSenderBar } from "../components/conversationScreen/MessageSenderBar";
import { useConversationMessages } from "../hooks/useConversationMessages";

const SWIPE_THRESHOLD = 80;
const { width } = Dimensions.get("window");

const ConversationScreen = () => {
  const { user } = useAuth();
  const { id, chatName } = useLocalSearchParams<{
    id: string;
    chatName: string;
  }>();
  const { messages, onChangeText, text, sendMessage } = useConversationMessages(
    user,
    id
  );

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
        <Text style={{ fontWeight: "600", fontSize: 18 }} children={chatName} />
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
  const [replyingTo, setReplyingTo] = useState<MessageProps>();

  const onSwipeToReply = (item: MessageProps) => {
    setReplyingTo(item);
  };

  if (!user) {
    return <View></View>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        renderItem={({ item }) => (
          <MessageItem
            item={item}
            user={user}
            onSwipeToReply={onSwipeToReply}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
      {replyingTo &&<ReplyMessage item={replyingTo}/>}
    </GestureHandlerRootView>
  );
};
interface ReplyMessageProps {
  item: MessageProps
}
const ReplyMessage:FC<ReplyMessageProps> = ({item}) => {
  return (
    <View>
      <Text children={item.content}/>
    </View>
  )
}

const ListEmptyComponent = () => {
  return (
    <View>
      <Text>The list is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  borderForMe: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  borderNotMe: {
    borderBottomEndRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  containerItem: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  containerMessage: {
    padding: 8,
    flexShrink: 1,
    gap: 4,
    maxWidth: "70%",
    minWidth: "30%",
    transitionDuration: "500ms",
  },
  bubbleText: {
    justifyContent: "flex-end",
    transitionProperty: "alignItem",
    transitionDuration: "500ms",
  },
});

export default ConversationScreen;
