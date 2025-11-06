import { Avatar } from "@/src/components/Avatar";
import { ConversationProps } from "@/types";
import { FC } from "react";
import { FlatList, Image, Text, View } from "react-native";

interface ListFriendProps {
  data: ConversationProps[];
}
const ListFriend: FC<ListFriendProps> = ({ data }) => {
  return (
    <FlatList
      contentContainerStyle={{
        gap: 8,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return <FriendItem name={item.name} avatar={item.avatar!} />;
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
      <Avatar
        viewStyle={{ alignItems: "center", borderWidth: 0 }}
        source={{ uri: avatar }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          borderWidth: 0,
        }}
        resizeMode="cover"
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

export default ListFriend;
