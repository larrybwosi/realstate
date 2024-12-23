'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { Home, Calendar, Clock, CheckSquare, MessageSquare, Loader2, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function RequestCleaningPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch('/api/cleaning-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // toast({
        //   title: 'Success!',
        //   description: 'Your cleaning request has been submitted successfully. We'll be in touch soon!',
        //   icon: <Sparkles className="w-4 h-4 text-green-500" />,
        // })
        router.push('/dashboard')
      } else {
        throw new Error('Failed to submit request')
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please check your connection and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const mockAppartments = [
    { _id: '1', title: 'Luxury Ocean View Penthouse', location: 'Beachfront', price: '$2,500/month', amenities: 'Pool, Gym, Spa' },
    { _id: '2', title: 'Modern Downtown Loft', location: 'City Center', price: '$1,800/month', amenities: 'Rooftop Garden, Security' },
    { _id: '3', title: 'Cozy Garden Apartment', location: 'Suburban Area', price: '$1,200/month', amenities: 'Private Garden, Parking' },
    { _id: '4', title: 'High-Rise Studio Suite', location: 'Financial District', price: '$1,600/month', amenities: 'Business Center, Lounge' },
    { _id: '5', title: 'Riverside Duplex', location: 'Waterfront', price: '$2,200/month', amenities: 'River View, Terrace' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 dark:from-primary dark:via-purple-400 dark:to-pink-400">
            Schedule Your Perfect Clean
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience professional cleaning services tailored to your needs. Our expert team ensures your space sparkles with attention to every detail.
          </p>
        </motion.div>

        <Card className="backdrop-blur-lg bg-background/95 dark:bg-background/90 border-muted/20">
          <CardContent className="p-6 md:p-8">
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="apartment" className="flex items-center gap-2 text-base">
                    <Home className="w-4 h-4 text-primary" />
                    Select Your Property
                  </Label>
                  <Select name="apartment" required>
                    <SelectTrigger className="w-full bg-background/50 backdrop-blur border-muted/30 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Choose your apartment" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur border-muted/30">
                      {mockAppartments?.map((apartment) => (
                        <SelectItem 
                          key={apartment._id} 
                          value={apartment._id}
                          className="hover:bg-muted/50 transition-colors py-3"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{apartment.title}</div>
                            <div className="text-sm text-muted-foreground">{apartment.location} • {apartment.price}</div>
                            <div className="text-xs text-primary/80">{apartment.amenities}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="scheduledDate" className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Service Time
                  </Label>
                  <Input 
                    type="datetime-local" 
                    id="scheduledDate" 
                    name="scheduledDate" 
                    required 
                    className="bg-background/50 backdrop-blur border-muted/30 hover:border-primary/50 focus:border-primary focus:ring-primary/30 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="duration" className="flex items-center gap-2 text-base">
                    <Clock className="w-4 h-4 text-primary" />
                    Service Duration
                  </Label>
                  <Input 
                    type="number" 
                    id="duration" 
                    name="duration" 
                    min="1" 
                    step="0.5" 
                    required 
                    placeholder="Enter hours needed"
                    className="bg-background/50 backdrop-blur border-muted/30 hover:border-primary/50 focus:border-primary focus:ring-primary/30 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tasks" className="flex items-center gap-2 text-base">
                    <CheckSquare className="w-4 h-4 text-primary" />
                    Cleaning Tasks
                  </Label>
                  <Input 
                    type="text" 
                    id="tasks" 
                    name="tasks" 
                    placeholder="e.g., Deep cleaning, Window washing, Carpet cleaning" 
                    required 
                    className="bg-background/50 backdrop-blur border-muted/30 hover:border-primary/50 focus:border-primary focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="notes" className="flex items-center gap-2 text-base">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Special Instructions
                </Label>
                <Textarea 
                  id="notes" 
                  name="notes" 
                  placeholder="Share any specific requirements or areas that need special attention..." 
                  className="min-h-[120px] bg-background/50 backdrop-blur border-muted/30 hover:border-primary/50 focus:border-primary focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 py-6"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Request...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Schedule Cleaning Service
                  </span>
                )}
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
