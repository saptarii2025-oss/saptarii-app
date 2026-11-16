import { Metadata } from "next";

import { SidebarLayout } from "@/components/custom/layouts";
import { layerGuard } from "@/guards";
import { profileSidebarConfig } from "@/lib/sidebar-configs";

export const metadata: Metadata = {
  title: {
    template: "%s | Saptarii Roleplay",
    default: "Profil | Saptarii Roleplay",
  },
  description: "Gestionează datele tale personale",
};

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default layerGuard(function ProfileLayout({
  children,
}: ProfileLayoutProps) {
  return (
    <SidebarLayout config={profileSidebarConfig}>{children}</SidebarLayout>
  );
}, []);
