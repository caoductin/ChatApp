import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

export default HeaderList;
