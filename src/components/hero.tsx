'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const images = [
  'https://media.istockphoto.com/id/1937068715/photo/view-from-inner-courtyard-on-modern-apartment-house-in-oslo-city-district-modern-cozy.webp?a=1&b=1&s=612x612&w=0&k=20&c=xK0MY8_CYqzHgfjp2BhHLIwRmE1e-58J9wq83yY-1sI=',
  'https://media.istockphoto.com/id/2152254782/photo/new-modern-apartment-building-with-balconies-and-blue-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=QfJtr7CmwtHINREWRG9tNC73UBOGW38t1UW7fDSvgGc=',
  'https://media.istockphoto.com/id/2156129499/photo/atlanta-apartment-life.webp?a=1&b=1&s=612x612&w=0&k=20&c=yXs8ykGIOkiPDTnDif2Ef6q_iZdpNZqDpvMKavIS08w=',
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={src} alt={`Hero ${index + 1}`} width={800} height={800} className="h-full w-full object-cover" />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find Your Dream Home in{' '}
          <span className="text-primary">Our City</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-xl text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience luxury living, unbeatable locations, and top-notch amenities. 
          Your perfect apartment is just a click away.
        </motion.p>
        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/apartments">Explore Apartments</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/contact">Schedule a Tour</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

