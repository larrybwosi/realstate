'use client'

import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface Apartment {
  _id: string
  title: string
  location: { lat: number; lng: number }
  price: number
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 40.7128,
  lng: -74.0060,
}

export function LocationMap({ apartments }: { apartments: Apartment[] }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)

  const onLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()
    apartments.forEach(({ location }) => bounds.extend(location))
    map.fitBounds(bounds)
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  if (!isLoaded) return <Loader2 className="h-8 w-8 animate-spin" />

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {apartments.map((apartment) => (
          <Marker
            key={apartment._id}
            position={apartment.location}
            onClick={() => setSelectedApartment(apartment)}
          />
        ))}

        {selectedApartment && (
          <InfoWindow
            position={selectedApartment.location}
            onCloseClick={() => setSelectedApartment(null)}
          >
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{selectedApartment.title}</h3>
                <p className="text-sm mb-2">${selectedApartment.price}/month</p>
                <Button
                  size="sm"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedApartment.location.lat},${selectedApartment.location.lng}`
                    window.open(url, '_blank')
                  }}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

