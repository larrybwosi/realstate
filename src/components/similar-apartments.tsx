import { Apartment } from "@/types";
import ApartmentCard from "./apartment";

export function SimilarApartments({ apartments }: { apartments: Apartment[] }) {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-8">Similar Apartments</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment}/>
        ))}
      </div>
    </section>
  );
}
