import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import {
  PageIcon,
  UserCircleIcon,
  ListIcon,
  GridIcon,
} from "@/components/ui/Icon";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "데시보드",
    path: "/",
  },
  {
    icon: <PageIcon />,
    name: "컨텐츠 등록",
    path: "/contents",
  },
  {
    icon: <UserCircleIcon />,
    name: "셀러 코드관리",
    path: "/seller",
  },
  {
    icon: <ListIcon />,
    name: "공지 관리",
    path: "/notice",
  },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = useCallback(
    (path?: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
       w-[290px] -translate-x-full lg:translate-x-0`}
    >
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-7">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start`}
              >
                Menu
              </h2>
              <ul className="flex flex-col gap-4">
                {navItems.map((nav) => (
                  <li key={nav.name}>
                    <Link
                      to={nav.path || "#"}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size ${
                          isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {nav.icon}
                      </span>

                      <span className="menu-item-text">{nav.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
