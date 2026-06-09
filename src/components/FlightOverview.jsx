import { useState, useEffect } from "react";
import { flightruter } from "../data/overviewdata";
import "./FlightOverview.css";

const statusConfig = {
  "On Time":     { farge: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  "Go to Gate":  { farge: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  "Boarding":    { farge: "#f0a500", bg: "rgba(240,165,0,0.15)" },
  "Gate Closed": { farge: "#ff6b35", bg: "rgba(255,107,53,0.15)" },
  "Departed":    { farge: "#6b7280", bg: "rgba(107,114,128,0.12)" },
  "Delayed":     { farge: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  "Cancelled":   { farge: "#991b1b", bg: "rgba(153,27,27,0.15)" },
};

function tilMinutter(tidStr) {
  const [h, m] = tidStr.split(":").map(Number);
  return h * 60 + m;
}

function beregnStatus(rute, nowMin) {
  if (rute.statusOverride) return rute.statusOverride;

  const avgangMin = tilMinutter(rute.avgang);
  const gateMin = tilMinutter(rute.gaaTilGate);

  if (nowMin >= avgangMin + 15) return "Departed";
  if (nowMin >= avgangMin) return "Gate Closed";
  if (nowMin >= avgangMin - 15) return "Boarding";
  if (nowMin >= gateMin) return "Go to Gate";
  return "On Time";
}

function FlyselskapBadge({ rute }) {
  if (rute.harLogo) {
    return (
      <div className="fo-logo-wrapper">
        <img src={rute.logo} alt={rute.flyselskap} className="fo-airline-logo" />
      </div>
    );
  }
  return (
    <div
      className="fo-airline-badge"
      style={{ background: rute.flyselskapFarger.bg, color: rute.flyselskapFarger.tekst }}
    >
      {rute.flyselskap}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { farge: "#aaa", bg: "rgba(170,170,170,0.1)" };
  const blink = status === "Boarding" || status === "Go to Gate";
  return (
    <span
      className="fo-status"
      style={{ color: cfg.farge, background: cfg.bg, borderColor: cfg.farge }}
    >
      {blink && <span className="fo-blink">● </span>}
      {status}
    </span>
  );
}

export default function FlightOverview() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const nowMin = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="fo-side">
      <div className="fo-header">
        <div className="fo-header-venstre">
          <div className="fo-flyplass">EBERG AIRPORT</div>
          <div className="fo-avganger-tittel">DEPARTURES</div>
        </div>
        <div className="fo-header-hoyre">
          <div className="fo-klokke">{time}</div>
          <div className="fo-dato">{date}</div>
        </div>
      </div>

      <div className="fo-tabell-wrapper">
        <table className="fo-tabell">
          <thead>
            <tr>
              <th>Departure</th>
              <th>Destination</th>
              <th>Flight</th>
              <th>Airline</th>
              <th>Gate</th>
              <th>Go to Gate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flightruter.map((rute) => {
              const status = beregnStatus(rute, nowMin);
              return (
                <tr
                  key={rute.id}
                  className={[
                    "fo-rad",
                    status === "Departed"    ? "fo-rad--avgatt" : "",
                    status === "Cancelled"   ? "fo-rad--kansellert" : "",
                    status === "Boarding"    ? "fo-rad--boarding" : "",
                    status === "Go to Gate"  ? "fo-rad--gaa-til-gate" : "",
                  ].join(" ").trim()}
                >
                  <td className="fo-tid">{rute.avgang}</td>
                  <td className="fo-destinasjon">
                    <span className="fo-by">{rute.destinasjon}</span>
                    <span className="fo-kode">{rute.by}</span>
                  </td>
                  <td className="fo-flytnr">{rute.flytnummer}</td>
                  <td className="fo-flyselskap-celle">
                    <FlyselskapBadge rute={rute} />
                  </td>
                  <td className="fo-gate">{rute.gate}</td>
                  <td className="fo-gaa-til-gate">{rute.gaaTilGate}</td>
                  <td>
                    <StatusBadge status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="fo-footer">
        <span>Updates automatically every 30 seconds</span>
      </div>
    </div>
  );
}
