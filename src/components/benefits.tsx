'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Zap, Heart, Map } from 'lucide-react'

const benefits = [
  {
    title: 'Prime Locations',
    description: 'Our apartments are situated in the most desirable neighborhoods.',
    icon: Map,
  },
  {
    title: 'Top-notch Security',
    description: '24/7 security systems and personnel for your peace of mind.',
    icon: Shield,
  },
  {
    title: 'Energy Efficient',
    description: 'Eco-friendly appliances and systems to reduce your carbon footprint.',
    icon: Zap,
  },
  {
    title: 'Community Events',
    description: 'Regular social events to help you connect with your neighbors.',
    icon: Heart,
  },
]

export function Benefits() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <benefit.icon className="h-6 w-6 text-primary" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

