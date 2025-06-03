import type { SellerResp } from "@/types/api";
import apiClient from "./apiClient";

const sellerList = async (): Promise<SellerResp[]> => {
  const res = await apiClient.get("/admin/seller");
  return res.data;
};

const addSeller = async (body: Seller): Promise<SellerResp[]> => {
  const res = await apiClient.post("/admin/seller", body);
  return res.data;
};

export { sellerList, addSeller };
