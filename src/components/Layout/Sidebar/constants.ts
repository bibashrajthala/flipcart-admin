import { FaBeer } from "react-icons/fa";

export interface SideMenu {
  label: string;
  to: string;
  Icon?: typeof FaBeer;
  children?: SideMenu[];
}

export const SIDE_MENU: SideMenu[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Categories",
    to: "/category",
  },
  {
    label: "Products",
    to: "/products",
  },
  {
    label: "Orders",
    to: "/orders",
  },
];

export const SIDE_MENU_1: SideMenu[] = [
  {
    label: "Home",
    Icon: FaBeer,
    to: "/",
  },
  {
    label: "Profile",
    Icon: FaBeer,
    to: "/profile",
  },
  {
    label: "Settings",
    Icon: FaBeer,
    to: "/settings",
    children: [
      {
        label: "Account",
        Icon: FaBeer,
        to: "account",
      },
      {
        label: "Security",
        Icon: FaBeer,
        to: "security",
        children: [
          {
            label: "Credentials",
            Icon: FaBeer,
            to: "credentials",
          },
          {
            label: "2-FA",
            Icon: FaBeer,
            to: "2fa",
          },
        ],
      },
    ],
  },
];
