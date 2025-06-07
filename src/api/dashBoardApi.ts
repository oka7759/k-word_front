import type { DashBoardResp } from "@/types/api";
import apiClient from "./apiClient";

const dashBoard = async (): Promise<DashBoardResp> => {
  const res = await apiClient.get("/admin/dashboard");
  return res.data;
};

export { dashBoard };
