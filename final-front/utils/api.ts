import axios from "axios";
import { API_URL } from "@/utils/auth"; // ✅ Import the correct API_URL

export const fetchPropertiesForSale = async () => {
  const response = await axios.get(`${API_URL}/sell-property/public`);
  return response.data;
};

export const fetchPropertiesToBuy = async () => {
  const response = await axios.get(`${API_URL}/buy-property`);
  return response.data;
};
