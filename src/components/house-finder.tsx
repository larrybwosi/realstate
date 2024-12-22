'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'

interface HouseFinderProps {
  onFind: (preferences: HousePreferences) => void
}

interface HousePreferences {
  budget: number
  size: string
  location: string
  amenities: string[]
}

export function HouseFinder({ onFind }: HouseFinderProps) {
  const [preferences, setPreferences] = useState<HousePreferences>({
    budget: 2000,
    size: 'medium',
    location: 'urban',
    amenities: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFind(preferences)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Find Your Ideal Home</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="budget">Monthly Budget</Label>
            <Slider
              id="budget"
              min={500}
              max={5000}
              step={100}
              value={[preferences.budget]}
              onValueChange={(value) => setPreferences({ ...preferences, budget: value[0] })}
              className="mt-2"
            />
            <div className="mt-1 text-sm text-muted-foreground">${preferences.budget}</div>
          </div>
          <div>
            <Label>Preferred Size</Label>
            <RadioGroup
              value={preferences.size}
              onValueChange={(value) => setPreferences({ ...preferences, size: value })}
              className="mt-2 flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="size-small" />
                <Label htmlFor="size-small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="size-medium" />
                <Label htmlFor="size-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="size-large" />
                <Label htmlFor="size-large">Large</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Preferred Location</Label>
            <RadioGroup
              value={preferences.location}
              onValueChange={(value) => setPreferences({ ...preferences, location: value })}
              className="mt-2 flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urban" id="location-urban" />
                <Label htmlFor="location-urban">Urban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suburban" id="location-suburban" />
                <Label htmlFor="location-suburban">Suburban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rural" id="location-rural" />
                <Label htmlFor="location-rural">Rural</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Must-Have Amenities</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Gym', 'Pool', 'Parking', 'Pet-Friendly', 'Balcony'].map((amenity) => (
                <Button
                  key={amenity}
                  type="button"
                  variant={preferences.amenities.includes(amenity) ? 'default' : 'outline'}
                  onClick={() => {
                    const newAmenities = preferences.amenities.includes(amenity)
                      ? preferences.amenities.filter((a) => a !== amenity)
                      : [...preferences.amenities, amenity]
                    setPreferences({ ...preferences, amenities: newAmenities })
                  }}
                >
                  {amenity}
                </Button>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Find My Ideal Home
        </Button>
      </CardFooter>
    </Card>
  )
}

