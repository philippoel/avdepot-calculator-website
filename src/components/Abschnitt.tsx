export default function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold">{titel}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}
