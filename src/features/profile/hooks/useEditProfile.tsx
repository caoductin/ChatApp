import { updateProfile } from "@/socket/socketEvent";
import { UserProps } from "@/types";
import { useEffect, useReducer } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Alert } from "react-native";
import { uploadFileToCloudinary } from "@/services/imageService";

const formReducer = (state: any, action: any) => {
  return { ...state, [action.field]: action.value };
};

export const useEditProfile = (
  user: UserProps | null,
  updateToken: (token: string) => Promise<void>
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    dispatch({ field, value });
  };

  useEffect(() => {
    if (user) {
      dispatch({ field: "name", value: user.name || "" });
      dispatch({ field: "avatar", value: user.avatar || "" });
      dispatch({ field: "email", value: user.email || "" });
    }
  }, [user]);

  useEffect(() => {
    updateProfile(processUpdateProfile);
    return () => {
      updateProfile(processUpdateProfile, true);
    };
  }, []);

  useEffect(() => {
    console.log("form data", formState);
  }, [formState]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
      dispatch({ field: "avatar", value: result.assets[0].uri });
    }
  };

  const processUpdateProfile = (res: any) => {
    if (res.success) {
      updateToken(res.data.newToken);
      router.back();
    } else {
      Alert.alert("Failed", res.msg);
    }
  };

  const handleSubmitProfile = async () => {
    if (!formState.name.trim() || !formState) {
      Alert.alert("Error", "Please enter the name");
      return;
    }
    const data = {
      name: formState.name,
      avatar: formState.avatar,
    };
    if (formState.avatar) {
      const res = await uploadFileToCloudinary(formState.avatar, "profiles");
      data.avatar = res.data;
    }
    updateProfile(data);
  };

  return {
    formState,
    handleChange,
    handleSubmitProfile,
    pickImage,
  };
};
