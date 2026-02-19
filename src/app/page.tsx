import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"
import HeroSection from "@/components/sections/HeroSection"
import NewsBanner from "@/components/sections/NewsBanner"
import DealsSection from "@/components/sections/DealsSection"
import CommunityStats from "@/components/sections/CommunityStats"
import MerkurInfoSection from "@/components/sections/MerkurInfoSection"
import FAQSection from "@/components/sections/FAQSection"
import MeshOrbs from "@/components/shared/MeshOrbs"
import ParticleZone from "@/components/shared/ParticleZone"
export const metadata = {
  title: `${SITE_NAME} | The Best Casino Bonus Offers`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    languages: { de: SITE_URL },
  },
}

export default function HomePage() {
  return (
    <>
      <ParticleZone>
        <HeroSection />
        <NewsBanner />
        <DealsSection />
        <MeshOrbs>
          <CommunityStats />
          <MerkurInfoSection />
          <FAQSection />
        </MeshOrbs>
      </ParticleZone>
    </>
  )
}
