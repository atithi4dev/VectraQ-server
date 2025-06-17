import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}/pdf/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );


  return response.data;
};
