import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AgeVerificationModal from "@/components/AgeVerificationModal"
import DailyBonusBanner from "@/components/shared/DailyBonusBanner"
import ScrollToTop from "@/components/shared/ScrollToTop"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | The Best Casino Bonus Offers`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | The Best Casino Bonus Offers`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | The Best Casino Bonus Offers`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>
          <AgeVerificationModal />
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <DailyBonusBanner />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
