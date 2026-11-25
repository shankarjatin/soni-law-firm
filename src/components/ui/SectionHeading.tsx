import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-5 ${centered ? "items-center text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${tone === "dark" ? "text-brass-light" : ""}`}>{eyebrow}</p>}
      <Tag id={id} className="display text-[clamp(2.25rem,5vw,4.25rem)] text-balance">
        {title}
      </Tag>
      {intro && (
        <p
          className={`max-w-[58ch] text-lg leading-relaxed text-pretty ${tone === "dark" ? "text-stone" : "text-muted"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
