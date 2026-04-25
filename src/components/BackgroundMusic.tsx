import { forwardRef, useImperativeHandle, useRef } from "react";
import trackSrc from "../assets/music/desifreemusic-gentle-romantic-piano-instrumental-royalty-free-music-397373.mp3";

export type BackgroundMusicHandle = {
  togglePlayback: () => void;
};

type Props = {
  isPlaying: boolean;
  onPlayingChange: (isPlaying: boolean) => void;
};

export const BackgroundMusic = forwardRef<BackgroundMusicHandle, Props>(
function BackgroundMusic({ isPlaying, onPlayingChange }, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      onPlayingChange(false);
      return;
    }

    try {
      audio.volume = 0.45;
      await audio.play();
      onPlayingChange(true);
    } catch {
      onPlayingChange(false);
    }
  }

  useImperativeHandle(ref, () => ({ togglePlayback }));

  return (
    <audio
      ref={audioRef}
      src={trackSrc}
      loop
      preload="metadata"
      onPause={() => onPlayingChange(false)}
      onPlay={() => onPlayingChange(true)}
      onError={() => onPlayingChange(false)}
    />
  );
});
