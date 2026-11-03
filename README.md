# avdepot-calculator.de

Eigenständige Seite: ausführlicher Rechner fürs Altersvorsorgedepot mit Szenarien, Verlauf, Tabelle und CSV (`src/lib/rechner.ts`).
Ein Angebot von Philipp Oelmann, verweist für die Beratung auf justavd.de.

- Next.js als statischer Export (`out/`), Tailwind CSS
- Veröffentlichung über GitHub Pages (`.github/workflows/deploy.yml`), Domain in `public/CNAME`
- Zulagen- und Steuerlogik wie auf justavd.de

Design: Dunkles Werkzeug-Design, Türkis, Space Grotesk und JetBrains Mono. Diagrammfarben auf dem dunklen Grund geprüft.

Lokal ansehen: `npm install`, dann `npm run dev` und http://localhost:3000 öffnen.
