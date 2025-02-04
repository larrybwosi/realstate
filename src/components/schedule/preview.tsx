import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Check, BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { Apartment } from '@/types';
import { urlFor } from '@/sanity/lib/image';

interface ApartmentPreviewProps {
  details: Apartment;
}

export function ApartmentPreview({ details }: ApartmentPreviewProps) {
  return (
    <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xs border border-zinc-200 dark:border-zinc-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            {details.title}
          </CardTitle>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full">
            Available {new Date(details.rental.availableDate).toLocaleDateString()}
          </span>
        </div>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Actual apartment image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={urlFor(details.mainImage.asset)
              .width(300)
              .format("webp")
              .url()}
            alt={details.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BedDouble, label: 'Bedrooms', value: details?.specifications?.bedrooms },
              { icon: Bath, label: 'Bathrooms', value: details?.specifications?.bathrooms },
              { icon: Maximize, label: 'Square Footage', value: `${details?.specifications?.squareFootage} sq ft` },
              { icon: MapPin, label: 'Location', value: details?.court?.name }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {details?.amenities?.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">${details?.rental?.price}</span>
            <span className="text-zinc-600 dark:text-zinc-400"> / month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

