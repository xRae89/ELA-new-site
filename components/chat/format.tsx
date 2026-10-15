import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*(?:#[a-z0-9-]+)?|\(\d{3}\)\s?\d{3}-\d{4})/gi;

function inline(text: string) {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-signal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkCls = "font-medium text-signal underline underline-offset-2";
    if (/^https?:\/\//.test(part)) {
      const label = part.includes("google.com/maps") ? "Get directions" : part.replace(/^https?:\/\//, "");
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer" className={linkCls}>
          {label}
        </a>
      );
    }
    if (/^\/[a-z]/i.test(part) && part.length > 2) {
      return (
        <Link key={i} href={part} className={linkCls}>
          {part.startsWith("/contact-us") ? "free case review form" : part}
        </Link>
      );
    }
    if (/^\(\d{3}\)/.test(part)) {
      return (
        <a key={i} href={`tel:+1${part.replace(/\D/g, "")}`} className={linkCls}>
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Minimal renderer for the assistant's plain-text replies: paragraphs, "- " lists, bold, links. */
export function FormattedText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-•]\s+/.test(l))) {
          return (
            <ul key={bi} className="list-disc space-y-1 pl-5 marker:text-signal">
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\s*[-•]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi} className="whitespace-pre-wrap">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
