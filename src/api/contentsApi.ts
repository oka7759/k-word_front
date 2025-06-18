import type { ContestResp, UpdateContents } from "@/types/api";
import apiClient from "./apiClient";

const contentUpdate = async (body: UpdateContents): Promise<ContestResp> => {
  const res = await apiClient.post("/admin/update", body);
  return res.data;
};

export { contentUpdate };
