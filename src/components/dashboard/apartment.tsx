import {
  MapPin,
  Calendar,
  Star,
  Home,
  Users,
  Trophy,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apartment } from "@/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ApartmentProps {
  apartment: Apartment;
  reviews: Review[];
  residencyStartDate: string;
}

const ApartmentDetails = ({
  apartment,
  reviews,
  residencyStartDate,
}: ApartmentProps) => {
  if (!apartment) {
    return <div>Loading...</div>;
  }

  // Calculate residency duration
  const calculateResidencyDuration = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return { years, months: remainingMonths };
  };

  const residencyDuration = calculateResidencyDuration(residencyStartDate);

  // Comfort score calculation (example)
  const calculateComfortScore = () => {
    const amenitiesScore = apartment.amenities?.length || 0;
    const reviewScore =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return Math.round(((amenitiesScore + reviewScore * 2) / 3) * 10);
  };

  const comfortScore = calculateComfortScore();

  return (
    <div className="">
      <Card className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Image Section */}
          <div className="relative">
            <Image
              src={urlFor(apartment.mainImage.asset)
                .width(450)
                .format("webp")
                .url()}
              alt={apartment.title}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 rounded-full px-4 py-2 flex items-center">
              <MapPin className="mr-2 text-blue-500" />
              <span className="font-semibold">{apartment?.court?.name}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold text-gray-800">
                {apartment.title}
              </CardTitle>
            </CardHeader>

            {/* Residency Insights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-4">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Your Residency</p>
                  <p className="font-bold text-lg">
                    {residencyDuration.years > 0
                      ? `${residencyDuration.years} yr ${residencyDuration.months} mo`
                      : `${residencyDuration.months} months`}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-4">
                <Trophy className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Comfort Score</p>
                  <p className="font-bold text-lg">{comfortScore}/10</p>
                </div>
              </div>
            </div>

            {/* Living Space Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Home className="mr-2 w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-700">Your Space</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-bold">
                    {apartment?.specifications?.squareFootage} sq ft
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-bold">
                    {apartment?.specifications?.bedrooms}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-bold">
                    {apartment?.specifications?.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            {/* Personalized Insights */}
            <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-4">
              <Heart className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Community Engagement</p>
                <p className="font-bold text-lg">
                  {reviews.length} Community Reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities and Reviews Section */}
        <CardContent className="p-4 bg-gray-50">
          <div className="flex items-center text-lg font-semibold my-3">
            <Users className="mr-2" /> Community Amenities
          </div>
          <div className="flex flex-wrap gap-2">
            {apartment.amenities?.map((amenity, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
          <div className="flex items-center text-lg font-semibold">
            <Star className="mr-2" /> Community Reviews ({reviews.length})
          </div>
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="border-b last:border-b-0 py-4 dark:border-gray-700 hover:bg-gray-100 transition-colors rounded"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApartmentDetails;
