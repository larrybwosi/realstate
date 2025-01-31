import { DollarSign, Home } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApartment } from "@/actions/apartments";
import Link from "next/link";
import BookingForm from "../components/form";
// import ApartmentPaymentPage from "@/app/payment/page";


type Params = Promise<{ slug: string }>;
export default async function BookingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const apartment = await getApartment(slug as string);

  if (!apartment)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Home className="w-16 h-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Apartment not found</h1>
        <p className="text-muted-foreground mt-2">
          The apartment you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/apartments" className="mt-4">
          View All Apartments
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Book {apartment.title}
      </h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Apartment Details
            </CardTitle>
            <CardDescription>
              Review the details of your selected apartment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
              <Image
                src={urlFor(apartment.mainImage)
                  .width(450)
                  .height(250)
                  .format("webp")
                  .url()}
                alt={apartment.title}
                width={500}
                height={250}
                objectFit="cover"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-500" />
              {apartment.rental?.price}/month
            </h2>
            <p className="text-muted-foreground mt-2">
              {apartment.description}
            </p>
          </CardContent>
        </Card>
        <BookingForm apartment={apartment} />
      </div>
    </div>
    // <ApartmentPaymentPage apartment={apartment}/>
  );
}
