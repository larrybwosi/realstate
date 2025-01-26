import { getCourts } from "@/actions/apartments";
import { CourtCard } from "@/components/court-card";

export default async function CourtsPage() {
  const courts = await getCourts();
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Our Premium Courts
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover modern living spaces with world-class amenities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courts.map((court) => (
            <CourtCard key={court._id} court={court} />
          ))}
        </div>

        {courts.length === 0 && (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <div className="text-muted-foreground">
              No courts available at the moment
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
