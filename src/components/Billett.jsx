import { useMemo } from "react";

export default function Billett({ fornavn, etternavn, dato, destinasjon, avreisested, avreiseTid, landingTid, logo, reiserAlene, gate }) {
  const strekkodeLinjer = useMemo(
    () => Array.from({ length: 40 }, () => Math.random() * 3 + 1),
    []
  );

  const formatDato = (datoStr) => {
    const d = new Date(datoStr);
    return d.toLocaleDateString("nb-NO", { day: "2-digit", month: "long", year: "numeric" });
  };

  return (
    <div className="billett">
      <div className="billett-topp">
        <div className="logo-wrapper">
          <img src={logo} alt="SELG logo" className="selg-logo" />
        </div>
        <div className="billett-type">BOARDINGKORT</div>
      </div>

      <div className="billett-innhold">
        <div className="passasjer-seksjon">
          <span className="etikett">Passasjer</span>
          <span className="verdi navn">{fornavn} {etternavn}</span>
          {reiserAlene && (
            <span className="reiser-alene-badge">⚠ Reiser alene</span>
          )}
        </div>

        <div className="rute-seksjon">
          <div className="sted">
            <span className="etikett">Fra</span>
            <span className="verdi">{avreisested}</span>
            <span className="tid">{avreiseTid}</span>
          </div>
          <div className="pil">✈</div>
          <div className="sted sted-hoyre">
            <span className="etikett">Til</span>
            <span className="verdi">{destinasjon}</span>
            <span className="tid">{landingTid}</span>
          </div>
        </div>

        <div className="detaljer-seksjon">
          <div className="detalj">
            <span className="etikett">Dato</span>
            <span className="verdi">{formatDato(dato)}</span>
          </div>
          <div className="detalj">
            <span className="etikett">Avgang</span>
            <span className="verdi">{avreiseTid}</span>
          </div>
          <div className="detalj">
            <span className="etikett">Ankomst</span>
            <span className="verdi">{landingTid}</span>
          </div>
          {gate && (
            <div className="detalj">
              <span className="etikett">Gate</span>
              <span className="verdi">{gate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="billett-bunn">
        <div className="strekkode">
          <div className="strekkode-linjer">
            {strekkodeLinjer.map((w, i) => (
              <div key={i} className="linje" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
