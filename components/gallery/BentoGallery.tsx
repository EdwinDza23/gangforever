'use client';

import { useState, useEffect } from 'react';

export interface DriveImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  downloadUrl: string;
  uploadedAt: string;
}

/**
 * Returns CSS grid span values for a bento-style masonry layout.
 * Pattern repeats every 8 items with a mix of 1x1, 1x2, 2x1, and 2x2 cells.
 */
export function getBentoStyle(index: number): React.CSSProperties {
  const p = index % 8;
  if (p === 0) return { gridColumn: 'span 2', gridRow: 'span 2' };
  if (p === 1) return { gridColumn: 'span 1', gridRow: 'span 1' };
  if (p === 2) return { gridColumn: 'span 1', gridRow: 'span 2' };
  if (p === 3) return { gridColumn: 'span 1', gridRow: 'span 1' };
  if (p === 4) return { gridColumn: 'span 2', gridRow: 'span 1' };
  if (p === 5) return { gridColumn: 'span 1', gridRow: 'span 1' };
  if (p === 6) return { gridColumn: 'span 1', gridRow: 'span 1' };
  if (p === 7) return { gridColumn: 'span 2', gridRow: 'span 2' };
  return { gridColumn: 'span 1', gridRow: 'span 1' };
}

/** Single image cell with skeleton loading and error fallback. */
export function GalleryImage({
  image,
  index,
  onOpen,
}: {
  image: DriveImage;
  index: number;
  onOpen: (i: number) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = image.thumbnailUrl || image.downloadUrl || image.id;

  useEffect(() => {
    if (!src) console.error('[gallery] Could not resolve src for image:', image);
  }, [image, src]);

  return (
    <div
      className="gal-item"
      onClick={() => onOpen(index)}
      style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', cursor: 'pointer', ...getBentoStyle(index) }}
    >
      {/* Skeleton while loading */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #0c0f0a 25%, #1a2018 50%, #0c0f0a 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
        }} />
      )}

      {src && (
        <img
          src={src}
          alt={image.name}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            console.error('[gallery] Image failed to load:', src);
            e.currentTarget.src = '/placeholder.jpg';
            setLoaded(true);
          }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: loaded ? 1 : 0,
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e)  => (e.currentTarget.style.transform = 'scale(1)')}
        />
      )}

      <div className="gal-overlay">
        <div className="gal-label">{image.name}</div>
      </div>
    </div>
  );
}

/** The full dense bento grid container. */
export function BentoGrid({
  images,
  onOpen,
}: {
  images: DriveImage[];
  onOpen: (i: number) => void;
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gridAutoRows: '160px',
      gridAutoFlow: 'dense',
      gap: '8px',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {images.map((image, index) => (
        <GalleryImage
          key={image.id}
          image={image}
          index={index}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

/** Skeleton placeholder grid shown while images are loading. */
export function BentoGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gridAutoRows: '160px',
      gridAutoFlow: 'dense',
      gap: '8px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          ...getBentoStyle(i),
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #0c0f0a 25%, #1a2018 50%, #0c0f0a 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
        }} />
      ))}
    </div>
  );
}
