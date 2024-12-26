import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export async function RecommendedCourts() {
  // const recommendedCourts = await getRecommendedCourts();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center">
        <Building className="w-6 h-6 md:w-8 md:h-8 mr-2 text-blue-500" />
        Recommended Courts
      </h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCourts.map((court) => (
          <Card key={court._id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={urlFor(court.image).width(600).height(400).url()}
                  alt={court.name || "Recommended court"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl mb-2">{court.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {court.address}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {court.description}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/courts/${court._id}`}>Explore Court</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div> */}
    </section>
  );
}
