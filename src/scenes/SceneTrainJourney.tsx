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
          end: "center 55%",
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
      title="서울과 부산 사이"
      body={"기차를 타고 만나,\n함께하는 시간을 즐겼다."}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: trainSvg }}
      />
    </Scene>
  );
}
