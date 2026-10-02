import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Order Tracking | Fast & Reliable Delivery Experience',
  description:
    'Track your package in real-time with precise delivery estimates, timeline milestones, and 24/7 resolution support.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-100">
      <body className="min-h-full flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
