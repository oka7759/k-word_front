// useMember.ts
import { create } from "zustand";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";

export interface MemberInfo {
  userId: number;

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
  userId: 0,
  accessToken: "",
};

const useMember = create<MemberStore>((set) => ({
  member: initState,
  status: "",
  login: async (email: string, pw: string) => {
    try {
      set({ status: "pending" });
      const data = await loginPost(email, pw);

      set({
        member: {
          userId: data.userId,
          accessToken: data.accessToken,
        },
        status: "fulfilled",
      });

      // 관례: 쿠키에는 accessToken만 저장
      setCookie("accessToken", data.accessToken, 1); // 1일
    } catch (error) {
      console.error("로그인 에러:", error);
      set({ member: { ...initState }, status: "error" });
      throw error;
    }
  },
  logout: () => {
    set({ member: { ...initState }, status: "" });
    removeCookie("accessToken");
  },
  save: (memberInfo: MemberInfo) => {
    set({ member: memberInfo, status: "fulfilled" });
  },
  reset: () => {
    set({ member: { ...initState }, status: "" });
  },
}));

export default useMember;
