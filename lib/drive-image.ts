/**
 * Google Drive image URL utilities for client-side use.
 *
 * All functions work browser-side by generating direct Drive URLs.
 * No proxy or server-side fetching required.
 *
 * Supported input formats:
 *   - Raw file ID:             "1abc...xyz"
 *   - /file/d/<ID>/view URL:  "https://drive.google.com/file/d/1abc.../view"
 *   - ?id=<ID> URL:           "https://drive.google.com/open?id=1abc..."
 *   - /d/<ID> pattern:        "https://lh3.googleusercontent.com/d/1abc..."
 */

const FILE_ID_REGEX = /^[a-zA-Z0-9_-]{15,}$/;

/**
 * Extracts the Drive file ID from any supported URL format or raw ID.
 * Returns an empty string if no valid ID can be found.
 */
export function extractDriveFileId(input: string): string {
  if (!input) return '';

  // /file/d/<ID>
  const fileMatch = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // ?id=<ID> or &id=<ID>  (covers /open?id=, /uc?id=, /thumbnail?id=)
  const idMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  // lh3.googleusercontent.com/d/<ID>  or  /d/<ID>=w600
  const lhMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (lhMatch) return lhMatch[1];

  // Raw FILE_ID passed directly (15+ alphanumeric chars)
  if (FILE_ID_REGEX.test(input)) return input;

  return '';
}

/**
 * Returns a direct Google Drive image URL suitable for use in <img src>.
 * Uses the public uc?export=view endpoint.
 *
 * Note: Files must be shared publicly or accessible to the viewer.
 */
export function getDriveImageUrl(input: string): string {
  const fileId = extractDriveFileId(input);
  if (!fileId) return '';
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Returns a Drive thumbnail URL at the specified width.
 * Useful for grid previews.
 */
export function getDriveThumbnailUrl(input: string, width = 600): string {
  const fileId = extractDriveFileId(input);
  if (!fileId) return '';
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}
