"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Dumbbell,
  Wifi,
  ParkingCircle,
  Coffee,
  TreePine,
  Sofa,
  ChevronLeft,
  Star,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconPool } from "@tabler/icons-react";

const ApartmentDetails = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const buildingDetails = {
    name: "The Grand Skyline",
    address: "123 Downtown Avenue, Financial District",
    description:
      "Experience luxury living at its finest with breathtaking city views and world-class amenities. Our modern apartments combine comfort with sophistication, offering the perfect balance of style and functionality.",
    price: {
      studio: "2,200",
      oneBed: "2,800",
      twoBed: "3,500",
      threeBed: "4,500",
    },
    rating: 4.8,
    reviews: 156,
    yearBuilt: 2023,
    images: [
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
    ],
    amenities: [
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Swimming Pool", icon: IconPool },
      { name: "High-Speed WiFi", icon: Wifi },
      { name: "Covered Parking", icon: ParkingCircle },
      { name: "Coffee Lounge", icon: Coffee },
      { name: "Garden Area", icon: TreePine },
      { name: "Common Lounge", icon: Sofa },
    ],
    features: [
      "Floor-to-ceiling windows",
      "Smart home technology",
      "Quartz countertops",
      "Stainless steel appliances",
      "Walk-in closets",
      "Private balconies",
      "In-unit washer/dryer",
    ],
    availableUnits: [
      {
        type: "Studio",
        size: "550 sq ft",
        price: "$2,200",
        available: 3,
        features: ["Open concept", "Full kitchen", "Modern bathroom"],
        image: "/api/placeholder/800/600",
      },
      {
        type: "1 Bedroom",
        size: "750 sq ft",
        price: "$2,800",
        available: 2,
        features: ["Separate bedroom", "Large balcony", "Walk-in closet"],
        image: "/api/placeholder/800/600",
      },
      {
        type: "2 Bedrooms",
        size: "1100 sq ft",
        price: "$3,500",
        available: 4,
        features: ["Master suite", "Guest bedroom", "Two bathrooms"],
        image: "/api/placeholder/800/600",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Listings
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
              Save
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden mb-8 bg-slate-200 dark:bg-slate-700"
        >
          <div className="aspect-[16/9] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={buildingDetails.images[selectedImageIndex]}
                alt={`Building view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
            {buildingDetails.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Building Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {buildingDetails.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                      <MapPin className="w-4 h-4" />
                      {buildingDetails.address}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">
                      {buildingDetails.rating}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      ({buildingDetails.reviews})
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="units">Available Units</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {buildingDetails.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {buildingDetails.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-slate-700 dark:text-slate-200"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {buildingDetails.amenities.map((amenity, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl"
                          whileHover={{ scale: 1.02 }}
                        >
                          <amenity.icon className="w-8 h-8 text-slate-700 dark:text-slate-200 mb-3" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white text-center">
                            {amenity.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="units">
                    <div className="space-y-6">
                      {buildingDetails.availableUnits.map((unit, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="md:w-1/3">
                            <img
                              src={unit.image}
                              alt={unit.type}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="md:w-2/3 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                  {unit.type}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                  {unit.size}
                                </p>
                              </div>
                              <Badge variant="secondary">
                                {unit.available} Available
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {unit.features.map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {unit.price}
                                <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                                  /month
                                </span>
                              </span>
                              <Button>Schedule Tour</Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={itemVariants}>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Get in touch with our leasing office
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-white">
                    (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-white">
                    leasing@grandskyline.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-900 dark:text-white">
                    Mon-Sat: 9AM-6PM
                  </span>
                </div>
                <Button className="w-full mt-4" size="lg">
                  Schedule a Tour
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApartmentDetails;
