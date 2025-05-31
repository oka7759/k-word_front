import { getCookie } from "@/util/cookieUtil";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const sellerList = async () => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${BASE_URL}pay/seller`, header);

  return res.data;
};

const addSeller = async (name: string, country: string) => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { name, country };

  const res = await axios.post(`${BASE_URL}pay/seller`, body, header);

  return res.data;
};

export { sellerList, addSeller };
