import type { Metadata } from "next";
import Abschnitt from "@/components/Abschnitt";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

const extern = { className: "underline underline-offset-2 hover:text-akzent-dunkel", target: "_blank", rel: "noopener noreferrer" } as const;

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">Impressum</h1>

      <Abschnitt titel="Angaben gemäß § 5 DDG">
        <p className="font-medium text-tinte">Philipp Oelmann</p>
        <p>Selbstständiger Repräsentant für die tecis Finanzdienstleistungen AG</p>
        <p>Arnswaldtstraße 10<br />30159 Hannover</p>
      </Abschnitt>

      <Abschnitt titel="Kontakt">
        <p>Mobil: +49 (157) 35865646</p>
        <p>
          E-Mail: <a href="mailto:info@justavd.de" className="underline underline-offset-2 hover:text-akzent-dunkel">info@justavd.de</a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>Philipp Oelmann, Arnswaldtstraße 10, 30159 Hannover</p>
      </Abschnitt>

      <Abschnitt titel="Erlaubnis nach § 34d GewO">
        <p>Versicherungsvertreter mit Erlaubnis nach § 34d Abs. 1 GewO (Bundesrepublik Deutschland)</p>
        <p>Aufsichtsbehörde: IHK Hannover, Bischofsholer Damm 91, 30173 Hannover</p>
        <p>Registrierungsnummer: D-53UZ-965LW-77</p>
        <p>
          Berufsrechtliche Regelungen: § 34d GewO, §§ 59–68 VVG, Versicherungsvermittlungsverordnung (VersVermV), abrufbar unter{" "}
          <a href="https://www.gesetze-im-internet.de" {...extern}>www.gesetze-im-internet.de</a>.
        </p>
      </Abschnitt>

      <Abschnitt titel="Erlaubnis nach § 34f GewO">
        <p>Finanzanlagenvermittler nach § 34f Abs. 1 Satz 1 Nr. 1 GewO (Bundesrepublik Deutschland)</p>
        <p>Aufsichtsbehörde: IHK Hannover, Bischofsholer Damm 91, 30173 Hannover</p>
        <p>Registrierungsnummer: D-F-133-UKL7-94</p>
        <p>
          Berufsrechtliche Regelungen: § 34f GewO, Finanzanlagenvermittlungsverordnung (FinVermV), abrufbar unter{" "}
          <a href="https://www.gesetze-im-internet.de" {...extern}>www.gesetze-im-internet.de</a>.
        </p>
      </Abschnitt>

      <Abschnitt titel="Vermittlerregister">
        <p>
          Die Eintragungen können beim Vermittlerregister des DIHK e. V., Breite Straße 29, 10178 Berlin, geprüft werden:{" "}
          <a href="https://www.vermittlerregister.info" {...extern}>www.vermittlerregister.info</a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Hinweis">
        <p>
          Die Inhalte und Rechner dieser Website sind allgemeine Informationen und keine Anlageberatung. Rechenbeispiele beruhen auf Annahmen,
          Wertentwicklungen der Vergangenheit sind kein Maßstab für die Zukunft.
        </p>
      </Abschnitt>
    </main>
  );
}
