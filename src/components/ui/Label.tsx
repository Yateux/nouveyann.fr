import { cn } from "@/lib/cn";

export function Label({
  children,
  className,
  tone = "ink",
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  tone?: "ink" | "chalk";
  as?: "span" | "h2";
}) {
  return (
    <Tag className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "chalk" ? "bg-chalk-line" : "bg-line-strong",
        )}
      />
      <span
        className={cn(
          "mark",
          tone === "chalk" ? "text-chalk-muted" : "text-ink-subtle",
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
