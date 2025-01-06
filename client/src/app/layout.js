import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});
import { Providers } from "@/redux/provider";

export const metadata = {
  metadataBase: new URL('https://scriptro.com'),
  title: {
    default: 'Scriptro - Digital Tools Platform | Online File Tools & Converters',
    template: '%s | scriptro'
  },
  description: 'Free online tools for PDF editing, image manipulation, text conversion, and more. Easy-to-use digital tools to enhance your productivity.',
  keywords: [
    'online tools',
    'PDF editor',
    'image tools',
    'file converter',
    'text tools',
    'digital utilities',
    'online converter',
    'productivity tools'
  ],
  authors: [{ name: 'scriptro Team' }],
  creator: 'scriptro',
  publisher: 'scriptro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scriptro.com',
    siteName: 'scriptro',
    title: 'scriptro - Digital Tools Platform',
    description: 'Free online tools for PDF editing, image manipulation, text conversion, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'scriptro - Digital Tools Platform'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'scriptro - Digital Tools Platform',
    description: 'Free online tools for PDF editing, image manipulation, text conversion, and more.',
    images: ['/twitter-image.jpg'],
    creator: '@scriptro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://scriptro.com',
    languages: {
      'en-US': 'https://scriptro.com',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

export const viewport = {
  themeColor: '#1e293b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning={true}
      className="scroll-smooth"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-slate-950 antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
