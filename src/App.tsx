import { useRef, useState } from "react";
import { SceneNhaTrangMeeting } from "./scenes/SceneNhaTrangMeeting";
import { SceneMap } from "./scenes/SceneMap";
import { SceneTrainJourney } from "./scenes/SceneTrainJourney";
import { SceneProposal } from "./scenes/SceneProposal";
import { SceneFinale } from "./scenes/SceneFinale";
import { PhotoGallery } from "./components/PhotoGallery";
import { AccountInfo } from "./components/AccountInfo";
import {
  BackgroundMusic,
  type BackgroundMusicHandle,
} from "./components/BackgroundMusic";
import { ScrollHint } from "./components/ScrollHint";

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle | null>(null);

  return (
    <main className="bg-[color:var(--color-cream)] text-[color:var(--color-charcoal)]">
      <BackgroundMusic
        ref={musicRef}
        isPlaying={isMusicPlaying}
        onPlayingChange={setIsMusicPlaying}
      />
      <ScrollHint isMusicPlaying={isMusicPlaying} />

      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--color-muted)] mb-6">
          Our beginning
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          우리의 시작을
          <br />
          전합니다
        </h1>
        <p className="mt-8 text-sm text-[color:var(--color-muted)]">
          천천히 내려 저희의 이야기를 함께해 주세요.
        </p>
        <button
          type="button"
          onClick={() => musicRef.current?.togglePlayback()}
          className="mt-8 rounded-full border border-[color:rgb(28_28_28_/_0.22)] bg-[color:var(--color-offwhite)] px-6 py-3 text-xs tracking-[0.22em] text-[color:var(--color-charcoal)] shadow-[0_14px_34px_rgb(28_28_28_/_0.08)] transition active:scale-95"
        >
          {isMusicPlaying ? "음악 끄기" : "음악과 함께 보기"}
        </button>
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
          Our promise
        </p>
        <h2 className="text-2xl font-medium tracking-tight tabular-nums">
          2026. 05. 16.
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-muted)] whitespace-pre-line">
          {"이날 양가 가족과 함께\n조용히 혼인의 약속을 나누려 합니다."}
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
