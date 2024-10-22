import {
  LucideIcon,
  CircleDollarSign,
  History,
  Handshake,
  Home
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Home",
          icon: Home,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Bank & Transaction",
      menus: [
        {
          href: "/requests",
          label: "Request",
          icon: Handshake,
          submenus: [
            {
              href: "/requests/pending",
              label: "Pending"
            },
            {
              href: "/requests/all-requests",
              label: "All requests"
            }
          ]
        },
        {
          href: "/presets",
          label: "Presets",
          icon: CircleDollarSign
        },
        {
          href: "/tx-history",
          label: "Transaction History",
          icon: History
        }
      ]
    }
  ];
}
