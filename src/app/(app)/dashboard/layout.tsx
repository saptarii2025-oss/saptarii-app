import { Metadata } from "next";

import { SidebarLayout } from "@/components/custom/layouts";
import { dashboardSidebarConfig } from "@/lib/sidebar-configs";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Saptarii Roleplay",
    default: "Saptarii Roleplay",
  },
  description: "Saptarii Roleplay",
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarLayout
      config={dashboardSidebarConfig}
      localStorageKey="dashboardSidebarCollapsed"
    >
      {children}
    </SidebarLayout>
  );
}
