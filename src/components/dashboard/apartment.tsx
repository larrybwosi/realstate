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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

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

  const calculateComfortScore = () => {
    const amenitiesScore = apartment.amenities?.length || 0;
    const reviewScore =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return Math.round(((amenitiesScore + reviewScore * 2) / 3) * 10);
  };

  const residencyDuration = calculateResidencyDuration(residencyStartDate);
  const comfortScore = calculateComfortScore();

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-4 py-8">
      <Card className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative min-h-[300px] lg:min-h-[500px]">
            <Image
              src={urlFor(apartment.mainImage.asset)
                .width(800)
                .format("webp")
                .url()}
              alt={apartment.title}
              fill
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center transition-colors">
              <MapPin className="mr-2 text-blue-500" />
              <span className="font-semibold dark:text-white">
                {apartment?.court?.name}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-2 lg:p-6 space-y-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">
                {apartment.title}
              </CardTitle>
            </CardHeader>

            {/* Residency Insights */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl flex items-center space-x-4 transition-colors">
                <Calendar className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Your Residency
                  </p>
                  <p className="font-bold text-lg dark:text-white">
                    {residencyDuration.years > 0
                      ? `${residencyDuration.years}y ${residencyDuration.months}m`
                      : `${residencyDuration.months} months`}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl flex items-center space-x-4 transition-colors">
                <Trophy className="w-8 h-8 text-green-500 dark:text-green-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Comfort Score
                  </p>
                  <p className="font-bold text-lg dark:text-white">
                    {comfortScore}/10
                  </p>
                </div>
              </div>
            </div>

            {/* Living Space Details */}
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl transition-colors">
              <div className="flex items-center mb-3">
                <Home className="mr-2 w-5 h-5 text-blue-500 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                  Your Space
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Size
                  </p>
                  <p className="font-bold dark:text-white">
                    {apartment?.specifications?.squareFootage} sq ft
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bedrooms
                  </p>
                  <p className="font-bold dark:text-white">
                    {apartment?.specifications?.bedrooms}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bathrooms
                  </p>
                  <p className="font-bold dark:text-white">
                    {apartment?.specifications?.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            {/* Community Engagement */}
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl flex items-center space-x-4 transition-colors">
              <Heart className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Community Engagement
                </p>
                <p className="font-bold text-lg dark:text-white">
                  {reviews.length} Community Reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities and Reviews Section */}
        <CardContent className="p-6 bg-slate-50 dark:bg-slate-900/50 transition-colors">
          {/* Amenities */}
          <div className="space-y-6">
            <div className="flex items-center text-lg font-semibold dark:text-white">
              <Users className="mr-2" /> Community Amenities
            </div>
            <div className="flex flex-wrap gap-2">
              {apartment.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-4 py-1.5 rounded-full text-sm transition-colors"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center text-lg font-semibold dark:text-white">
              <Star className="mr-2" /> Community Reviews ({reviews.length})
            </div>
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className="p-4 border dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApartmentDetails;
