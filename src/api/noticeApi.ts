import apiClient from "./apiClient";

const noticeList = async () => {
  const res = await apiClient.get("admin/notice");
  return res.data;
};

const addNotice = async (title: string, content: string, language: string) => {
  const body = { title, content, language };
  const res = await apiClient.post("admin/notice", body);
  return res.data;
};

const modifyNotice = async (
  id: number,
  title: string,
  content: string,
  language: string
) => {
  const body = { title, content, language };
  const res = await apiClient.post(`admin/notice/${id}`, body);
  return res.data;
};

const deleteNotice = async (id: number) => {
  const res = await apiClient.delete(`admin/notice/${id}`);
  return res.data;
};

export { noticeList, addNotice, modifyNotice, deleteNotice };
