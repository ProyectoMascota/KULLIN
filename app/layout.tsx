import type { Metadata, Viewport } from 'next';
import './globals.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kullin.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Kulliñ — Cuida a tu compañero',
    template: '%s | Kulliñ',
  },
  description:
    'Calcula la ración diaria exacta de tu perro o gato con fórmulas veterinarias (NRC 2006) y recibe recordatorios antes de que se acabe su comida. Gratis.',
  keywords: [
    'comida para perros', 'comida para gatos', 'calcular ración diaria mascota',
    'cuánto debe comer mi perro', 'cuánto debe comer mi gato', 'Royal Canin Chile',
    'Hills Science Diet Chile', 'alimentación mascotas Chile', 'nutrición canina',
    'nutrición felina',
  ],
  authors: [{ name: 'Kulliñ' }],
  creator: 'Kulliñ',
  publisher: 'Kulliñ',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: APP_URL,
    siteName: 'Kulliñ',
    title: 'Kulliñ — Cuida a tu compañero',
    description:
      'Calcula la ración diaria exacta de tu perro o gato y nunca te quedes sin comida. Gratis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kulliñ — La mascota es la interfaz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kulliñ — Cuida a tu compañero',
    description:
      'Calcula la ración diaria exacta de tu perro o gato y nunca te quedes sin comida. Gratis.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FBF3E7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root-content">{children}</div>
      </body>
    </html>
  );
}
