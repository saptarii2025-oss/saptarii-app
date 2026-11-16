"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { BuyButton } from "@/components/custom/buy-button";
import { HoverPopover } from "@/components/custom/hover-popover";
import { Button } from "@/components/ui/button";
import { getSubscriptionDisabledReason } from "@/constants/subscription/disabled-reasons";
import { SingleSubscriptionOnCategoryResponseDto } from "@/types";

function hashStringToHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

interface SubscriptionCardProps {
  subscription: SingleSubscriptionOnCategoryResponseDto;
  categoryId: number;
  onBuy?: (subscriptionId: number) => Promise<void>;
}

export function SubscriptionCard({
  subscription,
  categoryId,
  onBuy,
}: SubscriptionCardProps) {
  const coverUrl =
    subscription.documents.find((d) => d.url)?.url ?? "/saptarii-logo.png";
  const isDisabled = subscription.meta.isDisabled;
  const detailsHref = `/subscriptions/${categoryId}/${subscription.id}`;

  const handleBuy = async () => {
    if (!onBuy) return;
    await onBuy(subscription.id);
  };

  const categoryKey =
    subscription.category?.name ?? String(subscription.category?.id ?? "");
  const hue = hashStringToHue(categoryKey);
  const imageBgStyle = {
    backgroundImage: `linear-gradient(135deg, hsla(${hue}, 80%, 50%, 0.14) 0%, transparent 60%)`,
  } as const;

  return (
    <div className="group border-border/50 bg-card text-card-foreground hover:border-primary/40 hover:bg-card/95 relative h-full overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={detailsHref} className="block">
        <div
          className="bg-muted dark:bg-muted/30 relative aspect-[5/3] w-full overflow-hidden md:aspect-[3/2]"
          style={imageBgStyle}
        >
          <Image
            src={coverUrl}
            alt={subscription.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {subscription.isRecommended && (
            <div className="absolute top-2 right-2">
              <div className="bg-opacity-90 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-2 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                <Star className="size-3 fill-current" />
                Recomandat
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-2 p-2 md:space-y-3 md:p-3 lg:p-4">
        <div className="min-h-[36px] md:min-h-[40px] lg:min-h-[48px]">
          <Link href={detailsHref} className="hover:underline">
            <h2 className="text-foreground group-hover:text-primary md:text-md text-md line-clamp-2 leading-tight font-semibold transition-colors duration-200 lg:text-lg">
              {subscription.name}
            </h2>
          </Link>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <div className="flex items-baseline justify-center gap-1 lg:justify-start">
              <span className="text-primary text-lg font-bold md:text-lg lg:text-xl">
                {subscription.price}
              </span>
              <span className="text-muted-foreground text-xs font-medium md:text-sm">
                EUR
              </span>
            </div>
          </div>

          {isDisabled ? (
            <HoverPopover
              content={
                <div className="min-w-[220px] p-1 text-sm">
                  {getSubscriptionDisabledReason(subscription.meta.reason)}
                </div>
              }
            >
              <Button
                disabled
                size="sm"
                className="w-full text-xs font-medium lg:w-auto lg:min-w-[100px]"
                aria-disabled
              >
                Indisponibil
              </Button>
            </HoverPopover>
          ) : (
            onBuy && (
              <BuyButton
                onBuy={handleBuy}
                size="sm"
                className="w-full text-xs font-medium lg:w-auto lg:min-w-[100px]"
              >
                Cumpără
              </BuyButton>
            )
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-50">
        <div className="from-primary/10 to-primary/10 absolute inset-0 rounded-xl bg-gradient-to-r via-transparent blur-sm" />
      </div>

      {isDisabled && (
        <div className="bg-background/20 pointer-events-none absolute inset-0 rounded-xl" />
      )}
    </div>
  );
}
