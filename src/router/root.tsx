import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/basicLayout";
import memberRouter from "./memberRouter";

const Loading = () => <div>Loading ...</div>;
const Main = lazy(() => import("../pages/mainPage"));
const Contents = lazy(() => import("../pages/contentsPage"));
const SellerPage = lazy(() => import("../pages/sellerPage"));
const NoticePage = lazy(() => import("../pages/noticePage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "contents",
        element: (
          <Suspense fallback={<Loading />}>
            <Contents />
          </Suspense>
        ),
      },
      {
        path: "seller",
        element: (
          <Suspense fallback={<Loading />}>
            <SellerPage />
          </Suspense>
        ),
      },

      {
        path: "notice",
        element: (
          <Suspense fallback={<Loading />}>
            <NoticePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "member",
    children: memberRouter(),
  },
]);

export default router;
