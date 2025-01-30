'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface HouseFinderProps {
  onFind: (preferences: HousePreferences) => void
}

interface HousePreferences {
  budget: number
  size: string
  location: string
  amenities: string[]
  bedrooms: number
  bathrooms: number
  propertyType: string
  yearBuilt: string
  furnished: boolean
  moveInDate: string
}

export default function HouseFinder({ onFind }: HouseFinderProps) {
  const [preferences, setPreferences] = useState<HousePreferences>({
    budget: 2000,
    size: 'medium',
    location: 'urban',
    amenities: [],
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'apartment',
    yearBuilt: '',
    furnished: false,
    moveInDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFind(preferences)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Card className="bg-linear-to-br from-background/95 to-background/50 dark:from-background/90 dark:to-background/60 backdrop-blur-lg shadow-2xl border-0 dark:border dark:border-gray-800">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary via-purple-500 to-pink-500 dark:from-primary dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Find Your Dream Home
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us your preferences and let us find the perfect home for you
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <Label htmlFor="budget" className="text-base sm:text-lg font-semibold">Monthly Budget</Label>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Set your comfortable monthly budget range</p>
                <Slider
                  id="budget"
                  min={500}
                  max={10000}
                  step={100}
                  value={[preferences.budget]}
                  onValueChange={(value) => setPreferences({ ...preferences, budget: value[0] })}
                  className="mt-2"
                />
                <div className="mt-1 text-base sm:text-lg font-semibold text-primary">${preferences.budget}</div>
              </div>

              <div>
                <Label className="text-base sm:text-lg font-semibold">Property Type</Label>
                <RadioGroup
                  value={preferences.propertyType}
                  onValueChange={(value) => setPreferences({ ...preferences, propertyType: value })}
                  className="mt-2 grid grid-cols-2 gap-3"
                >
                  {['apartment', 'house', 'condo', 'townhouse'].map((type) => (
                    <div key={type} className="flex items-center space-x-2 bg-muted/50 dark:bg-muted/20 p-3 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value={type} id={`type-${type}`} />
                      <Label htmlFor={`type-${type}`} className="capitalize">{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms" className="text-base sm:text-lg font-semibold">Bedrooms</Label>
                  <Input
                    type="number"
                    id="bedrooms"
                    min={1}
                    max={10}
                    value={preferences.bedrooms}
                    onChange={(e) => setPreferences({ ...preferences, bedrooms: parseInt(e.target.value) })}
                    className="mt-2 bg-background/50 dark:bg-background/30"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="text-base sm:text-lg font-semibold">Bathrooms</Label>
                  <Input
                    type="number"
                    id="bathrooms"
                    min={1}
                    max={10}
                    value={preferences.bathrooms}
                    onChange={(e) => setPreferences({ ...preferences, bathrooms: parseInt(e.target.value) })}
                    className="mt-2 bg-background/50 dark:bg-background/30"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <Label className="text-base sm:text-lg font-semibold">Location Preference</Label>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Choose your ideal neighborhood type</p>
                <RadioGroup
                  value={preferences.location}
                  onValueChange={(value) => setPreferences({ ...preferences, location: value })}
                  className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {['urban', 'suburban', 'rural'].map((location) => (
                    <div key={location} className="flex items-center space-x-2 bg-muted/50 dark:bg-muted/20 p-3 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value={location} id={`location-${location}`} />
                      <Label htmlFor={`location-${location}`} className="capitalize">{location}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base sm:text-lg font-semibold">Must-Have Amenities</Label>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">Select all the amenities you need</p>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Gym', 'Pool', 'Parking', 'Pet-Friendly', 'Balcony', 'Security', 'Storage', 'Elevator', 'Garden'].map((amenity) => (
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
                      className="h-auto py-2 px-3 text-xs sm:text-sm bg-linear-to-r hover:opacity-90"
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="moveInDate" className="text-base sm:text-lg font-semibold">Move-in Date</Label>
                  <Input
                    type="date"
                    id="moveInDate"
                    value={preferences.moveInDate}
                    onChange={(e) => setPreferences({ ...preferences, moveInDate: e.target.value })}
                    className="mt-2 bg-background/50 dark:bg-background/30"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-8">
                  <Checkbox
                    id="furnished"
                    checked={preferences.furnished}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, furnished: checked as boolean })
                    }
                  />
                  <Label htmlFor="furnished" className="text-base sm:text-lg font-semibold">Furnished</Label>
                </div>
              </div>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md"
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-primary via-purple-500 to-pink-500 dark:from-primary dark:via-purple-400 dark:to-pink-400 hover:opacity-90 text-base sm:text-lg py-6 text-primary-foreground shadow-lg"
            >
              Find My Dream Home
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
