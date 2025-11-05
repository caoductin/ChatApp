import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "../components/homeScreen/HomeHeader";
import HeaderList from "../components/homeScreen/HomeHeaderList";
import ListFriend from "../components/homeScreen/HomeListFrend";
import { ListMessage } from "../components/MessageItem";
import SearchBar from "../components/SearchBar";
import { ConversationProps, ResponseProps } from "@/types";
import { getConversations } from "@/socket/socketEvent";

const HomeScreen = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      getConversations(processConversation);
      getConversations(null);
      return () => {
        getConversations(processConversation, true);
      };
    }, [])
  );

  const processConversation = (res: ResponseProps) => {
    console.log("this is data", res.data);
    if (res.success) {
      setConversations(res.data);
    } else {
      Alert.alert("Error", res.msg);
    }
  };

  const hanleNewGroup = () => {
    router.navigate("/(main)/home/newGroupModal");
  };
  const [text, onChangeText] = useState("");
  return (
    <SafeAreaView style={{ paddingHorizontal: 16, gap: 16, flex: 1 }}>
      <HeaderHome />
      <SearchBar label={"Search..."} value={text} onChangeText={onChangeText} />
      <HeaderList newGroupPress={hanleNewGroup} />
      <View>
        <ListFriend data={conversations} />
      </View>
      <ListMessage data={conversations} />
    </SafeAreaView>
  );
};

export default HomeScreen;
