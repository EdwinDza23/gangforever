'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ImageLightbox from '@/components/gallery/ImageLightbox';
import { BentoGrid, BentoGridSkeleton, DriveImage } from '@/components/gallery/BentoGallery';

interface GroupedImages {
  [day: string]: DriveImage[];
}

const activeStyle = {
  color: '#d4b86a',
  borderColor: 'rgba(212,184,106,0.4)',
  background: 'rgba(212,184,106,0.07)',
};

export default function GalleryPage() {
  const [groupedImages, setGroupedImages] = useState<GroupedImages>({});
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      setGroupedImages(data.photos || {});
    } catch (error) {
      console.error('[gallery] Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const days = Object.keys(groupedImages).sort();
  const displayImages = selectedDay === 'all'
    ? Object.values(groupedImages).flat()
    : groupedImages[selectedDay] || [];

  // Use URLs as-is (already proxy URLs or external URLs)
  const lightboxImages = displayImages;


  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <>
        <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
        <Navbar />
        <div className="page-container">
          <div className="page-header">
            <div className="section-label">Memories</div>
            <h1 className="page-title">Photo Gallery</h1>
          </div>
          <BentoGridSkeleton count={12} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Memories</div>
          <h1 className="page-title">Photo Gallery</h1>
          <p className="page-subtitle">{displayImages.length} photos · Synced from Google Drive</p>
        </div>

        {/* Day Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={() => setSelectedDay('all')}
            className="nav-pill"
            style={selectedDay === 'all' ? activeStyle : {}}
          >
            All Days
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="nav-pill"
              style={selectedDay === day ? activeStyle : {}}
            >
              {day} ({groupedImages[day].length})
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {displayImages.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '60px 28px' }}>
            <div style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", fontSize: '36px', color: '#2a3a2e' }}>
              NO PHOTOS YET
            </div>
            <p style={{ color: '#4a5a4e', marginTop: '8px', fontSize: '13px' }}>
              Photos will auto-sync from Google Drive during the trip
            </p>
          </div>
        ) : (
          <BentoGrid images={displayImages} onOpen={openLightbox} />
        )}

        {lightboxOpen && (
          <ImageLightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    </>
  );
}
