import { create } from "zustand";

export interface SidebarStore {
  isExpanded: boolean;
  isHovered: boolean;
  setExpand: (expanded: boolean) => void;
  setHover: (hovered: boolean) => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isExpanded: true,
  isHovered: false,
  setExpand: (expanded: boolean) => set({ isExpanded: expanded }),
  setHover: (hovered: boolean) => set({ isHovered: hovered }),
}));

export default useSidebar;
