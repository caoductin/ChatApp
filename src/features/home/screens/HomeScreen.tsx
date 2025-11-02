import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "../components/homeScreen/HomeHeader";
import HeaderList from "../components/homeScreen/HomeHeaderList";
import ListFriend from "../components/homeScreen/HomeListFrend";
import { ListMessage } from "../components/MessageItem";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
  const router = useRouter();
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
        <ListFriend />
      </View>
      <ListMessage />
    </SafeAreaView>
  );
};

export default HomeScreen;
