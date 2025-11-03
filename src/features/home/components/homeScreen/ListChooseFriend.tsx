import { ThemeType } from "@/context/themeContext";
import { AnimatedTouchableOpacity } from "@/src/components";
import { Avatar } from "@/src/components/Avatar";
import { FriendProps } from "@/src/features/mockData";
import { Feather } from "@expo/vector-icons";
import { FC } from "react";
import { FlatList, Text } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Contact } from "./HomeGroupModalScreen";

interface ListChooseFriendProps {
  theme: ThemeType;
  onPress: (user: Contact) => void;
  contacts: Contact[];
  selectedContact: Contact[];
}

interface ListItemFriendProps {
  theme: ThemeType;
  name: string;
  avatar: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const ListItemFriend: FC<ListItemFriendProps> = ({
  theme,
  name,
  avatar,
  isSelected = false,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[
        {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          borderRadius: 10,
        },
        animatedStyle,
        isSelected && { backgroundColor: theme.inverseOnSurface },
      ]}
    >
      <Avatar
        viewStyle={{
          borderWidth: 0,
          borderColor: theme.surfaceContainerLow,
        }}
        {...{
          source: {
            uri: avatar,
          },
          style: { width: 38, height: 38, borderRadius: 100 },
        }}
      />
      <Text style={{ flex: 1 }} children={name} />
      {!isSelected ? (
        <Feather name="circle" size={20} color={theme.inversePrimary} />
      ) : (
        <Feather name="check-circle" size={20} color={theme.primary} />
      )}
    </AnimatedTouchableOpacity>
  );
};

export const ListChooseFriend: FC<ListChooseFriendProps> = ({
  theme,
  onPress,
  contacts,
  selectedContact,
}) => {
  return (
    <FlatList
      contentContainerStyle={{ rowGap: 6, paddingBottom: 32 }}
      data={contacts}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <ListItemFriend
            theme={theme}
            name={item.name}
            avatar={item.avatar}
            onPress={() => onPress(item)}
            isSelected={selectedContact.includes(item)}
          />
        );
      }}
    />
  );
};
