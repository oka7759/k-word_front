import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginPost = async (email: string, pw: string) => {
  const header = { headers: { "Content-Type": "application/json" } };

  const body = {
    username: email,
    password: pw,
  };

  const res = await axios.post(`${BASE_URL}auth/login`, body, header);

  return res.data;
};
