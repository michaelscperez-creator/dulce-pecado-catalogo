"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function SnowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4M20 14l-4 1 1 4M4 14l4 1-1 4M20 10l-4-1 1-4" /></svg>;
}

export default function ChristmasAtmosphere() {
  const [snowing, setSnowing] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = .24;
    const onVisibility = () => {
      if (document.hidden) player?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      player?.pause();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggleMusic = async () => {
    const player = audio.current;
    if (!player || busy) return;
    setError("");
    if (!player.paused) {
      player.pause();
      return;
    }
    setBusy(true);
    try {
      await player.play();
    } catch {
      setError("No se pudo reproducir. Toca para reintentar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {snowing && <div className="holiday-snow" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className={`snow-particle ${i % 4 === 0 ? "is-crystal" : ""}`} style={{
            "--snow-x": `${(i * 37 + 11) % 100}%`,
            "--snow-size": `${i % 4 === 0 ? 8 + i % 4 : 2 + i % 2}px`,
            "--snow-duration": `${20 + i % 14}s`,
            "--snow-delay": `${-(i * 3.7) % 34}s`,
            "--snow-drift": `${(i % 2 ? -1 : 1) * (18 + i % 45)}px`,
            "--snow-opacity": .2 + (i % 4) * .09,
          } as CSSProperties}>{i % 4 === 0 ? <SnowIcon /> : null}</span>
        ))}
      </div>}
      <audio ref={audio} src="/audio/navidad-campanitas.wav" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError("No se pudo cargar la música. Toca para reintentar."); }} />
      <div className="holiday-controls" role="group" aria-label="Ambiente navideño">
        <button className="holiday-control snow-control" type="button" aria-pressed={snowing} aria-label={snowing ? "Pausar nieve" : "Activar nieve"} title={snowing ? "Pausar nieve" : "Activar nieve"} onClick={() => setSnowing(s => !s)}><SnowIcon /></button>
        <button className={`holiday-control music-control ${playing ? "is-playing" : ""}`} type="button" aria-pressed={playing} aria-label={playing ? "Pausar música navideña" : "Activar música navideña"} disabled={busy} onClick={toggleMusic}>
          <span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>{busy ? "Cargando…" : playing ? "Pausar música" : "Música navideña"}</span>
        </button>
        {error && <p className="holiday-audio-error" role="status">{error}</p>}
      </div>
    </>
  );
}
