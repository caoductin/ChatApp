import { ThemeType, useAppTheme } from "@/context/themeContext";
import { Avatar } from "@/src/components/Avatar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LinearTransition,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
} from "react-native-reanimated";
import { useImmer } from "use-immer";
import { FriendProps, mockFriends } from "../../../mockData";
import SearchBar from "../SearchBar";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

const HomeGroupMdScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedUser, setSelectedUsers] = useImmer<FriendProps[]>([]);
  const [text, onChangeText] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  const handleBack = () => {
    router.back();
  };

  const handleUserToggle = useCallback((user: FriendProps) => {
    setSelectedUsers((draft) => {
      const index = draft.findIndex((t) => t.id === user.id);
      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(user);
      }
    });
  }, []);

  const handleCreateGroup = () => {};

  return (
    <View style={{ flex: 1, paddingHorizontal: 8, gap: 8 }}>
      <HeaderGroupScreen
        theme={theme}
        backPress={handleBack}
        createPress={handleCreateGroup}
        styles={styles}
        isShowButton={!(selectedUser.length === 0)}
      />
      <Avatar
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: theme.surfaceContainerLow,
        }}
        imageProps={{
          source: {
            uri: mockFriends[0].avatar,
          },
          resizeMode: "cover",
          style: { width: 96, height: 96, borderRadius: 100 },
        }}
      />
      <View>
        <Animated.FlatList
          exiting={LinearTransition.duration(500)}
          entering={LinearTransition.duration(500)}
          contentContainerStyle={{ gap: 6, padding: 8 }}
          data={selectedUser}
          horizontal={true}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <RenderItem item={item} />;
          }}
        />
      </View>
      <SearchBar
        label={"New Group Name"}
        value={nameGroup}
        onChangeText={setNameGroup}
        isHiddenIcon={true}
        textInputStyle={{ height: 30 }}
      />
      <SearchBar
        label={"Find Member..."}
        value={text}
        onChangeText={onChangeText}
        textInputStyle={{ height: 30 }}
      />
      <ListChooseFriend
        theme={theme}
        onPress={handleUserToggle}
        user={selectedUser}
      />
    </View>
  );
};

interface renderItemProps {
  item: FriendProps;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const RenderItem: FC<renderItemProps> = ({ item }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 30 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    marginRight: 6,
  }));

  return (
    <Animated.View style={animatedStyle} entering={ZoomIn}>
      <AnimatedImage
        source={{ uri: item.avatar }}
        style={{ width: 48, height: 48, borderRadius: 100 }}
      />
    </Animated.View>
  );
};

interface HeaderGroupProps {
  theme: ThemeType;
  backPress: () => void;
  createPress: () => void;
  styles: ReturnType<typeof getStyles>;
  isShowButton?: boolean;
}

const HeaderGroupScreen: FC<HeaderGroupProps> = ({
  theme,
  backPress,
  createPress,
  styles,
  isShowButton = true,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 8,
      }}
    >
      <TouchableOpacity onPress={backPress}>
        <Text style={styles.backButton} children={"Back"} />
      </TouchableOpacity>
      <Animated.Text style={styles.titleText} layout={LinearTransition}>
        New Group
      </Animated.Text>
      {isShowButton && (
        <AnimatedButton onPress={createPress} entering={SlideInRight}>
          <Text
            style={[
              styles.textCreate,
              { backgroundColor: theme.tertiary, color: theme.background },
            ]}
            children={"Create"}
          />
        </AnimatedButton>
      )}
    </View>
  );
};

const baseButtonStyle = {
  padding: 8,
  fontWeight: "600" as const,
  borderRadius: 12,
};

const getStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    titleText: {
      fontWeight: "bold",
      fontSize: 18,
    },
    textCreate: {
      ...baseButtonStyle,
      backgroundColor: theme.tertiary,
      color: theme.background,
    },
    backButton: {
      ...baseButtonStyle,
    },
  });
};

interface ListChooseFriendProps {
  theme: ThemeType;
  onPress: (user: FriendProps) => void;
  user: FriendProps[];
}

const ListChooseFriend: FC<ListChooseFriendProps> = ({
  theme,
  onPress,
  user,
}) => {
  return (
    <FlatList
      contentContainerStyle={{ rowGap: 6, paddingBottom: 32 }}
      data={mockFriends}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <ListItemFriend
            theme={theme}
            name={item.name}
            avatar={item.avatar}
            onPress={() => onPress(item)}
            isSelected={user.includes(item)}
          />
        );
      }}
    />
  );
};

interface ListItemFriendProps {
  theme: ThemeType;
  name: string;
  avatar: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

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
    <AnimatedButton
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
        style={{
          borderWidth: 0,
          borderColor: theme.surfaceContainerLow,
        }}
        imageProps={{
          source: {
            uri: avatar,
          },
          resizeMode: "cover",
          style: { width: 38, height: 38, borderRadius: 100 },
        }}
      />
      <Text style={{ flex: 1 }} children={name} />
      {!isSelected ? (
        <Feather name="circle" size={20} color={theme.inversePrimary} />
      ) : (
        <Feather name="check-circle" size={20} color={theme.primary} />
      )}
    </AnimatedButton>
  );
};

export default HomeGroupMdScreen;
