import axios from "axios";

const uploadUrl = "https://api.cloudinary.com/v1_1/djfi9rtlx/image/upload"

interface uploadImageDataType {
    secure_url : string
}

export const uploadImage = async (image: File) : Promise<uploadImageDataType> => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'chat-app');
    const response = await axios.post(uploadUrl, formData);
    return response.data.secure_url;
}