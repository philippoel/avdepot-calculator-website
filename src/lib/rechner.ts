/**
 * Altersvorsorgedepot-Rechner (ausführlich). Zulagen und Steuerlogik wie auf justavd.de:
 * - Grundzulage: 50 % auf die ersten 360 € Eigenbeitrag, 25 % auf bis zu 1.440 € mehr, höchstens 540 € im Jahr
 * - Kinderzulage: 1 € je eingezahltem Euro, höchstens 300 € je Kind und Jahr
 * - Startbonus: 200 € einmalig bei Vertragsbeginn vor dem 25. Geburtstag
 * - Steuererstattung (Günstigerprüfung): Eigenbeitrag bis 1.800 € plus Zulagen als Sonderausgaben,
 *   erstattet wird die Ersparnis über die Zulagen hinaus. Geht aufs Konto, nicht ins Depot.
 * - Rendite nach Kosten = Rendite vor Kosten − Effektivkosten (vereinfacht), Einzahlung zu Jahresbeginn
 * - Auszahlung: Auszahlungsplan bis zum 85. Geburtstag (gesetzliches Minimum), 3 % Rendite in der Auszahlphase
 * Nicht enthalten: Steuern auf die Auszahlung im Alter, schwankende Renditen.
 */

export const REGELN = { stufe1: 360, foerdergrenze: 1800, grundzulageMax: 540, kinderzulage: 300, startbonus: 200, auszahlBis: 85, renditeAuszahlung: 3 } as const;

export type Eingaben = {
  alter: number;
  rentenalter: number;
  sparrateMonat: number;
  kinder: number;
  startkapital: number;
  renditeVorKosten: number;
  kosten: number;
  inflation: number;
  grenzsteuersatz: number;
};

export type Jahr = { jahr: number; alter: number; eigen: number; zulagen: number; startkapital: number; ertraege: number; wert: number };

export type Szenario = { name: string; rendite: number; wert: number; wertHeute: number; monatlich: number };

export type Ergebnis = {
  jahre: number;
  verlauf: Jahr[];
  wert: number;
  eigen: number;
  zulagen: number;
  ertraege: number;
  zulageJahr: number;
  erstattungJahr: number;
  erstattungGesamt: number;
  kostenWirkung: number;
  kaufkraft: number;
  monatlich: number;
  einmal30: number;
  monatlichNach30: number;
  auszahlJahre: number;
  szenarien: Szenario[];
};

export function zulagenJahr(eigen: number, kinder: number) {
  const e = Math.max(0, eigen);
  const g = Math.min(Math.min(e, REGELN.stufe1) * 0.5 + Math.min(Math.max(e - REGELN.stufe1, 0), REGELN.foerdergrenze - REGELN.stufe1) * 0.25, REGELN.grundzulageMax);
  return g + Math.max(0, kinder) * Math.min(e, REGELN.kinderzulage);
}

function ansparen(e: Eingaben, renditeNachKosten: number, startjahr: number) {
  const jahre = Math.max(0, Math.round(e.rentenalter - e.alter));
  const beitrag = Math.max(0, e.sparrateMonat) * 12;
  const zulage = zulagenJahr(beitrag, e.kinder);
  const r = renditeNachKosten / 100;
  const start = Math.max(0, e.startkapital);
  let wert = start;
  let eigen = 0;
  let zulagen = 0;
  const verlauf: Jahr[] = [];
  for (let j = 0; j < jahre; j++) {
    const z = zulage + (j === 0 && e.alter < 25 ? REGELN.startbonus : 0);
    eigen += beitrag;
    zulagen += z;
    wert = (wert + beitrag + z) * (1 + r);
    verlauf.push({ jahr: startjahr + j + 1, alter: e.alter + j + 1, eigen, zulagen, startkapital: start, ertraege: Math.max(0, wert - eigen - zulagen - start), wert });
  }
  return { jahre, verlauf, wert, eigen, zulagen, zulage };
}

/** Monatliche Rate eines Auszahlungsplans (Annuität) */
export function rate(kapital: number, jahre: number, renditeProzent = REGELN.renditeAuszahlung) {
  const n = Math.max(1, jahre) * 12;
  const i = renditeProzent / 100 / 12;
  return i === 0 ? kapital / n : (kapital * i) / (1 - Math.pow(1 + i, -n));
}

export function rechne(e: Eingaben, startjahr = 2027): Ergebnis {
  const basis = ansparen(e, e.renditeVorKosten - e.kosten, startjahr);
  const ohneKosten = ansparen(e, e.renditeVorKosten, startjahr);
  const kaufkraft = 1 / Math.pow(1 + Math.max(0, e.inflation) / 100, basis.jahre);
  const auszahlJahre = Math.max(1, REGELN.auszahlBis - e.rentenalter);

  const beitrag = Math.max(0, e.sparrateMonat) * 12;
  const ersparnis = ((Math.min(beitrag, REGELN.foerdergrenze) + basis.zulage) * Math.max(0, e.grenzsteuersatz)) / 100;
  const erstattungJahr = Math.max(0, ersparnis - basis.zulage);

  const szenarien = [
    ["Vorsichtig", -2],
    ["Mittel", 0],
    ["Gut", 2],
  ].map(([name, abstand]) => {
    const rendite = Math.max(0, e.renditeVorKosten + (abstand as number));
    const w = ansparen(e, rendite - e.kosten, startjahr).wert;
    return { name: name as string, rendite, wert: w, wertHeute: w * kaufkraft, monatlich: rate(w, auszahlJahre) };
  });

  return {
    jahre: basis.jahre,
    verlauf: basis.verlauf,
    wert: basis.wert,
    eigen: basis.eigen,
    zulagen: basis.zulagen,
    ertraege: Math.max(0, basis.wert - basis.eigen - basis.zulagen - Math.max(0, e.startkapital)),
    zulageJahr: basis.zulage,
    erstattungJahr,
    erstattungGesamt: erstattungJahr * basis.jahre,
    kostenWirkung: Math.max(0, ohneKosten.wert - basis.wert),
    kaufkraft,
    monatlich: rate(basis.wert, auszahlJahre),
    einmal30: basis.wert * 0.3,
    monatlichNach30: rate(basis.wert * 0.7, auszahlJahre),
    auszahlJahre,
    szenarien,
  };
}

export const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const kurz = (n: number) => (n >= 1e6 ? (n / 1e6).toLocaleString("de-DE", { maximumFractionDigits: 1 }) + " Mio. €" : n >= 1000 ? Math.round(n / 1000).toLocaleString("de-DE") + " Tsd. €" : euro.format(n));
