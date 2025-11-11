import ConversationScreen from "@/src/features/home/screens/ConversationScreen";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


const Conversation = () => {
  const conversationData = useLocalSearchParams<{
    conversationId: string;
    name: string;
  }>();
  return <ConversationScreen />;
};

export default Conversation;
