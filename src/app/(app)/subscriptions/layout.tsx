import { ReactNode } from "react";

import { SidebarLayout } from "@/components/custom/layouts";
import { findSingleSubscriptionOnCategory } from "@/controller/subscription";

import { buildStoreSidebarConfig } from "./_utils/sidebar";

interface SubscriptionsLayoutProps {
  children: ReactNode;
  params: Promise<{ categoryId?: string; id?: string }>;
}

export default async function SubscriptionsLayout({
  children,
  params,
}: SubscriptionsLayoutProps) {
  const { categoryId, id } = await params;
  let selectedCategoryId: number | string | undefined = categoryId;

  // If no category in params but we're on details page, get category from subscription data
  if (!selectedCategoryId && id) {
    const subscriptionId = Number(id);
    if (!Number.isNaN(subscriptionId)) {
      const { data } = await findSingleSubscriptionOnCategory(subscriptionId);
      selectedCategoryId = data?.category.id;
    }
  }

  const config = await buildStoreSidebarConfig(selectedCategoryId);

  return (
    <SidebarLayout config={config} localStorageKey="storeSidebarCollapsed">
      {children}
    </SidebarLayout>
  );
}
