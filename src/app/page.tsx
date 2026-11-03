import Rechner from "@/components/Rechner";
import { JUSTAVD, STAND } from "@/lib/seite";

const RECHENWEG = [
  ["Zulagen", "Grundzulage 50 % auf die ersten 360 € Eigenbeitrag und 25 % auf bis zu 1.440 € mehr, höchstens 540 € im Jahr. Je Kind 1 € pro eingezahltem Euro, höchstens 300 €. Einmalig 200 € Startbonus, wenn Sie vor dem 25. Geburtstag beginnen."],
  ["Rendite und Kosten", "Beiträge und Zulagen werden zu Jahresbeginn eingezahlt und wachsen mit der Rendite vor Kosten minus den Effektivkosten. Die Szenarien liegen 2 Prozentpunkte darunter und darüber."],
  ["Steuererstattung", "Beiträge bis 1.800 € plus Zulagen gelten als Sonderausgaben. Ist die Steuerersparnis größer als die Zulagen, erstattet das Finanzamt die Differenz. Sie geht aufs Konto und ist deshalb nicht im Depotwert enthalten."],
  ["Auszahlung", "Gesetzlich frühestens ab 65, als Auszahlungsplan mindestens bis 85. Der Rechner verteilt das Kapital gleichmäßig bis 85 und rechnet in der Auszahlphase mit 3 % Rendite. Die Auszahlungen werden im Alter versteuert, das ist hier nicht abgezogen."],
  ["Kaufkraft", "Damit Sie die Summe einordnen können, rechnet der Rechner den Depotwert mit der eingestellten Inflation auf heutiges Geld zurück."],
];

const FRAGEN = [
  ["Warum ist der Eigenbeitrag auf 150 € begrenzt?", "Weil die Förderung bei 1.800 € Eigenbeitrag im Jahr endet. Darüber gibt es keine weiteren Zulagen. Für Geld darüber hinaus ist ein freies Depot oft flexibler."],
  ["Welche Rendite ist realistisch?", "Breit gestreute Aktien-ETFs haben über lange Zeiträume in der Vergangenheit etwa 6 bis 8 % im Jahr erzielt, mit starken Schwankungen zwischendurch. Das ist keine Garantie für die Zukunft. Wählen Sie lieber vorsichtig und sehen Sie sich das vorsichtige Szenario an."],
  ["Was bedeutet Übertrag?", "Guthaben, das Sie aus einem bestehenden Riester-Vertrag in das Altersvorsorgedepot übertragen. Ob sich das lohnt, hängt vom alten Vertrag ab."],
  ["Was kostet ein Altersvorsorgedepot?", "Das hängt vom Anbieter ab. Für das Standardprodukt gilt eine Obergrenze von 1,0 % Effektivkosten im Jahr. Die Effektivkosten stehen im Produktinformationsblatt."],
];

export default function Startseite() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <section className="pt-10 pb-8">
        <p className="zahl text-xs text-akzent">{"// Altersvorsorgedepot ab 2027"}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">Altersvorsorgedepot ausführlich berechnen</h1>
        <p className="mt-3 max-w-3xl">
          Zulagen, Steuererstattung, Kosten, Inflation und Auszahlung in einem Rechner. Alle Annahmen lassen sich verstellen, der Verlauf
          steht Jahr für Jahr in der Tabelle und als CSV zum Weiterrechnen bereit.
        </p>
      </section>

      <Rechner />

      <section id="rechenweg" className="scroll-mt-20 pt-16">
        <h2 className="text-2xl font-semibold">So rechnet der Rechner</h2>
        <dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {RECHENWEG.map(([t, text]) => (
            <div key={t} className="border-l-2 border-akzent/60 pl-4">
              <dt className="font-semibold text-tinte">{t}</dt>
              <dd className="mt-1 text-sm">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="fragen" className="scroll-mt-20 pt-16">
        <h2 className="text-2xl font-semibold">Fragen</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {FRAGEN.map(([f, a]) => (
            <details key={f} className="rounded-xl border border-linie bg-panel p-4">
              <summary className="cursor-pointer font-medium text-tinte">{f}</summary>
              <p className="mt-2 text-sm">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="flex flex-col gap-4 rounded-xl border border-akzent/40 bg-[#0f2a2c] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ergebnis besprechen?</h2>
            <p className="mt-1 text-sm">
              Philipp Oelmann aus Hannover rechnet Ihre Zahlen mit Ihnen durch, auch mit Riester-Vertrag oder Kindern. Erstgespräch
              kostenlos.
            </p>
          </div>
          <a href={JUSTAVD} className="shrink-0 rounded-lg bg-akzent px-5 py-2.5 text-center font-semibold text-grund hover:bg-akzent-dunkel">
            Zu justavd.de
          </a>
        </div>
        <p className="mt-6 text-xs text-leise">
          Stand: {STAND}. Grundlage ist das Altersvorsorgereformgesetz (Bundestag 27.03.2026, Bundesrat 08.05.2026). Einzelheiten können
          sich durch Vorgaben der Verwaltung noch ändern.
        </p>
      </section>
    </main>
  );
}
