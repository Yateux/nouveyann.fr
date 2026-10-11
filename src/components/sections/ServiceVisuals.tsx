import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const delay = (index: number) => ({ "--i": index }) as CSSProperties;

/**
 * Redesign: one page, the same blocks, first crammed and askew, then put in
 * order. The blocks only move; nothing is added, which is what a redesign is.
 * Decorative: the sentence beside it says the same thing in words.
 */
function RedesignVisual({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  return (
    <div className="fx fx-redo" aria-hidden="true">
      <span className="fx-tag">
        <span className="fx-before">{before}</span>
        <span className="fx-after">{after}</span>
      </span>
      <div className="fx-page">
        <i className="fx-b fx-bar" style={delay(0)} />
        <i className="fx-b fx-title" style={delay(1)} />
        <i className="fx-b fx-line" style={delay(2)} />
        <i className="fx-b fx-cta" style={delay(3)} />
        <i className="fx-b fx-image" style={delay(2)} />
        <i className="fx-b fx-card fx-card-1" style={delay(4)} />
        <i className="fx-b fx-card fx-card-2" style={delay(5)} />
        <i className="fx-b fx-card fx-card-3" style={delay(6)} />
      </div>
    </div>
  );
}

/**
 * Maintenance: the site stays online while its upkeep runs, one task after
 * the other, each one ticked when done. Decorative, like the one above.
 */
function MaintenanceVisual({
  tasks,
  live,
}: {
  tasks: readonly string[];
  live: string;
}) {
  return (
    <div className="fx fx-care" aria-hidden="true">
      <div className="fx-panel">
        <p className="fx-status">
          <i />
          {live}
        </p>
        <ul>
          {tasks.map((task, index) => (
            <li key={task} style={delay(index)}>
              <span className="fx-name">{task}</span>
              <span className="fx-track">
                <i />
              </span>
              <span className="fx-check">
                <Check strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The animation of a service that has no project to show, by its rank among
 * them: the redesign first, then maintenance. Used wherever the services are
 * listed, so each one looks the same everywhere.
 */
export function ServiceVisual({
  order,
  locale = defaultLocale,
}: {
  order: number;
  locale?: Locale;
}) {
  const t = getDictionary(locale);

  return order % 2 === 0 ? (
    <RedesignVisual {...t.expertise.redesign} />
  ) : (
    <MaintenanceVisual
      tasks={t.expertise.maintenance}
      live={t.home.demo.live}
    />
  );
}
