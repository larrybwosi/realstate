import React, { useState } from "react";
import {
  Home,
  Wrench,
  User,
  Bell,
  MapPin,
  Star,
  MoveRight,
  MoveLeft,
} from "lucide-react";
import { useTheme } from "next-themes";

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconBrandLoom } from "@tabler/icons-react";

// Mock data (would be replaced with actual data from backend)
const mockApartment = {
  title: "Luxury Urban Apartment",
  court: {
    name: "Sunset Residences",
    address: {
      street: "123 Urban Avenue",
      city: "Metropolis",
      state: "ST",
      zipCode: "12345",
    },
  },
  unit: {
    floorNumber: 5,
    unitNumber: "502",
    wing: "A",
  },
  specifications: {
    squareFootage: 1200,
    bedrooms: 2,
    bathrooms: 2,
  },
  rental: {
    price: 2500,
    availableDate: "2023-01-15",
  },
  moveInDate: new Date("2022-06-15"),
};

const UserDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("apartment");

  // Calculate tenure in apartment
  const calculateTenure = (moveInDate) => {
    const now = new Date();
    const diffTime = Math.abs(now - moveInDate);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    return `${diffYears > 0 ? `${diffYears} year${diffYears !== 1 ? "s" : ""} ` : ""}${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  };

  // Reviews section
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 4,
      text: "Great apartment with excellent amenities!",
      date: "2023-12-15",
    },
    {
      id: 2,
      rating: 5,
      text: "Fantastic location and very responsive management.",
      date: "2024-01-20",
    },
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>

        <Tabs
          defaultValue="apartment"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="apartment">
              <Home className="mr-2" /> Apartment
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
            <TabsTrigger value="notifications">
              <Bell className="mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>

          {/* Apartment Overview Tab */}
          <TabsContent value="apartment">
            <Card className="bg-white dark:bg-gray-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" /> {mockApartment.title}
                </CardTitle>
                <CardDescription>
                  Apartment Details and Management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Apartment Info
                    </h3>
                    <p>Court: {mockApartment.court.name}</p>
                    <p>
                      Unit: {mockApartment.unit.unitNumber} (Floor{" "}
                      {mockApartment.unit.floorNumber})
                    </p>
                    <p>
                      Size: {mockApartment.specifications.squareFootage} sq ft
                    </p>
                    <p>Bedrooms: {mockApartment.specifications.bedrooms}</p>
                    <p>Bathrooms: {mockApartment.specifications.bathrooms}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tenure</h3>
                    <p>
                      You've been here for:{" "}
                      {calculateTenure(mockApartment.moveInDate)}
                    </p>

                    <div className="mt-4 space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <MoveRight className="mr-2" /> Explore Other
                            Apartments
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apartment Transfer</DialogTitle>
                            <DialogDescription>
                              Looking for a change? Explore other apartments in
                              our courts that might better suit your needs.
                            </DialogDescription>
                          </DialogHeader>
                          {/* Add apartment listing logic here */}
                          <p>Available apartments will be listed here.</p>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <MoveLeft className="mr-2" /> Move Out
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Move Out Request</DialogTitle>
                            <DialogDescription>
                              Initiating a move-out process requires 30 days
                              notice and compliance with lease terms.
                            </DialogDescription>
                          </DialogHeader>
                          {/* Add move-out request form */}
                          <Button variant="destructive">
                            Confirm Move Out
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="reviews">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Star className="mr-2" />
                        Apartment Reviews ({reviews.length})
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b last:border-b-0 py-2 dark:border-gray-700"
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-500 fill-current"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <p className="mt-2">{review.text}</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same as in previous implementation */}
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
