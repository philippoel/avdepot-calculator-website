"use client";

import { useState } from "react";
import Diagramm from "@/components/Diagramm";
import { euro, rechne, type Eingaben } from "@/lib/rechner";

type Feld = { key: keyof Eingaben; label: string; min: number; max: number; step: number; format: (n: number) => string; hinweis?: string };

const pz = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";

const SITUATION: Feld[] = [
  { key: "alter", label: "Alter bei Start", min: 18, max: 64, step: 1, format: (n) => `${n} J.` },
  { key: "rentenalter", label: "Auszahlung ab", min: 65, max: 70, step: 1, format: (n) => `${n} J.` },
  { key: "sparrateMonat", label: "Eigenbeitrag / Monat", min: 10, max: 150, step: 5, format: (n) => euro.format(n) },
  { key: "kinder", label: "Kinder mit Kindergeld", min: 0, max: 4, step: 1, format: (n) => String(n) },
  { key: "startkapital", label: "Übertrag (z. B. Riester)", min: 0, max: 50000, step: 500, format: (n) => euro.format(n) },
  { key: "grenzsteuersatz", label: "Grenzsteuersatz", min: 0, max: 45, step: 1, format: (n) => `${n} %`, hinweis: "für die Steuererstattung, 0 = ignorieren" },
];

const ANNAHMEN: Feld[] = [
  { key: "renditeVorKosten", label: "Rendite vor Kosten", min: 1, max: 9, step: 0.5, format: pz },
  { key: "kosten", label: "Effektivkosten", min: 0.2, max: 2.5, step: 0.1, format: pz },
  { key: "inflation", label: "Inflation", min: 0, max: 4, step: 0.5, format: pz },
];

const START: Eingaben = { alter: 30, rentenalter: 67, sparrateMonat: 150, kinder: 0, startkapital: 0, renditeVorKosten: 6, kosten: 1, inflation: 2, grenzsteuersatz: 30 };

function Regler({ f, wert, setze }: { f: Feld; wert: number; setze: (n: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2 text-sm">
        <span>
          {f.label}
          {f.hinweis && <span className="block text-xs text-leise">{f.hinweis}</span>}
        </span>
        <span className="zahl shrink-0 whitespace-nowrap rounded bg-panel-hell px-2 py-0.5 text-tinte">{f.format(wert)}</span>
      </span>
      <input type="range" min={f.min} max={f.max} step={f.step} value={wert} onChange={(e) => setze(Number(e.target.value))} className="mt-2 w-full" />
    </label>
  );
}

function Kachel({ titel, wert, unter, hervor }: { titel: string; wert: string; unter: string; hervor?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${hervor ? "border-akzent/50 bg-[#0f2a2c]" : "border-linie bg-panel"}`}>
      <p className="text-xs text-leise">{titel}</p>
      <p className={`zahl mt-1 text-2xl font-semibold ${hervor ? "text-akzent" : "text-tinte"}`}>{wert}</p>
      <p className="mt-1 text-xs text-leise">{unter}</p>
    </div>
  );
}

export default function Rechner() {
  const [e, setE] = useState<Eingaben>(START);
  const setze = (key: keyof Eingaben) => (n: number) => setE((alt) => ({ ...alt, [key]: n }));
  const r = rechne(e);

  function csv() {
    const kopf = "Jahr;Alter;Einzahlungen;Zulagen;Übertrag;Erträge;Depotwert";
    const zeilen = r.verlauf.map((j) => [j.jahr, j.alter, j.eigen, j.zulagen, j.startkapital, j.ertraege, j.wert].map((v) => Math.round(v)).join(";"));
    const blob = new Blob(["﻿" + [kopf, ...zeilen].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "altersvorsorgedepot-verlauf.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <aside className="space-y-5 rounded-xl border border-linie bg-panel p-5 lg:sticky lg:top-20 lg:self-start">
        <h2 className="text-sm font-semibold tracking-wide text-leise">Ihre Situation</h2>
        {SITUATION.map((f) => (
          <Regler key={f.key} f={f} wert={e[f.key]} setze={setze(f.key)} />
        ))}
        <h2 className="border-t border-linie pt-5 text-sm font-semibold tracking-wide text-leise">Annahmen</h2>
        {ANNAHMEN.map((f) => (
          <Regler key={f.key} f={f} wert={e[f.key]} setze={setze(f.key)} />
        ))}
        <button type="button" onClick={() => setE(START)} className="text-sm text-akzent underline-offset-4 hover:underline">
          Zurücksetzen
        </button>
      </aside>

      <div className="min-w-0 space-y-6" aria-live="polite">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Kachel hervor titel={`Depotwert mit ${e.rentenalter}`} wert={euro.format(r.wert)} unter={`in heutiger Kaufkraft ${euro.format(r.wert * r.kaufkraft)}`} />
          <Kachel titel={`Auszahlung / Monat bis 85`} wert={euro.format(r.monatlich)} unter={`${r.auszahlJahre} Jahre Auszahlungsplan`} />
          <Kachel titel="Zulagen gesamt" wert={euro.format(r.zulagen)} unter={`${euro.format(r.zulageJahr)} pro Jahr`} />
          <Kachel titel="Steuererstattung gesamt" wert={euro.format(r.erstattungGesamt)} unter={`${euro.format(r.erstattungJahr)} pro Jahr, aufs Konto`} />
        </div>

        <section className="rounded-xl border border-linie bg-panel p-5">
          <h2 className="text-lg font-semibold">Verlauf in {r.jahre} Jahren</h2>
          <div className="mt-4">
            <Diagramm verlauf={r.verlauf} />
          </div>
        </section>

        <section className="rounded-xl border border-linie bg-panel p-5">
          <h2 className="text-lg font-semibold">Drei Szenarien</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-sm">
              <thead className="text-xs text-leise">
                <tr className="border-b border-linie">
                  <th scope="col" className="py-2 text-left font-sans font-normal">Szenario</th>
                  <th scope="col" className="py-2 text-right font-sans font-normal">Rendite vor Kosten</th>
                  <th scope="col" className="py-2 text-right font-sans font-normal">Depotwert</th>
                  <th scope="col" className="py-2 text-right font-sans font-normal">Kaufkraft heute</th>
                  <th scope="col" className="py-2 text-right font-sans font-normal">pro Monat</th>
                </tr>
              </thead>
              <tbody>
                {r.szenarien.map((s) => (
                  <tr key={s.name} className={`border-b border-linie last:border-0 ${s.name === "Mittel" ? "text-tinte" : ""}`}>
                    <th scope="row" className="py-2 text-left font-sans font-medium">{s.name}</th>
                    <td className="py-2 text-right">{pz(s.rendite)}</td>
                    <td className="py-2 text-right">{euro.format(s.wert)}</td>
                    <td className="py-2 text-right">{euro.format(s.wertHeute)}</td>
                    <td className="py-2 text-right">{euro.format(s.monatlich)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          <Kachel titel="Davon Ihre Einzahlungen" wert={euro.format(r.eigen + e.startkapital)} unter={e.startkapital > 0 ? `inkl. ${euro.format(e.startkapital)} Übertrag` : `${euro.format(e.sparrateMonat * 12)} pro Jahr`} />
          <Kachel titel="Wirkung der Kosten" wert={euro.format(r.kostenWirkung)} unter={`weniger Depotwert durch ${pz(e.kosten)} Kosten`} />
          <Kachel titel="Variante 30 % auf einmal" wert={euro.format(r.einmal30)} unter={`danach ${euro.format(r.monatlichNach30)} / Monat bis 85`} />
        </section>

        <details className="rounded-xl border border-linie bg-panel p-5">
          <summary className="cursor-pointer font-semibold text-tinte">Jahr für Jahr als Tabelle</summary>
          <div className="mt-4 max-h-96 overflow-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="sticky top-0 bg-panel text-xs text-leise">
                <tr className="border-b border-linie">
                  {["Jahr", "Alter", "Einzahlungen", "Zulagen", "Erträge", "Depotwert"].map((t, i) => (
                    <th key={t} scope="col" className={`py-2 font-sans font-normal ${i < 2 ? "text-left" : "text-right"}`}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.verlauf.map((j) => (
                  <tr key={j.jahr} className="border-b border-linie/60">
                    <td className="py-1.5">{j.jahr}</td>
                    <td className="py-1.5">{j.alter}</td>
                    <td className="py-1.5 text-right">{euro.format(j.eigen + j.startkapital)}</td>
                    <td className="py-1.5 text-right">{euro.format(j.zulagen)}</td>
                    <td className="py-1.5 text-right">{euro.format(j.ertraege)}</td>
                    <td className="py-1.5 text-right text-tinte">{euro.format(j.wert)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={csv} className="mt-4 rounded-lg bg-akzent px-4 py-2 text-sm font-semibold text-grund hover:bg-akzent-dunkel">
            Als CSV herunterladen
          </button>
        </details>

        <p className="text-xs text-leise">
          Beispielrechnung ohne Gewähr. Gleichbleibende Rendite, Einzahlung zu Jahresbeginn, Start 2027. Rendite nach Kosten = Rendite vor
          Kosten minus Effektivkosten. Auszahlung als Auszahlungsplan bis 85 mit 3 % Rendite, vor Steuern: Die Auszahlungen werden im Alter
          versteuert. Steuererstattung grob über die Günstigerprüfung geschätzt. Echte Renditen schwanken, Verluste sind möglich.
        </p>
      </div>
    </div>
  );
}
