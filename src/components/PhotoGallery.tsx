import { useEffect, useRef, useState } from "react";

// Auto-import all photos from /src/assets/photos/gallery/
const modules = import.meta.glob("../assets/photos/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type GroupKey = "A" | "B" | "C" | "D";

const GROUP_META: Record<GroupKey, { index: string; label: string; ko: string }> = {
  A: { index: "01", label: "Canola", ko: "유채꽃 들판" },
  B: { index: "02", label: "Green Field", ko: "초록 들판" },
  C: { index: "03", label: "Forest", ko: "숲길" },
  D: { index: "04", label: "Night Sea", ko: "밤바다" },
};

const GROUP_ORDER: GroupKey[] = ["A", "B", "C", "D"];

function getGroup(path: string): GroupKey | null {
  const name = path.split("/").pop() ?? "";
  const m = name.match(/^([ABCD])_/);
  return m ? (m[1] as GroupKey) : null;
}

// Flatten photos in the order they'll be rendered (group order, then filename inside group)
const grouped: Record<GroupKey, string[]> = { A: [], B: [], C: [], D: [] };
const ungrouped: string[] = [];
for (const [path, src] of Object.entries(modules).sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  const g = getGroup(path);
  if (g) grouped[g].push(src);
  else ungrouped.push(src);
}
const photos: string[] = [
  ...GROUP_ORDER.flatMap((g) => grouped[g]),
  ...ungrouped,
];

// Round-robin distribute items into N columns for stable masonry layout
function distribute<T>(items: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dims, setDims] = useState<Record<string, { w: number; h: number }>>({});
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setDims((d) => ({
          ...d,
          [src]: { w: img.naturalWidth, h: img.naturalHeight },
        }));
      };
      img.src = src;
    });
  }, []);

  const indexOf = (src: string) => photos.indexOf(src);
  const isLandscape = (src: string) => {
    const d = dims[src];
    return d && d.w > d.h * 1.05;
  };

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  if (photos.length === 0) {
    return (
      <section className="py-24 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-4">
          Our Jeju record
        </p>
        <p className="text-sm text-[color:var(--color-muted)] max-w-xs mx-auto">
          사진이 준비되면 이곳에 표시됩니다.
        </p>
      </section>
    );
  }

  function prev() {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }
  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }

  return (
    <>
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-3">
            Our Jeju record
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--color-charcoal)]">
            우리의 제주 기록
          </h2>
        </div>

        {GROUP_ORDER.map((g, gi) => {
          const list = grouped[g];
          if (list.length === 0) return null;
          const meta = GROUP_META[g];
          const landscapes = list.filter(isLandscape);
          const portraits = list.filter((s) => !isLandscape(s));
          return (
            <div key={g} className={gi === 0 ? "" : "mt-16"}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
                  {meta.index} — {meta.label}
                </span>
                <span className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
                <span className="text-xs text-[color:var(--color-muted)]">
                  {meta.ko}
                </span>
              </div>

              {landscapes.length > 0 && (
                <div className="space-y-2 mb-2">
                  {landscapes.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setOpenIndex(indexOf(src))}
                      className="block w-full overflow-hidden rounded-md bg-[color:var(--color-border-soft)] active:opacity-80 transition-opacity"
                      aria-label={`사진 ${indexOf(src) + 1} 크게 보기`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="w-full h-auto block"
                        style={{ pointerEvents: "none" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {portraits.length > 0 && (
                <>
                  {/* mobile: 2 columns flex distribution */}
                  <div className="flex gap-2 sm:hidden">
                    {distribute(portraits, 2).map((col, ci) => (
                      <div key={ci} className="flex-1 min-w-0 space-y-2">
                        {col.map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setOpenIndex(indexOf(src))}
                            className="block w-full overflow-hidden rounded-md bg-[color:var(--color-border-soft)] active:opacity-80 transition-opacity"
                            aria-label={`사진 ${indexOf(src) + 1} 크게 보기`}
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              className="w-full h-auto block"
                              style={{ pointerEvents: "none" }}
                            />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* desktop+: 3 columns flex distribution */}
                  <div className="hidden sm:flex gap-2">
                    {distribute(portraits, 3).map((col, ci) => (
                      <div key={ci} className="flex-1 min-w-0 space-y-2">
                        {col.map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setOpenIndex(indexOf(src))}
                            className="block w-full overflow-hidden rounded-md bg-[color:var(--color-border-soft)] active:opacity-80 transition-opacity"
                            aria-label={`사진 ${indexOf(src) + 1} 크게 보기`}
                          >
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              className="w-full h-auto block"
                              style={{ pointerEvents: "none" }}
                            />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </section>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpenIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx > 50) prev();
            else if (dx < -50) next();
            touchStartX.current = null;
          }}
        >
          <img
            src={photos[openIndex]}
            alt=""
            className="max-w-[92vw] max-h-[85vh] object-contain select-none"
            style={{ pointerEvents: "none" }}
          />
          <button
            type="button"
            aria-label="닫기"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl leading-none"
          >
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="이전 사진"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="다음 사진"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl"
              >
                ›
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-[0.2em]">
                {openIndex + 1} / {photos.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
