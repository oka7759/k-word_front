import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/basicLayout";
import memberRouter from "./memberRouter";
import ProtectedRoute from "./protectedRoute";
import MemberPage from "@/pages/memberPage";
import PaymentPage from "@/pages/paymentPage";

const Loading = () => <div>Loading ...</div>;
const Main = lazy(() => import("../pages/mainPage"));
const Contents = lazy(() => import("../pages/contentsPage"));
const SellerPage = lazy(() => import("../pages/sellerPage"));
const NoticePage = lazy(() => import("../pages/noticePage"));

const router = createBrowserRouter([
  {
    path: "/admin",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              {" "}
              <Main />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "contents",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Contents />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "seller",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <SellerPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },

      {
        path: "notice",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <NoticePage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "member",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <MemberPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "admin",
    children: memberRouter(),
  },
]);

export default router;
