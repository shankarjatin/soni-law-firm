import type { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-[82rem] px-5 sm:px-8 ${className}`} {...props} />;
}
