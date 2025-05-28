import { create } from "zustand";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

export interface MemberInfo {
  email: string;
  nickname: string;
  accessToken: string;
}

export interface MemberStore {
  member: MemberInfo;
  status: "" | "pending" | "fulfilled" | "error";
  login: (email: string, pw: string) => void;
  logout: () => void;
  save: (memberInfo: MemberInfo) => void;
  reset: () => void;
}

const initState: MemberInfo = {
  email: "",
  nickname: "",
  accessToken: "",
};

const useMember = create<MemberStore>((set) => {
  return {
    member: initState,
    status: "",
    login: async (email: string, pw: string) => {
      try {
        set({ status: "pending" });

        const data = await loginPost(email, pw);

        console.log(data);

        set({ member: data, status: "fulfilled" });

        const newState = { ...data, status: "fulfilled" };

        setCookie("member", JSON.stringify(newState), 1); //1일
      } catch (error) {
        console.error("로그인 에러:", error);
        set({ member: { ...initState }, status: "error" });
        throw error;
      }
    },
    logout: () => {
      set({ member: { ...initState }, status: "" });
      removeCookie("member");
    },
    save: (memberInfo: MemberInfo) => {
      set({ member: memberInfo, status: "fulfilled" });
    },
    reset: () => {
      set({ member: { ...initState }, status: "" });
    },
  };
});

export default useMember;
