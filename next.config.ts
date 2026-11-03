import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export: `next build` erzeugt den Ordner `out/`,
  // dessen Inhalt 1:1 in den S3-Bucket hochgeladen wird.
  output: "export",

  // Erzeugt `/ueber-uns/index.html` statt `/ueber-uns.html`.
  // S3 (bzw. CloudFront) löst Ordner-URLs damit sauber auf.
  trailingSlash: true,

  // Die Next.js-Bildoptimierung braucht einen Server und ist
  // bei statischem Hosting nicht verfügbar.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
