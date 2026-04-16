'use client';

import { useState, useEffect } from 'react';
import { Trophy, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Achievement {
  id: string;
  badge: string;
  earnedBy: string;
  date: string;
}

const BADGES = [
  { id: 'first-beach', name: 'Beach Explorer', description: 'Visited your first beach', icon: '🏖️' },
  { id: 'early-bird', name: 'Early Bird', description: 'Woke up before 6 AM', icon: '🌅' },
  { id: 'foodie', name: 'Foodie', description: 'Tried 5+ local dishes', icon: '🍛' },
  { id: 'photographer', name: 'Photographer', description: 'Added 20+ photos', icon: '📸' },
  { id: 'team-player', name: 'Team Player', description: 'Split an expense fairly', icon: '💰' },
  { id: 'pack-master', name: 'Pack Master', description: 'Packed everything on list', icon: '🎒' },
  { id: 'road-warrior', name: 'Road Warrior', description: 'Traveled 100+ km', icon: '🚗' },
  { id: 'social-butterfly', name: 'Social Butterfly', description: 'Voted on all destinations', icon: '🦋' },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements');
      if (res.ok) {
        const data = await res.json();
        setAchievements(data.achievements || []);
      }
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const earnedBadgeIds = achievements.map((a) => a.badge);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <div style={{ color: '#d4b86a', fontSize: '18px' }}>Loading achievements...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Trip Gamification</div>
          <h1 className="page-title">Achievements</h1>
          <p className="page-subtitle">Earn badges as you complete trip activities</p>
        </div>

        {/* Badge Wall */}
        <div className="glass-card mb-8">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#d4b86a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} /> Badge Wall
            </h2>
            <span className="badge badge-gold">
              {achievements.length} / {BADGES.length} earned
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger-children">
            {BADGES.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id);
              const achievement = achievements.find((a) => a.badge === badge.id);

              return (
                <div
                  key={badge.id}
                  className="animate-fade-up"
                  style={{
                    position: 'relative',
                    background: '#0c0f0a',
                    borderRadius: '14px',
                    padding: '20px 14px',
                    textAlign: 'center',
                    border: isEarned ? '1px solid rgba(212,184,106,0.35)' : '1px solid rgba(255,255,255,0.04)',
                    opacity: isEarned ? 1 : 0.45,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>{badge.icon}</div>
                  <div style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '13px', fontWeight: 700, color: isEarned ? '#d4b86a' : '#5a6a5e' }}>
                    {badge.name}
                  </div>
                  <p style={{ fontSize: '11px', color: '#4a5a4e', marginTop: '4px', lineHeight: 1.4 }}>
                    {badge.description}
                  </p>

                  {isEarned && achievement && (
                    <div style={{ marginTop: '8px', fontSize: '10px', color: '#7ecfa8', letterSpacing: '0.5px' }}>
                      🏆 {achievement.earnedBy}
                    </div>
                  )}

                  {!isEarned && (
                    <Lock
                      size={14}
                      style={{ position: 'absolute', top: '10px', right: '10px', color: '#3a4a3e' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass-card">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#7ecfa8', marginBottom: '16px' }}>
            🏆 Leaderboard
          </h2>
          {achievements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#4a5a4e', fontSize: '13px' }}>
              No achievements yet. Start exploring during the trip!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(
                achievements.reduce((acc, a) => {
                  acc[a.earnedBy] = (acc[a.earnedBy] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .map(([name, score], index) => {
                  const rankColors = ['#d4b86a', '#8a9e8e', '#d4866a'];
                  return (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#0c0f0a',
                        borderRadius: '10px',
                        padding: '14px 18px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: rankColors[index] || '#1a2018',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          color: index < 3 ? '#0c0f0a' : '#5a6a5e',
                          fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                        }}>
                          {index + 1}
                        </div>
                        <span style={{ color: '#e8e2d4', fontWeight: 600, fontSize: '14px' }}>{name}</span>
                      </div>
                      <span style={{ color: '#d4b86a', fontWeight: 600 }}>{score} badges</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
