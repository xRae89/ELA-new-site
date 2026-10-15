"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Review } from "@/lib/people";

const INTERVAL = 6000;

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovering || stopped;
  const r = reviews[i];
  const go = (d: number) => setI((v) => (v + d + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % reviews.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, reviews.length]);

  return (
    <div
      className="grid gap-3 lg:grid-cols-[1.5fr_1fr]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <figure className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-paper-2 p-8 sm:p-12">
        <blockquote key={i} className="relative animate-rise">
          <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] italic leading-[1.2] tracking-tight">
            &ldquo;{r.quote}&rdquo;
          </p>
        </blockquote>
        <figcaption key={`c${i}`} className="relative mt-10 animate-rise [animation-delay:120ms]">
          <span className="block font-semibold">{r.name}</span>
          <span className="text-sm text-slate">Employment Law Assist client</span>
        </figcaption>
      </figure>

      <div className="flex flex-col justify-between rounded-[1.75rem] bg-ink p-8 text-paper sm:p-10">
        <div>
          <p className="font-wide text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight">
            <span key={i} className="inline-block animate-rise text-signal">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-mist">/{reviews.length}</span>
          </p>
          <p className="mt-4 max-w-xs text-dusk">
            Clients on what it was like to work with our team, from first call to settlement.
          </p>
          <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div
              key={`${i}-${paused}`}
              className="h-full origin-left rounded-full bg-signal"
              style={{
                animation: paused ? "none" : `grow ${INTERVAL}ms linear both`,
                transform: paused ? "scaleX(0)" : undefined,
              }}
            />
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <Link href="/reviews" className="font-semibold underline decoration-paper/30 underline-offset-[6px] hover:decoration-paper">
            Read all reviews
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Resume reviews" : "Pause reviews"}
              className="grid size-12 place-items-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-ink"
            >
              {stopped ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid size-12 place-items-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid size-12 place-items-center rounded-full bg-signal text-ink transition-transform hover:scale-105"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
