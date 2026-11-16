"use client";

import { ReactNode, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HoverPopoverProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  contentClassName?: string;
}

export function HoverPopover({
  children,
  content,
  side = "top",
  align = "center",
  contentClassName,
}: HoverPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="inline-block"
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} className={contentClassName}>
        {content}
      </PopoverContent>
    </Popover>
  );
}
