'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bed, Bath, Expand, Star, Heart } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface Apartment {
  _id: string
  title: string
  slug: { current: string }
  images: { asset: { url: string } }[]
  price: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  rating: number
  featured: boolean
}

interface FeaturedApartmentsProps {
  apartments: Apartment[]
}

export function FeaturedApartments({ apartments }: FeaturedApartmentsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [savedApartments, setSavedApartments] = useState<string[]>([])

  const toggleSave = (id: string) => {
    setSavedApartments((prev) =>
      prev.includes(id) ? prev.filter((apId) => apId !== id) : [...prev, id]
    )
  }

  return (
    <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Apartments
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apartments?.map((apartment, index) => (
            <motion.div
              key={apartment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-xl">
                <div className="aspect-[16/9] relative">
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
                    <Heart
                      className={`h-5 w-5 ${
                        savedApartments.includes(apartment._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }`}
                    />
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
                          i < apartment.rating
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
                    ${apartment?.price.toLocaleString()}/mo
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Bed className="h-4 w-4" />
                      {apartment?.bedrooms}{" "}
                      {apartment?.bedrooms === 1 ? "Bed" : "Beds"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Bath className="h-4 w-4" />
                      {apartment?.bathrooms}{" "}
                      {apartment?.bathrooms === 1 ? "Bath" : "Baths"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Expand className="h-4 w-4" />
                      {apartment?.squareFootage} sqft
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
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg z-10"
                >
                  <p className="text-sm font-semibold">Hot Deal! 🔥</p>
                  <p className="text-xs text-muted-foreground">
                    Book now and get 10% off your first month&lsquo;s rent!
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

