import "./LogoUtskrift.css";

const STORRELSER = [
  { navn: "A3 stående",      bredde: "297mm", hoyde: "420mm" },
  { navn: "A3 liggende",     bredde: "420mm", hoyde: "297mm" },
  { navn: "A4",              bredde: "210mm", hoyde: "297mm" },
  { navn: "A4 liggende",     bredde: "297mm", hoyde: "210mm" },
  { navn: "A5",              bredde: "148mm", hoyde: "210mm" },
  { navn: "A6",              bredde: "105mm", hoyde: "148mm" },
  { navn: "Kvadrat 20×20cm", bredde: "200mm", hoyde: "200mm" },
  { navn: "Sticker 10×10cm", bredde: "100mm", hoyde: "100mm" },
];

const SKILTER = [
  {
    navn: "Gate A67-skilt",
    beskrivelse: "A4 liggende · gult gateskilt",
    url: "/gate-a67.html",
    forhandsvis: (
      <div className="lu-prev-gate">
        <div className="lu-prev-gate-fly">✈</div>
        <div className="lu-prev-gate-nr">A67</div>
      </div>
    ),
  },
  {
    navn: "Lounge-skilt",
    beskrivelse: "A4 stående · dørskilt",
    url: "/dor-lounge.html",
    forhandsvis: (
      <div className="lu-prev-lounge">
        <img src="/logos/selg-logo.png" alt="SELG" />
        <span>LOUNGE</span>
      </div>
    ),
  },
  {
    navn: "Toalett – Dame/Herre",
    beskrivelse: "A5 liggende · heng fra tak",
    url: "/toalett.html",
    forhandsvis: (
      <div className="lu-prev-toalett">
        <span>♀</span>
        <div className="lu-prev-toalett-linje" />
        <span>♂</span>
      </div>
    ),
  },
  {
    navn: "Toalett – Retningsskilt",
    beskrivelse: "A4 liggende · velg pil venstre/høyre",
    url: "/toalett-retning.html",
    forhandsvis: (
      <div className="lu-prev-toalett" style={{ justifyContent: "space-evenly" }}>
        <span style={{ fontSize: 22 }}>🚻</span>
        <span style={{ fontSize: 28, color: "#fff", fontWeight: 900 }}>→</span>
      </div>
    ),
  },
  {
    navn: "Reiser alene – Andreas Neira",
    beskrivelse: "A4 stående · halshengende skilt",
    url: "/skilt-reiser-alene-andreas.html",
    forhandsvis: (
      <div className="lu-prev-alene">
        <span>⚠</span>
        <span>REISER<br />ALENE</span>
      </div>
    ),
  },
];

function skrivUtLogo(s) {
  const gammel = document.getElementById("__print_style__");
  if (gammel) gammel.remove();
  const style = document.createElement("style");
  style.id = "__print_style__";
  style.textContent = `
    @page { size: ${s.bredde} ${s.hoyde}; margin: 0; }
    @media print {
      body > * { display: none !important; }
      #logo-print-ark {
        display: flex !important;
        position: fixed;
        inset: 0;
        width: ${s.bredde};
        height: ${s.hoyde};
        background: #077e87 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        align-items: center;
        justify-content: center;
      }
      #logo-print-ark img { width: 80%; height: 80%; object-fit: contain; }
    }
  `;
  document.head.appendChild(style);
  window.print();
}

export default function LogoUtskrift() {
  return (
    <div className="lu-side">

      {/* ── LOGO-SEKSJON ── */}
      <h1 className="lu-tittel">Logo-utskrift</h1>
      <p className="lu-beskrivelse">
        Velg størrelse og trykk <strong>Skriv ut</strong> — logoen skrives ut på teal-bakgrunn (#077e87).
      </p>

      <div className="lu-grid">
        {STORRELSER.map((s) => {
          const ratio = parseFloat(s.hoyde) / parseFloat(s.bredde);
          const kortW = 140;
          const kortH = Math.round(kortW * ratio);
          return (
            <div key={s.navn} className="lu-kort">
              <div className="lu-forhandsvis" style={{ width: kortW, height: kortH, background: "#077e87" }}>
                <img src="/logos/selg-logo.png" alt="SELG Airlines" />
              </div>
              <div className="lu-info">
                <span className="lu-navn">{s.navn}</span>
                <span className="lu-maal">{s.bredde} × {s.hoyde}</span>
              </div>
              <button className="lu-knapp" onClick={() => skrivUtLogo(s)}>
                Skriv ut
              </button>
            </div>
          );
        })}
      </div>

      <div id="logo-print-ark" style={{ display: "none" }}>
        <img src="/logos/selg-logo.png" alt="SELG Airlines" />
      </div>

      {/* ── SKILTER-SEKSJON ── */}
      <div className="lu-seksjon-divider" />
      <h2 className="lu-tittel lu-tittel--liten">Skilter</h2>
      <p className="lu-beskrivelse">Åpne skiltet i ny fane og bruk nettleserens utskriftsdialog.</p>

      <div className="lu-grid lu-grid--skilter">
        {SKILTER.map((s) => (
          <div key={s.navn} className="lu-kort lu-kort--skilt">
            <div className="lu-forhandsvis lu-forhandsvis--skilt">
              {s.forhandsvis}
            </div>
            <div className="lu-info">
              <span className="lu-navn">{s.navn}</span>
              <span className="lu-maal">{s.beskrivelse}</span>
            </div>
            <a
              className="lu-knapp"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Åpne / Skriv ut
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
