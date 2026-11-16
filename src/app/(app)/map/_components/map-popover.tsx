"use client";

import type {
  SingleCategoryResponseDto,
  SingleSubscriptionResponseDto,
} from "@/types";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ExternalLink } from "lucide-react";
import { Popup } from "react-leaflet";

import { Button } from "@/components/ui/button";

interface MapPopoverProps {
  subscription: SingleSubscriptionResponseDto;
  category: SingleCategoryResponseDto;
}

export const MapPopover: FC<MapPopoverProps> = ({ subscription, category }) => {
  // Get the first document/image if available
  const firstImage =
    subscription.documents && subscription.documents.length > 0
      ? subscription.documents[0]
      : null;

  return (
    <Popup
      closeButton={true}
      closeOnClick={true}
      maxWidth={300}
      minWidth={250}
      className="[&_.leaflet-popup-content]:m-0 [&_.leaflet-popup-content]:p-0 [&_.leaflet-popup-content-wrapper]:rounded-lg [&_.leaflet-popup-content-wrapper]:border [&_.leaflet-popup-content-wrapper]:shadow-lg [&_.leaflet-popup-tip]:border [&_.leaflet-popup-tip]:border-t-0 [&_.leaflet-popup-tip]:border-r-0 [&_.leaflet-popup-tip]:bg-white"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 text-lg leading-tight font-semibold text-gray-900">
            {subscription.name}
          </h3>

          <div className="inline-flex shrink-0 items-center space-x-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  category.configuration?.color || "hsl(var(--primary))",
              }}
            />
            <span className="font-medium text-gray-700">{category.name}</span>
          </div>
        </div>

        <div className="relative h-40 w-full overflow-hidden rounded-md bg-gray-100">
          {firstImage?.url ? (
            <Image
              src={firstImage.url}
              alt={subscription.name}
              fill
              className="object-cover"
              sizes="(max-width: 300px) 100vw, 300px"
            />
          ) : (
            <Image
              src="/saptarii-logo.png"
              alt="Saptarii Logo"
              fill
              className="object-contain p-6"
              sizes="(max-width: 300px) 100vw, 300px"
            />
          )}
        </div>

        <div className="pt-2">
          <Link href={`/subscriptions/${category.id}/${subscription.id}`}>
            <Button className="w-full" size="sm">
              <span>Vezi în magazin</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};
