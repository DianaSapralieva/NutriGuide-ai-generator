import './globals.css'
import type { Metadata } from 'next'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from '@vercel/analytics/react';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'NutriGuide',
  description: 'An app that calculates your daily calories and protein, then builds a personalized meal plan with simple recipes based on your goals and food preferences.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}