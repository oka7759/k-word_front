import type { PaymentResp } from "@/types/api";
import apiClient from "./apiClient";

const payData = async (): Promise<PaymentResp> => {
  const res = await apiClient.get("/admin/payment");
  return res.data;
};

export { payData };
