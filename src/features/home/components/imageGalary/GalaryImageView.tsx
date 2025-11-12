import { FC, useCallback, useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { useImmer } from "use-immer";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const GalaryImageView: FC = () => {
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (!permissionResponse) {
      Alert.alert("Infomation", "You don't have permission");
      return;
    }
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button title="Get ablum" onPress={getAlbums} />
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={(data) => <AlbumEntry album={data.item} />}
      />
    </View>
  );
};

interface AlbumEntryProps {
  album: MediaLibrary.Album;
}

const AlbumEntry: FC<AlbumEntryProps> = ({ album }) => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [selectedAblums, setSelectedAblums] = useImmer<MediaLibrary.Asset[]>(
    []
  );

  useEffect(() => {
    console.log("this is selectedAblums", selectedAblums);
  }, [selectedAblums]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  const handleToggle = useCallback((album: MediaLibrary.Asset) => {
    setSelectedAblums((draft) => {
      const index = draft.findIndex((t) => t.id === album.id);
      if (index > -1) draft.splice(index, 1);
      else draft.push(album);
    });
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1, gap: 20 }}
      data={assets}
      numColumns={3}
      renderItem={({ item }) => (
        <GalaryItemView
          data={item}
          onSelected={() => handleToggle(item)}
          isSelected={selectedAblums.some((a) => a.id === item.id)}
        />
      )}
    />
  );
};

interface GalaryItemProps {
  data: MediaLibrary.Asset;
  onSelected: () => void;
  isSelected: boolean;
}
const GalaryItemView: FC<GalaryItemProps> = ({
  data,
  onSelected,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity style={{ flex: 1 / 3 }}>
      <Image
        style={{
          aspectRatio: 1,
          opacity: isSelected ? 0.4 : 1,
        }}
        source={data}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          shadowColor: "#585858ff",
          shadowOffset: { width: 5, height: 5 },
          shadowRadius: 4,
          shadowOpacity: 0.4,
          elevation: 10,
        }}
        hitSlop={10}
        onPress={onSelected}
      >
        <Ionicons
          name={isSelected ? "checkmark-circle-outline" : "ellipse-outline"}
          size={28}
          style={{ color: isSelected ? "blue" : "#fff" }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

interface CircleSelectedProps {
  count: number;
}

const CircleSelected: FC<CircleSelectedProps> = ({ count }) => {
  return <View style={{ borderWidth: 4 }}></View>;
};
