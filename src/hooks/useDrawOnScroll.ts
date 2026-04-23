import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useDrawOnScroll<T extends SVGSVGElement>() {
  const svgRef = useRef<T | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-draw]"));
    if (paths.length === 0) return;

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          end: "center 55%",
          scrub: 1,
        },
      });
      paths.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, ease: "none" }, i * 0.1);
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return svgRef;
}
