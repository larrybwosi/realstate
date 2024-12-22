'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Expand } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Apartment {
  _id: string
  title: string
  slug: { current: string }
  images: { asset: { url: string } }[]
  price: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
}

interface FeaturedApartmentsProps {
  apartments: Apartment[]
}

export function FeaturedApartments({ apartments }: FeaturedApartmentsProps) {
  return (
    <section className="bg-gradient-to-b from-background to-muted py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Apartments</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment, index) => (
            <motion.div
              key={apartment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={apartment.images[0].asset.url}
                    alt={apartment.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{apartment.title}</h3>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    ${apartment.price.toLocaleString()}/mo
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Bed className="h-3 w-3" />
                      {apartment.bedrooms} {apartment.bedrooms === 1 ? 'Bed' : 'Beds'}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Bath className="h-3 w-3" />
                      {apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

