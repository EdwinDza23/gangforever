import { NextResponse } from 'next/server';
import { fetchDrivePhotos } from '@/lib/google-drive';

export async function GET() {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID || '';
    let photos = await fetchDrivePhotos(folderId);

    // If empty -> fallback with mock images
    if (!photos || photos.length === 0) {
      photos = [
        {
          id: "mock-1",
          name: "Varkala Beach",
          day: "Day 1",
          thumbnailUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600",
          downloadUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200",
          uploadedAt: new Date().toISOString()
        },
        {
          id: "mock-2",
          name: "Cliff View",
          day: "Day 1",
          thumbnailUrl: "https://images.unsplash.com/photo-1582208990261-f099013d4cc2?auto=format&fit=crop&q=80&w=600",
          downloadUrl: "https://images.unsplash.com/photo-1582208990261-f099013d4cc2?auto=format&fit=crop&q=80&w=1200",
          uploadedAt: new Date().toISOString()
        },
        {
          id: "mock-3",
          name: "Backwaters",
          day: "Day 2",
          thumbnailUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600",
          downloadUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200",
          uploadedAt: new Date().toISOString()
        }
      ];
    }

    // Convert real Drive images to proxy URLs
    const processedPhotos = photos.map((photo) => {
      // Skip mock/unsplash images (already have full URLs)
      if (photo.id.startsWith('mock-') || photo.thumbnailUrl?.includes('unsplash')) {
        return photo;
      }
      // Convert real Drive images to use the proxy
      return {
        ...photo,
        thumbnailUrl: `/api/drive-proxy?id=${photo.id}`,
        downloadUrl: `/api/drive-proxy?id=${photo.id}`,
      };
    });

    // Group photos by day
    const grouped = processedPhotos.reduce((acc: Record<string, any[]>, photo) => {
      const day = (photo as { day: string }).day || 'Unknown';
      if (!acc[day]) acc[day] = [];
      acc[day].push(photo);
      return acc;
    }, {});

    return NextResponse.json({ photos: grouped });
  } catch (error) {
    console.error('Photos API error:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
