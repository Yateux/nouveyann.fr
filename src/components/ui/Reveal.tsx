"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      element.dataset.reveal = "visible";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : ""}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </div>
  );
}
