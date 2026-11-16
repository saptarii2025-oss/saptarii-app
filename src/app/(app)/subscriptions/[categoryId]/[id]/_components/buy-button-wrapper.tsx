"use client";

import { useRouter } from "next/navigation";

import { BuyButton } from "@/components/custom/buy-button";
import { checkoutOrder } from "@/controller/order";
import { Reason } from "@/types";

interface BuyButtonWrapperProps {
  subscriptionId: number;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function BuyButtonWrapper({
  subscriptionId,
  className,
  size = "lg",
}: BuyButtonWrapperProps) {
  const router = useRouter();

  const handleBuy = async () => {
    const { error } = await checkoutOrder(subscriptionId);
    if (error) {
      if (error.reason === Reason.UNAUTHORIZED_ERROR) {
        router.push("/login");
        return;
      }
      if (error.reason === Reason.NO_USER_DETAILS) {
        router.push("/profile");
        return;
      }
      throw new Error(error.message);
    }
  };

  return (
    <BuyButton onBuy={handleBuy} className={className} size={size}>
      Cumpără
    </BuyButton>
  );
}
