'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Expand, Calendar, Search, Building2 } from 'lucide-react'

interface Apartment {
  _id: string
  title: string
  slug: { current: string }
  images: { asset: { url: string } }[]
  price: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  availableDate: string
  amenities: string[]
  category: string
  featured: boolean
  court: {
    _id: string
    name: string
  }
  floorNumber: number
  apartmentNumber: string
}

interface ApartmentGridProps {
  apartments: Apartment[]
}

export function ApartmentGrid({ apartments }: ApartmentGridProps) {
  const [filteredApartments, setFilteredApartments] = useState(apartments)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [bedrooms, setBedrooms] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [courtFilter, setCourtFilter] = useState<string>('all')

  const courts = Array.from(new Set(apartments.map(apt => apt.court.name)))

  useEffect(() => {
    const filtered = apartments.filter((apartment) => {
      const matchesPrice = apartment.price >= priceRange[0] && apartment.price <= priceRange[1]
      const matchesBedrooms = bedrooms === 'all' || apartment.bedrooms === Number(bedrooms)
      const matchesCategory = category === 'all' || apartment.category === category
      const matchesCourt = courtFilter === 'all' || apartment.court.name === courtFilter
      const matchesSearch = apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apartment.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase())) ||
        apartment.court.name.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesPrice && matchesBedrooms && matchesCategory && matchesCourt && matchesSearch
    })

    setFilteredApartments(filtered)
  }, [apartments, priceRange, bedrooms, category, courtFilter, searchTerm])

  return (
    <section className="bg-gradient-to-b from-background to-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Find Your Perfect Home</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium mb-2">Price Range</label>
            <Slider
              id="price-range"
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bedrooms</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="family">Family Size</SelectItem>
                <SelectItem value="single">Single Room</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="student">Student Housing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="court" className="block text-sm font-medium mb-2">Court</label>
            <Select value={courtFilter} onValueChange={setCourtFilter}>
              <SelectTrigger id="court">
                <SelectValue placeholder="Court" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courts</SelectItem>
                {courts.map(court => (
                  <SelectItem key={court} value={court}>{court}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Search apartments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApartments.map((apartment) => (
            <motion.div
              key={apartment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={apartment.images[0].asset.url}
                    alt={apartment.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  {apartment.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
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
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {apartment.court.name}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Available {new Date(apartment.availableDate).toLocaleDateString()}
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

