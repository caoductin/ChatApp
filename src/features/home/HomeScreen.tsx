import { testSocket } from "@/socket/socketEvent";
import { Feather } from "@expo/vector-icons";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockFriends } from "../mockData";
import { ListMessage } from "./components/MessageItem";
import SearchBar from "./components/SearchBar";
import { useRouter } from "expo-router";

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

const HeaderHome: FC = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{ fontSize: 16, fontWeight: "bold" }}
        children={"Messages"}
      />
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View
          style={{
            padding: 8,
            backgroundColor: "#e8e5e5ff",
            borderRadius: 100,
          }}
        >
          <Feather name="facebook" size={20} color={"#1b1a1aff"} />
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: "#e8e5e5ff",
            borderRadius: 100,
          }}
        >
          <Feather name="facebook" size={20} color={"#1b1a1aff"} />
        </View>
      </View>
    </View>
  );
};

interface ListHeaderProps {
  newGroupPress?: () => void;
  archirvesPress?: () => void;
}

const HeaderList: FC<ListHeaderProps> = ({ newGroupPress, archirvesPress }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity onPress={newGroupPress}>
        <Text style={{ color: "#3100f7ff" }}>New Groups</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={archirvesPress}>
        <Text style={{ color: "#3700ffff" }}>Archevies</Text>
      </TouchableOpacity>
    </View>
  );
};

const ListFriend: FC = () => {
  return (
    <FlatList
      contentContainerStyle={{
        gap: 8,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={mockFriends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <FriendItem name={item.name} avatar={item.avatar} />;
      }}
    />
  );
};

interface FriendItemProps {
  name?: string;
  avatar?: string;
}

const FriendItem: FC<FriendItemProps> = ({ name, avatar }) => {
  return (
    <View style={{ width: 60, alignItems: "center" }}>
      <Image
        source={{ uri: avatar }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
      {name && (
        <Text
          style={{ fontSize: 12, marginTop: 4, textAlign: "center" }}
          numberOfLines={2}
        >
          {name}
        </Text>
      )}
    </View>
  );
};

type FeatherIcon = React.ComponentProps<typeof Feather>;

interface IconNameProps extends FeatherIcon {
  handlePress: () => void;
  label?: string;
  viewStyle: ViewStyle;
}

const IconWithName: FC<IconNameProps> = ({
  handlePress,
  label,
  viewStyle,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
      <View
        style={[
          { flex: 1, justifyContent: "center", alignItems: "center" },
          viewStyle,
        ]}
      >
        <Feather {...props} />
        {label && (
          <View style={{}}>
            <Text
              style={{ textAlign: "center", color: "#777171ff" }}
              children={label}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HomeScreen;
