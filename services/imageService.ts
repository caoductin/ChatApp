import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseProps } from "@/types";
import axios from "axios";

export const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`

export const uploadFileToCloudinary = async (
    file: { uri?: string } | string,
    folderName: string
): Promise<ResponseProps> => {
    try {
        if (!file) return { success: true, data: null };

        const uri = typeof file === "string" ? file : file.uri;
        if (!uri) return { success: true, data: null };

        if (uri.startsWith("https://")) {
            return { success: true, data: uri };
        }

        const formData = new FormData();
        formData.append("file", {
            uri,
            type: "image/jpeg",
            name: uri.split("/").pop() || "file.jpg",
        } as any);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", folderName);

        const response = await axios.post(CLOUDINARY_API, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return { success: true, data: response?.data?.secure_url };
    } catch (error: any) {
        console.log("Upload error:", error);
        return { success: false, msg: error.message || "Could not upload file" };
    }
};
