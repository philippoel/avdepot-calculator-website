import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import { JUSTAVD, SITE_URL } from "@/lib/seite";
import "./globals.css";

// Werden beim Bauen heruntergeladen und von der Seite selbst ausgeliefert (keine Anfrage an Google)
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-jetbrains", display: "swap" });

export const viewport: Viewport = { themeColor: "#0d1420", colorScheme: "dark" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AV-Depot-Calculator: Altersvorsorgedepot ausführlich berechnen",
    template: "%s | avdepot-calculator",
  },
  description:
    "Der ausführliche Rechner fürs Altersvorsorgedepot: Zulagen, Steuererstattung, Kosten, Inflation, drei Szenarien, Auszahlungsplan bis 85 und Verlauf Jahr für Jahr als Tabelle und CSV.",
  openGraph: { siteName: "avdepot-calculator", locale: "de_DE", type: "website" },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`h-full antialiased ${grotesk.variable} ${mono.variable}`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-20 border-b border-linie bg-grund/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" aria-label="avdepot-calculator, zur Startseite">
              <Logo />
            </Link>
            <nav aria-label="Hauptnavigation" className="flex gap-5 text-sm">
              <Link href="/#rechenweg" className="hidden hover:text-tinte sm:inline">Rechenweg</Link>
              <Link href="/#fragen" className="hidden hover:text-tinte sm:inline">Fragen</Link>
              <a href={JUSTAVD} className="text-akzent hover:text-akzent-dunkel">Beratung ↗</a>
            </nav>
          </div>
        </header>

        <div className="flex flex-1 flex-col">{children}</div>

        <footer className="mt-16 border-t border-linie text-sm text-leise">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="max-w-xl">
              Rechner zur Information, keine Anlage- oder Steuerberatung. Ein Angebot von Philipp Oelmann, Hannover, Beratung auf{" "}
              <a href={JUSTAVD} className="text-akzent hover:text-akzent-dunkel">justavd.de</a>.
            </p>
            <ul className="flex gap-5">
              <li><Link href="/impressum/" className="hover:text-tinte">Impressum</Link></li>
              <li><Link href="/datenschutz/" className="hover:text-tinte">Datenschutz</Link></li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
