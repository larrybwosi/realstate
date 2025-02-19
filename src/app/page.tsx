import { Hero } from '@/components/hero'
import { Benefits } from '@/components/benefits'
import { FeaturedApartments } from '@/components/featured-apartments'
import { Testimonials } from '@/components/testimonials'
import { Newsletter } from '@/components/newsletter'
import { getFeaturedApartments } from '@/actions/apartments'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cheap City | Apartments, Houses & Rooms for Rent',
  description: 'Search thousands of apartments, houses, and rooms for rent. Filter by price, location, amenities, and more to find your ideal home.',
  keywords: ['apartments for rent', 'houses for rent', 'rooms for rent', 'apartment finder', 'real estate'],
  authors: [{ name: 'Larry Bwosi', url: 'mail.larrybwosi@gmail.com' }],
  openGraph: {
    title: 'Find Your Perfect Home | Apartments, Houses & Rooms for Rent',
    description: 'Search thousands of apartments, houses, and rooms for rent. Filter by price, location, amenities, and more to find your ideal home.',
    images: [{ url: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1975a8218869283.67a8d58cd6eff.jpg' }], // Add a hero image for the homepage
    url: 'https://www.yourwebsite.com', // URL of the homepage
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Home | Apartments, Houses & Rooms for Rent',
    description: 'Search thousands of apartments, houses, and rooms for rent. Filter by price, location, amenities, and more to find your ideal home.',
    images: ['https://mir-s3-cdn-cf.behance.net/project_modules/fs/1975a8218869283.67a8d58cd6eff.jpg'], // Add a hero image for the homepage
  },
  other: {
    // Schema.org structured data for the website
    schemaOrg: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: 'Apartment Finder',
      description: 'A comprehensive platform to find apartments, houses, and rooms for rent.',
      url: 'https://www.yourwebsite.com',
      potentialAction: {
        "@type": "SearchAction",
        target: 'https://www.yourwebsite.com/search?q={search_term_string}',
        "query-input": "required name=search_term_string",
      },
      about: {
        "@type": "RealEstateListingService",
        name: 'Apartment Finder',
        description: 'Search and filter thousands of listings for apartments, houses, and rooms.',
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: 500, // Minimum rent
          highPrice: 10000, // Maximum rent
          offerCount: 1000, // Total number of listings
        },
      },
    }),
  },
};

export default async function Page() { 
  const featuredApartments = await getFeaturedApartments()
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <FeaturedApartments apartments={featuredApartments} />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

