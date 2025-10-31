import { ThemeType, useAppTheme } from "@/context/themeContext";
import { Avatar } from "@/src/components/Avatar";
import { useRouter } from "expo-router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import SearchBar from "./components/SearchBar";
import { FriendProps, mockFriends } from "../mockData";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useImmer } from "use-immer";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

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
  const [selectedIds, setSelectedIDs] = useImmer<string[]>([]);
  const [selectedUser, setSelectedUsers] = useImmer<FriendProps[]>([]);
  const [text, onChangeText] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const { t } = useTranslation();

  const handleToggleUser = useCallback((id: string) => {
    setSelectedIDs((draft) => {
      const index = draft.findIndex((t) => t === id);
      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(id);
      }
    });
  }, []);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  const handleBack = () => {
    router.back();
  };

  const handleUserToggle = useCallback((user: FriendProps) => {
    setSelectedUsers((draft) => {
      const index = draft.findIndex((t) => t.id === user.id);
      if (index > -1) {
        draft.slice(index, 1);
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
      />

      <Avatar
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: theme.surfaceContainerLow,
        }}
        imageProps={{
          source: {
            uri: "data:image/jpeg;base64,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",
          },
          resizeMode: "cover",
          style: { width: 96, height: 96, borderRadius: 100 },
        }}
      />
      <SearchBar
        label={"New Group Name"}
        value={nameGroup}
        onChangeText={setNameGroup}
        isHiddenIcon={true}
      />
      <SearchBar
        label={"Find Member..."}
        value={text}
        onChangeText={onChangeText}
      />
      <ListChooseFriend
        theme={theme}
        onPress={handleToggleUser}
        userIds={selectedIds}
      />
    </View>
  );
};

interface HeaderGroupProps {
  theme: ThemeType;
  backPress: () => void;
  createPress: () => void;
  styles: ReturnType<typeof getStyles>;
}

const HeaderGroupScreen: FC<HeaderGroupProps> = ({
  theme,
  backPress,
  createPress,
  styles,
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
      <Text style={styles.titleText}>New Group</Text>
      <TouchableOpacity onPress={createPress}>
        <Text
          style={[
            styles.textCreate,
            { backgroundColor: theme.tertiary, color: theme.background },
          ]}
          children={"Create"}
        />
      </TouchableOpacity>
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
  onPress: (id: string) => void;
  userIds: string[];
}

const ListChooseFriend: FC<ListChooseFriendProps> = ({
  theme,
  onPress,
  userIds,
}) => {
  return (
    <FlatList
      contentContainerStyle={{ rowGap: 6 }}
      data={mockFriends}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <ListItemFriend
            theme={theme}
            name={item.name}
            avatar={item.avatar}
            onPress={() => onPress(item.id)}
            isSelected={userIds.includes(item.id)}
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
        { flex: 1, flexDirection: "row", alignItems: "center", gap: 4 },
        animatedStyle,
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
