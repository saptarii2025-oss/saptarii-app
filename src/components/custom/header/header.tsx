"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { Menu, X } from "lucide-react";

import { UserRole } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

import { AuthActionButton } from "./auth-action-button";
import { NavLinkInfo, NavLinks } from "./nav-links";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const allNavLinks: NavLinkInfo[] = [
    {
      href: "/dashboard/users",
      label: "Dashboard",
      roles: [UserRole.ADMIN],
    },
    { href: "/subscriptions", label: "Abonamente" },
    { href: "/map", label: "Harta" },
    { href: "/houses", label: "Case IC" },
    { href: "/rules", label: "Regulament" },
    { href: "/contact", label: "Contact" },
  ];

  const filteredNavLinks = allNavLinks.filter((link) => {
    if (link.roles && link.roles.length > 0) {
      return (
        status === "authenticated" &&
        !!session?.user?.role &&
        link.roles.includes(session.user.role)
      );
    }
    return true;
  });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-panelBg text-panelText sticky top-0 z-40 shadow-lg">
        <nav className="flex items-center justify-between px-12 py-4">
          <Link href="/" className="text-3xl" onClick={handleLinkClick}>
            Șăptarii
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            <NavLinks
              links={filteredNavLinks}
              pathname={pathname}
              onLinkClick={handleLinkClick}
            />
          </div>

          <div className="hidden lg:block">
            <AuthActionButton status={status} onLinkClick={handleLinkClick} />
          </div>

          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-panelText hover:text-accent cursor-pointer transition"
              aria-label="Deschide meniul"
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "bg-background/80 fixed inset-0 z-50 backdrop-blur-lg transition-opacity duration-300 lg:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-12 py-4">
          <Link
            href="/"
            className="text-3xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Șăptarii
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-accent cursor-pointer transition"
            aria-label="Închide meniul"
          >
            <X size={28} />
          </button>
        </div>
        <div className="text-foreground -mt-16 flex h-full flex-col items-center justify-center space-y-8 text-center">
          <NavLinks
            links={filteredNavLinks}
            pathname={pathname}
            isMobile
            onLinkClick={handleLinkClick}
          />
          <div className="w-full max-w-xs pt-8">
            <AuthActionButton
              status={status}
              isMobile
              onLinkClick={handleLinkClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
