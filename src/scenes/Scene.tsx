import type { ReactNode } from "react";

type Dialogue = {
  speaker: "남" | "여" | "그남자" | "그여자";
  text: string;
};

type Props = {
  caption?: string;
  title?: string;
  body?: string;
  dialogues?: Dialogue[];
  children: ReactNode;
};

export function Scene({ caption, title, body, dialogues, children }: Props) {
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
      {dialogues && dialogues.length > 0 && (
        <div className="mt-10 w-full max-w-sm space-y-5 text-left">
          {dialogues.map((d, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted)]">
                  {d.speaker}
                </span>
                <span className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--color-charcoal)]">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
