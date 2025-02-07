'use client'
import React, { useState } from "react";
import {
  Home,
  Wrench,
  User,
  Bell,
  CheckCircle,
  WashingMachine,
} from "lucide-react";

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBrandLoom } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServiceBookingModal from "@/components/modals/book-cleaning";
import ApartmentDetails from "@/components/dashboard/apartment";
import MaintenanceDashboard from "@/components/dashboard/maintenance";
import ProfileSettings from "@/components/dashboard/profile";
import { Button } from "@/components/ui/button";
import NotificationsCenter from "@/components/dashboard/notifications";

// Mock data (would be replaced with actual data from backend)
const mockApartment = {
  mainImage: {
    asset: {
      _ref: "image-4878aa0f2c943c1ec256ee9282571bdabdef3d09-1080x1346-png",
      _type: "reference",
    },
    _type: "image",
  },
  featured: true,
  title: "Down Town",
  slug: { current: "some-great-walls", _type: "slug" },
  category: {
    _id: "40b6fc6f-97fb-4470-a2bc-366f1da1734a",
    name: "Single room",
    slug: { current: "single-room", _type: "slug" },
    selectOptions: null,
  },
  rental: {
    price: 1500,
    deposit: 220,
    availableDate: "2025-01-23",
    minimumLeaseTerm: 2,
    utilities: ["Water", "Electricity", "Internet"],
  },
  nearbyAttractions: null,
  court: null,
  _id: "6746918a-b842-4bf6-8e9d-8c1a73f54799",
  images: [
    {
      alt: "Master",
      caption: "none",
      _key: "493ca5d9ae04",
      asset: {
        _ref: "image-d16365b1414c74ae19fa2ea87aa0e6d782f1ba06-1411x893-png",
        _type: "reference",
      },
      _type: "image",
    },
    {
      _type: "image",
      alt: "Living room",
      caption: "Living room",
      _key: "bebc7cca6058",
      asset: {
        _ref: "image-3b991a1838c7a66f3bceb6962ac0aca4ef21c964-400x225-png",
        _type: "reference",
      },
    },
    {
      caption: "Bed room",
      _key: "98036423ab0f",
      asset: {
        _ref: "image-4d6041361f57e4fadc1f9d335415ed2c37de422b-400x267-png",
        _type: "reference",
      },
      _type: "image",
      alt: "Bed room",
    },
  ],
  virtualTourUrl: null,
  location: { lng: 45, _type: "geopoint", alt: 4, lat: 450 },
  petsAllowed: null,
  leaseTerms: null,
  amenities: [
    "Air Conditioning",
    "Furnished",
    "Garden",
    "Internet",
    "Parking",
    "Pet-friendly",
    "Security System",
    "Storage",
    "Walk-in Closet",
    "Wi-Fi",
  ],
  description: "Some great walls",
  floorNumber: null,
  apartmentNumber: null,
  specifications: {
    squareFootage: 2400,
    bedrooms: 2,
    bathrooms: 1,
    ceilingHeight: 1400,
    exposure: "North",
  },
  moveInDate: new Date("2022-06-15"),
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("apartment");
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Reviews section
  const reviews = [
    {
      _id: 1,
      rating: 4,
      comment: "Great apartment with excellent amenities!",
      date: "2023-12-15",
    },
    {
      _id: 2,
      rating: 5,
      comment: "Fantastic location and very responsive management.",
      date: "2024-01-20",
    },
  ];

  const mockServices = [
    {
      id: 1,
      name: "Deep Cleaning",
      description: "Comprehensive cleaning of entire apartment",
      price: 150,
      duration: "3-4 hours",
      lastOrdered: "2024-01-15",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
    },
    {
      id: 2,
      name: "Laundry Service",
      description: "Wash, dry, and fold of up to 15 items",
      price: 50,
      duration: "24-48 hours",
      lastOrdered: "2024-02-01",
      icon: <WashingMachine className="w-6 h-6 text-green-500" />,
    },
    {
      id: 3,
      name: "Maintenance Check",
      description: "Full apartment systems inspection",
      price: 100,
      duration: "1-2 hours",
      lastOrdered: "2023-12-10",
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
    },
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto p-4">

        <Tabs
          defaultValue="apartment"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="apartment">
              <Home className="mr-2" />
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <Wrench className="mr-2" /> Maintenance
            </TabsTrigger>
            <TabsTrigger value="services">
              <IconBrandLoom className="mr-2" /> Services
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2" /> Profile
            </TabsTrigger>
          </TabsList>

          {/* Apartment Overview Tab */}
          <TabsContent value="apartment">
            <ApartmentDetails apartment={mockApartment} reviews={reviews} />
          </TabsContent>

          {/* Maintenance Requests Tab */}
          <TabsContent value="maintenance">
            <MaintenanceDashboard/>
          </TabsContent>

          {/* Services Tab */}

          {/* Services Tab with Detailed Listings */}
          <TabsContent value="services" className="space-y-4">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IconBrandLoom className="mr-3 w-6 h-6 text-blue-500" />
                  Available Services
                </CardTitle>
                <CardDescription>
                  Book services to enhance your living experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {mockServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 mb-3 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        {service.icon}
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-gray-500">
                            {service.description}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            ${service.price} | {service.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 mb-2">
                          Last Ordered: {service.lastOrdered}
                        </span>
                        <Button
                          onClick={() => {
                            setSelectedService(service);
                            setIsBookingModalOpen(true);
                          }}
                        >
                          Book Now
                        </Button>

                        {/* Modal placement */}
                        {isBookingModalOpen && selectedService && (
                          <ServiceBookingModal
                            service={selectedService}
                            isOpen={isBookingModalOpen}
                            onOpenChange={setIsBookingModalOpen}
                            onBookService={(bookingDetails) => {
                              // Implement your booking submission logic
                              console.log(bookingDetails);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileSettings/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
