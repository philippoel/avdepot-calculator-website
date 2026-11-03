import type { Metadata } from "next";
import Abschnitt from "@/components/Abschnitt";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
      <p className="mt-4">
        Diese Website kommt ohne Kontaktformular, ohne Cookies und ohne Reichweitenmessung aus. Verarbeitet werden nur die Daten, die
        technisch nötig sind, um Ihnen die Seiten auszuliefern.
      </p>

      <Abschnitt titel="1. Verantwortlicher">
        <p>
          Philipp Oelmann, Selbstständiger Repräsentant für die tecis Finanzdienstleistungen AG
          <br />
          Arnswaldtstraße 10, 30159 Hannover
          <br />
          E-Mail: <a href="mailto:info@justavd.de" className="underline underline-offset-2">info@justavd.de</a>
        </p>
      </Abschnitt>

      <Abschnitt titel="2. Hosting über GitHub Pages">
        <p>
          Die Website wird über GitHub Pages ausgeliefert. Anbieter ist die GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam,
          Niederlande, eine Tochter der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
        </p>
        <p>
          Beim Aufruf einer Seite verarbeitet GitHub technisch notwendige Verbindungsdaten, insbesondere Ihre IP-Adresse, um die Seite
          auszuliefern und vor Angriffen zu schützen. Dabei kann eine Übermittlung in die USA stattfinden. GitHub ist nach dem
          EU-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und
          zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </Abschnitt>

      <Abschnitt titel="3. Rechner">
        <p>
          Der Rechner läuft vollständig in Ihrem Browser. Ihre Eingaben werden weder gespeichert noch an uns oder Dritte
          übertragen.
        </p>
      </Abschnitt>

      <Abschnitt titel="4. Schriftarten">
        <p>Die verwendeten Schriften werden von dieser Website selbst ausgeliefert. Es findet keine Verbindung zu Google Fonts statt.</p>
      </Abschnitt>

      <Abschnitt titel="5. Links zu justavd.de">
        <p>
          Wenn Sie einem Link zu justavd.de folgen, gilt dort die Datenschutzerklärung von justavd.de. Auf dieser Website werden dabei
          keine Daten erhoben.
        </p>
      </Abschnitt>

      <Abschnitt titel="6. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
          (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Wenden Sie sich dazu an den oben genannten
          Verantwortlichen.
        </p>
      </Abschnitt>

      <Abschnitt titel="7. Beschwerderecht">
        <p>
          Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist die Landesbeauftragte für den Datenschutz
          Niedersachsen, Prinzenstraße 5, 30159 Hannover.
        </p>
      </Abschnitt>

      <Abschnitt titel="8. Stand">
        <p>November 2026. Wir passen diese Erklärung an, wenn sich die Verarbeitung ändert.</p>
      </Abschnitt>
    </main>
  );
}
