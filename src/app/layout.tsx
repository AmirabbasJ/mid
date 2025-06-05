import { font } from '@/design';
import '../styles/globals.css';
import '../styles/slider.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.variable} font-roboto`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="Technance Pulse Frontend Challenge" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
