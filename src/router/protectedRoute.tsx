import { getCookie } from "@/util/cookieUtil";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getCookie("accessToken");

  if (!token) {
    return <Navigate to="/member/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
