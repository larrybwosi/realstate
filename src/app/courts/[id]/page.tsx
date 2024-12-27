import { getCourtWithApartments } from '@/actions'
import { ApartmentGrid } from '@/components/apartment-grid'

export default async function CourtPage({ params }: { params: { id: string } }) {
  const court = await getCourtWithApartments(params.id)

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{court.name}</h1>
        <p className="text-xl mb-8">{court.description}</p>
        <h2 className="text-3xl font-bold mb-8">Apartments in {court.name}</h2>
        <ApartmentGrid apartments={court.apartments} />
      </div>
    </main>
  )
}

