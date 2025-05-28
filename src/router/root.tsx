import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import BasicLayout from "../layouts/basicLayout";
import memberRouter from "./memberRouter";

const Loading = () => <div>Loading ...</div>;
const Main = lazy(() => import("../pages/mainPage"));
const AboutPage = lazy(() => import("../pages/aboutPage"));

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
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutPage />
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
