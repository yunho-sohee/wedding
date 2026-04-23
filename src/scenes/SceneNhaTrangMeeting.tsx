import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import nhaTrangSvg from "../assets/scenes/01-nhatrang.svg?raw";

gsap.registerPlugin(ScrollTrigger);

export function SceneNhaTrangMeeting() {
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
      caption="Chapter 01"
      title="여행"
      body={"어느 여행지에서 처음 마주쳤다."}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: nhaTrangSvg }}
      />
    </Scene>
  );
}
