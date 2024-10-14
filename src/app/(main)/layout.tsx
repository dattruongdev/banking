import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import React from "react";

type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
