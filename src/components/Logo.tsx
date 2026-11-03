export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#1c2939" />
        <rect x="6" y="18" width="5" height="8" rx="1.5" fill="#7290e8" />
        <rect x="13.5" y="13" width="5" height="13" rx="1.5" fill="#c4861c" />
        <rect x="21" y="7" width="5" height="19" rx="1.5" fill="#2dd4bf" />
      </svg>
      <span className="font-mono text-[0.95rem] font-semibold tracking-tight text-tinte">
        avdepot<span className="text-akzent">-calculator</span>
      </span>
    </span>
  );
}
