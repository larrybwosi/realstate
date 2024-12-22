'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Home } from 'lucide-react'

interface Court {
  _id: string
  name: string
  description: string
  image: { asset: { url: string } }
  totalFloors: number
  totalApartments: number
  availableApartments: number
}

interface CourtsGridProps {
  courts: Court[]
}

export function CourtsGrid({ courts }: CourtsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Apartment Courts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courts.map((court, index) => (
            <motion.div
              key={court._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-xl">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={court.image.asset.url}
                    alt={court.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {court.availableApartments} Available
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{court.name}</h3>
                  <p className="text-muted-foreground mb-4">{court.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {court.totalFloors} Floors
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      {court.totalApartments} Apartments
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/courts/${court._id}`}>View Apartments</Link>
                  </Button>
                </CardFooter>
              </Card>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg z-10"
                >
                  <p className="text-sm font-semibold">Amenities Available</p>
                  <p className="text-xs text-muted-foreground">
                    Gym, Pool, Parking, and more!
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

