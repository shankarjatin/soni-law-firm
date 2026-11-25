import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/content/insights";
import { formatDate } from "@/lib/seo";

export function InsightCard({ insight, headingLevel: H = "h3" }: { insight: Insight; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[3/2] overflow-hidden bg-stone">
        <Image
          src={insight.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-brass-ink uppercase">{insight.category}</p>
        <H className="font-display text-xl leading-snug font-semibold tracking-tight text-balance">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0">
            {insight.title}
          </Link>
        </H>
        <p className="leading-relaxed text-muted">{insight.summary}</p>
        <p className="mt-auto pt-3 text-sm text-muted">
          Updated <time dateTime={insight.updatedAt}>{formatDate(insight.updatedAt)}</time>
        </p>
      </div>
    </article>
  );
}
