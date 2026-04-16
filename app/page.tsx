'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HeroBackground from '@/components/layout/HeroBackground';
import Countdown from '@/components/home/Countdown';
import Navbar from '@/components/layout/Navbar';
import { GalleryPlaceholder1, GalleryPlaceholder2, GalleryPlaceholder3 } from '@/components/home/GalleryPreviews';
import { formatCurrency } from '@/lib/utils';
import {
  TRIP_INFO,
  DESTINATIONS,
  GANG_MEMBERS,
  BUDGET_ITEMS,
  BUDGET_TOTAL,
  PACKING_LIST,
  TIPS,
} from '@/lib/constants';

/* ─────────── MAIN COMPONENT ─────────── */

export default function Home() {
  const [packingState, setPackingState] = useState<Record<string, boolean>>({});
  const [expenses, setExpenses] = useState({ spent: 0, budget: BUDGET_TOTAL.total, remaining: BUDGET_TOTAL.total });
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* Fetch live expenses */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/expenses');
        if (res.ok) {
          const data = await res.json();
          const allExpenses = data.expenses || [];
          const spent = allExpenses.reduce((sum: number, e: { amount: number }) => sum + e.amount, 0);
          setExpenses({ spent, budget: BUDGET_TOTAL.total, remaining: BUDGET_TOTAL.total - spent });
        }
      } catch {
        /* silently fail — show defaults */
      }
    })();
  }, []);

  /* Intersection Observer for active nav */
  useEffect(() => {
    const pills = document.querySelectorAll('.nav-pill[href^="#"]');
    if (!pills.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pills.forEach((p) => p.classList.remove('active'));
            const match = document.querySelector(`.nav-pill[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const togglePack = (key: string) => {
    setPackingState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <div className="hero">
        <HeroBackground />

        <div className="relative z-[2] text-center" style={{ animation: 'fadeUp 1s ease both' }}>
          <div
            style={{
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: '#c8b87a',
              marginBottom: '8px',
              opacity: 0.8,
            }}
          >
            Kerala Road Trip · May 2026
          </div>

          <div className="logo-main">
            Gang<span className="logo-forever">Forever</span>
          </div>

          <div
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#8a9e8e',
              marginTop: '10px',
            }}
          >
            {TRIP_INFO.totalFriends} Boys &nbsp;·&nbsp; {TRIP_INFO.totalDays} Days &nbsp;·&nbsp; {TRIP_INFO.totalDistance} km
          </div>
        </div>

        <div className="relative z-[2] mt-10">
          <Countdown />
        </div>

        <div
          className="relative z-[2] mt-12 flex flex-col items-center gap-2 animate-bob"
          style={{
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#4a5a4e',
          }}
        >
          Scroll to explore
          <span style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #4a5a4e, transparent)' }} />
        </div>
      </div>

      {/* ═══════════════════ NAV ═══════════════════ */}
      <Navbar />

      {/* ═══════════════════ ROUTE ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="route">
        <div className="section-label">The Journey</div>
        <div className="section-title">Our Route</div>
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
        <p style={{ marginTop: '16px', fontSize: '12px', color: '#4a5a4e' }}>
          * Route is flexible — places may change based on gang vote
        </p>
      </div>

      {/* ═══════════════════ TRIP INFO ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="tripinfo">
        <div className="section-label">Details</div>
        <div className="section-title">Trip Info</div>
        <div className="info-grid stagger-children">
          <div className="info-card gold animate-fade-up">
            <div className="ic-value">{TRIP_INFO.totalFriends}</div>
            <div className="ic-label">Gang Members</div>
            <div className="ic-detail">All boys, all chaos</div>
          </div>
          <div className="info-card teal animate-fade-up">
            <div className="ic-value">{TRIP_INFO.totalDays}</div>
            <div className="ic-label">Days on Road</div>
            <div className="ic-detail">Apr 30 night → May 3</div>
          </div>
          <div className="info-card coral animate-fade-up">
            <div className="ic-value">{TRIP_INFO.totalDistance}</div>
            <div className="ic-label">Kilometers</div>
            <div className="ic-detail">~{TRIP_INFO.totalDriveHours} hrs driving total</div>
          </div>
          <div className="info-card blue animate-fade-up">
            <div className="ic-value">2–3</div>
            <div className="ic-label">Cars</div>
            <div className="ic-detail">TBD by the boys</div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ THE GANG ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="gang" style={{ paddingLeft: 0, paddingRight: 0, overflow: 'hidden' }}>
        <div style={{ paddingLeft: '28px', paddingRight: '28px' }}>
          <div className="section-label">Who&apos;s Coming</div>
          <div className="section-title">The Gang</div>
        </div>
        
        <div style={{ width: '100%', marginTop: '40px', position: 'relative' }}>
          {/* Subtle gradient fades on edges (hide behind background color usually '#0c0f0a') */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to right, #0c0f0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to left, #0c0f0a, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          
          <div style={{ 
            display: 'flex', 
            width: 'max-content',
            animation: 'marquee 30s linear infinite' 
          }}>
            {[...GANG_MEMBERS, ...GANG_MEMBERS].map((member, i) => (
              <div key={i} style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', 
                marginRight: '60px' 
              }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{ 
                    width: '160px', height: '160px', borderRadius: '50%', 
                    objectFit: 'cover', border: '2px solid rgba(212,184,106,0.3)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }} 
                />
                <span style={{ 
                  fontSize: '24px', fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", 
                  color: '#d4b86a', letterSpacing: '2px', textTransform: 'uppercase'
                }}>
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════ BUDGET ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="budget">
        <div className="section-label">Money Talk</div>
        <div className="section-title">Budget Breakdown</div>
        <div className="glass-card" style={{ padding: '0', background: 'transparent', border: 'none' }}>
          <table className="budget-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Est. Total</th>
                <th style={{ textAlign: 'right' }}>Per Head</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET_ITEMS.map((item) => (
                <tr key={item.category}>
                  <td>
                    {item.category}
                    {item.percent > 0 && (
                      <div className="bbar">
                        <div className="bbar-fill" style={{ width: `${item.percent}%`, background: item.color }} />
                      </div>
                    )}
                  </td>
                  <td>{formatCurrency(item.total)}</td>
                  <td>{formatCurrency(item.perHead)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total Estimate</td>
                <td>{formatCurrency(BUDGET_TOTAL.total)}</td>
                <td>{formatCurrency(BUDGET_TOTAL.perHead)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/budget" className="btn-gold">
            View Full Budget Tracker →
          </Link>
        </div>
      </div>

      {/* ═══════════════════ GALLERY ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="gallery">
        <div className="section-label">Memories</div>
        <div className="section-title">Photo Gallery</div>
        <div className="gallery-preview">
          <div className="gal-item">
            <GalleryPlaceholder1 />
            <div className="gal-overlay"><div className="gal-label">Varkala Cliffs</div></div>
          </div>
          <div className="gal-item">
            <GalleryPlaceholder2 />
            <div className="gal-overlay"><div className="gal-label">Backwaters</div></div>
          </div>
          <div className="gal-item">
            <GalleryPlaceholder3 />
            <div className="gal-overlay"><div className="gal-label">Cherai Sunset</div></div>
          </div>
          <Link
            href="/gallery"
            className="gal-item"
            style={{ position: 'relative', textDecoration: 'none' }}
          >
            <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
              <rect width="200" height="160" fill="#0e1e2a" />
              <path d="M0,100 Q100,70 200,90 L200,160 L0,160Z" fill="#081018" />
              <circle cx="40" cy="50" r="25" fill="#1a2a3a" opacity="0.7" />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(12,15,10,0.72)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                  fontSize: '36px',
                  color: '#d4b86a',
                  lineHeight: 1,
                }}
              >
                +48
              </div>
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#6a7a6e',
                }}
              >
                More Photos
              </div>
            </div>
          </Link>
        </div>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#4a5a4e' }}>
          Auto-synced from Google Drive · Click any photo to preview &amp; download
        </p>
      </div>

      {/* ═══════════════════ PACKING ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="packing">
        <div className="section-label">Don&apos;t Forget</div>
        <div className="section-title">Packing List</div>
        <div className="pack-grid stagger-children">
          {PACKING_LIST.map((cat) => (
            <div key={cat.title} className="pack-category animate-fade-up">
              <div className="pack-cat-title">{cat.title}</div>
              {cat.items.map((item) => {
                const key = `${cat.title}-${item}`;
                const checked = packingState[key] || false;
                return (
                  <div
                    key={key}
                    className={`pack-item ${checked ? 'done' : ''}`}
                    onClick={() => togglePack(key)}
                  >
                    <div className={`pack-check ${checked ? 'checked' : ''}`} />
                    <div className="pack-item-name">{item}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/packing" className="btn-primary">
            Full Packing Tracker →
          </Link>
        </div>
      </div>

      {/* ═══════════════════ TIPS ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="tips">
        <div className="section-label">Insider Info</div>
        <div className="section-title">Kerala Tips</div>
        <div className="features-grid stagger-children">
          {TIPS.map((tip, i) => {
            const iconColors = ['gold', 'coral', 'teal', 'blue', 'gold', 'purple'];
            return (
              <div key={i} className="feat-card animate-fade-up">
                <div className={`feat-icon ${iconColors[i % iconColors.length]}`}>{tip.icon}</div>
                <div className="feat-title">{tip.title}</div>
                <div className="feat-desc">{tip.text}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════ EXPENSES ═══════════════════ */}
      <div className="divider" />
      <div className="section" id="expenses">
        <div className="section-label">Live Tracking</div>
        <div className="section-title">Expenses</div>
        <div
          className="glass-card"
          style={{
            border: '1px dashed rgba(212,184,106,0.2)',
            textAlign: 'center',
            padding: '48px 28px',
          }}
        >
          {expenses.spent === 0 ? (
            <>
              <div
                style={{
                  fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
                  fontSize: '48px',
                  color: '#2a3a2e',
                  lineHeight: 1,
                }}
              >
                LIVE DURING TRIP
              </div>
              <div style={{ fontSize: '13px', color: '#4a5a4e', marginTop: '8px' }}>
                Expense data will sync in real-time during the trip
              </div>
            </>
          ) : null}

          <div style={{ marginTop: expenses.spent === 0 ? '28px' : '0', display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="expense-card" style={{ border: '1px solid rgba(126,207,168,0.15)', background: 'rgba(126,207,168,0.05)' }}>
              <div className="expense-value" style={{ color: '#7ecfa8' }}>
                {formatCurrency(expenses.spent)}
              </div>
              <div className="expense-label" style={{ color: '#3a5a4e' }}>Spent</div>
            </div>
            <div className="expense-card" style={{ border: '1px solid rgba(212,184,106,0.15)', background: 'rgba(212,184,106,0.05)' }}>
              <div className="expense-value" style={{ color: '#d4b86a' }}>
                {formatCurrency(expenses.budget)}
              </div>
              <div className="expense-label" style={{ color: '#5a4a2e' }}>Budget</div>
            </div>
            <div className="expense-card" style={{ border: '1px solid rgba(212,134,106,0.15)', background: 'rgba(212,134,106,0.05)' }}>
              <div className="expense-value" style={{ color: '#d4866a' }}>
                {formatCurrency(expenses.remaining)}
              </div>
              <div className="expense-label" style={{ color: '#5a3a2e' }}>Remaining</div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link href="/budget" className="btn-gold">
              Add & Track Expenses →
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <div className="footer">
        <div className="footer-logo">Gang<span>Forever</span></div>
        <div style={{ fontSize: '12px', color: '#3a4a3e', marginTop: '8px', letterSpacing: '1px' }}>
          Kerala &apos;25 &nbsp;·&nbsp; Built with love for the boys
        </div>
      </div>
    </>
  );
}
