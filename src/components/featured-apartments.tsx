'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bed, Bath, Expand, Star, Heart } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { MotionDiv } from './motion'
import { Apartment } from '@/types'

interface FeaturedApartmentsProps {
  apartments: Apartment[]
}

export function FeaturedApartments({ apartments }: FeaturedApartmentsProps) {

  const toggleSave = (id: string) => {
    console.log(id)
    // setSavedApartments((prev) =>
    //   prev.includes(id) ? prev.filter((apId) => apId !== id) : [...prev, id]
    // )
  }

 
  return (
    <section className="bg-linear-to-r from-primary-50 to-secondary-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Apartments
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apartments?.map((apartment, index) => {
            console.log(
              urlFor(apartment.mainImage.asset).width(300).format("webp").url()
            );
            return (
              <MotionDiv
                key={apartment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden transition-shadow ">
                  <div className="aspect-16/9 relative">
                    <Image
                      src={urlFor(apartment.mainImage.asset)
                        .width(300)
                        .format("webp")
                        .url()}
                      alt={apartment.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleSave(apartment._id)}
                    >
                      {/* <Heart
                        className={`h-5 w-5 ${
                          apartment?.isSaved
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }`}
                      /> */}
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {apartment.title}
                    </h3>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < apartment?.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {/* {apartment?.rating.toFixed(1)} */}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-4">
                      ${apartment?.rental?.price.toLocaleString()}/mo
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Bed className="h-4 w-4" />
                        {apartment?.specifications?.bedrooms}{" "}
                        {apartment?.specifications?.bedrooms === 1
                          ? "Bed"
                          : "Beds"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Bath className="h-4 w-4" />
                        {apartment?.specifications?.bathrooms}{" "}
                        {apartment?.specifications?.bathrooms === 1
                          ? "Bath"
                          : "Baths"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Expand className="h-4 w-4" />
                        {apartment?.specifications?.squareFootage} sqft
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
              </MotionDiv>
            );})}
        </div>
      </div>
    </section>
  );
}

