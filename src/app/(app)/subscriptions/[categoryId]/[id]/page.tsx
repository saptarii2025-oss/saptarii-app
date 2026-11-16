import Image from "next/image";

import { Separator } from "@/components/custom/custom-separator";
import { ErrorComponent } from "@/components/custom/error/error";
import { HoverPopover } from "@/components/custom/hover-popover";
import { ImageGallery } from "@/components/custom/image-gallery";
import { Button } from "@/components/ui/button";
import { getSubscriptionDisabledReason } from "@/constants/subscription/disabled-reasons";
import { findSingleSubscriptionOnCategory } from "@/controller/subscription";

import { BuyButtonWrapper } from "./_components/buy-button-wrapper";

interface SubscriptionDetailsPageProps {
  params: Promise<{ categoryId: string; id: string }>;
}

export default async function SubscriptionDetailsPage({
  params,
}: SubscriptionDetailsPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const { data, error } = await findSingleSubscriptionOnCategory(id);

  if (!data) {
    return <ErrorComponent error={error} className="m-6" />;
  }

  const galleryItems = data.documents
    .filter((d) => d.url)
    .map((d) => ({ url: d.url!, key: String(d.id), name: d.name ?? null }));

  return (
    <div className="space-y-12 p-6">
      <div className="flex items-center justify-center">
        <h2 className="text-primary text-5xl font-semibold [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">
          {data.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {galleryItems.length > 0 ? (
          <ImageGallery images={galleryItems} />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src="/saptarii-logo.png"
              alt={data.name}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {data.description ? (
            <>
              <h2 className="text-xl font-semibold text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">
                Descriere pachet:
              </h2>

              <Separator type="star" />

              <div
                className="prose prose-sm prose-invert max-w-none text-white/90 [&>*]:[text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />

              <Separator type="star" />
            </>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">
                Preț:
              </h1>
              <div className="text-primary text-3xl font-bold [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                {data.price} EUR
              </div>
            </div>
            <div>
              {data.meta.isDisabled ? (
                <div className="space-y-2 text-center md:text-right">
                  <HoverPopover
                    content={
                      <div className="min-w-[220px] p-1 text-sm">
                        {getSubscriptionDisabledReason(data.meta.reason)}
                      </div>
                    }
                  >
                    <Button disabled className="lg:min-w-[140px]" size="lg">
                      Indisponibil
                    </Button>
                  </HoverPopover>
                </div>
              ) : (
                <BuyButtonWrapper
                  subscriptionId={id}
                  className="lg:min-w-[140px]"
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
