// app/layout.jsx
import './globals.css'
import Providers from './Providers'
import Script from 'next/script'
import React from 'react'
import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'



const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] })
export const metadata = {
  title: 'TPF Aid | A Fundraising Website | Supporting Those In Need',
  description: 'Support those in need through transparent and trusted fundraising.',
}

export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/all`, {
    cache: "no-store", // always fetch fresh CMS
  });

  const data = await res.json();
  const cms = data?.data || [];
  

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* Pass CMS to Providers (client component) */}
        <Providers cms={cms}>
          {children}
        </Providers>

        <Script id="disable-right-click" strategy="afterInteractive">
          {`document.addEventListener('contextmenu', event => event.preventDefault());`}
        </Script>
      </body>
    </html>
  );
}
