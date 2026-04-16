import './globals.css';
import { DM_Sans, Bebas_Neue, Syne } from 'next/font/google';
import type { Metadata } from 'next';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '700'],
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
  title: 'GangForever · Kerala \'25',
  description: 'Kerala Road Trip planner for the gang — April 2025. 10 boys, 3 days, 369 km of coastal adventure.',
  keywords: ['Kerala', 'road trip', 'trip planner', 'GangForever', 'beach trip'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bebasNeue.variable} ${syne.variable}`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
