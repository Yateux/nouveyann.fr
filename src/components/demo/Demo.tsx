import type { CSSProperties, ReactNode, Ref } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type DemoLabels = {
  label: string;
  callMessage: string;
  callMeta: string;
  live: string;
};

export type DemoShot = { name: string; src: string | null };

/** 0 the call, 1 the mockup, 2 the code, 3 the site online. */
export type DemoScene = 0 | 1 | 2 | 3;

const K = ({ children }: { children: ReactNode }) => (
  <span className="k">{children}</span>
);
const P = ({ children }: { children: ReactNode }) => (
  <span className="p">{children}</span>
);

const CODE: ReactNode[] = [
  <>
    <K>export default async function</K> Sejours() {"{"}
  </>,
  <>
    {"  "}
    <K>const</K> sejours = <K>await</K> getSejours();
  </>,
  <>
    {"  "}
    <K>return</K> <P>(</P>
  </>,
  <>
    {"    "}
    <P>&lt;</P>Liste<P>&gt;</P>
  </>,
  <>
    {"      {sejours.map((s) "}
    <K>=&gt;</K> <P>(</P>
  </>,
  <>
    {"        "}
    <P>&lt;</P>
    {"Sejour key={s.id} {...s} "}
    <P>/&gt;</P>
  </>,
  <>
    {"      "}
    <P>))</P>
    {"}"}
  </>,
  <>
    {"    "}
    <P>&lt;/</P>Liste<P>&gt;</P>
  </>,
  <>
    {"  "}
    <P>);</P>
  </>,
  <>{"}"}</>,
];

const index = (value: number) => ({ "--i": value }) as CSSProperties;

/**
 * One plate that morphs through the four moments of a project. Purely
 * presentational: whoever renders it decides which scene is showing.
 */
export function Demo({
  scene,
  labels,
  shot,
  pill = true,
  playing = false,
  eager = false,
  ref,
  children,
}: {
  scene: DemoScene;
  labels: DemoLabels;
  shot: DemoShot;
  pill?: boolean;
  playing?: boolean;
  /** Above the fold: the capture of the last scene loads with the page. */
  eager?: boolean;
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}) {
  return (
    <div
      ref={ref}
      role="group"
      aria-label={labels.label}
      data-scene={scene}
      className={cn("demo", playing && "playing")}
    >
      <div className="demo-canvas" aria-hidden="true">
        <div className="plate" />

        <div className="scene s-call">
          <p className="call-msg">{labels.callMessage}</p>
          <p className="call-meta">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <path d="M3.5 2.5h2.6l1.2 3-1.6 1.2a8 8 0 0 0 3.6 3.6l1.2-1.6 3 1.2v2.6a1 1 0 0 1-1.1 1A11.5 11.5 0 0 1 2.5 3.6a1 1 0 0 1 1-1.1z" />
            </svg>
            {labels.callMeta}
          </p>
        </div>

        <div className="scene s-wire">
          <span className="wb d" style={index(0)} />
          <div className="wire-hero">
            <span className="wb d" style={index(1)} />
            <span className="wb" style={index(2)} />
            <span className="wb d" style={index(3)} />
          </div>
          <div className="wire-tiles">
            <span className="wb" style={index(4)} />
            <span className="wb" style={index(5)} />
            <span className="wb" style={index(6)} />
          </div>
        </div>

        <div className="scene s-code">
          <pre className="code">
            {CODE.map((line, position) => (
              <span key={position} className="cl" style={index(position)}>
                {line}
              </span>
            ))}
          </pre>
        </div>

        <div className="scene s-live">
          <div className="live-bar">
            <span className="live-dots">
              <i />
              <i />
              <i />
            </span>
            {shot.name}
          </div>
          <div className="live-stack">
            {shot.src ? (
              <Image
                src={shot.src}
                alt=""
                fill
                sizes="(max-width: 900px) 88vw, 560px"
                loading={eager ? "eager" : "lazy"}
                className="object-cover object-top"
              />
            ) : null}
          </div>
          {pill ? (
            <span className="live-pill">
              <i />
              {labels.live}
            </span>
          ) : null}
        </div>
      </div>

      {children}
    </div>
  );
}
