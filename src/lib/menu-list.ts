import {
  LucideIcon,
  CircleDollarSign,
  WalletMinimal,
  History,
  Handshake,
  Home,
  CreditCard
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
              href: "/requests/my-requests",
              label: "My requests"
            },
            {
              href: "/requests/all-requests",
              label: "All requests"
            }
          ]
        },
        {
          href: "/my-banks",
          label: "My Banks",
          icon: CircleDollarSign
        },
        {
          href: "/tx-history",
          label: "Transaction History",
          icon: History
        },
        {
          href: "/payment-transfer",
          label: "Payment Transfer",
          icon: WalletMinimal
        }
      ]
    },
    {
      groupLabel: "Linking",
      menus: [
        {
          href: "/connect-bank",
          label: "Connect Bank",
          icon: CreditCard
        }
      ]
    }
  ];
}
