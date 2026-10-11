/** Says, to a screen reader only, that a link leaves for a new tab. */
export function NewTab({ label }: { label: string }) {
  return <span className="sr-only"> ({label})</span>;
}
