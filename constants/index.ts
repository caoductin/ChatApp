import { Platform } from "react-native";

export const API_URL = Platform.OS === 'android' ? 'https://10.0.2.2:3000' : 'https://localhost:3000'