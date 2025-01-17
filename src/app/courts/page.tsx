"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  MapPin,
  Search,
  ChevronRight,
  Star,
  DoorOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const ApartmentBuildings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

const buildings = [
  {
    id: 1,
    name: "The Grand Skyline",
    image:
      "https://cdn.sanity.io/images/k1f8kx4i/production/852cf7905a54dcbbdfbc333fbff9fa6aaff9a5cc-1026x1026.png?w=400&h=400&fit=crop&fm=webp",
    type: "luxury",
    totalFloors: 25,
    totalUnits: 125,
    availableUnits: 8,
    location: "Downtown Financial District",
    priceRange: "$2,200 - $5,500",
    rating: 4.8,
    reviews: 142,
    yearBuilt: 2022,
    amenities: ["Pool", "Gym", "Spa", "Parking", "Pet Area"],
    types: ["Studio", "1 BR", "2 BR", "3 BR"],
    description: "Luxury high-rise living with panoramic city views",
    occupancy: "92%",
  },
  {
    id: 2,
    name: "Riverside Gardens",
    image:
      "https://images.pexels.com/photos/8774643/pexels-photo-8774643.jpeg?auto=compress&cs=tinysrgb&w=400",
    type: "modern",
    totalFloors: 15,
    totalUnits: 90,
    availableUnits: 5,
    location: "Waterfront District",
    priceRange: "$1,800 - $4,200",
    rating: 4.6,
    reviews: 98,
    yearBuilt: 2021,
    amenities: ["Garden", "Gym", "Lounge", "Parking"],
    types: ["1 BR", "2 BR", "3 BR"],
    description: "Modern living with serene waterfront views",
    occupancy: "94%",
  },
  {
    id: 3,
    name: "The Metropolitan",
    image:
      "https://images.pexels.com/photos/4162011/pexels-photo-4162011.jpeg?auto=compress&cs=tinysrgb&w=400",
    type: "premium",
    totalFloors: 20,
    totalUnits: 160,
    availableUnits: 12,
    location: "Arts District",
    priceRange: "$2,000 - $4,800",
    rating: 4.7,
    reviews: 115,
    yearBuilt: 2023,
    amenities: ["Rooftop", "Gym", "Cinema", "Coworking", "Parking"],
    types: ["Studio", "1 BR", "2 BR"],
    description: "Urban sophistication meets modern comfort",
    occupancy: "92%",
  },
];

const filterOptions = [
  { label: "All Buildings", value: "all" },
  { label: "Luxury", value: "luxury" },
  { label: "Modern", value: "modern" },
  { label: "Premium", value: "premium" },
];


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
        ease: "easeOut",
      },
    },
  };

  const filteredBuildings = buildings.filter(
    (building) =>
      (selectedFilter === "all" || building.type === selectedFilter) &&
      building.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const BuildingSkeleton = () => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm p-4 space-y-4">
      <Skeleton className="h-56 w-full rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-6xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-8"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3 transition-all duration-300">
              Luxury Apartment Buildings
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover our collection of premium residential buildings designed
              for modern living
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <motion.div
              className="relative flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search buildings..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
            <motion.div
              className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filterOptions.map((option, index) => (
                <Button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${
                      selectedFilter === option.value
                        ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg shadow-slate-200"
                        : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  {option.label}
                </Button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Buildings Grid */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {isLoading
              ? // Skeleton loading state
                [...Array(6)].map((_, index) => (
                  <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                    <BuildingSkeleton />
                  </motion.div>
                ))
              : // Actual content
                filteredBuildings.map((building) => (
                  <motion.div
                    key={building.id}
                    variants={itemVariants}
                    layout
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 max-w-[450px]"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={building.image}
                        alt={building.name}
                        className="w-full h-full object-cover"
                        width={400}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Price Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-slate-900"
                      >
                        {building.priceRange}
                      </motion.div>

                      {/* Availability Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-4 left-4 bg-green-500/95 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold text-white"
                      >
                        {building.availableUnits} Units Available
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                            {building.name}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{building.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-slate-700 fill-current" />
                          <span className="font-semibold text-slate-700">
                            {building.rating}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl transition-all duration-200 hover:bg-slate-100">
                          <Building className="w-5 h-5 text-slate-700 mb-1" />
                          <span className="text-sm font-medium">
                            {building.totalFloors} Floors
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl transition-all duration-200 hover:bg-slate-100">
                          <DoorOpen className="w-5 h-5 text-slate-700 mb-1" />
                          <span className="text-sm font-medium">
                            {building.totalUnits} Units
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {building.types.map((type, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium transition-all duration-200 hover:bg-slate-200"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      <p className="text-slate-600 text-sm mb-6">
                        {building.description}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-slate-200/50 hover:from-slate-700 hover:to-slate-600"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApartmentBuildings;
