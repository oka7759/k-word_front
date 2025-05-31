import { getCookie } from "@/util/cookieUtil";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const noticeList = async () => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${BASE_URL}admin/notice`, header);

  return res.data;
};

const addNotice = async (title: string, content: string, language: string) => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { title, content, language };

  const res = await axios.post(`${BASE_URL}admin/notice`, body, header);

  return res.data;
};

const modifyNotice = async (
  id: number,
  title: string,
  content: string,
  language: string
) => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { title, content, language };

  const res = await axios.post(`${BASE_URL}admin/notice/${id}`, body, header);

  return res.data;
};

const deleteNotice = async (id: number) => {
  const token = getCookie("accessToken");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(`${BASE_URL}admin/notice/${id}`, header);

  return res.data;
};

export { noticeList, addNotice, modifyNotice, deleteNotice };
