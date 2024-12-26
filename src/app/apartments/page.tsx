import { getApartments } from '@/actions'
import { ApartmentGrid } from '@/components/apartment-grid'

export default async function ApartmentsPage() {
  const apartments = await getApartments()

  return (
    <main className="min-h-screen py-24">
      <div className=" mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">All Apartments</h1>
        <ApartmentGrid apartments={apartments.data} />
      </div>
    </main>
  );
}

