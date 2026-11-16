import Link from "next/link";
import { FC } from "react";

import { UserRole } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

const isLinkActive = (linkHref: string, currentPathname: string): boolean => {
  if (currentPathname === linkHref) {
    return true;
  }

  if (
    linkHref.startsWith("/dashboard/") &&
    currentPathname.startsWith("/dashboard/")
  ) {
    return true;
  }

  if (linkHref !== "/" && currentPathname.startsWith(linkHref + "/")) {
    return true;
  }

  return false;
};

export type NavLinkInfo = {
  href: string;
  label: string;
  roles?: UserRole[];
};

export const NavLinks: FC<{
  links: NavLinkInfo[];
  pathname: string;
  isMobile?: boolean;
  onLinkClick: () => void;
}> = ({ links, pathname, isMobile = false, onLinkClick }) =>
  links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={onLinkClick}
      className={cn(
        "hover:text-accent transition-colors",
        { "text-accent font-bold": isLinkActive(link.href, pathname) },
        isMobile
          ? "text-2xl font-semibold uppercase"
          : "text-base font-semibold tracking-wide uppercase",
      )}
    >
      {link.label}
    </Link>
  ));
