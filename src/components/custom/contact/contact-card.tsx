import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  logo: string;
  logoAlt: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
}

export function ContactCard({
  title,
  description,
  href,
  logo,
  logoAlt,
  buttonText,
  buttonVariant = "default",
}: ContactCardProps) {
  // Check if it's the CFX logo to apply different styling
  const isCfxLogo = logo.includes("cfx-logo");

  return (
    <Card className="flex h-full flex-col text-center">
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <div
            className={`flex items-center justify-center border p-2 shadow-md ${
              isCfxLogo
                ? "h-12 w-24 rounded-lg border-gray-700 bg-gray-900"
                : "h-14 w-14 rounded-full border-gray-200 bg-gray-50"
            }`}
          >
            <Image
              src={logo}
              alt={logoAlt}
              width={isCfxLogo ? 80 : 40}
              height={isCfxLogo ? 32 : 40}
              className="h-auto w-auto object-contain"
              style={{
                maxWidth: isCfxLogo ? "80px" : "40px",
                maxHeight: isCfxLogo ? "32px" : "40px",
              }}
              priority
            />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button asChild variant={buttonVariant} className="w-full">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            {buttonText}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
