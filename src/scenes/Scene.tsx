import type { ReactNode } from "react";

type Props = {
  caption?: string;
  title?: string;
  body?: string;
  children: ReactNode;
};

export function Scene({ caption, title, body, children }: Props) {
  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-24 max-w-xl mx-auto text-center">
      <div className="w-full max-w-sm aspect-square flex items-center justify-center">
        {children}
      </div>
      <div className="mt-10 space-y-3">
        {caption && (
          <p className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
            {caption}
          </p>
        )}
        {title && (
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--color-charcoal)]">
            {title}
          </h2>
        )}
        {body && (
          <p className="text-base leading-relaxed text-[color:var(--color-muted)] whitespace-pre-line">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
