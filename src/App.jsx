import { useState } from "react";
import { passasjerer } from "./data/passasjerer";
import { flightruter } from "./data/overviewdata";
import Billett from "./components/Billett";
import FlightOverview from "./components/FlightOverview";
import PassasjerListe from "./components/PassasjerListe";
import Soundboard from "./components/Soundboard";
import "./App.css";

export default function App() {
  const [side, setSide] = useState("billetter");

  return (
    <>
      <nav className="nav-bar no-print">
        <button
          className={`nav-knapp ${side === "billetter" ? "nav-knapp--aktiv" : ""}`}
          onClick={() => setSide("billetter")}
        >
          Boardingkort
        </button>
        <button
          className={`nav-knapp ${side === "oversikt" ? "nav-knapp--aktiv" : ""}`}
          onClick={() => setSide("oversikt")}
        >
          Flyruter
        </button>
        <button
          className={`nav-knapp ${side === "passasjerer" ? "nav-knapp--aktiv" : ""}`}
          onClick={() => setSide("passasjerer")}
        >
          Passasjerlister
        </button>
        <button
          className={`nav-knapp ${side === "soundboard" ? "nav-knapp--aktiv" : ""}`}
          onClick={() => setSide("soundboard")}
        >
          Soundboard
        </button>
        <a
          className="nav-knapp"
          href="/skilt-reiser-alene-andreas.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reiser alene-skilt
        </a>
        <a
          className="nav-knapp"
          href="/gate-a67.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gate A67-skilt
        </a>
      </nav>

      {side === "billetter" && (
        <>
          <button className="print-knapp no-print" onClick={() => window.print()}>
            Skriv ut billetter
          </button>
          <div className="app">
            {passasjerer.map((p, i) => {
              const rute = flightruter.find((r) => r.destinasjon === p.destinasjon);
              return <Billett key={i} {...p} gate={rute?.gate} />;
            })}
          </div>
        </>
      )}

      {side === "oversikt" && <FlightOverview />}
      {side === "passasjerer" && <PassasjerListe />}
      {side === "soundboard" && <Soundboard />}
    </>
  );
}
