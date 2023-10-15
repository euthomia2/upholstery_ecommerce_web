import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] });

inter.className = `h-full ${inter.className}`;

export const metadata: Metadata = {
  title: 'CCLDO E-Commerce Website',
  description: 'This is the CCLDO e-commerce website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full bg-white'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
