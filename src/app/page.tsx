import { Hero } from '@/components/hero'
import { Benefits } from '@/components/benefits'
import { FeaturedApartments } from '@/components/featured-apartments'
import { Testimonials } from '@/components/testimonials'
import { Newsletter } from '@/components/newsletter'
import { LocationMap } from '@/components/location-map'
import { getApartments } from '../../sanity/lib/client'

export default async function Page() { 
  const apartments = await getApartments()
  // const featuredApartments = await getFeaturedApartments()

  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <FeaturedApartments apartments={[]} />
      <Testimonials />
      <Newsletter />
      <LocationMap apartments={apartments} />
    </main>
  )
}

