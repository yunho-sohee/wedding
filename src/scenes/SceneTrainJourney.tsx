import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import trainSvgRaw from "../assets/scenes/03-train.svg?raw";
import { fitSvg } from "../utils/svg";
import { setupPathDrawing } from "../utils/drawOnScroll";

const trainSvg = fitSvg(trainSvgRaw);

gsap.registerPlugin(ScrollTrigger);

export function SceneTrainJourney() {
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
      caption="Chapter 03"
      title="장거리 커플"
      body={"서로의 하루를 나누던 시간이 쌓여\n함께하고 싶은 마음은 더 분명해졌습니다."}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: trainSvg }}
      />
    </Scene>
  );
}
