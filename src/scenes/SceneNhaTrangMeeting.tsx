import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import nhaTrangSvgRaw from "../assets/scenes/01-nhatrang.svg?raw";
import { fitSvg } from "../utils/svg";
import { setupPathDrawing } from "../utils/drawOnScroll";

const nhaTrangSvg = fitSvg(nhaTrangSvgRaw);

gsap.registerPlugin(ScrollTrigger);

export function SceneNhaTrangMeeting() {
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
          i * 0.05,
        );
      });
    }, el);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <Scene
      caption="Chapter 01"
      title="인연의 시작"
      body={"낯선 여행지에서 우연히 만난 우리는\n서로의 하루에 천천히 스며들었습니다."}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: nhaTrangSvg }}
      />
    </Scene>
  );
}
