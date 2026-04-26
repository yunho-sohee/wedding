import { useEffect, useState } from "react";

type Props = {
  isMusicPlaying: boolean;
};

/**
 * Bouncing scroll-down indicator. Appears after a short delay on landing,
 * and disappears as soon as the user scrolls. When music isn't playing,
 * the message also nudges the user to turn it on.
 */
export function ScrollHint({ isMusicPlaying }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (window.scrollY < 10) setVisible(true);
    }, 2000);

    const onScroll = () => {
      if (window.scrollY > 10) {
        setVisible(false);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="text-xs leading-relaxed tracking-[0.05em] text-[color:var(--color-muted)] whitespace-pre-line">
        {isMusicPlaying
          ? "아래로 스크롤해 주세요"
          : "‘음악과 함께 보기’를 클릭하고\n아래로 스크롤해 주세요"}
      </span>
      <span className="text-[color:var(--color-charcoal)] text-2xl leading-none animate-scroll-hint">
        ↓
      </span>
    </div>
  );
}
