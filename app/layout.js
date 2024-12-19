import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from 'next/font/local';
import './globals.scss';

const myFont = localFont({
  src: './w95fa.woff2',
})

export const metadata = {
  title: 'Mursaleen👋',
  description: 'Windows 95 themed portfolio of Mursaleen',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
