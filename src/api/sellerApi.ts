import apiClient from "./apiClient";

const sellerList = async () => {
  const res = await apiClient.get("pay/seller");
  return res.data;
};

const addSeller = async (name: string, country: string) => {
  const body = { name, country };
  const res = await apiClient.post("pay/seller", body);
  return res.data;
};

export { sellerList, addSeller };
