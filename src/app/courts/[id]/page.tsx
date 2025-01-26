import { getCourtWithApartments } from '@/actions/apartments';
import { ApartmentGrid } from '@/components/apartment-grid'
import { Button } from '@/components/ui/button';
import { urlFor } from '@/sanity/lib/image';
import { Check, MapPin, Users, Star, Building2, Home } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: string }>;
export default async function CourtPage({ params }: { params: Params }) {
  const { id } = await params;
  const court = await getCourtWithApartments(id);

  if (!court) {
    return notFound();
  }
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src={urlFor(court.mainImage).width(1200).format("webp").url()}
          alt={court.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {court.name}
            </h1>
            <p className="mt-2 text-lg text-gray-200">{court.description}</p>
          </div>
        </div>
      </div>

      {/* Court Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Court Details */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-3xl font-bold">About {court.name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Floors
                    </p>
                    <p className="text-lg font-semibold">{court.totalFloors}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Units</p>
                    <p className="text-lg font-semibold">
                      {court.totalApartments}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Available Units
                    </p>
                    <p className="text-lg font-semibold">
                      {court.availableApartments}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-lg font-semibold">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-bold">Building Amenities</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {court.buildingAmenities?.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-bold">Location</h3>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-muted-foreground">
                    {court.address.street}, {court.address.city},{" "}
                    {court.address.state} {court.address.zipCode}
                  </p>
                </div>
              </div>
              <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162936.64871471454!2d-74.09311810728148!3d40.63903948764293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1737635680665!5m2!1sen!2sus`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Management Info */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-bold">Management</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-semibold">
                  {court?.management?.companyName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-semibold">
                  {court?.management?.contactPerson}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{court?.management?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{court?.management?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Office Hours</p>
                <p className="font-semibold">
                  {court?.management?.officeHours}
                </p>
              </div>
              <Button className="w-full">Contact Management</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Apartments Section */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Available Apartments</h2>
          <ApartmentGrid apartments={court.apartments} />
        </div>
      </div>
    </main>
  );
}
 
