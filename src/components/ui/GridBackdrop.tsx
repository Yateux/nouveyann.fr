export function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
    >
      <svg className="h-full w-full text-ink" width="100%" height="100%">
        <defs>
          <pattern
            id="trame"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="points"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1.5"
              fill="currentColor"
              fillOpacity="0.3"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#trame)" />
        <rect width="100%" height="100%" fill="url(#points)" />

        <circle
          cx="15%"
          cy="20%"
          r="300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 12"
          className="opacity-10"
        />
        <circle
          cx="85%"
          cy="80%"
          r="450"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 12"
          className="opacity-10"
        />
      </svg>
    </div>
  );
}
