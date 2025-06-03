import type { LoginResp } from "@/types/api";
import axios from "axios";

export const loginPost = async (
  email: string,
  pw: string
): Promise<LoginResp> => {
  const header = { headers: { "Content-Type": "application/json" } };
  const body = {
    username: email,
    password: pw,
  };
  const res = await axios.post(`/api/admin/login`, body, header);

  return res.data;
};
