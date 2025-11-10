import ConversationScreen from "@/src/features/home/screens/ConversationScreen";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

interface ConversationProps {
  conversation: string;
  name: string;
  test: string;
}
const Conversation = () => {
  const conversationData = useLocalSearchParams<{
    conversation: string;
    name: string;
    test: string;
  }>();
  return <ConversationScreen />;
};

export default Conversation;
