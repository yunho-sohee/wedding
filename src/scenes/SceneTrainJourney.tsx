import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import trainSvg from "../assets/scenes/03-train.svg?raw";

gsap.registerPlugin(ScrollTrigger);

export function SceneTrainJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-draw]"));
    if (paths.length === 0) return;

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });
      paths.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, ease: "none" }, i * 0.05);
      });
    }, el);

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
