import { Suspense } from 'react';
import { Home } from 'lucide-react';
import { ApartmentPreview } from '@/components/schedule/preview';
import { TourSchedulerForm } from '@/components/schedule/form';
import { getApartment } from '@/actions/apartments';

type Params = Promise<{ slug: string }>;
export default async function ApartmentTourScheduler({ params }: { params: Params }) {
  const { slug } = await params;
  const apartmentDetails = await getApartment(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-100 dark:from-zinc-900 dark:via-blue-900/20 dark:to-zinc-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Enhanced Header Section */}
          <div className="text-center space-y-4 p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-2xl backdrop-blur-sm">
            <div className="inline-block p-3 bg-white dark:bg-zinc-800 rounded-full shadow-xl">
              <Home className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              Schedule Your Apartment Tour
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              Experience luxury living at its finest. Take a virtual or in-person tour of our premium apartments.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Apartment Preview */}
            <Suspense fallback={<div>Loading apartment details...</div>}>.
              <ApartmentPreview details={apartmentDetails} />
            </Suspense>

            {/* Tour Scheduler Form */}
            <TourSchedulerForm apartmentTitle={apartmentDetails?.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

