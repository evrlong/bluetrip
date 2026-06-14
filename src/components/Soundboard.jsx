import { useState, useRef } from "react";
import { lyder } from "../data/lyder";
import "./Soundboard.css";

const kategorier = [
  { id: "fly-caller", label: "Fly Caller", ikon: "✈" },
  { id: "lounge-caller", label: "Lounge Caller", ikon: "🎙" },
];

export default function Soundboard() {
  const [aktivId, setAktivId] = useState(null);
  const [spiller, setSpiller] = useState(false);
  const audioRef = useRef(null);

  function spill(lyd) {
    if (aktivId === lyd.id) {
      if (spiller) {
        audioRef.current.pause();
        setSpiller(false);
      } else {
        audioRef.current.play().catch(() => {});
        setSpiller(true);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(lyd.fil);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => { setAktivId(null); setSpiller(false); };
    setAktivId(lyd.id);
    setSpiller(true);
  }

  return (
    <div className="sb-side">
      <div className="sb-header">
        <div className="sb-tittel">Soundboard</div>
        <div className="sb-undertittel">Blåtur 2026 · Eberg Lufthavn</div>
      </div>

      <div className="sb-grid">
        {kategorier.map((kat) => (
          <div key={kat.id} className="sb-kategori">
            <div className="sb-kat-header">
              <span className="sb-kat-ikon">{kat.ikon}</span>
              <span className="sb-kat-label">{kat.label}</span>
            </div>
            <div className="sb-knapper">
              {lyder
                .filter((l) => l.kategori === kat.id)
                .map((lyd) => (
                  <button
                    key={lyd.id}
                    className={`sb-knapp ${aktivId === lyd.id ? "sb-knapp--aktiv" : ""}`}
                    onClick={() => spill(lyd)}
                  >
                    <span className="sb-knapp-ikon">
                      {aktivId === lyd.id && spiller ? "⏸" : "▶"}
                    </span>
                    <span className="sb-knapp-navn">{lyd.navn}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
