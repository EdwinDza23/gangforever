'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: Array<{
    id: string;
    name: string;
    thumbnailUrl: string;
    downloadUrl: string;
    uploadedAt: string;
  }>;
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Download Button */}
      {images[currentIndex] && (
        <button
          onClick={() => handleDownload(images[currentIndex].downloadUrl, images[currentIndex].name)}
          className="absolute top-4 right-20 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <Download className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Zoom]}
        initialSlide={initialIndex}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 3 }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="flex items-center justify-center">
            <div className="swiper-zoom-container">
              <img
                src={image.downloadUrl || image.thumbnailUrl}
                alt={image.name}
                referrerPolicy="no-referrer"
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image Info */}
      {images[currentIndex] && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
          {images[currentIndex].name}
        </div>
      )}
    </div>
  );
}