import { font } from '@/design';
import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/slider.css';

export const metadata: Metadata = {
  title: 'Frontend Challenge',
  description: 'Pulse Frontend Challenge.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.variable} font-roboto`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
