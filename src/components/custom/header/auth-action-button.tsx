import Link from "next/link";
import { FC } from "react";

import { UserAvatar } from "@/components/custom/user-avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const AuthActionButton: FC<{
  status: "authenticated" | "loading" | "unauthenticated";
  isMobile?: boolean;
  onLinkClick: () => void;
}> = ({ status, isMobile = false, onLinkClick }) => {
  if (status === "loading") {
    const skeletonClasses = cn(
      "h-10 bg-muted/50",
      isMobile ? "w-full" : "hidden w-28 lg:block",
    );
    return <Skeleton className={skeletonClasses} />;
  }

  if (status === "authenticated") {
    return <UserAvatar isMobile={isMobile} onLinkClick={onLinkClick} />;
  }

  return (
    <Link
      href="/login"
      onClick={onLinkClick}
      className={cn(
        "bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 font-semibold",
        isMobile ? "w-full text-lg" : "hidden lg:flex",
      )}
    >
      Conectează-te
    </Link>
  );
};
