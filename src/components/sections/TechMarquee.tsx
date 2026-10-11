import { technologies } from "@/data/expertise";

// Four copies, sliding by a quarter: the loop never shows its seam, even on a
// very wide screen.
const COPIES = [0, 1, 2, 3];

/** The stack as a slow band. Read aloud once, as a plain list. */
export function TechMarquee() {
  const names = technologies.map((technology) => technology.name);

  return (
    <div className="mq overflow-hidden border-y border-line-strong py-[18px]">
      <p className="sr-only">{names.join(", ")}</p>
      <div className="mq-track" aria-hidden="true">
        {COPIES.map((copy) => (
          <div key={copy} className="mq-group" aria-hidden={copy > 0}>
            {names.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
