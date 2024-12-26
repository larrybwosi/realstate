import { getApartment, getSimilarApartments } from '@/actions'
import { ApartmentDetails } from '@/components/apartment-details'
import { SimilarApartments } from '@/components/similar-apartments'

export default async function ApartmentPage({ params }: { params: { slug: string } }) {
  const apartment = await getApartment(params.slug)
  const similarApartments = await getSimilarApartments(params.slug, apartment.data.category)

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <ApartmentDetails apartment={apartment} />
        <SimilarApartments apartments={similarApartments.data} />
      </div>
    </main>
  )
}

