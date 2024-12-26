import { getApartment, getSimilarApartments } from '@/actions'
import { ApartmentDetails } from '@/components/apartment-details'
import { SimilarApartments } from '@/components/similar-apartments'

type Params = Promise<{ slug: string }>;
export default async function ApartmentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const apartment = await getApartment(slug);
  const similarApartments = await getSimilarApartments(
    slug,
    apartment.category
  );

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <ApartmentDetails apartment={apartment} />
        <SimilarApartments apartments={similarApartments} />
      </div>
    </main>
  );
}

