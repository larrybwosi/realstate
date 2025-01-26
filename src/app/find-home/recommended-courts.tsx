import { Building } from "lucide-react";
import { CourtCard } from "@/components/court-card";
import { getCourts } from "@/actions/apartments";

export async function RecommendedCourts({
  recommendedCourts,
}: {
  recommendedCourts: Awaited<ReturnType<typeof getCourts>>;
}) {
  if (!recommendedCourts) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-center">
        <div className="text-muted-foreground">
          No courts available at the moment
        </div>
      </div>
    );
}

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center">
        <Building className="w-6 h-6 md:w-8 md:h-8 mr-2 text-blue-500" />
        Recommended Courts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCourts.map((court) => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>
    </section>
  );
}
