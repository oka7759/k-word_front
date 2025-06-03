import type { NoticeListResp } from "@/types/api";
import apiClient from "./apiClient";

const noticeList = async (): Promise<NoticeListResp[]> => {
  const res = await apiClient.get("admin/notice");
  return res.data;
};

const addNotice = async (body: NoticeListResp) => {
  const res = await apiClient.post("admin/notice", body);
  return res.data;
};

const modifyNotice = async (body: NoticeListResp) => {
  const res = await apiClient.post(`admin/notice/${body.id}`, body);
  return res.data;
};

const deleteNotice = async (id: number) => {
  const res = await apiClient.delete(`admin/notice/${id}`);
  return res.data;
};

export { noticeList, addNotice, modifyNotice, deleteNotice };
