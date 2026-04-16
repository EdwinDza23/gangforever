'use client';

export default function HeroBackground() {
  return (
    <>
      <div className="hero-bg" />
      <div className="wave-lines">
        <svg viewBox="0 0 1400 700" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          {/* Flowing wave lines */}
          <path d="M0,350 Q350,250 700,350 T1400,330" fill="none" stroke="#3a7a5a" strokeWidth="1.2" />
          <path d="M0,400 Q350,300 700,400 T1400,380" fill="none" stroke="#2a5a40" strokeWidth="0.8" />
          <path d="M0,280 Q400,200 800,290 T1400,260" fill="none" stroke="#4a9a6a" strokeWidth="0.7" />
          <path d="M0,450 Q300,420 700,460 T1400,440" fill="none" stroke="#1a4a30" strokeWidth="0.5" />
          <path d="M0,500 Q350,470 700,510 T1400,490" fill="none" stroke="#1a3a24" strokeWidth="0.4" />

          {/* Vertical dashed lines */}
          <line x1="0"    y1="0" x2="0"    y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.6" />
          <line x1="233"  y1="0" x2="233"  y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.5" />
          <line x1="466"  y1="0" x2="466"  y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.4" />
          <line x1="700"  y1="0" x2="700"  y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.5" />
          <line x1="933"  y1="0" x2="933"  y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.4" />
          <line x1="1166" y1="0" x2="1166" y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.5" />
          <line x1="1400" y1="0" x2="1400" y2="700" stroke="#2a5a3a" strokeWidth="0.4" strokeDasharray="5,12" opacity="0.6" />

          {/* Decorative circles */}
          <circle cx="120"  cy="180" r="80"  fill="none" stroke="#1a4a30" strokeWidth="0.6" />
          <circle cx="1280" cy="500" r="110" fill="none" stroke="#1a4a30" strokeWidth="0.5" />
          <circle cx="700"  cy="120" r="50"  fill="none" stroke="#2a5a40" strokeWidth="0.4" />
        </svg>
      </div>
    </>
  );
}
