import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import proposalSvg from "../assets/scenes/04-proposal.svg?raw";

gsap.registerPlugin(ScrollTrigger);

export function SceneProposal() {
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

    // Identify ring/ring-box paths by bounding box location (near hand level, center-ish)
    const ringPathIndices = new Set<number>();
    paths.forEach((p, i) => {
      const bbox = p.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const area = bbox.width * bbox.height;
      // Ring box + ring region: center ~(460-570, 420-500), small area
      if (cx > 430 && cx < 580 && cy > 420 && cy < 510 && area < 12000) {
        ringPathIndices.add(i);
      }
    });

    const otherPaths = paths.filter((_, i) => !ringPathIndices.has(i));
    const ringPaths = paths.filter((_, i) => ringPathIndices.has(i));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });
      // Phase 1: figures, hands, clothes, etc. (0 → 0.8 of timeline)
      otherPaths.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, ease: "none", duration: 0.3 }, i * 0.04);
      });
      // Phase 2: ring and ring box drawn last with slower, deliberate pace
      const phase2Start = otherPaths.length * 0.04 + 0.2;
      ringPaths.forEach((p, i) => {
        tl.to(
          p,
          { strokeDashoffset: 0, ease: "power2.out", duration: 0.4 },
          phase2Start + i * 0.15
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Scene
      caption="Chapter 04"
      title="프로포즈"
      body={"그렇게 쌓인 확신 끝에\n서로의 미래가 되어주기로 약속했습니다."}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: proposalSvg }}
      />
    </Scene>
  );
}
