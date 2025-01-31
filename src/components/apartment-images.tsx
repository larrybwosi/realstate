'use client';
import Image from "next/image";
import { useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import { Apartment } from "@/types";

export default function ApartmentImages({
  apartment,
}: {
  apartment: Apartment;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div className="space-y-4">
      <div className="aspect-16/9 relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Image
          src={
            selectedImage === 0
              ? urlFor(apartment.mainImage.asset)
                  .width(800)
                  .format("webp")
                  .url()
              : apartment?.images
                  ? urlFor(apartment?.images[selectedImage - 1].asset)
                      .width(800)
                      .format("webp")
                      .url()
                  : ""
          }
          alt={apartment.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div
          className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer ${
            selectedImage === 0 ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setSelectedImage(0)}
        >
          <Image
            src={urlFor(apartment.mainImage.asset)
              .width(200)
              .format("webp")
              .url()}
            alt={apartment.title}
            fill
            className="object-cover hover:opacity-90 transition-opacity"
          />
        </div>
        {apartment?.images?.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer ${
              selectedImage === index + 1 ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedImage(index + 1)}
          >
            <Image
              src={urlFor(image.asset).width(200).format("webp").url()}
              alt={image?.caption || `image ${index}`}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}