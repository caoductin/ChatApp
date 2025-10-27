import { BackButtonProps } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const BackButton = ({color = "white", style ,iconSize}: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={style} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={iconSize} color={color} />
    </TouchableOpacity>
  );
};

export default BackButton;
