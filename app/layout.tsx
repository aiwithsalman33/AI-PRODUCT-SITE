import type { Metadata } from 'next';
import { ToastProvider } from '@/lib/toast-context';
import { ToastContainer } from '@/components/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Product Content Studio – Build Faster, Ship Smarter',
  description: 'Turn raw product data into high-converting descriptions, SEO titles, and metadata using AI automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
