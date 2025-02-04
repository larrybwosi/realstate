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
  DialogTrigger
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
import { IconBrandLoom } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServiceBookingModal from "@/components/modals/book-cleaning";
import ApartmentDetails from "@/components/dashboard/apartment";

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
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("apartment");
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Calculate tenure in apartment
  const calculateTenure = (moveInDate:Date) => {
    const now = new Date();
    const diffTime = Math.abs(parseInt(now.toString()) - parseInt(moveInDate.toString()));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    return `${diffYears > 0 ? `${diffYears} year${diffYears !== 1 ? "s" : ""} ` : ""}${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  };

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

  // Maintenance Request Modal State
  const [maintenanceRequest, setMaintenanceRequest] = useState({
    title: "",
    description: "",
    category: "",
    priority: "normal",
  });

  const handleMaintenanceSubmit = () => {
    // Implement submission logic
    console.log("Maintenance Request:", maintenanceRequest);
  };

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

  const mockMaintenanceHistory = [
    {
      id: 1,
      type: "Plumbing",
      date: "2024-01-20",
      status: "Completed",
      description: "Fixed leaking bathroom faucet",
    },
    {
      id: 2,
      type: "Electrical",
      date: "2023-11-15",
      status: "Completed",
      description: "Replaced faulty light switch",
    },
  ];

  // Profile Update State
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
            <TabsTrigger value="notifications">
              <Bell className="mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>

          {/* Apartment Overview Tab */}
          <TabsContent value="apartment">
            <ApartmentDetails apartment={mockApartment} reviews={reviews} />
          </TabsContent>

          {/* Maintenance Requests Tab */}
          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      Create Maintenance Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Maintenance Request</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={maintenanceRequest.title}
                          onChange={(e) =>
                            setMaintenanceRequest({
                              ...maintenanceRequest,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={maintenanceRequest.category}
                          onValueChange={(value) =>
                            setMaintenanceRequest({
                              ...maintenanceRequest,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="electrical">
                              Electrical
                            </SelectItem>
                            <SelectItem value="hvac">HVAC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={maintenanceRequest.description}
                          onChange={(e) =>
                            setMaintenanceRequest({
                              ...maintenanceRequest,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button onClick={handleMaintenanceSubmit}>
                        Submit Request
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
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

            {/* Maintenance History */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="mr-3 w-6 h-6 text-orange-500" />
                  Maintenance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {mockMaintenanceHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 mb-2 bg-gray-100 dark:bg-gray-900 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{item.type} Maintenance</h4>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            item.status === "Completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for notifications */}
                <p>No new notifications</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
