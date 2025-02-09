import { getApartment, getSimilarApartments } from '@/actions/apartments';
import { ApartmentDetails } from '@/components/apartment-details'
import { SimilarApartments } from '@/components/similar-apartments'
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { Metadata } from 'next';

type Params = Promise<{ slug: string }>;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = (await params).slug;

  async function getApartment(slug: string){
    'use cache'
    const res = await sanityFetch({
      query: `*[_type == "apartment" && slug.current == $slug][0] {
      title,
      slug,
      description,
      mainImage,
    }`,
      params: { slug },
    });
    return res.data;
  }

  const apartment = await getApartment(slug);
  return {
    title: "Cheap City | " + apartment.title,
    description: apartment.description,
    twitter: {
      card: "summary_large_image",
      title: "Cheap City | " + apartment.title,
      description: apartment.description,
      images: [
        {
          url: urlFor(apartment.mainImage).width(800).height(600).url(),
          width: 800,
          height: 600,
        },
      ],
    },
    keywords: [apartment.title, apartment.description, apartment.slug, "cheap", 'apartment'],
  };
}
 

export default async function ApartmentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const apartment = await getApartment(slug);
  
  const similarApartments = await getSimilarApartments(
    slug,
    apartment?.category?.slug.current as string
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

