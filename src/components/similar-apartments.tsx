import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Expand } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

export function SimilarApartments({ apartments }: { apartments: any[] }) {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-8">Similar Apartments</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {apartments.map((apartment) => (
          <Card key={apartment._id} className="overflow-hidden">
            <div className="aspect-[16/9] relative">
              <Image
                src={urlFor(apartment.mainImage)
                  .width(300)
                  .format("webp")
                  .url()}
                alt={apartment.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{apartment.title}</h3>
              <p className="mt-2 text-2xl font-bold text-primary">
                ${apartment.price.toLocaleString()}/mo
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Bed className="h-3 w-3" />
                  {apartment.bedrooms}{" "}
                  {apartment.bedrooms === 1 ? "Bed" : "Beds"}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  {apartment.bathrooms}{" "}
                  {apartment.bathrooms === 1 ? "Bath" : "Baths"}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Expand className="h-3 w-3" />
                  {apartment.squareFootage} sqft
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={`/apartments/${apartment.slug.current}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

