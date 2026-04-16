// SVG placeholder images used in the homepage gallery preview section.
// These are shown before real trip photos are available.

export function GalleryPlaceholder1() {
  return (
    <svg viewBox="0 0 300 320" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <rect width="300" height="320" fill="#1a2a1e" />
      <circle cx="80" cy="280" r="140" fill="#0f1f14" opacity="0.8" />
      <path d="M0,240 Q80,190 160,240 T300,220 L300,320 L0,320Z" fill="#0a1a10" />
      <circle cx="230" cy="90" r="50" fill="#1e3a28" opacity="0.5" />
      <path d="M60,70 Q100,25 145,70 T210,55" fill="none" stroke="#3a7a5a" strokeWidth="1.5" />
      <rect x="108" y="140" width="3" height="70" fill="#2a5a3a" />
      <rect x="96" y="140" width="26" height="3" fill="#2a5a3a" transform="rotate(-22 109 141)" />
      <rect x="96" y="155" width="24" height="3" fill="#2a5a3a" transform="rotate(18 109 156)" />
      <text x="150" y="190" fontFamily="Georgia,serif" fontSize="11" fill="#3a6a4a" letterSpacing="3" textAnchor="middle">KERALA COAST</text>
    </svg>
  );
}

export function GalleryPlaceholder2() {
  return (
    <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <rect width="200" height="160" fill="#1e2a1e" />
      <rect x="0" y="90" width="200" height="70" fill="#0e1a0e" />
      <circle cx="160" cy="45" r="28" fill="#2a3a20" opacity="0.7" />
      <path d="M0,90 Q50,68 100,82 T200,76 L200,160 L0,160Z" fill="#0a180a" opacity="0.7" />
      <line x1="0" y1="100" x2="200" y2="94" stroke="#3a6a3a" strokeWidth="0.7" opacity="0.5" />
      <text x="100" y="55" fontFamily="Georgia,serif" fontSize="10" fill="#4a7a4a" letterSpacing="2" textAnchor="middle">ALAPPUZHA</text>
    </svg>
  );
}

export function GalleryPlaceholder3() {
  return (
    <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <rect width="200" height="160" fill="#2a1e0e" />
      <path d="M0,110 Q100,78 200,100 L200,160 L0,160Z" fill="#1a1008" />
      <circle cx="100" cy="55" r="38" fill="#3a2810" opacity="0.6" />
      <path d="M65,110 Q100,65 135,110" fill="none" stroke="#8a6a30" strokeWidth="1.2" />
      <text x="100" y="138" fontFamily="Georgia,serif" fontSize="10" fill="#6a4a20" letterSpacing="2" textAnchor="middle">CHERAI BEACH</text>
    </svg>
  );
}
