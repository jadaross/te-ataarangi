import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'

const sourceSans3 = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Te Ataarangi',
    default: 'Te Ataarangi — Ako i te reo Māori',
  },
  description:
    'He taonga kore utu, mā te katoa — a free Māori language learning tool built on the Te Ataarangi methodology.',
  keywords: ['te reo Māori', 'Māori language', 'Te Ataarangi', 'rākau', 'language learning'],
  authors: [{ name: 'Te Ataarangi Community Project' }],
  openGraph: {
    locale: 'mi_NZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mi" className={sourceSans3.variable}>
      <body className="font-sans antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  )
}
