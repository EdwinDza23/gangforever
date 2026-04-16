@AGENTS.md

# GangForever — Project Notes

## Stack
- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Vanilla CSS (`app/globals.css`) — no Tailwind utility classes in component logic
- **Database**: PostgreSQL via Prisma (`lib/prisma.ts`)
- **Photos**: Google Drive API (`lib/google-drive.ts`) with direct `uc?export=view` URLs in `<img>` tags
- **Fonts**: DM Sans (body), Bebas Neue (display/headings), Syne (subheadings)

## Project Structure

```
lib/
  constants/          # Split by domain — import from '@/lib/constants' (barrel) or sub-files
    trip.ts           # TRIP_INFO, DESTINATIONS
    members.ts        # GANG_MEMBERS, MEMBER_COLORS
    budget.ts         # BUDGET_ITEMS, BUDGET_TOTAL, EXPENSE_CATEGORIES, CATEGORY_COLORS
    packing.ts        # PACKING_LIST, TIPS
    index.ts          # Barrel re-export
  constants.ts        # Compat shim → re-exports from constants/index
  drive-image.ts      # extractDriveFileId, getDriveImageUrl, getDriveThumbnailUrl
  google-drive.ts     # fetchDrivePhotos() — server-side Drive API
  prisma.ts           # Singleton Prisma client
  utils.ts            # formatCurrency, shared pure utilities

components/
  layout/             # Global shell components (used on every page)
    Navbar.tsx
    HeroBackground.tsx
  home/               # Homepage-specific components
    Countdown.tsx
    GalleryPreviews.tsx   # SVG placeholder images
  gallery/            # Gallery feature components
    BentoGallery.tsx      # BentoGrid, BentoGridSkeleton, GalleryImage, getBentoStyle
    ImageLightbox.tsx     # Swiper-based fullscreen lightbox
  Navbar.tsx          # Compat shim
  HeroBackground.tsx  # Compat shim
  Countdown.tsx       # Compat shim
```

## Key Rules
- **No drive proxy** — images load directly with `referrerPolicy="no-referrer"` on `<img>` tags
- **Constants** — prefer importing from the specific sub-file for clarity, barrel import is fine too
- **Utilities** — all shared pure functions go in `lib/utils.ts`
- **Components** — anything used on only one page goes in a `components/<page>/` subfolder

## Trip Info
- **Start**: 1st May 2026, 7:00 AM IST
- **End**: 6th May 2026
- **Members**: 10 friends, Kerala road trip
- **Distance**: ~369 km

## Environment Variables Required
```
DATABASE_URL              # Supabase PostgreSQL connection string
GOOGLE_SERVICE_ACCOUNT    # JSON string of service account credentials
DRIVE_FOLDER_ID           # Google Drive folder containing trip photos
```