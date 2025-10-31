import { Platform } from "react-native";


export const API_URL =
  Platform.OS === "android" ? "http://localhost:3000" : "http://localhost:3000";

export const CLOUDINARY_NAME = "dhlfxormm"
export const CLOUDINARY_UPLOAD_PRESET = "profile_chatapp"
