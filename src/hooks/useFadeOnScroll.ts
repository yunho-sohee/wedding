import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.92, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
