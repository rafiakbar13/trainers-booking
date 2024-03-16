import { MenuItemProps, TabsItemProps } from "../types/MenuItem";
export const MENU: MenuItemProps[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Find a Trainer",
    path: "/trainers",
  },
  {
    name: "Program",
    path: "/program",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export const TABS: TabsItemProps[] = [
  {
    name: "Overview",
    tab: "overview",
  },
  {
    name: "Appointments",
    tab: "appointment",
  },
  {
    name: "Settings",
    tab: "settings",
  },
];
