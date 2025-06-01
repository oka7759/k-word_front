import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";
import { getCookie } from "../util/cookieUtil";
import useMember from "../store/useMember";

const useCustomLogin = () => {
  const { member, status, login, logout, save, reset } = useMember();

  //로그인 상태 객체
  const loginState = member;

  //로그인 여부
  const loginStatus = status; //fulfilled, pending, rejected

  useEffect(() => {
    if (!loginStatus) {
      const cookieData = getCookie("access_token");
      if (cookieData) {
        save(cookieData);
      }
    }
  }, []);

  const navigate = useNavigate();

  const doLogin = async (email: string, pw: string) => {
    login(email, pw);
  };

  const doLogout = () => {
    logout();
  };
  const moveToLogin = () => {
    navigate("/member/login");
  };
  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true });
  };

  const resetState = () => {
    reset();
  };

  return {
    loginState,
    loginStatus,
    doLogin,
    doLogout,
    moveToLogin,
    moveToPath,
    resetState,
  };
};

export default useCustomLogin;
