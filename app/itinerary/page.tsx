'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import Navbar from '@/components/Navbar';

interface VoteOption {
  id: string;
  category: string;
  option: string;
  votedBy: string[];
}

export default function ItineraryPage() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [votes, setVotes] = useState<VoteOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const res = await fetch('/api/votes');
      if (res.ok) {
        const data = await res.json();
        setVotes(data.votes || []);
      }
    } catch (error) {
      console.error('Failed to fetch votes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVotesForDestination = (destination: string) => {
    return votes.filter((v) => v.option === destination);
  };

  const handleVote = async (destination: string) => {
    const name = prompt('Enter your name:');
    if (!name) return;

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'Destination', option: destination, votedBy: name }),
      });
      if (res.ok) fetchVotes();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const groupedDestinations = [
    DESTINATIONS.slice(0, 2),
    DESTINATIONS.slice(2, 4),
    DESTINATIONS.slice(4, 6),
    DESTINATIONS.slice(6, 8),
  ];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">The Journey</div>
          <h1 className="page-title">Route & Itinerary</h1>
          <p className="page-subtitle">Trip timeline and destinations — vote for your favorites</p>
        </div>

        {/* Route strip overview */}
        <div className="glass-card" style={{ marginBottom: '28px' }}>
          <div className="route-strip">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.order}
                className={`stop-item ${dest.type === 'start' ? 'start' : dest.type === 'end' ? 'end' : ''}`}
              >
                <div className="stop-dot">
                  {dest.type === 'start' ? 'S' : dest.type === 'end' ? 'E' : dest.order - 1}
                </div>
                <div className="stop-name">{dest.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day Accordion */}
        <div className="flex flex-col gap-4">
          {groupedDestinations.map((dayDestinations, dayIndex) => {
            const dayNum = dayIndex + 1;
            const isExpanded = expandedDay === dayNum;

            return (
              <div key={dayNum} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : dayNum)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}
                >
                  <div>
                    <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#d4b86a' }}>
                      Day {dayNum}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#5a6a5e', marginTop: '4px' }}>
                      {dayDestinations.map((d) => d.name).join(' → ')}
                    </p>
                  </div>
                  {isExpanded
                    ? <ChevronUp size={18} color="#6a7a6e" />
                    : <ChevronDown size={18} color="#6a7a6e" />
                  }
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {dayDestinations.map((destination, index) => {
                      const destVotes = getVotesForDestination(destination.name);
                      return (
                        <div
                          key={destination.order}
                          style={{
                            background: '#0c0f0a',
                            borderRadius: '12px',
                            padding: '18px',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div
                                className="stop-dot"
                                style={{
                                  width: '32px', height: '32px', fontSize: '11px',
                                  flexShrink: 0,
                                }}
                              >
                                {dayIndex * 2 + index + 1}
                              </div>
                              <div>
                                <h3 style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '15px' }}>
                                  {destination.name}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: '#5a6a5e' }}>
                                  <MapPin size={12} />
                                  Suggested Stop
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleVote(destination.name)}
                              className="btn-gold"
                              style={{ padding: '6px 14px', fontSize: '11px', whiteSpace: 'nowrap' }}
                            >
                              🗳️ Vote
                              {destVotes.length > 0 && (
                                <span className="badge badge-gold" style={{ marginLeft: '6px' }}>
                                  {destVotes.length}
                                </span>
                              )}
                            </button>
                          </div>

                          {destVotes.length > 0 && (
                            <div style={{ marginTop: '12px', marginLeft: '44px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {destVotes[0].votedBy.map((voter) => (
                                <span key={voter} className="badge badge-teal">{voter}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#4a5a4e', textAlign: 'center' }}>
          * Route is flexible — places may change based on gang vote
        </p>
      </div>
    </>
  );
}
