import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./Scene";
import proposalSvgRaw from "../assets/scenes/04-proposal.svg?raw";
import { fitSvg } from "../utils/svg";
import { setupPathDrawing } from "../utils/drawOnScroll";

const proposalSvg = fitSvg(proposalSvgRaw);

gsap.registerPlugin(ScrollTrigger);

export function SceneProposal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-draw]"));
    if (paths.length === 0) return;

    const lengths = setupPathDrawing(paths);

    // Identify ring/ring-box paths by bounding box (near hand level, center-ish)
    const ringPathIndices = new Set<number>();
    paths.forEach((p, i) => {
      const bbox = p.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const area = bbox.width * bbox.height;
      if (cx > 430 && cx < 580 && cy > 420 && cy < 510 && area < 12000) {
        ringPathIndices.add(i);
      }
    });
    const otherIndices: number[] = [];
    const ringIndices: number[] = [];
    paths.forEach((_, i) => {
      (ringPathIndices.has(i) ? ringIndices : otherIndices).push(i);
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: 0.5,
        },
      });
      otherIndices.forEach((idx, i) => {
        tl.fromTo(
          paths[idx],
          { strokeDashoffset: lengths[idx] },
          { strokeDashoffset: 0, ease: "none", duration: 0.3 },
          i * 0.04,
        );
      });
      const phase2Start = otherIndices.length * 0.04 + 0.2;
      ringIndices.forEach((idx, i) => {
        tl.fromTo(
          paths[idx],
          { strokeDashoffset: lengths[idx] },
          { strokeDashoffset: 0, ease: "power2.out", duration: 0.4 },
          phase2Start + i * 0.15,
        );
      });
    }, el);
    ScrollTrigger.refresh();

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
