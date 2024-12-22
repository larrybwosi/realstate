'use client'

import { useState } from 'react'
import { HouseFinder } from '@/components/house-finder'
import { ApartmentGrid } from '@/components/apartment-grid'

export default function FindAHomePage() {
  const [filteredApartments, setFilteredApartments] = useState([])

  const handleFindHome = async (preferences: any) => {
    // In a real application, you would use these preferences to fetch filtered apartments from your API
    const response = await fetch('/api/filter-apartments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    })
    const data = await response.json()
    setFilteredApartments(data)
  }

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Find Your Perfect Home</h1>
        <HouseFinder onFind={handleFindHome} />
        {filteredApartments.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8">Recommended Apartments</h2>
            <ApartmentGrid apartments={filteredApartments} />
          </div>
        )}
      </div>
    </main>
  )
}

