import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import skOutlineRaw from "../assets/scenes/02-sk-outline.svg?raw";
import { fitSvg } from "../utils/svg";
import { setupPathDrawing } from "../utils/drawOnScroll";

const skOutline = fitSvg(skOutlineRaw);

gsap.registerPlugin(ScrollTrigger);

export function SceneMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-draw]"));
    if (paths.length === 0) return;

    const lengths = setupPathDrawing(paths);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: 0.5,
        },
      });
      paths.forEach((p, i) => {
        tl.fromTo(
          p,
          { strokeDashoffset: lengths[i] },
          { strokeDashoffset: 0, ease: "none", duration: 1 },
          i * 0.15,
        );
      });
    }, el);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <Scene
      caption="Chapter 02"
      title="서울과 부산"
      body={"멀리 떨어져 있었지만\n매일의 안부로 마음의 거리를 좁혀갔습니다."}
    >
      <div ref={containerRef} className="relative w-full h-full">
        <div
          className="absolute inset-0 [&_svg]:w-full [&_svg]:h-full"
          dangerouslySetInnerHTML={{ __html: skOutline }}
        />
        {/* overlay: Seoul/Busan dots + labels */}
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full"
          fill="none"
          stroke="#1c1c1c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            data-draw
            d="M395 300 Q 620 420, 660 640"
            stroke="#1c1c1c"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="395" cy="300" r="8" fill="#1c1c1c" stroke="none" />
          <circle cx="660" cy="640" r="8" fill="#1c1c1c" stroke="none" />
          <text
            x="410"
            y="295"
            fontSize="30"
            fill="#1c1c1c"
            stroke="none"
            fontFamily="inherit"
          >
            Seoul
          </text>
          <text
            x="650"
            y="645"
            fontSize="30"
            fill="#1c1c1c"
            stroke="none"
            fontFamily="inherit"
            textAnchor="end"
          >
            Busan
          </text>
        </svg>
      </div>
    </Scene>
  );
}
