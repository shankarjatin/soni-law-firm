import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insights } from "@/content/insights";
import { InsightCard } from "./InsightCard";

export function InsightsPreview() {
  return (
    <section aria-labelledby="insights-title" className="bg-stone/60 py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="insights-title"
            eyebrow="Insights"
            title="Know your rights."
            intro="Plain-language guides to Indian law and procedure. General information only."
          />
          <LinkButton href="/insights" variant="secondary" className="self-start md:self-auto">
            All insights
          </LinkButton>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0, 3).map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Container>
    </section>
  );
}
