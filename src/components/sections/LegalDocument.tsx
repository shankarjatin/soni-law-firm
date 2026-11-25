import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";
import { formatDate } from "@/lib/seo";

export function LegalDocument({
  title,
  path,
  intro,
  updatedAt,
  children,
}: {
  title: string;
  path: string;
  intro: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} eyebrow="Legal" title={title} intro={intro} />
      <section className="pb-24 lg:pb-36">
        <Container>
          <div className="prose-legal">
            <p className="text-sm text-muted">
              Last updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </p>
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
