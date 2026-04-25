import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import finaleSvgRaw from "../assets/scenes/04-finale.svg?raw";
import { fitSvg } from "../utils/svg";
import { setupPathDrawing } from "../utils/drawOnScroll";

const finaleSvg = fitSvg(finaleSvgRaw);
import finalePhoto from "../assets/photos/finale.jpg";

gsap.registerPlugin(ScrollTrigger);

export function SceneFinale() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const lineLayerRef = useRef<HTMLDivElement | null>(null);
  const photoLayerRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const lineEl = lineLayerRef.current;
    const photoEl = photoLayerRef.current;
    if (!section || !stage || !lineEl || !photoEl) return;

    const paths = Array.from(lineEl.querySelectorAll<SVGPathElement>("path[data-draw]"));
    const lengths = setupPathDrawing(paths);
    gsap.set(photoEl, { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });
      paths.forEach((p, i) => {
        tl.fromTo(
          p,
          { strokeDashoffset: lengths[i] },
          { strokeDashoffset: 0, ease: "none", duration: 0.4 },
          (i / paths.length) * 0.6,
        );
      });
      tl.to(lineEl, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.65);
      tl.to(photoEl, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 0.65);
    }, section);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[100svh] flex flex-col items-center justify-start px-6 pt-20 pb-16 max-w-xl mx-auto text-center"
    >
      <div
        ref={stageRef}
        className="w-full max-w-sm aspect-square relative overflow-hidden rounded-lg"
      >
        <img
          ref={photoLayerRef}
          src={finalePhoto}
          alt="Our wedding portrait"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          ref={lineLayerRef}
          className="absolute inset-0 [&_svg]:w-full [&_svg]:h-full bg-[color:var(--color-cream)]"
          dangerouslySetInnerHTML={{ __html: finaleSvg }}
        />
      </div>
      <div className="mt-10 space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
          Finale
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--color-charcoal)]">
          우리, 결혼합니다
        </h2>
        <p className="text-base leading-relaxed text-[color:var(--color-muted)] whitespace-pre-line">
          {"따로 자리를 마련해 모시지는 못하지만,\n저희의 시작을 이렇게 전합니다.\n멀리서도 따뜻한 마음으로 함께해 주시면\n큰 기쁨으로 간직하겠습니다."}
        </p>
      </div>
    </section>
  );
}
