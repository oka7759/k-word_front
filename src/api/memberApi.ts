import type { LoginResp, MemberResp } from "@/types/api";
import axios from "axios";
import apiClient from "./apiClient";

const loginPost = async (email: string, pw: string): Promise<LoginResp> => {
  const header = { headers: { "Content-Type": "application/json" } };
  const body = {
    username: email,
    password: pw,
  };
  const res = await axios.post(`/api/admin/login`, body, header);

  return res.data;
};

const memberList = async (): Promise<MemberResp> => {
  const res = await apiClient.get("/admin/member");
  return res.data;
};

export { loginPost, memberList };
