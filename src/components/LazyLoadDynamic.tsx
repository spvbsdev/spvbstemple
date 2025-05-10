"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

type Props = {
  component: "ProjectHighlight" | "FaqAccordionWrapper";
  componentProps?: Record<string, unknown>;
  rootMargin?: string;
};

const DynamicProjectHighlight = dynamic(() => import("@/components/ProjectHighlight"), { ssr: false });
const DynamicFaqAccordionWrapper = dynamic(() => import("@/components/FaqAccordionWrapper"), { ssr: false });

export default function LazyLoadDynamic({ component, componentProps, rootMargin = "200px" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {show
        ? component === "ProjectHighlight"
          ? <DynamicProjectHighlight {...componentProps} />
          : <DynamicFaqAccordionWrapper {...componentProps} />
        : null}
    </div>
  );
} 