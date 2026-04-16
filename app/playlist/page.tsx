'use client';

import Navbar from '@/components/Navbar';

export default function PlaylistPage() {
  const suggestedSongs = [
    { name: 'Illuminati', artist: 'Aavesham', emoji: '🔥' },
    { name: 'Kilukil Pambaram', artist: 'Kunjeldho', emoji: '🎵' },
    { name: 'Malare', artist: 'Premam', emoji: '🌸' },
    { name: 'Appangal Embadum', artist: 'Ustad Hotel', emoji: '🎶' },
    { name: 'Nee Himamazhayayi', artist: 'Edakkad Battalion 06', emoji: '❄️' },
    { name: 'Entammede Jimikki Kammal', artist: 'Velipadinte Pusthakam', emoji: '💃' },
  ];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Road Trip Vibes</div>
          <h1 className="page-title">Playlist</h1>
          <p className="page-subtitle">Music for the road — curated for the gang</p>
        </div>

        {/* Spotify Embed */}
        <div className="glass-card mb-8">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#d4b86a', marginBottom: '16px' }}>
            🎧 Kerala Trip Mix 2025
          </h2>
          <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
              width="100%"
              height="352"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: 'none', borderRadius: '12px' }}
            />
          </div>
        </div>

        {/* Song Suggestions */}
        <div className="glass-card">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#7ecfa8', marginBottom: '16px' }}>
            🎤 Song Suggestions
          </h2>
          <p style={{ fontSize: '13px', color: '#5a6a5e', marginBottom: '16px' }}>
            Songs the gang loves — vote for your favorites during the trip!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {suggestedSongs.map((song, index) => (
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
                  transition: 'border-color 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(126,207,168,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{song.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '14px' }}>{song.name}</div>
                    <div style={{ fontSize: '12px', color: '#5a6a5e', marginTop: '2px' }}>{song.artist}</div>
                  </div>
                </div>
                <button className="btn-gold" style={{ padding: '6px 14px', fontSize: '11px' }}>
                  🗳️ Vote
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
