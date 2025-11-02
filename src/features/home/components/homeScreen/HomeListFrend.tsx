import { mockFriends } from "@/src/features/mockData";
import { FC } from "react";
import { FlatList, Image, Text, View } from "react-native";

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

export default ListFriend;
