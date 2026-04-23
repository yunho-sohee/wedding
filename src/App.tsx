import { SceneNhaTrangMeeting } from "./scenes/SceneNhaTrangMeeting";
import { SceneMap } from "./scenes/SceneMap";
import { SceneTrainJourney } from "./scenes/SceneTrainJourney";
import { SceneProposal } from "./scenes/SceneProposal";
import { SceneFinale } from "./scenes/SceneFinale";
import { PhotoGallery } from "./components/PhotoGallery";
import { AccountInfo } from "./components/AccountInfo";

function App() {
  return (
    <main className="bg-[color:var(--color-cream)] text-[color:var(--color-charcoal)]">
      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-6">
          Our story
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          두 사람의
          <br />
          이야기
        </h1>
        <p className="mt-8 text-sm text-[color:var(--color-muted)]">
          이야기를 따라 아래로 내려가 주세요.
        </p>
        <div className="mt-10 w-px h-20 bg-[color:var(--color-charcoal)]/40" />
      </section>

      <SceneNhaTrangMeeting />
      <SceneMap />
      <SceneTrainJourney />
      <SceneProposal />
      <SceneFinale />

      <PhotoGallery />

      {/* Date block */}
      <section className="min-h-[50svh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-5">
          Our day
        </p>
        <h2 className="text-2xl font-medium tracking-tight tabular-nums">
          2026. 05. 16.
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-muted)] whitespace-pre-line">
          {"이 날 양가 가족과 함께\n조용히 약속을 나눕니다."}
        </p>
      </section>

      <AccountInfo />

      <footer className="py-16 px-6 text-center">
        <p className="text-base tracking-[0.15em] text-[color:var(--color-charcoal)]">
          주윤호 <span className="mx-2 text-[color:var(--color-muted)]">·</span>{" "}
          성소희
        </p>
        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)]">
          드림
        </p>
      </footer>
    </main>
  );
}

export default App;
