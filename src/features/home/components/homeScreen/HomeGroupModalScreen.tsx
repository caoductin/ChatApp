import { useAuth } from "@/context/authContext";
import { ThemeType, useAppTheme } from "@/context/themeContext";
import { uploadFileToCloudinary } from "@/services/imageService";
import { getContacts, newConversation } from "@/socket/socketEvent";
import { AnimatedTouchableOpacity } from "@/src/components";
import { Avatar } from "@/src/components/Avatar";
import { Contact, PopulatedConversation, ResponseApi } from "@/src/types/api";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LinearTransition,
  SlideInRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { useImmer } from "use-immer";
import SearchBar from "../SearchBar";
import { ListChooseFriend } from "./ListChooseFriend";

const HomeGroupMdScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { user } = useAuth();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [selectedUser, setSelectedUsers] = useImmer<Contact[]>([]);
  const [textSearch, onChangeText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [contact, setContacts] = useState<Contact[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleBack = () => {
    router.back();
  };

  const handleUserToggle = useCallback((user: Contact) => {
    setSelectedUsers((draft) => {
      const index = draft.findIndex((t) => t.id === user.id);
      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(user);
      }
    });
  }, []);

  useEffect(() => {
    getContacts(processGetContacts);
    newConversation(conversation);
    getContacts(null);
    return () => {
      getContacts(processGetContacts, true);
      newConversation(conversation, true);
    };
  }, []);

  const createGroup = async () => {
    let avatarGroup;
    setLoading(true);
    if (image) {
      const res = await uploadFileToCloudinary(image, "profiles");
      if (res.success) {
        avatarGroup = res.data;
      }
    }

    if (selectedUser.length == 1) {
      newConversation({
        type: "direct",
        participants: [user?.id, selectedUser[0].id],
        name: groupName || t("New Group"),
        avatar: avatarGroup,
      });
      return;
    }
    newConversation({
      type: "group",
      participants: [user?.id, ...selectedUser.map((user) => user.id)],
      name: groupName || t("New Group"),
      avatar: avatarGroup,
    });
  };

  const processGetContacts = (res: ResponseApi<Contact[]>) => {
    if (res.success) {
      setContacts(res.data);
    }
  };

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLoading(false);
    }
  };

  const conversation = (res: ResponseApi<PopulatedConversation>) => {
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Error", res.msg);
    }
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 12, gap: 8 }}>
      <HeaderGroupScreen
        theme={theme}
        backPress={handleBack}
        createPress={createGroup}
        styles={styles}
        isShowButton={!(selectedUser.length === 0)}
      />
      <Avatar
        onPress={pickImage}
        viewStyle={{ alignItems: "center" }}
        source={{
          uri: image || undefined,
        }}
        style={{ width: 96, height: 96, borderRadius: 100 }}
        resizeMode="cover"
      />
      <Animated.View layout={LinearTransition.duration(500)}>
        {selectedUser.length > 0 && (
          <Animated.FlatList
            contentContainerStyle={{ gap: 6, padding: 8 }}
            data={selectedUser}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition.duration(200)}
            renderItem={({ item }) => {
              return (
                <Animated.View entering={ZoomIn} exiting={ZoomOut}>
                  <Avatar
                    onPress={() => handleUserToggle(item)}
                    viewStyle={{ alignItems: "center", borderWidth: 0 }}
                    source={{ uri: item.avatar }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      borderWidth: 0,
                    }}
                    resizeMode="cover"
                  />
                  <Feather
                    style={{
                      position: "absolute",
                      right: -5,
                      top: -5,
                      borderRadius: 100,
                      padding: 2,
                      backgroundColor: theme.surfaceContainer,
                    }}
                    name="x"
                    color={theme.onSurface}
                    size={14}
                  />
                </Animated.View>
              );
            }}
          />
        )}
      </Animated.View>
      <SearchBar
        label={"New Group Name"}
        value={groupName}
        onChangeText={setGroupName}
        isHiddenIcon={true}
        textInputStyle={{ height: 30 }}
      />
      <SearchBar
        label={"Find Member..."}
        value={textSearch}
        onChangeText={onChangeText}
        textInputStyle={{ height: 30 }}
      />
      <ListChooseFriend
        theme={theme}
        onPress={handleUserToggle}
        contacts={contact}
        selectedContact={selectedUser}
      />
    </View>
  );
};

interface HeaderGroupProps {
  theme: ThemeType;
  backPress: () => void;
  createPress: () => void;
  styles: ReturnType<typeof getStyles>;
  isShowButton?: boolean;
}

export const HeaderGroupScreen: FC<HeaderGroupProps> = ({
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
      <Animated.Text
        style={styles.titleText}
        layout={LinearTransition}
        children={"New Group"}
      />
      {isShowButton && (
        <AnimatedTouchableOpacity onPress={createPress} entering={SlideInRight}>
          <Text
            style={[
              styles.textCreate,
              { backgroundColor: theme.tertiary, color: theme.background },
            ]}
            children={"Create"}
          />
        </AnimatedTouchableOpacity>
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

export default HomeGroupMdScreen;
