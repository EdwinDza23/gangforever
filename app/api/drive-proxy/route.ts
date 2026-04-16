import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const FILE_ID_REGEX = /^[a-zA-Z0-9_-]{15,}$/;

async function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  return google.drive({ version: 'v3', auth });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || !FILE_ID_REGEX.test(id)) {
    console.error('[drive-proxy] Invalid or missing FILE_ID:', id);
    return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
  }

  console.log('[drive-proxy] Processing FILE_ID:', id);

  try {
    const drive = await getDriveClient();

    // Get file metadata and web content link
    const file = await drive.files.get({
      fileId: id,
      fields: 'name,mimeType,webContentLink',
    });

    console.log('[drive-proxy] File metadata:', file.data);

    // Use webContentLink if available (direct download URL)
    // Or use alt=media with the API
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;

    const res = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'arraybuffer' }
    );

    const contentType = file.data.mimeType || 'image/jpeg';
    const buffer = Buffer.from(res.data as any);

    console.log('[drive-proxy] Success, size:', buffer.length, 'bytes');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    console.error('[drive-proxy] Fetch error:', err.message || err);
    return NextResponse.json({ error: `Failed to fetch image: ${err.message}` }, { status: 502 });
  }
}
