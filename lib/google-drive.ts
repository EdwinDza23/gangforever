import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}'),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function fetchDrivePhotos(folderId: string) {
  try {
    // 1. Get subfolders (Day 0, Day 1, etc.)
    const folderRes = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    const folders = folderRes.data.files || [];

    let allPhotos: any[] = [];

    // 2. Loop each folder
    for (const folder of folders) {
      const filesRes = await drive.files.list({
        q: `'${folder.id}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, name, createdTime)',
      });

      const images = filesRes.data.files || [];

      // 3. Map images with day info
      const formatted = images.map((file) => ({
        id: file.id,
        name: file.name,
        day: folder.name,
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`,
        downloadUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
        uploadedAt: file.createdTime || new Date().toISOString(),
      }));

      allPhotos.push(...formatted);
    }

    return allPhotos;
  } catch (error) {
    console.error('Drive fetch error:', error);
    return [];
  }
}