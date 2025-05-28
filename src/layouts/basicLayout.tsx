import { Outlet } from "react-router";

function BasicLayout() {
  const { isExpanded, isHovered } = useSidebar();
  return (
    <div className="min-h-screen xl:flex">
      <div>{/* <AppSidebar /> */}</div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } `}
      >
        {/* <AppHeader /> */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
