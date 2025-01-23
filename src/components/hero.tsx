'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { MotionDiv, MotionH1, MotionP } from './motion'

const images = [
  "https://cdn.sanity.io/images/k1f8kx4i/production/543aaa436ea7753a82a1f00e094a9381fbbabf23-736x1104.png?fm=webp",
  "https://cdn.sanity.io/images/k1f8kx4i/production/0afa13558ea908e425e949288fc76cae6b01d0f7-500x750.png?fm=webp",
  "https://cdn.sanity.io/images/k1f8kx4i/production/6795af55c3be813403f294101fe07d9460472695-736x1417.png?fm=webp",
  "https://cdn.sanity.io/images/k1f8kx4i/production/90c6709a6a75d2b9a28c45a8bd98fe8a18479c60-736x920.png?fm=webp",
  "https://cdn.sanity.io/images/k1f8kx4i/production/1a02414e7456a761451b67178ec389b68158ce9d-473x590.png?fm=webp",
];

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
        <MotionDiv
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={src} alt={`Hero ${index + 1}`} width={800} height={800} className="h-full w-full object-cover" />
        </MotionDiv>
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
        <MotionH1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find Your Dream Home in{' '}
          <span className="text-primary">Our City</span>
        </MotionH1>
        <MotionP
          className="mt-6 max-w-2xl text-xl text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience luxury living, unbeatable locations, and top-notch amenities. 
          Your perfect apartment is just a click away.
        </MotionP>
        <MotionDiv
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
        </MotionDiv>
      </div>
    </div>
  )
}

