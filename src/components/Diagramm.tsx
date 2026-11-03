"use client";

import { useEffect, useRef, useState } from "react";
import { euro, kurz, type Jahr } from "@/lib/rechner";

// Gestapelte Säulen je Jahr: Einzahlungen (inkl. Übertrag), Zulagen, Erträge. Farben in globals.css geprüft.
const REIHEN = [
  { key: "einzahlung", name: "Einzahlungen", farbe: "var(--color-reihe-eigen)" },
  { key: "zulagen", name: "Zulagen", farbe: "var(--color-reihe-zulagen)" },
  { key: "ertraege", name: "Erträge", farbe: "var(--color-reihe-ertrag)" },
] as const;

const RAND = { l: 76, r: 8, o: 12, u: 28 };

function schoen(max: number) {
  const roh = max / 4;
  const p = Math.pow(10, Math.floor(Math.log10(roh || 1)));
  const schritt = [1, 2, 2.5, 5, 10].map((f) => f * p).find((s) => s >= roh) ?? roh;
  return { schritt, top: schritt * 4 };
}

export default function Diagramm({ verlauf }: { verlauf: Jahr[] }) {
  const [aktiv, setAktiv] = useState<number | null>(null);
  // Das Diagramm rechnet mit der echten Breite, damit die Beschriftung auf dem Handy nicht mitschrumpft
  const rahmen = useRef<HTMLElement>(null);
  const [B, setB] = useState(800);
  useEffect(() => {
    const el = rahmen.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setB(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  if (verlauf.length === 0) return null;
  const H = B < 500 ? 240 : 300;

  const daten = verlauf.map((j) => ({ ...j, einzahlung: j.eigen + j.startkapital }));
  const { schritt, top } = schoen(Math.max(...daten.map((d) => d.wert)));
  const innenB = B - RAND.l - RAND.r;
  const innenH = H - RAND.o - RAND.u;
  const slot = innenB / daten.length;
  const breite = Math.max(2, Math.min(18, slot - 2));
  const y = (v: number) => RAND.o + innenH - (v / top) * innenH;
  const jeder = Math.ceil(daten.length / (B < 500 ? 5 : 8));
  const d = aktiv !== null ? daten[aktiv] : null;

  return (
    <figure ref={rahmen} className="relative">
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {REIHEN.map((r) => (
          <li key={r.key} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: r.farbe }} />
            {r.name}
          </li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${B} ${H}`} className="w-full" role="img" aria-label="Depotwert Jahr für Jahr, aufgeteilt in Einzahlungen, Zulagen und Erträge. Werte in der Tabelle darunter." onMouseLeave={() => setAktiv(null)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1={RAND.l} x2={B - RAND.r} y1={y(i * schritt)} y2={y(i * schritt)} stroke="#2a3a50" strokeWidth={1} />
            <text x={RAND.l - 8} y={y(i * schritt) + 4} textAnchor="end" fontSize={11} fill="#94a3b8" fontFamily="var(--font-mono)">
              {kurz(i * schritt)}
            </text>
          </g>
        ))}
        {daten.map((p, i) => {
          const x = RAND.l + i * slot + (slot - breite) / 2;
          let basis = 0;
          return (
            <g key={p.jahr} opacity={aktiv === null || aktiv === i ? 1 : 0.45}>
              {REIHEN.map((r, ri) => {
                const wert = p[r.key];
                const y0 = y(basis);
                const y1 = y(basis + wert);
                basis += wert;
                const hoehe = Math.max(0, y0 - y1 - (ri > 0 ? 2 : 0));
                if (hoehe <= 0) return null;
                return <rect key={r.key} x={x} y={y1} width={breite} height={hoehe} rx={ri === REIHEN.length - 1 ? Math.min(3, breite / 3) : 0} fill={r.farbe} />;
              })}
              {i % jeder === 0 && (
                <text x={x + breite / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="#94a3b8" fontFamily="var(--font-mono)">
                  {p.alter}
                </text>
              )}
              <rect x={RAND.l + i * slot} y={RAND.o} width={slot} height={innenH} fill="transparent" onMouseEnter={() => setAktiv(i)} />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 text-xs text-leise">Alter am Jahresende</figcaption>

      {d && aktiv !== null && (
        <div
          className="pointer-events-none absolute top-8 z-10 w-56 rounded-lg border border-linie bg-panel-hell p-3 text-sm shadow-xl"
          style={{ left: `clamp(0px, calc(${((RAND.l + (aktiv + 0.5) * slot) / B) * 100}% - 7rem), calc(100% - 14rem))` }}
        >
          <p className="font-medium text-tinte">
            {d.jahr}, mit {d.alter}
          </p>
          <dl className="zahl mt-2 space-y-1 text-xs">
            {REIHEN.map((r) => (
              <div key={r.key} className="flex justify-between gap-3">
                <dt className="flex items-center gap-1.5 font-sans">
                  <span className="h-2 w-2 rounded-sm" style={{ background: r.farbe }} />
                  {r.name}
                </dt>
                <dd>{euro.format(d[r.key])}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-3 border-t border-linie pt-1 text-tinte">
              <dt className="font-sans">Depotwert</dt>
              <dd>{euro.format(d.wert)}</dd>
            </div>
          </dl>
        </div>
      )}
    </figure>
  );
}
