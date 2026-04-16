'use client';

import Navbar from '@/components/Navbar';
import { TIPS } from '@/lib/constants';

export default function TipsPage() {
  const bestTimes = [
    { beach: 'Snehatheeram', bestTime: 'October - March', note: 'Calm seas, pleasant weather' },
    { beach: 'Varkala', bestTime: 'October - April', note: 'Cliff views, sunset' },
    { beach: 'Fort Kochi', bestTime: 'November - February', note: 'Beach season' },
    { beach: 'Alappuzha', bestTime: 'October - March', note: 'Houseboat season' },
  ];

  const emergencyInfo = [
    { title: 'Police', number: '100', description: 'Emergency police helpline' },
    { title: 'Ambulance', number: '108', description: 'Medical emergency' },
    { title: 'Tourist Police', number: '1363', description: 'Tourist assistance helpline' },
    { title: 'Fire', number: '101', description: 'Fire emergency' },
  ];

  const iconColors = ['teal', 'coral', 'gold', 'blue', 'gold', 'purple'];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Insider Info</div>
          <h1 className="page-title">Kerala Tips</h1>
          <p className="page-subtitle">Everything you need to know for a smooth trip</p>
        </div>

        {/* Best Times */}
        <div className="glass-card mb-8">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#d4b86a', marginBottom: '16px' }}>
            🏖️ Best Time to Visit Beaches
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bestTimes.map((beach, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#0c0f0a',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '14px' }}>{beach.beach}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a5e', marginTop: '2px' }}>{beach.note}</div>
                </div>
                <span className="badge badge-teal">{beach.bestTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="features-grid mb-8 stagger-children">
          {TIPS.map((tip, i) => (
            <div key={i} className="feat-card animate-fade-up">
              <div className={`feat-icon ${iconColors[i % iconColors.length]}`}>{tip.icon}</div>
              <div className="feat-title">{tip.title}</div>
              <div className="feat-desc">{tip.text}</div>
            </div>
          ))}
        </div>

        {/* Emergency Info */}
        <div className="glass-card">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#d4866a', marginBottom: '16px' }}>
            🚨 Emergency Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyInfo.map((info) => (
              <div
                key={info.title}
                style={{
                  background: '#0c0f0a',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  border: '1px solid rgba(212,134,106,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '14px' }}>{info.title}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a5e', marginTop: '2px' }}>{info.description}</div>
                </div>
                <div style={{
                  fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                  fontSize: '28px',
                  color: '#d4866a',
                  lineHeight: 1,
                }}>
                  {info.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
