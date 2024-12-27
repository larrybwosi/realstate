import { Hero } from '@/components/hero'
import { Benefits } from '@/components/benefits'
import { FeaturedApartments } from '@/components/featured-apartments'
import { Testimonials } from '@/components/testimonials'
import { Newsletter } from '@/components/newsletter'
import { getFeaturedApartments } from '@/actions/services'

export default async function Page() { 
  const featuredApartments = await getFeaturedApartments() 
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <FeaturedApartments apartments={featuredApartments} />
      <Testimonials />
      <Newsletter />
      {/* <LocationMap apartments={apartments.data} /> */}
    </main>
  );
}

