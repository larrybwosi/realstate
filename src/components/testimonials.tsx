'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tenant',
    image: '/testimonials/sarah.jpg',
    quote: 'I found my dream apartment through this website. The process was smooth, and the apartment exceeded my expectations!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Landlord',
    image: '/testimonials/michael.jpg',
    quote: 'As a landlord, I appreciate how easy it is to list my properties. The quality of tenants I\'ve found has been excellent.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Tenant',
    image: '/testimonials/emily.jpg',
    quote: 'The virtual tours and detailed descriptions helped me find the perfect apartment without even visiting in person. Highly recommended!',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-12 w-12 text-primary mb-6" />
                  <p className="text-lg mb-6">{testimonials[currentIndex].quote}</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

