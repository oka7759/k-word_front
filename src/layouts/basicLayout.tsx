import { Link, Outlet } from "react-router";
import AppSidebar from "./AppSidebar";
import useSidebar from "@/store/useSidebar";

function BasicLayout() {
  const { isExpanded, isHovered } = useSidebar();
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } `}
      >
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <div x-data="{ pageName: `Profile`}">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2
                className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
              >
                Profile
              </h2>
              <nav>
                <ol className="flex items-center gap-1.5">
                  <li>
                    <Link
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                      to="/"
                    >
                      Home
                      <svg
                        className="stroke-current"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li
                    className="text-sm text-gray-800 dark:text-white/90"
                    x-text="pageName"
                  >
                    Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="min-h-[1000px] rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
