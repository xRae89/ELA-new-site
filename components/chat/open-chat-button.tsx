"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { OPEN_CHAT_EVENT } from "./events";

export function OpenChatButton({
  prompt,
  className,
  icon = true,
  children = "Ask our AI assistant",
}: {
  prompt?: string;
  className?: string;
  icon?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: prompt }))}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold underline decoration-current/30 underline-offset-[6px] hover:decoration-current",
        className,
      )}
    >
      {icon && <Sparkles aria-hidden className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />}
      {children}
    </button>
  );
}
