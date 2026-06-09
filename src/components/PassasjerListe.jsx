import { passasjerer } from "../data/passasjerer";
import { flightruter } from "../data/overviewdata";
import "./PassasjerListe.css";

const flyRekkefølge = ["Tokyo Narita", "Frankfurt", "Mexico City", "Paris CDG"];

export default function PassasjerListe() {
  const grupper = flyRekkefølge.map((dest) => {
    const rute = flightruter.find((r) => r.destinasjon === dest);
    const liste = passasjerer.filter((p) => p.destinasjon === dest);
    return { dest, rute, liste };
  });

  return (
    <div className="pl-side">
      <div className="pl-header">
        <div className="pl-tittel">Passasjerlister – Blåtur 2026</div>
        <div className="pl-undertittel">15. juni 2026 · Avgang 17:30</div>
      </div>

      <div className="pl-grupper">
        {grupper.map(({ dest, rute, liste }) => (
          <div key={dest} className="pl-gruppe">
            <div className="pl-gruppe-header">
              <div className="pl-destinasjon">
                <span className="pl-by">{dest}</span>
                {rute && <span className="pl-kode">{rute.by}</span>}
              </div>
              {rute && (
                <div className="pl-flyinfo">
                  <span className="pl-flytnr">{rute.flytnummer}</span>
                  <span className="pl-gate">Gate {rute.gate}</span>
                  <span className="pl-antall">{liste.length} passasjerer</span>
                </div>
              )}
            </div>

            <table className="pl-tabell">
              <thead>
                <tr>
                  <th className="pl-th-nr">#</th>
                  <th>Navn</th>
                  <th>Merknad</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((p, i) => (
                  <tr key={i} className={p.reiserAlene ? "pl-rad--alene" : ""}>
                    <td className="pl-nr">{i + 1}</td>
                    <td className="pl-navn">
                      {p.fornavn} {p.etternavn}
                    </td>
                    <td className="pl-merknad">
                      {p.reiserAlene && <span className="pl-badge-alene">Reiser alene</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
